import { PageTitle } from '@/components/ui/page-title'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import AuthorCard from '@/components/shared/AuthorCard'
import { getAllPosts, getPostBySlug } from 'teste/posts'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const authorInfo = post.author_info as {
    name: string
    description: string
    email: string
    phone?: string
    photo: string
  } | null

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 md:p-12 shadow-lg">
            <PageTitle>{post.title}</PageTitle>

            {post.date && (
              <p className="text-sm text-gray-500 mb-8 text-center">
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}

            <article className="prose prose-lg max-w-none text-justify [&>p]:leading-relaxed [&>p]:text-gray-700 [&>p]:mb-4 [&>blockquote]:italic [&>blockquote]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:my-6 [&>hr]:my-8 [&>hr]:border-gray-300 [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h3]:mt-8 [&>h3]:pt-8 [&>h3]:border-t [&>h3]:border-gray-300 [&>h3:first-child]:mt-0 [&>h3:first-child]:pt-0 [&>h3:first-child]:border-t-0">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>

            {/* Card do Autor */}
            {authorInfo && (
              <div className="mt-12">
                <AuthorCard
                  name={authorInfo.name}
                  description={authorInfo.description}
                  photo={authorInfo.photo}
                  email={authorInfo.email}
                />
              </div>
            )}

            {/* Botão Voltar */}
            <div className="mt-12 flex justify-center">
              <a
                href="/#noticias"
                className="inline-block rounded-full border-2 border-primary bg-transparent px-8 py-3 font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                ← Voltar para Notícias
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
