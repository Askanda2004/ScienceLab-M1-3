import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import coastImage from '../../../assets/grade-m1-coast.svg'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/thinking.css'
import './exp3.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'สถานการณ์ชวนคิด', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    prompt: 'เคยสงสัยไหมว่า...', question: 'ทำไมลุงช่างยอมซื้อน้ำกลั่นมาเติมแบตเตอรี่ ทั้งที่น้ำประปาฟรี?',
    story: 'ที่ร้านซ่อมมอเตอร์ไซค์ในหมู่บ้าน ลุงช่างยื่นขวดน้ำกลั่นให้ฟีรดาลีสเติมแบตเตอรี่ ข้าง ๆ มีก๊อกน้ำประปาและโอ่งน้ำฝน ฟีรดาลีสสงสัยว่าทำไมต้องซื้อน้ำกลั่น...',
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Situasi untuk difikirkan', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    prompt: 'Pernahkah anda tertanya-tanya...', question: 'Mengapakah mekanik membeli air suling untuk bateri sedangkan air paip percuma?',
    story: 'Di bengkel motosikal kampung, mekanik memberikan sebotol air suling kepada Firdalis untuk mengisi bateri. Berdekatan terdapat paip air dan tempayan air hujan. Firdalis tertanya-tanya mengapa air suling perlu dibeli...',
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'A Situation to Think About', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    prompt: 'Have you ever wondered...', question: 'Why does the mechanic buy distilled water for a battery when tap water is free?',
    story: 'At the village motorcycle repair shop, the mechanic gives Firdalis a bottle of distilled water for a battery. A tap and a rainwater jar are nearby. Firdalis wonders why distilled water has to be purchased...',
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  prompt: string; question: string; story: string; start: string; language: string
}>

export function Experiment3ThinkingPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp3/science-skills" label={copy.back} />
          <div className="objectives-title exp3-title">
            <span className="objectives-number">4</span>
            <div>
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={tdsImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="thinking-panel" aria-label={copy.title}>
              <div className="thinking-intro">
                <img src={coastImage} alt="บรรยากาศชุมชนชายฝั่งริมอ่าวปัตตานี" />
                <div className="thinking-question">
                  <p>{copy.prompt}</p>
                  <h2>{copy.question}</h2>
                </div>
              </div>
              <p className="thinking-story">{copy.story}</p>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next thinking-start" label={copy.start} href="/gradem1/exp3/materials" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
