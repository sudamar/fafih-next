import { cn } from '@/lib/utils'
import React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function SectionTitle({ children, className, as: Component = 'h2' }: SectionTitleProps) {
  return (
    <Component className={cn('font-display text-[1.8rem] font-bold text-secondary', className)}>
      {children}
    </Component>
  )
}
