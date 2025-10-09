# FAFIH Portal — Codex Manual

## Visão Geral
- Aplicação construída com Next.js (App Router), TypeScript e Tailwind CSS.
- Pacotes adicionais principais: TanStack Query, React Hook Form, Zod, ESLint (config Next).
- Estrutura preparada para expansão do portal acadêmico da FAFIH.

## Stack e Ferramentas
- Node.js 18+
- Next.js 14 (App Router)
- Sempre use Tailwind CSS 3
- TanStack Query para gerenciamento de dados assíncronos
- React Hook Form + Zod para formulários tipados

## Como Rodar o Projeto
1. `npm install`
2. `npm run dev`
3. Acesse `http://localhost:3000`

> Use `npm run lint` para garantir que o código está dentro dos padrões.

## Estrutura de Pastas
```
src/
├── app/
│   ├── (main)/                               # (Opcional) Grupo de rotas para aplicar layout/providers
│   │   ├── layout.tsx                        # Layout/Header/Footer/Providers globais
│   │   ├── loading.tsx                       # UI de loading para rotas aninhadas
│   │   ├── error.tsx                         # Tratamento de erro para rotas aninhadas
│   │   ├── page.tsx                          # Página inicial (ex: /)
│   │   ├── not-found.tsx                     # Página 404
│   │   └── global-error.tsx                  # Tratamento de erro global
│   │
│   ├── professor/
│   │   ├── [slug]/                           # Rota dinâmica para um professor específico
│   │   │   ├── page.tsx                      # ProfessorPage.tsx (agora busca dados diretamente)
│   │   │   └── loading.tsx                   # Loading UI para a página do professor
│   │   └── page.tsx                          # ProfessorListPage.tsx (Se existir)
│   │
│   ├── cursos/
│   │   ├── page.tsx                          # CoursesListPage.tsx (Lista de Cursos)
│   │   ├── [slug]/                           # Rota dinâmica para um curso específico
│   │   │   ├── page.tsx                      # CourseDetailsPage.tsx (agora busca dados diretamente)
│   │   │   └── loading.tsx
│   │   └── error.tsx                         # Tratamento de erro para rotas de cursos
│   │
│   └── globals.css                           # Estilos globais (Tailwind/shadcn/tokens)
│
├── components/
│   ├── ui/                                   # Componentes base (shadcn/ui adaptado ou mantido)
│   │   ├── button.tsx                        # Ex: Button (com shadcn/ui o .tsx é padrão)
│   │   ├── card.tsx                          # Ex: Card
│   │   └── index.ts                          # Re-exporta componentes (opcional)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   ├── domain/                               # Componentes específicos de domínio
│   │   ├── curso/
│   │   │   ├── CourseHero.tsx
│   │   │   └── InvestmentCard.tsx
│   │   └── professor/
│   │       └── ProfessorHeader.tsx
│   └── providers/                            # Coloque Providers aqui para melhor organização
│       ├── ThemeProvider.tsx
│       └── QueryProvider.tsx                 # Ex: React Query Provider
│
├── lib/
│   ├── features/                             # Lógica de negócios e acesso a dados
│   │   ├── cursos/
│   │   │   ├── hooks/
│   │   │   │   ├── useCourse.ts              # Hooks para Client Components
│   │   │   │   └── useCourses.ts
│   │   │   ├── server-actions/               # Ações de servidor (Substitui parte do 'services' em alguns casos)
│   │   │   │   └── courseActions.ts
│   │   │   ├── types/
│   │   │   │   └── course.types.ts           # Definições de tipos (Interfaces/Typescript)
│   │   │   └── utils/
│   │   │       └── courseMapper.ts
│   │   └── professores/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   │
│   ├── services/                             # Acesso a dados/APIs externas
│   │   ├── apiClient.ts                      # Cliente HTTP centralizado (ex: Axios, Fetch wrapper)
│   │   ├── endpoints.ts                      # URLs e configurações da API
│   │   └── errorHandler.ts
│   │
│   ├── data/                                 # Dados estáticos (se necessário)
│   │   ├── cursos.json
│   │   └── professores.json
│   │
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── slugify.ts
│   │   └── constants.ts
│   └── hooks/                                # Hooks genéricos (não de feature)
│       ├── useApi.ts
│       └── useLocalStorage.ts
└── public/                                   # Arquivos estáticos (imagens, favicons)
    └── ...
```

## Convenções de Código
- Todos os componentes em TypeScript/TSX.
- Estilização via utilitários Tailwind ou classes compostas com `@apply`.
- Regras de lint seguem `eslint-config-next` com TypeScript estrito.

## Integrações Futuras
- API institucional para cursos, depoimentos, docentes, notícias, eventos.
- Internacionalização (pt-BR como padrão).

## Área para Personalizações
### Branding & UI
- Paleta de cores personalizada: `TODO`
- Componentes de navegação: `TODO`

### Funcionalidades
- Integração com CMS/notícias: `TODO`
- Integração com API's de cursos, professores e polos: `TODO`

### Documentação Complementar
- Guia de deploy: `TODO`
- Padrões de conteúdo editorial: `TODO`

### Instruções personalizadas pelo responsável.
- Eu me chamo SUDAMAR e sou o responsável pela aplicação.
- SEMPRE use componentes tailwind ao invés de classes CSS. Caso precise de uma classe específica, precisa me avisar, pedir minha confirmação com LETRAS MAIÚSCULAS.
- Essa aplicação é uma universidade que vai iniciar seus trabalhos por agora e terá aulas de pós graduação e pós graduação.
- Só teremos dados vindos de API para cursos, depoimentos, professores e polos. Todo o resto do site será estático. **Não sendo necessário separar dados** para qualquer outro domínio.
- caso crie um JSON, sempre crie  ou adapte um service correspondente.
- Sempre rode o LINT antes de finalizar uma etapa do seu processamento para verificar se quebrou algo.
- Por favor, sempre confirme o entendimento antes de iniciar uma execução

> Preencha as seções `TODO` conforme as decisões forem tomadas.
