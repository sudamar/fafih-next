-- =============================================
-- FAFIH Database Migration - Remove hero field
-- Remove o campo hero que foi substituído por video_url e image_url
-- Created: 2025-10-19
-- =============================================

-- Remover campo hero da tabela cursos
ALTER TABLE cursos DROP COLUMN IF EXISTS hero;

-- Adicionar comentário
COMMENT ON TABLE cursos IS 'Armazena informações sobre os cursos oferecidos (atualizado: hero removido, substituído por video_url e image_url)';
