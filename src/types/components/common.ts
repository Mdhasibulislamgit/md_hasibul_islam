import { LucideIcon } from "lucide-react";
import { ReactNode, HTMLAttributes } from "react";

// Common component prop types
export interface BaseComponentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

// Layout component props
export interface ContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  padding?: boolean;
}

// Interactive component props
export interface InteractiveProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface SectionTitleProps extends BaseComponentProps {
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
}



export interface GradientBackgroundProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'accent';
  intensity?: 'light' | 'medium' | 'strong';
}
