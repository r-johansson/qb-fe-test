'use client'

import { SDK } from '@/utils/sdk'
import { setNumCartItems } from '@/utils/store'

export function AddToCartButton({ productId }: { productId: string }) {
  const addToCart = async () => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    })
    const data = await(response.json() as Promise<{ cart: SDK.Cart }>)

    setNumCartItems(Object.values(data.cart).reduce((a: number, b: number) => a + b, 0))
  }

  return (
    <button className="border px-2 py-1" onClick={addToCart}>
      Add to Cart
    </button>
  )
}
