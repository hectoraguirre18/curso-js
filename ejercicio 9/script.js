function onClick() {
  console.log("algo");
  let text = document.getElementById("txt").value;
  let reversed = x => x.split('').reverse().join('');
  document.getElementById("result").innerHTML = reversed(text);
}