import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './vocabulary.css'

const words = [
  { th: 'สารบริสุทธิ์', ms: 'bahan tulen', en: 'pure substance' },
  { th: 'สารผสม', ms: 'campuran', en: 'mixture' },
  { th: 'จุดเดือด', ms: 'takat didih', en: 'boiling point' },
  { th: 'อุณหภูมิ', ms: 'suhu', en: 'temperature' },
  { th: 'น้ำกลั่น', ms: 'air suling', en: 'distilled water' },
  { th: 'ละลาย', ms: 'larut', en: 'dissolve' },
]

const translations = {
  th: {
    back: 'ย้อนกลับ',
    title: 'คำศัพท์วิทยาศาสตร์ 3 ภาษา',
    experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ',
    pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    next: 'ต่อไป',
    language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali',
    title: 'Kosa Kata Sains dalam 3 Bahasa',
    experiment: 'Eksperimen 1',
    mystery: 'Misteri air gula Mana',
    pisa: 'PISA 1 · Menjelaskan fenomena',
    next: 'Seterusnya',
    language: 'Pilih bahasa',
  },
  en: {
    back: 'Back',
    title: 'Science Vocabulary in 3 Languages',
    experiment: 'Experiment 1',
    mystery: "Mana's Sugar Water Mystery",
    pisa: 'PISA 1 · Explain phenomena',
    next: 'Continue',
    language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string
  title: string
  experiment: string
  mystery: string
  pisa: string
  next: string
  language: string
}>

export function Experiment1VocabularyPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/learning-objectives" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">3</span>
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
            <section className="vocabulary-panel" aria-label={copy.title}>
              <div className="vocabulary-scroll">
                <table className="vocabulary-table">
                  <thead>
                    <tr>
                      <th scope="col">ภาษาไทย</th>
                      <th scope="col">ภาษามลายูถิ่น</th>
                      <th scope="col">ภาษาอังกฤษ</th>
                      <th scope="col">ฟังเสียง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {words.map((word) => (
                      <tr key={word.en}>
                        <th scope="row">{word.th}</th>
                        <td>{word.ms}</td>
                        <td>{word.en}</td>
                        <td>
                          <button className="vocabulary-audio" type="button" disabled aria-label={`ฟังเสียง: ${word.th}`} title="เพิ่มเสียงภายหลัง">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5-.5a5 5 0 0 1 0 7m2.5-9.5a8.5 8.5 0 0 1 0 12" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp1/science-skills" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
