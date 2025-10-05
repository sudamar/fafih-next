'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PageTitle } from '@/components/ui/page-title'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormTitle } from '@/components/ui/form-title'

const formSchema = z.object({
  registro: z.string().optional(),
  rg: z.string().optional(),
  cpf: z.string().optional(),
  nascimento: z.string().optional(),
  validacao: z.string().optional(),
})

export default function ConsultarDiplomaPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registro: '',
      rg: '',
      cpf: '',
      nascimento: '',
      validacao: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form data submitted:', values)
    // TODO: Implementar a lógica de busca do diploma
  }

  const handleReset = () => {
    form.reset()
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
            <FormTitle as="h2" className="mb-8 text-left">
              Busca de Diploma
            </FormTitle>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="registro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Registro</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator text="OU" />

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator text="OU" />

                <div>
                  <FormField
                    control={form.control}
                    name="validacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de Validação</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button
                    type="submit"
                    className="rounded-full px-10 py-3 font-bold shadow-md"
                    size="lg"
                  >
                    Filtrar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="rounded-full border-2 border-secondary px-10 py-3 font-bold text-secondary shadow-md hover:bg-secondary hover:text-white"
                    size="lg"
                  >
                    Nova Consulta
                  </Button>
                </div>
              </form>
            </Form>
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
