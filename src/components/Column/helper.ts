import { ColumnServer } from "./ColumnServer.type";
import { ColumnUI } from "./ColumnUI.type";

export function mapColumnsToUI(
  columns: ColumnServer[],
  cardCounts: number[]
): ColumnUI[] {

  if (columns.length !== cardCounts.length) {
    throw new Error(
      `Array length mismatch: columns (${columns.length}) and cardCounts (${cardCounts.length}) must have the same length`
    );
  }


  return columns.map((column, index) => ({
    id: column.id,
    title: column.title,
    cardCount: cardCounts[index],
  }));
}