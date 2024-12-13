'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface ProviderProps {
  children: React.ReactNode
}

export function Provider(props: ProviderProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
  )
}
