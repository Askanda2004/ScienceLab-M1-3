import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/vocabulary.css'
import './exp3.css'

const words = [
  { th: 'น้ำกลั่น', ms: 'air suling', en: 'distilled water' },
  { th: 'การระเหย', ms: 'penyejatan', en: 'evaporation' },
  { th: 'ตะกรัน', ms: 'kerak', en: 'scale (deposit)' },
  { th: 'ของแข็งที่ละลายน้ำ', ms: 'pepejal terlarut', en: 'dissolved solids' },
  { th: 'หลักฐาน', ms: 'bukti', en: 'evidence' },
  { th: 'สารผสม', ms: 'campuran', en: 'mixture' },
]

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำศัพท์วิทยาศาสตร์ 3 ภาษา', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Kosa Kata Sains dalam 3 Bahasa', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Science Vocabulary in 3 Languages', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string; next: string; language: string
}>

export function Experiment3VocabularyPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp3" label={copy.back} />
          <div className="objectives-title exp3-title">
            <span className="objectives-number">2</span>
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
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp3/science-skills" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
