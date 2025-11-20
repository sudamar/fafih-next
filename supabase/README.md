# Migração para Supabase - FAFIH

Este diretório contém todos os arquivos necessários para migrar os dados da FAFIH dos arquivos JSON para o banco de dados Supabase.

## Estrutura de Arquivos

```
supabase/
├── migrations/
│   ├── 001_create_tables.sql          # Criação de todas as tabelas principais
│   ├── 002_create_functions_triggers.sql  # Funções e triggers
│   ├── 003_create_views.sql           # Views úteis
│   ├── 004_setup_rls.sql              # Row Level Security
│   ├── 005_add_video_image_urls.sql   # Adiciona campos video_url e image_url
│   ├── 006_remove_hero_field.sql      # Remove campo hero (substituído)
│   ├── 007_create_curso_highlights_curriculum.sql  # Cria tabelas de highlights e curriculum
│   ├── 008_remove_jsonb_fields.sql    # Remove campos JSONB migrados
│   └── 010_create_membros_analistas.sql  # Cria tabela membros_analistas
├── README.md                          # Este arquivo
└── ...
```

## Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Node.js instalado (v18 ou superior)
4. Credenciais do Supabase:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY` (service_role key)

## Passo a Passo da Migração

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_KEY=sua-service-role-key
```

### 2. Executar Migrações SQL

Acesse o [SQL Editor](https://app.supabase.com/project/_/sql) no dashboard do Supabase e execute os scripts na seguinte ordem:

#### 2.1. Criar Tabelas
```sql
-- Copie e execute o conteúdo de: migrations/001_create_tables.sql
```

#### 2.2. Criar Funções e Triggers
```sql
-- Copie e execute o conteúdo de: migrations/002_create_functions_triggers.sql
```

#### 2.3. Criar Views
```sql
-- Copie e execute o conteúdo de: migrations/003_create_views.sql
```

#### 2.4. Configurar Row Level Security
```sql
-- Copie e execute o conteúdo de: migrations/004_setup_rls.sql
```

#### 2.5. Adicionar Campos de Vídeo e Imagem
```sql
-- Copie e execute o conteúdo de: migrations/005_add_video_image_urls.sql
```

#### 2.6. Remover Campo Hero
```sql
-- Copie e execute o conteúdo de: migrations/006_remove_hero_field.sql
```

#### 2.7. Criar Tabelas de Highlights e Curriculum
```sql
-- Copie e execute o conteúdo de: migrations/007_create_curso_highlights_curriculum.sql
```

#### 2.8. Remover Campos JSONB Migrados
```sql
-- Copie e execute o conteúdo de: migrations/008_remove_jsonb_fields.sql
```

#### 2.9. Criar Tabela Membros Analistas
```sql
-- Copie e execute o conteúdo de: migrations/010_create_membros_analistas.sql
```

### 3. Migrar Dados dos JSONs

Execute os scripts de migração:

```bash
# Instalar dependências (se ainda não instalou)
npm install @supabase/supabase-js tsx

# Executar migração principal (cursos, professores, polos, etc)
npx tsx scripts/migrate-to-supabase.ts

# Executar migração de membros analistas
npx tsx scripts/migrate-membros-to-supabase.ts
```

Os scripts irão:
1. Ler todos os arquivos JSON de `/src/lib/data` (migrate-to-supabase.ts)
2. Inserir dados nas tabelas do Supabase
3. Criar relacionamentos entre entidades
4. Migrar os 74 membros analistas do IJEP (migrate-membros-to-supabase.ts)
5. Exibir progresso e erros (se houver)

### 4. Verificar Migração

Após a migração, verifique os dados no dashboard do Supabase:

1. Acesse [Table Editor](https://app.supabase.com/project/_/editor)
2. Confira cada tabela:
   - `professores` - Deve ter ~6 registros
   - `cursos` - Verificar se todos os cursos foram migrados
   - `polos` - Deve ter 3 polos
   - `trabalhos` - ~25 trabalhos
   - `depoimentos` - ~4 depoimentos
   - `posts` - ~2 posts
   - `eventos` - ~6 eventos
   - `membros_analistas` - 74 membros

3. Teste as views:
```sql
-- Verificar cursos com coordenadores
SELECT * FROM cursos_com_coordenador;

-- Verificar trabalhos com categorias
SELECT * FROM trabalhos_com_categorias;

-- Verificar estatísticas
SELECT * FROM estatisticas_gerais;
```

## Estrutura do Banco de Dados

### Tabelas Principais

| Tabela | Descrição | Relacionamentos |
|--------|-----------|-----------------|
| `professores` | Corpo docente | → `cursos` (coordenador) |
| `cursos` | Cursos oferecidos | → `professores`, `polos`, `turmas`, `curso_highlights`, `curso_curriculum` |
| `curso_highlights` | Destaques/características dos cursos | → `cursos` |
| `curso_curriculum` | Disciplinas e ementas dos cursos | → `cursos` |
| `polos` | Locais presenciais | → `cursos`, `turmas` |
| `turmas` | Turmas por polo | → `cursos`, `polos` |
| `trabalhos` | TCCs e monografias | → `categorias_trabalhos` |
| `categorias_trabalhos` | Tags de trabalhos | → `trabalhos` |
| `depoimentos` | Depoimentos | → `cursos` (opcional) |
| `posts` | Notícias/artigos | - |
| `eventos` | Calendário acadêmico | → `cursos`, `polos` (opcional) |
| `membros_analistas` | Membros analistas do IJEP | - |

### Tabelas de Relacionamento (N:N)

- `curso_professores` - Relaciona cursos e professores
- `polo_cursos` - Relaciona polos e cursos
- `trabalho_categorias` - Relaciona trabalhos e categorias

### Esquema Detalhado das Tabelas

#### 1. professores
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| nome | VARCHAR(255) | Nome do professor | NOT NULL |
| titulacao | VARCHAR(255) | Titulação acadêmica | - |
| descricao | TEXT | Descrição/biografia | - |
| foto | TEXT | URL da foto | - |
| email | VARCHAR(255) | E-mail de contato | INDEXED |
| telefone | VARCHAR(50) | Telefone de contato | - |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 2. cursos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| slug | VARCHAR(255) | Slug para URL | UNIQUE, NOT NULL, INDEXED |
| title | VARCHAR(255) | Título do curso | NOT NULL |
| subtitle | TEXT | Subtítulo | - |
| description | TEXT | Descrição breve | - |
| full_description | JSONB | Descrição completa estruturada | - |
| video_url | TEXT | URL do vídeo de apresentação | Adicionado em migração 005 |
| image_url | TEXT | URL da imagem de capa | Adicionado em migração 005 |
| category | VARCHAR(100) | Categoria do curso | INDEXED |
| category_label | VARCHAR(100) | Rótulo da categoria | - |
| price | DECIMAL(10, 2) | Preço mensal | - |
| original_price | DECIMAL(10, 2) | Preço original | - |
| preco_matricula | DECIMAL(10, 2) | Preço da matrícula | - |
| modalidade | VARCHAR(50) | Presencial/Remoto/Híbrido | INDEXED |
| duration | VARCHAR(100) | Duração do curso | - |
| workload | VARCHAR(100) | Carga horária | - |
| start_date | VARCHAR(100) | Data de início | - |
| max_students | VARCHAR(100) | Máximo de alunos | - |
| certificate | VARCHAR(255) | Tipo de certificado | - |
| monthly_price | VARCHAR(100) | Preço mensal formatado | - |
| justificativa | JSONB | Justificativa do curso | - |
| objetivos | JSONB | Objetivos do curso | - |
| publico | JSONB | Público-alvo | - |
| investment_details | JSONB | Detalhes do investimento | - |
| additional_info | JSONB | Informações adicionais | - |
| coordenador_id | UUID | ID do coordenador | FK → professores(id), INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

**Notas**:
- Os campos `highlights` e `curriculum` foram removidos (migração 008) e substituídos pelas tabelas `curso_highlights` e `curso_curriculum`.
- O campo `hero` foi removido (migração 006) e substituído por `video_url` e `image_url`.

#### 3. curso_highlights
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| curso_id | UUID | ID do curso | FK → cursos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| icon | TEXT | Ícone do destaque | NOT NULL |
| title | TEXT | Título do destaque | NOT NULL |
| description | TEXT | Descrição | NOT NULL |
| bg_color | TEXT | Cor de fundo | - |
| icon_color | TEXT | Cor do ícone | - |
| ordem | INTEGER | Ordem de exibição | NOT NULL, DEFAULT 0, INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 4. curso_curriculum
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| curso_id | UUID | ID do curso | FK → cursos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| number | INTEGER | Número da disciplina | NOT NULL, INDEXED |
| title | TEXT | Nome da disciplina | NOT NULL |
| hours | TEXT | Carga horária | - |
| ementa | TEXT | Ementa da disciplina | - |
| objetivos | TEXT | Objetivos da disciplina | - |
| bibliography | JSONB | Bibliografia | DEFAULT '[]' |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 5. curso_professores
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| curso_id | UUID | ID do curso | FK → cursos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| professor_id | UUID | ID do professor | FK → professores(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| papel | VARCHAR(100) | Papel (coordenador/docente/supervisor) | - |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |

**Constraint**: UNIQUE(curso_id, professor_id)

#### 6. polos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| polo_id | VARCHAR(100) | Slug do polo | UNIQUE, NOT NULL, INDEXED |
| name | VARCHAR(255) | Nome do polo | NOT NULL |
| address | TEXT | Endereço completo | - |
| phone | VARCHAR(50) | Telefone | - |
| email | VARCHAR(255) | E-mail de contato | - |
| coordinator | VARCHAR(255) | Nome do coordenador | - |
| map_url | TEXT | URL do Google Maps | - |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 7. polo_cursos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| polo_id | UUID | ID do polo | FK → polos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| curso_id | UUID | ID do curso | FK → cursos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |

**Constraint**: UNIQUE(polo_id, curso_id)

#### 8. turmas
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| nome | VARCHAR(255) | Nome da turma | NOT NULL |
| polo_id | UUID | ID do polo | FK → polos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| curso_id | UUID | ID do curso | FK → cursos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| data_inicio | DATE | Data de início | - |
| data_termino | DATE | Data de término | - |
| horario | VARCHAR(100) | Horário das aulas | - |
| vagas_totais | INTEGER | Total de vagas | - |
| vagas_ocupadas | INTEGER | Vagas já ocupadas | DEFAULT 0 |
| status | VARCHAR(50) | Status (ativa/encerrada/em_formacao) | DEFAULT 'ativa', INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 9. categorias_trabalhos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| nome | VARCHAR(100) | Nome da categoria | UNIQUE, NOT NULL, INDEXED |
| icone | VARCHAR(100) | Ícone da categoria | - |
| cor | VARCHAR(50) | Cor da categoria | - |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |

#### 10. trabalhos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| slug | VARCHAR(255) | Slug para URL | UNIQUE, NOT NULL, INDEXED |
| titulo | TEXT | Título do trabalho | NOT NULL |
| autor | VARCHAR(255) | Nome do autor | NOT NULL, INDEXED |
| data_publicacao | DATE | Data de publicação | INDEXED |
| link | TEXT | Link para download | - |
| resumo | TEXT | Resumo do trabalho | - |
| nota | DECIMAL(3, 1) | Nota do trabalho | - |
| visitantes | INTEGER | Contador de visitas | DEFAULT 0 |
| baixados | INTEGER | Contador de downloads | DEFAULT 0 |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 11. trabalho_categorias
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| trabalho_id | UUID | ID do trabalho | FK → trabalhos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| categoria_id | UUID | ID da categoria | FK → categorias_trabalhos(id) ON DELETE CASCADE, NOT NULL, INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |

**Constraint**: UNIQUE(trabalho_id, categoria_id)

#### 12. depoimentos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| quote | TEXT | Texto do depoimento | NOT NULL |
| author | VARCHAR(255) | Nome do autor | NOT NULL |
| role | VARCHAR(255) | Função/cargo | - |
| foto | TEXT | URL da foto | - |
| curso_relacionado_id | UUID | ID do curso relacionado | FK → cursos(id) ON DELETE SET NULL, INDEXED |
| destaque | BOOLEAN | Marcar como destaque | DEFAULT FALSE, INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 13. posts
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| slug | VARCHAR(255) | Slug para URL | UNIQUE, NOT NULL, INDEXED |
| title | TEXT | Título do post | NOT NULL |
| date | DATE | Data de publicação | NOT NULL, INDEXED |
| author | VARCHAR(255) | Nome do autor | - |
| author_info | JSONB | Informações do autor | - |
| excerpt | TEXT | Resumo | - |
| content | TEXT | Conteúdo completo | - |
| image | TEXT | URL da imagem | - |
| published | BOOLEAN | Status de publicação | DEFAULT TRUE, INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 14. eventos
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| titulo_evento | VARCHAR(255) | Título do evento | NOT NULL |
| descricao_evento | TEXT | Descrição | - |
| tipo_evento | VARCHAR(100) | Tipo (inicio_letivo/vestibular/palestras/avaliacoes/ferias) | INDEXED |
| data_evento | DATE | Data do evento | NOT NULL, INDEXED |
| local_evento | VARCHAR(255) | Local | - |
| hora_evento | VARCHAR(100) | Horário | - |
| observacao_evento | TEXT | Observações | - |
| curso_relacionado_id | UUID | ID do curso relacionado | FK → cursos(id) ON DELETE SET NULL, INDEXED |
| polo_relacionado_id | UUID | ID do polo relacionado | FK → polos(id) ON DELETE SET NULL, INDEXED |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

#### 15. membros_analistas
| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | UUID | Identificador único | PRIMARY KEY, DEFAULT gen_random_uuid() |
| nome | VARCHAR(255) | Nome do membro analista | NOT NULL |
| tipo | VARCHAR(100) | Tipo (Analista em Formação, Analista Didata, etc) | NOT NULL, INDEXED |
| atendimento | VARCHAR(50) | Tipo de atendimento (Individual, Grupo, Ambos) | NOT NULL |
| cidade | VARCHAR(255) | Cidade de atuação | - |
| estado | VARCHAR(2) | Estado (UF) | INDEXED |
| descricao | TEXT | Descrição/endereço | - |
| telefone | VARCHAR(50) | Telefone de contato | - |
| email | VARCHAR(255) | E-mail de contato | INDEXED |
| foto | TEXT | URL da foto | - |
| created_at | TIMESTAMP WITH TIME ZONE | Data de criação | DEFAULT NOW() |
| updated_at | TIMESTAMP WITH TIME ZONE | Data de atualização | DEFAULT NOW() |

## Funções Úteis

### Incrementar Visitantes de Trabalho
```sql
SELECT increment_trabalho_visitantes('uuid-do-trabalho');
```

### Incrementar Downloads de Trabalho
```sql
SELECT increment_trabalho_baixados('uuid-do-trabalho');
```

### Buscar Cursos por Polo
```sql
SELECT * FROM buscar_cursos_por_polo('belo-horizonte');
```

### Buscar Professores de um Curso
```sql
SELECT * FROM buscar_professores_curso('pos-graduacao-psicologia-junguiana');
```

### Verificar Vagas em Turma
```sql
SELECT turma_tem_vagas('uuid-da-turma');
```

## Segurança (RLS)

### Leitura Pública
Todas as tabelas permitem leitura pública (`SELECT`) sem autenticação.

### Escrita Protegida
Operações de escrita (`INSERT`, `UPDATE`, `DELETE`) requerem autenticação e roles:

- **Admin**: Acesso total a todas as operações
- **Editor**: Pode criar e editar conteúdo (exceto polos e categorias)
- **Public**: Apenas leitura

### Configurar Usuário Admin

No SQL Editor:

```sql
-- Atualizar metadados de um usuário para torná-lo admin
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'seu-email@exemplo.com';
```

## Manutenção

### Backup dos Dados

```bash
# Exportar dados usando o CLI do Supabase
supabase db dump -f backup.sql
```

### Restaurar de Backup

```bash
# Importar backup
supabase db reset
psql -U postgres -h db.seu-projeto.supabase.co -d postgres -f backup.sql
```

### Adicionar Nova Tabela

1. Criar arquivo de migração: `supabase/migrations/00X_nova_feature.sql`
2. Adicionar script SQL
3. Executar no SQL Editor
4. Atualizar este README

## Troubleshooting

### Erro: "relation already exists"
**Solução**: As tabelas já existem. Execute `DROP TABLE` antes ou use `CREATE TABLE IF NOT EXISTS`.

### Erro: "permission denied"
**Solução**: Certifique-se de usar a `service_role_key` no script de migração.

### Erro ao inserir dados com relacionamentos
**Solução**: Verifique se as tabelas pai foram populadas primeiro (ex: `professores` antes de `cursos`).

### RLS bloqueando operações
**Solução**:
1. Verifique se o usuário tem a role correta
2. Use a `service_role_key` para operações administrativas
3. Desabilite temporariamente o RLS para debug (não recomendado em produção)

## Próximos Passos

- [ ] Configurar políticas de backup automático
- [ ] Implementar soft delete (ao invés de DELETE físico)
- [ ] Adicionar índices para otimização de queries específicas
- [ ] Criar API routes no Next.js para acessar o Supabase
- [ ] Implementar cache no frontend
- [ ] Adicionar webhooks para sincronização

## Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

---

**Última atualização**: 2025-10-19
**Versão**: 2.3

## Changelog

### Versão 2.3 (2025-10-19)
- ✅ Tabela `membros_analistas` criada e populada com sucesso (migração 010)
- 74 membros analistas do IJEP migrados para o Supabase
- Service `membros-analistas.ts` implementado com caching
- Página `/membros-analistas` atualizada para usar dados do Supabase
- Filtros por tipo e estado implementados
- Migração 009 removida (conflito com view `cursos_com_coordenador`)
- Distribuição por tipo:
  - Analista em Formação: 48
  - Analista Didata: 9
  - Membro Analista: 11
  - Analista Didata em Formação: 6

### Versão 2.0 (2025-10-19)
- Adicionado esquema detalhado de todas as 14 tabelas do banco de dados
- Documentadas migrações 005-008
- Adicionadas tabelas `curso_highlights` e `curso_curriculum`
- Campos `hero`, `highlights` e `curriculum` removidos da tabela `cursos`
- Campos `video_url` e `image_url` adicionados à tabela `cursos`
- Documentação completa de constraints, tipos e relacionamentos

### Versão 1.0 (2025-10-19)
- Estrutura inicial do banco de dados
- Criação das 12 tabelas principais
- Funções e triggers
- Views e RLS configurados
