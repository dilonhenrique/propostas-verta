export default function createEscopo(obj) {
  if (typeof obj.escopo === 'object' && obj.escopo !== null) return obj;

  let newObj = { ...obj, escopo: [] }

  newObj.fases?.map(fase => {
    let newFase = {...fase};
    delete newFase.tarefas;
    newObj.escopo.push({
      ...newFase,
      tipo: 'fase'
    })
    fase.tarefas.map(tarefa =>
      newObj.escopo.push({
        ...tarefa,
        tipo: ('tempo' in tarefa) ? 'tarefa' : 'terceirizada'
      })
    );
  })
  
  return newObj;
}