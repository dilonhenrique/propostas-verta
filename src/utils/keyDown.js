import adicionarItem from "./addItem"

export function keyDown(type, itemId) {
  return (evento) => {
    if (evento.keyCode === 13) {
      adicionarItem(type, itemId);
    }
  }
}