//No uso este arreglo pero está aqui porque lo pide el ejercicio u.u
let personList = [];

let onClick = () => {
  let name = document.getElementById("name").value;
  
  if(name.length == 0) {
    alert('¡El nombre de la persona está vacío!');
    return;
  }
  document.getElementById("name").value = '';

  let ul = document.getElementById("personList");
  ul.appendChild(listItemFromText(name));
  personList.push(name);
};

let listItemFromText = text => {
  let li = document.createElement("li");
  li.innerHTML = text;
  return li;
};