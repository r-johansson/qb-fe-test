'use client'

import { SDK } from '@/utils/sdk'
import { setNumCartItems, store } from '@/utils/store'
import { useStore } from '@tanstack/react-store'
import { ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'

export function Cart() {
  useEffect(() => {
    fetch('/api/cart', {
      // Disables nextjs cache. But feel free to use it if you want.
      cache: 'no-store',
    })
      .then((res) => res.json() as Promise<{ cart: SDK.Cart }>)
      .then((data) => setNumCartItems(Object.values(data.cart).reduce((a, b) => a + b, 0)))
  }, [])

  
  const numCartItems = useStore(store, (state) => state['numCartItems']);

  return (
    <div className="flex items-center gap-2">
      <span className="text-blurple">
        <ShoppingBag />
      </span>
      {numCartItems >= 0 ? (
        <span>
          <b>{numCartItems}</b> items in cart
        </span>
      ) : (
        <span>loading...</span>
      )}
    </div>
  )
}
