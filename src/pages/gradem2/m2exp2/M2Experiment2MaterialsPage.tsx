import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-materials.css'
import './m2-exp2-materials.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัสดุอุปกรณ์', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล', next: 'ต่อไป', language: 'เลือกภาษา',
    materials: [
      ['⚖️', 'เครื่องชั่ง 0.1 g', '+ จานชั่ง'],
      ['🧪', 'กระบอกตวง 250 mL', '1 อัน'],
      ['🥛', 'เหยือกผสม 1 L', '+ แท่งคน'],
      ['💧', 'น้ำต้มสุก', '125–500 mL'],
      ['🧂', 'ซอง ORS · เกลือ · น้ำตาล', 'ORS ซองละ 5 g'],
      ['⏲️', 'เครื่องวัดความเข้มข้น (% w/v)', '1 เครื่อง'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Bahan dan Peralatan', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data', next: 'Seterusnya', language: 'Pilih bahasa',
    materials: [
      ['⚖️', 'Penimbang 0.1 g', '+ bekas timbang'],
      ['🧪', 'Silinder penyukat 250 mL', '1 unit'],
      ['🥛', 'Jag bancuhan 1 L', '+ batang pengacau'],
      ['💧', 'Air masak', '125–500 mL'],
      ['🧂', 'Paket ORS · garam · gula', 'ORS 5 g setiap paket'],
      ['⏲️', 'Meter kepekatan (% w/v)', '1 unit'],
    ],
  },
  en: {
    back: 'Back', title: 'Materials and Equipment', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', pisa: 'PISA 2 · Design · Interpret data', next: 'Continue', language: 'Choose language',
    materials: [
      ['⚖️', '0.1 g scale', '+ weighing dish'],
      ['🧪', '250 mL measuring cylinder', '1 unit'],
      ['🥛', '1 L mixing jug', '+ stirring rod'],
      ['💧', 'Boiled water', '125–500 mL'],
      ['🧂', 'ORS sachets · salt · sugar', '5 g per ORS sachet'],
      ['⏲️', 'Concentration meter (% w/v)', '1 unit'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string; materials: [string, string, string][]
}>

export function M2Experiment2MaterialsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-materials-page m2-exp2-materials-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/thinking" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">5</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp2-materials-art" aria-hidden="true">🩺</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-materials-panel" aria-label={copy.title}>
              <ul className="m2-materials-grid">
                {copy.materials.map(([icon, name, amount], index) => (
                  <li className={`m2-material-card m2-material-card-${(index % 3) + 1}`} key={name}>
                    <span className="m2-material-icon" aria-hidden="true">{icon}</span>
                    <h2>{name}</h2>
                    <p>{amount}</p>
                  </li>
                ))}
              </ul>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp2/procedure" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
