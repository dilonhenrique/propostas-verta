export default function createFases(obj) {
  let newObj = { ...obj, fases: [] }

  for (let pIndex = -1, i = 0; i < obj.escopo.length; i++) {
    const item = obj.escopo[i];
    if (item.tipo === 'fase') {
      newObj.fases.push({ ...item, tarefas: [] });
      pIndex++;
    } else {
      //insere a tarefa na última fase definida acima
      newObj.fases[pIndex].tarefas.push(item);
    }
  }

  return newObj;
}