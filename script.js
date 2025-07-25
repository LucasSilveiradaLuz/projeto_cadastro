const nome = document.getElementById("nome")
const data = document.getElementById("data")
const quarto = document.getElementById("quarto")
const responsavel = document.getElementById("responsavel")
const especificacoes = document.getElementById("especificacoes")
const adicionarBotao = document.getElementById("button")
const paciente = document.querySelector("div-main")

adicionarBotao.addEventListener("click", cadastro);
responsavel.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    cadastro();
  }
});

function cadastro(){
 
const input = paciente
  if (input.trim() !== "") {
    const enviado = document.createElement("li");
    enviado.innerHTML = ""
    paciente.appendChild(enviado);

  }
}



