import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/vocabulary.css'
import './exp2.css'

const words = [
  { th: 'ความหนาแน่น', ms: 'ketumpatan', en: 'density' },
  { th: 'มวล', ms: 'jisim', en: 'mass' },
  { th: 'ปริมาตร', ms: 'isi padu', en: 'volume' },
  { th: 'ลอย / จม', ms: 'terapung/tenggelam', en: 'float / sink' },
  { th: 'น้ำเกลือ', ms: 'air garam', en: 'salt water' },
  { th: 'ตัวแปร', ms: 'pemboleh ubah', en: 'variable' },
]

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'คำศัพท์วิทยาศาสตร์ 3 ภาษา', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Kosa Kata Sains dalam 3 Bahasa', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Science Vocabulary in 3 Languages', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string; next: string; language: string
}>

export function Experiment2VocabularyPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp2" label={copy.back} />
          <div className="objectives-title exp2-title">
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
            <img src={densityImage} alt="" />
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
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp2/science-skills" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
