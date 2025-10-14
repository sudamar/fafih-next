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
    // Por enquanto, vamos simular o sucesso

    console.log('Email a ser enviado:', {
      from: 'site@fafih.edu.br',
      to: destinatario,
      subject: `Nova mensagem de ${nome}`,
      body: {
        nome,
        email,
        cpf,
        telefone,
        mensagem,
      }
    })

    // TODO: Implementar envio real de email
    // const result = await sendEmail({
    //   from: 'site@fafih.edu.br',
    //   to: destinatario,
    //   subject: `Nova mensagem de ${nome}`,
    //   html: `
    //     <h2>Nova mensagem recebida</h2>
    //     <p><strong>Nome:</strong> ${nome}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     ${cpf ? `<p><strong>CPF:</strong> ${cpf}</p>` : ''}
    //     ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ''}
    //     <p><strong>Mensagem:</strong></p>
    //     <p>${mensagem}</p>
    //   `
    // })

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
