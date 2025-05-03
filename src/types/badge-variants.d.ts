
import '@/components/ui/badge'

declare module '@/components/ui/badge' {
  interface BadgeProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'warning' | 'success';
  }
}
