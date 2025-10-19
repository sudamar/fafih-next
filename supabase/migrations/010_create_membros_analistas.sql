-- =============================================
-- FAFIH Database Migration - Create membros_analistas table
-- Created: 2025-10-19
-- =============================================

-- Criar tabela membros_analistas
CREATE TABLE IF NOT EXISTS membros_analistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  atendimento VARCHAR(50) NOT NULL,
  cidade VARCHAR(255),
  estado VARCHAR(2),
  descricao TEXT,
  telefone VARCHAR(50),
  email VARCHAR(255),
  foto TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_membros_analistas_tipo ON membros_analistas(tipo);
CREATE INDEX idx_membros_analistas_estado ON membros_analistas(estado);
CREATE INDEX idx_membros_analistas_email ON membros_analistas(email);

-- Adicionar comentários
COMMENT ON TABLE membros_analistas IS 'Armazena informações sobre os membros analistas do IJEP';
COMMENT ON COLUMN membros_analistas.tipo IS 'Valores: Analista em Formação, Analista Didata, Analista Didata em Formação, Membro Analista';
COMMENT ON COLUMN membros_analistas.atendimento IS 'Valores: Individual, Grupo, Ambos';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_membros_analistas_updated_at
    BEFORE UPDATE ON membros_analistas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE membros_analistas ENABLE ROW LEVEL SECURITY;

-- Criar política de leitura pública
CREATE POLICY "Membros analistas são visíveis publicamente"
    ON membros_analistas FOR SELECT
    USING (true);

-- Criar políticas de escrita para Admin/Editor
CREATE POLICY "Admin/Editor pode inserir membros analistas"
    ON membros_analistas FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar membros analistas"
    ON membros_analistas FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin pode deletar membros analistas"
    ON membros_analistas FOR DELETE
    USING (is_admin());
