'use client'

import { SDK } from '@/utils/sdk'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { GridList } from './List/GridList'
import { VerticalList } from './List/VerticalList'
import ToggleButton from './ToggleButton'


const fetchProducts = async ({ pageParam = 0 }) => SDK.getAllProducts({ limit: 10, offset: 10 * pageParam })

export function ProductGrid() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')

  
  const { data, fetchNextPage, hasNextPage, fetchStatus } = useSuspenseInfiniteQuery({
    queryKey: ['product-grid'],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (_lastPage, lastPages) => lastPages.length ?? undefined,

  });

  const handleViewChange = (state: boolean) => {
    setViewType(state ? 'list' : 'grid')
  }

  const gridProduct = (product: SDK.Product) => (
      <div key={product.id}>
        <img src={product.image} alt="Placeholder" className="w-24 h-24 object-cover rounded-lg mr-4"></img>
        
        <div>
          <div className="font-semibold text-lg">{product.name}</div>
          <div className="font-semibold text-sm">{product.shortDescription}</div>
          <div className="text-white-600 text-sm py-2">{product.price} kr</div>
        </div>
      </div>
    )

  const listProduct = (product: SDK.Product) => (
    <li key={product.id} className="flex items-start space-x-4">
      <img src={product.image} alt="Placeholder" className="w-24 h-24 object-cover rounded-lg mr-4"></img>
      <div>
        <div className="font-semibold text-lg">{product.name}</div>
        <div className="font-semibold text-sm">{product.shortDescription}</div>
        <div className="text-white-600 text-sm py-2">{product.price} kr</div>
      </div>
    </li>
  )

  return (
    <div>
      <ToggleButton onToggle={handleViewChange} label='Toggle view' className="mb-4" />
      {viewType === 'grid' && (
        <GridList>
          {data?.pages.map((page) => (
            page.map((product) =>
              gridProduct(product)
            ))
          )}
        </GridList>
      )}

      {viewType === 'list' && (
        <VerticalList>
          {data?.pages.map((page) => (
            page.map((product) =>
              listProduct(product)
            ))
          )}
        </VerticalList>
      )}

      {fetchStatus === 'fetching' ?
      <div className="text-center mt-4">Loading more content...</div> :
      <button className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 mt-4 hover:bg-blue-700 focus:outline-none"
        disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        Load More
      </button>
      }
    </div>
  )
}
