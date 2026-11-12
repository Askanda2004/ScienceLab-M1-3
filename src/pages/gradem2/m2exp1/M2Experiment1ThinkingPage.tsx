import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import streetImage from '../../../assets/grade-m2-street.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-thinking.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'สถานการณ์ชวนคิด', subtitle: 'ม.2 สารละลาย · การทดลองที่ 1 ปริศนาน้ำตาลก้นแก้วชาชัก', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    prompt: 'เคยสงสัยไหมว่า...', question: 'ทำไมชาเย็นมีน้ำตาลเหลือก้นแก้ว แต่ชาร้อนละลายหมด?',
    story: 'ที่ร้านชาชักของกะนะบนถนนตลาด กะนะใส่น้ำตาล 3 ช้อนเท่ากันทั้งชาร้อนและชาเย็น ชาร้อนละลายหมด แต่ชาเย็นมีน้ำตาลค้างก้นแก้ว คนแรง ๆ ก็ไม่หาย อามีนะห์จึงสงสัย...',
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Situasi untuk difikirkan', subtitle: 'Tingkatan 2 Larutan · Eksperimen 1 Misteri gula di dasar teh tarik', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    prompt: 'Pernahkah anda tertanya-tanya...', question: 'Mengapa gula tertinggal di dasar teh sejuk tetapi larut dalam teh panas?',
    story: 'Di kedai teh tarik Kana di jalan pasar, Kana memasukkan tiga sudu gula yang sama ke dalam teh panas dan teh sejuk. Gula larut dalam teh panas tetapi tertinggal di dasar teh sejuk walaupun dikacau. Aminah mula tertanya-tanya...',
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'A Situation to Think About', subtitle: 'Grade 8 Solutions · Experiment 1 Sugar at the Bottom of the Teh Tarik Glass', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    prompt: 'Have you ever wondered...', question: 'Why does sugar remain at the bottom of iced tea but dissolve in hot tea?',
    story: 'At Kana’s teh tarik shop on the market street, Kana adds three equal spoonfuls of sugar to both hot and iced tea. It dissolves in the hot tea, but sugar remains at the bottom of the iced tea even after stirring. Aminah begins to wonder...',
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string; prompt: string; question: string; story: string; start: string; language: string
}>

export function M2Experiment1ThinkingPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-thinking-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/science-skills" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">5</span>
            <div className="m2-thinking-title-copy">
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
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
              <NextButton className="m2-objectives-next m2-thinking-start" label={copy.start} href="/gradem2/m2exp1/materials" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
