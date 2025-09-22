// Obtém o formulário e a lista onde os cadastros serão exibidos
const form = document.getElementById("form-paciente");
const resposta = document.getElementById("pacientes-ul");

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

// Função para atualizar contador de pacientes na home
function atualizarContadorPacientes() {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const count = cadastros.length;
    const countElement = document.getElementById("pacientes-count");
    if (countElement) {
        countElement.textContent = count;
    }
}

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
    localStorage.setItem("enfermeiroNome", "Rafael");
    alert("Bem Vindo De Volta Rafael!");

  }
  if (i === 1) {
    localStorage.setItem("enfermeiroNome", "Lucas");
    alert("Bem Vindo De Volta Lucas!");
  }
  if (i === 2) {
    localStorage.setItem("enfermeiroNome", "Diogo");
    alert("Bem Vindo De Volta Diogo!");
  }
  window.location.href = "http://127.0.0.1:5500/index.html"
}
else{
  alert("CIP ou Senha Incorreto!")
}

}

// Função para atualizar contador de alertas pendentes na home
function atualizarContadorAlertas() {
    const cuidados = JSON.parse(localStorage.getItem("cuidados")) || [];
    const statusCuidados = JSON.parse(localStorage.getItem("statusCuidados")) || {};

    // Count cares that are still pending (not completed)
    let pendingCount = 0;
    cuidados.forEach((cuidado, index) => {
        const statusKey = `${cuidado.pacienteIndex}-${index}`;
        const status = statusCuidados[statusKey] || "pendente";
        if (status === "pendente") {
            pendingCount++;
        }
    });

    const alertElement = document.querySelector(".home-resumo-item strong");
    if (alertElement) {
        // Replace the number in the text content
        alertElement.textContent = alertElement.textContent.replace(/\d+/, pendingCount);
    }
}

// Função para carregar pacientes
function carregarPacientes() {
    resposta.innerHTML = "";
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.forEach((cadastro, index) => {
        let riscoHtml = "";
        if (cadastro.especificacao === "60mais") {
            riscoHtml = ` <span style="color: red;">! Risco de queda</span>`;
        }
        let li = document.createElement("li");
        li.innerHTML = `<button class="btn-padrao" onclick="mostrarDetalhes(${index})">${cadastro.nome} ${cadastro.sobrenome}</button><button class="btn-padrao" onclick="mostrarCuidadoModal(${index})">cuidado</button><button class="btn-padrao" onclick="mostrarHistoricoCuidado(${index})">histórico</button><button class="btn-padrao" onclick="removerPaciente(${index})" style="background: red; color: white;">X</button>${riscoHtml}`;
        resposta.appendChild(li);
    });
    atualizarContadorPacientes();
}

// Função para mostrar detalhes do paciente
function mostrarDetalhes(index) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[index];
    if (!cadastro) return;

    // Monta texto de alergia
    let alergiaTexto = "";
    if (cadastro.alergia === "sim") {
        alergiaTexto = `Sim${cadastro.alergiaDetalhe ? " (" + cadastro.alergiaDetalhe + ")" : ""}`;
    } else if (cadastro.alergia === "nao") {
        alergiaTexto = "Não";
    } else {
        alergiaTexto = "Não sei";
    }

    // Monta texto de prioridade
    let prioridadeTexto = "";
    if (cadastro.prioridade === "neuroatipico") {
        prioridadeTexto = `Neuroatípico${cadastro.neuroatipicoDetalhe ? " (" + cadastro.neuroatipicoDetalhe + ")" : ""}`;
    } else if (cadastro.prioridade === "gestante") {
        prioridadeTexto = "Gestante";
    } else {
        prioridadeTexto = "Nenhuma";
    }

    let especificacaoTexto = cadastro.especificacao === "60mais" ? "60 anos ou +" : "";

    const detalhes = `
        <p><strong>Nome:</strong> ${cadastro.nome}</p>
        <p><strong>Sobrenome:</strong> ${cadastro.sobrenome}</p>
        <p><strong>Data de Nascimento:</strong> ${cadastro.dataDeNascimento}</p>
        <p><strong>Responsável:</strong> ${cadastro.responsavel}</p>
        <p><strong>Procedimento:</strong> ${cadastro.procedimento}</p>
        <p><strong>CPF:</strong> ${cadastro.CPF}</p>
        <p><strong>Mãe:</strong> ${cadastro.mae}</p>
        <p><strong>Medicação:</strong> ${cadastro.medicacao}</p>
        <p><strong>Endereço:</strong> ${cadastro.endereco}</p>
        <p><strong>Telefone:</strong> ${cadastro.telefone}</p>
        <p><strong>Doença:</strong> ${cadastro.doenca}</p>
        <p><strong>Gênero:</strong> ${cadastro.genero}</p>
        <p><strong>Alergias:</strong> ${alergiaTexto}</p>
        <p><strong>Prioridade:</strong> ${prioridadeTexto}</p>
        <p><strong>Especificações:</strong> ${especificacaoTexto}</p>
    `;

    document.getElementById("detalhes-paciente").innerHTML = detalhes;
    document.getElementById("modal-ver-paciente").style.display = "block";
}

// Função para mostrar modal de novo cuidado
function mostrarCuidadoModal(index) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[index];
    if (!cadastro) return;

    const nomeCompleto = `${cadastro.nome} ${cadastro.sobrenome}`;
    document.getElementById("nome-paciente-cuidado").innerHTML = `<strong>Paciente:</strong> ${nomeCompleto}`;

    // Reset checkboxes
    document.getElementById("medicacao").checked = false;
    document.getElementById("banho-leito").checked = false;
    document.getElementById("hidratacao").checked = false;
    document.getElementById("mudanca-decubito").checked = false;

    // Reset new fields
    document.getElementById("observacoes-cuidado").value = "";
    document.getElementById("data-cuidado").value = "";
    document.getElementById("hora-cuidado").value = "";

    // Store patient index for saving
    document.getElementById("modal-novo-cuidado").dataset.patientIndex = index;
    document.getElementById("modal-novo-cuidado").style.display = "block";
}

// Função para salvar cuidado
function salvarCuidado() {
    // Get modal and patient index
    const modal = document.getElementById("modal-novo-cuidado");
    if (!modal || modal.style.display === "none") {
        alert("Erro: Modal não encontrado ou não visível.");
        return;
    }

    const patientIndex = modal.dataset.patientIndex;
    if (!patientIndex) {
        alert("Erro: Índice do paciente não encontrado.");
        return;
    }

    // Get selected care types - try multiple approaches
    const selectedCares = [];

    // First try: direct getElementById
    const checkboxes = [
        { id: "medicacao", label: "Medicação" },
        { id: "banho-leito", label: "Banho de leito" },
        { id: "hidratacao", label: "Hidratação" },
        { id: "mudanca-decubito", label: "Mudança de decúbito" }
    ];

    checkboxes.forEach(item => {
        const checkbox = document.getElementById(item.id);
        if (checkbox && checkbox.checked) {
            selectedCares.push(item.label);
        }
    });

    // If no checkboxes found, try alternative approach
    if (selectedCares.length === 0) {
        const modal = document.getElementById("modal-novo-cuidado");
        if (modal) {
            const allCheckboxes = modal.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    // Map ID to label
                    const labelMap = {
                        "medicacao": "Medicação",
                        "banho-leito": "Banho de leito",
                        "hidratacao": "Hidratação",
                        "mudanca-decubito": "Mudança de decúbito"
                    };
                    if (labelMap[checkbox.id]) {
                        selectedCares.push(labelMap[checkbox.id]);
                    }
                }
            });
        }
    }

    // Additional fallback: look for any checked checkbox in the modal
    if (selectedCares.length === 0) {
        const modal = document.getElementById("modal-novo-cuidado");
        if (modal) {
            const anyChecked = modal.querySelector('input[type="checkbox"]:checked');
            if (anyChecked) {
                // Force add based on checkbox ID
                if (anyChecked.id === "medicacao") {
                    selectedCares.push("Medicação");
                } else if (anyChecked.id === "banho-leito") {
                    selectedCares.push("Banho de leito");
                } else if (anyChecked.id === "hidratacao") {
                    selectedCares.push("Hidratação");
                } else if (anyChecked.id === "mudanca-decubito") {
                    selectedCares.push("Mudança de decúbito");
                }
            }
        }
    }

    // Validation: at least one care type must be selected
    if (selectedCares.length === 0) {
        alert("Selecione pelo menos um tipo de cuidado.");
        return;
    }

    // Get additional fields
    const observacoes = document.getElementById("observacoes-cuidado").value.trim();
    const dataCuidado = document.getElementById("data-cuidado").value;
    const horaCuidado = document.getElementById("hora-cuidado").value;

    // Validation: date and time are required
    if (!dataCuidado) {
        alert("Selecione a data do cuidado.");
        return;
    }
    if (!horaCuidado) {
        alert("Selecione o horário do cuidado.");
        return;
    }

    // Get patient data
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[parseInt(patientIndex)];
    if (!cadastro) {
        alert("Erro: Paciente não encontrado.");
        return;
    }

    // Create care record
    const cuidado = {
        pacienteNome: `${cadastro.nome} ${cadastro.sobrenome}`,
        tiposCuidado: selectedCares,
        observacoes: observacoes,
        dataCuidado: dataCuidado,
        horaCuidado: horaCuidado,
        dataHoraRegistro: new Date().toLocaleString('pt-BR'),
        pacienteIndex: parseInt(patientIndex)
    };

    // Store care records
    const cuidados = JSON.parse(localStorage.getItem("cuidados")) || [];
    cuidados.push(cuidado);
    localStorage.setItem("cuidados", JSON.stringify(cuidados));

    // Close modal and show success message
    modal.style.display = "none";
    alert("Cuidado registrado com sucesso!");

    // Refresh agenda if it's currently visible
    if (document.getElementById("agenda-section").style.display === "block") {
        carregarAgenda();
    }

}

// Função para mostrar histórico de cuidados do paciente
function mostrarHistoricoCuidado(index) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[index];
    if (!cadastro) return;

    const nomeCompleto = `${cadastro.nome} ${cadastro.sobrenome}`;
    document.getElementById("nome-paciente-historico").innerHTML = `<strong>Paciente:</strong> ${nomeCompleto}`;

    // Get care records for this patient
    const cuidados = JSON.parse(localStorage.getItem("cuidados")) || [];
    const cuidadosPaciente = cuidados.filter(cuidado => parseInt(cuidado.pacienteIndex) === index);

    const historicoLista = document.getElementById("historico-cuidados-lista");

    if (cuidadosPaciente.length === 0) {
        historicoLista.innerHTML = "<p>Nenhum cuidado registrado para este paciente.</p>";
    } else {
        let html = "<div style='max-height: 400px; overflow-y: auto;'>";
        cuidadosPaciente.forEach((cuidado, idx) => {
            const dataFormatada = new Date(cuidado.dataCuidado + 'T' + cuidado.horaCuidado).toLocaleString('pt-BR');
            html += `
                <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 5px;">
                    <h4>Cuidado #${idx + 1}</h4>
                    <p><strong>Data e Hora:</strong> ${dataFormatada}</p>
                    <p><strong>Tipos de Cuidado:</strong> ${cuidado.tiposCuidado.join(", ")}</p>
                    ${cuidado.observacoes ? `<p><strong>Observações:</strong> ${cuidado.observacoes}</p>` : ''}
                    <p><strong>Registrado em:</strong> ${cuidado.dataHoraRegistro}</p>
                </div>
            `;
        });
        html += "</div>";
        historicoLista.innerHTML = html;
    }

    document.getElementById("modal-historico-cuidado").style.display = "block";
}

// Função para carregar agenda de cuidados
function carregarAgenda() {
    const agendaLista = document.getElementById("agenda-lista");
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cuidados = JSON.parse(localStorage.getItem("cuidados")) || [];
    const statusCuidados = JSON.parse(localStorage.getItem("statusCuidados")) || {};

    if (cuidados.length === 0) {
        agendaLista.innerHTML = "<p>Nenhum cuidado agendado.</p>";
        return;
    }

    let html = "";
    cuidados.forEach((cuidado, cuidadoIndex) => {
        const cadastro = cadastros[parseInt(cuidado.pacienteIndex)];
        if (!cadastro) return;

        const nomeCompleto = `${cadastro.nome} ${cadastro.sobrenome}`;
        const dataFormatada = new Date(cuidado.dataCuidado + 'T' + cuidado.horaCuidado).toLocaleString('pt-BR');
        const statusKey = `${cuidado.pacienteIndex}-${cuidadoIndex}`;
        const status = statusCuidados[statusKey] || "pendente";
        const statusCor = status === "concluido" ? "green" : "red";
        const statusTexto = status === "concluido" ? "Concluído" : "Pendente";

        html += `
            <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; background: #f9f9f9;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <input type="radio" id="status-${cuidado.pacienteIndex}-${cuidadoIndex}" name="status-${cuidado.pacienteIndex}-${cuidadoIndex}" ${status === "concluido" ? "checked" : ""} onchange="atualizarStatusCuidadoIndividual('${cuidado.pacienteIndex}-${cuidadoIndex}')">
                    <button class="btn-padrao" onclick="mostrarCuidadoIndividual(${cuidadoIndex})" style="background: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">${nomeCompleto}</button>
                </div>
                <div style="margin-left: 30px; margin-bottom: 5px;">
                    <strong>Data e Hora:</strong> ${dataFormatada}
                </div>
                <div style="margin-left: 30px; margin-bottom: 5px;">
                    <strong>Tipos de Cuidado:</strong> ${cuidado.tiposCuidado.join(", ")}
                </div>
                <div style="color: ${statusCor}; font-weight: bold; margin-left: 30px;">
                    Status: ${statusTexto}
                </div>
            </div>
        `;
    });

    agendaLista.innerHTML = html;
}

// Função para mostrar cuidado individual
function mostrarCuidadoIndividual(cuidadoIndex) {
    const cuidados = JSON.parse(localStorage.getItem("cuidados")) || [];
    const cuidado = cuidados[cuidadoIndex];

    if (!cuidado) {
        alert("Cuidado não encontrado.");
        return;
    }

    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[parseInt(cuidado.pacienteIndex)];

    const dataFormatada = new Date(cuidado.dataCuidado + 'T' + cuidado.horaCuidado).toLocaleString('pt-BR');

    const detalhesHtml = `
        <div style="padding: 20px;">
            <h3>Detalhes do Cuidado</h3>
            <p><strong>Paciente:</strong> ${cuidado.pacienteNome}</p>
            <p><strong>Data e Hora:</strong> ${dataFormatada}</p>
            <p><strong>Tipos de Cuidado:</strong> ${cuidado.tiposCuidado.join(", ")}</p>
            ${cuidado.observacoes ? `<p><strong>Observações:</strong> ${cuidado.observacoes}</p>` : ''}
            <p><strong>Registrado em:</strong> ${cuidado.dataHoraRegistro}</p>
        </div>
    `;

    // Use the existing modal for patient details
    document.getElementById("detalhes-paciente").innerHTML = detalhesHtml;
    document.getElementById("modal-ver-paciente").style.display = "block";
}

// Função para atualizar status do cuidado individual
function atualizarStatusCuidadoIndividual(cuidadoKey) {
    const statusCuidados = JSON.parse(localStorage.getItem("statusCuidados")) || {};
    const radio = document.getElementById(`status-${cuidadoKey}`);

    // Find the status div more reliably
    const containerDiv = radio.closest('div[style*="border: 1px solid #ddd"]');
    const statusDiv = containerDiv.querySelector('div[style*="color"]');

    if (radio.checked) {
        statusCuidados[cuidadoKey] = "concluido";
        statusDiv.style.color = "green";
        statusDiv.textContent = "Status: Concluído";
    } else {
        statusCuidados[cuidadoKey] = "pendente";
        statusDiv.style.color = "red";
        statusDiv.textContent = "Status: Pendente";
    }

    localStorage.setItem("statusCuidados", JSON.stringify(statusCuidados));

}

// Função para remover paciente
function removerPaciente(index) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    // Remove patient from cadastros
    cadastros.splice(index, 1);

    // Remove all care records for this patient
    const cuidados = JSON.parse(localStorage.getItem("cuidados")) || [];
    const cuidadosFiltrados = cuidados.filter(cuidado => parseInt(cuidado.pacienteIndex) !== index);
    localStorage.setItem("cuidados", JSON.stringify(cuidadosFiltrados));

    // Remove status records for all care records of this patient
    const statusCuidados = JSON.parse(localStorage.getItem("statusCuidados")) || {};
    const statusKeysToRemove = Object.keys(statusCuidados).filter(key => {
        const [patientIndex] = key.split('-');
        return parseInt(patientIndex) === index;
    });

    statusKeysToRemove.forEach(key => {
        delete statusCuidados[key];
    });
    localStorage.setItem("statusCuidados", JSON.stringify(statusCuidados));

    // Update indices for remaining care records
    const cuidadosAtualizados = cuidadosFiltrados.map(cuidado => {
        if (parseInt(cuidado.pacienteIndex) > index) {
            return { ...cuidado, pacienteIndex: (parseInt(cuidado.pacienteIndex) - 1).toString() };
        }
        return cuidado;
    });

    // Update status record keys for remaining patients
    const statusAtualizados = {};
    Object.keys(statusCuidados).forEach(key => {
        const [patientIndexStr, careIndex] = key.split('-');
        const patientIndexNum = parseInt(patientIndexStr);

        if (patientIndexNum > index) {
            const newKey = `${patientIndexNum - 1}-${careIndex}`;
            statusAtualizados[newKey] = statusCuidados[key];
        } else if (patientIndexNum < index) {
            statusAtualizados[key] = statusCuidados[key];
        }
        // Keys for the deleted patient are already removed above
    });

    if (cuidadosAtualizados.length > 0) {
        localStorage.setItem("cuidados", JSON.stringify(cuidadosAtualizados));
    }
    if (Object.keys(statusAtualizados).length > 0) {
        localStorage.setItem("statusCuidados", JSON.stringify(statusAtualizados));
    }

    localStorage.setItem("cadastros", JSON.stringify(cadastros));
    carregarPacientes();
    atualizarContadorPacientes();

    // Refresh agenda if it's currently visible
    if (document.getElementById("agenda-section").style.display === "block") {
        carregarAgenda();
    }

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

const cadastro = {
   nome, sobrenome, dataDeNascimento, responsavel, mae, procedimento, CPF, medicacao, endereco, telefone, doenca, genero: genero ? genero.value : '', prioridade: prioridade ? prioridade.value : '', especificacao: especificacao ? especificacao.value : '', alergia: alergia ? alergia.value : '', neuroatipicidade: neuroatipicidade ? neuroatipicidade.value : '', alergiaDetalhe, neuroatipicoDetalhe
}

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

  // Verificar se paciente já existe
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  if (cadastros.some(c => c.nome === nome && c.sobrenome === sobrenome && c.CPF === CPF)) {
    alert("Paciente já cadastrado com esses dados.");
    showMessage("Paciente já cadastrado.", "erro");
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

  cadastros.push(cadastro);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));

  // Mensagem de sucesso na tela
  showMessage("Concluído!", "sucesso");

  // Fecha o modal e reseta o formulário
  document.getElementById("modal-adicionar-paciente").style.display = "none";
  form.reset();
  document.getElementById("alergiaDetalhe").style.display = "none";
  document.getElementById("neuroatipicoDetalhe").style.display = "none";

  // Atualiza a lista de pacientes
  carregarPacientes();
  atualizarContadorPacientes();

});
// Modal open/close
document.getElementById("btnAdicionarPaciente").addEventListener("click", function() {
    document.getElementById("modal-adicionar-paciente").style.display = "block";
});

document.getElementById("btnFecharModal").addEventListener("click", function() {
    document.getElementById("modal-adicionar-paciente").style.display = "none";
    form.reset();
    document.getElementById("alergiaDetalhe").style.display = "none";
    document.getElementById("neuroatipicoDetalhe").style.display = "none";
});

document.getElementById("btnFecharVerModal").addEventListener("click", function() {
    document.getElementById("modal-ver-paciente").style.display = "none";
});

document.getElementById("btnFecharCuidadoModal").addEventListener("click", function() {
    document.getElementById("modal-novo-cuidado").style.display = "none";
});

document.getElementById("btnSalvarCuidado").addEventListener("click", function() {
    salvarCuidado();
});

document.getElementById("btnFecharHistoricoModal").addEventListener("click", function() {
    document.getElementById("modal-historico-cuidado").style.display = "none";
});

function mostrarAba(aba) {
    document.getElementById("home-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("agenda-section").style.display = "none";
    document.getElementById("config-section").style.display = "none";
    document.getElementById("painel-titulo").style.display = "none";

    if (aba === "home") {
        document.getElementById("home-section").style.display = "block";
    } else if (aba === "login") {
        document.getElementById("login-section").style.display = "block";
        document.getElementById("painel-titulo").style.display = "inline";
        carregarPacientes();
    } else if (aba === "agenda") {
        document.getElementById("agenda-section").style.display = "block";
        carregarAgenda();
    } else if (aba === "config") {
        document.getElementById("config-section").style.display = "block";
    }
}

// Inicialmente mostra só a home
window.onload = function() {
    mostrarAba("home");
    atualizarContadorPacientes();
};

document.getElementById("btnHome").onclick = function() { mostrarAba("home"); };
document.getElementById("btnLogin").onclick = function() { mostrarAba("login"); };
document.getElementById("btnAgenda").onclick = function() { mostrarAba("agenda"); };
document.getElementById("btnConfig").onclick = function() { mostrarAba("config"); };

// Atualizar mensagem de boas-vindas com o nome do enfermeiro se logado
if (document.querySelector(".home-ola")) {
  let nome = localStorage.getItem("enfermeiroNome");
  if (nome) {
    document.querySelector(".home-ola").innerHTML = `<strong>Olá, Enfermeiro(a) ${nome}!</strong>`;
  }
}

// Event listener para o botão "Ver Pacientes" na home
document.getElementById("btnVerPacientes").onclick = function() {
    mostrarAba("login");
};

// Event listener para o botão "Ver Alertas" na home
document.getElementById("btnVerAlertas").onclick = function() {
    mostrarAba("agenda");
};

// Botão Voltar retorna para a página de login
document.getElementById("btnVoltar").onclick = function() {
    window.location.href = "LoginEnfermeiro.html";
};