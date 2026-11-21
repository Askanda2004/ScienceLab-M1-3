import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp2-summary.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปแนวคิดสำคัญ', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    percentTitle: 'ร้อยละ % w/v', percent: 'มวลตัวละลาย (g) ÷ ปริมาตร\nสารละลาย (mL) × 100',
    dilutionTitle: 'ผงเท่าเดิม น้ำมากขึ้น', dilution: 'ความเข้มข้นลดลง (แปรผกผัน)\n125 mL → 4% · 500 mL → 1%',
    safeTitle: 'ช่วงปลอดภัยของ ORS', safe: '1.8–2.2% · ผง 1 ซอง\nต่อน้ำ 250 mL พอดี',
    unitsTitle: 'บอกหน่วยให้ชัด', units: '% w/w คิดต่อมวลสารละลาย 100 g\n% v/v คิดต่อปริมาตร 100 mL', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan Idea Utama', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', badge: 'PISA 2 · Mereka bentuk · Tafsir data',
    percentTitle: 'Peratus % w/v', percent: 'Jisim zat terlarut (g) ÷ isipadu\nlarutan (mL) × 100',
    dilutionTitle: 'Serbuk sama, air bertambah', dilution: 'Kepekatan menurun (berkadar songsang)\n125 mL → 4% · 500 mL → 1%',
    safeTitle: 'Julat selamat ORS', safe: '1.8–2.2% · 1 paket serbuk\ndalam 250 mL air',
    unitsTitle: 'Nyatakan unit dengan jelas', units: '% w/w berdasarkan jisim 100 g\n% v/v berdasarkan isi padu 100 mL', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', next: 'Next', title: 'Key Ideas Summary', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', badge: 'PISA 2 · Design · Interpret data',
    percentTitle: 'Percent % w/v', percent: 'Mass of solute (g) ÷ solution\nvolume (mL) × 100',
    dilutionTitle: 'Same powder, more water', dilution: 'Concentration decreases (inverse relationship)\n125 mL → 4% · 500 mL → 1%',
    safeTitle: 'ORS safe range', safe: '1.8–2.2% · 1 sachet of powder\nin exactly 250 mL of water',
    unitsTitle: 'State the unit clearly', units: '% w/w is based on 100 g of solution\n% v/v is based on 100 mL of solution', language: 'Choose language',
  },
} satisfies Record<Language, Record<string, string>>

export function M2Experiment2SummaryPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]
  const cards = [
    { icon: '🧮', title: text.percentTitle, body: text.percent, tone: 'warm' },
    { icon: '🥛', title: text.dilutionTitle, body: text.dilution, tone: 'blue' },
    { icon: '✅', title: text.safeTitle, body: text.safe, tone: 'green' },
    { icon: '🏷️', title: text.unitsTitle, body: text.units, tone: 'purple' },
  ]

  return (
    <main className="m2-objectives-page m2-exp2-summary-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-exp2-summary-content">
        <header className="m2-objectives-header m2-exp2-summary-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/pisa" label={text.back} />
          <div className="m2-objectives-title m2-exp2-summary-title"><span className="m2-objectives-number">13</span><h1>{text.title}</h1></div>
        </header>
        <div className="m2-objectives-layout m2-exp2-summary-layout">
          <aside className="m2-objectives-sidecard m2-exp2-summary-sidecard">
            <h2>{text.experiment}</h2><div className="m2-exp2-summary-icon" aria-hidden="true">🩺</div>
            <h3>{text.mystery}</h3><span className="m2-pisa-badge">{text.badge}</span>
          </aside>
          <section className="m2-exp2-summary-panel" aria-label={text.title}>
            <div className="m2-exp2-summary-grid">
              {cards.map((card) => <article className={`m2-exp2-summary-card ${card.tone}`} key={card.title}>
                <h2><span aria-hidden="true">{card.icon}</span>{card.title}</h2><p>{card.body}</p>
              </article>)}
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="m2-exp2-summary-actions"><NextButton className="m2-exp2-summary-next" label={text.next} href="/gradem2/m2exp2/comparison" /></div>
    </main>
  )
}
