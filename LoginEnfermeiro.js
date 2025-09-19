function enviaFormulario() {
  let CIP = document.getElementById("CIP").value;
  let senha = document.getElementById("senha").value;
  
  let CIPsValidos = ["123456", "654321", "321456"];
  let senhasValidas = ["1234", "6543", "3214"];
  
  let acessoPermitido = false;
  var i
  for (i = 0; i < CIPsValidos.length; i++) {
    if (CIP === CIPsValidos[i] && senha === senhasValidas[i]) {
      acessoPermitido = true;
      break;
    }
  }
if(acessoPermitido == true){
  if (i === 0) {
    alert("Bem Vindo De Volta Rafael!");

  } 
  if (i === 1) {
    alert("Bem Vindo De Volta Lucas!");
  } 
  if (i === 2) {
    alert("Bem Vindo De Volta Diogo!");
  }
  window.location.href = "http://127.0.0.1:5500/index.html"
}
else{
  alert("CIP ou Senha Incorreto!")
}

}

