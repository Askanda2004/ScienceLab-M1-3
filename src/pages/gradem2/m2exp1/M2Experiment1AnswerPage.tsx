import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-answer.css'

const copyByLanguage = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามนี้มีคำตอบ', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    questionOne: 'ทำไมชาเย็นมีน้ำตาลค้างก้นแก้ว แต่ชาร้อนละลายหมด?', answerOne: 'น้ำเย็นมีสภาพละลายได้ของน้ำตาลน้อยกว่าน้ำร้อน เมื่อใส่เกินค่านี้สารละลายจะอิ่มตัว น้ำตาลส่วนเกินจึงค้างก้นแก้ว',
    questionTwo: 'เพิ่มอุณหภูมิ น้ำตาลกับเกลือละลายได้มากขึ้นเท่ากันไหม?', answerTwo: 'ไม่เท่ากัน น้ำตาลเพิ่มจาก 190 เป็น 360 g แต่เกลือเพิ่มจาก 36 เป็น 38 g สภาพละลายได้จึงขึ้นกับชนิดของตัวละลายด้วย',
    question: 'คำถาม', answer: 'เฉลย', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Kini Kita Tahu Jawapannya', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    questionOne: 'Mengapa gula tertinggal di dasar teh sejuk tetapi larut dalam teh panas?', answerOne: 'Air sejuk melarutkan kurang gula berbanding air panas. Apabila jumlah gula melebihi had ini, larutan menjadi tepu dan gula berlebihan tertinggal di dasar gelas.',
    questionTwo: 'Adakah gula dan garam melarut lebih banyak pada kadar yang sama apabila suhu meningkat?', answerTwo: 'Tidak. Gula meningkat daripada 190 kepada 360 g, tetapi garam hanya daripada 36 kepada 38 g. Keterlarutan juga bergantung pada jenis bahan terlarut.',
    question: 'Soalan', answer: 'Jawapan', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Now We Know the Answer', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    questionOne: 'Why does sugar remain at the bottom of iced tea but dissolve in hot tea?', answerOne: 'Cold water can dissolve less sugar than hot water. Once that limit is exceeded, the solution is saturated, so the extra sugar stays at the bottom of the glass.',
    questionTwo: 'Do sugar and salt dissolve more equally as the temperature rises?', answerTwo: 'No. Sugar increases from 190 to 360 g, while salt only increases from 36 to 38 g. Solubility also depends on the type of solute.',
    question: 'Question', answer: 'Answer', next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  questionOne: string; answerOne: string; questionTwo: string; answerTwo: string;
  question: string; answer: string; next: string; language: string
}>

export function M2Experiment1AnswerPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [revealedAnswers, setRevealedAnswers] = useState([false, false])
  const copy = copyByLanguage[language]
  const hideAnswerLabel = language === 'th' ? 'ซ่อนเฉลย' : language === 'ms' ? 'Sembunyikan jawapan' : 'Hide answer'

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((current) => current.map((revealed, item) => item === index ? !revealed : revealed))
  }

  return (
    <main className="m2-objectives-page m2-answer-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-answer-content">
        <header className="m2-objectives-header m2-answer-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/results" label={copy.back} />
          <div className="m2-objectives-title m2-answer-title">
            <span className="m2-objectives-number">11</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="m2-objectives-layout m2-answer-layout">
          <aside className="m2-objectives-sidecard m2-answer-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-answer-cup" aria-hidden="true">☕</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>

          <section className="m2-answer-panel" aria-label={copy.title}>
            <article className="m2-answer-card m2-answer-card-warm">
              <div className="m2-answer-question"><span className="m2-answer-section-label">{copy.question}</span><h2>1. {copy.questionOne}</h2></div>
              <button className="m2-answer-reveal" type="button" aria-expanded={revealedAnswers[0]} onClick={() => toggleAnswer(0)}>
                {revealedAnswers[0] ? hideAnswerLabel : copy.answer}
              </button>
              {revealedAnswers[0] && <div className="m2-answer-copy"><span className="m2-answer-section-label">{copy.answer}</span><p>{copy.answerOne}</p></div>}
            </article>
            <article className="m2-answer-card m2-answer-card-cool">
              <div className="m2-answer-question"><span className="m2-answer-section-label">{copy.question}</span><h2>2. {copy.questionTwo}</h2></div>
              <button className="m2-answer-reveal" type="button" aria-expanded={revealedAnswers[1]} onClick={() => toggleAnswer(1)}>
                {revealedAnswers[1] ? hideAnswerLabel : copy.answer}
              </button>
              {revealedAnswers[1] && <div className="m2-answer-copy"><span className="m2-answer-section-label">{copy.answer}</span><p>{copy.answerTwo}</p></div>}
            </article>
          </section>
        </div>
      </div>
      <div className="m2-answer-actions">
        <NextButton className="m2-answer-next" label={copy.next} href="/gradem2/m2exp1/pisa" />
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
