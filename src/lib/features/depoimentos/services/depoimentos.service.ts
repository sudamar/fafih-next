import { Depoimento } from '../types/depoimento.types'
import depoimentosData from '@/lib/data/depoimentos.json'

export class DepoimentosService {
  static getAll(): Depoimento[] {
    return depoimentosData as Depoimento[]
  }

  static getById(author: string): Depoimento | undefined {
    return depoimentosData.find((d) => d.author === author) as Depoimento | undefined
  }

  static getByRole(role: string): Depoimento[] {
    return depoimentosData.filter((d) => d.role.toLowerCase().includes(role.toLowerCase())) as Depoimento[]
  }
}
