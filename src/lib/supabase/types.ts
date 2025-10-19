export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      categorias_trabalhos: {
        Row: {
          cor: string | null
          created_at: string | null
          icone: string | null
          id: string
          nome: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          icone?: string | null
          id?: string
          nome: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          icone?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      curso_professores: {
        Row: {
          created_at: string | null
          curso_id: string
          id: string
          papel: string | null
          professor_id: string
        }
        Insert: {
          created_at?: string | null
          curso_id: string
          id?: string
          papel?: string | null
          professor_id: string
        }
        Update: {
          created_at?: string | null
          curso_id?: string
          id?: string
          papel?: string | null
          professor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curso_professores_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_professores_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_professores_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "curso_professores_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "curso_professores_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["coordenador_id"]
          },
          {
            foreignKeyName: "curso_professores_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_professores_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["professor_id"]
          },
        ]
      }
      curso_curriculum: {
        Row: {
          bibliography: Json | null
          created_at: string | null
          curso_id: string
          ementa: string | null
          hours: string | null
          id: string
          number: number
          objetivos: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          bibliography?: Json | null
          created_at?: string | null
          curso_id: string
          ementa?: string | null
          hours?: string | null
          id?: string
          number: number
          objetivos?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          bibliography?: Json | null
          created_at?: string | null
          curso_id?: string
          ementa?: string | null
          hours?: string | null
          id?: string
          number?: number
          objetivos?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curso_curriculum_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_curriculum_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_curriculum_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "curso_curriculum_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
        ]
      }
      curso_highlights: {
        Row: {
          bg_color: string | null
          created_at: string | null
          curso_id: string
          description: string
          icon: string
          icon_color: string | null
          id: string
          ordem: number
          title: string
          updated_at: string | null
        }
        Insert: {
          bg_color?: string | null
          created_at?: string | null
          curso_id: string
          description: string
          icon: string
          icon_color?: string | null
          id?: string
          ordem?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          bg_color?: string | null
          created_at?: string | null
          curso_id?: string
          description?: string
          icon?: string
          icon_color?: string | null
          id?: string
          ordem?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curso_highlights_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_highlights_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_highlights_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "curso_highlights_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
        ]
      }
      cursos: {
        Row: {
          additional_info: Json | null
          category: string | null
          category_label: string | null
          certificate: string | null
          coordenador_id: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          full_description: Json | null
          id: string
          image: string | null
          image_url: string | null
          investment_details: Json | null
          justificativa: Json | null
          max_students: string | null
          modalidade: string | null
          monthly_price: string | null
          objetivos: Json | null
          original_price: number | null
          preco_matricula: number | null
          price: number | null
          publico: Json | null
          slug: string
          start_date: string | null
          subtitle: string | null
          title: string
          updated_at: string | null
          video_url: string | null
          workload: string | null
        }
        Insert: {
          additional_info?: Json | null
          category?: string | null
          category_label?: string | null
          certificate?: string | null
          coordenador_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          full_description?: Json | null
          id?: string
          image?: string | null
          image_url?: string | null
          investment_details?: Json | null
          justificativa?: Json | null
          max_students?: string | null
          modalidade?: string | null
          monthly_price?: string | null
          objetivos?: Json | null
          original_price?: number | null
          preco_matricula?: number | null
          price?: number | null
          publico?: Json | null
          slug: string
          start_date?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          workload?: string | null
        }
        Update: {
          additional_info?: Json | null
          category?: string | null
          category_label?: string | null
          certificate?: string | null
          coordenador_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          full_description?: Json | null
          id?: string
          image?: string | null
          image_url?: string | null
          investment_details?: Json | null
          justificativa?: Json | null
          max_students?: string | null
          modalidade?: string | null
          monthly_price?: string | null
          objetivos?: Json | null
          original_price?: number | null
          preco_matricula?: number | null
          price?: number | null
          publico?: Json | null
          slug?: string
          start_date?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          workload?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cursos_coordenador_id_fkey"
            columns: ["coordenador_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["coordenador_id"]
          },
          {
            foreignKeyName: "cursos_coordenador_id_fkey"
            columns: ["coordenador_id"]
            isOneToOne: false
            referencedRelation: "professores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cursos_coordenador_id_fkey"
            columns: ["coordenador_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["professor_id"]
          },
        ]
      }
      depoimentos: {
        Row: {
          author: string
          created_at: string | null
          curso_relacionado_id: string | null
          destaque: boolean | null
          foto: string | null
          id: string
          quote: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          curso_relacionado_id?: string | null
          destaque?: boolean | null
          foto?: string | null
          id?: string
          quote: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          curso_relacionado_id?: string | null
          destaque?: boolean | null
          foto?: string | null
          id?: string
          quote?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "depoimentos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "depoimentos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "depoimentos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "depoimentos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
        ]
      }
      eventos: {
        Row: {
          created_at: string | null
          curso_relacionado_id: string | null
          data_evento: string
          descricao_evento: string | null
          hora_evento: string | null
          id: string
          local_evento: string | null
          observacao_evento: string | null
          polo_relacionado_id: string | null
          tipo_evento: string | null
          titulo_evento: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          curso_relacionado_id?: string | null
          data_evento: string
          descricao_evento?: string | null
          hora_evento?: string | null
          id?: string
          local_evento?: string | null
          observacao_evento?: string | null
          polo_relacionado_id?: string | null
          tipo_evento?: string | null
          titulo_evento: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          curso_relacionado_id?: string | null
          data_evento?: string
          descricao_evento?: string | null
          hora_evento?: string | null
          id?: string
          local_evento?: string | null
          observacao_evento?: string | null
          polo_relacionado_id?: string | null
          tipo_evento?: string | null
          titulo_evento?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eventos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "eventos_curso_relacionado_id_fkey"
            columns: ["curso_relacionado_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "eventos_polo_relacionado_id_fkey"
            columns: ["polo_relacionado_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["polo_id"]
          },
          {
            foreignKeyName: "eventos_polo_relacionado_id_fkey"
            columns: ["polo_relacionado_id"]
            isOneToOne: false
            referencedRelation: "polos"
            referencedColumns: ["id"]
          },
        ]
      }
      polo_cursos: {
        Row: {
          created_at: string | null
          curso_id: string
          id: string
          polo_id: string
        }
        Insert: {
          created_at?: string | null
          curso_id: string
          id?: string
          polo_id: string
        }
        Update: {
          created_at?: string | null
          curso_id?: string
          id?: string
          polo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "polo_cursos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "polo_cursos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "polo_cursos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "polo_cursos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "polo_cursos_polo_id_fkey"
            columns: ["polo_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["polo_id"]
          },
          {
            foreignKeyName: "polo_cursos_polo_id_fkey"
            columns: ["polo_id"]
            isOneToOne: false
            referencedRelation: "polos"
            referencedColumns: ["id"]
          },
        ]
      }
      polos: {
        Row: {
          address: string | null
          coordinator: string | null
          created_at: string | null
          email: string | null
          id: string
          map_url: string | null
          name: string
          phone: string | null
          polo_id: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          coordinator?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          map_url?: string | null
          name: string
          phone?: string | null
          polo_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          coordinator?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          map_url?: string | null
          name?: string
          phone?: string | null
          polo_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author: string | null
          author_info: Json | null
          content: string | null
          created_at: string | null
          date: string
          excerpt: string | null
          id: string
          image: string | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          author_info?: Json | null
          content?: string | null
          created_at?: string | null
          date: string
          excerpt?: string | null
          id?: string
          image?: string | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          author_info?: Json | null
          content?: string | null
          created_at?: string | null
          date?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      professores: {
        Row: {
          created_at: string | null
          descricao: string | null
          email: string | null
          foto: string | null
          id: string
          nome: string
          telefone: string | null
          titulacao: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          email?: string | null
          foto?: string | null
          id?: string
          nome: string
          telefone?: string | null
          titulacao?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          email?: string | null
          foto?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          titulacao?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trabalho_categorias: {
        Row: {
          categoria_id: string
          created_at: string | null
          id: string
          trabalho_id: string
        }
        Insert: {
          categoria_id: string
          created_at?: string | null
          id?: string
          trabalho_id: string
        }
        Update: {
          categoria_id?: string
          created_at?: string | null
          id?: string
          trabalho_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trabalho_categorias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_trabalhos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trabalho_categorias_trabalho_id_fkey"
            columns: ["trabalho_id"]
            isOneToOne: false
            referencedRelation: "trabalhos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trabalho_categorias_trabalho_id_fkey"
            columns: ["trabalho_id"]
            isOneToOne: false
            referencedRelation: "trabalhos_com_categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trabalho_categorias_trabalho_id_fkey"
            columns: ["trabalho_id"]
            isOneToOne: false
            referencedRelation: "trabalhos_mais_acessados"
            referencedColumns: ["id"]
          },
        ]
      }
      trabalhos: {
        Row: {
          autor: string
          baixados: number | null
          created_at: string | null
          data_publicacao: string | null
          id: string
          link: string | null
          nota: number | null
          resumo: string | null
          slug: string
          titulo: string
          updated_at: string | null
          visitantes: number | null
        }
        Insert: {
          autor: string
          baixados?: number | null
          created_at?: string | null
          data_publicacao?: string | null
          id?: string
          link?: string | null
          nota?: number | null
          resumo?: string | null
          slug: string
          titulo: string
          updated_at?: string | null
          visitantes?: number | null
        }
        Update: {
          autor?: string
          baixados?: number | null
          created_at?: string | null
          data_publicacao?: string | null
          id?: string
          link?: string | null
          nota?: number | null
          resumo?: string | null
          slug?: string
          titulo?: string
          updated_at?: string | null
          visitantes?: number | null
        }
        Relationships: []
      }
      turmas: {
        Row: {
          created_at: string | null
          curso_id: string
          data_inicio: string | null
          data_termino: string | null
          horario: string | null
          id: string
          nome: string
          polo_id: string
          status: string | null
          updated_at: string | null
          vagas_ocupadas: number | null
          vagas_totais: number | null
        }
        Insert: {
          created_at?: string | null
          curso_id: string
          data_inicio?: string | null
          data_termino?: string | null
          horario?: string | null
          id?: string
          nome: string
          polo_id: string
          status?: string | null
          updated_at?: string | null
          vagas_ocupadas?: number | null
          vagas_totais?: number | null
        }
        Update: {
          created_at?: string | null
          curso_id?: string
          data_inicio?: string | null
          data_termino?: string | null
          horario?: string | null
          id?: string
          nome?: string
          polo_id?: string
          status?: string | null
          updated_at?: string | null
          vagas_ocupadas?: number | null
          vagas_totais?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "turmas_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turmas_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_com_coordenador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turmas_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "turmas_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "professores_por_curso"
            referencedColumns: ["curso_id"]
          },
          {
            foreignKeyName: "turmas_polo_id_fkey"
            columns: ["polo_id"]
            isOneToOne: false
            referencedRelation: "cursos_por_polo"
            referencedColumns: ["polo_id"]
          },
          {
            foreignKeyName: "turmas_polo_id_fkey"
            columns: ["polo_id"]
            isOneToOne: false
            referencedRelation: "polos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      cursos_com_coordenador: {
        Row: {
          category: string | null
          category_label: string | null
          coordenador_email: string | null
          coordenador_foto: string | null
          coordenador_id: string | null
          coordenador_nome: string | null
          coordenador_telefone: string | null
          coordenador_titulacao: string | null
          description: string | null
          duration: string | null
          id: string | null
          image: string | null
          modalidade: string | null
          original_price: number | null
          price: number | null
          slug: string | null
          subtitle: string | null
          title: string | null
          workload: string | null
        }
        Relationships: []
      }
      cursos_por_polo: {
        Row: {
          curso_id: string | null
          curso_nome: string | null
          curso_slug: string | null
          duration: string | null
          modalidade: string | null
          polo_coordenador: string | null
          polo_email: string | null
          polo_endereco: string | null
          polo_id: string | null
          polo_nome: string | null
          polo_slug: string | null
          polo_telefone: string | null
          price: number | null
        }
        Relationships: []
      }
      depoimentos_destaque: {
        Row: {
          author: string | null
          curso_nome: string | null
          curso_slug: string | null
          foto: string | null
          id: string | null
          quote: string | null
          role: string | null
        }
        Relationships: []
      }
      estatisticas_gerais: {
        Row: {
          total_cursos: number | null
          total_eventos_futuros: number | null
          total_polos: number | null
          total_posts_publicados: number | null
          total_professores: number | null
          total_trabalhos: number | null
          total_turmas_ativas: number | null
        }
        Relationships: []
      }
      eventos_futuros: {
        Row: {
          curso_nome: string | null
          curso_slug: string | null
          data_evento: string | null
          descricao_evento: string | null
          hora_evento: string | null
          id: string | null
          local_evento: string | null
          observacao_evento: string | null
          polo_nome: string | null
          polo_slug: string | null
          tipo_evento: string | null
          titulo_evento: string | null
        }
        Relationships: []
      }
      posts_publicados: {
        Row: {
          author: string | null
          author_info: Json | null
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: string | null
          image: string | null
          slug: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          author_info?: Json | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string | null
          image?: string | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          author_info?: Json | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string | null
          image?: string | null
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
      professores_por_curso: {
        Row: {
          curso_id: string | null
          curso_nome: string | null
          curso_slug: string | null
          professor_email: string | null
          professor_foto: string | null
          professor_id: string | null
          professor_nome: string | null
          professor_papel: string | null
          professor_titulacao: string | null
        }
        Relationships: []
      }
      trabalhos_com_categorias: {
        Row: {
          autor: string | null
          baixados: number | null
          categorias: string[] | null
          categorias_cores: string[] | null
          categorias_icones: string[] | null
          data_publicacao: string | null
          id: string | null
          link: string | null
          nota: number | null
          resumo: string | null
          slug: string | null
          titulo: string | null
          visitantes: number | null
        }
        Relationships: []
      }
      trabalhos_mais_acessados: {
        Row: {
          autor: string | null
          baixados: number | null
          categorias: string[] | null
          id: string | null
          nota: number | null
          resumo: string | null
          slug: string | null
          titulo: string | null
          visitantes: number | null
        }
        Relationships: []
      }
      turmas_ativas: {
        Row: {
          curso_nome: string | null
          curso_slug: string | null
          data_inicio: string | null
          data_termino: string | null
          horario: string | null
          id: string | null
          polo_nome: string | null
          polo_slug: string | null
          status: string | null
          turma_nome: string | null
          vagas_disponiveis: number | null
          vagas_ocupadas: number | null
          vagas_totais: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      buscar_cursos_por_polo: {
        Args: { polo_slug: string }
        Returns: {
          curso_id: string
          curso_nome: string
          curso_slug: string
          modalidade: string
          polo_nome: string
        }[]
      }
      buscar_professores_curso: {
        Args: { curso_slug: string }
        Returns: {
          email: string
          foto: string
          nome: string
          papel: string
          professor_id: string
          titulacao: string
        }[]
      }
      buscar_trabalhos_por_categoria: {
        Args: { categoria_nome: string }
        Returns: {
          autor: string
          baixados: number
          resumo: string
          slug: string
          titulo: string
          trabalho_id: string
          visitantes: number
        }[]
      }
      estatisticas_curso: {
        Args: { curso_uuid: string }
        Returns: {
          total_depoimentos: number
          total_polos: number
          total_professores: number
          total_turmas_ativas: number
        }[]
      }
      increment_trabalho_baixados: {
        Args: { trabalho_uuid: string }
        Returns: undefined
      }
      increment_trabalho_visitantes: {
        Args: { trabalho_uuid: string }
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_editor_or_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      turma_tem_vagas: {
        Args: { turma_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
