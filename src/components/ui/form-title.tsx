import { cn } from '@/lib/utils'

interface FormTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function FormTitle({ children, className, as: Component = 'h2' }: FormTitleProps) {
  const baseClasses = 'font-display text-3xl font-bold text-secondary relative block'
  const classes = cn(baseClasses, className)
  
  return (
    <Component className={classes}>
      {children}
      <div 
        className="absolute bottom-[-8px] left-0 right-0 h-0.5" 
        style={{
          backgroundImage: 'linear-gradient(90deg, #6A0DAD, #0000FF, #008000, #FFFF00, #FFA500, #FF0000)'
        }}
      ></div>
    </Component>
  )
}
