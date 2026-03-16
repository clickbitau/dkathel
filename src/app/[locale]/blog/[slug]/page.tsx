import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

async function getBlogPost(slug: string) {
  try {
    const client = getSupabaseClient(true);
    const { data, error } = await client
      .from('blog_posts')
      .select('id, title, slug, content, excerpt, tags, published_at, created_at, views, reading_time, featured_image')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

function renderMarkdown(content: string) {
  // Simple markdown → React elements conversion
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let codeBlock = false;
  let codeLines: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      if (codeBlock) {
        elements.push(
          <pre key={i} className="bg-gray-900 dark:bg-gray-950 text-green-300 rounded-xl p-4 overflow-x-auto my-4 text-sm font-mono">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        codeBlock = false;
      } else {
        codeBlock = true;
      }
      i++; continue;
    }
    if (codeBlock) { codeLines.push(line); i++; continue; }

    // Headings
    if (line.startsWith('### ')) { elements.push(<h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">{line.slice(4)}</h3>); i++; continue; }
    if (line.startsWith('## ')) { elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{line.slice(3)}</h2>); i++; continue; }
    if (line.startsWith('# ')) { elements.push(<h1 key={i} className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{line.slice(2)}</h1>); i++; continue; }

    // Blockquote
    if (line.startsWith('> ')) { elements.push(<blockquote key={i} className="border-l-4 border-teal-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">{line.slice(2)}</blockquote>); i++; continue; }

    // Bullet list — collect consecutive items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2)); i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-4 text-gray-700 dark:text-gray-300">
          {items.map((item, j) => <li key={j}>{inlineFormat(item)}</li>)}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, '')); i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1 my-4 text-gray-700 dark:text-gray-300">
          {items.map((item, j) => <li key={j}>{inlineFormat(item)}</li>)}
        </ol>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === '') { i++; continue; }

    // Paragraph
    elements.push(<p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">{inlineFormat(line)}</p>);
    i++;
  }
  return elements;
}

function inlineFormat(text: string): React.ReactNode {
  // Bold **text** and inline code `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="bg-gray-100 dark:bg-gray-800 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Blog Post Not Found' };
  return {
    title: `${post.title} | DKathel`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.published_at }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const dateStr = post.published_at || post.created_at;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const displayTags = (post.tags || []).filter((t: string) => !t.startsWith('lang:'));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline mb-8 text-sm font-medium"
        >
          ← {locale === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to Blog'}
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Featured image */}
          {post.featured_image && (
            <div className="aspect-[16/7] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-8 sm:p-12">
            {/* Tags */}
            {displayTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {displayTags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
              <span className="font-medium text-gray-700 dark:text-gray-300">Kauser Ahmed Methel</span>
              {formattedDate && <><span>•</span><span>{formattedDate}</span></>}
              {post.reading_time && <><span>•</span><span>{post.reading_time} {locale === 'bn' ? 'মিনিট পড়া' : 'min read'}</span></>}
              {post.views > 0 && <><span>•</span><span>{post.views} {locale === 'bn' ? 'বার দেখা হয়েছে' : 'views'}</span></>}
            </div>

            {/* Content */}
            <div className="prose-content">
              {renderMarkdown(post.content || '')}
            </div>

            {/* Footer nav */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:from-gray-900 hover:to-black transition-all duration-300"
              >
                ← {locale === 'bn' ? 'আরও নিবন্ধ' : 'More Articles'}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
