'use client'

interface GridListProps {
  children: React.ReactNode
}

export function GridList(props: GridListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{props.children}</div>
  )
}
