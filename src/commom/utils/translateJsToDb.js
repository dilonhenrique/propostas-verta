export default function translateJsToDb(jsObj){
  let newObj = {};
  for(let key in jsObj){
    if(typeof element === 'boolean') {
      newObj[key] = Number(jsObj[key]);
    } else {
      newObj[key] = jsObj[key];
    }
  }
  return newObj;
}