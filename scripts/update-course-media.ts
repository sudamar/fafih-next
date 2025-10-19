/**
 * Script para atualizar campos video_url e image_url dos cursos existentes
 * Lê os dados do courses.json e atualiza os registros no Supabase
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aoukpjibhlcdqdayomqo.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY não configurada!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function updateCourseMedia() {
  console.log('🎬 Atualizando video_url e image_url dos cursos...\n');

  // Ler courses.json
  const coursesPath = path.join(process.cwd(), 'src/lib/data/courses.json');
  const coursesContent = fs.readFileSync(coursesPath, 'utf-8');
  const courses = JSON.parse(coursesContent);

  let updatedCount = 0;
  let errorCount = 0;

  for (const course of courses) {
    try {
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

      // Atualizar curso no Supabase
      const { error } = await supabase
        .from('cursos')
        .update({
          video_url: videoUrl,
          image_url: imageUrl,
        })
        .eq('slug', course.slug);

      if (error) {
        console.error(`❌ Erro ao atualizar curso "${course.title}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Atualizado: ${course.title}`);
        if (videoUrl) {
          console.log(`   📹 Video: ${videoUrl}`);
        }
        if (imageUrl) {
          console.log(`   🖼️  Image: ${imageUrl.substring(0, 50)}...`);
        }
        updatedCount++;
      }
    } catch (err) {
      console.error(`❌ Erro ao processar curso "${course.title}":`, err);
      errorCount++;
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Cursos atualizados: ${updatedCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`\n✨ Atualização concluída!`);
}

updateCourseMedia();
