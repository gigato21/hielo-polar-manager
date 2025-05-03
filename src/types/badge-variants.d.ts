
import '@/components/ui/badge'

declare module '@/components/ui/badge' {
  interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'warning' | 'success';
  }
}
