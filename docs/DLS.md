# FAFIH Design Language System (DLS)

Última atualização: 2025-10-13

Este guia consolida identidade visual, tokens e padrões de interface do projeto FAFIH, servindo como referência rápida para qualquer pessoa (humana ou IA) que implemente novas telas ou mantenha componentes existentes.

## 1. Identidade Visual

| Elemento            | Diretriz                                                                                  |
|---------------------|--------------------------------------------------------------------------------------------|
| DNA visual          | Humanidades + inovação tecnológica. Uso recorrente de gradientes institucionais, blocos brancos com sombras suaves e cantos arredondados.|
| Tom de voz textual  | Institucional, acolhedor, foco em ética, criatividade, impacto social.                     |
| Ritmo de layout     | Seções respiradas, headings com destaque, cartões em grades responsivas.                  |

## 2. Design Tokens

Tokens centralizados em `tailwind.config.js`, `src/app/globals.css` e variáveis CSS definidas via Tailwind.

### 2.1 Cores principais

| Token                 | Valor       | Uso sugerido                                     |
|-----------------------|------------|--------------------------------------------------|
| `primary`             | `#0A2342`  | Títulos, CTAs escuros, cards destacados          |
| `secondary`           | `#2C678F`  | Botões, badges, gradientes secundários           |
| `background`          | `#F4F4F9`  | Fundo padrão das páginas                         |
| `card-bg`             | `#FFFFFF`  | Cards e blocos de conteúdo                       |
| `footer-blue`         | `#1d4397`  | Botões institucionais (inscreva-se), rodapé      |
| `secondary-light`     | `#a0c8e0`  | Bordas, hovers suaves                            |
| `rainbow-gradient`    | Gradiente institucional (linear 90°) | Acentos e separadores (ex.: título de seção) |

### 2.2 Tipografia

Definida em `globals.css`:

- Corpo (`--font-body`): Lato
- Display (`--font-heading`): Montserrat
- Classes utilitárias: `.section-title`, `.font-display`

### 2.3 Espaçamento, sombras e raios

- `shadow-header`: `0 4px 12px rgba(0, 0, 0, 0.08)`
- `shadow-card`: `0 8px 20px rgba(0, 0, 0, 0.12)`
- Cartões usam raio ~24px quando construídos manualmente (`rounded-3xl`).
- Recomenda-se `gap-4`, `gap-6` para grids; padding padrão em cartões `px-6 py-10`.

## 3. Componentes Globais

| Componente                         | Localização                                             | Uso recomendado                                                |
|------------------------------------|---------------------------------------------------------|----------------------------------------------------------------|
| `PageTitle`                        | `src/components/ui/page-title.tsx`                      | Títulos principais de páginas/seções hero.                     |
| `SectionTitle`                     | `src/components/ui/section-title.tsx`                   | Headings de blocos internos com gradiente inferior padrão.     |
| `CursoCard`                        | `src/components/domain/curso/CursoCard.tsx`             | Cards da listagem de cursos.                                   |
| `CourseInvestmentCard`             | `src/components/cursos/CourseInvestmentCard.tsx`        | Cartão de investimento para especialização/extensão.          |
| `CourseInvestmentCardCongressos`   | `src/components/cursos/CourseInvestmentCardCongressos.tsx` | Cartão específico de congressos: usa selo “Oferta Especial”. |
| `CourseDetailHero`                 | `src/components/cursos/CourseDetailHero.tsx`            | Hero com vídeo/imagem + badges (categoria, duração, modalidade). |
| `ContatosSecretaria`               | `src/components/shared/contatos-secretaria.tsx`         | Bloco pronto com telefone, WhatsApp e e-mail da secretaria.    |
| `FocosAcademicos`                  | `src/components/shared/focos-academicos.tsx`            | Grade animada com focos acadêmicos, usa `CardMoving`.          |
| `CardProfessor` / `CourseFaculty`  | `src/components/ui/card-professor.tsx` + `.../CourseFaculty.tsx` | Cartões de docentes e coordenação, com contatos opcionais. |
| `EscolhaCursosContent`             | `src/app/(site)/cursos/page.tsx`                        | Página de cursos com tabs (usa Suspense + `useSearchParams`). |

> **Boas práticas**: Antes de criar um componente novo, verifique se há um equivalente. Se precisar estender, mantenha interface leve e use tokens existentes. Documente no DLS qualquer novo padrão.

## 4. Padrões de Página

- **Heróis**: título grande + subtítulo centralizado, badge opcional (`inline-flex`), fundo `bg-white` ou gradiente institucional.
- **Cards**: `bg-white`, `rounded-3xl`, `shadow-lg shadow-neutral-900/5`, com textos `text-neutral-700` em parágrafos.
- **Listas**: `list-disc` com `pl-5`, espaçamento `space-y-3`.
- **CTA principal**: botão cheio `bg-secondary` ou `bg-primary`, fallback `border border-primary`.

Exemplos: páginas `extensao`, `conheca-a-fafih`, `regulamentos` seguem o padrão de seções empilhadas com cartões.

## 5. Processos & Checklist para PRs

1. **Consulte o DLS**: reutilize tokens/cores antes de criar valores novos.
2. **Componentes**: prefira `PageTitle`, `SectionTitle`, `ContatosSecretaria`, etc., em vez de duplicar markup.
3. **Tipagem**: garanta que novos componentes aceitem dados opcionais com fallback (`?? []`, `?? ''`), evitando erros durante build.
4. **Assets**: para imagens estáticas, use `next/image` (otimização automática).
5. **Suspense**: qualquer hook como `useSearchParams` deve estar dentro de boundary (`<Suspense fallback={...}>`).
6. **Documente mudanças**: se criar tokens novos ou modificar componentes globais, atualize este DLS.

## 6. Pendências / Evoluções Futuras

- Consolidar tokens em um arquivo TypeScript exportado (ex.: `src/styles/tokens.ts`) para reutilização em scripts/JS.
- Documentar variantes de botões, tabelas e formulários (ainda ausentes).
- Criar biblioteca de ícones padronizada (hoje utiliza emojis e ícones FontAwesome dispersos).
- Incluir guidelines para animações (e.g., transições `transition hover:-translate-y-1`).

## 7. Quando pedir ajuda ao DLS

Sempre que for:
- Criar nova página ou seção;
- Introduzir um novo cartão/hero;
- Ajustar cores/tipografia;
- Adicionar CTA ou card de contato;
- Refatorar componentes de cursos.

Com esse DLS vivo, os ajustes feitos pelo Codex (ou qualquer dev) seguirão a mesma linha visual e semântica, mantendo o produto coerente.
