export type ColumnListResponse = {
  result: 'SUCCESS' | 'FAIL';
  data: ColumnServer[];
};

export type ColumnServer = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};