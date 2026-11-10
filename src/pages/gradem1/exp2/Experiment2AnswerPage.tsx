import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/answer.css'
import './exp2.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามนี้มีคำตอบ', experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    questionOne: 'ทำไมเราลอยตัวในน้ำทะเลได้ง่ายกว่าน้ำจืด?', answerOne: 'น้ำทะเลมีเกลือละลายอยู่ จึงหนาแน่นกว่าน้ำจืด น้ำทะเลจึงพยุงตัวเราได้ดีกว่า',
    questionTwo: 'สมมติฐานของคุณถูกหรือไม่?', answerTwo: 'เมื่อเพิ่มปริมาณเกลือ ความหนาแน่นของน้ำเกลือจะเพิ่มขึ้น ไข่เริ่มลอยเมื่อใส่เกลือ 3 ช้อนชา เพราะน้ำเกลือมีความหนาแน่นประมาณ 1.09 g/mL ซึ่งมากกว่าไข่ที่มีความหนาแน่น 1.07 g/mL',
    answer: 'เฉลย', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Kini Kita Tahu Jawapannya', experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', badge: 'PISA 2 · Reka bentuk · Tafsir data',
    questionOne: 'Mengapa lebih mudah terapung di air laut berbanding air tawar?', answerOne: 'Air laut mengandungi garam terlarut, jadi ketumpatannya lebih tinggi daripada air tawar dan menyokong badan dengan lebih baik.',
    questionTwo: 'Adakah hipotesis anda betul?', answerTwo: 'Apabila jumlah garam bertambah, ketumpatan air garam meningkat. Telur mula terapung dengan 3 sudu teh garam kerana ketumpatan larutan kira-kira 1.09 g/mL, lebih tinggi daripada ketumpatan telur 1.07 g/mL.',
    answer: 'Jawapan', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Now We Know the Answer', experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', badge: 'PISA 2 · Design · Interpret data',
    questionOne: 'Why is it easier to float in seawater than in fresh water?', answerOne: 'Seawater contains dissolved salt, making it denser than fresh water, so it supports us better.',
    questionTwo: 'Was your hypothesis correct?', answerTwo: 'As more salt is added, the salt water becomes denser. The egg begins to float with 3 teaspoons of salt because the solution is about 1.09 g/mL, denser than the egg at 1.07 g/mL.',
    answer: 'Answer', next: 'Next', language: 'Choose language',
  },
} satisfies Record<Language, Record<string, string>>

export function Experiment2AnswerPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]

  return (
    <main className="objectives-page answer-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content answer-content">
        <header className="objectives-header answer-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/results" label={text.back} />
          <div className="objectives-title answer-title">
            <span className="objectives-number">10</span>
            <h1>{text.title}</h1>
          </div>
        </header>

        <div className="objectives-layout answer-layout">
          <aside className="objectives-sidecard answer-sidecard">
            <h2>{text.experiment}</h2>
            <img src={densityImage} alt="" />
            <h3>{text.mystery}</h3>
            <span className="pisa-badge">{text.badge}</span>
          </aside>

          <div className="answer-main">
            <section className="answer-panel" aria-label={text.title}>
              <article className="answer-card answer-card-warm">
                <h2>1. {text.questionOne}</h2>
                <div className="answer-copy"><span className="answer-badge">{text.answer}</span><p>{text.answerOne}</p></div>
              </article>
              <article className="answer-card answer-card-cool">
                <h2>2. {text.questionTwo}</h2>
                <div className="answer-copy"><span className="answer-badge">{text.answer}</span><p>{text.answerTwo}</p></div>
              </article>
            </section>
            <div className="answer-actions">
              <NextButton className="answer-next" label={text.next} href="/gradem1/exp2/pisa" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
    </main>
  )
}
