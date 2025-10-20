import { createClient } from '@supabase/supabase-js'
import postsData from '../src/lib/data/posts.json'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function migratePosts() {
  console.log('Iniciando migração de posts para Supabase...')

  for (const post of postsData) {
    const postData = {
      slug: post.slug,
      title: post.title,
      date: post.date,
      author: post.author,
      author_name: post.authorInfo.name,
      author_description: post.authorInfo.description,
      author_email: post.authorInfo.email,
      author_phone: post.authorInfo.phone || null,
      author_photo: post.authorInfo.photo,
      excerpt: post.excerpt,
      content: post.content,
    }

    const { data, error } = await supabase
      .from('posts')
      .upsert(postData, { onConflict: 'slug' })
      .select()

    if (error) {
      console.error(`❌ Erro ao inserir post "${post.title}":`, error)
    } else {
      console.log(`✅ Post "${post.title}" inserido com sucesso`)
    }
  }

  console.log('\n✅ Migração de posts concluída!')

  // Verificar total de posts
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  console.log(`\n📊 Total de posts no banco: ${count}`)
}

migratePosts().catch(console.error)
