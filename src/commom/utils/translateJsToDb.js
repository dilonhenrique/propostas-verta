export default function translateJsToDb(jsObj) {
  let newObj = {};
  for (let key in jsObj) {
    if (typeof jsObj[key] === 'boolean') {
      newObj[key] = Number(jsObj[key]);
    } else if (typeof jsObj[key] === 'object') {
      if (Array.isArray(jsObj[key])) {
        newObj[key] = []
        jsObj[key].forEach((item, index) => {
          if (typeof item === 'object'){
            let newItem = {...item};
            newItem.autoFocus ? delete newItem.autoFocus : null;
            newItem.tarefas ? delete newItem.tarefas : null;
            newObj[key].push(newItem);
          } else {
            newObj[key].push(item);
          }
        });
      } else {
        newObj[key] = { ...jsObj[key] }
      }
    } else {
      newObj[key] = jsObj[key];
    }
  }
  return newObj;
}