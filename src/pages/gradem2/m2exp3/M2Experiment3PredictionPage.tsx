import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-prediction.css'
import './m2-exp3-prediction.css'

const PREDICTION_KEY = 'science-lab-m2-exp3-prediction'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามชวนคิด', experiment: 'การทดลองที่ 3',
    mystery: 'น้ำกรดยาง\nของปะดอ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    question: 'ถ้าใช้น้ำกรด 10 % แทน 3 % ยางจะจับตัวเร็วขึ้น แล้วคุณภาพยางแผ่นจะเป็นอย่างไร?',
    instruction: 'ทำนายก่อนทดลอง — เลือก 1 ข้อ',
    options: [
      'เร็วขึ้น และคุณภาพยางแผ่นดีขึ้น',
      'เร็วขึ้น แต่แผ่นเปราะ กลิ่นฉุน และอันตรายกว่า',
      'ไม่ต่างกัน ความเข้มข้นของกรดไม่มีผล',
    ],
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Soalan untuk difikirkan', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\nlateks dengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    question: 'Jika asid 10% digunakan menggantikan 3%, lateks akan membeku lebih cepat. Bagaimanakah mutu kepingan getah?',
    instruction: 'Buat ramalan sebelum eksperimen — pilih satu jawapan',
    options: [
      'Lebih cepat dan mutu kepingan getah bertambah baik',
      'Lebih cepat tetapi kepingan rapuh, berbau kuat dan lebih berbahaya',
      'Tiada perbezaan; kepekatan asid tidak memberi kesan',
    ],
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Think About It', experiment: 'Experiment 3',
    mystery: 'Safe latex acid\ndilution', pisa: 'PISA 3 · Use data to decide',
    question: 'If 10% acid is used instead of 3%, latex will coagulate faster. What will happen to the quality of the rubber sheet?',
    instruction: 'Make a prediction before the experiment — choose one answer',
    options: [
      'It coagulates faster and the rubber sheet quality improves',
      'It coagulates faster, but the sheet is brittle, smells strong, and is more hazardous',
      'There is no difference; acid concentration has no effect',
    ],
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  question: string; instruction: string; options: string[]; start: string; language: string
}>

const optionLetters = { th: ['ก', 'ข', 'ค'], ms: ['A', 'B', 'C'], en: ['A', 'B', 'C'] } satisfies Record<Language, string[]>

function readSavedPrediction(): number | null {
  try {
    const saved = window.localStorage.getItem(PREDICTION_KEY)
    if (saved === null) return null
    const value = Number(saved)
    return Number.isInteger(value) && value >= 0 && value < 3 ? value : null
  } catch {
    return null
  }
}

export function M2Experiment3PredictionPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [selectedOption, setSelectedOption] = useState<number | null>(readSavedPrediction)
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp3-prediction-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp3/procedure" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">7</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-prediction-art" aria-hidden="true">🪣</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-prediction-panel" aria-label={copy.title}>
              <h2 className="m2-prediction-question">{copy.question}</h2>
              <h3 className="m2-prediction-instruction">{copy.instruction}</h3>
              <fieldset className="m2-prediction-options">
                <legend className="m2-visually-hidden">{copy.instruction}</legend>
                {copy.options.map((option, index) => (
                  <label className={`m2-prediction-option${selectedOption === index ? ' is-selected' : ''}`} key={option}>
                    <input
                      type="radio"
                      name="m2-exp3-prediction"
                      checked={selectedOption === index}
                      onChange={() => {
                        setSelectedOption(index)
                        try {
                          window.localStorage.setItem(PREDICTION_KEY, String(index))
                        } catch {
                          // Keep selection working if storage is unavailable.
                        }
                      }}
                    />
                    <span className="m2-prediction-letter">{optionLetters[language][index]}</span>
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next m2-prediction-start" label={copy.start} />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
