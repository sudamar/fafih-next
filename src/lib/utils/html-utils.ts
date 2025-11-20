/**
 * Adiciona a classe 'list-item-check' em todas as tags <ul> de um HTML string
 * para que recebam automaticamente o ícone verde de check
 */
export function addCheckIconToLists(html: string): string {
  if (!html) return html

  // Substitui todas as tags <ul> adicionando a classe list-item-check
  return html.replace(/<ul(\s+[^>]*)?>/gi, (match, attributes) => {
    if (!attributes) {
      // <ul> sem atributos
      return '<ul class="list-item-check">'
    }

    // Verifica se já tem a classe list-item-check
    if (attributes.includes('list-item-check')) {
      return match
    }

    // Verifica se já tem atributo class
    if (attributes.includes('class=')) {
      // Adiciona list-item-check às classes existentes
      const newAttributes = attributes.replace(/class=["']([^"']*)["']/i, 'class="list-item-check $1"')
      return `<ul${newAttributes}>`
    }

    // Não tem class, adiciona nova
    return `<ul class="list-item-check"${attributes}>`
  })
}

/**
 * Processa o HTML dos objetivos do currículo para renderização segura.
 * Adiciona classes necessárias (como list-item-check para listas com ícone de check).
 *
 * @param objetivos - String HTML com os objetivos do módulo
 * @returns String HTML processada pronta para renderização
 */
export function getObjetivosHtml(objetivos: string | null): string {
  if (!objetivos) return ''

  // Aplica a classe list-item-check nas listas
  return addCheckIconToLists(objetivos)
}

/**
 * Remove todas as tags HTML de uma string, mantendo apenas o texto.
 * Útil para exibir conteúdo HTML como texto simples em cards ou previews.
 *
 * @param html - String contendo HTML
 * @returns String apenas com o texto, sem tags HTML
 */
export function stripHtmlTags(html: string | null | undefined): string {
  if (!html) return ''

  return html
    .replace(/<[^>]*>/g, '') // Remove todas as tags HTML
    .replace(/&nbsp;/g, ' ') // Substitui &nbsp; por espaço
    .replace(/&amp;/g, '&') // Substitui &amp; por &
    .replace(/&lt;/g, '<') // Substitui &lt; por <
    .replace(/&gt;/g, '>') // Substitui &gt; por >
    .replace(/&quot;/g, '"') // Substitui &quot; por "
    .replace(/&apos;/g, "'") // Substitui &apos; por '
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .trim() // Remove espaços no início e fim
}
