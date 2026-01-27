// Core types for the portfolio website
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt?: Date;
  authorId: string;
  tags: string[];
  featuredImage?: string;
}

export interface Experience extends BaseEntity {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Certification extends BaseEntity {
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId: string;
  credentialUrl?: string;
  image?: string;
}

export interface SocialPost extends BaseEntity {
  platform: 'instagram' | 'twitter' | 'linkedin';
  content: string;
  mediaUrls: string[];
  publishedAt: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  responded: boolean;
}
