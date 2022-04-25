export function sortCardsByListType(array, key) {
  return array.reduce((acc, d) => {
    if (Object.keys(acc).includes(d[key])) return acc;

    acc[d[key]] = array.filter((g) => g[key] === d[key]);
    return acc;
  }, {});
}

export function getLabelColor(styles, label) {
  if (label === "CP") {
    return styles.blue;
  }
  if (label === "Fault") {
    return styles.red;
  }
  return styles.black;
}

export function setNewCardCollection(
  result,
  cardCollection,
  setCardCollection
) {
  if (result.destination === undefined || result.destination === null)
    return null;
  let newCardCollection = { ...cardCollection };
  const draggedItem =
    newCardCollection[result.source.droppableId][result.source.index];
  if (result.destination.droppableId === result.source.droppableId) {
    // in the same column
    // remove first
    newCardCollection[result.source.droppableId].splice(result.source.index, 1);
    // add on the new index
    newCardCollection[result.source.droppableId].splice(
      result.destination.index,
      0,
      draggedItem
    );
  } else {
    // moved to different column
    // remove first
    newCardCollection[result.source.droppableId].splice(result.source.index, 1);
    // add on new column at the index
    newCardCollection[result.destination.droppableId].splice(
      result.destination.index,
      0,
      draggedItem
    );
  }
  setCardCollection(newCardCollection);
}
