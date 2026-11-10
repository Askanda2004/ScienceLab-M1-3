import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/science-skills.css'
import './exp3.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ทักษะกระบวนการทางวิทยาศาสตร์', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
    cards: [
      ['ทักษะการสังเกต', 'ส่องแว่นขยายดูคราบที่เหลือหลังระเหยน้ำจนแห้ง'],
      ['ทักษะการจำแนกประเภท', 'จัดน้ำแต่ละชนิดเป็นสารบริสุทธิ์หรือสารผสม'],
      ['ทักษะการตีความหมายข้อมูล', 'เปรียบเทียบค่า TDS กับปริมาณคราบของน้ำ 4 ชนิด'],
      ['ทักษะการลงความเห็นจากข้อมูล', 'เลือกน้ำให้เหมาะกับงานโดยใช้หลักฐานและราคา'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Kemahiran Proses Sains', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    cards: [
      ['Kemahiran memerhati', 'Gunakan kanta pembesar untuk melihat sisa selepas air tersejat hingga kering'],
      ['Kemahiran mengelaskan', 'Kelaskan setiap jenis air sebagai bahan tulen atau campuran'],
      ['Mentafsir data', 'Bandingkan bacaan TDS dengan jumlah sisa bagi 4 jenis air'],
      ['Membuat inferens daripada data', 'Pilih air yang sesuai berdasarkan bukti dan harga'],
    ],
  },
  en: {
    back: 'Back', title: 'Science Process Skills', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    next: 'Continue', language: 'Choose language',
    cards: [
      ['Observation skills', 'Use a magnifying glass to inspect residue after the water evaporates completely'],
      ['Classification skills', 'Classify each water sample as a pure substance or a mixture'],
      ['Interpreting data', 'Compare TDS readings with the amount of residue from 4 water samples'],
      ['Drawing conclusions from data', 'Choose the right water for a task using evidence and price'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; cards: [string, string][]
}>

export function Experiment3ScienceSkillsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp3/vocabulary" label={copy.back} />
          <div className="objectives-title exp3-title">
            <span className="objectives-number">3</span>
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
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp3/thinking" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
