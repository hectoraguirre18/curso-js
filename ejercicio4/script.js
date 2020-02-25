function operate() {
  
  let operation = document.getElementById("operation").value;
  let v1 = parseFloat(document.getElementById("value1").value);
  let v2 = parseFloat(document.getElementById("value2").value);
  let result;
  switch(operation){
    case "add":
      result = v1+v2;
      break;
    case "sub":
      result = v1-v2;
      break;
    case "mult":
      result = v1*v2;
      break;
  }
  if(isNaN(result))
    result = "Ha ocurrido un error con los datos";
  
  document.getElementById("result").innerHTML = result;
}