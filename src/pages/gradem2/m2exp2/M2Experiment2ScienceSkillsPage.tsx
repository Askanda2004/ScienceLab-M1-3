import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-science-skills.css'
import './m2-exp2-science-skills.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ทักษะกระบวนการทางวิทยาศาสตร์', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล', next: 'ต่อไป', language: 'เลือกภาษา',
    cards: [
      ['ทักษะการวัด', 'ชั่งผง ORS ด้วยเครื่องชั่ง 0.1 g และตวงน้ำด้วยกระบอกตวง 250 mL'],
      ['ทักษะการคำนวณ', '% w/v = มวลตัวละลาย (g) ÷ ปริมาตรสารละลาย (mL) × 100'],
      ['ทักษะการตั้งสมมติฐาน', 'ถ้าผงเท่าเดิมแต่ใช้น้ำมากขึ้น ความเข้มข้นจะลดลง'],
      ['ทักษะการกำหนดและควบคุมตัวแปร', 'เปลี่ยนเฉพาะปริมาตรน้ำ คุมผง 1 ซอง (5 g) และคนจนละลายหมด'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Kemahiran Proses Sains', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data', next: 'Seterusnya', language: 'Pilih bahasa',
    cards: [
      ['Kemahiran mengukur', 'Timbang serbuk ORS dengan penimbang 0.1 g dan sukat air menggunakan silinder penyukat 250 mL'],
      ['Kemahiran mengira', '% w/v = jisim zat terlarut (g) ÷ isipadu larutan (mL) × 100'],
      ['Kemahiran membina hipotesis', 'Jika jumlah serbuk sama tetapi air ditambah, kepekatan akan berkurang'],
      ['Menentukan dan mengawal pemboleh ubah', 'Ubah isipadu air sahaja; kekalkan satu paket serbuk (5 g) dan kacau hingga larut'],
    ],
  },
  en: {
    back: 'Back', title: 'Science Process Skills', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', pisa: 'PISA 2 · Design · Interpret data', next: 'Continue', language: 'Choose language',
    cards: [
      ['Measurement skills', 'Weigh ORS powder with a 0.1 g scale and measure water with a 250 mL cylinder'],
      ['Calculation skills', '% w/v = mass of solute (g) ÷ solution volume (mL) × 100'],
      ['Hypothesis skills', 'If the powder amount stays the same but more water is used, concentration decreases'],
      ['Identifying and controlling variables', 'Change only the water volume; keep one sachet (5 g) and stir until dissolved'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string; cards: [string, string][]
}>

export function M2Experiment2ScienceSkillsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp2-science-skills-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/vocabulary" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">3</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp2-science-art" aria-hidden="true">🩺</div>
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
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp2/thinking" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
