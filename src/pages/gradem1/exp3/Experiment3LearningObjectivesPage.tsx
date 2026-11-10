import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import './exp3.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'จุดประสงค์การเรียนรู้การทดลอง', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    lesson: 'การทดลองที่ 3 เรื่อง เลือกน้ำให้ถูกงาน', prompt: 'เมื่อทำการทดลองนี้จบ นักเรียนสามารถ',
    goals: [
      'เปรียบเทียบปริมาณของแข็งที่ละลายอยู่ในน้ำแต่ละชนิดได้',
      'จำแนกน้ำเป็นสารบริสุทธิ์หรือสารผสมจากหลักฐานได้',
      'ตัดสินใจเลือกน้ำสำหรับงานต่าง ๆ พร้อมให้เหตุผลเชิงวิทยาศาสตร์ได้',
    ], next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Objektif Pembelajaran Eksperimen', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    lesson: 'Eksperimen 3: Memilih air yang sesuai untuk setiap kegunaan', prompt: 'Selepas menjalankan eksperimen ini, murid dapat',
    goals: [
      'Membandingkan jumlah pepejal terlarut dalam pelbagai jenis air',
      'Mengelaskan air sebagai bahan tulen atau campuran berdasarkan bukti',
      'Memilih air untuk kegunaan yang berbeza serta memberikan alasan saintifik',
    ], next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Learning Objectives', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    lesson: 'Experiment 3: Choosing the right water for each task', prompt: 'After completing this experiment, students will be able to',
    goals: [
      'Compare the amount of dissolved solids in different water samples',
      'Classify water as a pure substance or a mixture based on evidence',
      'Choose water for different uses and justify the choice scientifically',
    ], next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  lesson: string; prompt: string; goals: string[]; next: string; language: string
}>

export function Experiment3LearningObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1" label={copy.back} />
          <div className="objectives-title exp3-title">
            <span className="objectives-number">1</span>
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
            <section className="objectives-panel exp3-objectives-panel" aria-label={copy.title}>
              <h2>{copy.lesson}</h2>
              <p className="learning-prompt">{copy.prompt}</p>
              <ol className="objectives-list">
                {copy.goals.map((goal, index) => (
                  <li key={goal}>
                    <span className="objective-index">{index + 1}</span>
                    <p>{goal}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp3/vocabulary" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
