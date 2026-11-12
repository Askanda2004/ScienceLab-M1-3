import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp3-objectives.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัตถุประสงค์การเรียนรู้การทดลอง', experiment: 'การทดลองที่ 3',
    mystery: 'น้ำกรดอย่างปลอดภัย\nของปะดอ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    lesson: 'การทดลองที่ 3 เรื่อง การเจือจางสารละลายอย่างปลอดภัย',
    prompt: 'เมื่อทำการทดลองนี้จบ นักเรียนสามารถ',
    objectives: [
      'คำนวณปริมาตรกรดและน้ำเพื่อเจือจางให้ได้ความเข้มข้นที่กำหนดด้วย C₁V₁ = C₂V₂ ได้',
      'ปฏิบัติตามขั้นตอนความปลอดภัย: อ่านฉลาก สวมถุงมือ–แว่นตา และเทกรดลงน้ำได้',
      'ประเมินข้อมูลเวลา คุณภาพ ราคา และความปลอดภัย แล้วตัดสินใจเลือกวิธีใช้และทิ้งกรดได้',
    ],
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Objektif Pembelajaran Eksperimen', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\ndengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    lesson: 'Eksperimen 3: Pencairan larutan dengan selamat',
    prompt: 'Selepas menjalankan eksperimen ini, murid dapat',
    objectives: [
      'Mengira isipadu asid dan air untuk mencairkan larutan kepada kepekatan yang ditetapkan menggunakan C₁V₁ = C₂V₂',
      'Mengikuti langkah keselamatan: membaca label, memakai sarung tangan dan gogal, serta menuang asid ke dalam air',
      'Menilai masa, kualiti, kos dan keselamatan sebelum memilih cara penggunaan dan pelupusan asid',
    ],
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Learning Objectives', experiment: 'Experiment 3',
    mystery: 'Safe acid dilution', pisa: 'PISA 3 · Use data to decide',
    lesson: 'Experiment 3: Safe dilution of solutions',
    prompt: 'By the end of this experiment, students can',
    objectives: [
      'Calculate acid and water volumes to dilute a solution to a target concentration using C₁V₁ = C₂V₂',
      'Follow safety steps: read the label, wear gloves and goggles, and pour acid into water',
      'Evaluate time, quality, cost, and safety before choosing how to use and dispose of acid',
    ],
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  lesson: string; prompt: string; objectives: string[]; next: string; language: string
}>

export function M2Experiment3ObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp3-objectives-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">1</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-object-art" aria-hidden="true">🪣</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-exp3-objectives-panel" aria-label={copy.title}>
              <h2>{copy.lesson}</h2>
              <p className="m2-learning-prompt">{copy.prompt}</p>
              <ol className="m2-objectives-list">
                {copy.objectives.map((objective, index) => (
                  <li key={objective}>
                    <span className="m2-objective-index">{index + 1}</span>
                    <p>{objective}</p>
                  </li>
                ))}
              </ol>
              <div className="m2-objectives-actions">
                <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp3/vocabulary" />
              </div>
            </section>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
