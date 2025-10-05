'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { CardAcentoBorda } from '@/components/ui/card-acento-borda'
import { FormField } from '@/components/ui/form-field'
import { FormSelect } from '@/components/ui/form-select'
import { FormTextarea } from '@/components/ui/form-textarea'
import { RadioOption } from '@/components/ui/radio-option'

export default function OuvidoriaPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    vinculo: '',
    tipoManifestacao: '',
    assunto: '',
    mensagem: '',
    identificacao: 'identificado',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Formulário enviado:', formData)
      setSubmitSuccess(true)
      setTimeout(() => {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          vinculo: '',
          tipoManifestacao: '',
          assunto: '',
          mensagem: '',
          identificacao: 'identificado',
        })
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <PageTitle>Ouvidoria FAFIH</PageTitle>
          <p className="mt-4 text-lg text-gray-600">
            Um canal institucional direto de comunicação entre você e nossa instituição. Registre elogios, sugestões,
            reclamações ou denúncias com segurança e confidencialidade.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-8">
            <CardAcentoBorda>
              <h3 className="mb-3 font-display text-xl font-bold text-secondary">O que é a Ouvidoria?</h3>
              <p className="text-gray-600">Um órgão independente que recebe, analisa e encaminha manifestações, promovendo a melhoria contínua dos serviços da FAFIH.</p>
            </CardAcentoBorda>
            <CardAcentoBorda>
              <h3 className="mb-3 font-display text-xl font-bold text-secondary">Nossos Compromissos</h3>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>Resposta em até <strong>10 dias úteis</strong></li>
                <li>Confidencialidade e sigilo garantidos</li>
                <li>Tratamento imparcial e transparente</li>
                <li>Acompanhamento até a resolução</li>
              </ul>
            </CardAcentoBorda>
            <CardAcentoBorda>
              <h3 className="mb-3 font-display text-xl font-bold text-secondary">Como funciona</h3>
                <ul className="space-y-2 text-gray-600">
                    <li><span className="font-bold">1.</span> Você registra sua manifestação</li>
                    <li><span className="font-bold">2.</span> Analisamos e encaminhamos ao setor responsável</li>
                    <li><span className="font-bold">3.</span> Acompanhamos o tratamento até a resposta</li>
                    <li><span className="font-bold">4.</span> Retornamos com a solução apresentada</li>
                </ul>
            </CardAcentoBorda>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="font-display text-3xl font-bold text-secondary">Registre sua Manifestação</h2>
              <br />
              {submitSuccess && (
                <p className="my-4 rounded-lg bg-green-100 p-4 text-center text-green-800">
                  Sua manifestação foi enviada com sucesso! Retornaremos em até 10 dias úteis.
                </p>
              )}
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Tipo de Identificação</label>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <RadioOption name="identificacao" value="identificado" label="Identificado" checked={formData.identificacao === 'identificado'} onChange={handleInputChange} />
                    <RadioOption name="identificacao" value="anonimo" label="Anônimo" checked={formData.identificacao === 'anonimo'} onChange={handleInputChange} />
                  </div>
                </div>

                {formData.identificacao === 'identificado' && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField label="Nome Completo *" name="nome" value={formData.nome} onChange={handleInputChange} required />
                    <FormField label="E-mail *" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    <FormField label="Telefone" name="telefone" type="tel" value={formData.telefone} onChange={handleInputChange} placeholder="(XX) XXXXX-XXXX" />
                    <FormSelect label="Vínculo com a FAFIH" name="vinculo" value={formData.vinculo} onChange={handleInputChange} options={[
                      { value: 'aluno', label: 'Aluno' },
                      { value: 'professor', label: 'Professor' },
                      { value: 'funcionario', label: 'Funcionário' },
                      { value: 'ex-aluno', label: 'Ex-aluno' },
                      { value: 'comunidade', label: 'Comunidade Externa' },
                      { value: 'outro', label: 'Outro' },
                    ]} />
                  </div>
                )}

                <FormSelect label="Tipo de Manifestação *" name="tipoManifestacao" value={formData.tipoManifestacao} onChange={handleInputChange} required options={[
                  { value: 'elogio', label: 'Elogio' },
                  { value: 'sugestao', label: 'Sugestão' },
                  { value: 'reclamacao', label: 'Reclamação' },
                  { value: 'denuncia', label: 'Denúncia' },
                  { value: 'solicitacao', label: 'Solicitação de Informação' },
                ]} />
                <FormField label="Assunto *" name="assunto" value={formData.assunto} onChange={handleInputChange} required />
                <FormTextarea label="Mensagem *" name="mensagem" value={formData.mensagem} onChange={handleInputChange} rows={5} required />

                <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-primary py-3 px-6 font-bold text-white shadow-md transition hover:bg-primary/90 disabled:opacity-50">
                  {isSubmitting ? 'Enviando...' : 'Enviar Manifestação'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-white p-8 shadow-lg">
            <h3 className="text-center font-display text-2xl font-bold text-secondary">Outros Canais de Contato</h3>
            <div className="mt-6 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
                <div>
                    <h4 className="text-lg font-semibold text-primary">Telefone</h4>
                    <p className="mt-1 text-gray-600">(11) 3807-2041</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-primary">E-mail</h4>
                    <p className="mt-1 text-gray-600">ouvidoria@fafih.edu.br</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-primary">Atendimento Presencial</h4>
                    <p className="mt-1 text-gray-600">Segunda a Sexta, das 8h às 18h</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  )
}
