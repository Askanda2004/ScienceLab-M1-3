import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import streetImage from '../../../assets/grade-m2-street.svg'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-thinking.css'
import './m2-exp3-thinking.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'สถานการณ์ชวนคิด', experiment: 'การทดลองที่ 3',
    mystery: 'น้ำกรดยาง\nของปะดอ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    prompt: 'เคยสงสัยไหมว่า...',
    question: 'ทำไมปะดอต้องเทกรดลงน้ำทุกครั้ง แล้วใส่กรดมากขึ้นจะดีกว่าไหม?',
    story: 'ที่สวนยางหลังบ้าน ปะดอผสมน้ำกรดจับยางแล้วเตือนว่า “กรดแรง ๆ เทลงน้ำ อย่าเทน้ำลงกรดเด็ดขาดนะหลาน” อามีนะห์สงสัยว่าใส่กรดมากขึ้นจะดีไหม...',
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Situasi untuk difikirkan', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\nlateks dengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    prompt: 'Pernahkah anda tertanya-tanya...',
    question: 'Mengapa asid perlu dituang ke dalam air setiap kali? Adakah lebih banyak asid lebih baik?',
    story: 'Di kebun getah belakang rumah, Pak Do mencampurkan asid untuk menggumpalkan lateks lalu berpesan, “Tuang asid pekat ke dalam air. Jangan sesekali tuang air ke dalam asid.” Aminah tertanya-tanya sama ada lebih banyak asid lebih baik...',
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'A Situation to Think About', experiment: 'Experiment 3',
    mystery: 'Safe latex acid\ndilution', pisa: 'PISA 3 · Use data to decide',
    prompt: 'Have you ever wondered...',
    question: 'Why should acid be poured into water each time? Would using more acid work better?',
    story: 'In the rubber garden behind the house, Pak Do mixes acid to coagulate latex and warns, “Pour concentrated acid into water. Never pour water into acid.” Aminah wonders whether using more acid would be better...',
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  prompt: string; question: string; story: string; start: string; language: string
}>

export function M2Experiment3ThinkingPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp3-thinking-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp3/science-skills" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">4</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-thinking-art" aria-hidden="true">🪣</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-thinking-panel" aria-label={copy.title}>
              <div className="m2-thinking-intro">
                <img src={streetImage} alt="" />
                <div className="m2-thinking-question">
                  <p>{copy.prompt}</p>
                  <h2>{copy.question}</h2>
                </div>
              </div>
              <p className="m2-thinking-story">{copy.story}</p>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next m2-thinking-start" label={copy.start} href="/gradem2/m2exp3/materials" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
