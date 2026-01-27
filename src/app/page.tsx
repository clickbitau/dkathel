import { redirect } from 'next/navigation';

// Root page should let next-intl middleware handle the redirect
export default function RootPage() {
  // The middleware will handle the redirect to /en
  // This page should not be reached in normal flow
  redirect('/en');
}

export const dynamic = 'force-dynamic';
