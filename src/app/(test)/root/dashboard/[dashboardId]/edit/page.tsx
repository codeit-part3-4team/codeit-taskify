export default async function EditPage({ params }: { params: Promise<{ dashboardId: string }> }) {
  const { dashboardId } = await params;

  return <div>대시보드 수정페이지</div>;
}
