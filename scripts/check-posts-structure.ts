import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkStructure() {
  console.log('Verificando estrutura da tabela posts...\n')

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Erro:', error)
  } else {
    console.log('Estrutura atual da tabela posts:')
    console.log(JSON.stringify(data, null, 2))

    if (data && data.length > 0) {
      console.log('\nCampos disponíveis:')
      console.log(Object.keys(data[0]).join(', '))
    }
  }
}

checkStructure().catch(console.error)
