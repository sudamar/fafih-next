import {
  Baby,
  BookOpen,
  Church,
  CloudDrizzle,
  Heart,
  HeartPulse,
  Link2,
  LucideIcon,
  Moon,
  Paintbrush,
  PersonStanding,
  Sparkles,
  Sun,
  User,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  User,
  Church,
  BookOpen,
  Heart,
  HeartPulse,
  Baby,
  Paintbrush,
  CloudDrizzle,
  PersonStanding,
  Sparkles,
  Link2,
  Sun,
  Moon,
}

export const resolveCategoriaIcon = (iconName?: string | null): LucideIcon => {
  if (!iconName) {
    return User
  }

  return iconMap[iconName] ?? User
}
