export default function createEscopo(obj) {
  if (!'escopo' in obj) return obj;

  let newObj = { ...obj, escopo: [] }

  newObj.fases.map(fase => {
    newObj.escopo.push({
      ...fase,
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