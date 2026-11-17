/**
 * ==========================================================================
 * PORTAL OPP (DTPAR / TRANSFEREGOV.BR) - MENTOR DE INTENÇÕES
 * JavaScript Vanilla (ES6+)
 * 
 * Versão 2.0 - Aproveitamento Máximo de 100% dos Materiais (49 Lâminas):
 *   - Trilha 1: Pix Agência e Conta (7 passos com código do lote)
 *   - Trilha 2: Boleto Bancário / Código de Barras (5 passos)
 *   - Trilha 3: Primeiro Acesso, Login Gov.br e Navegação (5 passos)
 *   - Trilha 4: Tratamento de Erros, Expiração após 20h e Exclusão (3 passos)
 * 
 * Recursos:
 *   - Pedagogia em 2 Tempos (Observar Campos -> Agir no Botão)
 *   - Botão Funcional de Copiar o Código do Lote (com feedback imediato)
 *   - Seletor de Trilha Dinâmico
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTriageSystem();
  initTableSearch();
  initSimulator();
});

/**
 * --------------------------------------------------------------------------
 * 1. TRIAGEM POR INTENÇÕES (Índice Mestre)
 * --------------------------------------------------------------------------
 */
function initTriageSystem() {
  const triageCards = document.querySelectorAll('.triage-card');
  if (!triageCards.length) return;

  const intentionPanels = document.querySelectorAll('.intention-panel');

  triageCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetIntention = card.getAttribute('data-intention');

      triageCards.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-selected', 'true');

      intentionPanels.forEach((panel) => {
        if (panel.id === `panel-${targetIntention}`) {
          panel.classList.remove('d-none');
        } else {
          panel.classList.add('d-none');
        }
      });

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
 * 3. MOTOR DO SIMULADOR PRÁTICO: MULTI-TRILHAS (49 LÂMINAS)
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
  const pageTitle = document.getElementById('taskMainTitle');
  const copyLoteBtnContainer = document.getElementById('copyLoteContainer');

  let transitionTimer = null;

  // Identifica a trilha pela URL (?tipo=pix, ?tipo=boleto, ?tipo=login, ?tipo=erros)
  const urlParams = new URLSearchParams(window.location.search);
  const currentFlowType = urlParams.get('tipo') || 'pix';

  // Atualiza as abas no topo da página de simulação (se existirem)
  const navPills = document.querySelectorAll('.sim-nav-pill');
  navPills.forEach(pill => {
    if (pill.getAttribute('data-tipo') === currentFlowType) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  let simulationSteps = [];

  // ========================================================================
  // TRILHA 1: PIX AGÊNCIA E CONTA (Slides 19 a 24 e 37 a 46)
  // ========================================================================
  if (currentFlowType === 'pix') {
    if (pageTitle) pageTitle.textContent = 'Criar Ordem de Pagamento (Pix Agência e Conta)';

    simulationSteps = [
      {
        id: 1,
        phase: 'Passo 1 de 7: Iniciar Pagamento',
        hasFieldsPreview: false,
        instruction: 'Na lista de ordens da parceria, clique no botão azul <strong>"Incluir"</strong> no canto direito superior.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_19.png',
        actionButton: {
          top: '46.5%',
          left: '87.5%',
          width: '5.5%',
          height: '4.8%',
          hint: 'Clique em: Incluir'
        }
      },
      {
        id: 2,
        phase: 'Passo 2 de 7: Escolher Modalidade',
        hasFieldsPreview: false,
        instruction: 'Selecione a modalidade de pagamento: clique no botão <strong>"Pix Agência e Conta"</strong>.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_20.png',
        actionButton: {
          top: '65.2%',
          left: '51%',
          width: '13.2%',
          height: '7.8%',
          hint: 'Clique: Pix Agência e Conta'
        }
      },
      {
        id: 3,
        phase: 'Passo 3 de 7: Dados do Favorecido',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Observe os dados bancários:</strong> Verifique se o Banco, Agência, Conta e CPF/CNPJ do credor estão corretos.',
        fieldsArea: {
          top: '51%',
          left: '22%',
          width: '56%',
          height: '35%',
          hint: 'Campos preenchidos do Favorecido'
        },
        actInstruction: '<strong>2. Tudo conferido?</strong> Clique no botão azul <strong>"Próximo"</strong> para continuar.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_21.png',
        actionButton: {
          top: '87.4%',
          left: '71.5%',
          width: '6.2%',
          height: '4.5%',
          hint: 'Clique em: Próximo'
        }
      },
      {
        id: 4,
        phase: 'Passo 4 de 7: Valor e Meta da Parceria',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Dados Financeiros:</strong> Confira o Valor em Reais (R$) e a descrição correlacionada à Meta da Parceria.',
        fieldsArea: {
          top: '61%',
          left: '22%',
          width: '56%',
          height: '25%',
          hint: 'Campos de Valor (R$) e Meta'
        },
        actInstruction: '<strong>2. Avançar:</strong> Clique no botão azul <strong>"Próximo"</strong> para anexar a Nota Fiscal.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_22.png',
        actionButton: {
          top: '87.4%',
          left: '71.5%',
          width: '6.2%',
          height: '4.5%',
          hint: 'Clique em: Próximo'
        }
      },
      {
        id: 5,
        phase: 'Passo 5 de 7: Anexar Documento e Salvar',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Comprovação Obrigatória:</strong> Veja a área onde o arquivo da Nota Fiscal Eletrônica foi anexado.',
        fieldsArea: {
          top: '34%',
          left: '8%',
          width: '79%',
          height: '21%',
          hint: 'Área de Anexo do Documento Hábil'
        },
        actInstruction: '<strong>2. Gravar:</strong> Clique no botão azul <strong>"Salvar"</strong> para registrar a ordem de pagamento.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_23.png',
        actionButton: {
          top: '73.2%',
          left: '79.2%',
          width: '7.2%',
          height: '5.2%',
          hint: 'Clique em: Salvar'
        }
      },
      {
        id: 6,
        phase: 'Passo 6 de 7: Seleção pelo Gestor Financeiro',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Localizar Ordem:</strong> Como Gestor Financeiro (GF), localize a ordem com status <em>"Incluída"</em> na listagem.',
        fieldsArea: {
          top: '28%',
          left: '2%',
          width: '85%',
          height: '7%',
          hint: 'Ordem listada com status [Incluída]'
        },
        actInstruction: '<strong>2. Selecionar:</strong> Marque a caixa de seleção e clique em <strong>"✔ Avançar"</strong>.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_37.png',
        actionButton: {
          top: '77.5%',
          left: '86.8%',
          width: '7%',
          height: '4.8%',
          hint: 'Clique: ✔ Avançar (GF)'
        }
      },
      {
        id: 7,
        phase: 'Passo 7 de 7: Obter Código do Lote para o Banco',
        hasFieldsPreview: true,
        isFinalBatchStep: true,
        loteCode: '202500000539_4',
        observeInstruction: '<strong>1. Código do Lote Gerado:</strong> O Transferegov gerou o Lote <strong>202500000539_4</strong>. Guarde esse número para o banco.',
        fieldsArea: {
          top: '52%',
          left: '34%',
          width: '32%',
          height: '8%',
          hint: 'Código do Lote: 202500000539_4'
        },
        actInstruction: '<strong>2. Concluir:</strong> Copie o código abaixo e clique em <strong>"✕ Fechar"</strong> para finalizar no sistema.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_46.png',
        actionButton: {
          top: '61.5%',
          left: '60.5%',
          width: '5.8%',
          height: '3.5%',
          hint: 'Clique: ✕ Fechar'
        }
      }
    ];

  // ========================================================================
  // TRILHA 2: BOLETO BANCÁRIO / CÓDIGO DE BARRAS (Slides 26 a 31)
  // ========================================================================
  } else if (currentFlowType === 'boleto') {
    if (pageTitle) pageTitle.textContent = 'Criar Ordem de Pagamento (Boleto / Código de Barras)';

    simulationSteps = [
      {
        id: 1,
        phase: 'Passo 1 de 5: Selecionar Modalidade',
        hasFieldsPreview: false,
        instruction: 'Na tela de escolha de tipo, clique no botão <strong>"Código de Barras"</strong>.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_27.png',
        actionButton: {
          top: '81.2%',
          left: '21.2%',
          width: '12.8%',
          height: '7.8%',
          hint: 'Clique: Código de Barras'
        }
      },
      {
        id: 2,
        phase: 'Passo 2 de 5: Informar Código de Barras',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Linha Digitável:</strong> O operador insere os 47 dígitos numéricos do boleto bancário.',
        fieldsArea: {
          top: '63%',
          left: '14.5%',
          width: '34%',
          height: '9%',
          hint: 'Linha digitável preenchida'
        },
        actInstruction: '<strong>2. Validar:</strong> Clique no botão azul <strong>"Próximo"</strong> para buscar os dados bancários.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_28.png',
        actionButton: {
          top: '73.2%',
          left: '73.8%',
          width: '7.4%',
          height: '4.8%',
          hint: 'Clique: Próximo'
        }
      },
      {
        id: 3,
        phase: 'Passo 3 de 5: Conferir Cedente e Vencimento',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Dados do Banco:</strong> Confira o Favorecido, a data de Vencimento e o Valor automático do boleto.',
        fieldsArea: {
          top: '46%',
          left: '14%',
          width: '68%',
          height: '24%',
          hint: 'Conferência de Cedente e Valor'
        },
        actInstruction: '<strong>2. Confirmar:</strong> Se as informações estiverem corretas, clique em <strong>"Próximo"</strong>.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_29.png',
        actionButton: {
          top: '78.5%',
          left: '73.8%',
          width: '7.4%',
          height: '4.8%',
          hint: 'Clique: Próximo'
        }
      },
      {
        id: 4,
        phase: 'Passo 4 de 5: Regra de Vencimento e Juros',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Regra Crítica:</strong> Caso pague em atraso, a instituição bancária pode cobrar encargos legais.',
        fieldsArea: {
          top: '45%',
          left: '9.5%',
          width: '42%',
          height: '9%',
          hint: 'Regra de pagamento com acréscimo'
        },
        actInstruction: '<strong>2. Marcar Aceite:</strong> Selecione a opção <strong>"Sim"</strong> para permitir liquidação com acréscimo.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_30.png',
        actionButton: {
          top: '50.2%',
          left: '10.2%',
          width: '5%',
          height: '3.5%',
          hint: 'Marcar: Sim'
        }
      },
      {
        id: 5,
        phase: 'Passo 5 de 5: Anexo e Gravação',
        hasFieldsPreview: false,
        instruction: 'Revise o anexo da fatura/documento e clique no botão azul <strong>"Salvar"</strong> para registrar a ordem.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_31.png',
        actionButton: {
          top: '78.8%',
          left: '73.5%',
          width: '7.4%',
          height: '4.8%',
          hint: 'Clique: Salvar Ordem'
        }
      }
    ];

  // ========================================================================
  // TRILHA 3: PRIMEIRO ACESSO, LOGIN E NAVEGAÇÃO (Slides 10 a 17)
  // ========================================================================
  } else if (currentFlowType === 'login') {
    if (pageTitle) pageTitle.textContent = 'Primeiro Acesso: Login Gov.br e Localizar Parceria';

    simulationSteps = [
      {
        id: 1,
        phase: 'Passo 1 de 5: Portal Transferegov',
        hasFieldsPreview: false,
        instruction: 'No portal Transferegov.br, clique no card <strong>"Transferegov.br"</strong> para entrar no ambiente operacional.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_10.png',
        actionButton: {
          top: '42%',
          left: '13%',
          width: '24%',
          height: '18%',
          hint: 'Clique no card: Transferegov.br'
        }
      },
      {
        id: 2,
        phase: 'Passo 2 de 5: Módulo Gestão de Parcerias',
        hasFieldsPreview: false,
        instruction: 'Selecione o módulo <strong>"GESTÃO DE PARCERIAS"</strong> para acessar os convênios e transferências.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_11.png',
        actionButton: {
          top: '38%',
          left: '42%',
          width: '16%',
          height: '24%',
          hint: 'Clique: Gestão de Parcerias'
        }
      },
      {
        id: 3,
        phase: 'Passo 3 de 5: Autenticação Gov.br Ouro',
        hasFieldsPreview: false,
        instruction: 'Clique no botão azul <strong>"Entrar com gov.br"</strong> (necessário possuir nível OURO).',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_12.png',
        actionButton: {
          top: '52%',
          left: '41%',
          width: '18%',
          height: '8%',
          hint: 'Clique: Entrar com gov.br'
        }
      },
      {
        id: 4,
        phase: 'Passo 4 de 5: Menu Gestão Financeira > OPP',
        hasFieldsPreview: false,
        instruction: 'Clique no menu superior esquerdo <strong>[☰ Três Barras]</strong> &gt; <strong>Gestão Financeira</strong> &gt; <strong>OPP</strong>.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_16.png',
        actionButton: {
          top: '18%',
          left: '2%',
          width: '18%',
          height: '9%',
          hint: 'Clique: Gestão Financeira > OPP'
        }
      },
      {
        id: 5,
        phase: 'Passo 5 de 5: Pesquisar Parceria',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Código da Parceria:</strong> Digite o número do convênio ou contrato de repasse no campo de pesquisa.',
        fieldsArea: {
          top: '48%',
          left: '14%',
          width: '32%',
          height: '8%',
          hint: 'Campo Código da Parceria'
        },
        actInstruction: '<strong>2. Buscar:</strong> Clique no botão azul <strong>"Pesquisar"</strong> para abrir a parceria.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_17.png',
        actionButton: {
          top: '48.5%',
          left: '48%',
          width: '8%',
          height: '5%',
          hint: 'Clique: Pesquisar'
        }
      }
    ];

  // ========================================================================
  // TRILHA 4: TRATAMENTO DE ERROS, EXPIRAÇÃO DAS 20H E EXCLUSÃO (Slides 09 e 25)
  // ========================================================================
  } else if (currentFlowType === 'erros') {
    if (pageTitle) pageTitle.textContent = 'Tratamento de Erros: Ordem Recusada por Tempo & Exclusão';

    simulationSteps = [
      {
        id: 1,
        phase: 'Passo 1 de 3: Identificar a Recusa no Banco',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Erro Crítico (Slide 09):</strong> Se o Ordenador não autorizar no banco até as 20h, o status vira <em>"Recusada Banco // Motivo: expirada por tempo"</em>.',
        fieldsArea: {
          top: '42%',
          left: '12%',
          width: '76%',
          height: '18%',
          hint: 'Aviso oficial: Expirada por tempo no Banco'
        },
        actInstruction: '<strong>2. O que fazer?</strong> O dinheiro continua seguro na conta. Clique em <strong>"Avançar"</strong> para ver como resolver.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_09.png',
        actionButton: {
          top: '74%',
          left: '70%',
          width: '14%',
          height: '7%',
          hint: 'Clique: Como Resolver'
        }
      },
      {
        id: 2,
        phase: 'Passo 2 de 3: Localizar Ordem com Erro',
        hasFieldsPreview: true,
        observeInstruction: '<strong>1. Identificar na Lista:</strong> Uma ordem com erro de dados só pode ser excluída enquanto estiver na situação <em>"INCLUÍDA"</em>.',
        fieldsArea: {
          top: '28%',
          left: '2%',
          width: '85%',
          height: '7%',
          hint: 'Ordem com situação: [INCLUÍDA]'
        },
        actInstruction: '<strong>2. Acessar Detalhes:</strong> Clique no ícone de lápis da coluna "Ações" para abrir a ordem.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_37.png',
        actionButton: {
          top: '30.2%',
          left: '89.5%',
          width: '2%',
          height: '3.2%',
          hint: 'Clique: Ações'
        }
      },
      {
        id: 3,
        phase: 'Passo 3 de 3: Excluir a Ordem',
        hasFieldsPreview: false,
        instruction: 'No rodapé da ordem incorreta, clique no botão <strong>"Excluir"</strong> para cancelar a operação e liberar a emissão de uma nova.',
        screenImage: 'MATERIAL DE APOIO/imagens/todas_as_telas/tela_oficial_pag_25.png',
        actionButton: {
          top: '78.5%',
          left: '64.5%',
          width: '8.2%',
          height: '4.8%',
          hint: 'Clique: Excluir'
        }
      }
    ];
  }

  let currentStepIndex = 0;

  function renderStep(index) {
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    if (index >= simulationSteps.length) {
      showCompletion();
      return;
    }

    if (successOverlay) {
      successOverlay.classList.add('d-none');
    }

    const step = simulationSteps[index];

    if (screenImg) {
      screenImg.src = step.screenImage;
      screenImg.alt = `Simulação Transferegov.br: ${step.phase}`;
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

    if (btnPrevStep) {
      btnPrevStep.disabled = (index === 0);
    }

    // Exibe ou oculta o container de copiar código do lote
    if (copyLoteBtnContainer) {
      if (step.isFinalBatchStep) {
        copyLoteBtnContainer.classList.remove('d-none');
        setupCopyLoteButton(step.loteCode);
      } else {
        copyLoteBtnContainer.classList.add('d-none');
      }
    }

    if (step.hasFieldsPreview) {
      renderTempo1(step);
    } else {
      renderTempo2(step);
    }
  }

  function renderTempo1(step) {
    if (!hotspotsContainer) return;
    hotspotsContainer.innerHTML = '';

    if (instructionText) {
      instructionText.innerHTML = `
        <span class="instruction-phase-indicator phase-observe me-2"><i class="bi bi-eye"></i> 1. Observar</span>
        ${step.observeInstruction}
      `;
    }

    const previewBox = document.createElement('div');
    previewBox.className = 'fields-preview-box';
    previewBox.style.top = step.fieldsArea.top;
    previewBox.style.left = step.fieldsArea.left;
    previewBox.style.width = step.fieldsArea.width;
    previewBox.style.height = step.fieldsArea.height;

    const hint = document.createElement('span');
    hint.className = 'fields-preview-hint';
    hint.innerHTML = `<i class="bi bi-info-circle me-1"></i> ${step.fieldsArea.hint}`;
    previewBox.appendChild(hint);

    hotspotsContainer.appendChild(previewBox);

    transitionTimer = setTimeout(() => {
      renderTempo2(step);
    }, 1800);

    simulatorViewport.onclick = (e) => {
      if (!e.target.closest('.simulator-action-btn') && !e.target.closest('#simulatorSuccessOverlay')) {
        if (transitionTimer) {
          clearTimeout(transitionTimer);
          transitionTimer = null;
        }
        renderTempo2(step);
      }
    };
  }

  function renderTempo2(step) {
    if (!hotspotsContainer) return;
    hotspotsContainer.innerHTML = '';

    simulatorViewport.onclick = (e) => {
      if (!e.target.closest('.simulator-action-btn') && !e.target.closest('#simulatorSuccessOverlay')) {
        triggerWrongClickFeedback();
      }
    };

    if (instructionText) {
      const textToUse = step.actInstruction || step.instruction;
      instructionText.innerHTML = `
        <span class="instruction-phase-indicator phase-act me-2"><i class="bi bi-hand-index"></i> 2. Agir</span>
        ${textToUse}
      `;
    }

    const actionBtn = document.createElement('button');
    actionBtn.type = 'button';
    actionBtn.className = 'simulator-action-btn';
    actionBtn.style.top = step.actionButton.top;
    actionBtn.style.left = step.actionButton.left;
    actionBtn.style.width = step.actionButton.width;
    actionBtn.style.height = step.actionButton.height;
    actionBtn.setAttribute('aria-label', step.actionButton.hint);
    actionBtn.setAttribute('title', step.actionButton.hint);

    const hintBadge = document.createElement('span');
    hintBadge.className = 'action-btn-hint';
    hintBadge.innerHTML = `<i class="bi bi-cursor-fill me-1"></i> ${step.actionButton.hint}`;
    actionBtn.appendChild(hintBadge);

    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentStepIndex++;
      renderStep(currentStepIndex);
    });

    hotspotsContainer.appendChild(actionBtn);
  }

  function setupCopyLoteButton(code) {
    const btn = document.getElementById('btnCopyLoteCode');
    if (!btn) return;

    btn.onclick = () => {
      navigator.clipboard.writeText(code).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="bi bi-check-circle-fill text-success me-1"></i> Código ${code} Copiado!`;
        btn.classList.add('btn-success');
        btn.classList.remove('btn-warning');
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-warning');
        }, 2500);
      });
    };
  }

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
      instructionText.innerHTML = '<strong>Trilha Concluída!</strong> Você finalizou com êxito todos os passos oficiais do Transferegov.br.';
    }
    if (stepBadge) {
      stepBadge.textContent = 'Concluído';
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

  // Controle de Tela Cheia / Modo Imersivo para Smartphones e Apresentações
  const btnFullscreen = document.getElementById('btnToggleFullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      const targetWrapper = document.querySelector('.simulator-wrapper') || simulatorViewport;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (targetWrapper.requestFullscreen) {
          targetWrapper.requestFullscreen().catch(() => {});
        } else if (targetWrapper.webkitRequestFullscreen) {
          targetWrapper.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });

    const updateFullscreenBtnState = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (isFs) {
        btnFullscreen.innerHTML = '<i class="bi bi-fullscreen-exit me-1"></i> <span class="d-none d-sm-inline">Sair</span>';
      } else {
        btnFullscreen.innerHTML = '<i class="bi bi-arrows-fullscreen me-1"></i> <span class="d-none d-sm-inline">Tela Cheia</span>';
      }
    };

    document.addEventListener('fullscreenchange', updateFullscreenBtnState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenBtnState);
  }

  renderStep(0);
}
