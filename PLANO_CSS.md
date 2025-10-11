# Plano de Conversão: CSS Modules → Tailwind CSS

## **Resumo**
- **Total de arquivos CSS module:** 9 arquivos
- **Total de linhas CSS:** ~1.325 linhas
- **Objetivo:** Converter todos os estilos para Tailwind CSS inline e remover CSS modules

---

## **Fase 1: Componentes Simples (Baixa Complexidade)**
Começar pelos componentes menores e mais simples para ganhar confiança.

### **1.1 CourseEvaluation** (38 linhas)
- **Arquivo:** `/src/components/cursos/CourseEvaluation.tsx`
- **CSS:** `/src/components/cursos/CourseEvaluation.module.css`
- **Complexidade:** ⭐ Baixa
- **Ações:**
  - Converter estilos de section/container
  - Aplicar Tailwind para texto e espaçamento
  - Remover import do CSS module
  - Deletar arquivo CSS

---

## **Fase 2: Componentes de Cards (Complexidade Média)**

### **2.1 CardProfessor** (148 linhas)
- **Arquivo:** `/src/components/ui/card-professor.tsx`
- **CSS:** `/src/components/ui/card-professor.module.css`
- **Complexidade:** ⭐⭐ Média
- **Ações:**
  - Converter layout horizontal (foto + info)
  - Converter avatar circular com gradiente
  - Converter footer com contatos
  - Manter hover effects com Tailwind
  - Responsividade mobile/desktop

### **2.2 CourseAbout** (119 linhas)
- **Arquivo:** `/src/components/cursos/CourseAbout.tsx`
- **CSS:** `/src/components/cursos/CourseAbout.module.css`
- **Complexidade:** ⭐⭐ Média
- **Ações:**
  - Converter grid de highlights (3 colunas)
  - Converter ícones com gradiente
  - Converter espaçamento e tipografia

### **2.3 CourseWorkload** (128 linhas)
- **Arquivo:** `/src/components/cursos/CourseWorkload.tsx`
- **CSS:** `/src/components/cursos/CourseWorkload.module.css`
- **Complexidade:** ⭐⭐ Média
- **Ações:**
  - Converter tabela estilizada
  - Converter header com gradiente
  - Converter hover effects nas linhas
  - Converter linha de total

---

## **Fase 3: Componentes Interativos (Complexidade Alta)**

### **3.1 CourseInvestmentCard** (141 linhas)
- **Arquivo:** `/src/components/cursos/CourseInvestmentCard.tsx`
- **CSS:** `/src/components/cursos/CourseInvestmentCard.module.css`
- **Complexidade:** ⭐⭐⭐ Alta
- **Ações:**
  - Converter card flutuante com sticky positioning
  - Converter display de preços (principal, original, parcelado)
  - Converter lista de detalhes com ícones
  - Converter botões CTA com hover/active states
  - Testar posicionamento sticky

### **3.2 CourseCurriculum** (182 linhas)
- **Arquivo:** `/src/components/cursos/CourseCurriculum.tsx`
- **CSS:** `/src/components/cursos/CourseCurriculum.module.css`
- **Complexidade:** ⭐⭐⭐ Alta
- **Ações:**
  - Converter accordion interativo
  - Converter estados (expandido/colapsado)
  - Converter ícones de expansão animados
  - Converter seções internas (ementa, objetivos, bibliografia)
  - Manter animações de transição

---

## **Fase 4: Componentes de Layout (Complexidade Muito Alta)**

### **4.1 CourseDetailHero** (190 linhas)
- **Arquivo:** `/src/components/cursos/CourseDetailHero.tsx`
- **CSS:** `/src/components/cursos/CourseDetailHero.module.css`
- **Complexidade:** ⭐⭐⭐⭐ Muito Alta
- **Ações:**
  - Converter layout grid complexo (video 66.5% + card 32%)
  - Converter background gradient posicionado
  - Converter video/imagem com overlay
  - Converter badges flutuantes
  - Converter título overlay no vídeo
  - Manter responsividade mobile/desktop
  - **CRÍTICO:** Garantir que investment card se alinhe corretamente

### **4.2 Página Corpo Docente** (63 linhas)
- **Arquivo:** `/src/app/(site)/corpo-docente/page.tsx`
- **CSS:** `/src/app/(site)/corpo-docente/page.module.css`
- **Complexidade:** ⭐⭐ Média
- **Ações:**
  - Converter container principal
  - Converter header centralizado
  - Converter grid responsivo (1/2/3 colunas)

### **4.3 Página de Detalhes do Curso** (316 linhas)
- **Arquivo:** `/src/app/(site)/cursos/[slug]/page.tsx`
- **CSS:** `/src/app/(site)/cursos/[slug]/page.module.css`
- **Complexidade:** ⭐⭐⭐⭐⭐ Crítica
- **Ações:**
  - Converter layout principal com grid
  - Converter mobile floating button (fixed bottom)
  - Converter aside flutuante (sticky sidebar)
  - Converter todas as sections internas
  - Converter grid de contatos (3 colunas)
  - **CRÍTICO:** Testar layout desktop + mobile
  - **CRÍTICO:** Garantir que card de investimento flutue corretamente

---

## **Estratégia de Execução**

### **Ordem de Conversão (Recomendada):**
1. ✅ **CourseEvaluation** - Mais simples, testar workflow
2. ✅ **CourseAbout** - Ganhar confiança com grids
3. ✅ **CourseWorkload** - Praticar tabelas estilizadas
4. ✅ **CardProfessor** - Componente reutilizável importante
5. ✅ **Corpo Docente Page** - Usa CardProfessor
6. ✅ **CourseCurriculum** - Accordion interativo
7. ✅ **CourseInvestmentCard** - Card crítico do layout
8. ✅ **CourseDetailHero** - Layout complexo mas isolado
9. ✅ **Página de Detalhes do Curso** - Integração final

### **Para Cada Componente:**
1. **Ler** o CSS module para entender os estilos
2. **Ler** o TSX para ver estrutura atual
3. **Converter** classes CSS em Tailwind inline
4. **Remover** import do CSS module
5. **Testar** build (`npm run build`)
6. **Verificar** visualmente no browser
7. **Deletar** arquivo CSS module
8. **Commit** as mudanças

### **Pontos de Atenção:**
- ⚠️ **Valores customizados:** Usar bracket notation `[valor]`
- ⚠️ **Shadows complexos:** `shadow-[0_8px_20px_rgba(...)]`
- ⚠️ **Gradientes:** `bg-gradient-to-r from-[cor] via-[cor] to-[cor]`
- ⚠️ **Pseudo-elementos:** `before:` e `after:` prefixes
- ⚠️ **Estados:** `hover:`, `focus:`, `active:`
- ⚠️ **Responsividade:** `md:`, `lg:` prefixes
- ⚠️ **Animations:** Usar `transition-all duration-[ms]`

### **Teste Final:**
- ✅ Build sem erros TypeScript
- ✅ Build sem warnings de lint críticos
- ✅ Todas as páginas renderizando
- ✅ Layout desktop correto
- ✅ Layout mobile correto
- ✅ Investment card sticky funcionando
- ✅ Todas as interações (hover, click, expand) funcionando

---

## **Estimativa de Tempo**
- Fase 1: ~10 minutos
- Fase 2: ~30 minutos
- Fase 3: ~40 minutos
- Fase 4: ~60 minutos
- **Total estimado:** ~2h20min

---

## **Status de Execução**

### Fase 1: Componentes Simples
- [ ] 1.1 CourseEvaluation

### Fase 2: Componentes de Cards
- [ ] 2.1 CardProfessor
- [ ] 2.2 CourseAbout
- [ ] 2.3 CourseWorkload

### Fase 3: Componentes Interativos
- [ ] 3.1 CourseInvestmentCard
- [ ] 3.2 CourseCurriculum

### Fase 4: Componentes de Layout
- [ ] 4.1 CourseDetailHero
- [ ] 4.2 Página Corpo Docente
- [ ] 4.3 Página de Detalhes do Curso

---

**Criado em:** 2025-10-10
**Última atualização:** 2025-10-10
