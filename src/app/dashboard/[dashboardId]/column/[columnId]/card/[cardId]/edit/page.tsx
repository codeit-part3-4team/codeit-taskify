import { redirect } from 'next/navigation';

export default async function CardEditFallback({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  redirect(`/dashboard/${dashboardId}`);
}
