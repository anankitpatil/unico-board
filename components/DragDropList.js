import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import styles from "../styles/DragDropList.module.css";

export default function DragDropList({ cardSet, title }) {
  return (
    <div className={styles.list}>
      <div className={styles.title}>{title}</div>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className={styles.container}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cardSet.map((card, i) => {
              return <Card card={card} key={card.id} num={i} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
