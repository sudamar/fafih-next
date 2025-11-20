-- =============================================
-- FAFIH Database Migration - Functions & Triggers
-- Version: 1.0
-- Created: 2025-10-19
-- =============================================

-- =============================================
-- FUNÇÃO: Atualizar updated_at automaticamente
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column() IS 'Atualiza automaticamente a coluna updated_at ao modificar um registro';

-- =============================================
-- TRIGGERS: Aplicar update_updated_at em todas as tabelas
-- =============================================

CREATE TRIGGER update_cursos_updated_at
    BEFORE UPDATE ON cursos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professores_updated_at
    BEFORE UPDATE ON professores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_polos_updated_at
    BEFORE UPDATE ON polos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_turmas_updated_at
    BEFORE UPDATE ON turmas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trabalhos_updated_at
    BEFORE UPDATE ON trabalhos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_depoimentos_updated_at
    BEFORE UPDATE ON depoimentos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eventos_updated_at
    BEFORE UPDATE ON eventos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- FUNÇÃO: Incrementar visitantes de trabalhos
-- =============================================
CREATE OR REPLACE FUNCTION increment_trabalho_visitantes(trabalho_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE trabalhos
    SET visitantes = visitantes + 1
    WHERE id = trabalho_uuid;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION increment_trabalho_visitantes IS 'Incrementa o contador de visitantes de um trabalho';

-- =============================================
-- FUNÇÃO: Incrementar downloads de trabalhos
-- =============================================
CREATE OR REPLACE FUNCTION increment_trabalho_baixados(trabalho_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE trabalhos
    SET baixados = baixados + 1
    WHERE id = trabalho_uuid;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION increment_trabalho_baixados IS 'Incrementa o contador de downloads de um trabalho';

-- =============================================
-- FUNÇÃO: Buscar cursos por modalidade e polo
-- =============================================
CREATE OR REPLACE FUNCTION buscar_cursos_por_polo(polo_slug VARCHAR)
RETURNS TABLE (
    curso_id UUID,
    curso_slug VARCHAR,
    curso_nome VARCHAR,
    modalidade VARCHAR,
    polo_nome VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.slug,
        c.title,
        c.modalidade,
        p.name
    FROM cursos c
    JOIN polo_cursos pc ON c.id = pc.curso_id
    JOIN polos p ON pc.polo_id = p.id
    WHERE p.polo_id = polo_slug;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION buscar_cursos_por_polo IS 'Retorna todos os cursos oferecidos em um polo específico';

-- =============================================
-- FUNÇÃO: Buscar professores de um curso
-- =============================================
CREATE OR REPLACE FUNCTION buscar_professores_curso(curso_slug VARCHAR)
RETURNS TABLE (
    professor_id UUID,
    nome VARCHAR,
    titulacao VARCHAR,
    papel VARCHAR,
    foto TEXT,
    email VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.nome,
        p.titulacao,
        cp.papel,
        p.foto,
        p.email
    FROM professores p
    JOIN curso_professores cp ON p.id = cp.professor_id
    JOIN cursos c ON cp.curso_id = c.id
    WHERE c.slug = curso_slug;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION buscar_professores_curso IS 'Retorna todos os professores que lecionam em um curso específico';

-- =============================================
-- FUNÇÃO: Buscar trabalhos por categoria
-- =============================================
CREATE OR REPLACE FUNCTION buscar_trabalhos_por_categoria(categoria_nome VARCHAR)
RETURNS TABLE (
    trabalho_id UUID,
    titulo TEXT,
    autor VARCHAR,
    slug VARCHAR,
    resumo TEXT,
    visitantes INTEGER,
    baixados INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        t.id,
        t.titulo,
        t.autor,
        t.slug,
        t.resumo,
        t.visitantes,
        t.baixados
    FROM trabalhos t
    JOIN trabalho_categorias tc ON t.id = tc.trabalho_id
    JOIN categorias_trabalhos ct ON tc.categoria_id = ct.id
    WHERE ct.nome = categoria_nome
    ORDER BY t.visitantes DESC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION buscar_trabalhos_por_categoria IS 'Retorna trabalhos filtrados por categoria';

-- =============================================
-- FUNÇÃO: Estatísticas de um curso
-- =============================================
CREATE OR REPLACE FUNCTION estatisticas_curso(curso_uuid UUID)
RETURNS TABLE (
    total_professores BIGINT,
    total_polos BIGINT,
    total_turmas_ativas BIGINT,
    total_depoimentos BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM curso_professores WHERE curso_id = curso_uuid),
        (SELECT COUNT(*) FROM polo_cursos WHERE curso_id = curso_uuid),
        (SELECT COUNT(*) FROM turmas WHERE curso_id = curso_uuid AND status = 'ativa'),
        (SELECT COUNT(*) FROM depoimentos WHERE curso_relacionado_id = curso_uuid);
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION estatisticas_curso IS 'Retorna estatísticas consolidadas de um curso';

-- =============================================
-- FUNÇÃO: Validar vagas disponíveis em turma
-- =============================================
CREATE OR REPLACE FUNCTION turma_tem_vagas(turma_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    vagas_disponiveis INTEGER;
BEGIN
    SELECT (vagas_totais - vagas_ocupadas) INTO vagas_disponiveis
    FROM turmas
    WHERE id = turma_uuid;

    RETURN vagas_disponiveis > 0;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION turma_tem_vagas IS 'Verifica se uma turma ainda possui vagas disponíveis';
