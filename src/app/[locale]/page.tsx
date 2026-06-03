import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default function LandingPage() {
  const t = useTranslations('landing');

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('heroTitle')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {t('heroHighlight')}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
          >
            {t('cta')}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t('featuresTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🐻', title: t('feature1Title'), desc: t('feature1Desc') },
              { icon: '📊', title: t('feature2Title'), desc: t('feature2Desc') },
              { icon: '🔍', title: t('feature3Title'), desc: t('feature3Desc') },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">{t('howItWorks')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', text: t('step1') },
              { step: '2', text: t('step2') },
              { step: '3', text: t('step3') },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <p className="text-slate-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t('faqTitle')}</h2>
          <div className="space-y-6">
            {[
              { q: t('faq1Q'), a: t('faq1A') },
              { q: t('faq2Q'), a: t('faq2A') },
              { q: t('faq3Q'), a: t('faq3A') },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 text-center">
        <p className="text-slate-500 text-sm">{t('socialProof')}</p>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: t('faq1Q'),
                acceptedAnswer: { '@type': 'Answer', text: t('faq1A') },
              },
              {
                '@type': 'Question',
                name: t('faq2Q'),
                acceptedAnswer: { '@type': 'Answer', text: t('faq2A') },
              },
              {
                '@type': 'Question',
                name: t('faq3Q'),
                acceptedAnswer: { '@type': 'Answer', text: t('faq3A') },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
