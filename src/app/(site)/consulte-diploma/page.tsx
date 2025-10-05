'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'

export default function ConsultarDiplomaPage() {
  const [formData, setFormData] = useState({
    registro: '',
    rg: '',
    cpf: '',
    nascimento: '',
    validacao: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form data submitted:', formData)
    // TODO: Implementar a lógica de busca do diploma
  }

  const handleReset = () => {
    setFormData({
      registro: '',
      rg: '',
      cpf: '',
      nascimento: '',
      validacao: '',
    })
  }

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <PageTitle>Consulta de Diplomas</PageTitle>

          <p className="mx-auto mb-12 max-w-4xl text-center text-lg leading-relaxed text-gray-600">
            Este é um portal público de consulta de diplomas emitidos pela FAFIH. Aqui você consulta toda a nossa
            base de diplomas emitidos e registrados de todos os níveis de ensino. Use-o para validar um diploma que
            esteja em suas mãos.
          </p>

          <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <SectionTitle as="h2" className="mb-8 text-center">
              Busca de Diploma
            </SectionTitle>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                <FormField label="Número de Registro" name="registro" value={formData.registro} onChange={handleInputChange} />
                <FormField label="RG" name="rg" value={formData.rg} onChange={handleInputChange} />
              </div>

              <Separator text="OU" />

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                <FormField label="CPF" name="cpf" value={formData.cpf} onChange={handleInputChange} />
                <FormField label="Data de Nascimento" name="nascimento" type="date" value={formData.nascimento} onChange={handleInputChange} />
              </div>

              <Separator text="OU" />

              <div>
                <FormField label="Código de Validação" name="validacao" value={formData.validacao} onChange={handleInputChange} />
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  type="submit"
                  className="rounded-full bg-primary px-10 py-3 font-bold text-white transition hover:bg-primary/90 shadow-md"
                >
                  Filtrar
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border-2 border-secondary bg-transparent px-10 py-3 font-bold text-secondary transition hover:bg-secondary hover:text-white shadow-md"
                >
                  Nova Consulta
                </button>
              </div>
            </form>
          </div>

          <p className="mt-12 text-center text-sm leading-relaxed text-gray-500">
            Este Portal de Consulta Pública de Diplomas da FAFIH foi construído de acordo com a Portaria 1095,
            emitida pelo Ministério da Educação em 25/10/18. A FAFIH propiciará a visualização da autenticidade do
            documento pelos Conselhos Profissionais, Egressos e Empregadores, tanto dos diplomados a partir da
            Portaria, quanto de toda a sua base de diplomados, proporcionando agilidade aos processos de confirmação
            de veracidade do documento e provendo transparência ao processo de Registro de Diplomas.
          </p>

          <div className="mt-12 flex justify-center">
            <a
              href="/"
              className="rounded-full border-2 border-primary bg-transparent px-10 py-3 font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              Voltar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

// Componente para os campos do formulário
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
    </div>
  )
}

// Componente para o separador "OU"
function Separator({ text }: { text: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base font-semibold text-gray-500">{text}</span>
      </div>
    </div>
  )
}
