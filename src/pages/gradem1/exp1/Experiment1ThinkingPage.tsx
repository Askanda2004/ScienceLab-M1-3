import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import coastImage from '../../../assets/grade-m1-coast.svg'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './thinking.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'สถานการณ์ชวนคิด', experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    prompt: 'เคยสงสัยไหมว่า...', question: 'ทำไมหม้อน้ำเชื่อมถึงเดือดช้ากว่าหม้อน้ำเปล่า ทั้งที่ตั้งไฟพร้อมกัน?',
    story: 'ที่ครัวบ้านริมอ่าวปัตตานี มะนะ (แม่) ต้มน้ำเชื่อมทำขนมบนเตาแก๊ส ข้าง ๆ กันมีหม้อน้ำเปล่าที่เดือดพล่านไปแล้ว แต่หม้อน้ำเชื่อมยังนิ่งอยู่ อามีนะหยิบเอียงคอสงสัย...',
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Situasi untuk difikirkan', experiment: 'Eksperimen 1',
    mystery: 'Misteri air gula Mana', pisa: 'PISA 1 · Menjelaskan fenomena',
    prompt: 'Pernahkah anda tertanya-tanya...', question: 'Mengapakah air gula mendidih lebih lambat daripada air kosong walaupun dipanaskan serentak?',
    story: 'Di dapur rumah di tepi Teluk Pattani, ibu Mana memasak air gula untuk membuat kuih. Periuk air kosong di sebelahnya sudah menggelegak, tetapi air gula masih tenang. Amina tertanya-tanya...',
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'A Situation to Think About', experiment: 'Experiment 1',
    mystery: "Mana's Sugar Water Mystery", pisa: 'PISA 1 · Explain phenomena',
    prompt: 'Have you ever wondered...', question: 'Why does sugar water boil more slowly than plain water when both pots are heated at the same time?',
    story: 'In a kitchen by Pattani Bay, Mana’s mother is making sugar syrup for a dessert. The pot of plain water beside it is already boiling, but the syrup remains still. Amina tilts her head and wonders...',
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  prompt: string; question: string; story: string; start: string; language: string
}>

export function Experiment1ThinkingPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/science-skills" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">5</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={boilingImage} alt="" />
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
              <NextButton className="objectives-next thinking-start" label={copy.start} href="/gradem1/exp1/materials" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
