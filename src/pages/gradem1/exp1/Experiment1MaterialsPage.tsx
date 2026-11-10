import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './materials.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัสดุอุปกรณ์', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ',
    pisa: 'PISA 1 · อธิบายปรากฏการณ์', next: 'ต่อไป', language: 'เลือกภาษา',
    materials: [
      ['🧪', 'บีกเกอร์ 250 mL', '3 ใบ'],
      ['🌡️', 'เทอร์มอมิเตอร์ดิจิทัล', '1 อัน'],
      ['🔥', 'เตาให้ความร้อน', '1 เครื่อง'],
      ['⏱️', 'นาฬิกาจับเวลา', '1 เรือน'],
      ['💧', 'น้ำกลั่น', '200 mL ต่อบีกเกอร์'],
      ['🧂', 'เกลือแกง · น้ำตาลทราย + แท่งแก้วคน', 'อย่างละ 3 ช้อน'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Bahan dan Peralatan', experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana',
    pisa: 'PISA 1 · Menjelaskan fenomena', next: 'Seterusnya', language: 'Pilih bahasa',
    materials: [
      ['🧪', 'Bikar 250 mL', '3 buah'],
      ['🌡️', 'Termometer digital', '1 unit'],
      ['🔥', 'Pemanas', '1 unit'],
      ['⏱️', 'Jam randik', '1 unit'],
      ['💧', 'Air suling', '200 mL setiap bikar'],
      ['🧂', 'Garam · Gula + batang pengacau', '3 sudu setiap satu'],
    ],
  },
  en: {
    back: 'Back', title: 'Materials and Equipment', experiment: 'Experiment 1', mystery: "Mana's Sugar Water Mystery",
    pisa: 'PISA 1 · Explain phenomena', next: 'Continue', language: 'Choose language',
    materials: [
      ['🧪', '250 mL beakers', '3 beakers'],
      ['🌡️', 'Digital thermometer', '1 unit'],
      ['🔥', 'Heater', '1 unit'],
      ['⏱️', 'Stopwatch', '1 unit'],
      ['💧', 'Distilled water', '200 mL per beaker'],
      ['🧂', 'Salt · Sugar + stirring rod', '3 spoonfuls each'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string;
  materials: [string, string, string][]
}>

export function Experiment1MaterialsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/thinking" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">6</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={boilingImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="materials-panel" aria-label={copy.title}>
              <ul className="materials-grid">
                {copy.materials.map(([icon, name, amount], index) => (
                  <li className={`material-card material-card-${(index % 3) + 1}`} key={name}>
                    <span className="material-icon" aria-hidden="true">{icon}</span>
                    <h2>{name}</h2>
                    <p>{amount}</p>
                  </li>
                ))}
              </ul>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp1/procedure" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
