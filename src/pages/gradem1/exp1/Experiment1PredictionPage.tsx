import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './prediction.css'

const PREDICTION_KEY = 'science-lab-exp1-prediction'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามชวนคิด', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 1 ปริศนาหม้อน้ำเชื่อมของมะนะ',
    experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    question: 'เมื่อน้ำกลั่นเดือดแล้ว ถ้ายังให้ความร้อนต่อไป อุณหภูมิจะเพิ่มขึ้นอีกหรือไม่? แล้วน้ำเกลือล่ะ?',
    instruction: 'ทำนายก่อนทดลอง — เลือก 1 ข้อ',
    options: ['ทั้งสองอย่างเพิ่มขึ้นเรื่อย ๆ', 'น้ำกลั่นคงที่ ส่วนน้ำเกลือยังเพิ่มขึ้น', 'ทั้งสองอย่างคงที่เท่ากัน'],
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Soalan untuk difikirkan', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 1',
    experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana', pisa: 'PISA 1 · Menjelaskan fenomena',
    question: 'Selepas air suling mendidih, adakah suhunya terus meningkat jika dipanaskan? Bagaimana pula dengan air garam?',
    instruction: 'Buat ramalan sebelum eksperimen — pilih satu jawapan',
    options: ['Suhu kedua-duanya terus meningkat', 'Suhu air suling kekal, air garam terus meningkat', 'Suhu kedua-duanya kekal sama'],
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Think About It', subtitle: 'M.1 · Matter Around Us · Experiment 1',
    experiment: 'Experiment 1', mystery: "Mana’s Sugar Water Mystery", pisa: 'PISA 1 · Explain phenomena',
    question: 'After distilled water boils, will its temperature keep rising if heated further? What about salt water?',
    instruction: 'Make a prediction before the experiment — choose one answer',
    options: ['Both temperatures keep rising', 'Distilled water stays steady; salt water rises', 'Both temperatures stay the same'],
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  question: string; instruction: string; options: string[]; start: string; language: string
}>

const optionLetters = { th: ['ก', 'ข', 'ค'], ms: ['A', 'B', 'C'], en: ['A', 'B', 'C'] } satisfies Record<Language, string[]>

function readSavedPrediction(): number | null {
  try {
    const saved = window.localStorage.getItem(PREDICTION_KEY)
    if (saved === null) return null
    const value = Number(saved)
    return Number.isInteger(value) && value >= 0 && value <= 2 ? value : null
  } catch {
    return null
  }
}

export function Experiment1PredictionPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [selectedOption, setSelectedOption] = useState<number | null>(readSavedPrediction)
  const copy = content[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/procedure" label={copy.back} />
          <div className="objectives-title prediction-title">
            <span className="objectives-number">8</span>
            <div><h1>{copy.title}</h1></div>
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
            <section className="prediction-panel" aria-label={copy.title}>
              <h2 className="prediction-question">{copy.question}</h2>
              <h3 className="prediction-instruction">{copy.instruction}</h3>
              <fieldset className="prediction-options">
                <legend className="visually-hidden">{copy.instruction}</legend>
                {copy.options.map((option, index) => (
                  <label className={`prediction-option${selectedOption === index ? ' is-selected' : ''}`} key={option}>
                    <input
                      type="radio"
                      name="prediction"
                      checked={selectedOption === index}
                      onChange={() => {
                        setSelectedOption(index)
                        try {
                          window.localStorage.setItem(PREDICTION_KEY, String(index))
                        } catch {
                          // Keep the selected answer usable if storage is unavailable.
                        }
                      }}
                    />
                    <span className="prediction-letter">{optionLetters[language][index]}</span>
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next prediction-start" label={copy.start} href="/gradem1/exp1/lab" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
