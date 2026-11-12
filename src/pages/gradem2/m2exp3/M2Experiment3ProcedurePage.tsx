import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-procedure.css'
import './m2-exp3-procedure.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ขั้นตอนการทดลอง', experiment: 'การทดลองที่ 3',
    mystery: 'น้ำกรดยาง\nของปะดอ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
    steps: [
      'สวมถุงมือและแว่นตา แล้วเลือกขวดกรด A 90 % / B 50 % / C 3 %',
      'คำนวณกรด 3 % 3,000 mL จากขวด A: 3 × 3,000 ÷ 90 = 100 mL',
      'ใส่น้ำ 2,900 mL ลงถังก่อน แล้วค่อย ๆ เทกรดลงน้ำ',
      'เทน้ำกรดลงถาดน้ำยาง จับเวลาจนยางจับตัว แล้วประเมินแผ่นยาง',
      'ทำซ้ำที่ 1 % และ 10 % แล้วกด “ดูผลการทดลอง”',
    ],
  },
  ms: {
    back: 'Kembali', title: 'Prosedur Eksperimen', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\nlateks dengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    steps: [
      'Pakai sarung tangan dan gogal, kemudian pilih botol asid A 90% / B 50% / C 3%',
      'Kira asid 3% untuk 3,000 mL daripada botol A: 3 × 3,000 ÷ 90 = 100 mL',
      'Masukkan 2,900 mL air ke dalam baldi dahulu, kemudian tuang asid perlahan-lahan ke dalam air',
      'Tuang larutan asid ke dalam dulang lateks, catat masa sehingga lateks membeku dan nilai kepingan getah',
      'Ulang dengan kepekatan 1% dan 10%, kemudian tekan “Lihat keputusan eksperimen”',
    ],
  },
  en: {
    back: 'Back', title: 'Experiment Procedure', experiment: 'Experiment 3',
    mystery: 'Safe latex acid\ndilution', pisa: 'PISA 3 · Use data to decide',
    next: 'Continue', language: 'Choose language',
    steps: [
      'Put on gloves and goggles, then choose acid bottle A 90% / B 50% / C 3%',
      'Calculate acid for 3,000 mL at 3% using bottle A: 3 × 3,000 ÷ 90 = 100 mL',
      'Put 2,900 mL of water in the bucket first, then slowly pour the acid into the water',
      'Pour the diluted acid into the latex tray, time how long it takes to coagulate, then assess the rubber sheet',
      'Repeat at 1% and 10%, then press “View experiment results”',
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; steps: string[]
}>

export function M2Experiment3ProcedurePage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp3-procedure-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp3/materials" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">6</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-procedure-art" aria-hidden="true">🪣</div>
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
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp3/prediction" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
