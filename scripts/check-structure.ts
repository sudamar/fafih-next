import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStructure() {
  const { data, error } = await supabase
    .from('cursos')
    .select('slug, highlights, curriculum')
    .limit(1);

  if (error) {
    console.error('Erro:', error);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

checkStructure();
