-- =============================================
-- FAFIH Database Migration - Row Level Security
-- Version: 1.0
-- Created: 2025-10-19
-- =============================================

-- =============================================
-- HABILITAR RLS EM TODAS AS TABELAS
-- =============================================

ALTER TABLE professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE curso_professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE polos ENABLE ROW LEVEL SECURITY;
ALTER TABLE polo_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_trabalhos ENABLE ROW LEVEL SECURITY;
ALTER TABLE trabalhos ENABLE ROW LEVEL SECURITY;
ALTER TABLE trabalho_categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE depoimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

-- =============================================
-- POLÍTICAS DE LEITURA PÚBLICA (SELECT)
-- =============================================

-- Professores: Leitura pública
CREATE POLICY "Professores são visíveis publicamente"
    ON professores FOR SELECT
    USING (true);

-- Cursos: Leitura pública
CREATE POLICY "Cursos são visíveis publicamente"
    ON cursos FOR SELECT
    USING (true);

-- Curso Professores: Leitura pública
CREATE POLICY "Relação curso-professor é visível publicamente"
    ON curso_professores FOR SELECT
    USING (true);

-- Polos: Leitura pública
CREATE POLICY "Polos são visíveis publicamente"
    ON polos FOR SELECT
    USING (true);

-- Polo Cursos: Leitura pública
CREATE POLICY "Relação polo-curso é visível publicamente"
    ON polo_cursos FOR SELECT
    USING (true);

-- Turmas: Leitura pública
CREATE POLICY "Turmas são visíveis publicamente"
    ON turmas FOR SELECT
    USING (true);

-- Categorias de Trabalhos: Leitura pública
CREATE POLICY "Categorias são visíveis publicamente"
    ON categorias_trabalhos FOR SELECT
    USING (true);

-- Trabalhos: Leitura pública
CREATE POLICY "Trabalhos são visíveis publicamente"
    ON trabalhos FOR SELECT
    USING (true);

-- Trabalho Categorias: Leitura pública
CREATE POLICY "Relação trabalho-categoria é visível publicamente"
    ON trabalho_categorias FOR SELECT
    USING (true);

-- Depoimentos: Leitura pública
CREATE POLICY "Depoimentos são visíveis publicamente"
    ON depoimentos FOR SELECT
    USING (true);

-- Posts: Apenas posts publicados são visíveis
CREATE POLICY "Posts publicados são visíveis publicamente"
    ON posts FOR SELECT
    USING (published = true);

-- Eventos: Leitura pública
CREATE POLICY "Eventos são visíveis publicamente"
    ON eventos FOR SELECT
    USING (true);

-- =============================================
-- POLÍTICAS DE ESCRITA PARA ADMINISTRADORES
-- =============================================

-- Criar função helper para verificar se usuário é admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT EXISTS (
            SELECT 1
            FROM auth.users
            WHERE auth.uid() = id
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar função helper para verificar se usuário é editor ou admin
CREATE OR REPLACE FUNCTION is_editor_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT EXISTS (
            SELECT 1
            FROM auth.users
            WHERE auth.uid() = id
            AND raw_user_meta_data->>'role' IN ('admin', 'editor')
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- POLÍTICAS INSERT (Apenas Admin/Editor)
-- =============================================

CREATE POLICY "Admin/Editor pode inserir professores"
    ON professores FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode inserir cursos"
    ON cursos FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode inserir curso_professores"
    ON curso_professores FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin pode inserir polos"
    ON polos FOR INSERT
    WITH CHECK (is_admin());

CREATE POLICY "Admin pode inserir polo_cursos"
    ON polo_cursos FOR INSERT
    WITH CHECK (is_admin());

CREATE POLICY "Admin/Editor pode inserir turmas"
    ON turmas FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin pode inserir categorias"
    ON categorias_trabalhos FOR INSERT
    WITH CHECK (is_admin());

CREATE POLICY "Admin/Editor pode inserir trabalhos"
    ON trabalhos FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode inserir trabalho_categorias"
    ON trabalho_categorias FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode inserir depoimentos"
    ON depoimentos FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode inserir posts"
    ON posts FOR INSERT
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode inserir eventos"
    ON eventos FOR INSERT
    WITH CHECK (is_editor_or_admin());

-- =============================================
-- POLÍTICAS UPDATE (Apenas Admin/Editor)
-- =============================================

CREATE POLICY "Admin/Editor pode atualizar professores"
    ON professores FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar cursos"
    ON cursos FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar curso_professores"
    ON curso_professores FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin pode atualizar polos"
    ON polos FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admin pode atualizar polo_cursos"
    ON polo_cursos FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admin/Editor pode atualizar turmas"
    ON turmas FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin pode atualizar categorias"
    ON categorias_trabalhos FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admin/Editor pode atualizar trabalhos"
    ON trabalhos FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar trabalho_categorias"
    ON trabalho_categorias FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar depoimentos"
    ON depoimentos FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar posts"
    ON posts FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

CREATE POLICY "Admin/Editor pode atualizar eventos"
    ON eventos FOR UPDATE
    USING (is_editor_or_admin())
    WITH CHECK (is_editor_or_admin());

-- =============================================
-- POLÍTICAS DELETE (Apenas Admin)
-- =============================================

CREATE POLICY "Admin pode deletar professores"
    ON professores FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar cursos"
    ON cursos FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar curso_professores"
    ON curso_professores FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar polos"
    ON polos FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar polo_cursos"
    ON polo_cursos FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar turmas"
    ON turmas FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar categorias"
    ON categorias_trabalhos FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar trabalhos"
    ON trabalhos FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar trabalho_categorias"
    ON trabalho_categorias FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar depoimentos"
    ON depoimentos FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar posts"
    ON posts FOR DELETE
    USING (is_admin());

CREATE POLICY "Admin pode deletar eventos"
    ON eventos FOR DELETE
    USING (is_admin());
