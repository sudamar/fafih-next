'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { FormTitle } from '@/components/ui/form-title'

export default function CPAPage() {
  const [activeTab, setActiveTab] = useState('apresentacao')

  const tabs = [
    { id: 'apresentacao', label: 'Apresentação' },
    { id: 'relatorios', label: 'Relatórios e Projetos' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'noticias', label: 'Notícias' },
    { id: 'contato', label: 'Contato' },
    { id: 'legislacao', label: 'Legislação' },
    { id: 'depoimentos', label: 'Depoimentos' },
  ]

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <PageTitle>Comissão Própria de Avaliação (CPA)</PageTitle>

          {/* Tabs Navigation */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-6 py-3 font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-secondary hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            {activeTab === 'apresentacao' && <ApresentacaoTab />}
            {activeTab === 'relatorios' && <RelatoriosTab />}
            {activeTab === 'agenda' && <AgendaTab />}
            {activeTab === 'noticias' && <NoticiasTab />}
            {activeTab === 'contato' && <ContatoTab />}
            {activeTab === 'legislacao' && <LegislacaoTab />}
            {activeTab === 'depoimentos' && <DepoimentosTab />}
          </div>
        </div>
      </section>
    </main>
  )
}

// Apresentação Tab
function ApresentacaoTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>O que é Autoavaliação Institucional?</SectionTitle>
      <p className="text-justify leading-relaxed text-gray-700">
        A Autoavaliação Institucional está em consonância com o Sistema Nacional de Avaliação da Educação Superior -- SINAES, instituído pela Lei Nº 10.861 de 14 de abril de 2004, que possui como principal finalidade a melhoria da qualidade da educação superior visando a efetividade acadêmica e social.
      </p>
      <p className="text-justify leading-relaxed text-gray-700">
        A Autoavaliação em alinhamento com o Plano de Desenvolvimento Institucional (PDI) compreende um processo de autoconhecimento, que conduzido pela Comissão Própria de Avaliação (CPA) promove a participação de todos os atores envolvidos com a comunidade universitária, sendo eles membros do corpo acadêmico (docentes, discentes etc), administrativo, diretivo e a comunidade, promovendo uma cultura participativa e de engajamento na promoção da melhoria contínua das atividades acadêmicas desenvolvidas.
      </p>

      <SectionTitle className="mt-8">Apresentação</SectionTitle>
      <p className="text-justify leading-relaxed text-gray-700">
        A Comissão Própria de Avaliação (CPA) constitui um órgão colegiado de natureza consultiva, com atribuições de elaboração, implementação, aplicação e monitoramento do processo de Autoavaliação Institucional com foco em melhoria contínua.
      </p>
      <p className="text-justify leading-relaxed text-gray-700">
        A CPA tem como objetivo subsidiar e orientar a gestão institucional em sua dimensão acadêmica e administrativa a fim de promover os ajustes necessários à elevação do seu padrão de desempenho e à melhoria permanente da qualidade.
      </p>

      <SectionTitle className="mt-8">Qual a função da CPA?</SectionTitle>
      <p className="text-justify leading-relaxed text-gray-700">
        São atribuições da CPA a condução dos processos internos avaliativos, a sistematização e disponibilidade das informações solicitadas pelo Ministério da Educação/INEP conforme as seguintes diretrizes: a) assegura uma análise global e integrada das dimensões, estruturas, compromisso social, atividades, finalidade e responsabilidade social da Instituição e seus cursos; b) o caráter público de todos os procedimentos, dados e resultados dos processos avaliativos; c) o respeito à identidade e à diversidade da instituição e seus cursos; d) a participação do corpo discente, docente e técnico administrativo da instituição, e da sociedade civil, por meio de suas representações (LEI 10.861).
      </p>
    </div>
  )
}

// Relatórios Tab
function RelatoriosTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Relatórios de Autoavaliação Institucional</SectionTitle>
      <p className="italic text-center text-gray-600 py-8">
        (Em breve, os relatórios serão disponibilizados aqui.)
      </p>

      <SectionTitle className="mt-8">Relato Institucional</SectionTitle>
      <p className="italic text-center text-gray-600 py-8">
        (Em breve, os relatos institucionais serão disponibilizados aqui.)
      </p>

      <SectionTitle className="mt-8">Projeto de Autoavaliação</SectionTitle>
      <p className="italic text-center text-gray-600 py-8">
        (Em breve, o projeto de autoavaliação será disponibilizado aqui.)
      </p>
    </div>
  )
}

// Agenda Tab
function AgendaTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Agenda</SectionTitle>
      <p className="italic text-center text-gray-600 py-8">
        (Em breve, a agenda de atividades da CPA será disponibilizada aqui.)
      </p>
    </div>
  )
}

// Notícias Tab
function NoticiasTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Notícias</SectionTitle>
      <p className="italic text-center text-gray-600 py-8">
        (Em breve, as notícias relacionadas à CPA serão disponibilizadas aqui.)
      </p>
    </div>
  )
}

// Contato Tab
function ContatoTab() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      cpf: formData.get('cpf'),
      telefone: formData.get('telefone'),
      mensagem: formData.get('mensagem'),
      destinatario: 'cpa@fafih.edu.br'
    }

    try {
      const response = await fetch('/api/enviar-mensagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="space-y-6 text-center py-12">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <SectionTitle>Mensagem Enviada com Sucesso!</SectionTitle>
        <p className="leading-relaxed text-gray-700">
          Sua mensagem foi enviada para a Comissão Própria de Avaliação (CPA).
          Entraremos em contato em breve.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-primary text-white py-3 px-8 rounded-lg font-bold hover:bg-secondary transition-colors"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <FormTitle>Contato</FormTitle>
      <p className="leading-relaxed text-gray-700 mb-6">
        Utilize o formulário abaixo para enviar suas dúvidas, sugestões ou outras manifestações para a Comissão Própria de Avaliação.
      </p>

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          Erro ao enviar mensagem. Por favor, tente novamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cpa-nome" className="block mb-2 font-bold text-gray-700">
            Nome Completo
          </label>
          <input
            type="text"
            id="cpa-nome"
            name="nome"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="cpa-cpf" className="block mb-2 font-bold text-gray-700">
            CPF
          </label>
          <input
            type="text"
            id="cpa-cpf"
            name="cpf"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="cpa-email" className="block mb-2 font-bold text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="cpa-email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="cpa-telefone" className="block mb-2 font-bold text-gray-700">
            Telefone
          </label>
          <input
            type="tel"
            id="cpa-telefone"
            name="telefone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="cpa-mensagem" className="block mb-2 font-bold text-gray-700">
            Mensagem
          </label>
          <textarea
            id="cpa-mensagem"
            name="mensagem"
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
          />
        </div>

        <div className="flex items-start gap-3 mt-6">
          <input
            type="checkbox"
            id="cpa-privacy"
            name="privacy"
            required
            className="mt-1"
          />
          <label htmlFor="cpa-privacy" className="text-sm text-gray-600">
            Li e aceito a{' '}
            <a href="/politica-privacidade" target="_blank" className="text-secondary font-bold hover:underline">
              Política de Privacidade da FAFIH
            </a>
            . Estou ciente de que as informações e dados pessoais aqui compartilhados serão utilizados pela FAFIH exclusivamente para resolução da solicitação feita, de acordo com a Política de Privacidade.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-secondary transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}

// Legislação Tab
function LegislacaoTab() {
  const documentos = [
    {
      titulo: 'Lei Nº 10.861, de 14 de abril de 2004',
      descricao: 'Institui o Sistema Nacional de Avaliação da Educação Superior, SINAES e dá outras Providências.',
      link: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.861.htm',
    },
    {
      titulo: 'Lei Nº 9.394, de 20 de dezembro de 1996',
      descricao: 'Estabelece as Diretrizes e bases da Educação Nacional.',
      link: 'https://www.planalto.gov.br/ccivil_03/leis/l9394.htm',
    },
    {
      titulo: 'Instrumento de Avaliação de Cursos de Graduação Presencial e a Distância',
      descricao: 'Documento que regulamenta a avaliação de reconhecimento e renovação de reconhecimento dos cursos de graduação (bacharelado, licenciatura, tecnólogo) pelo Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep).',
      link: 'https://download.inep.gov.br/educacao_superior/avaliacao_cursos_graduacao/instrumentos/2017/curso_reconhecimento.pdf',
    },
    {
      titulo: 'Instrumento de Avaliação Institucional Externa Presencial e a Distância',
      descricao: 'Documento que regulamenta a avaliação de recredenciamento e transformação de organização acadêmica pelo Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep).',
      link: 'https://download.inep.gov.br/educacao_superior/avaliacao_institucional/instrumentos/2017/IES_recredenciamento.pdf',
    },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle>Legislação</SectionTitle>
      <div className="space-y-4">
        {documentos.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg flex-wrap"
          >
            <div className="flex-1">
              <p className="font-bold text-gray-800 mb-1">{doc.titulo}</p>
              <p className="text-sm text-gray-600">{doc.descricao}</p>
            </div>
            <a
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary transition-colors whitespace-nowrap"
            >
              Acessar
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

// Depoimentos Tab
function DepoimentosTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Depoimentos</SectionTitle>
      <p className="italic text-center text-gray-600 py-8">
        (Em breve, depoimentos sobre o processo de avaliação serão disponibilizados aqui.)
      </p>
    </div>
  )
}
