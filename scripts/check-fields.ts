import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFields() {
  const { data, error } = await supabase
    .from('cursos')
    .select('id, title, modalidade, description')
    .limit(3);

  if (error) {
    console.error('Erro:', error);
    return;
  }

  console.log('Cursos:', JSON.stringify(data, null, 2));
}

checkFields();
