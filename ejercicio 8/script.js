function onFinish() {
  const message = (name, gender) => `Bienvenid${gender == "male" 
    ? "o" : gender == "female"
    ? "a" : "e"} ${name}! n.n`;
  document.getElementById("message").innerHTML = message(
    document.getElementById("name").value,
    document.getElementById("gender").value);
}
