/**
 * ==========================================================================
 * PORTAL OPP (DTPAR / TRANSFEREGOV.BR) - MENTOR DE INTENÇÕES
 * JavaScript Vanilla (ES6+)
 * 
 * Regras Aplicadas:
 *   - ENCONTRAR > ENTENDER > USAR
 *   - Triagem por Intenções reais ("Criar Pagamento", "Autorizar", "Resolver Erro")
 *   - Simulador Prático com Feedback Direcional (Spotlight e foco exclusivo na ação)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTriageSystem();
  initTableSearch();
  initSimulator();
});

/**
 * --------------------------------------------------------------------------
 * 1. TRIAGEM POR INTENÇÕES (TRIAGE)
 * Permite ao usuário filtrar instantaneamente pelo que deseja fazer
 * --------------------------------------------------------------------------
 */
function initTriageSystem() {
  const triageCards = document.querySelectorAll('.triage-card');
  if (!triageCards.length) return;

  const intentionPanels = document.querySelectorAll('.intention-panel');

  triageCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetIntention = card.getAttribute('data-intention');

      // Atualiza estado visual dos cards de triagem
      triageCards.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-selected', 'true');

      // Exibe o painel de tarefas correspondente à intenção
      intentionPanels.forEach((panel) => {
        if (panel.id === `panel-${targetIntention}`) {
          panel.classList.remove('d-none');
        } else {
          panel.classList.add('d-none');
        }
      });

      // Rola suavemente até as ações da intenção
      const targetContainer = document.getElementById('intentionContentArea');
      if (targetContainer) {
        targetContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 2. BUSCA VISUAL DIRETA
 * --------------------------------------------------------------------------
 */
function initTableSearch() {
  const searchInput = document.getElementById('searchTasksInput');
  if (!searchInput) return;

  const noResultsAlert = document.getElementById('noResultsAlert');

  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    const taskRows = document.querySelectorAll('.task-row');
    let visibleCount = 0;

    taskRows.forEach((row) => {
      const taskTitle = row.querySelector('.task-title')?.textContent.toLowerCase() || '';
      const taskCode = row.querySelector('.task-code')?.textContent.toLowerCase() || '';
      const taskTags = row.querySelector('.task-tags')?.textContent.toLowerCase() || '';
      const combinedText = `${taskTitle} ${taskCode} ${taskTags}`;

      if (combinedText.includes(query)) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (noResultsAlert) {
      noResultsAlert.classList.toggle('d-none', visibleCount > 0);
    }
  });
}

/**
 * --------------------------------------------------------------------------
 * 3. MOTOR DO SIMULADOR PRÁTICO: FEEDBACK DIRECIONAL & SPOTLIGHT
 * --------------------------------------------------------------------------
 */
function initSimulator() {
  const simulatorViewport = document.getElementById('simulatorViewport');
  if (!simulatorViewport) return;

  const screenImg = document.getElementById('simulatorScreenImg');
  const hotspotsContainer = document.getElementById('simulatorHotspots');
  const instructionText = document.getElementById('instructionText');
  const stepBadge = document.getElementById('instructionStepBadge');
  const progressBar = document.getElementById('simulatorProgressBar');
  const successOverlay = document.getElementById('simulatorSuccessOverlay');
  const btnRestart = document.getElementById('btnRestartSimulation');
  const btnPrevStep = document.getElementById('btnPrevStep');

  // PASSOS REAIS DE "CRIAR ORDEM DE PAGAMENTO" (PIX AGÊNCIA E CONTA)
  const simulationSteps = [
    {
      id: 1,
      phase: 'Passo 1 de 6: Iniciar Pagamento',
      instruction: 'Clique no botão azul <strong>"Incluir"</strong> no canto superior da lista de ordens.',
      screenImage: 'MATERIAL DE APOIO/imagens/telas/passo3_botao_incluir.png',
      spotlight: {
        top: '46.5%',
        left: '87.5%',
        width: '5.5%',
        height: '4.8%',
        hint: 'Clique em: Incluir'
      }
    },
    {
      id: 2,
      phase: 'Passo 2 de 6: Escolher Tipo',
      instruction: 'Selecione a modalidade: clique em <strong>"Pix Agência e Conta"</strong>.',
      screenImage: 'MATERIAL DE APOIO/imagens/telas/passo4_selecionar_pix.png',
      spotlight: {
        top: '65.2%',
        left: '51%',
        width: '13.2%',
        height: '7.8%',
        hint: 'Clique: Pix Agência e Conta'
      }
    },
    {
      id: 3,
      phase: 'Passo 3 de 6: Confirmar Credor',
      instruction: 'Confira a agência e conta do credor e clique no botão <strong>"Próximo"</strong>.',
      screenImage: 'MATERIAL DE APOIO/imagens/telas/passo5_dados_favorecido.png',
      spotlight: {
        top: '87.4%',
        left: '71.5%',
        width: '6.2%',
        height: '4.5%',
        hint: 'Clique em: Próximo'
      }
    },
    {
      id: 4,
      phase: 'Passo 4 de 6: Anexar e Gravar',
      instruction: 'Após revisar o valor e anexar a Nota Fiscal, clique em <strong>"Salvar"</strong> para registrar a ordem.',
      screenImage: 'MATERIAL DE APOIO/imagens/telas/passo7_anexo_salvar.png',
      spotlight: {
        top: '73.2%',
        left: '79.2%',
        width: '7.2%',
        height: '5.2%',
        hint: 'Clique em: Salvar'
      }
    },
    {
      id: 5,
      phase: 'Passo 5 de 6: Autorização GF',
      instruction: 'No perfil Gestor Financeiro, revise a ordem e clique em <strong>"✔ Autorizar"</strong>.',
      screenImage: 'MATERIAL DE APOIO/imagens/telas/passo10_autorizar_gf.png',
      spotlight: {
        top: '87.8%',
        left: '87.2%',
        width: '7.2%',
        height: '4.5%',
        hint: 'Clique: ✔ Autorizar (GF)'
      }
    },
    {
      id: 6,
      phase: 'Passo 6 de 6: Autorização OD no TGOV',
      instruction: 'No perfil Ordenador de Despesas, aprove a ordem no Transferegov clicando em <strong>"✔ Autorizar"</strong>.',
      screenImage: 'MATERIAL DE APOIO/imagens/telas/passo13_autorizar_od.png',
      spotlight: {
        top: '87.8%',
        left: '87.2%',
        width: '7.2%',
        height: '4.5%',
        hint: 'Clique: ✔ Autorizar (OD TGOV)'
      }
    }
  ];

  let currentStepIndex = 0;

  function renderStep(index) {
    if (index >= simulationSteps.length) {
      showCompletion();
      return;
    }

    if (successOverlay) {
      successOverlay.classList.add('d-none');
    }

    const step = simulationSteps[index];

    if (instructionText) {
      instructionText.innerHTML = step.instruction;
    }
    if (stepBadge) {
      stepBadge.textContent = step.phase;
    }

    if (progressBar) {
      const progressPercent = Math.round(((index + 1) / simulationSteps.length) * 100);
      progressBar.style.width = `${progressPercent}%`;
      progressBar.setAttribute('aria-valuenow', progressPercent);
      progressBar.textContent = `${progressPercent}%`;
    }

    if (screenImg) {
      screenImg.src = step.screenImage;
      screenImg.alt = `Simulação Transferegov.br: ${step.instruction.replace(/<[^>]*>?/gm, '')}`;
    }

    if (btnPrevStep) {
      btnPrevStep.disabled = (index === 0);
    }

    // Renderiza o Spotlight Direcional (Iluminação precisa no elemento-alvo)
    if (hotspotsContainer) {
      hotspotsContainer.innerHTML = '';

      const spotBtn = document.createElement('button');
      spotBtn.type = 'button';
      spotBtn.className = 'simulator-spotlight';
      spotBtn.style.top = step.spotlight.top;
      spotBtn.style.left = step.spotlight.left;
      spotBtn.style.width = step.spotlight.width;
      spotBtn.style.height = step.spotlight.height;
      spotBtn.setAttribute('aria-label', step.spotlight.hint);
      spotBtn.setAttribute('title', step.spotlight.hint);

      const hintBadge = document.createElement('span');
      hintBadge.className = 'spotlight-hint';
      hintBadge.innerHTML = `<i class="bi bi-hand-index-thumb me-1"></i> ${step.spotlight.hint}`;
      spotBtn.appendChild(hintBadge);

      spotBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentStepIndex++;
        renderStep(currentStepIndex);
      });

      hotspotsContainer.appendChild(spotBtn);
    }
  }

  // Feedback de clique incorreto (vibração de erro na tela)
  simulatorViewport.addEventListener('click', (e) => {
    if (!e.target.closest('.simulator-spotlight') && !e.target.closest('#simulatorSuccessOverlay')) {
      triggerWrongClickFeedback();
    }
  });

  function triggerWrongClickFeedback() {
    simulatorViewport.classList.remove('wrong-click');
    void simulatorViewport.offsetWidth;
    simulatorViewport.classList.add('wrong-click');
  }

  function showCompletion() {
    if (successOverlay) {
      successOverlay.classList.remove('d-none');
    }
    if (instructionText) {
      instructionText.innerHTML = '<strong>Ordem autorizada no sistema!</strong> Agora o Ordenador deve autorizar no banco até as 20h00.';
    }
    if (stepBadge) {
      stepBadge.textContent = 'Concluído no TGOV';
    }
    if (progressBar) {
      progressBar.style.width = '100%';
      progressBar.setAttribute('aria-valuenow', 100);
      progressBar.textContent = '100%';
    }
    if (hotspotsContainer) {
      hotspotsContainer.innerHTML = '';
    }
  }

  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      currentStepIndex = 0;
      renderStep(currentStepIndex);
    });
  }

  if (btnPrevStep) {
    btnPrevStep.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep(currentStepIndex);
      }
    });
  }

  renderStep(0);
}
