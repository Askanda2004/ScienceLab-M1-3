import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-materials.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัสดุอุปกรณ์', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์', next: 'ต่อไป', language: 'เลือกภาษา',
    materials: [
      ['🧪', 'บีกเกอร์ 250 mL', '4 ใบ'],
      ['🌡️', 'เทอร์มอมิเตอร์ดิจิทัล', '1 อัน'],
      ['🔥', 'เตา + ถังน้ำแข็ง', 'ตั้งได้ 10–80 °C'],
      ['⏱️', 'นาฬิกาจับเวลา', '1 เรือน + แท่งคน'],
      ['💧', 'น้ำกลั่น', '100 g ต่อบีกเกอร์'],
      ['🧂', 'น้ำตาล · เกลือ · สารส้ม + ช้อนตวง 10 g', 'ใส่ทีละ 1 ช้อน'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Bahan dan Peralatan', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena', next: 'Seterusnya', language: 'Pilih bahasa',
    materials: [
      ['🧪', 'Bikar 250 mL', '4 buah'],
      ['🌡️', 'Termometer digital', '1 unit'],
      ['🔥', 'Pemanas + bekas ais', 'Tetapan 10–80 °C'],
      ['⏱️', 'Jam randik', '1 unit + batang pengacau'],
      ['💧', 'Air suling', '100 g setiap bikar'],
      ['🧂', 'Gula · garam · tawas + sudu penyukat 10 g', 'Tambah satu sudu setiap kali'],
    ],
  },
  en: {
    back: 'Back', title: 'Materials and Equipment', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena', next: 'Continue', language: 'Choose language',
    materials: [
      ['🧪', '250 mL beakers', '4 beakers'],
      ['🌡️', 'Digital thermometer', '1 unit'],
      ['🔥', 'Heater + ice bath', 'Set to 10–80 °C'],
      ['⏱️', 'Stopwatch', '1 unit + stirring rod'],
      ['💧', 'Distilled water', '100 g per beaker'],
      ['🧂', 'Sugar · salt · alum + 10 g measuring spoon', 'Add one spoonful at a time'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string; materials: [string, string, string][]
}>

export function M2Experiment1MaterialsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-materials-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/thinking" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">6</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={teaImage} alt="" />
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
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp1/procedure" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
