interface PageTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function PageTitle({ children, className, as: Component = 'h1' }: PageTitleProps) {
  const classes = ['section-title', className].filter(Boolean).join(' ')
  return <Component className={classes}>{children}</Component>
}
