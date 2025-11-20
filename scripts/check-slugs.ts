import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSlugs() {
  const { data, error } = await supabase
    .from('cursos')
    .select('id, slug, title')
    .limit(5)

  if (error) {
    console.error('Erro ao buscar cursos:', error.message)
    return
  }

  console.log('Cursos no banco de dados:\n')
  data?.forEach((curso) => {
    console.log(`ID: ${curso.id}`)
    console.log(`Slug: ${curso.slug || '⚠️  SEM SLUG'}`)
    console.log(`Título: ${curso.title}`)
    console.log('---')
  })
}

checkSlugs()
