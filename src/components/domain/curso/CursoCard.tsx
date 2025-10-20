'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Route } from 'next'

// src/components/CursoCard.tsx
import type { Course } from "@/lib/features/courses/types/Course.type";

type CursoCardProps = { curso: Course };


const CursoCard = ({ curso }: CursoCardProps) => {
  const courseRoute = `/cursos/${curso.slug ?? String(curso.id)}`;

  // Trunca a descrição em 300 caracteres
  const truncateDescription = (text: string | null | undefined, maxLength: number = 380): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '(...)';
  };

  return (
    <div
      className="bg-white rounded-[15px] overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-2 max-w-[280px] mx-auto h-full"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
    >
      <div className="curso-card-img">
        <Image
          src={curso.image || '/assets/images/course-placeholder.jpg'}
          alt={curso.title}
          className="w-full h-auto block"
          width={280}
          height={160}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/images/course-placeholder.jpg';
          }}
        />
      </div>
      <div className="curso-card-content flex flex-col flex-grow p-4 sm:p-5">
        <span className="curso-card-cat inline-block bg-[#eef4f8] text-[#2C678F] py-[0.3rem] px-[0.8rem] rounded-[5px] text-[0.8rem] font-bold mb-3 self-start border border-[#d1d9e1]">
          {curso.categoryLabel}
        </span>
        <h3 className="font-sans font-bold text-[1.1rem] sm:text-[1.2rem] text-primary mb-2">
          {curso.title}
        </h3>
        <p className="curso-card-desc text-[0.85rem] sm:text-[0.9rem] text-[#555] mb-4 flex-grow leading-relaxed px-0.5">
          {truncateDescription(curso.description)}
        </p>
        <div className="curso-card-actions">
          <Link
            href={courseRoute as Route}
            className="block w-full py-[0.8rem] rounded-[8px] font-bold text-[0.9rem] text-white text-center no-underline bg-gradient-to-r from-[#6A0DAD] to-[#2C678F] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
          >
            Saiba Mais
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CursoCard
