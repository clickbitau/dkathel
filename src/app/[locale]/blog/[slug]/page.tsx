import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPostData } from '@/types/database';

interface BlogPost extends BlogPostData {
  _id: string;
  publishedAt: string;
  readTime: number;
  views: number;
  author: {
    name: string;
    email: string;
  };
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock function - will be replaced with real database call
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const mockPosts: BlogPost[] = [
    {
      _id: '1',
      title: 'Getting Started with Next.js 14',
      content: `Next.js 14 brings exciting new features that make building modern web applications faster and more efficient than ever before.

In this comprehensive guide, we'll explore the latest improvements including:
- App Router enhancements
- Improved performance optimizations
- Better TypeScript support
- Enhanced developer experience

The App Router in Next.js 14 introduces a new paradigm for building applications. Instead of the traditional pages directory, you now have an app directory that provides more intuitive routing and better performance.

One of the most significant improvements is the introduction of React Server Components. These components run on the server by default, reducing the JavaScript bundle size sent to the client and improving initial page load times.

Performance optimizations include automatic code splitting, improved image optimization, and better caching strategies. The new compiler also provides faster build times and better tree shaking.`,
      excerpt: 'A comprehensive guide to building modern web applications with the latest features and best practices.',
      slug: 'getting-started-nextjs-14',
      tags: ['Next.js', 'React', 'Web Development'],
      status: 'published',
      publishedAt: '2024-01-15T00:00:00Z',
      readTime: 5,
      views: 1250,
      author: { name: 'Kauser Ahmed Methel', email: 'hello@dkathel.com' }
    },
    {
      _id: '2',
      title: 'Mastering TypeScript for Better Code Quality',
      content: `TypeScript has revolutionized how we write JavaScript by adding static type checking and modern language features.

In this deep dive, we'll explore:
- Advanced type patterns
- Generics and utility types
- Strict mode configurations
- Best practices for enterprise applications

TypeScript's type system is incredibly powerful and can catch many errors at compile time that would otherwise only be discovered at runtime. This leads to more reliable code and better developer experience.

Generics allow us to create reusable components that work with multiple types while maintaining type safety. Utility types like Partial, Pick, and Record provide powerful ways to transform existing types.

Strict mode configurations help enforce best practices and catch potential issues early. This includes strict null checks, strict function types, and no implicit any.`,
      excerpt: 'How TypeScript can improve your development experience and catch errors before they reach production.',
      slug: 'mastering-typescript-code-quality',
      tags: ['TypeScript', 'JavaScript', 'Best Practices'],
      status: 'published',
      publishedAt: '2024-01-10T00:00:00Z',
      readTime: 8,
      views: 890,
      author: { name: 'Kauser Ahmed Methel', email: 'hello@dkathel.com' }
    },
    {
      _id: '3',
      title: 'Building Scalable APIs with Node.js',
      content: `Node.js has become the go-to platform for building scalable backend services and APIs.

This guide covers:
- Express.js framework best practices
- Database integration patterns
- Authentication and authorization
- Performance optimization techniques
- Testing strategies

Express.js provides a minimal and flexible framework for building web applications. We'll explore middleware patterns, route organization, and error handling strategies that scale with your application.

Database integration is crucial for any API. We'll cover connection pooling, query optimization, and transaction management. We'll also explore different database options including PostgreSQL, MongoDB, and Redis.

Authentication and authorization are critical for securing your APIs. We'll implement JWT-based authentication, role-based access control, and security best practices.

Performance optimization includes implementing caching strategies, using compression middleware, and optimizing database queries. We'll also cover load balancing and horizontal scaling techniques.`,
      excerpt: 'Learn the fundamentals of creating robust and scalable REST APIs using Node.js and Express.',
      slug: 'building-scalable-apis-nodejs',
      tags: ['Node.js', 'API', 'Backend'],
      status: 'published',
      publishedAt: '2024-01-05T00:00:00Z',
      readTime: 12,
      views: 1560,
      author: { name: 'Kauser Ahmed Methel', email: 'hello@dkathel.com' }
    }
  ];

  const post = mockPosts.find(p => p.slug === slug);
  return post || null;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found'
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render HTML content with proper styling
  const formatContent = (content: string) => {
    // If content contains HTML tags, render as HTML
    if (content.includes('<') && content.includes('>')) {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: content }}
          className="blog-content prose prose-lg max-w-none"
        />
      );
    }
    
    // Otherwise, format as plain text paragraphs
    return content
      .split('\n\n')
      .filter(paragraph => paragraph.trim())
      .map((paragraph, index) => (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ));
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="mb-4">
              ← Back to Blog
            </Button>
          </Link>
        </div>

        <article>
          <Card className="p-8">
            {/* Header */}
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </CardTitle>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-6">
                <span>By {post.author.name}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-0">
              {formatContent(post.content)}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        {tag}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                <Link href="/blog">
                  <Button variant="outline">
                    ← More Articles
                  </Button>
                </Link>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Enjoyed this article?</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Development Note */}
        <div className="mt-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Development Note</h3>
              <p className="text-sm text-gray-600">
                This blog post is currently using mock data. When Developer B implements the backend, 
                this will automatically connect to the MongoDB database and display real content.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
