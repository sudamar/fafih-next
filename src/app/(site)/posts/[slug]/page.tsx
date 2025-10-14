import { PageTitle } from '@/components/ui/page-title'
import postsData from '@/lib/data/posts.json'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import AuthorCard from '@/components/shared/AuthorCard'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = postsData.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const isMarkdown = typeof post.content === 'string'

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

            {isMarkdown ? (
              <article className="prose prose-lg max-w-none text-justify [&>p]:leading-relaxed [&>p]:text-gray-700 [&>p]:mb-4 [&>blockquote]:italic [&>blockquote]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:my-6 [&>hr]:my-8 [&>hr]:border-gray-300 [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h3]:mt-8 [&>h3]:pt-8 [&>h3]:border-t [&>h3]:border-gray-300 [&>h3:first-child]:mt-0 [&>h3:first-child]:pt-0 [&>h3:first-child]:border-t-0">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
            ) : (
              <article className="prose prose-lg max-w-none">
                {Array.isArray(post.content) && post.content.map((block: any, index: number) => {
                if (block.type === 'paragraph') {
                  return (
                    <p
                      key={index}
                      className="text-justify leading-relaxed text-gray-700 mb-4"
                      dangerouslySetInnerHTML={{ __html: block.text }}
                    />
                  )
                }

                if (block.type === 'quote') {
                  return (
                    <p
                      key={index}
                      className="text-justify leading-relaxed text-gray-700 italic pl-6 border-l-4 border-primary my-6"
                      dangerouslySetInnerHTML={{ __html: block.text }}
                    />
                  )
                }

                if (block.type === 'faq') {
                  return (
                    <div key={index} className="mb-6 bg-gray-50 p-6 rounded-lg">
                      <p className="font-bold text-gray-800 mb-3" dangerouslySetInnerHTML={{ __html: block.question }} />
                      <p className="text-justify leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: block.answer }} />
                    </div>
                  )
                }

                if (block.type === 'author') {
                  return (
                    <p
                      key={index}
                      className="text-justify leading-relaxed text-gray-700 mt-8 font-semibold"
                      dangerouslySetInnerHTML={{ __html: block.text }}
                    />
                  )
                }

                return null
              })}
              </article>
            )}

            {/* Card do Autor */}
            {(post as any).authorInfo && (
              <div className="mt-12">
                <AuthorCard
                  name={(post as any).authorInfo.name}
                  description={(post as any).authorInfo.description}
                  photo={(post as any).authorInfo.photo}
                  email={(post as any).authorInfo.email}
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
