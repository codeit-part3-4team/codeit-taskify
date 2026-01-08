import { redirect } from 'next/navigation';

export default async function CardDetailFallback({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  redirect(`/dashboard/${dashboardId}`);
}
