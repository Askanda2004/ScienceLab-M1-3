import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-procedure.css'
import './m2-exp2-procedure.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ขั้นตอนการทดลอง', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล', next: 'ต่อไป', language: 'เลือกภาษา',
    steps: [
      'คำนวณมวลผง: ORS 2 % w/v น้ำ 250 mL ใช้ 2 × 250 ÷ 100 = 5.0 g',
      'ชั่งผง ORS ให้ได้ 5.0 g และตวงน้ำต้มสุก 250 mL (อ่านที่ท้องน้ำ)',
      'เทผงและน้ำลงเหยือกผสม แล้วคนจนละลายหมด',
      'วัดความเข้มข้นด้วยเครื่องวัด % w/v แล้วกดบันทึกลงตาราง',
      'เลื่อนแถบน้ำเป็น 125 / 375 / 500 mL แล้วทำซ้ำ',
    ],
  },
  ms: {
    back: 'Kembali', title: 'Prosedur Eksperimen', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data', next: 'Seterusnya', language: 'Pilih bahasa',
    steps: [
      'Kira jisim serbuk: ORS 2% w/v dalam 250 mL air memerlukan 2 × 250 ÷ 100 = 5.0 g',
      'Timbang 5.0 g serbuk ORS dan sukat 250 mL air masak (baca pada dasar meniskus)',
      'Tuangkan serbuk dan air ke dalam jag, kemudian kacau hingga larut',
      'Ukur kepekatan dengan meter % w/v dan simpan bacaan dalam jadual',
      'Laraskan air kepada 125 / 375 / 500 mL dan ulangi',
    ],
  },
  en: {
    back: 'Back', title: 'Experiment Procedure', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', pisa: 'PISA 2 · Design · Interpret data', next: 'Continue', language: 'Choose language',
    steps: [
      'Calculate powder mass: 2% w/v ORS in 250 mL water requires 2 × 250 ÷ 100 = 5.0 g',
      'Weigh 5.0 g of ORS powder and measure 250 mL of boiled water (read the bottom of the meniscus)',
      'Pour the powder and water into the mixing jug, then stir until dissolved',
      'Measure concentration with the % w/v meter and record the reading in the table',
      'Adjust the water to 125 / 375 / 500 mL and repeat',
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string; steps: string[]
}>

export function M2Experiment2ProcedurePage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-procedure-page m2-exp2-procedure-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/materials" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">6</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp2-procedure-art" aria-hidden="true">🩺</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-procedure-panel" aria-label={copy.title}>
              <ol className="m2-procedure-list">
                {copy.steps.map((step, index) => (
                  <li key={step}>
                    <span className="m2-procedure-index">{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp2/design" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
