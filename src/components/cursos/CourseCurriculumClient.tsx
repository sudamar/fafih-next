'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/section-title';

interface CurriculumItem {
  number: number;
  title: string;
  hours: string;
  ementa: string;
  objetivos: string;
  bibliography: string[];
}

interface CourseCurriculumClientProps {
  curriculum: CurriculumItem[];
}

export default function CourseCurriculumClient({ curriculum }: CourseCurriculumClientProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  return (
    <section className="mb-12">
      <SectionTitle>Currículo do Curso</SectionTitle>

      <div className="space-y-4">
        {curriculum.map((item, index) => {
          const isOpen = openItems.includes(index);

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <div className="flex-1">
                  <span className="text-sm font-semibold text-[#667eea] mb-2 block">
                    Módulo {item.number}
                  </span>
                  <h3 className="text-lg font-bold text-[#152c61]">{item.title}</h3>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="text-sm font-medium text-[#42526b] bg-gray-100 px-3 py-1 rounded-full">
                    {item.hours}h
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#667eea] transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="p-6 pt-0 bg-gray-50 space-y-6">
                  {item.ementa && (
                    <div>
                      <h4 className="font-bold text-[#152c61] mb-2">Ementa</h4>
                      <p className="text-[#42526b] leading-relaxed">{item.ementa}</p>
                    </div>
                  )}

                  {item.objetivos && (
                    <div>
                      <h4 className="font-bold text-[#152c61] mb-2">Objetivos</h4>
                      <p className="text-[#42526b] leading-relaxed">{item.objetivos}</p>
                    </div>
                  )}

                  {item.bibliography && item.bibliography.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#152c61] mb-3">Bibliografia</h4>
                      <ul className="space-y-2">
                        {item.bibliography.map((book, idx) => (
                          <li key={idx} className="text-[#42526b] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#667eea]">
                            {book}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
