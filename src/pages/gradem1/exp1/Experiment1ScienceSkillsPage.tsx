import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './science-skills.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ทักษะกระบวนการทางวิทยาศาสตร์', experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', pisa: 'PISA 1 · อธิบายปรากฏการณ์', next: 'ต่อไป', language: 'เลือกภาษา',
    cards: [
      ['ทักษะการวัด', 'ใช้เทอร์มอมิเตอร์วัดอุณหภูมิของเหลวทุก 1 นาทีจนเดือด'],
      ['ทักษะการจัดกระทำและสื่อความหมายข้อมูล', 'บันทึกค่าลงตาราง แล้วเขียนกราฟอุณหภูมิ–เวลา'],
      ['ทักษะการตีความหมายข้อมูลและลงข้อสรุป', 'อ่านช่วงราบของกราฟ แล้วสรุปว่าของเหลวใดเป็นสารบริสุทธิ์'],
      ['ทักษะการกำหนดและควบคุมตัวแปร', 'ใช้น้ำ 200 mL ใช้ไฟระดับเดียวกัน และอุณหภูมิเริ่มต้นเท่ากัน'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Kemahiran Proses Sains', experiment: 'Eksperimen 1',
    mystery: 'Misteri air gula Mana', pisa: 'PISA 1 · Menjelaskan fenomena', next: 'Seterusnya', language: 'Pilih bahasa',
    cards: [
      ['Kemahiran mengukur', 'Gunakan termometer untuk mengukur suhu cecair setiap 1 minit sehingga mendidih'],
      ['Mengurus dan menyampaikan data', 'Rekodkan bacaan dalam jadual, kemudian lukis graf suhu-masa'],
      ['Mentafsir data dan membuat kesimpulan', 'Baca bahagian mendatar graf dan tentukan cecair yang merupakan bahan tulen'],
      ['Menentukan dan mengawal pemboleh ubah', 'Gunakan 200 mL air, tahap pemanasan yang sama dan suhu awal yang sama'],
    ],
  },
  en: {
    back: 'Back', title: 'Science Process Skills', experiment: 'Experiment 1',
    mystery: "Mana's Sugar Water Mystery", pisa: 'PISA 1 · Explain phenomena', next: 'Continue', language: 'Choose language',
    cards: [
      ['Measurement skills', 'Use a thermometer to measure the liquid temperature every minute until it boils'],
      ['Organizing and communicating data', 'Record measurements in a table, then draw a temperature-time graph'],
      ['Interpreting data and drawing conclusions', 'Read the flat part of the graph to identify which liquid is a pure substance'],
      ['Identifying and controlling variables', 'Use 200 mL of water, the same heat setting and the same starting temperature'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string;
  cards: [string, string][]
}>

export function Experiment1ScienceSkillsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/vocabulary" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">4</span>
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
            <section className="science-skills-panel" aria-label={copy.title}>
              <ol className="science-skills-grid">
                {copy.cards.map(([title, description], index) => (
                  <li className={`science-skill-card science-skill-card-${index + 1}`} key={title}>
                    <div className="science-skill-heading">
                      <span>{index + 1}</span>
                      <h2>{title}</h2>
                    </div>
                    <p>{description}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp1/thinking" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
