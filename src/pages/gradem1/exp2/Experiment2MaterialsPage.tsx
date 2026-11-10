import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/materials.css'
import './exp2.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัสดุอุปกรณ์', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    next: 'ต่อไป', language: 'เลือกภาษา',
    materials: [
      ['⚖️', 'เครื่องชั่งดิจิทัล', '1 เครื่อง'],
      ['🧪', 'กระบอกตวง 100 mL', '1 อัน'],
      ['🥛', 'บีกเกอร์ 250 mL', '4 ใบ'],
      ['💧', 'น้ำกลั่น · น้ำทะเล\nน้ำมันพืช', 'อย่างละ 100 mL'],
      ['🧂', 'เกลือแกง + ช้อนชา', '1–5 ช้อนชา'],
      ['🥚', 'วัตถุทดสอบ: ไข่\nลูกยาง เทียน ลูกแก้ว', 'อย่างละ 1 ชิ้น'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Bahan dan Peralatan', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    materials: [
      ['⚖️', 'Penimbang digital', '1 unit'],
      ['🧪', 'Silinder penyukat 100 mL', '1 unit'],
      ['🥛', 'Bikar 250 mL', '4 buah'],
      ['💧', 'Air suling · Air laut\nMinyak sayuran', '100 mL setiap satu'],
      ['🧂', 'Garam + sudu teh', '1–5 sudu teh'],
      ['🥚', 'Objek ujian: telur\nBola getah, lilin, guli', '1 setiap satu'],
    ],
  },
  en: {
    back: 'Back', title: 'Materials and Equipment', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    next: 'Continue', language: 'Choose language',
    materials: [
      ['⚖️', 'Digital scale', '1 unit'],
      ['🧪', '100 mL graduated cylinder', '1 unit'],
      ['🥛', '250 mL beakers', '4 beakers'],
      ['💧', 'Distilled water · Seawater\nVegetable oil', '100 mL each'],
      ['🧂', 'Table salt + teaspoon', '1–5 teaspoons'],
      ['🥚', 'Test objects: egg\nRubber ball, candle, marble', '1 each'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; materials: [string, string, string][]
}>

export function Experiment2MaterialsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/thinking" label={copy.back} />
          <div className="objectives-title exp2-title">
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
            <img src={densityImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="materials-panel" aria-label={copy.title}>
              <ul className="materials-grid">
                {copy.materials.map(([icon, name, amount], index) => (
                  <li className={`material-card material-card-${(index % 3) + 1}`} key={name}>
                    <span className="material-icon" aria-hidden="true">{icon}</span>
                    <h2>{name.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h2>
                    <p>{amount}</p>
                  </li>
                ))}
              </ul>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp2/procedure" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
