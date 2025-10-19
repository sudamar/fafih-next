/**
 * Script para verificar os campos video_url e image_url dos cursos
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aoukpjibhlcdqdayomqo.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY não configurada!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkCourseMedia() {
  console.log('🔍 Verificando campos de mídia dos cursos...\n');

  const { data: cursos, error } = await supabase
    .from('cursos')
    .select('title, slug, video_url, image_url, image')
    .order('title');

  if (error) {
    console.error('❌ Erro ao buscar cursos:', error);
    return;
  }

  console.log(`📚 Total de cursos: ${cursos?.length || 0}\n`);

  let comVideo = 0;
  let semVideo = 0;

  cursos?.forEach((curso) => {
    console.log(`📖 ${curso.title}`);
    console.log(`   Slug: ${curso.slug}`);

    if (curso.video_url) {
      console.log(`   ✅ Video URL: ${curso.video_url}`);
      comVideo++;
    } else {
      console.log(`   ⚠️  Sem vídeo`);
      semVideo++;
    }

    if (curso.image_url) {
      console.log(`   🖼️  Image URL: ${curso.image_url.substring(0, 60)}${curso.image_url.length > 60 ? '...' : ''}`);
    } else if (curso.image) {
      console.log(`   🖼️  Image (fallback): ${curso.image.substring(0, 60)}${curso.image.length > 60 ? '...' : ''}`);
    } else {
      console.log(`   ❌ SEM IMAGEM!`);
    }

    console.log('');
  });

  console.log('📊 Resumo:');
  console.log(`   🎬 Cursos com vídeo: ${comVideo}`);
  console.log(`   📷 Cursos sem vídeo: ${semVideo}`);
}

checkCourseMedia();
