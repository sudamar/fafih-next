-- =============================================
-- FAFIH Database Migration - Create Tables
-- Version: 1.0
-- Created: 2025-10-19
-- =============================================

-- Habilitar extensão pgcrypto para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- 1. TABELA: professores
-- =============================================
CREATE TABLE professores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  titulacao VARCHAR(255),
  descricao TEXT,
  foto TEXT,
  email VARCHAR(255),
  telefone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_professores_email ON professores(email);

COMMENT ON TABLE professores IS 'Armazena informações sobre o corpo docente';

-- =============================================
-- 2. TABELA: cursos
-- =============================================
CREATE TABLE cursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  modalidade VARCHAR(50),
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
  coordenador_id UUID REFERENCES professores(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cursos_slug ON cursos(slug);
CREATE INDEX idx_cursos_modalidade ON cursos(modalidade);
CREATE INDEX idx_cursos_category ON cursos(category);
CREATE INDEX idx_cursos_coordenador ON cursos(coordenador_id);

COMMENT ON TABLE cursos IS 'Armazena informações sobre os cursos oferecidos';
COMMENT ON COLUMN cursos.modalidade IS 'Valores: Presencial, Remoto, Híbrido';

-- =============================================
-- 3. TABELA: curso_professores
-- =============================================
CREATE TABLE curso_professores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES professores(id) ON DELETE CASCADE,
  papel VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(curso_id, professor_id)
);

CREATE INDEX idx_curso_professores_curso ON curso_professores(curso_id);
CREATE INDEX idx_curso_professores_professor ON curso_professores(professor_id);

COMMENT ON TABLE curso_professores IS 'Relacionamento muitos-para-muitos entre cursos e professores';
COMMENT ON COLUMN curso_professores.papel IS 'Valores: coordenador, docente, supervisor';

-- =============================================
-- 4. TABELA: polos
-- =============================================
CREATE TABLE polos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE INDEX idx_polos_polo_id ON polos(polo_id);

COMMENT ON TABLE polos IS 'Armazena informações sobre os polos presenciais';

-- =============================================
-- 5. TABELA: polo_cursos
-- =============================================
CREATE TABLE polo_cursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  polo_id UUID NOT NULL REFERENCES polos(id) ON DELETE CASCADE,
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(polo_id, curso_id)
);

CREATE INDEX idx_polo_cursos_polo ON polo_cursos(polo_id);
CREATE INDEX idx_polo_cursos_curso ON polo_cursos(curso_id);

COMMENT ON TABLE polo_cursos IS 'Relacionamento muitos-para-muitos entre polos e cursos';

-- =============================================
-- 6. TABELA: turmas
-- =============================================
CREATE TABLE turmas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  polo_id UUID NOT NULL REFERENCES polos(id) ON DELETE CASCADE,
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  data_inicio DATE,
  data_termino DATE,
  horario VARCHAR(100),
  vagas_totais INTEGER,
  vagas_ocupadas INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'ativa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_turmas_polo ON turmas(polo_id);
CREATE INDEX idx_turmas_curso ON turmas(curso_id);
CREATE INDEX idx_turmas_status ON turmas(status);

COMMENT ON TABLE turmas IS 'Armazena informações sobre turmas em polos específicos';
COMMENT ON COLUMN turmas.status IS 'Valores: ativa, encerrada, em_formacao';

-- =============================================
-- 7. TABELA: categorias_trabalhos
-- =============================================
CREATE TABLE categorias_trabalhos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) UNIQUE NOT NULL,
  icone VARCHAR(100),
  cor VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categorias_nome ON categorias_trabalhos(nome);

COMMENT ON TABLE categorias_trabalhos IS 'Categorias/tags para classificar trabalhos acadêmicos';

-- =============================================
-- 8. TABELA: trabalhos
-- =============================================
CREATE TABLE trabalhos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE INDEX idx_trabalhos_slug ON trabalhos(slug);
CREATE INDEX idx_trabalhos_autor ON trabalhos(autor);
CREATE INDEX idx_trabalhos_data ON trabalhos(data_publicacao);

COMMENT ON TABLE trabalhos IS 'Trabalhos acadêmicos (monografias, TCCs)';

-- =============================================
-- 9. TABELA: trabalho_categorias
-- =============================================
CREATE TABLE trabalho_categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trabalho_id UUID NOT NULL REFERENCES trabalhos(id) ON DELETE CASCADE,
  categoria_id UUID NOT NULL REFERENCES categorias_trabalhos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trabalho_id, categoria_id)
);

CREATE INDEX idx_trabalho_categorias_trabalho ON trabalho_categorias(trabalho_id);
CREATE INDEX idx_trabalho_categorias_categoria ON trabalho_categorias(categoria_id);

COMMENT ON TABLE trabalho_categorias IS 'Relacionamento muitos-para-muitos entre trabalhos e categorias';

-- =============================================
-- 10. TABELA: depoimentos
-- =============================================
CREATE TABLE depoimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  foto TEXT,
  curso_relacionado_id UUID REFERENCES cursos(id) ON DELETE SET NULL,
  destaque BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_depoimentos_destaque ON depoimentos(destaque);
CREATE INDEX idx_depoimentos_curso ON depoimentos(curso_relacionado_id);

COMMENT ON TABLE depoimentos IS 'Depoimentos de alunos e professores';

-- =============================================
-- 11. TABELA: posts
-- =============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_date ON posts(date);

COMMENT ON TABLE posts IS 'Notícias e artigos institucionais';

-- =============================================
-- 12. TABELA: eventos
-- =============================================
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo_evento VARCHAR(255) NOT NULL,
  descricao_evento TEXT,
  tipo_evento VARCHAR(100),
  data_evento DATE NOT NULL,
  local_evento VARCHAR(255),
  hora_evento VARCHAR(100),
  observacao_evento TEXT,
  curso_relacionado_id UUID REFERENCES cursos(id) ON DELETE SET NULL,
  polo_relacionado_id UUID REFERENCES polos(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_eventos_data ON eventos(data_evento);
CREATE INDEX idx_eventos_tipo ON eventos(tipo_evento);
CREATE INDEX idx_eventos_curso ON eventos(curso_relacionado_id);
CREATE INDEX idx_eventos_polo ON eventos(polo_relacionado_id);

COMMENT ON TABLE eventos IS 'Calendário acadêmico e eventos institucionais';
COMMENT ON COLUMN eventos.tipo_evento IS 'Valores: inicio_letivo, vestibular, palestras, avaliacoes, ferias';
