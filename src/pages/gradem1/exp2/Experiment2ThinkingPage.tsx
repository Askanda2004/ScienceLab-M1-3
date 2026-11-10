import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import coastImage from '../../../assets/grade-m1-coast.svg'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/thinking.css'
import './exp2.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'สถานการณ์ชวนคิด', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    prompt: 'เคยสงสัยไหมว่า...', question: 'ทำไมเราลอยตัวในทะเลได้ง่ายกว่าในสระน้ำจืด?',
    story: 'ที่หาดอ่าวปัตตานี ฟีรดาลีสลอยตัวในทะเลได้สบาย ๆ ข้างเรือกอและ แต่เมื่อวานเขาลงสระน้ำจืดแล้วตัวจมง่ายกว่ามาก อามีนะจึงสงสัยว่าน้ำสองแบบต่างกันอย่างไร...',
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Situasi untuk difikirkan', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    prompt: 'Pernahkah anda tertanya-tanya...', question: 'Mengapakah lebih mudah untuk terapung di laut berbanding kolam air tawar?',
    story: 'Di Pantai Teluk Pattani, Firdalis terapung dengan mudah di laut berhampiran perahu. Namun semalam, dia lebih mudah tenggelam di kolam air tawar. Amina tertanya-tanya apakah perbezaan antara kedua-dua air itu...',
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'A Situation to Think About', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    prompt: 'Have you ever wondered...', question: 'Why is it easier to float in the sea than in a freshwater pool?',
    story: 'At Pattani Bay, Firdalis floats easily in the sea beside a local boat. Yesterday, though, he sank much more easily in a freshwater pool. Amina wonders how the two kinds of water are different...',
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  prompt: string; question: string; story: string; start: string; language: string
}>

export function Experiment2ThinkingPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/science-skills" label={copy.back} />
          <div className="objectives-title exp2-title">
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
            <img src={densityImage} alt="" />
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
              <NextButton className="objectives-next thinking-start" label={copy.start} href="/gradem1/exp2/materials" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
