import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './summary.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปแนวคิดสำคัญ', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 1 ปริศนาหม้อน้ำเชื่อมของมะนะ', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', badge: 'PISA 1 · อธิบายปรากฏการณ์',
    pureTitle: 'สารบริสุทธิ์', pure: 'เดือดที่อุณหภูมิคงที่\nน้ำกลั่นเดือดที่ 100 °C เสมอ',
    mixtureTitle: 'สารผสม', mixture: 'มีตัวละลาย จุดเดือดสูงขึ้น\nและอุณหภูมิยังเพิ่มขณะเดือด',
    evidenceTitle: 'กราฟคือหลักฐาน', evidence: 'เส้นราบ = สารบริสุทธิ์\nเส้นยังเอียงขึ้น = สารผสม',
    lifeTitle: 'ใช้ในชีวิตจริง', life: 'น้ำเชื่อมเดือดร้อนกว่าน้ำเปล่า\nระวังลวกมือเวลาเคี่ยวขนม', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan Idea Utama', subtitle: 'Tingkatan 1 · Eksperimen 1: Misteri air gula Mana', experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana', badge: 'PISA 1 · Menjelaskan fenomena',
    pureTitle: 'Bahan tulen', pure: 'Mendidih pada suhu tetap\nAir suling sentiasa mendidih pada 100 °C',
    mixtureTitle: 'Campuran', mixture: 'Mengandungi bahan terlarut, takat didih meningkat\ndan suhu terus naik semasa mendidih',
    evidenceTitle: 'Graf ialah bukti', evidence: 'Garis mendatar = bahan tulen\nGaris terus menaik = campuran',
    lifeTitle: 'Dalam kehidupan', life: 'Air gula lebih panas daripada air biasa\nBerhati-hati agar tidak melecur ketika memasak', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', next: 'Next', title: 'Key Ideas Summary', subtitle: 'Grade 7 · Experiment 1: Mana’s Sugar Water Mystery', experiment: 'Experiment 1', mystery: "Mana's Sugar Water Mystery", badge: 'PISA 1 · Explain phenomena',
    pureTitle: 'Pure substance', pure: 'Boils at a constant temperature\nDistilled water always boils at 100 °C',
    mixtureTitle: 'Mixture', mixture: 'Contains solute, so its boiling point rises\nand temperature can keep rising while boiling',
    evidenceTitle: 'Graphs are evidence', evidence: 'Flat line = pure substance\nA rising line = mixture',
    lifeTitle: 'In real life', life: 'Boiling syrup is hotter than plain water\nBe careful to avoid burns while cooking', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; next: string; title: string; subtitle: string; experiment: string; mystery: string; badge: string;
  pureTitle: string; pure: string; mixtureTitle: string; mixture: string;
  evidenceTitle: string; evidence: string; lifeTitle: string; life: string; language: string
}>

export function Experiment1SummaryPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]
  const cards = [
    { icon: '🧪', title: text.pureTitle, body: text.pure, tone: 'warm' },
    { icon: '🍯', title: text.mixtureTitle, body: text.mixture, tone: 'blue' },
    { icon: '📈', title: text.evidenceTitle, body: text.evidence, tone: 'green' },
    { icon: '⚠️', title: text.lifeTitle, body: text.life, tone: 'purple' },
  ]

  return (
    <main className="objectives-page summary-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content summary-content">
        <header className="objectives-header summary-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/pisa" label={text.back} />
          <div className="objectives-title summary-title">
            <span className="objectives-number">13</span>
            <div>
              <h1>{text.title}</h1>
              {/* <p>{text.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout summary-layout">
          <aside className="objectives-sidecard summary-sidecard">
            <h2>{text.experiment}</h2>
            <img src={boilingImage} alt="" />
            <h3>{text.mystery}</h3>
            <span className="pisa-badge">{text.badge}</span>
          </aside>

          <section className="summary-panel" aria-label={text.title}>
            <div className="summary-grid">
              {cards.map((card) => (
                <article className={`summary-card summary-card-${card.tone}`} key={card.title}>
                  <h2><span aria-hidden="true">{card.icon}</span>{card.title}</h2>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="summary-actions">
        <NextButton className="summary-next" label={text.next} href="/gradem1/exp1/comparison" />
      </div>
    </main>
  )
}
