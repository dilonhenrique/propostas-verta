import { v4 } from "uuid";

export function addIdToObject(obj) {
  //CASO NAO SEJA ARRAY OU OBJECT, RETORNA O PRÓPRIO VALOR
  if (typeof obj !== 'object') return obj;

  //CASO SEJA UM ARRAY, ITERA CADA ITEM PRA PASSAR POR ESSE MESMO PROCESSO
  if (Array.isArray(obj)) {
    return obj.map(item => {
      return addIdToObject(item);
    })
  }

  //QUANDO FINALMENTE ENCONTRAR UM OBJETO:
  //ITERA CADA ITEM PRA PASSAR POR ESSE MESMO PROCESSO
  let newObj = {};
  for (const key in obj) {
    const item = obj[key];
    newObj[key] = addIdToObject(item)
  }

  //ADICIONA UM ID CASO NAO TENHA
  if (!("id" in newObj)){
    newObj.id = v4();
  }
  
  return newObj;
}