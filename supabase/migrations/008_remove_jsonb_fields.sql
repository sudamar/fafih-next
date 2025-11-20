-- Remover campos JSONB da tabela cursos
-- Os dados agora estão nas tabelas curso_highlights e curso_curriculum

ALTER TABLE cursos DROP COLUMN IF EXISTS highlights;
ALTER TABLE cursos DROP COLUMN IF EXISTS curriculum;
