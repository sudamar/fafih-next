'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'

export default function NotFound() {
  const router = useRouter()

  return (
    <AppShell>
      <div className="w-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 md:py-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 bg-blue-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-20 h-20 bg-purple-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="z-10 w-full max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Student Searching Animation - Versão Minimalista */}
            <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 -mt-[60px]">
              {/* Head Only - Simplified */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  x: [-4, 4, -4],
                  y: [-2, 2, -2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full border-2 border-gray-800 relative">
                    {/* Eyes */}
                    <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full" />
                    <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full" />
                    {/* Mouth (confused) */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-800 rounded-full" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Magnifying Glass - Simplified */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  x: [8, 16, 8, 4, 12, 8],
                  y: [8, 12, 16, 10, 14, 8],
                  rotate: [0, 30, 60, 30, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" strokeWidth={2.5} />
              </motion.div>

              {/* Question Marks - Simplified */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs lg:text-sm font-bold text-gray-400"
                  style={{
                    left: `${25 + i * 25}%`,
                    top: `${15 + (i % 2) * 30}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    y: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ?
                </motion.div>
              ))}
            </div>

            {/* Conteúdo de texto ao lado */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
              {/* 404 Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] via-[#0000FF] via-[#008000] via-[#FFFF00] via-[#FFA500] to-[#FF0000] mb-2">
                  404
                </h1>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Página Não Encontrada</h2>
                <p className="text-sm text-gray-600 max-w-lg">
                  Nosso sistema procurou em todos os lugares, mas não conseguiu encontrar a página que você está
                  buscando.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-2 mb-3"
              >
                <Button
                  size="sm"
                  onClick={() => router.push('/')}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 text-xs"
                >
                  <Home className="w-3 h-3 mr-1.5" />
                  Voltar para Home
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-4 py-2 text-xs"
                >
                  Voltar
                </Button>
              </motion.div>

              {/* Helpful Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-[10px] text-gray-500">
                  Precisa de ajuda? Entre em contato com o suporte ou visite nossa página de ajuda.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
