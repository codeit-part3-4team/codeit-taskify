export type DashboardServerResponse = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export type DashboardListResponse = {
  dashboards: DashboardServerResponse[];
  totalCount: number;
  cursorId: number | null;
};

export type DashboardUpsertRequest = {
  title: string;
  color: string;
};

export type EditDashBoardProps = {
  initialTitle: string;
  initialColor: string;
};