import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/materials.css'
import './exp3.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัสดุอุปกรณ์', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
    materials: [
      ['📟', 'เครื่องวัด TDS', '1 เครื่อง'],
      ['🍽️', 'จานระเหย', '4 ใบ'],
      ['🔥', 'เตาให้ความร้อน', '1 เครื่อง'],
      ['💧', 'น้ำกลั่น · น้ำประปา\nน้ำฝน · น้ำบ่อ', 'อย่างละ 20 mL'],
      ['🔍', 'แว่นขยาย', '1 อัน'],
      ['⏱️', 'นาฬิกาจับเวลา', '1 เรือน'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Bahan dan Peralatan', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    materials: [
      ['📟', 'Meter TDS', '1 unit'],
      ['🍽️', 'Piring penyejat', '4 buah'],
      ['🔥', 'Pemanas', '1 unit'],
      ['💧', 'Air suling · Air paip\nAir hujan · Air perigi', '20 mL setiap satu'],
      ['🔍', 'Kanta pembesar', '1 unit'],
      ['⏱️', 'Jam randik', '1 unit'],
    ],
  },
  en: {
    back: 'Back', title: 'Materials and Equipment', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    next: 'Continue', language: 'Choose language',
    materials: [
      ['📟', 'TDS meter', '1 unit'],
      ['🍽️', 'Evaporating dishes', '4 dishes'],
      ['🔥', 'Heater', '1 unit'],
      ['💧', 'Distilled · Tap water\nRainwater · Well water', '20 mL each'],
      ['🔍', 'Magnifying glass', '1 unit'],
      ['⏱️', 'Stopwatch', '1 unit'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; materials: [string, string, string][]
}>

export function Experiment3MaterialsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp3/thinking" label={copy.back} />
          <div className="objectives-title exp3-title">
            <span className="objectives-number">5</span>
            <div>
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={tdsImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="materials-panel" aria-label={copy.title}>
              <ul className="materials-grid">
                {copy.materials.map(([icon, name, amount], index) => (
                  <li className={`material-card material-card-${(index % 3) + 1}`} key={name}>
                    <span className="material-icon" aria-hidden="true">{icon}</span>
                    <h2>{name.split('\n').map((line, lineIndex) => <span key={line}>{lineIndex > 0 && <br />}{line}</span>)}</h2>
                    <p>{amount}</p>
                  </li>
                ))}
              </ul>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp3/procedure" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
