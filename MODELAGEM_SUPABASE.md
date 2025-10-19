# Modelagem de Banco de Dados - Supabase (FAFIH)

## Visão Geral

Este documento descreve a modelagem completa do banco de dados para migração dos arquivos JSON para o Supabase.

## Análise dos Relacionamentos

### Entidades Principais

1. **Cursos** - Entidade central do sistema
2. **Professores** - Docentes que lecionam nos cursos
3. **Polos** - Locais presenciais onde os cursos são oferecidos
4. **Turmas** - Grupos de alunos em polos específicos
5. **Trabalhos Acadêmicos** - Monografias e TCCs
6. **Categorias de Trabalhos** - Tags/categorias para trabalhos
7. **Depoimentos** - Relatos de alunos e professores
8. **Posts/Notícias** - Conteúdo informativo
9. **Eventos** - Calendário acadêmico

### Relacionamentos Identificados

- Um **curso** possui 1 **coordenador** (professor)
- Um **curso** possui vários **professores**
- Um **curso** pode ter modalidade **presencial** ou **remota**
- Um **curso** presencial pode ser oferecido em vários **polos**
- Um **polo** possui várias **turmas**
- Um **polo** pode oferecer vários **cursos**
- Um **trabalho** possui várias **categorias** (tags)
- Um **trabalho** é de autoria de um aluno/autor

---

## Estrutura das Tabelas

### 1. Tabela: `professores`

Armazena informações sobre o corpo docente.

```sql
CREATE TABLE professores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  titulacao VARCHAR(255),
  descricao TEXT,
  foto TEXT,
  email VARCHAR(255),
  telefone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_professores_email` em `email`

---

### 2. Tabela: `cursos`

Armazena informações sobre os cursos oferecidos.

```sql
CREATE TABLE cursos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  full_description JSONB,
  image TEXT,
  hero JSONB,
  category VARCHAR(100),
  category_label VARCHAR(100),
  price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  preco_matricula DECIMAL(10, 2),
  modalidade VARCHAR(50), -- 'Presencial', 'Remoto', 'Híbrido'
  duration VARCHAR(100),
  workload VARCHAR(100),
  start_date VARCHAR(100),
  max_students VARCHAR(100),
  certificate VARCHAR(255),
  monthly_price VARCHAR(100),
  justificativa JSONB,
  objetivos JSONB,
  publico JSONB,
  highlights JSONB,
  curriculum JSONB,
  investment_details JSONB,
  additional_info JSONB,
  coordenador_id UUID REFERENCES professores(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_cursos_slug` em `slug`
- `idx_cursos_modalidade` em `modalidade`
- `idx_cursos_category` em `category`

---

### 3. Tabela: `curso_professores`

Tabela de relacionamento muitos-para-muitos entre cursos e professores.

```sql
CREATE TABLE curso_professores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES professores(id) ON DELETE CASCADE,
  papel VARCHAR(100), -- 'coordenador', 'docente', 'supervisor'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(curso_id, professor_id)
);
```

**Índices:**
- `idx_curso_professores_curso` em `curso_id`
- `idx_curso_professores_professor` em `professor_id`

---

### 4. Tabela: `polos`

Armazena informações sobre os polos presenciais.

```sql
CREATE TABLE polos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  polo_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  coordinator VARCHAR(255),
  map_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_polos_polo_id` em `polo_id`

---

### 5. Tabela: `polo_cursos`

Relacionamento muitos-para-muitos entre polos e cursos.

```sql
CREATE TABLE polo_cursos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  polo_id UUID NOT NULL REFERENCES polos(id) ON DELETE CASCADE,
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(polo_id, curso_id)
);
```

**Índices:**
- `idx_polo_cursos_polo` em `polo_id`
- `idx_polo_cursos_curso` em `curso_id`

---

### 6. Tabela: `turmas`

Armazena informações sobre turmas em polos específicos.

```sql
CREATE TABLE turmas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  polo_id UUID NOT NULL REFERENCES polos(id) ON DELETE CASCADE,
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  data_inicio DATE,
  data_termino DATE,
  horario VARCHAR(100),
  vagas_totais INTEGER,
  vagas_ocupadas INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'ativa', -- 'ativa', 'encerrada', 'em_formacao'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_turmas_polo` em `polo_id`
- `idx_turmas_curso` em `curso_id`
- `idx_turmas_status` em `status`

---

### 7. Tabela: `categorias_trabalhos`

Categorias/tags para classificar trabalhos acadêmicos.

```sql
CREATE TABLE categorias_trabalhos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) UNIQUE NOT NULL,
  icone VARCHAR(100),
  cor VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_categorias_nome` em `nome`

---

### 8. Tabela: `trabalhos`

Trabalhos acadêmicos (monografias, TCCs).

```sql
CREATE TABLE trabalhos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  autor VARCHAR(255) NOT NULL,
  data_publicacao DATE,
  link TEXT,
  resumo TEXT,
  nota DECIMAL(3, 1),
  visitantes INTEGER DEFAULT 0,
  baixados INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_trabalhos_slug` em `slug`
- `idx_trabalhos_autor` em `autor`

---

### 9. Tabela: `trabalho_categorias`

Relacionamento muitos-para-muitos entre trabalhos e categorias.

```sql
CREATE TABLE trabalho_categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trabalho_id UUID NOT NULL REFERENCES trabalhos(id) ON DELETE CASCADE,
  categoria_id UUID NOT NULL REFERENCES categorias_trabalhos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trabalho_id, categoria_id)
);
```

**Índices:**
- `idx_trabalho_categorias_trabalho` em `trabalho_id`
- `idx_trabalho_categorias_categoria` em `categoria_id`

---

### 10. Tabela: `depoimentos`

Depoimentos de alunos e professores.

```sql
CREATE TABLE depoimentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  foto TEXT,
  curso_relacionado_id UUID REFERENCES cursos(id),
  destaque BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_depoimentos_destaque` em `destaque`
- `idx_depoimentos_curso` em `curso_relacionado_id`

---

### 11. Tabela: `posts`

Notícias e artigos institucionais.

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  author VARCHAR(255),
  author_info JSONB,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_posts_slug` em `slug`
- `idx_posts_published` em `published`
- `idx_posts_date` em `date`

---

### 12. Tabela: `eventos`

Calendário acadêmico e eventos institucionais.

```sql
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo_evento VARCHAR(255) NOT NULL,
  descricao_evento TEXT,
  tipo_evento VARCHAR(100), -- 'inicio_letivo', 'vestibular', 'palestras', 'avaliacoes', 'ferias'
  data_evento DATE NOT NULL,
  local_evento VARCHAR(255),
  hora_evento VARCHAR(100),
  observacao_evento TEXT,
  curso_relacionado_id UUID REFERENCES cursos(id),
  polo_relacionado_id UUID REFERENCES polos(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Índices:**
- `idx_eventos_data` em `data_evento`
- `idx_eventos_tipo` em `tipo_evento`
- `idx_eventos_curso` em `curso_relacionado_id`

---

## Diagrama de Relacionamentos (ER)

```
professores (1) ----< (N) curso_professores (N) >---- (1) cursos
                                                           |
                                                           |
cursos (1) ----< (N) polo_cursos (N) >---- (1) polos
                                                |
                                                |
polos (1) ----< (N) turmas (N) >---- (1) cursos

categorias_trabalhos (1) ----< (N) trabalho_categorias (N) >---- (1) trabalhos

cursos (1) ----< (N) depoimentos
cursos (1) ----< (N) eventos

polos (1) ----< (N) eventos
```

---

## Políticas de Row Level Security (RLS)

### Leitura Pública (SELECT)

Para as seguintes tabelas, permitir leitura sem autenticação:
- `cursos`
- `professores`
- `polos`
- `turmas`
- `trabalhos`
- `categorias_trabalhos`
- `depoimentos`
- `posts` (apenas `published = true`)
- `eventos`

### Escrita Protegida (INSERT/UPDATE/DELETE)

Todas as operações de escrita devem requerer autenticação e roles específicas:
- Role `admin`: acesso total
- Role `editor`: pode criar/editar conteúdo
- Role `public`: apenas leitura

---

## Triggers e Funções

### 1. Atualizar `updated_at` automaticamente

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas as tabelas relevantes
CREATE TRIGGER update_cursos_updated_at BEFORE UPDATE ON cursos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professores_updated_at BEFORE UPDATE ON professores
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_polos_updated_at BEFORE UPDATE ON polos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_turmas_updated_at BEFORE UPDATE ON turmas
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trabalhos_updated_at BEFORE UPDATE ON trabalhos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_depoimentos_updated_at BEFORE UPDATE ON depoimentos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Incrementar visualizações de trabalhos

```sql
CREATE OR REPLACE FUNCTION increment_trabalho_visitantes(trabalho_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE trabalhos
    SET visitantes = visitantes + 1
    WHERE id = trabalho_uuid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_trabalho_baixados(trabalho_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE trabalhos
    SET baixados = baixados + 1
    WHERE id = trabalho_uuid;
END;
$$ LANGUAGE plpgsql;
```

---

## Views Úteis

### 1. View: Cursos com Coordenador

```sql
CREATE VIEW cursos_com_coordenador AS
SELECT
    c.*,
    p.nome AS coordenador_nome,
    p.email AS coordenador_email,
    p.telefone AS coordenador_telefone,
    p.foto AS coordenador_foto
FROM cursos c
LEFT JOIN professores p ON c.coordenador_id = p.id;
```

### 2. View: Trabalhos com Categorias

```sql
CREATE VIEW trabalhos_com_categorias AS
SELECT
    t.*,
    array_agg(ct.nome) AS categorias,
    array_agg(ct.cor) AS categorias_cores
FROM trabalhos t
LEFT JOIN trabalho_categorias tc ON t.id = tc.trabalho_id
LEFT JOIN categorias_trabalhos ct ON tc.categoria_id = ct.id
GROUP BY t.id;
```

### 3. View: Cursos por Polo

```sql
CREATE VIEW cursos_por_polo AS
SELECT
    p.polo_id,
    p.name AS polo_nome,
    c.slug AS curso_slug,
    c.title AS curso_nome,
    c.modalidade
FROM polos p
JOIN polo_cursos pc ON p.id = pc.polo_id
JOIN cursos c ON pc.curso_id = c.id;
```

---

## Estratégia de Migração

### Fase 1: Criação das Tabelas Base
1. Criar tabela `professores`
2. Criar tabela `cursos`
3. Criar tabela `polos`
4. Criar tabela `categorias_trabalhos`

### Fase 2: Criação das Tabelas de Relacionamento
1. Criar `curso_professores`
2. Criar `polo_cursos`
3. Criar `turmas`

### Fase 3: Criação das Tabelas de Conteúdo
1. Criar `trabalhos`
2. Criar `trabalho_categorias`
3. Criar `depoimentos`
4. Criar `posts`
5. Criar `eventos`

### Fase 4: Migração dos Dados
1. Migrar professores
2. Migrar cursos e relacionamento com coordenadores
3. Migrar polos
4. Migrar categorias de trabalhos
5. Migrar trabalhos e suas categorias
6. Migrar depoimentos
7. Migrar posts
8. Migrar eventos

### Fase 5: Configuração de Segurança
1. Habilitar RLS em todas as tabelas
2. Criar políticas de acesso
3. Criar roles e permissões

---

## Considerações Adicionais

### Performance
- Usar índices em colunas frequentemente consultadas
- Considerar índices GIN para campos JSONB
- Implementar cache no frontend para dados estáticos

### Escalabilidade
- Campos JSONB permitem flexibilidade sem alterar schema
- Estrutura normalizada facilita adição de novos relacionamentos
- Views materializa podem ser criadas para queries complexas

### Backup e Recuperação
- Configurar backups automáticos diários no Supabase
- Manter cópia dos JSONs originais como fallback
- Documentar processo de rollback

---

**Criado em:** 2025-10-19
**Versão:** 1.0
