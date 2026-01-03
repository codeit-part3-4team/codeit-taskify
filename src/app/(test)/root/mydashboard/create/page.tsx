import { redirect } from 'next/navigation';

export default function DashboardCreateFallback() {
  redirect('/root/mydashboard');
}
