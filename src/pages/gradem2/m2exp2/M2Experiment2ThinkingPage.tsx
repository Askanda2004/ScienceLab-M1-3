import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import streetImage from '../../../assets/grade-m2-street.svg'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-thinking.css'
import './m2-exp2-thinking.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'สถานการณ์ชวนคิด', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    prompt: 'เคยสงสัยไหมว่า...', question: 'ทำไม ORS 1 ซองต้องผสมน้ำ 250 mL พอดี ใส่มากกว่านี้ไม่ได้เหรอ?',
    story: 'น้องของฟิรเดาส์ท้องเสีย พยาบาลฟาตีมะห์ที่ร้านยาบนถนนตลาดย้ำว่า “ผสม ORS ต้องใช้น้ำ 250 มิลลิลิตรพอดีนะ” ฟิรเดาส์สงสัยว่า ใส่น้ำเยอะ ๆ ไม่ดีกว่าเหรอ...',
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Situasi untuk difikirkan', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    prompt: 'Pernahkah anda tertanya-tanya...', question: 'Mengapa satu paket ORS mesti dicampur dengan tepat 250 mL air? Bolehkah ditambah lebih banyak air?',
    story: 'Adik Firdaus mengalami cirit-birit. Jururawat Fatimah di farmasi jalan pasar berpesan, “Bancuh ORS dengan tepat 250 mililiter air.” Firdaus tertanya-tanya, bukankah lebih banyak air lebih baik?',
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'A Situation to Think About', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', pisa: 'PISA 2 · Design · Interpret data',
    prompt: 'Have you ever wondered...', question: 'Why must one ORS sachet be mixed with exactly 250 mL of water? Can’t we add more?',
    story: 'Firdaus’s younger sibling is unwell with diarrhoea. Nurse Fatimah at the market pharmacy stresses, “Mix the ORS with exactly 250 millilitres of water.” Firdaus wonders whether adding more water would be better...',
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; prompt: string; question: string; story: string; start: string; language: string
}>

export function M2Experiment2ThinkingPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-thinking-page m2-exp2-thinking-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/science-skills" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">4</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp2-thinking-art" aria-hidden="true">🩺</div>
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
              <NextButton className="m2-objectives-next m2-thinking-start" label={copy.start} href="/gradem2/m2exp2/materials" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
