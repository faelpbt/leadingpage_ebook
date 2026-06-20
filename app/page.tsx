'use client'

import { useState, useEffect } from 'react'

// --- COUNTDOWN HOOK ---
function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(timeLeft / 3600)
  const m = Math.floor((timeLeft % 3600) / 60)
  const s = timeLeft % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

// --- TOAST ---
const toastMessages = [
  { name: 'João', city: 'Manaus' },
  { name: 'Ana Paula', city: 'Belém' },
  { name: 'Ricardo', city: 'São Paulo' },
  { name: 'Fernanda', city: 'Fortaleza' },
  { name: 'Carlos', city: 'Curitiba' },
]

function Toast() {
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const show = () => {
      setVisible(true)
      setTimeout(() => setVisible(false), 4000)
    }
    const t1 = setTimeout(show, 3000)
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % toastMessages.length)
      show()
    }, 12000)
    return () => { clearTimeout(t1); clearInterval(interval) }
  }, [])

  const msg = toastMessages[idx]
  if (!visible) return null

  return (
    <div className="animate-toast fixed bottom-6 left-4 z-50 flex items-center gap-3 bg-white shadow-xl rounded-xl px-4 py-3 border border-gray-100 max-w-xs">
      <div className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {msg.name[0]}
      </div>
      <div>
        <p className="text-xs text-gray-500">Compra confirmada agora</p>
        <p className="text-sm font-semibold text-gray-800">
          <span className="text-[#064e3b]">{msg.name}</span> de {msg.city} acabou de comprar!
        </p>
      </div>
    </div>
  )
}

// --- FAQ ITEM ---
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left py-4 px-2 flex justify-between items-center font-semibold text-gray-800 hover:text-[#064e3b] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {q}
        <span className="ml-4 text-2xl leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="pb-4 px-2 text-gray-600 leading-relaxed">{a}</p>}
    </div>
  )
}

// --- STAR RATING ---
function Stars({ n = 5 }: { n?: number }) {
  return <span className="text-yellow-400">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

// --- BOOK MOCKUP ---
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

// --- MAIN PAGE ---
export default function Home() {
  const countdown = useCountdown(3 * 3600 + 47 * 60 + 22)

  const categories = [
    { icon: '⚡', title: 'Energéticas Naturais', desc: '12 receitas de bebidas energéticas sem conservantes' },
    { icon: '🥤', title: 'Smoothies & Vitaminas', desc: '10 smoothies nutritivos para o dia a dia' },
    { icon: '🍫', title: 'Sobremesas', desc: '8 sobremesas saudáveis com guaraná em pó' },
    { icon: '🍵', title: 'Chás & Infusões', desc: '7 infusões relaxantes e estimulantes' },
    { icon: '🏋️', title: 'Pré-Treino', desc: '8 receitas para turbinar seu desempenho' },
    { icon: '🍳', title: 'Culinária Criativa', desc: '5 receitas culinárias surpreendentes com guaraná' },
  ]

  const benefits = [
    { icon: '📱', title: 'Acesso Imediato', desc: 'Receba o e-book por e-mail em menos de 1 minuto após o pagamento.' },
    { icon: '♾️', title: 'Acesso Vitalício', desc: 'Baixe quantas vezes quiser, para sempre. Sem mensalidade.' },
    { icon: '📲', title: 'Leia em Qualquer Lugar', desc: 'Compatível com celular, tablet e computador.' },
  ]

  const testimonials = [
    {
      name: 'Ana Beatriz S.',
      city: 'Manaus, AM',
      text: 'Incrível! As receitas de pré-treino me deram uma energia que nunca tive com qualquer suplemento. O guaraná nativo é uma revolução!',
      stars: 5,
    },
    {
      name: 'Carlos M.',
      city: 'Belém, PA',
      text: 'Comprei por curiosidade e me surpreendi. As receitas são práticas, os ingredientes fáceis de achar. Já fiz 15 das 50 receitas!',
      stars: 5,
    },
    {
      name: 'Fernanda L.',
      city: 'São Paulo, SP',
      text: 'O e-book chegou na hora. As fotos são lindas e as explicações muito claras. Recomendo demais para quem quer uma vida mais saudável.',
      stars: 5,
    },
  ]

  const faqs = [
    {
      q: 'Como recebo o e-book após a compra?',
      a: 'Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link de download do e-book em formato PDF. O processo leva menos de 1 minuto.',
    },
    {
      q: 'Preciso ter conhecimento culinário para fazer as receitas?',
      a: 'Não! Todas as receitas foram desenvolvidas para qualquer nível de experiência na cozinha. As instruções são simples, com passo a passo detalhado.',
    },
    {
      q: 'Onde encontro o guaraná para as receitas?',
      a: 'O guaraná em pó pode ser encontrado em lojas de produtos naturais, supermercados e também online. No e-book, indicamos como escolher o guaraná de melhor qualidade.',
    },
    {
      q: 'Existe garantia de devolução?',
      a: 'Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você não ficar satisfeito, basta entrar em contato e devolvemos 100% do seu dinheiro.',
    },
    {
      q: 'Posso imprimir o e-book?',
      a: 'Sim, você pode imprimir o e-book para uso pessoal. Porém, a venda ou distribuição não autorizada é proibida pelos direitos autorais.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#fdfcf7]">
      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-40 bg-[#064e3b] text-white text-center py-2 px-4">
        <p className="text-sm font-semibold">
          ⚡ Oferta por tempo limitado — apenas{' '}
          <span className="font-[family-name:var(--font-mono)] bg-[#dc2626] px-2 py-0.5 rounded">
            {countdown}
          </span>{' '}
          restantes!
        </p>
      </div>

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-[#064e3b] to-[#03291f] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-[#dc2626] text-white text-xs font-[family-name:var(--font-mono)] tracking-widest px-3 py-1 rounded-full mb-6">
              NOVO E-BOOK DIGITAL
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-none mb-4">
              GUARANÁ<br />
              <span className="text-[#dc2626]">DA AMAZÔNIA</span><br />
              50 RECEITAS
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-lg leading-relaxed">
              Descubra o poder do <strong>guaraná nativo</strong> com 50 receitas exclusivas:
              energéticas naturais, smoothies, sobremesas e muito mais.
            </p>
            {/* Stars */}
            <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
              <Stars />
              <span className="text-green-200 text-sm">4.9/5 — 3.847 leitores satisfeitos</span>
            </div>
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#comprar"
                className="bg-[#dc2626] hover:bg-[#991b1b] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-colors inline-block text-center"
              >
                Quero meu e-book agora →
              </a>
              <div className="text-center sm:text-left">
                <p className="text-green-300 text-sm">De <s>R$ 59,90</s></p>
                <p className="text-white font-bold text-2xl">R$ 29,90</p>
              </div>
            </div>
            <p className="mt-4 text-green-300 text-xs">🔒 Compra 100% segura · 7 dias de garantia</p>
          </div>
          {/* Book Mockup */}
          <div className="flex-shrink-0">
            <BookMockup />
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-white border-y border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: '3.847', label: 'Leitores' },
            { n: '4.9★', label: 'Avaliação Média' },
            { n: '50', label: 'Receitas Exclusivas' },
            { n: '7 dias', label: 'Garantia Total' },
          ].map(item => (
            <div key={item.label}>
              <p className="font-[family-name:var(--font-display)] text-3xl text-[#064e3b]">{item.n}</p>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#064e3b] text-center mb-8">
          VOCÊ SE IDENTIFICA COM ISSO?
        </h2>
        <div className="space-y-4">
          {[
            '😴 Acorda cansado mesmo dormindo 8 horas?',
            '☕ Depende de café ou energéticos industriais para funcionar?',
            '🤔 Quer uma alternativa natural, mas não sabe por onde começar?',
            '💸 Gasta rios de dinheiro em suplementos sem resultado?',
          ].map(p => (
            <div key={p} className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm text-gray-700 font-medium">
              {p}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-gray-600 text-lg leading-relaxed">
          O <strong className="text-[#064e3b]">Guaraná da Amazônia</strong> é usado há séculos pelos povos indígenas
          como fonte de energia, foco e vitalidade — e agora você pode incorporar esse superalimento
          ao seu dia a dia com receitas simples e deliciosas.
        </p>
      </section>

      {/* ─── WHAT'S INSIDE ─── */}
      <section className="bg-[#064e3b] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-white text-center mb-3">
            O QUE ESTÁ DENTRO DO E-BOOK
          </h2>
          <p className="text-green-200 text-center mb-10">6 categorias · 50 receitas · 120 páginas de conteúdo rico</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(cat => (
              <div key={cat.title} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{cat.title}</h3>
                <p className="text-green-200 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
          {/* Bonus */}
          <div className="mt-8 bg-[#dc2626]/20 border border-[#dc2626]/40 rounded-xl p-6 text-center">
            <p className="text-[#dc2626] font-[family-name:var(--font-mono)] text-xs tracking-widest mb-2">BÔNUS EXCLUSIVO</p>
            <p className="text-white font-bold text-xl">🎁 Guia do Guaraná Nativo</p>
            <p className="text-green-200 text-sm mt-1">Aprenda a identificar, comprar e armazenar o guaraná de qualidade. Valioso demais para ficar de fora!</p>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#064e3b] text-center mb-10">
          COMPRA SIMPLES & SEGURA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map(b => (
            <div key={b.title} className="text-center">
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="font-bold text-[#064e3b] text-lg mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#064e3b] text-center mb-10">
            O QUE ESTÃO DIZENDO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Stars n={t.stars} />
                <p className="text-gray-700 mt-3 mb-5 leading-relaxed text-sm italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUTHOR ─── */}
      <section className="py-16 px-4 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-[#064e3b] flex items-center justify-center text-white text-5xl flex-shrink-0">
          🌿
        </div>
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[#064e3b] text-xs tracking-widest mb-2">SOBRE A AUTORA</p>
          <h3 className="font-[family-name:var(--font-display)] text-3xl text-[#064e3b] mb-3">CAMILA TERRA</h3>
          <p className="text-gray-600 leading-relaxed">
            Nutricionista e pesquisadora de alimentos da Amazônia há mais de 12 anos.
            Nascida em Manaus, Camila dedicou sua carreira a estudar os superalimentos da floresta
            e torná-los acessíveis ao mundo. Com mais de 200 mil seguidores nas redes sociais,
            ela é referência em nutrição funcional com ingredientes nativos.
          </p>
        </div>
      </section>

      {/* ─── GUARANTEE ─── */}
      <section className="bg-[#064e3b] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-white mb-4">
            GARANTIA DE 7 DIAS
          </h2>
          <p className="text-green-100 leading-relaxed text-lg">
            Se por qualquer motivo você não ficar 100% satisfeito com o e-book,
            basta nos enviar um e-mail em até <strong className="text-white">7 dias</strong> e
            devolvemos <strong className="text-white">todo o seu dinheiro</strong>, sem perguntas.
            Risco zero para você.
          </p>
        </div>
      </section>

      {/* ─── PRICING CTA ─── */}
      <section id="comprar" className="py-20 px-4">
        <div className="max-w-lg mx-auto text-center">
          <span className="inline-block bg-[#dc2626]/10 text-[#dc2626] font-[family-name:var(--font-mono)] text-xs tracking-widest px-3 py-1 rounded-full mb-6">
            ACESSO IMEDIATO
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#064e3b] mb-6">
            COMECE HOJE MESMO
          </h2>
          {/* Price box */}
          <div className="bg-white border-2 border-[#064e3b] rounded-3xl p-8 shadow-xl mb-6">
            <p className="text-gray-400 text-sm line-through mb-1">De R$ 59,90</p>
            <div className="mb-4">
              <span className="font-[family-name:var(--font-display)] text-6xl text-[#064e3b]">R$ 29,90</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">Pagamento único · Acesso vitalício</p>
            {/* Includes */}
            <ul className="text-left text-sm text-gray-700 space-y-2 mb-8">
              {[
                '✅ E-book "Guaraná da Amazônia — 50 Receitas" (PDF)',
                '✅ Bônus: Guia do Guaraná Nativo',
                '✅ Acesso imediato por e-mail',
                '✅ Leitura em qualquer dispositivo',
                '✅ Garantia de 7 dias',
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href="https://pay.example.com/guarana-ebook"
              className="block w-full bg-[#dc2626] hover:bg-[#991b1b] text-white font-bold text-xl py-5 rounded-full shadow-lg transition-colors"
            >
              COMPRAR AGORA — R$ 29,90
            </a>
            <p className="mt-4 text-gray-400 text-xs">🔒 Pagamento seguro via Pix, Cartão ou Boleto</p>
          </div>
          {/* Countdown urgency */}
          <p className="text-[#dc2626] font-semibold text-sm">
            ⏰ Oferta expira em:{' '}
            <span className="font-[family-name:var(--font-mono)] bg-[#dc2626] text-white px-2 py-0.5 rounded">
              {countdown}
            </span>
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[#064e3b] text-center mb-8">
            PERGUNTAS FREQUENTES
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {faqs.map(faq => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#03291f] text-green-300 text-center py-8 px-4 text-sm">
        <p className="font-[family-name:var(--font-display)] text-xl text-white mb-2">GUARANÁ DA AMAZÔNIA</p>
        <p className="mb-2">© {new Date().getFullYear()} Camila Terra · Todos os direitos reservados</p>
        <p className="text-green-500 text-xs">contato@guaranaebook.com.br · Política de Privacidade · Termos de Uso</p>
      </footer>

      {/* ─── FLOATING WHATSAPP ─── */}
      <a
        href="https://wa.me/5592999999999?text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20e-book%20Guaran%C3%A1"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-ring fixed bottom-6 right-4 z-50 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1da851] transition-colors"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ─── TOAST ─── */}
      <Toast />
    </main>
  )
}
