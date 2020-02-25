let focoOn = false;

function cambiarFoco(){
  if(focoOn)
    document.getElementById("foco").src = "focoOff.png";
  else
    document.getElementById("foco").src = "focoOn.png";
  
  focoOn = !focoOn;
}