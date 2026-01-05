import { ColumnServer } from "./ColumnServer.type";
import { ColumnUI } from "./ColumnUI.type";

export function mapColumnsToUI(
  columns: ColumnServer[],
  cardCounts: number[]
): ColumnUI[] {
  return columns.map((column, index) => ({
    id: column.id,
    title: column.title,
    cardCount: cardCounts[index],
  }));
}