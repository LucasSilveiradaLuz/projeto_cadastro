const form = document.getElementById("form");
const lista = document.getElementById("lista"); // Adicione uma <ul id="lista"></ul> no HTML para ver a mensagem
//Adiciona um evento de submit ao formulário
form.addEventListener("submit", cadastro);

function cadastro(e) {
  e.preventDefault();
// Captura os valores dos campos do formulário e armazena no localStorage
let nome = document.getElementById("nome").value;
localStorage.setItem('nome',nome)
let sobrenome = document.getElementById("sobrenome").value;
 localStorage.setItem('sobrenome',sobrenome)
let dataDeNascimento = document.getElementById("dataDeNascimento").value;
localStorage.setItem('dataDeNascimento',dataDeNascimento)
let quarto =document.getElementById("quarto").value;
localStorage.setItem('quarto',quarto)
 let responsavel = document.getElementById("responsavel").value;
localStorage.setItem('responsavel',responsavel)
 let genero = document.querySelector('input[name="genero"]:checked').value;
localStorage.setItem('genero',genero)
let especificacao = document.querySelector('input[name="especificacao"]:checked').value;
localStorage.setItem('especificacao',especificacao)
//trocar especificação para neuroatípico                 
//fazer campo de alergias:sim e não,se sim, abrir campo de texto para especificar 

//Verifica se os campos estão preenchidos 
 if (!nome ||!sobrenome ||!dataDeNascimento || !responsavel || !genero ||!especificacao) {

  alert("Por favor, preencha todos os campos corretamente.");

  return;

 }
 // Mostra mensagem de concluído em alert
 alert("Concluído");
 // Limpa os campos do formulário
 form.reset();
 // Remove seleção manualmente dos radios (caso algum navegador não limpe)
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
}







