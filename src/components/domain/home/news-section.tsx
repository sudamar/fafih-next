import postsData from '@/lib/data/posts.json'

export function NewsSection() {
  return (
    <section id="noticias" className="bg-background px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Notícias</h2>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {postsData.map((post) => (
            <a
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="rounded-xl border-l-4 border-secondary bg-card-bg px-6 py-5 text-lg font-semibold text-primary shadow-lg transition hover:-translate-y-1 hover:text-secondary hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {post.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
