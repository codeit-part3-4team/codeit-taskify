export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  return <div>{dashboardId}</div>;
}
