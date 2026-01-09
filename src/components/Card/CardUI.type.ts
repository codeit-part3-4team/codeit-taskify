export type CardUI = {
  id: number;
  title: string;
  tags: string[] | null;
  dueDate: string | null;
  imageUrl: string | null;
  profileImageUrl: string | null;
};

export type CardDetail = {
  title: string;
  description: string;
  tags: string[] | null;
  dueDateText: string | null;
  assigneeName: string | null;
  assigneeProfileUrl: string | null;
  imageUrl?: string | null;
}