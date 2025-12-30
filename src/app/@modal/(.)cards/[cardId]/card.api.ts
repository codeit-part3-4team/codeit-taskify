import { GetCardsResponse } from "@/components/Modals/Card/CardModal.types";

const API_URL = "https://sp-taskify-api.vercel.app/20-4/cards";

export async function getCardsByColumn(
  columnId: number,
  accessToken: string
): Promise<GetCardsResponse> {
  const res = await fetch(`${API_URL}?columnId=${columnId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("카드 조회 실패");
  return res.json();
}