# Migração para Supabase - FAFIH

Este diretório contém todos os arquivos necessários para migrar os dados da FAFIH dos arquivos JSON para o banco de dados Supabase.

## Estrutura de Arquivos

```
supabase/
├── migrations/
│   ├── 001_create_tables.sql          # Criação de todas as tabelas
│   ├── 002_create_functions_triggers.sql  # Funções e triggers
│   ├── 003_create_views.sql           # Views úteis
│   └── 004_setup_rls.sql              # Row Level Security
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

### 3. Migrar Dados dos JSONs

Execute o script de migração:

```bash
# Instalar dependências (se ainda não instalou)
npm install @supabase/supabase-js tsx

# Executar migração
npx tsx scripts/migrate-to-supabase.ts
```

O script irá:
1. Ler todos os arquivos JSON de `/src/lib/data`
2. Inserir dados nas tabelas do Supabase
3. Criar relacionamentos entre entidades
4. Exibir progresso e erros (se houver)

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
| `cursos` | Cursos oferecidos | → `professores`, `polos`, `turmas` |
| `polos` | Locais presenciais | → `cursos`, `turmas` |
| `turmas` | Turmas por polo | → `cursos`, `polos` |
| `trabalhos` | TCCs e monografias | → `categorias_trabalhos` |
| `categorias_trabalhos` | Tags de trabalhos | → `trabalhos` |
| `depoimentos` | Depoimentos | → `cursos` (opcional) |
| `posts` | Notícias/artigos | - |
| `eventos` | Calendário acadêmico | → `cursos`, `polos` (opcional) |

### Tabelas de Relacionamento (N:N)

- `curso_professores` - Relaciona cursos e professores
- `polo_cursos` - Relaciona polos e cursos
- `trabalho_categorias` - Relaciona trabalhos e categorias

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
**Versão**: 1.0
