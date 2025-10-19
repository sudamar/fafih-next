import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMigration() {
  console.log('=== Checking curso_highlights ===');
  const { data: highlights, error: highlightsError } = await supabase
    .from('curso_highlights')
    .select('*')
    .limit(3);

  if (highlightsError) {
    console.error('Erro highlights:', highlightsError);
  } else {
    console.log(`Total highlights found: ${highlights?.length || 0}`);
    console.log(JSON.stringify(highlights, null, 2));
  }

  console.log('\n=== Checking curso_curriculum ===');
  const { data: curriculum, error: curriculumError } = await supabase
    .from('curso_curriculum')
    .select('*')
    .limit(3);

  if (curriculumError) {
    console.error('Erro curriculum:', curriculumError);
  } else {
    console.log(`Total curriculum found: ${curriculum?.length || 0}`);
    console.log(JSON.stringify(curriculum, null, 2));
  }
}

checkMigration();
