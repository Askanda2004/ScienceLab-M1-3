import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp3-vocabulary.css'

const terms = [
  { th: 'การเจือจาง', ms: 'pencairan', en: 'dilution' },
  { th: 'กรดฟอร์มิก', ms: 'asid formik', en: 'formic acid' },
  { th: 'น้ำยางสด', ms: 'susu getah', en: 'latex' },
  { th: 'การจับตัวของยาง', ms: 'pembekuan getah', en: 'coagulation' },
  { th: 'อุปกรณ์ป้องกัน', ms: 'alat pelindung', en: 'safety gear (PPE)' },
  { th: 'กัดกร่อน', ms: 'menghakis', en: 'corrosive' },
]

const translations = {
  th: {
    back: 'ย้อนกลับ', title: 'คำศัพท์วิทยาศาสตร์ 3 ภาษา', experiment: 'การทดลองที่ 3',
    mystery: 'การเจือจาง\nอย่างปลอดภัย', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    thai: 'ภาษาไทย', malay: 'ภาษามลายูถิ่น', english: 'ภาษาอังกฤษ', audio: 'ฟังเสียง',
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Kosa Kata Sains dalam 3 Bahasa', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\ndengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    thai: 'Bahasa Thai', malay: 'Bahasa Melayu', english: 'Bahasa Inggeris', audio: 'Dengar',
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Science Vocabulary in 3 Languages', experiment: 'Experiment 3',
    mystery: 'Safe acid\ndilution', pisa: 'PISA 3 · Use data to decide',
    thai: 'Thai', malay: 'Malay', english: 'English', audio: 'Listen',
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  thai: string; malay: string; english: string; audio: string; next: string; language: string
}>

function speakEnglish(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  window.speechSynthesis.speak(utterance)
}

export function M2Experiment3VocabularyPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="m2-objectives-page m2-exp3-vocabulary-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp3/objectives" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">2</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-vocabulary-art" aria-hidden="true">🪣</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-exp3-vocabulary-panel" aria-label={copy.title}>
              <div className="m2-exp3-vocabulary-scroll">
                <table className="m2-exp3-vocabulary-table">
                  <thead>
                    <tr>
                      <th scope="col">{copy.thai}</th>
                      <th scope="col">{copy.malay}</th>
                      <th scope="col">{copy.english}</th>
                      <th scope="col">{copy.audio}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terms.map((term) => (
                      <tr key={term.en}>
                        <th scope="row">{term.th}</th>
                        <td>{term.ms}</td>
                        <td>{term.en}</td>
                        <td>
                          <button className="m2-exp3-vocabulary-audio" type="button" onClick={() => speakEnglish(term.en)} aria-label={`${copy.audio}: ${term.en}`}>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5-.5a5 5 0 0 1 0 7m2.5-9.5a8.5 8.5 0 0 1 0 12" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp3/science-skills" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
