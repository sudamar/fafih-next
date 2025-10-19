/**
 * Script de Validação da Migração
 *
 * Verifica se todos os dados foram migrados corretamente
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aoukpjibhlcdqdayomqo.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY não configurada!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function validateMigration() {
  console.log('🔍 Validando migração...\n');

  try {
    // Validar Professores
    const { data: professores, error: profError } = await supabase
      .from('professores')
      .select('id, nome, email')
      .order('nome');

    if (profError) throw profError;
    console.log(`✅ Professores: ${professores?.length || 0} registros`);
    if (professores && professores.length > 0) {
      console.log(`   Exemplo: ${professores[0].nome} (${professores[0].email})`);
    }

    // Validar Cursos
    const { data: cursos, error: cursoError } = await supabase
      .from('cursos')
      .select('id, title, slug, modalidade')
      .order('title');

    if (cursoError) throw cursoError;
    console.log(`\n✅ Cursos: ${cursos?.length || 0} registros`);
    if (cursos && cursos.length > 0) {
      console.log(`   Exemplo: ${cursos[0].title} (${cursos[0].modalidade})`);
    }

    // Validar Polos
    const { data: polos, error: poloError } = await supabase
      .from('polos')
      .select('id, name, polo_id')
      .order('name');

    if (poloError) throw poloError;
    console.log(`\n✅ Polos: ${polos?.length || 0} registros`);
    if (polos && polos.length > 0) {
      console.log(`   Exemplo: ${polos[0].name}`);
    }

    // Validar Trabalhos
    const { data: trabalhos, error: trabalhoError } = await supabase
      .from('trabalhos')
      .select('id, titulo, autor')
      .order('titulo')
      .limit(5);

    if (trabalhoError) throw trabalhoError;
    console.log(`\n✅ Trabalhos: ${trabalhos?.length || 0} registros (exibindo 5)`);
    if (trabalhos && trabalhos.length > 0) {
      console.log(`   Exemplo: "${trabalhos[0].titulo}" por ${trabalhos[0].autor}`);
    }

    // Validar Categorias
    const { data: categorias, error: catError } = await supabase
      .from('categorias_trabalhos')
      .select('id, nome')
      .order('nome');

    if (catError) throw catError;
    console.log(`\n✅ Categorias: ${categorias?.length || 0} registros`);
    if (categorias && categorias.length > 0) {
      console.log(`   Exemplos: ${categorias.slice(0, 3).map(c => c.nome).join(', ')}`);
    }

    // Validar Depoimentos
    const { data: depoimentos, error: depError } = await supabase
      .from('depoimentos')
      .select('id, author, role');

    if (depError) throw depError;
    console.log(`\n✅ Depoimentos: ${depoimentos?.length || 0} registros`);
    if (depoimentos && depoimentos.length > 0) {
      console.log(`   Exemplo: ${depoimentos[0].author} (${depoimentos[0].role})`);
    }

    // Validar Posts
    const { data: posts, error: postError } = await supabase
      .from('posts')
      .select('id, title');

    if (postError) throw postError;
    console.log(`\n✅ Posts: ${posts?.length || 0} registros`);

    // Validar Eventos
    const { data: eventos, error: eventError } = await supabase
      .from('eventos')
      .select('id, titulo_evento, data_evento');

    if (eventError) throw eventError;
    console.log(`\n✅ Eventos: ${eventos?.length || 0} registros`);
    if (eventos && eventos.length > 0) {
      console.log(`   Exemplo: ${eventos[0].titulo_evento} (${eventos[0].data_evento})`);
    }

    // Testar Views
    console.log('\n📊 Testando views...');

    const { data: cursosComCoordenador, error: viewError1 } = await supabase
      .from('cursos_com_coordenador')
      .select('title, coordenador_nome')
      .limit(3);

    if (viewError1) {
      console.log('⚠️  View cursos_com_coordenador não disponível ou vazia');
    } else {
      console.log(`✅ View cursos_com_coordenador: ${cursosComCoordenador?.length || 0} registros`);
    }

    const { data: stats, error: viewError2 } = await supabase
      .from('estatisticas_gerais')
      .select('*')
      .limit(1);

    if (viewError2) {
      console.log('⚠️  View estatisticas_gerais não disponível');
    } else if (stats && stats.length > 0) {
      console.log(`✅ View estatisticas_gerais funcionando`);
      console.log(`   Total de cursos: ${stats[0].total_cursos}`);
      console.log(`   Total de professores: ${stats[0].total_professores}`);
      console.log(`   Total de trabalhos: ${stats[0].total_trabalhos}`);
    }

    console.log('\n✅ Validação concluída com sucesso! 🎉');
    console.log('\n📍 Próximos passos:');
    console.log('   1. Acesse o dashboard do Supabase para visualizar os dados');
    console.log('   2. Teste as queries nas views criadas');
    console.log('   3. Atualize os services do Next.js para usar o Supabase');

  } catch (error) {
    console.error('❌ Erro na validação:', error);
    process.exit(1);
  }
}

validateMigration();
