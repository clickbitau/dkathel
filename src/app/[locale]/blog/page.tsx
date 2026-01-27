'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogPostData } from '@/types/database';
import { motion } from 'framer-motion';
import { useMessages } from 'next-intl';

interface BlogPost extends BlogPostData {
  _id: string;
  publishedAt: string;
  readingTime?: number;
  views: number;
  createdAt: string;
}

export default function BlogPage() {
  const messages = useMessages();
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback to empty array if API fails
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  // Get unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  // Filter posts based on search and tags
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  if (loading) {
    return (
      <>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-300 rounded mb-6 mx-auto max-w-2xl"></div>
                <div className="h-6 bg-gray-300 rounded mx-auto max-w-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Wave shape at bottom */}
        <div className="absolute -bottom-1 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" className="fill-gray-50 dark:fill-gray-900" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Montserrat Alternates', system-ui, sans-serif" }}>
              {messages?.blog?.title || 'Blog & Insights'}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Mina', sans-serif" }}>
              {messages?.blog?.subtitle || 'Thoughts on technology, development, and industry trends'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder={messages?.blog?.search_placeholder || "Search posts..."}
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearch('');
                        setSelectedTag('');
                      }}
                    >
                      {messages?.blog?.clear || 'Clear'}
                    </Button>
                  </div>

                  {/* Tags Filter */}
                  {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500 py-1 px-2">{messages?.blog?.filter_by || 'Filter by:'}</span>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagFilter(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTag === tag
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-gray-800 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                          {post.excerpt || post.content?.substring(0, 200) + '...'}
                        </p>
                      </CardHeader>
                    </div>
                    {post.featuredImage && (
                      <div className="ml-6 flex-shrink-0">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={200}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                        {post.readingTime && (
                          <span>{post.readingTime} {messages?.blog?.min_read || 'min read'}</span>
                        )}
                        <span>{post.views} {messages?.blog?.views || 'views'}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex space-x-2 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagFilter(tag)}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs hover:bg-blue-200 transition-colors dark:bg-gray-800/30 dark:text-teal-300"
                          >
                            {tag}
                          </button>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 text-gray-500 text-xs">
                            +{post.tags.length - 3} {messages?.blog?.more_tags || 'more'}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No posts message */}
          {filteredPosts.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {search || selectedTag ?
                    (messages?.blog?.no_posts_search || 'No blog posts found matching your criteria.') :
                    (messages?.blog?.no_posts || 'No blog posts available yet.')
                  }
                </p>
                {(search || selectedTag) && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearch('');
                      setSelectedTag('');
                    }}
                  >
                    {messages?.blog?.show_all || 'Show All Posts'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* CTA for more posts */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                    {messages?.blog?.cta_title || 'Want to Read More?'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {messages?.blog?.cta_subtitle || 'Stay updated with the latest insights on technology, development, and industry trends.'}
                  </p>
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black">
                      {messages?.blog?.cta_button || 'Get in Touch'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}