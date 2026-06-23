'use client'

import { useState, useEffect } from 'react'
import { Stars } from './components/Stars'

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
  { name: 'Sandra de Salvador', city: 'Salvador' },
  { name: 'Cleiton de Manaus', city: 'Manaus' },
  { name: 'Rubens de Recife', city: 'Recife' },
  { name: 'Maria de Fortaleza', city: 'Fortaleza' },
  { name: 'João de Belém', city: 'Belém' },
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
      <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Compra recente</p>
        <p className="text-sm font-bold text-gray-800">{msg.name}</p>
        <p className="text-xs text-gray-500">comprou agora o E-book</p>
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
        className="w-full text-left py-4 px-2 flex justify-between items-center font-semibold text-gray-800 hover:text-[#1a3d2b] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {q}
        <span className="ml-4 text-2xl leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="pb-4 px-2 text-gray-600 leading-relaxed">{a}</p>}
    </div>
  )
}

// --- BOOK MOCKUP HERO ---
function BookMockupHero() {
  return (
    <div className="relative mx-auto" style={{ width: 260, height: 340 }}>
      {/* Shadow */}
      <div className="absolute -bottom-6 left-8 right-8 h-8 bg-black/20 rounded-full blur-2xl" />
      {/* Back pages effect */}
      <div className="absolute inset-0 translate-x-4 translate-y-2 rounded-lg bg-gray-200 shadow-xl" style={{ zIndex: 0 }} />
      <div className="absolute inset-0 translate-x-2 translate-y-1 rounded-lg bg-gray-100 shadow-xl" style={{ zIndex: 1 }} />
      {/* Front cover */}
      <div className="absolute inset-0 rounded-lg bg-white shadow-2xl overflow-hidden flex flex-col" style={{ zIndex: 2 }}>
        {/* Spine */}
        <div className="absolute left-0 inset-y-0 w-2 bg-[#c0392b]" />
        {/* Cover content */}
        <div className="flex-1 flex flex-col p-5 pl-6">
          <div className="mb-3">
            <p className="font-[family-name:var(--font-display)] text-[#c0392b] text-2xl leading-tight">GUARANÁ DA</p>
            <p className="font-[family-name:var(--font-display)] text-[#c0392b] text-2xl leading-tight">AMAZÔNIA</p>
            <p className="font-[family-name:var(--font-display)] text-[#1a3d2b] text-xl leading-tight mt-1">- 50 RECEITAS</p>
          </div>
          {/* Photo grid */}
          <div className="flex-1 grid grid-cols-2 gap-1 mt-2">
            {[
              'bg-gradient-to-br from-amber-700 to-amber-900',
              'bg-gradient-to-br from-green-600 to-green-800',
              'bg-gradient-to-br from-orange-500 to-red-700',
              'bg-gradient-to-br from-yellow-600 to-amber-800',
            ].map((cls, i) => (
              <div key={i} className={`rounded ${cls} flex items-center justify-center text-white text-2xl`}>
                {['🥤', '🌿', '🍹', '☕'][i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- BOOK MOCKUP BONUS ---
function BookMockupBonus() {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 290 }}>
      <div className="absolute -bottom-4 left-6 right-6 h-6 bg-black/15 rounded-full blur-xl" />
      <div className="absolute inset-0 translate-x-3 translate-y-2 rounded-lg bg-gray-200 shadow-lg" />
      <div className="absolute inset-0 rounded-lg bg-white shadow-2xl overflow-hidden flex flex-col" style={{ zIndex: 2 }}>
        {/* Red banner ribbon */}
        <div className="absolute top-4 -left-1 bg-[#c0392b] text-white text-[9px] font-bold px-3 py-1 shadow" style={{ transform: 'rotate(-5deg)', transformOrigin: 'left' }}>
          Bonus Ebook
        </div>
        <div className="absolute left-0 inset-y-0 w-2 bg-[#c0a84d]" />
        <div className="flex-1 flex flex-col items-center justify-between p-5 pl-6">
          <div className="mt-8 text-center">
            <div className="text-amber-700 text-3xl mb-2">👑</div>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-[#c0392b] text-2xl leading-tight">O GUIA</p>
            <p className="font-[family-name:var(--font-display)] text-[#c0392b] text-2xl leading-tight">PARA</p>
            <p className="font-[family-name:var(--font-display)] text-[#c0392b] text-2xl leading-tight">VENDER</p>
          </div>
          <div className="w-full">
            <div className="h-20 bg-gradient-to-br from-orange-100 to-amber-200 rounded-lg flex items-center justify-center text-3xl">
              🌶️
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-1">Guia de Precificção Pratic</p>
        </div>
      </div>
    </div>
  )
}

// --- WHATSAPP CHAT BUBBLE ---
function WaChatBubble({ initial, name, time, msg, right = false }: { initial: string; name: string; time: string; msg: string; right?: boolean }) {
  return (
    <div className="bg-[#0d2b1e] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#1a5c3a] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {initial}
        </div>
        <span className="text-white text-sm font-semibold flex-1">{name}</span>
        <span className="text-gray-400 text-xs">{time}</span>
      </div>
      <div className={`rounded-lg px-3 py-2 text-sm inline-block max-w-full ${right ? 'bg-[#1a5c3a] text-white ml-4' : 'bg-[#1f3d2a] text-gray-100'}`}>
        {msg}
      </div>
      <div className="text-right mt-1">
        <span className="text-gray-500 text-xs">✓✓</span>
      </div>
    </div>
  )
}

// --- MAIN PAGE ---
export default function Home() {
  const countdown = useCountdown(3 * 3600 + 47 * 60 + 22)

  const faqs = [
    {
      q: 'Como recebo o e-book após a compra?',
      a: 'Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link de download. O processo leva menos de 1 minuto.',
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
      a: 'Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro.',
    },
    {
      q: 'Posso imprimir o e-book?',
      a: 'Sim, você pode imprimir o e-book para uso pessoal. A venda ou distribuição não autorizada é proibida pelos direitos autorais.',
    },
  ]

  return (
    <main className="min-h-screen" style={{ background: '#f5f0e8', fontFamily: 'var(--font-body)' }}>

      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div style={{ background: '#111', color: '#fff', textAlign: 'center', padding: '10px 16px', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>
        <span style={{ color: '#c0392b' }}>•</span> OFERTA DE HOJE &nbsp;•&nbsp; 80% OFF &nbsp;•&nbsp; ACESSO VITALÍCIO
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ background: '#f5f0e8', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)' }}>G</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: 2, color: '#1a3d2b' }}>GUARANÁ DA AMAZÔNIA</span>
        </div>
        <a href="#comprar" style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: 2, color: '#1a3d2b', textDecoration: 'none' }}>
          VER OFERTA →
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: '#f5f0e8', padding: '64px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {/* Left: text */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <p style={{ color: '#c0392b', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
              RECEITA ANCESTRAL AMAZÔNICA
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, color: '#1a3d2b', margin: 0 }}>
              O SEGREDO DO
            </h1>
            <h1 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, color: '#c0392b', fontStyle: 'italic', fontWeight: 700, margin: 0 }}>
              GUARANÁ
            </h1>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, color: '#1a3d2b', marginTop: 0, marginBottom: 24 }}>
              PERFEITO
            </h1>
            <p style={{ color: '#444', fontSize: 17, lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
              Aprenda a preparar <strong>50 variações lucrativas</strong> do autêntico Guaraná da Amazônia. Energia pura, sabor inigualável e uma nova fonte de renda na sua cozinha.
            </p>
            <a
              href="#comprar"
              style={{ display: 'inline-block', background: '#1a3d2b', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 2, padding: '18px 40px', borderRadius: 6, textDecoration: 'none', marginBottom: 28 }}
            >
              QUERO O E-BOOK AGORA
            </a>
            {/* Social proof avatars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {['#ccc', '#bbb', '#c0392b'].map((c, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: '2px solid #f5f0e8', marginLeft: i > 0 ? -10 : 0 }} />
                ))}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#1a3d2b', margin: 0, lineHeight: 1 }}>+57,3 MIL</p>
                <p style={{ fontSize: 11, letterSpacing: 2, color: '#888', margin: 0, fontFamily: 'var(--font-mono)' }}>CÓPIAS VENDIDAS</p>
              </div>
            </div>
          </div>

          {/* Right: book + background */}
          <div style={{ flex: 1, minWidth: 280, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 380 }}>
            {/* Background blur circles simulating fruit photo */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(120,40,20,0.18) 0%, rgba(30,80,40,0.10) 60%, transparent 100%)', borderRadius: 24 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <BookMockupHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <div style={{ background: '#1a3d2b', padding: '16px 32px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        {['ACESSO VITALÍCIO', '50 RECEITAS EXCLUSIVAS', 'BÔNUS GUIA DE VENDAS', 'GARANTIA 7 DIAS'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#c0392b', fontSize: 14 }}>★</span>
            <span style={{ color: '#fff', fontSize: 13, letterSpacing: 2, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* ── WHY SECTION ── */}
      <section style={{ background: '#f5f0e8', padding: '80px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: '#c0392b', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>POR QUE ESTE E-BOOK</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 58px)', color: '#1a3d2b', lineHeight: 1.1, marginBottom: 48 }}>
          A ENERGIA QUE PULSA<br />
          <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 700, color: '#c0392b' }}>NA FLORESTA </span>
          AGORA NA SUA COZINHA
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { n: '01', title: 'ENERGIA NATURAL', desc: 'Esqueça os estimulantes artificiais. O guaraná oferece uma fonte natural e sustentada de energia, liberada lentamente ao longo do dia.' },
            { n: '02', title: 'SAÚDE EM PRIMEIRO', desc: 'Beneficie-se das propriedades antioxidantes que promovem a saúde do coração, cérebro e fortalecem sua imunidade.' },
            { n: '03', title: 'RECEITAS LUCRATIVAS', desc: '50 receitas testadas e aprovadas, com baixo custo de produção e alta margem para revenda. Transforme conhecimento em renda.' },
          ].map((card) => (
            <div key={card.n} style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: '28px 24px', position: 'relative' }}>
              <p style={{ fontSize: 11, color: '#bbb', letterSpacing: 2, fontFamily: 'var(--font-mono)', marginBottom: 16 }}>{card.n} / 03</p>
              <div style={{ position: 'absolute', top: 24, right: 24, width: 10, height: 10, borderRadius: '50%', background: '#c0392b' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#1a3d2b', letterSpacing: 1, marginBottom: 10 }}>{card.title}</h3>
              <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS / SOCIAL PROOF ── */}
      <section style={{ background: '#0d2218', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Left */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ color: '#c0392b', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>APROVADO POR MILHARES</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 60px)', color: '#fff', lineHeight: 1, marginBottom: 4 }}>RESULTADOS</h2>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(40px, 5vw, 60px)', color: '#c0392b', fontStyle: 'italic', fontWeight: 700, lineHeight: 1, marginBottom: 28 }}>QUE PULSAM</h2>
            <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.8, fontStyle: 'italic', maxWidth: 380, marginBottom: 36 }}>
              &ldquo;Nunca imaginei que o segredo estava na ordem dos ingredientes. Minha energia mudou e ainda comecei a vender no bairro!&rdquo;
            </p>
            <div style={{ background: '#0d2b1e', borderRadius: 12, padding: '24px 28px', display: 'inline-block' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: '#c0392b', lineHeight: 1, margin: 0 }}>57.342</p>
              <p style={{ color: '#888', fontSize: 11, letterSpacing: 2, fontFamily: 'var(--font-mono)', margin: '4px 0 0' }}>CÓPIAS VENDIDAS E ENTREGUES NO WHATSAPP</p>
            </div>
          </div>
          {/* Right: chat bubbles */}
          <div style={{ flex: 1, minWidth: 280, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <WaChatBubble initial="J" name="Jaymison Souza" time="16:38" msg="Recebi tudo certinho! Já fiz a primeira receita hoje 🔥" />
            <WaChatBubble initial="M" name="Maria Clara" time="14:00" msg="Muito obrigada por enviar o comprovante e o e-book." right />
            <WaChatBubble initial="P" name="Pedro Henrique" time="14:33" msg="Quero te agradecer, as receitas são fáceis de fazer." />
            <WaChatBubble initial="A" name="Aline Souza" time="11:24" msg="Já estou vendendo na minha rua, valeu demais!" right />
          </div>
        </div>
      </section>

      {/* ── BONUS SECTION ── */}
      <section style={{ background: 'linear-gradient(135deg, #fdf6f0 0%, #f5ece4 100%)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Left: book */}
          <div style={{ flex: 1, minWidth: 220, display: 'flex', justifyContent: 'center' }}>
            <BookMockupBonus />
          </div>
          {/* Right: text */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <span style={{ background: '#c0392b', color: '#fff', fontSize: 11, letterSpacing: 2, fontWeight: 700, padding: '5px 14px', borderRadius: 4, fontFamily: 'var(--font-mono)', marginBottom: 20, display: 'inline-block' }}>
              🏆 BÔNUS EXCLUSIVO
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 50px)', color: '#1a3d2b', lineHeight: 1.1, marginTop: 16, marginBottom: 16 }}>
              GANHE O &ldquo;GUIA<br />
              <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 700, color: '#c0392b' }}>PARA VENDER&rdquo;</span>
            </h2>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.7, maxWidth: 420, marginBottom: 24 }}>
              Além das 50 receitas, você recebe GRÁTIS um guia prático de precificação para vender mais e melhor, sem achismo.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Aprenda a definir o preço ideal', 'Tenha mais segurança na hora de vender', 'Aumente seu lucro com estratégias práticas'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#333', fontWeight: 600, fontSize: 15 }}>
                  <span style={{ color: '#1a3d2b', fontSize: 18 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ background: '#f5f0e8', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Left: checklist */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ color: '#888', fontSize: 12, letterSpacing: 3, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>O QUE ESTÁ INCLUSO</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 50px)', color: '#1a3d2b', lineHeight: 1.1, marginBottom: 8 }}>TUDO O QUE</h2>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(32px, 4vw, 50px)', color: '#c0392b', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.1, marginBottom: 32 }}>VOCÊ VAI DOMINAR</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                '50 Receitas de Guaraná',
                'Sabores Variados de Guaraná Gourmet',
                'Passo a Passo Completo e Rápido',
                'Receitas Exclusivas e Testadas',
                'Bônus com Guia de Precificação',
                '7 Dias de Garantia Incondicional',
                'Acesso Vitalício pelo WhatsApp',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#333', fontSize: 16 }}>
                  <span style={{ color: '#1a3d2b', fontWeight: 700, fontSize: 18 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Right: food photo mockup */}
          <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #e8e0d0 0%, #d5cabb 100%)', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 80, textAlign: 'center' }}>🥤</div>
              {/* Recipe label */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, background: '#1a3d2b', borderRadius: 8, padding: '8px 16px' }}>
                <p style={{ color: '#aad4bb', fontSize: 10, letterSpacing: 2, fontFamily: 'var(--font-mono)', margin: 0 }}>RECEITA Nº 27</p>
                <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: 1, margin: 0 }}>GUARANÁ CREMOSO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING CTA ── */}
      <section id="comprar" style={{ background: '#0d2218', padding: '80px 32px', textAlign: 'center' }}>
        <p style={{ color: '#c0392b', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 16, fontFamily: 'var(--font-mono)' }}>OFERTA LIMITADA</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 70px)', color: '#fff', lineHeight: 1, marginBottom: 0 }}>COMPRAR É FÁCIL,</h2>
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(36px, 5vw, 62px)', color: '#c0392b', fontStyle: 'italic', fontWeight: 700, lineHeight: 1, marginBottom: 48 }}>PRÁTICO E 100% SEGURO</h2>

        <div style={{ maxWidth: 640, margin: '0 auto', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '48px 40px' }}>
          <p style={{ color: '#aaa', fontSize: 12, letterSpacing: 3, fontFamily: 'var(--font-mono)', marginBottom: 24 }}>E-BOOK COMPLETO + BÔNUS HOJE</p>
          <p style={{ color: '#777', fontSize: 18, textDecoration: 'line-through', marginBottom: 8 }}>De R$ 97,90</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 10vw, 100px)', color: '#c0392b', lineHeight: 1, marginBottom: 12 }}>R$ 19,90</p>
          <p style={{ color: '#aaa', fontSize: 15, marginBottom: 32 }}>Ou 4x de R$ 5,57 no cartão</p>
          <a
            href="#"
            style={{ display: 'block', background: '#c0392b', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 2, padding: '22px', borderRadius: 8, textDecoration: 'none', marginBottom: 20 }}
          >
            EU QUERO COMPRAR AGORA
          </a>
          <p style={{ color: '#666', fontSize: 11, letterSpacing: 2, fontFamily: 'var(--font-mono)', marginBottom: 24 }}>PAGAMENTO ÚNICO · ACESSO IMEDIATO E VITALÍCIO</p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['COMPRA 100% SEGURA', 'GARANTIA DE 7 DIAS', 'ENTREGA NO WHATSAPP'].map(item => (
              <span key={item} style={{ color: '#aaa', fontSize: 11, letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: '#c0392b' }}>✓</span> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section style={{ background: '#f5f0e8', padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Left: golden badge */}
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 180, height: 180 }}>
              {/* Outer gold ring */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(#d4a017, #f5c842, #d4a017, #a87c10, #d4a017)', boxShadow: '0 0 40px rgba(212,160,23,0.4)' }} />
              {/* Inner dark circle */}
              <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: '#0d2218', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 72, color: '#d4a017', lineHeight: 1 }}>7</span>
                <span style={{ color: '#d4a017', fontSize: 11, letterSpacing: 2, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>DIAS</span>
                <span style={{ color: '#888', fontSize: 10, letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>DE GARANTIA</span>
              </div>
            </div>
          </div>
          {/* Right: text */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1a3d2b', lineHeight: 1.1, marginBottom: 4 }}>SATISFAÇÃO GARANTIDA</h2>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(28px, 4vw, 44px)', color: '#c0392b', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>OU SEU DINHEIRO DE VOLTA</h2>
            <p style={{ color: '#555', fontSize: 16, lineHeight: 1.8, maxWidth: 460 }}>
              Confiamos tanto na eficácia do e-book que, caso você utilize ele durante 7 dias e não tenha resultados, devolvemos seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#f5f0e8', padding: '80px 32px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', color: '#1a3d2b', textAlign: 'center', marginBottom: 36 }}>PERGUNTAS FREQUENTES</h2>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e0d8', overflow: 'hidden' }}>
            {faqs.map(faq => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#f5f0e8', borderTop: '1px solid #e5e0d8', padding: '20px 32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ color: '#aaa', fontSize: 12, letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()} &nbsp;·&nbsp; COMPRA 100% SEGURA &nbsp;·&nbsp; CULTIVE SUA RENDA COM O GUARANÁ DA AMAZÔNIA
        </p>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/5592999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-ring"
        style={{ position: 'fixed', bottom: 24, right: 16, zIndex: 50, width: 56, height: 56, background: '#25d366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', textDecoration: 'none' }}
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" width={28} height={28} aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── TOAST ── */}
      <Toast />
    </main>
  )
}
