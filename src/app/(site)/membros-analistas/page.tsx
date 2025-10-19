import { getMembrosAnalistas } from '@/lib/services/membros-analistas'
import MembrosClient from './MembrosClient'

export default async function MembrosAnalistasPage() {
  const membros = await getMembrosAnalistas()

  return <MembrosClient membros={membros} />
}
