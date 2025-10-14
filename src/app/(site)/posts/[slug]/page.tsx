import { PageTitle } from '@/components/ui/page-title'
import postsData from '@/lib/data/posts.json'
import { notFound } from 'next/navigation'

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

            <article className="prose prose-lg max-w-none">
              {post.content.map((block, index) => {
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
