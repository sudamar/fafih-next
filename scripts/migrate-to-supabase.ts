/**
 * Script de Migração dos JSONs para Supabase
 *
 * Este script migra todos os dados dos arquivos JSON localizados em /src/lib/data
 * para o banco de dados Supabase.
 *
 * Uso: npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuração do Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aoukpjibhlcdqdayomqo.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY não configurada!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Caminhos dos arquivos JSON
const DATA_DIR = path.join(process.cwd(), 'src/lib/data');

// Função para ler arquivos JSON
function readJsonFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

// =============================================
// 1. MIGRAR PROFESSORES
// =============================================
async function migrateProfessores() {
  console.log('\n📚 Migrando professores...');

  type Professor = {
    nome: string;
    titulacao: string;
    descricao: string;
    foto: string;
    email: string;
    telefone: string;
  };

  const professores = readJsonFile<Professor[]>('professores.json');

  const { data, error } = await supabase
    .from('professores')
    .insert(professores)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar professores:', error);
    return null;
  }

  console.log(`✅ ${data.length} professores migrados com sucesso`);
  return data;
}

// =============================================
// 2. MIGRAR CATEGORIAS DE TRABALHOS
// =============================================
async function migrateCategoriasTrabalhos() {
  console.log('\n🏷️  Migrando categorias de trabalhos...');

  type Categoria = {
    nome: string;
    icone: string;
    cor: string;
  };

  const categorias = readJsonFile<Categoria[]>('categoria-trabalhos.json');

  const { data, error } = await supabase
    .from('categorias_trabalhos')
    .insert(categorias)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar categorias:', error);
    return null;
  }

  console.log(`✅ ${data.length} categorias migradas com sucesso`);
  return data;
}

// =============================================
// 3. MIGRAR POLOS
// =============================================
async function migratePolos() {
  console.log('\n📍 Migrando polos...');

  type PoloData = {
    locations: Array<{
      id: string;
      name: string;
      address: string;
      phone: string;
      email: string;
      coordinator: string;
      mapUrl: string;
      courses: string[];
    }>;
  };

  const polosData = readJsonFile<PoloData>('polos.json');

  const polosToInsert = polosData.locations.map(location => ({
    polo_id: location.id,
    name: location.name,
    address: location.address,
    phone: location.phone,
    email: location.email,
    coordinator: location.coordinator,
    map_url: location.mapUrl,
  }));

  const { data, error } = await supabase
    .from('polos')
    .insert(polosToInsert)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar polos:', error);
    return null;
  }

  console.log(`✅ ${data.length} polos migrados com sucesso`);
  return { data, coursesMap: polosData.locations };
}

// =============================================
// 4. MIGRAR CURSOS
// =============================================
async function migrateCursos(professoresData: any[]) {
  console.log('\n🎓 Migrando cursos...');

  // Carregar apenas as primeiras 50 linhas para teste
  const coursesPath = path.join(DATA_DIR, 'courses.json');
  const coursesContent = fs.readFileSync(coursesPath, 'utf-8');
  const courses = JSON.parse(coursesContent);

  const cursosToInsert = [];

  for (const course of courses) {
    // Encontrar coordenador pelo nome (se existir no campo professors)
    let coordenadorId = null;
    if (course.professors?.coordinator) {
      const coordenador = professoresData.find(p =>
        p.nome.includes(course.professors.coordinator) ||
        course.professors.coordinator.includes(p.nome)
      );
      if (coordenador) {
        coordenadorId = coordenador.id;
      }
    }

    // Mapear hero para video_url e image_url
    let videoUrl = null;
    let imageUrl = null;

    if (course.hero) {
      if (course.hero.type === 'video') {
        videoUrl = course.hero.source;
        imageUrl = course.hero.fallbackImage || course.image;
      } else if (course.hero.type === 'image') {
        imageUrl = course.hero.source;
      }
    } else {
      imageUrl = course.image;
    }

    cursosToInsert.push({
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      full_description: course.fullDescription,
      image: course.image,
      video_url: videoUrl,
      image_url: imageUrl,
      category: course.category,
      category_label: course.categoryLabel,
      price: course.price,
      original_price: course.originalPrice,
      preco_matricula: course.precoMatricula,
      modalidade: course.modalidade,
      duration: course.duration,
      workload: course.workload,
      start_date: course.startDate,
      max_students: course.maxStudents,
      certificate: course.certificate,
      monthly_price: course.monthlyPrice,
      justificativa: course.justificativa,
      objetivos: course.objetivos,
      publico: course.publico,
      highlights: course.highlights,
      curriculum: course.curriculum,
      investment_details: course.investmentDetails,
      additional_info: course.additionalInfo,
      coordenador_id: coordenadorId,
    });
  }

  const { data, error } = await supabase
    .from('cursos')
    .insert(cursosToInsert)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar cursos:', error);
    console.error('Detalhes:', JSON.stringify(error, null, 2));
    return null;
  }

  console.log(`✅ ${data.length} cursos migrados com sucesso`);
  return { data, originalCourses: courses };
}

// =============================================
// 5. MIGRAR RELACIONAMENTO CURSO-PROFESSORES
// =============================================
async function migrateCursoProfessores(cursosData: any, professoresData: any[]) {
  console.log('\n👥 Migrando relação curso-professores...');

  const { data: cursos, originalCourses } = cursosData;
  const relacionamentos = [];

  for (let i = 0; i < cursos.length; i++) {
    const curso = cursos[i];
    const originalCourse = originalCourses[i];

    // Se tem lista de professores
    if (originalCourse.professors?.teachers) {
      for (const teacherName of originalCourse.professors.teachers) {
        const professor = professoresData.find(p =>
          p.nome.includes(teacherName) || teacherName.includes(p.nome)
        );

        if (professor) {
          relacionamentos.push({
            curso_id: curso.id,
            professor_id: professor.id,
            papel: 'docente',
          });
        }
      }
    }

    // Adicionar coordenador
    if (curso.coordenador_id) {
      relacionamentos.push({
        curso_id: curso.id,
        professor_id: curso.coordenador_id,
        papel: 'coordenador',
      });
    }
  }

  if (relacionamentos.length > 0) {
    const { data, error } = await supabase
      .from('curso_professores')
      .insert(relacionamentos)
      .select();

    if (error) {
      console.error('❌ Erro ao migrar curso-professores:', error);
      return null;
    }

    console.log(`✅ ${data.length} relacionamentos curso-professor migrados`);
    return data;
  }

  console.log('⚠️  Nenhum relacionamento curso-professor encontrado');
  return [];
}

// =============================================
// 6. MIGRAR RELACIONAMENTO POLO-CURSOS
// =============================================
async function migratePoloCursos(polosResult: any, cursosData: any) {
  console.log('\n🏢 Migrando relação polo-cursos...');

  const { data: polos, coursesMap } = polosResult;
  const { data: cursos } = cursosData;

  const relacionamentos = [];

  for (const poloOriginal of coursesMap) {
    const polo = polos.find((p: any) => p.polo_id === poloOriginal.id);

    if (!polo) continue;

    for (const courseName of poloOriginal.courses) {
      const curso = cursos.find((c: any) =>
        c.title.includes(courseName) || courseName.includes(c.title)
      );

      if (curso) {
        relacionamentos.push({
          polo_id: polo.id,
          curso_id: curso.id,
        });
      }
    }
  }

  if (relacionamentos.length > 0) {
    const { data, error } = await supabase
      .from('polo_cursos')
      .insert(relacionamentos)
      .select();

    if (error) {
      console.error('❌ Erro ao migrar polo-cursos:', error);
      return null;
    }

    console.log(`✅ ${data.length} relacionamentos polo-curso migrados`);
    return data;
  }

  console.log('⚠️  Nenhum relacionamento polo-curso encontrado');
  return [];
}

// =============================================
// 7. MIGRAR TRABALHOS
// =============================================
async function migrateTrabalhos(categoriasData: any[]) {
  console.log('\n📄 Migrando trabalhos...');

  type Trabalho = {
    titulo: string;
    autor: string;
    data_publicacao: string;
    link: string;
    tags: string[];
    slug: string;
    resumo: string;
    nota?: number;
    visitantes?: number;
    baixados?: number;
  };

  const trabalhos = readJsonFile<Trabalho[]>('trabalhos.json');

  const trabalhosToInsert = trabalhos.map(t => ({
    slug: t.slug,
    titulo: t.titulo,
    autor: t.autor,
    data_publicacao: t.data_publicacao,
    link: t.link,
    resumo: t.resumo,
    nota: t.nota,
    visitantes: t.visitantes || 0,
    baixados: t.baixados || 0,
  }));

  const { data, error } = await supabase
    .from('trabalhos')
    .insert(trabalhosToInsert)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar trabalhos:', error);
    return null;
  }

  console.log(`✅ ${data.length} trabalhos migrados com sucesso`);

  // Migrar relacionamento trabalho-categorias
  const relacionamentos = [];

  for (let i = 0; i < data.length; i++) {
    const trabalho = data[i];
    const originalTrabalho = trabalhos[i];

    for (const tagName of originalTrabalho.tags) {
      const categoria = categoriasData.find(c => c.nome === tagName);

      if (categoria) {
        relacionamentos.push({
          trabalho_id: trabalho.id,
          categoria_id: categoria.id,
        });
      }
    }
  }

  if (relacionamentos.length > 0) {
    const { data: relData, error: relError } = await supabase
      .from('trabalho_categorias')
      .insert(relacionamentos)
      .select();

    if (relError) {
      console.error('❌ Erro ao migrar trabalho-categorias:', relError);
    } else {
      console.log(`✅ ${relData.length} relacionamentos trabalho-categoria migrados`);
    }
  }

  return data;
}

// =============================================
// 8. MIGRAR DEPOIMENTOS
// =============================================
async function migrateDepoimentos() {
  console.log('\n💬 Migrando depoimentos...');

  type Depoimento = {
    quote: string;
    author: string;
    role: string;
  };

  const depoimentos = readJsonFile<Depoimento[]>('depoimentos.json');

  const { data, error } = await supabase
    .from('depoimentos')
    .insert(depoimentos)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar depoimentos:', error);
    return null;
  }

  console.log(`✅ ${data.length} depoimentos migrados com sucesso`);
  return data;
}

// =============================================
// 9. MIGRAR POSTS
// =============================================
async function migratePosts() {
  console.log('\n📰 Migrando posts...');

  type Post = {
    slug: string;
    title: string;
    date: string;
    author: string;
    authorInfo: any;
    excerpt: string;
    content: string;
  };

  const posts = readJsonFile<Post[]>('posts.json');

  const postsToInsert = posts.map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    author: p.author,
    author_info: p.authorInfo,
    excerpt: p.excerpt,
    content: p.content,
    published: true,
  }));

  const { data, error } = await supabase
    .from('posts')
    .insert(postsToInsert)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar posts:', error);
    return null;
  }

  console.log(`✅ ${data.length} posts migrados com sucesso`);
  return data;
}

// =============================================
// 10. MIGRAR EVENTOS
// =============================================
async function migrateEventos() {
  console.log('\n📅 Migrando eventos...');

  type Evento = {
    titulo_evento: string;
    descricao_evento: string;
    tipo_evento: string;
    data_evento: string;
    local_evento: string;
    hora_evento: string;
    observacao_evento: string;
  };

  const eventos = readJsonFile<Evento[]>('eventos.json');

  const { data, error } = await supabase
    .from('eventos')
    .insert(eventos)
    .select();

  if (error) {
    console.error('❌ Erro ao migrar eventos:', error);
    return null;
  }

  console.log(`✅ ${data.length} eventos migrados com sucesso`);
  return data;
}

// =============================================
// EXECUTAR MIGRAÇÃO
// =============================================
async function main() {
  console.log('🚀 Iniciando migração dos dados para Supabase...\n');
  console.log(`📡 Conectando em: ${SUPABASE_URL}\n`);

  try {
    // Ordem de migração (respeitando dependências)
    const professores = await migrateProfessores();
    if (!professores) throw new Error('Falha ao migrar professores');

    const categorias = await migrateCategoriasTrabalhos();
    if (!categorias) throw new Error('Falha ao migrar categorias');

    const polos = await migratePolos();
    if (!polos) throw new Error('Falha ao migrar polos');

    const cursos = await migrateCursos(professores);
    if (!cursos) throw new Error('Falha ao migrar cursos');

    await migrateCursoProfessores(cursos, professores);
    await migratePoloCursos(polos, cursos);

    await migrateTrabalhos(categorias);
    await migrateDepoimentos();
    await migratePosts();
    await migrateEventos();

    console.log('\n✅ Migração concluída com sucesso! 🎉\n');

  } catch (error) {
    console.error('\n❌ Erro durante a migração:', error);
    process.exit(1);
  }
}

// Executar
main();
