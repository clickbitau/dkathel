'use client';

import { 
  Shield, 
  TrendingUp, 
  GraduationCap, 
  MapPin, 
  Rocket, 
  Phone, 
  Users, 
  CheckCircle,
  Building2,
  Heart,
  Factory,
  ShoppingCart,
  UtensilsCrossed
} from 'lucide-react';

interface AnimatedIconProps {
  src?: string;
  size?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export function AnimatedIcon({ 
  size = 24, 
  className = ''
}: AnimatedIconProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

// Predefined animated icons for common use cases
export const AnimatedIcons = {
  // Hero section icons
  Shield: ({ size, className }: { size?: number; className?: string }) => (
    <Shield size={size} className={className} />
  ),
  
  TrendingUp: ({ size, className }: { size?: number; className?: string }) => (
    <TrendingUp size={size} className={className} />
  ),
  
  GraduationCap: ({ size, className }: { size?: number; className?: string }) => (
    <GraduationCap size={size} className={className} />
  ),
  
  Location: ({ size, className }: { size?: number; className?: string }) => (
    <MapPin size={size} className={className} />
  ),
  
  Rocket: ({ size, className }: { size?: number; className?: string }) => (
    <Rocket size={size} className={className} />
  ),
  
  Phone: ({ size, className }: { size?: number; className?: string }) => (
    <Phone size={size} className={className} />
  ),
  
  Users: ({ size, className }: { size?: number; className?: string }) => (
    <Users size={size} className={className} />
  ),
  
  CheckCircle: ({ size, className }: { size?: number; className?: string }) => (
    <CheckCircle size={size} className={className} />
  ),
  
  // Brand showcase icons
  ITShield: ({ size, className }: { size?: number; className?: string }) => (
    <Shield size={size} className={className} />
  ),
  
  DigitalAgency: ({ size, className }: { size?: number; className?: string }) => (
    <Rocket size={size} className={className} />
  ),
  
  Education: ({ size, className }: { size?: number; className?: string }) => (
    <GraduationCap size={size} className={className} />
  ),

  // Additional partner-specific icons
  Business: ({ size, className }: { size?: number; className?: string }) => (
    <Building2 size={size} className={className} />
  ),
  
  Consulting: ({ size, className }: { size?: number; className?: string }) => (
    <TrendingUp size={size} className={className} />
  ),
  
  Technology: ({ size, className }: { size?: number; className?: string }) => (
    <Rocket size={size} className={className} />
  ),
  
  Finance: ({ size, className }: { size?: number; className?: string }) => (
    <Shield size={size} className={className} />
  ),
  
  Healthcare: ({ size, className }: { size?: number; className?: string }) => (
    <Heart size={size} className={className} />
  ),
  
  Manufacturing: ({ size, className }: { size?: number; className?: string }) => (
    <Factory size={size} className={className} />
  ),
  
  Retail: ({ size, className }: { size?: number; className?: string }) => (
    <ShoppingCart size={size} className={className} />
  ),
  
  Hospitality: ({ size, className }: { size?: number; className?: string }) => (
    <UtensilsCrossed size={size} className={className} />
  ),

  // New relevant icons for hero badges
  Security: ({ size, className }: { size?: number; className?: string }) => (
    <Shield size={size} className={className} />
  ),
  
  Marketing: ({ size, className }: { size?: number; className?: string }) => (
    <TrendingUp size={size} className={className} />
  ),
  
  EducationConsulting: ({ size, className }: { size?: number; className?: string }) => (
    <GraduationCap size={size} className={className} />
  ),
};
