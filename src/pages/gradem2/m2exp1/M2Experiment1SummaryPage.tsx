import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-summary.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปแนวคิดสำคัญ', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', badge: 'PISA 1 · อธิบายปรากฏการณ์',
    solubilityTitle: 'สภาพละลายได้', solubility: 'ตัวละลายที่ละลายได้มากที่สุด\nในน้ำ 100 g ที่อุณหภูมิหนึ่ง',
    temperatureTitle: 'อุณหภูมิมีผล', temperature: 'น้ำร้อนละลายน้ำตาลได้มากกว่า\n น้ำเย็น (190 → 360 g)',
    substanceTitle: 'ชนิดสารก็มีผล', substance: 'เส้นน้ำตาลชันขึ้นมาก\nเส้นเกลือเกือบราบ (36 → 38 g)',
    stirringTitle: 'เร็ว ≠ มาก', stirring: 'การคนทำให้ละลายเร็วขึ้น\nแต่ไม่ทำให้ละลายได้มากขึ้น', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan Idea Utama', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', badge: 'PISA 1 · Menjelaskan fenomena',
    solubilityTitle: 'Keterlarutan', solubility: 'Jumlah maksimum bahan terlarut\ndalam 100 g air pada suhu tertentu',
    temperatureTitle: 'Suhu memberi kesan', temperature: 'Air panas melarutkan lebih banyak gula\ndaripada air sejuk (190 → 360 g)',
    substanceTitle: 'Jenis bahan juga penting', substance: 'Keterlarutan gula meningkat banyak;\ngaram hampir mendatar (36 → 38 g)',
    stirringTitle: 'Cepat ≠ Banyak', stirring: 'Mengacau mempercepat pelarutan,\ntetapi tidak menambah jumlah maksimum', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', next: 'Continue', title: 'Key Ideas Summary', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', badge: 'PISA 1 · Explain phenomena',
    solubilityTitle: 'Solubility', solubility: 'The maximum amount of solute\nthat dissolves in 100 g of water at a given temperature',
    temperatureTitle: 'Temperature matters', temperature: 'Hot water dissolves more sugar\nthan cold water (190 → 360 g)',
    substanceTitle: 'The solute matters too', substance: 'Sugar rises sharply; salt stays nearly flat\n(36 → 38 g)',
    stirringTitle: 'Faster ≠ More', stirring: 'Stirring makes dissolving faster,\nbut does not increase the maximum amount', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; next: string; title: string; experiment: string; mystery: string; badge: string;
  solubilityTitle: string; solubility: string; temperatureTitle: string; temperature: string;
  substanceTitle: string; substance: string; stirringTitle: string; stirring: string; language: string
}>

export function M2Experiment1SummaryPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]
  const cards = [
    { icon: '🥄', title: text.solubilityTitle, body: text.solubility, tone: 'warm' },
    { icon: '🌡️', title: text.temperatureTitle, body: text.temperature, tone: 'blue' },
    { icon: '📈', title: text.substanceTitle, body: text.substance, tone: 'green' },
    { icon: '🔄', title: text.stirringTitle, body: text.stirring, tone: 'purple' },
  ]

  return (
    <main className="m2-objectives-page m2-summary-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-summary-content">
        <header className="m2-objectives-header m2-summary-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/pisa" label={text.back} />
          <div className="m2-objectives-title m2-summary-title">
            <span className="m2-objectives-number">14</span>
            <h1>{text.title}</h1>
          </div>
        </header>

        <div className="m2-objectives-layout m2-summary-layout">
          <aside className="m2-objectives-sidecard m2-summary-sidecard">
            <h2>{text.experiment}</h2>
            <div className="m2-summary-cup" aria-hidden="true">☕</div>
            <h3>{text.mystery}</h3>
            <span className="m2-pisa-badge">{text.badge}</span>
          </aside>

          <section className="m2-summary-panel" aria-label={text.title}>
            <div className="m2-summary-grid">
              {cards.map((card) => <article className={`m2-summary-card m2-summary-card-${card.tone}`} key={card.title}>
                <h2><span aria-hidden="true">{card.icon}</span>{card.title}</h2>
                <p>{card.body}</p>
              </article>)}
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="m2-summary-actions">
        <NextButton className="m2-summary-next" label={text.next} href="/gradem2/m2exp1/comparison" />
      </div>
    </main>
  )
}
