# REGISTRO FORMAL DE ENTREGA - FASE 1 (BASELINE 1.0)

**Projeto:** Portal de Capacitação e Simulações - Módulo de Ordens de Pagamento das Parcerias (OPP / DTPAR / Transferegov.br)  
**Conceito Homologado:** "Mentor de Intenções" com Linguagem Simples e Simulador com Spotlight Direcional  
**Data do Registro:** 12/11/2026  
**Status:** CONCLUÍDO E HOMOLOGADO COMO PRIMEIRO RESULTADO ENTREGUE  

---

## 1. Escopo Homologado Nesta Entrega

1. **Arquitetura 100% Estática e Acessível (WCAG 2.1 AA):**
   - HTML5 semântico, CSS3 customizado, Bootstrap 5.3 (CDN), JavaScript Vanilla (ES6+).
   - Zero dependência de banco de dados, PHP ou Node.js em produção.
   - Totalmente compatível com navegadores modernos e leitores de tela.

2. **Índice Mestre Baseado em Triagem de Intenções (`index.html`):**
   - Entrada direta pela pergunta: *"O que você quer fazer hoje?"*.
   - 3 eixos de intenção:
     - 💳 *Criar Ordem de Pagamento*
     - ✍️ *Autorizar Pagamento*
     - 🛠️ *Resolver Erro ou Excluir*
   - Destaque em todas as visões para o **Prazo Crítico das 20h00** (aprovação bancária no mesmo dia).
   - Busca instantânea de procedimentos por termos, códigos ou perfis.

3. **Simulador Prático com Spotlight Direcional (`opp_emissao.html`):**
   - Centralização da experiência na prática do aluno.
   - Aplicação de máscara escura (*dimmer*) que escurece áreas irrelevantes e ilumina em amarelo pulsante exclusivamente o botão onde o usuário deve agir no momento.
   - 6 passos oficiais da emissão via Pix Agência e Conta calibrados sobre capturas reais do Transferegov.br.
   - Feedback direcional imediato para cliques fora do ponto de ação.

4. **Diretrizes Rígidas de Linguagem Simples (PLAIN / Câmara dos Deputados):**
   - Estrutura rigorosa: *Encontrar > Entender > Usar*.
   - Aplicação das 4 camadas de Redish & Kleimann (Conteúdo, Arquitetura, UX Writing e Design).

---

## 2. Preservação da Entrega no Repositório

Para garantir a rastreabilidade e permitir evolução futura sem risco de perda do primeiro resultado aprovado:

- **Pasta de Snapshot Permanente:**  
  [VERSAO_1.0_BASELINE/](file:///c:/Users/marce/OneDrive/Documentos/_MGI/MANUAL%20OPP/VERSAO_1.0_BASELINE/)  
  Contém a cópia intacta e imutável de todos os arquivos validados.

- **Pacote Autocontido Compactado:**  
  `ENTREGA_FASE1_BASELINE_MENTOR_OPP.zip` (~7.7 MB)  
  Pronto para distribuição, backup institucional ou implantação em servidores web estáticos.
