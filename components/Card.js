import { Draggable } from "react-beautiful-dnd";
import styles from "../styles/Card.module.css";
import { getLabelColor } from "../helpers/functions";

export default function Card({ card, num }) {
  return (
    <Draggable key={card.id} draggableId={card.id} index={num}>
      {(provided) => (
        <div
          className={styles.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.label && (
            <div
              className={`${styles.label} ${getLabelColor(styles, card.label)}`}
            ></div>
          )}
          <h6 className={styles.title}>{card.title}</h6>
        </div>
      )}
    </Draggable>
  );
}
