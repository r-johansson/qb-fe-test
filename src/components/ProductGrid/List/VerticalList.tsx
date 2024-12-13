'use client'

interface VerticalListProps {
  children: React.ReactNode
}

export function VerticalList(props: VerticalListProps) {
  return (
    <ul className="space-y-4">{props.children}</ul>
  )
}
