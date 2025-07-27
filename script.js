
const paciente = document.querySelector(".form_grupo")
const sexo = document.querySelector("radio-btn")
const button = document.querySelector("submit")
const quarto = document.getElementById("quarto")

button.addEventListener("click", cadastro);
paciente.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    cadastro();
  }
});

function cadastro(){
 
const input = paciente 
  if (paciente === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  if (quarto.length < 3) {
    alert("O quarto deve ter pelo menos 3 dígitos.");
    return;
  }
   else{
      const enviado = document.createElement("li");
    enviado.innerHTML = ""
    input.appendChild(enviado);
   }
console.log(paciente)
 
  }
    
  





