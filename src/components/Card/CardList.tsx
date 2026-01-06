import CardItem from '@/components/Card/CardItem';
import { CardUI } from './CardUI.type';

type CardListProps = {
  cards: CardUI[];
};

export default function CardList({ cards }: CardListProps) {
  return (
    <>
      <ul>
        {cards.map((cardData) => (
          <CardItem key={cardData.id} card={cardData} />
        ))}
      </ul>
    </>
  );
}
