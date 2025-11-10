import { NextResponse } from 'next/server'

interface LogPayload {
  from: string
  to: string
  subject: string
  body: {
    nome?: string
    email?: string
    cpf?: string
    telefone?: string
    mensagem?: string
  }
  rota: string
  timestamp: string
}

interface GlobalLogger {
  imprimeLogGeral?: (payload: LogPayload) => void
  imprimeLog?: (payload: LogPayload) => void
}

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

    const globalLogger = globalThis as GlobalLogger
    if (typeof globalLogger.imprimeLogGeral === 'function') {
      globalLogger.imprimeLogGeral(logPayload)
    } else if (typeof globalLogger.imprimeLog === 'function') {
      // caso a função tenha outro nome
      globalLogger.imprimeLog(logPayload)
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
