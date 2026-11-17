# Portal de Tutoriais e Simulações - Módulo OPP (DTPAR / Transferegov.br)

Portal estático, responsivo e acessível (WCAG 2.1 AA) para capacitação e micro-learning operacional do módulo de **Ordens de Pagamento das Parcerias (OPP)** do Transferegov.br.

🌐 **Acesso em Produção (GitHub Pages):**  
👉 [https://marcelofernandesgarcia-dev.github.io/manual-opp/](https://marcelofernandesgarcia-dev.github.io/manual-opp/)  
*(Protegido com diretiva `noindex, nofollow` para privacidade contra robôs de busca).*

---

## 🚀 Versão 2.1 (Novidades e Mobile UX)
- **49 Lâminas Oficiais DTPAR:** 100% integradas e navegáveis em alta definição.
- **Ergonomia Mobile (WCAG 2.5.5):** Hitbox tátil de 48px, carrossel de trilhas deslizante e aviso animado de rotação de tela.
- **Modo Tela Cheia:** Botão de visualização imersiva para celulares em modo paisagem e apresentações em monitores.
- **Zero Dependências:** 100% estático (HTML5, CSS3, Vanilla JS), seguro e imune a bloqueios de rede.

---

## 📁 Estrutura de Pastas

```text
MANUAL OPP/
│
├── index.html              # Índice Mestre com as 4 fases e busca instantânea
├── opp_emissao.html        # Modelo padrão de Tarefa / Micro-learning / Simulação
├── README.md               # Este guia técnico e instrucional
│
├── css/
│   └── style.css           # Estilos complementares, acessibilidade (WCAG) e hotspots
│
├── js/
│   └── app.js              # JavaScript ES6+ puro (busca e simulador de 5 passos)
│
└── MATERIAL DE APOIO/      # Repositório de mídias e documentos instrucionais
    ├── 2. Tutorial - OPP_Ordem de Pagamento da Parceria_Módulo Gestão de Parcerias (3).pdf
    ├── Implantação em massa da OPP - Reunião Elo União, Estadual e Municipal - Versão 2.pdf
    ├── videos/             # Vídeos instrucionais (MP4 ou WebM)
    ├── slides/             # Apresentações em PDF/PPTX
    ├── imagens/
    │   ├── telas/          # Capturas de tela reais do sistema para a simulação
    │   └── fluxos/         # Infográficos e diagramas de fluxo em alta resolução
    └── audios/             # Narrações e podcasts explicativos
```

---

## 🏛️ Regras de Negócio Oficiais Incorporadas

Conforme documentado no manual oficial da DTPAR e no [Portal Transferegov.br](https://www.gov.br/transferegov/pt-br):

1. **Gov.br Nível OURO:** Obrigatório para todos os perfis realizarem operações financeiras.
2. **Segregação de Funções:** Um mesmo usuário **não pode** atuar simultaneamente como Gestor Financeiro (GF) e Ordenador de Despesas (OD) da mesma parceria.
3. **Janela Operacional no Transferegov.br:** Das **07h00 às 19h30** (segunda a sexta, horário de Brasília).
4. **Janela Bancária:** O Ordenador de Despesas deve efetivar a autorização no Gerenciador Financeiro / App do Banco até as **20h00** do mesmo dia.
5. **Abertura de Poupança (Banco do Brasil):** É indispensável certificar junto à agência do BB que a conta poupança anexa à conta vinculada foi aberta para que haja regularização sistêmica.

---

## 🎯 Como Substituir os Mocks pelos Seus Materiais Finais

### 1. Inserir Vídeo Instrucional (`opp_emissao.html` - Seção 1)
Copie o vídeo para `MATERIAL DE APOIO/videos/tutorial_opp.mp4` e atualize a tag:
```html
<video class="w-100 rounded" controls>
  <source src="MATERIAL DE APOIO/videos/tutorial_opp.mp4" type="video/mp4">
  Seu navegador não suporta vídeos HTML5.
</video>
```

### 2. Inserir Telas da Simulação (`js/app.js` - Seção 3)
Salve as capturas de tela do sistema real em `MATERIAL DE APOIO/imagens/telas/` (ex: `passo1.png`, `passo2.png`) e substitua a chamada `createOfficialMockScreen` no array `simulationSteps`:
```javascript
{
  id: 1,
  phase: 'Fase 1: Inclusão',
  instruction: 'Clique no menu superior [☰ Três Barras] > Gestão Financeira > OPP.',
  screenImage: 'MATERIAL DE APOIO/imagens/telas/passo1.png',
  hotspot: {
    top: '18%',
    left: '2%',
    width: '18%',
    height: '9%',
    hint: 'Clique: Menu [Gestão Financeira > OPP]'
  }
}
```

---

## 🚀 Como Executar Localmente
O portal não requer Node.js, PHP nem banco de dados. Dê duplo clique em `index.html` ou execute via terminal:
```bash
python -m http.server 8000
```
E acesse `http://localhost:8000`.
