'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PageTitle } from '@/components/ui/page-title'
import { CardAcentoBorda } from '@/components/ui/card-acento-borda'

// Define the form schema with Zod
const ouvidoriaFormSchema = z.object({
  identificacao: z.enum(['identificado', 'anonimo'], {
    required_error: "Por favor, selecione o tipo de identificação.",
  }),
  nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }).optional().or(z.literal('')),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }).optional().or(z.literal('')),
  telefone: z.string().optional(),
  vinculo: z.string().optional(),
  tipoManifestacao: z.string().min(1, { message: "Por favor, selecione o tipo de manifestação." }),
  assunto: z.string().min(2, { message: "O assunto deve ter pelo menos 2 caracteres." }),
  mensagem: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }),
})

export default function OuvidoriaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof ouvidoriaFormSchema>>({
    resolver: zodResolver(ouvidoriaFormSchema),
    defaultValues: {
      identificacao: 'identificado',
      nome: '',
      email: '',
      telefone: '',
      vinculo: '',
      tipoManifestacao: '',
      assunto: '',
      mensagem: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof ouvidoriaFormSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Formulário enviado:', data)
      setSubmitSuccess(true)
      form.reset()
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Watch the identificacao field to conditionally render fields
  const identificacao = form.watch('identificacao')

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
                <div className="my-4 rounded-lg bg-green-100 p-4 text-center text-green-800">
                  Sua manifestação foi enviada com sucesso! Retornaremos em até 10 dias úteis.
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="identificacao"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-medium text-gray-800">Tipo de Identificação</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-x-6 gap-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="identificado" id="identificado" />
                              <label htmlFor="identificado" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Identificado
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="anonimo" id="anonimo" />
                              <label htmlFor="anonimo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Anônimo
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {identificacao === 'identificado' && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo *</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(XX) XXXXX-XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vinculo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vínculo com a FAFIH</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione seu vínculo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="aluno">Aluno</SelectItem>
                                <SelectItem value="professor">Professor</SelectItem>
                                <SelectItem value="funcionario">Funcionário</SelectItem>
                                <SelectItem value="ex-aluno">Ex-aluno</SelectItem>
                                <SelectItem value="comunidade">Comunidade Externa</SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="tipoManifestacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Manifestação *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de manifestação" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="elogio">Elogio</SelectItem>
                            <SelectItem value="sugestao">Sugestão</SelectItem>
                            <SelectItem value="reclamacao">Reclamação</SelectItem>
                            <SelectItem value="denuncia">Denúncia</SelectItem>
                            <SelectItem value="solicitacao">Solicitação de Informação</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Informe o assunto da manifestação" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva sua manifestação com detalhes" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-primary py-3 px-6 font-bold text-white shadow-md transition hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Manifestação'}
                  </Button>
                </form>
              </Form>
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