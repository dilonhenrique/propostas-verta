import translateJsToDb from "./src/commom/utils/translateJsToDb.js";
import { addIdToObject } from "./src/commom/propFunctions/addID.js";
import createEscopo from "./src/commom/propFunctions/createEscopo.js";

async function pegarLista(){
  const response = await fetch('http://localhost:3000/api/propostas');
  const lista = await response.json();
  
  lista.forEach(async prop => {
    // await salvarProp(addIdToObject(prop))
    console.log(prop.escopo[0].id)
  })
}

async function salvarProp(prop){
  const response = await fetch(`http://localhost:3000/api/propostas/${prop.id}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(translateJsToDb(prop))
  });
  const json = await response.json();
}
pegarLista()