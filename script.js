const form = document.getElementById("form");
const lista = document.getElementById("lista"); // Adicione uma <ul id="lista"></ul> no HTML para ver a mensagem

form.addEventListener("submit", cadastro);

function cadastro(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const dataDeNascimento = document.getElementById("dataDeNascimento").value.trim();
  const responsavel = document.getElementById("responsavel").value.trim();
  const quarto = document.getElementById("quarto").value.trim();
  const genero = document.querySelector('input[name="genero"]:checked').value
  const especificacao = document.querySelector('input[name="especificacao"]:checked').value
  const alergia = document.querySelector('input[name="alergia"]:checked').value
  const alergiaDetalhe = document.getElementById("alergiaDetalhe").value.trim();
  const neuroatipicoDetalhe = document.getElementById("neuroatipicoDetalhe").value.trim();
  const resposta = document.getElementById("ul")
  if (
    !nome ||
    !sobrenome ||
    !quarto ||
    !dataDeNascimento ||
    !responsavel ||
    !genero ||
    !especificacao ||
    !alergia ||
    (alergia.value === "sim" && !alergiaDetalhe) ||
    (especificacao.value === "neuroatipico" && !neuroatipicoDetalhe)
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const cadastro = {
    nome,
    sobrenome,
    dataDeNascimento,
    responsavel,
    genero: genero.value,
    especificacao: especificacao.value,
    neuroatipicoDetalhe: especificacao.value === "neuroatipico" ? neuroatipicoDetalhe : "",
    alergia: alergia.value,
    alergiaDetalhe: alergia.value === "sim" ? alergiaDetalhe : ""
  };

  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  cadastros.push(cadastro);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));

  // Mostra mensagem de concluído em alert
  alert("Concluído");

  // Limpa os campos do formulário
  form.reset();


let li = document.createElement("li");
li.innerHTML = `
  <span>Nome: ${nome}</span> <br>
  <span>Sobrenome: ${sobrenome}</span> <br>
  <span>Data de Nascimento: ${dataDeNascimento}</span> <br>
  <span>Responsável: ${responsavel}</span> <br>
  <span>Quarto: ${quarto}</span> <br>
  <span>Gênero: ${genero}</span> <br>
  <span>Alergias: ${alergia === "sim" ? alergiaDetalhe : "Sem alergias"}</span> <br>
  <span>Especificações: ${
    especificacao === "neuroatipico" ? neuroatipicoDetalhe :
    especificacao === "60mais" ? "60 anos ou +" :
    "Nenhuma"
  }</span> <br>
`;

resposta.appendChild(li);


  
  if (genero == "feminino") {
    
    resposta.appendChild( li)
  }
  else if (genero.checked) {
    
    resposta.appendChild(li)
  }
  else {
    
    resposta.appendChild(li)
  }

 
  let checkedCount2 = 0
  const arr = []
   if(alergia === "sim"){
    arr.push(alergiaDetalhe)

  }
  if(alergia === "nao"){
     arr.push("Sem alergias")
  }
   resposta.appendChild( `<span>Alergias: ${arr}</span>`)

  const arr2 = []
  if (especificacao === "neuroatipico") {
    arr2.push(neuroatipicoDetalhe)
    checkedCount2++;
  }
  if (especificacao === "60mais") {
    arr2.push(" 60 anos ou + ")
    checkedCount2++;
  }
  if (especificacao === "nenhuma") {
    arr2.push(" Nenhuma ")
    checkedCount2++;
  }



  resposta.appendChild( `<span>Especificações: ${arr2}</span>`)


}
document.getElementById("alergiaSim").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "block";
});
document.getElementById("alergiaNao").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "none";
});
document.getElementById("neuroatipico").addEventListener("change", function () {
  document.getElementById("neuroatipicoDetalhe").style.display = "block";
});
document.querySelectorAll('input[name="especificacao"]').forEach(function (radio) {
  if (radio.id !== "neuroatipico") {
    radio.addEventListener("change", function () {
      document.getElementById("neuroatipicoDetalhe").style.display = "none";

    });
  }
});
