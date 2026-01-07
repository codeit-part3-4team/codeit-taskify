import CardItem from '@/components/Card/CardItem';
import { CardUI } from './CardUI.type';
import styles from './card.module.css';

type CardListProps = {
  cards: CardUI[];
  dashboardId: number;
  columnId: number;
};

export default function CardList({ cards, dashboardId, columnId }: CardListProps) {
  return (
    <>
      <ul className={styles.cardList}>
        {cards.map((cardData) => (
          <li key={cardData.id}>
            <CardItem card={cardData} dashboardId={dashboardId} columnId={columnId} />
          </li>
        ))}
      </ul>
    </>
  );
}
