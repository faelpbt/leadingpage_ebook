import { Stars } from "./Stars"

function BookMockup() {
  return (
    <div className="animate-float-slow relative w-52 h-72 md:w-64 md:h-88 mx-auto select-none" aria-hidden>
      {/* Shadow */}
      <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/30 rounded-full blur-xl" />
      {/* Back cover */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-[#03291f] shadow-2xl" />
      {/* Front cover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#064e3b] to-[#03291f] shadow-2xl overflow-hidden flex flex-col items-center justify-between p-6">
        {/* Spine accent */}
        <div className="absolute left-0 inset-y-0 w-3 bg-[#dc2626]" />
        {/* Top badge */}
        <div className="bg-[#dc2626] text-white text-xs font-mono px-3 py-1 rounded-full self-end">
          E-BOOK DIGITAL
        </div>
        {/* Guarana illustration placeholder */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl">🌿</div>
          <div className="text-6xl">⚡</div>
        </div>
        {/* Title */}
        <div className="text-center">
          <p className="font-[family-name:var(--font-display)] text-white text-2xl leading-tight tracking-wide">
            GUARANÁ<br />DA AMAZÔNIA
          </p>
          <div className="w-16 h-0.5 bg-[#dc2626] mx-auto my-2" />
          <p className="font-[family-name:var(--font-mono)] text-[#dc2626] text-sm tracking-widest">
            50 RECEITAS
          </p>
        </div>
      </div>
    </div>
  )
}

export function Banner() {
    return (
        <section className="relative bg-[url('/img/banner.jpeg')] bg-no-repeat bg-contain bg-right text-green-900 overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-r from-white/100 via-white/100 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-[#dc2626] text-white text-xs font-[family-name:var(--font-mono)] font-bold tracking-widest px-3 py-1 rounded-full mb-6">
              NOVO E-BOOK DIGITAL
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold md:text-8xl leading-none mb-4">
              GUARANÁ<br />
              <span className="text-[#dc2626]">DA AMAZÔNIA</span><br />
              50 RECEITAS
            </h1>
            <p className="text-lg md:text-xl text-green-800 mb-8 max-w-lg leading-relaxed">
              Descubra o poder do <strong className="italic md:text-2xl">guaraná nativo</strong> com 50 receitas exclusivas:
              energéticas naturais, smoothies, sobremesas e muito mais.
            </p>
            {/* Stars */}
            <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
              <Stars />
              <span className="text-green-700 text-sm">4.9/5 — 3.847 leitores satisfeitos</span>
            </div>
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#comprar"
                className="bg-[#dc2626] hover:bg-[#991b1b] text-white font-bold text-lg md:text-xl px-8 py-4 rounded-full shadow-lg transition-colors inline-block text-center"
              >
                Quero meu e-book agora →
              </a>
              <div className="text-center sm:text-left">
                <p className="text-green-700 text-sm">De <s>R$ 59,90</s></p>
                <p className="text-green-900 font-bold text-2xl">R$ 29,90</p>
              </div>
            </div>
            <p className="mt-4 text-green-700 text-xs">🔒 Compra 100% segura · 7 dias de garantia</p>
          </div>
          {/* Book Mockup */}
          <div className="flex-shrink-0">
            <BookMockup />
          </div>
        </div>
      </section>
    )
}