import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-science-skills.css'
import './m2-exp3-science-skills.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ทักษะกระบวนการทางวิทยาศาสตร์', experiment: 'การทดลองที่ 3',
    mystery: 'น้ำกรดยาง\nของปะดอ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
    cards: [
      ['ทักษะการคำนวณ', 'คำนวณปริมาตรกรดที่ต้องใช้\nด้วย C₁V₁ = C₂V₂'],
      ['ทักษะการวัดและใช้อุปกรณ์', 'ตวงกรดด้วยถ้วยตวง 100 mL\nตวงน้ำในถัง และสวม PPE'],
      ['ทักษะการตีความหมายข้อมูล', 'อ่านตารางเวลาจับตัว คุณภาพ\nและราคา แล้วหาแนวโน้ม'],
      ['ทักษะการลงความเห็นจากข้อมูล', 'สรุปว่าความเข้มข้นใดดีที่สุด\nและเลือกขวดกรดอย่างมีเหตุผล'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Kemahiran Proses Sains', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\nlateks dengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    cards: [
      ['Kemahiran pengiraan', 'Kira isipadu asid yang diperlukan\ndengan C₁V₁ = C₂V₂'],
      ['Kemahiran mengukur dan menggunakan alat', 'Sukat asid dengan cawan penyukat 100 mL,\nsukat air dan pakai PPE'],
      ['Mentafsir data', 'Baca jadual masa pembekuan, kualiti\ndan harga untuk mengenal pasti trend'],
      ['Membuat kesimpulan daripada data', 'Rumuskan kepekatan terbaik\ndan pilih asid dengan alasan yang munasabah'],
    ],
  },
  en: {
    back: 'Back', title: 'Science Process Skills', experiment: 'Experiment 3',
    mystery: 'Safe latex acid\ndilution', pisa: 'PISA 3 · Use data to decide',
    next: 'Continue', language: 'Choose language',
    cards: [
      ['Calculation skills', 'Calculate the acid volume needed\nusing C₁V₁ = C₂V₂'],
      ['Measurement and equipment skills', 'Measure acid with a 100 mL cup,\nmeasure water, and wear PPE'],
      ['Interpreting data', 'Read the coagulation time, quality,\nand price table to find a trend'],
      ['Drawing conclusions from data', 'Decide which concentration works best\nand choose an acid bottle with reason'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; cards: [string, string][]
}>

export function M2Experiment3ScienceSkillsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp3-science-skills-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp3/vocabulary" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">3</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-science-art" aria-hidden="true">🪣</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-science-skills-panel" aria-label={copy.title}>
              <ol className="m2-science-skills-grid">
                {copy.cards.map(([title, description], index) => (
                  <li className={`m2-science-skill-card m2-science-skill-card-${index + 1}`} key={title}>
                    <div className="m2-science-skill-heading">
                      <span>{index + 1}</span>
                      <h2>{title}</h2>
                    </div>
                    <p>{description}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp3/thinking" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
