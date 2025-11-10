export interface LogPayload {
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

export interface GlobalLogger {
  imprimeLogGeral?: (payload: LogPayload) => void
  imprimeLog?: (payload: LogPayload) => void
}
