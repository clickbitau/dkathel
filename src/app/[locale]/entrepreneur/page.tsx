import { redirect } from 'next/navigation';

export default function EntrepreneurPage({
  params
}: {
  params: { locale: string };
}) {
  // Redirect to experience page - pages are merged
  redirect(`/${params.locale}/experience`);
}
