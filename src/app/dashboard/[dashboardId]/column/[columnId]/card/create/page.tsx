import { redirect } from 'next/navigation';

export default async function CardCreateFallback({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  redirect(`/dashboard/${dashboardId}`);
}
