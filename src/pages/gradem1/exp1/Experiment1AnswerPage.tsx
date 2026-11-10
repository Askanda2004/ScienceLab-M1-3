import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './answer.css'

const PREDICTION_KEY = 'science-lab-exp1-prediction'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามนี้มีคำตอบ', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    questionOne: 'ทำไมหม้อน้ำเชื่อมถึงเดือดช้ากว่าหม้อน้ำเปล่า?', answerOne: 'น้ำเชื่อมเป็นสารผสม มีจุดเดือดสูงกว่าน้ำ จึงต้องรับความร้อนนานกว่าจึงจะถึงจุดเดือด',
    questionTwo: 'น้ำกลั่นเดือดแล้วอุณหภูมิคงที่หรือไม่? แล้วน้ำเกลือล่ะ?', answerTwo: 'น้ำกลั่นคงที่ที่ประมาณ 100 °C ส่วนน้ำเกลือมีจุดเดือดสูงกว่า และอุณหภูมิอาจเพิ่มขึ้นเมื่อน้ำระเหยจนสารละลายเข้มข้นขึ้น',
    prediction: 'คำทำนายของคุณ', choices: ['ทั้งสองอย่างเพิ่มขึ้นเรื่อย ๆ', 'น้ำกลั่นคงที่ ส่วนน้ำเกลือยังเพิ่มขึ้น', 'ทั้งสองอย่างคงที่เท่ากัน'], correct: 'ตรงกับผลการทดลอง ได้ดาว +1 ⭐', incorrect: 'คำทำนายยังไม่ตรงกับผลการทดลอง ลองทบทวนสิ่งที่สังเกตได้อีกครั้ง', noPrediction: 'ดูผลการทดลองแล้วลองตอบคำถามด้วยตัวเอง', answer: 'เฉลย', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Kini Kita Tahu Jawapannya', experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana', pisa: 'PISA 1 · Menjelaskan fenomena',
    questionOne: 'Mengapa air gula mendidih lebih lambat daripada air biasa?', answerOne: 'Air gula ialah campuran dengan takat didih lebih tinggi, jadi ia perlu menerima haba lebih lama sebelum mendidih.',
    questionTwo: 'Adakah suhu air suling kekal selepas mendidih? Bagaimana pula dengan air garam?', answerTwo: 'Air suling kekal sekitar 100 °C. Air garam mempunyai takat didih lebih tinggi dan suhunya boleh meningkat apabila air tersejat lalu larutan menjadi lebih pekat.',
    prediction: 'Ramalan anda', choices: ['Kedua-duanya terus meningkat', 'Air suling kekal, air garam meningkat', 'Kedua-duanya kekal sama'], correct: 'Ramalan anda sepadan dengan keputusan! Bintang +1 ⭐', incorrect: 'Ramalan anda belum sepadan. Cuba semak semula pemerhatian anda.', noPrediction: 'Gunakan keputusan eksperimen untuk fikirkan jawapannya.', answer: 'Jawapan', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Now We Know the Answer', experiment: 'Experiment 1', mystery: "Mana’s Sugar Water Mystery", pisa: 'PISA 1 · Explain phenomena',
    questionOne: 'Why does sugar water boil more slowly than plain water?', answerOne: 'Sugar water is a mixture with a higher boiling point, so it needs to absorb heat for longer before it boils.',
    questionTwo: 'Does distilled water stay at the same temperature after boiling? What about salt water?', answerTwo: 'Distilled water stays near 100 °C. Salt water has a higher boiling point, and its temperature may rise as water evaporates and the solution becomes more concentrated.',
    prediction: 'Your prediction', choices: ['Both keep rising', 'Distilled water stays steady; salt water rises', 'Both stay the same'], correct: 'Your prediction matches the results! +1 star ⭐', incorrect: 'Your prediction does not match the results yet. Review what you observed.', noPrediction: 'Use the experiment results to think through the answers.', answer: 'Answer', next: 'Next', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  questionOne: string; answerOne: string; questionTwo: string; answerTwo: string;
  prediction: string; choices: string[]; correct: string; incorrect: string; noPrediction: string; answer: string; next: string; language: string
}>

function readPrediction(): number | null {
  try {
    const value = window.localStorage.getItem(PREDICTION_KEY)
    if (value === null) return null
    const prediction = Number(value)
    return Number.isInteger(prediction) && prediction >= 0 && prediction <= 2 ? prediction : null
  } catch {
    return null
  }
}

export function Experiment1AnswerPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [prediction] = useState(readPrediction)
  const copy = content[language]

  return (
    <main className="objectives-page answer-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content answer-content">
        <header className="objectives-header answer-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/results" label={copy.back} />
          <div className="objectives-title answer-title">
            <span className="objectives-number">11</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="objectives-layout answer-layout">
          <aside className="objectives-sidecard answer-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={boilingImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="answer-main">
          <section className="answer-panel" aria-label={copy.title}>
            <article className="answer-card answer-card-warm">
              <h2>1. {copy.questionOne}</h2>
              <div className="answer-copy"><span className="answer-badge">{copy.answer}</span><p>{copy.answerOne}</p></div>
            </article>
            <article className="answer-card answer-card-cool">
              <h2>2. {copy.questionTwo}</h2>
              <div className="answer-copy"><span className="answer-badge">{copy.answer}</span><p>{copy.answerTwo}</p></div>
            </article>

            <p className={`answer-prediction${prediction === 1 ? ' is-correct' : prediction === null ? ' has-no-prediction' : ' is-incorrect'}`}>
              {prediction === null
                ? copy.noPrediction
                : <><strong>{copy.prediction}:</strong> {language === 'th' ? `${String.fromCharCode(3585 + prediction)}) ` : `${String.fromCharCode(65 + prediction)}. `}{copy.choices[prediction]} · {prediction === 1 ? copy.correct : copy.incorrect}</>}
            </p>

          </section>
            <div className="answer-actions">
              <NextButton className="answer-next" label={copy.next} href="/gradem1/exp1/pisa" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={content[language].language} onLanguageChange={setLanguage} />
    </main>
  )
}
