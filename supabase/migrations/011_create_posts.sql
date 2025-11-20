-- Criar tabela de posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  author VARCHAR(255) NOT NULL,
  author_name VARCHAR(255),
  author_description TEXT,
  author_email VARCHAR(255),
  author_phone VARCHAR(50),
  author_photo TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_posts_updated_at();

-- RLS Policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Posts são visíveis publicamente"
  ON posts
  FOR SELECT
  USING (true);

-- Política para inserção (apenas admin/editor)
CREATE POLICY "Apenas admin/editor podem inserir posts"
  ON posts
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    (auth.jwt()->>'role' = 'admin' OR auth.jwt()->>'role' = 'editor')
  );

-- Política para atualização (apenas admin/editor)
CREATE POLICY "Apenas admin/editor podem atualizar posts"
  ON posts
  FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND
    (auth.jwt()->>'role' = 'admin' OR auth.jwt()->>'role' = 'editor')
  );

-- Política para exclusão (apenas admin)
CREATE POLICY "Apenas admin pode excluir posts"
  ON posts
  FOR DELETE
  USING (
    auth.role() = 'authenticated' AND
    auth.jwt()->>'role' = 'admin'
  );
