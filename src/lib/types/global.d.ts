import type { LogPayload } from './logger.types'

declare global {
  // eslint-disable-next-line no-var
  var imprimeLogGeral: ((payload: LogPayload) => void) | undefined
  // eslint-disable-next-line no-var
  var imprimeLog: ((payload: LogPayload) => void) | undefined
}
