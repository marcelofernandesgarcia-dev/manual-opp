# REGISTRO FORMAL DE ENTREGA - VERSÃO 2.1 (MOBILE UX & GITHUB PAGES)

**Projeto:** Mentor de Intenções OPP (Ordens de Pagamento das Parcerias)  
**Órgão / Unidade:** DTPAR / MGI - Transferegov.br  
**Data do Registro:** 17/11/2026  
**Status:** CONCLUÍDO, PUBLICADO EM PRODUÇÃO E TESTADO NO MOBILE  

---

## 1. Escopo e Evoluções Entregues na Versão 2.1

1. **Publicação Oficial no GitHub Pages:**
   - Repositório remoto oficial: `https://github.com/marcelofernandesgarcia-dev/manual-opp`
   - Link de Produção: `https://marcelofernandesgarcia-dev.github.io/manual-opp/`
   - Disponibilidade: 24h por dia, certificado HTTPS ativo, 100% gratuito (R$ 0,00).
   - Privacidade: Diretiva `<meta name="robots" content="noindex, nofollow">` ativa em todas as páginas para impedir indexação no Google.

2. **Otimização Ergonômica Mobile (Padrão WCAG 2.5.5):**
   - **Área Tátil Expandida (48px Hitbox):** Implementação de pseudo-área invisível (`::after`) com no mínimo 48px $\times$ 48px nos botões interativos do simulador, eliminando cliques falsos e tremores indevidos no smartphone.
   - **Carrossel Horizontal de Trilhas:** Menu de navegação superior deslizante pelo toque (`overflow-x: auto`), reduzindo o consumo de espaço vertical de 160px para 44px.
   - **Barra de Instrução Sticky:** Painel de instruções fixo no topo do mobile para não perder o passo ao rolar.
   - **Prevenção de Zoom no iOS Safari:** Tipografia de campos calibrada em 16px para evitar auto-zoom indesejado.

3. **Novo Aviso Visual e Animado de Rotação de Tela (Mobile UX):**
   - **Animação Intuitiva (`phone-wiggle`):** Ícone animado em loop mostrando o celular girando de 0° para 90°.
   - **Banner com Pulso:** Cartão com gradiente institucional explicando o ganho de nitidez no modo horizontal.
   - **Auto-Ocultação na Horizontal (`orientation: landscape`):** O aviso desaparece instantaneamente e de forma automática assim que o aparelho é deitado de lado.
   - **Botão de Fechar (`[✕]`):** Opção rápida para dispensar o aviso manualmente.

4. **Preservação Integral do Desktop:**
   - 100% das regras mobile foram encapsuladas em media queries (`@media (max-width: 768px)`), garantindo que no computador o layout, navegação por mouse e cores permaneçam rigorosamente idênticos.

---

## 2. Rastreabilidade nos Ambientes

- **Local:** `c:\Users\marce\OneDrive\Documentos\_MGI\MANUAL OPP` (Git branch `main`).
- **GitHub:** `https://github.com/marcelofernandesgarcia-dev/manual-opp` (Commits sincronizados).
- **Obsidian:** `C:\Users\marce\Cerebro Pessoal\Projetos\mentor-opp-transferegov/` (Base de conhecimento documentada).
