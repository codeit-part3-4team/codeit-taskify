export type ColumnServer = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

export type ColumnListResponse = {
  result: 'SUCCESS' | 'FAIL';
  data: ColumnServer[];
};

export type ColumnCreateRequest = {
  title: string;
  dashboardId: number;
};

export type ColumnUpdateRequest = {
  initialTitle: string;
}; 