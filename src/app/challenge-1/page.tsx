import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { Suspense } from 'react'

export default function Challenge1() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductGrid />
    </Suspense>
  )
}
