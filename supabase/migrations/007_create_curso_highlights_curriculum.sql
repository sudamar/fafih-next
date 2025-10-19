-- Criar tabela curso_highlights
CREATE TABLE IF NOT EXISTS curso_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  bg_color TEXT,
  icon_color TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela curso_curriculum
CREATE TABLE IF NOT EXISTS curso_curriculum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  hours TEXT,
  ementa TEXT,
  objetivos TEXT,
  bibliography JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_curso_highlights_curso_id ON curso_highlights(curso_id);
CREATE INDEX idx_curso_highlights_ordem ON curso_highlights(ordem);
CREATE INDEX idx_curso_curriculum_curso_id ON curso_curriculum(curso_id);
CREATE INDEX idx_curso_curriculum_number ON curso_curriculum(number);

-- Habilitar RLS (Row Level Security)
ALTER TABLE curso_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE curso_curriculum ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso público para leitura
CREATE POLICY "Allow public read access to curso_highlights"
  ON curso_highlights FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to curso_curriculum"
  ON curso_curriculum FOR SELECT
  USING (true);

-- Migrar dados de highlights da tabela cursos
INSERT INTO curso_highlights (curso_id, icon, title, description, bg_color, icon_color, ordem)
SELECT
  c.id,
  (h.value->>'icon')::TEXT,
  (h.value->>'title')::TEXT,
  (h.value->>'description')::TEXT,
  (h.value->>'bgColor')::TEXT,
  (h.value->>'iconColor')::TEXT,
  ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY h.ordinality) - 1
FROM cursos c
CROSS JOIN LATERAL jsonb_array_elements(c.highlights) WITH ORDINALITY h(value, ordinality)
WHERE c.highlights IS NOT NULL AND jsonb_array_length(c.highlights) > 0;

-- Migrar dados de curriculum da tabela cursos
INSERT INTO curso_curriculum (curso_id, number, title, hours, ementa, objetivos, bibliography)
SELECT
  c.id,
  (curr.value->>'number')::INTEGER,
  (curr.value->>'title')::TEXT,
  COALESCE((curr.value->>'hours')::TEXT, '0'),
  (curr.value->>'ementa')::TEXT,
  (curr.value->>'objetivos')::TEXT,
  COALESCE(curr.value->'bibliography', '[]'::jsonb)
FROM cursos c
CROSS JOIN LATERAL jsonb_array_elements(c.curriculum) curr(value)
WHERE c.curriculum IS NOT NULL AND jsonb_array_length(c.curriculum) > 0;
