function onFinish() {
  let name = document.getElementById("name").value;
  let gender = document.getElementById("gender").value;
  greet(name, gender);
}

function greet(name, gender) {
  document.getElementById("message").innerHTML = `Bienvenid${gender == "male" 
    ? "o" : gender == "female"
    ? "a" : "e"} ${name}! n.n`;
}

