import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp2-answer.css'

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามนี้มีคำตอบ', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    questionLabel: 'คำถาม', reveal: 'เฉลย', hide: 'ซ่อนเฉลย', next: 'ต่อไป', language: 'เลือกภาษา',
    questionOne: 'ทำไม ORS 1 ซองต้องผสมน้ำ 250 mL พอดี?', answerOne: 'ผง 5 g ในน้ำ 250 mL ได้ความเข้มข้น 2% พอดี ถ้าน้ำมากไปจะเจือจางเกิน น้องได้เกลือแร่ไม่พอ ถ้าน้ำน้อยไปจะเข้มข้นเกิน',
    questionTwo: 'ถ้าใช้น้ำแค่ 125 mL จะเกิดอะไรขึ้น?', answerTwo: 'ความเข้มข้นเป็น 4% สูงกว่าช่วงเป้าหมาย 1.8–2.2% มาก อาจทำให้ท้องเสียมากขึ้น จึงไม่ปลอดภัย',
  },
  ms: {
    back: 'Kembali', title: 'Kini Kita Tahu Jawapannya', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', badge: 'PISA 2 · Mereka bentuk · Tafsir data',
    questionLabel: 'Soalan', reveal: 'Lihat jawapan', hide: 'Sembunyikan jawapan', next: 'Seterusnya', language: 'Pilih bahasa',
    questionOne: 'Mengapa satu paket ORS perlu dibancuh dengan tepat 250 mL air?', answerOne: '5 g serbuk dalam 250 mL air menghasilkan kepekatan 2%. Jika air terlalu banyak, larutan terlalu cair dan adik tidak mendapat garam mineral yang mencukupi. Jika air terlalu sedikit, larutan terlalu pekat.',
    questionTwo: 'Apakah yang berlaku jika hanya 125 mL air digunakan?', answerTwo: 'Kepekatannya menjadi 4%, jauh melebihi julat sasaran 1.8–2.2%. Ini boleh memburukkan cirit-birit dan tidak selamat.',
  },
  en: {
    back: 'Back', title: 'Now We Know the Answer', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', badge: 'PISA 2 · Design · Interpret data',
    questionLabel: 'Question', reveal: 'Show answer', hide: 'Hide answer', next: 'Next', language: 'Choose language',
    questionOne: 'Why must one ORS sachet be mixed with exactly 250 mL of water?', answerOne: 'Dissolving 5 g of powder in 250 mL of water gives a concentration of exactly 2%. Too much water makes it too dilute, so the child may not get enough electrolytes. Too little water makes it too concentrated.',
    questionTwo: 'What happens if only 125 mL of water is used?', answerTwo: 'The concentration becomes 4%, far above the target range of 1.8–2.2%. This may worsen diarrhea and is unsafe.',
  },
} satisfies Record<Language, Record<string, string>>

export function M2Experiment2AnswerPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [revealed, setRevealed] = useState([false, false])
  const text = copy[language]

  function toggleAnswer(index: number) {
    setRevealed((current) => current.map((value, item) => item === index ? !value : value))
  }

  return (
    <main className="m2-objectives-page m2-exp2-answer-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-exp2-answer-content">
        <header className="m2-objectives-header m2-exp2-answer-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/results" label={text.back} />
          <div className="m2-objectives-title m2-exp2-answer-title">
            <span className="m2-objectives-number">10</span><h1>{text.title}</h1>
          </div>
        </header>

        <div className="m2-objectives-layout m2-exp2-answer-layout">
          <aside className="m2-objectives-sidecard m2-exp2-answer-sidecard">
            <h2>{text.experiment}</h2><div className="m2-exp2-answer-icon" aria-hidden="true">🩺</div>
            <h3>{text.mystery}</h3><span className="m2-pisa-badge">{text.badge}</span>
          </aside>

          <section className="m2-exp2-answer-panel" aria-label={text.title}>
            {[0, 1].map((index) => {
              const isFirst = index === 0
              const question = isFirst ? text.questionOne : text.questionTwo
              const answer = isFirst ? text.answerOne : text.answerTwo
              return (
                <article className={`m2-exp2-answer-card ${isFirst ? 'warm' : 'cool'}${revealed[index] ? ' is-revealed' : ''}`} key={question}>
                  <span className="m2-exp2-answer-label">{text.questionLabel}</span>
                  <h2>{index + 1}. {question}</h2>
                  <button className="m2-exp2-reveal-button" type="button" aria-expanded={revealed[index]} onClick={() => toggleAnswer(index)}>
                    {revealed[index] ? text.hide : text.reveal}
                  </button>
                  {revealed[index] && <div className="m2-exp2-answer-copy" role="status">
                    <p>{answer}</p>
                  </div>}
                </article>
              )
            })}
            <div className="m2-exp2-answer-next"><NextButton className="m2-objectives-next" label={text.next} href="/gradem2/m2exp2/pisa" /></div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
    </main>
  )
}
