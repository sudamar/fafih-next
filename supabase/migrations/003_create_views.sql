-- =============================================
-- FAFIH Database Migration - Views
-- Version: 1.0
-- Created: 2025-10-19
-- =============================================

-- =============================================
-- VIEW: Cursos com Coordenador
-- =============================================
CREATE OR REPLACE VIEW cursos_com_coordenador AS
SELECT
    c.id,
    c.slug,
    c.title,
    c.subtitle,
    c.description,
    c.modalidade,
    c.price,
    c.original_price,
    c.duration,
    c.workload,
    c.image,
    c.category,
    c.category_label,
    p.id AS coordenador_id,
    p.nome AS coordenador_nome,
    p.email AS coordenador_email,
    p.telefone AS coordenador_telefone,
    p.foto AS coordenador_foto,
    p.titulacao AS coordenador_titulacao
FROM cursos c
LEFT JOIN professores p ON c.coordenador_id = p.id;

COMMENT ON VIEW cursos_com_coordenador IS 'Lista cursos com informações detalhadas do coordenador';

-- =============================================
-- VIEW: Trabalhos com Categorias
-- =============================================
CREATE OR REPLACE VIEW trabalhos_com_categorias AS
SELECT
    t.id,
    t.slug,
    t.titulo,
    t.autor,
    t.data_publicacao,
    t.link,
    t.resumo,
    t.nota,
    t.visitantes,
    t.baixados,
    array_agg(ct.nome) FILTER (WHERE ct.nome IS NOT NULL) AS categorias,
    array_agg(ct.cor) FILTER (WHERE ct.cor IS NOT NULL) AS categorias_cores,
    array_agg(ct.icone) FILTER (WHERE ct.icone IS NOT NULL) AS categorias_icones
FROM trabalhos t
LEFT JOIN trabalho_categorias tc ON t.id = tc.trabalho_id
LEFT JOIN categorias_trabalhos ct ON tc.categoria_id = ct.id
GROUP BY t.id, t.slug, t.titulo, t.autor, t.data_publicacao, t.link, t.resumo, t.nota, t.visitantes, t.baixados;

COMMENT ON VIEW trabalhos_com_categorias IS 'Lista trabalhos com suas categorias agregadas';

-- =============================================
-- VIEW: Cursos por Polo
-- =============================================
CREATE OR REPLACE VIEW cursos_por_polo AS
SELECT
    p.id AS polo_id,
    p.polo_id AS polo_slug,
    p.name AS polo_nome,
    p.address AS polo_endereco,
    p.phone AS polo_telefone,
    p.email AS polo_email,
    p.coordinator AS polo_coordenador,
    c.id AS curso_id,
    c.slug AS curso_slug,
    c.title AS curso_nome,
    c.modalidade,
    c.duration,
    c.price
FROM polos p
JOIN polo_cursos pc ON p.id = pc.polo_id
JOIN cursos c ON pc.curso_id = c.id;

COMMENT ON VIEW cursos_por_polo IS 'Relacionamento completo entre polos e cursos';

-- =============================================
-- VIEW: Professores por Curso
-- =============================================
CREATE OR REPLACE VIEW professores_por_curso AS
SELECT
    c.id AS curso_id,
    c.slug AS curso_slug,
    c.title AS curso_nome,
    p.id AS professor_id,
    p.nome AS professor_nome,
    p.titulacao AS professor_titulacao,
    p.foto AS professor_foto,
    p.email AS professor_email,
    cp.papel AS professor_papel
FROM cursos c
JOIN curso_professores cp ON c.id = cp.curso_id
JOIN professores p ON cp.professor_id = p.id;

COMMENT ON VIEW professores_por_curso IS 'Lista todos os professores de cada curso com seus papéis';

-- =============================================
-- VIEW: Turmas Ativas
-- =============================================
CREATE OR REPLACE VIEW turmas_ativas AS
SELECT
    t.id,
    t.nome AS turma_nome,
    t.data_inicio,
    t.data_termino,
    t.horario,
    t.vagas_totais,
    t.vagas_ocupadas,
    (t.vagas_totais - t.vagas_ocupadas) AS vagas_disponiveis,
    t.status,
    c.title AS curso_nome,
    c.slug AS curso_slug,
    p.name AS polo_nome,
    p.polo_id AS polo_slug
FROM turmas t
JOIN cursos c ON t.curso_id = c.id
JOIN polos p ON t.polo_id = p.id
WHERE t.status = 'ativa';

COMMENT ON VIEW turmas_ativas IS 'Lista apenas turmas ativas com informações de vagas';

-- =============================================
-- VIEW: Eventos Futuros
-- =============================================
CREATE OR REPLACE VIEW eventos_futuros AS
SELECT
    e.id,
    e.titulo_evento,
    e.descricao_evento,
    e.tipo_evento,
    e.data_evento,
    e.local_evento,
    e.hora_evento,
    e.observacao_evento,
    c.title AS curso_nome,
    c.slug AS curso_slug,
    p.name AS polo_nome,
    p.polo_id AS polo_slug
FROM eventos e
LEFT JOIN cursos c ON e.curso_relacionado_id = c.id
LEFT JOIN polos p ON e.polo_relacionado_id = p.id
WHERE e.data_evento >= CURRENT_DATE
ORDER BY e.data_evento ASC;

COMMENT ON VIEW eventos_futuros IS 'Lista eventos futuros ordenados por data';

-- =============================================
-- VIEW: Posts Publicados
-- =============================================
CREATE OR REPLACE VIEW posts_publicados AS
SELECT
    id,
    slug,
    title,
    date,
    author,
    author_info,
    excerpt,
    image,
    created_at
FROM posts
WHERE published = TRUE
ORDER BY date DESC;

COMMENT ON VIEW posts_publicados IS 'Lista apenas posts publicados ordenados por data';

-- =============================================
-- VIEW: Depoimentos em Destaque
-- =============================================
CREATE OR REPLACE VIEW depoimentos_destaque AS
SELECT
    d.id,
    d.quote,
    d.author,
    d.role,
    d.foto,
    c.title AS curso_nome,
    c.slug AS curso_slug
FROM depoimentos d
LEFT JOIN cursos c ON d.curso_relacionado_id = c.id
WHERE d.destaque = TRUE;

COMMENT ON VIEW depoimentos_destaque IS 'Lista apenas depoimentos marcados como destaque';

-- =============================================
-- VIEW: Trabalhos Mais Acessados
-- =============================================
CREATE OR REPLACE VIEW trabalhos_mais_acessados AS
SELECT
    t.id,
    t.slug,
    t.titulo,
    t.autor,
    t.resumo,
    t.visitantes,
    t.baixados,
    t.nota,
    array_agg(ct.nome) FILTER (WHERE ct.nome IS NOT NULL) AS categorias
FROM trabalhos t
LEFT JOIN trabalho_categorias tc ON t.id = tc.trabalho_id
LEFT JOIN categorias_trabalhos ct ON tc.categoria_id = ct.id
GROUP BY t.id, t.slug, t.titulo, t.autor, t.resumo, t.visitantes, t.baixados, t.nota
ORDER BY t.visitantes DESC
LIMIT 10;

COMMENT ON VIEW trabalhos_mais_acessados IS 'Top 10 trabalhos mais visitados';

-- =============================================
-- VIEW: Estatísticas Gerais
-- =============================================
CREATE OR REPLACE VIEW estatisticas_gerais AS
SELECT
    (SELECT COUNT(*) FROM cursos) AS total_cursos,
    (SELECT COUNT(*) FROM professores) AS total_professores,
    (SELECT COUNT(*) FROM polos) AS total_polos,
    (SELECT COUNT(*) FROM turmas WHERE status = 'ativa') AS total_turmas_ativas,
    (SELECT COUNT(*) FROM trabalhos) AS total_trabalhos,
    (SELECT COUNT(*) FROM posts WHERE published = TRUE) AS total_posts_publicados,
    (SELECT COUNT(*) FROM eventos WHERE data_evento >= CURRENT_DATE) AS total_eventos_futuros;

COMMENT ON VIEW estatisticas_gerais IS 'Estatísticas consolidadas do sistema';
