import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, email, cpf, telefone, mensagem, destinatario } = body

    // Validações básicas
    if (!nome || !email || !mensagem || !destinatario) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    // Validar email de destinatário
    const destinatariosPermitidos = ['cpa@fafih.edu.br', 'ouvidoria@fafih.edu.br']
    if (!destinatariosPermitidos.includes(destinatario)) {
      return NextResponse.json(
        { error: 'Destinatário inválido' },
        { status: 400 }
      )
    }

    // Aqui você implementaria o envio real do email
    // Exemplo com Resend, Nodemailer, SendGrid, etc.
    // Por enquanto, vamos simular o sucesso e usar o imprimeLog geral (se disponível)

    const logPayload = {
      from: 'site@fafih.edu.br',
      to: destinatario,
      subject: `Nova mensagem de ${nome}`,
      body: { nome, email, cpf, telefone, mensagem },
      rota: 'enviar-mensagem',
      timestamp: new Date().toISOString(),
    }

    const globalAny = globalThis as any
    if (typeof globalAny.imprimeLogGeral === 'function') {
      globalAny.imprimeLogGeral(logPayload)
    } else if (typeof globalAny.imprimeLog === 'function') {
      // caso a função tenha outro nome
      globalAny.imprimeLog(logPayload)
    } else {
      console.log('Email a ser enviado:', logPayload)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem enviada com sucesso!'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    )
  }
}
