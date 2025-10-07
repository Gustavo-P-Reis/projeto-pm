function selectProblem(element, type) {
  document.querySelectorAll(".problem-option").forEach((opt) => {
    opt.classList.remove("selected");
  });
  element.classList.add("selected");
  document.getElementById("problemType").value = type;
}

function selectTime(element, time) {
  document.querySelectorAll(".time-option").forEach((opt) => {
    opt.classList.remove("selected");
  });
  element.classList.add("selected");
  document.getElementById("timeOccurred").value = time;
}

function selectUrgency(element, level) {
  document.querySelectorAll(".urgency-option").forEach((opt) => {
    opt.classList.remove("selected");
  });
  element.classList.add("selected");
  document.getElementById("urgencyLevel").value = level;
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("previewImg").src = e.target.result;
      document.getElementById("imagePreview").classList.add("active");
    };
    reader.readAsDataURL(file);
  }
}

function generateReport() {
  const title = document.getElementById("postTitle").value;
  const description = document.getElementById("postDescription").value;
  const userName = document.getElementById("userName").value;
  const problemType = document.getElementById("problemType").value;
  const timeOccurred = document.getElementById("timeOccurred").value;
  const urgency = document.getElementById("urgencyLevel").value;
  const neighborhood = document.getElementById("neighborhood").value;
  const city = document.getElementById("city").value;

  if (!title || !description || !problemType || !timeOccurred || !urgency) {
    alert(
      "Por favor, preencha todos os campos obrigatórios antes de gerar o relatório!"
    );
    return;
  }

  const problemNames = {
    "arvore-caida": "Árvore Caída",
    "arvore-doente": "Árvore Doente",
    "galhos-perigosos": "Galhos Perigosos",
    "raizes-danificadas": "Raízes Danificadas",
    "necessita-poda": "Necessita Poda",
    pragas: "Pragas",
    obstrucao: "Obstrução",
    outros: "Outros",
  };

  const timeNames = {
    hoje: "Hoje",
    ontem: "Ontem",
    "esta-semana": "Esta Semana",
    "mes-passado": "Mês Passado",
    "mais-de-mes": "Há Mais de 1 Mês",
    "nao-sei": "Não Identificado",
  };

  const urgencyNames = {
    baixa: "BAIXA",
    media: "MÉDIA",
    alta: "ALTA",
  };

  const report = `
                <strong>RELATÓRIO DE DENÚNCIA - RAIZIA</strong><br><br>
                
                <strong>Protocolo:</strong> #${Math.random()
                  .toString(36)
                  .substr(2, 9)
                  .toUpperCase()}<br>
                <strong>Data:</strong> ${new Date().toLocaleDateString(
                  "pt-BR"
                )} às ${new Date().toLocaleTimeString("pt-BR")}<br>
                <strong>Denunciante:</strong> ${userName}<br><br>
                
                <strong>DESCRIÇÃO DO PROBLEMA</strong><br>
                <strong>Título:</strong> ${title}<br>
                <strong>Tipo:</strong> ${problemNames[problemType]}<br>
                <strong>Ocorrência:</strong> ${timeNames[timeOccurred]}<br>
                <strong>Nível de Urgência:</strong> <span style="color: ${
                  urgency === "alta"
                    ? "#dc3545"
                    : urgency === "media"
                    ? "#ffc107"
                    : "#28a745"
                }; font-weight: bold;">${urgencyNames[urgency]}</span><br><br>
                
                <strong>Localização:</strong> ${neighborhood}, ${city}<br><br>
                
                <strong>Relato Detalhado:</strong><br>
                ${description}<br><br>
                
                <strong>Recomendações:</strong><br>
                ${
                  urgency === "alta"
                    ? "Este caso requer atenção IMEDIATA das autoridades competentes devido ao alto risco apresentado. Recomenda-se isolamento da área e intervenção técnica urgente."
                    : urgency === "media"
                    ? "Este caso requer atenção das autoridades em prazo médio. Recomenda-se avaliação técnica para determinar as ações necessárias."
                    : "Este caso deve ser registrado para acompanhamento. Recomenda-se vistoria técnica no local para análise da situação."
                }<br><br>
                
                <strong>Próximos Passos:</strong><br>
                1. Vistoria técnica no local<br>
                2. Avaliação de risco<br>
                3. Determinação de ações necessárias<br>
                4. Execução do serviço<br>
                5. Atualização do status<br><br>
                
                <em>Relatório gerado automaticamente pelo sistema Raizia</em>
            `;

  document.getElementById("reportContent").innerHTML = report;
  document.getElementById("aiOutput").classList.add("active");
  document.getElementById("continueLink").style.display = "inline-flex";
  document.getElementById("continueLink").href =
    "https://denuncia.raizia.com/" + Math.random().toString(36).substr(2, 9);
}

function handleSubmit(event) {
  event.preventDefault();

  const reportUrl = document.getElementById("reportUrl").value;
  const problemType = document.getElementById("problemType").value;
  const timeOccurred = document.getElementById("timeOccurred").value;
  const urgency = document.getElementById("urgencyLevel").value;

  if (!reportUrl) {
    alert("A URL da denúncia é obrigatória!");
    return;
  }

  if (!problemType) {
    alert("Por favor, selecione o tipo de problema!");
    return;
  }

  if (!timeOccurred) {
    alert("Por favor, selecione quando o problema ocorreu!");
    return;
  }

  if (!urgency) {
    alert("Por favor, selecione o nível de urgência!");
    return;
  }

  alert("Denúncia publicada com sucesso! As autoridades serão notificadas.");
  window.location.href = "index.html";
}

// Auto-completar coordenadas (simulado)
document.getElementById("postalCode").addEventListener("blur", function () {
  if (this.value) {
    document.getElementById("latitude").value =
      "-23." + Math.floor(Math.random() * 900000 + 100000);
    document.getElementById("longitude").value =
      "-46." + Math.floor(Math.random() * 900000 + 100000);
  }
});
