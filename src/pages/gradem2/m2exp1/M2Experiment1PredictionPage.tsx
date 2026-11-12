import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-prediction.css'

const PREDICTION_KEY = 'science-lab-m2-exp1-prediction'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามชวนคิด', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    question: 'ถ้าเพิ่มอุณหภูมิน้ำจาก 10 °C เป็น 80 °C น้ำตาลและเกลือจะละลายได้มากขึ้นเท่ากันหรือไม่?',
    instruction: 'ทำนายก่อนทดลอง — เลือก 1 ข้อ',
    options: ['ทั้งสองอย่างละลายได้มากขึ้นเท่า ๆ กัน', 'น้ำตาลละลายได้มากขึ้นมาก ส่วนเกลือเพิ่มเพียงเล็กน้อย', 'อุณหภูมิไม่มีผล ขึ้นกับการคนอย่างเดียว'],
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Soalan untuk difikirkan', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    question: 'Jika suhu air meningkat daripada 10 °C kepada 80 °C, adakah gula dan garam menjadi lebih larut dengan kadar yang sama?',
    instruction: 'Buat ramalan sebelum eksperimen — pilih satu jawapan',
    options: ['Kedua-duanya menjadi lebih larut pada kadar yang sama', 'Keterlarutan gula meningkat lebih banyak berbanding garam', 'Suhu tidak memberi kesan; hanya pengacauan yang penting'],
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Think About It', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    question: 'If water temperature rises from 10 °C to 80 °C, will sugar and salt dissolve in greater amounts equally?',
    instruction: 'Make a prediction before the experiment — choose one answer',
    options: ['Both dissolve more by about the same amount', 'Sugar solubility increases much more than salt solubility', 'Temperature has no effect; only stirring matters'],
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; question: string; instruction: string; options: string[]; start: string; language: string
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

export function M2Experiment1PredictionPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [selectedOption, setSelectedOption] = useState<number | null>(readSavedPrediction)
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-prediction-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/procedure" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">8</span>
            <h1>{copy.title}</h1>
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
            <section className="m2-objectives-panel m2-prediction-panel" aria-label={copy.title}>
              <h2 className="m2-prediction-question">{copy.question}</h2>
              <h3 className="m2-prediction-instruction">{copy.instruction}</h3>
              <fieldset className="m2-prediction-options">
                <legend className="m2-visually-hidden">{copy.instruction}</legend>
                {copy.options.map((option, index) => (
                  <label className={`m2-prediction-option${selectedOption === index ? ' is-selected' : ''}`} key={option}>
                    <input
                      type="radio"
                      name="m2-prediction"
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
                    <span className="m2-prediction-letter">{optionLetters[language][index]}</span>
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next m2-prediction-start" label={copy.start} href="/gradem2/m2exp1/lab" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
