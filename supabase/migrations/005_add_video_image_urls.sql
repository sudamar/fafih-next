-- =============================================
-- FAFIH Database Migration - Add videoUrl and imageUrl to cursos
-- Substitui o campo hero por campos mais simples
-- Created: 2025-10-19
-- =============================================

-- Adicionar novos campos
ALTER TABLE cursos
ADD COLUMN video_url TEXT,
ADD COLUMN image_url TEXT;

-- Comentários
COMMENT ON COLUMN cursos.video_url IS 'URL do vídeo de apresentação do curso (YouTube, Vimeo, etc)';
COMMENT ON COLUMN cursos.image_url IS 'URL da imagem de capa do curso';

-- Migrar dados do campo hero para os novos campos
UPDATE cursos
SET
  video_url = CASE
    WHEN hero->>'type' = 'video' THEN hero->>'source'
    ELSE NULL
  END,
  image_url = CASE
    WHEN hero->>'type' = 'image' THEN hero->>'source'
    WHEN hero->>'fallbackImage' IS NOT NULL THEN hero->>'fallbackImage'
    ELSE image
  END
WHERE hero IS NOT NULL;

-- Opcional: Remover campo hero após migração dos dados
-- ALTER TABLE cursos DROP COLUMN hero;
