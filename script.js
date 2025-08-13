// Obtém o formulário e a lista onde os cadastros serão exibidos 
const form = document.getElementById("form");
const resposta = document.getElementById("ul");

// Adiciona evento ao formulário para executar a função cadastro ao enviar
form.addEventListener("submit", cadastro);

function cadastro(e) {
  // Impede o envio padrão do formulário (recarregar página)
  e.preventDefault();

  // Captura valores dos campos de texto
  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const dataDeNascimento = document.getElementById("dataDeNascimento").value.trim();
  const responsavel = document.getElementById("responsavel").value.trim();
  const mae = document.getElementById("nomeMae").value.trim();
  const procedimento = document.getElementById("procedimento").value.trim()
  const CPF = document.getElementById("CPF").value.trim();
  const medicacao = document.getElementById("medicacao").value.trim()
  const endereco = document.getElementById("endereco").value.trim()
  const telefone = document.getElementById("telefone").value.trim()
  const doenca = document.getElementById("doenca").value.trim()
  // Captura opções selecionadas de radio buttons
  let genero = document.querySelector('input[name="genero"]:checked');
  let especificacao = document.querySelector('input[name="especificacao"]:checked');
  let alergia = document.querySelector('input[name="alergia"]:checked');
  let neuroatipicidade = document.querySelector('input[name="neuroatipico"]:checked');

  // Captura campos de detalhes
  const alergiaDetalhe = document.getElementById("alergiaDetalhe").value.trim();
  const neuroatipicoDetalhe = document.getElementById("neuroatipicoDetalhe").value.trim();



  // Cálculo automático "60 anos ou +"
  if (dataDeNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataDeNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    // Marca automaticamente o radio "60mais" se idade >= 60
    if (idade >= 60) {
      const radio60mais = document.getElementById("60mais");
      if (radio60mais) {
        radio60mais.checked = true;
        especificacao = radio60mais; // atualiza especificacao para refletir 60+
      }
    }
  }

  // Validação dos campos obrigatórios
  if (
    !nome ||
    !sobrenome ||
    !CPF ||
    !dataDeNascimento ||
    !responsavel ||
    !procedimento ||
    ! doenca ||
    !mae ||
    ! medicacao ||
    !endereco ||
    !telefone ||
    !genero ||
    !especificacao ||
    !neuroatipicidade ||
    !alergia ||
    (alergia.value === "sim" && !alergiaDetalhe) ||
    (neuroatipicidade.value === "neuroatipico" && !neuroatipicoDetalhe)
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Cria objeto com os dados para salvar no localStorage
  const cadastro = {
    nome,
    sobrenome,
    dataDeNascimento,
    responsavel,
    procedimento,
    mae,
    CPF,
    medicacao,
    doenca,
    endereco,
    telefone,
    genero: genero.value,
    especificacao: especificacao.value,
    neuroatipicidade: neuroatipicidade.value,
    neuroatipicoDetalhe: neuroatipicidade.value === "neuroatipico" ? neuroatipicoDetalhe : "",
    alergia: alergia.value,
    alergiaDetalhe: alergia.value === "sim" ? alergiaDetalhe : ""
  };

  // Recupera lista existente do localStorage e adiciona novo cadastro
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  cadastros.push(cadastro);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));

  alert("Concluído");
  form.reset();

  // Cria o elemento de lista para exibir o cadastro na tela
  let li = document.createElement("li");
  li.innerHTML = `
    <span>Nome: ${nome}</span> <br> 
    <span>Sobrenome: ${sobrenome}</span> <br>
    <span>Data de Nascimento: ${dataDeNascimento}</span> <br>
    <span>Responsável: ${responsavel}</span> <br>
    <span>Procedimento: ${procedimento}</span> <br>
    <span>CPF: ${CPF}</span> <br>
    <span>Mae: ${mae}</span> <br>
     <span>Medicacao: ${medicacao}</span> <br>
    <span>Endereco: ${endereco}</span> <br>
    <span>Telefone: ${telefone}</span> <br>
    <span>doenca: ${doenca}</span> <br>
    <span>Gênero: ${genero.value}</span> <br>
    <span>Alergias: ${ alergia.value === "sim"
       ? `Sim${alergiaDetalhe ? " (" + alergiaDetalhe + ")" : ""}`
        : alergia.value === "nao"
          ? "Sem alergias"
          : "Não tenho conhecimento"
    }</span> <br>
    <span>Neuroatipicidade: ${neuroatipicidade.value === "neuroatipico" ? `Sim - ${neuroatipicoDetalhe}` : "Não"}</span> <br>
    <span>especificacao: ${
      especificacao.value === "60mais"
        ? "60 anos ou +"
        : especificacao.value === "nenhuma"
        ? "Nenhuma"
        : especificacao.value
    }</span> <br>
  `;

  // Adiciona o item na lista de respostas exibidas
  resposta.appendChild(li);
}
  
// Exibe/oculta campo de detalhe de alergia
document.getElementById("alergiaSim").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "block";
});
document.getElementById("alergiaNao").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "none";
});

// Exibe/oculta campo de detalhe de neuroatipicidade
document.getElementById("neuroatipico").addEventListener("change", function () {
  document.getElementById("neuroatipicoDetalhe").style.display = "block";
});
document.querySelectorAll('input[name="neuroatipico"]').forEach(function (radio) {
  if (radio.id !== "neuroatipico") {
    radio.addEventListener("change", function () {
      document.getElementById("neuroatipicoDetalhe").style.display = "none";
    });
  }
});

   
// Seleciona automaticamente "60 anos ou +" ao preencher data de nascimento
document.addEventListener('DOMContentLoaded', function() {
  const dataNascimento = document.getElementById('dataDeNascimento');
  const radio60mais = document.getElementById('60mais');

  dataNascimento.addEventListener('input', function() {
    if (!this.value) return;

    const hoje = new Date();
    const nascimento = new Date(this.value);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
  
    radio60mais.checked = idade >= 60;

  });
});