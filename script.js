// Obtém o formulário e a lista onde os cadastros serão exibidos 
const form = document.getElementById("form");
const resposta = document.getElementById("ul");

/*
 * Função showMessage
 * Exibe mensagens dinâmicas na tela, logo abaixo do formulário.
 */
function showMessage(msg, tipo = "erro") {
  let msgDiv = document.getElementById("msg");
  if (!msgDiv) {
    msgDiv = document.createElement("div");
    msgDiv.id = "msg";
    msgDiv.style.margin = "10px 0";
    msgDiv.style.fontWeight = "bold";
    form.parentNode.insertBefore(msgDiv, form.nextSibling);
  }
  msgDiv.style.color = tipo === "erro" ? "red" : "green";
  msgDiv.innerText = msg;
  setTimeout(() => { msgDiv.innerText = ""; }, 3000);
}

// Exibe/oculta campo de detalhe de alergia
document.getElementById("alergiaSim").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "block";
});
document.getElementById("alergiaNao").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "none";
});
document.getElementById("alergiaNaoSei").addEventListener("change", function () {
  document.getElementById("alergiaDetalhe").style.display = "none";
});

// Exibe/oculta campo de detalhe de neuroatipicidade
document.getElementById("neuroatipico").addEventListener("change", function () {
  document.getElementById("neuroatipicoDetalhe").style.display = "block";
});
document.querySelectorAll('input[name="prioridade"]').forEach(function (radio) {
  if (radio.id !== "neuroatipico") {
    radio.addEventListener("change", function () {
      document.getElementById("neuroatipicoDetalhe").style.display = "none";
    });
  }
});

// Seleção automática de "60 anos ou +"
document.addEventListener('DOMContentLoaded', function() {
  const dataNascimento = document.getElementById('dataDeNascimento');
  const radio60mais = document.getElementById('60mais');
  if (!dataNascimento || !radio60mais) return;

  dataNascimento.addEventListener('change', function() {
    if (!this.value) return;
    const hoje = new Date();
    // pega a data atual 
    const nascimento = new Date(this.value);
    //pega o valor da data de nascimento
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    //pega o ano de hoje e diminui pelo input do nascimento
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() <= nascimento.getDate())) {
      // analisa se a pessoa já fez aniversário, senão, diminui um ano dela, ex: 60 = 59 
      idade--;
    }
    radio60mais.checked = idade >= 60;
    //checa a idade automático se for 60 anos ou +
  });
});

/*
 * Envio do formulário com validação detalhada
 */
form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Captura valores dos campos de texto
  const nome = document.getElementById("nome")?.value.trim() || "";
  const sobrenome = document.getElementById("sobrenome")?.value.trim() || "";
  const dataDeNascimento = document.getElementById("dataDeNascimento")?.value.trim() || "";
  const responsavel = document.getElementById("responsavel")?.value.trim() || "";
  const mae = document.getElementById("nomeMae")?.value.trim() || "";
  const procedimento = document.getElementById("procedimento")?.value.trim() || "";
  const CPF = document.getElementById("CPF")?.value.trim() || "";
  const medicacao = document.getElementById("medicacao")?.value.trim() || "";
  const endereco = document.getElementById("endereco")?.value.trim() || "";
  const telefone = document.getElementById("telefone")?.value.trim() || "";
  const doenca = document.getElementById("doencas")?.value.trim() || "";

  // Captura opções selecionadas de radio buttons
  let genero = document.querySelector('input[name="genero"]:checked');
  let prioridade = document.querySelector('input[name="prioridade"]:checked');
  let especificacao = document.querySelector('input[name="especificacao"]:checked');
  let alergia = document.querySelector('input[name="alergia"]:checked');
  let neuroatipicidade = document.querySelector('input[name="prioridade"]:checked');

  // Captura campos de detalhes
  const alergiaDetalhe = document.getElementById("alergiaDetalhe")?.value.trim() || "";
  const neuroatipicoDetalhe = document.getElementById("neuroatipicoDetalhe")?.value.trim() || "";

const cadastro = [
  nome, sobrenome, dataDeNascimento, responsavel, mae, procedimento, CPF,  medicacao, endereco, telefone, doenca, genero, prioridade, especificacao, alergia, neuroatipicidade
]
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  cadastros.push(cadastro);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  
  
  // Validação dos campos obrigatórios com alert específico
  if (!nome) {
    alert("Digite o nome corretamente.");
    showMessage("Por favor, preencha o nome.", "erro");
    return;
  }
  if (!sobrenome) {
    alert("Digite o sobrenome corretamente.");
    showMessage("Por favor, preencha o sobrenome.", "erro");
    return;
  }
  if (!dataDeNascimento) {
    alert("Digite a data de nascimento corretamente.");
    showMessage("Por favor, preencha a data de nascimento.", "erro");
    return;
  }
  if (!CPF || !/^\d{11}$/.test(CPF)) {
    alert("Digite o CPF corretamente (11 dígitos numéricos).");
    showMessage("CPF deve conter exatamente 11 dígitos numéricos.", "erro");
    return;
  }
  if (!endereco) {
    alert("Digite o endereço corretamente.");
    showMessage("Por favor, preencha o endereço.", "erro");
    return;
  }
   if (!telefone || !/^\d{13}$/.test(telefone)) {
    alert("Digite o telefone corretamente (13 dígitos numéricos).");
    showMessage("Telefone deve conter exatamente 13 dígitos numéricos.", "erro");
    return;
    // regex que testa quantos dígitos tem o telefone
    // ^ início da string
    // \d{13} 13 dígitos 
    // $ fim da string 
    
  }
   if (!mae) {
    alert("Digite o nome da mãe corretamente.");
    showMessage("Por favor, preencha o nome da mãe.", "erro");
    return;
  }
   if (!procedimento) {
    alert("Digite o procedimento corretamente.");
    showMessage("Por favor, preencha o procedimento.", "erro");
    return;
  }
  if (!responsavel) {
    alert("Digite o responsável corretamente.");
    showMessage("Por favor, preencha o responsável.", "erro");
    return;
  }
  if (!doenca) {
    alert("Digite a doença corretamente.");
    showMessage("Por favor, preencha a doença.", "erro");
    return;
  }
 
  if (!medicacao) {
    alert("Digite a medicação corretamente.");
    showMessage("Por favor, preencha a medicação.", "erro");
    return;
  }
  
 
 
  if (!genero) {
    alert("Selecione o gênero.");
    showMessage("Por favor, selecione o gênero.", "erro");
    return;
  }
   if (!alergia) {
    alert("Selecione a opção de alergia.");
    showMessage("Por favor, selecione a opção de alergia.", "erro");
    return;
  }
  if (alergia.value === "sim" && !alergiaDetalhe) {
    alert("Descreva a alergia.");
    showMessage("Por favor, descreva a alergia.", "erro");
    return;
  }
  if (!(prioridade || (especificacao && especificacao.value === "60mais"))) {
    alert("Selecione a prioridade ou especificação.");
    showMessage("Por favor, selecione a prioridade ou especificação.", "erro");
    return;
  }
 
  if (neuroatipicidade && neuroatipicidade.value === "neuroatipico" && !neuroatipicoDetalhe) {
    alert("Descreva a neuroatipicidade.");
    showMessage("Por favor, descreva a neuroatipicidade.", "erro");
    return;
  }

  // Monta texto de alergia
  let alergiaTexto = "";
  if (alergia.value === "sim") {
    alergiaTexto = `Sim${alergiaDetalhe ? " (" + alergiaDetalhe + ")" : ""}`;
  } else if (alergia.value === "nao") {
    alergiaTexto = "Não";
  } else {
    alergiaTexto = "Não sei";
  }

  // Monta texto de especificação/prioridade
  let prioridadeTexto = "";
  let especificacaoTexto = "";
  if (prioridade && prioridade.value === "neuroatipico") {
    prioridadeTexto = `Neuroatípico${neuroatipicoDetalhe ? " (" + neuroatipicoDetalhe + ")" : ""}`;
  } else if (prioridade && prioridade.value === "gestante") {
    prioridadeTexto = "Gestante";
  } else {
    prioridadeTexto = "Nenhuma";
  }

  if (especificacao && especificacao.value === "60mais") {
    especificacaoTexto = "60 anos ou +";
  }

  // Cria o elemento de lista para exibir o cadastro na tela
  let li = document.createElement("li");
  li.innerHTML = `
    <span>Nome: ${nome}</span> <br> 
    <span>Sobrenome: ${sobrenome}</span> <br>
    <span>Data de Nascimento: ${dataDeNascimento}</span> <br>
    <span>Responsável: ${responsavel}</span> <br>
    <span>Procedimento: ${procedimento}</span> <br>
    <span>CPF: ${CPF}</span> <br>
    <span>Mãe: ${mae}</span> <br>
    <span>Medicação: ${medicacao}</span> <br>
    <span>Endereço: ${endereco}</span> <br>
    <span>Telefone: ${telefone}</span> <br>
    <span>Doença: ${doenca}</span> <br>
    <span>Gênero: ${genero.value}</span> <br>
    <span>Alergias: ${alergiaTexto}</span> <br>
    <span>Prioridade: ${prioridadeTexto}</span> <br> 
    <span>Especificações: ${especificacaoTexto}</span> <br>
    <hr>
  `;
  resposta.appendChild(li);

  // Mensagem de sucesso na tela
  showMessage("Concluído!", "sucesso");

  // Limpa o formulário e esconde campos dinâmicos
  form.reset();
  document.getElementById("alergiaDetalhe").style.display = "none";
  document.getElementById("neuroatipicoDetalhe").style.display = "none";
  
});
// Alterna abas
        document.getElementById("btnCadastro").onclick = function() {
            document.getElementById("cadastro-section").style.display = "block";
            document.getElementById("login-section").style.display = "none";
            document.getElementById("agenda-section").style.display = "none";
            document.getElementById("config-section").style.display = "none";
            document.getElementById("painel-titulo").style.display = "none"; // Esconde o título
        };

        document.getElementById("btnLogin").onclick = function() {
            document.getElementById("cadastro-section").style.display = "none";
            document.getElementById("login-section").style.display = "block";
            document.getElementById("agenda-section").style.display = "none";
            document.getElementById("config-section").style.display = "none";
            document.getElementById("painel-titulo").style.display = "inline"; // Mostra o título
        };
        document.getElementById("btnAgenda").onclick = function() {
    document.getElementById("cadastro-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("agenda-section").style.display = "block";
    document.getElementById("config-section").style.display = "none";
    document.getElementById("painel-titulo").style.display = "none";
};

document.getElementById("btnConfig").onclick = function() {
    document.getElementById("cadastro-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("agenda-section").style.display = "none";
    document.getElementById("config-section").style.display = "block";
    document.getElementById("painel-titulo").style.display = "none";
};

        // Esconde o botão de enviar ao clicar no Painel
document.getElementById('btnLogin').addEventListener('click', function() {
    document.getElementById('cadastro-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.querySelector('button[type="submit"]').style.display = 'none';
});

// Mostra o botão de enviar ao voltar para Cadastro
document.getElementById('btnCadastro').addEventListener('click', function() {
    document.getElementById('cadastro-section').style.display = 'block';
    document.getElementById('login-section').style.display = 'none';
    document.querySelector('button[type="submit"]').style.display = 'inline-block';
});

function mostrarAba(aba) {
    document.getElementById("home-section").style.display = "none";
    document.getElementById("cadastro-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("agenda-section").style.display = "none";
    document.getElementById("config-section").style.display = "none";
    document.getElementById("painel-titulo").style.display = "none";

    // Mostra ou esconde o botão de enviar conforme a aba
    const btnEnviar = document.querySelector('button[type="submit"]');
    if (btnEnviar) {
        btnEnviar.style.display = (aba === "cadastro") ? "inline-block" : "none";
    }

    if (aba === "home") {
        document.getElementById("home-section").style.display = "block";
    } else if (aba === "cadastro") {
        document.getElementById("cadastro-section").style.display = "block";
    } else if (aba === "login") {
        document.getElementById("login-section").style.display = "block";
        document.getElementById("painel-titulo").style.display = "inline";
    } else if (aba === "agenda") {
        document.getElementById("agenda-section").style.display = "block";
    } else if (aba === "config") {
        document.getElementById("config-section").style.display = "block";
    }
}

// Inicialmente mostra só a home
window.onload = function() {
    mostrarAba("home");
};

document.getElementById("btnHome").onclick = function() { mostrarAba("home"); };
document.getElementById("btnCadastro").onclick = function() { mostrarAba("cadastro"); };
document.getElementById("btnLogin").onclick = function() { mostrarAba("login"); };
document.getElementById("btnAgenda").onclick = function() { mostrarAba("agenda"); };
document.getElementById("btnConfig").onclick = function() { mostrarAba("config"); };

