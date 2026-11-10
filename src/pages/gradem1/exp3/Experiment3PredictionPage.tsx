import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/prediction.css'
import './exp3.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำถามชวนคิด', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    question: 'เมื่อระเหยน้ำจนแห้ง น้ำชนิดใดจะเหลือคราบมากที่สุด?',
    instruction: 'ทำนายก่อนทดลอง — เรียงคราบจากน้อยไปมาก (เลือก 1 ข้อ)',
    options: [
      'น้ำกลั่น → น้ำฝน → น้ำประปา → น้ำบ่อ',
      'น้ำฝน → น้ำกลั่น → น้ำบ่อ → น้ำประปา',
      'น้ำประปา → น้ำบ่อ → น้ำฝน → น้ำกลั่น',
    ], start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Soalan untuk difikirkan', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    question: 'Selepas air tersejat hingga kering, jenis air yang manakah meninggalkan sisa paling banyak?',
    instruction: 'Buat ramalan — susun sisa daripada paling sedikit kepada paling banyak (pilih satu)',
    options: [
      'Air suling → Air hujan → Air paip → Air perigi',
      'Air hujan → Air suling → Air perigi → Air paip',
      'Air paip → Air perigi → Air hujan → Air suling',
    ], start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Think About It', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    question: 'After the water evaporates completely, which type will leave the most residue?',
    instruction: 'Predict the order from least residue to most (choose one)',
    options: [
      'Distilled → Rainwater → Tap water → Well water',
      'Rainwater → Distilled → Well water → Tap water',
      'Tap water → Well water → Rainwater → Distilled',
    ], start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  question: string; instruction: string; options: string[]; start: string; language: string
}>

const letters = { th: ['ก', 'ข', 'ค'], ms: ['A', 'B', 'C'], en: ['A', 'B', 'C'] } satisfies Record<Language, string[]>

export function Experiment3PredictionPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp3/procedure" label={copy.back} />
          <div className="objectives-title exp3-title prediction-title">
            <span className="objectives-number">7</span>
            <div>
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={tdsImage} alt="" />
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
                    <input type="radio" name="exp3-prediction" checked={selectedOption === index} onChange={() => setSelectedOption(index)} />
                    <span className="prediction-letter">{letters[language][index]}</span>
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next prediction-start" label={copy.start} />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
