import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import './exp2.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'จุดประสงค์การเรียนรู้การทดลอง', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    lesson: 'การทดลองที่ 2 เรื่อง ความหนาแน่นของสารบริสุทธิ์และสารผสม', prompt: 'เมื่อทำการทดลองนี้จบ นักเรียนสามารถ',
    goals: [
      'วัดมวลและปริมาตรของของเหลว แล้วคำนวณความหนาแน่นได้',
      'ออกแบบการทดลองโดยกำหนดตัวแปรต้น ตัวแปรตาม และตัวแปรควบคุมได้',
      'ใช้ความหนาแน่นอธิบายการลอยและการจมของวัตถุได้',
    ], next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Objektif Pembelajaran Eksperimen', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    lesson: 'Eksperimen 2: Ketumpatan bahan tulen dan campuran', prompt: 'Selepas menjalankan eksperimen ini, murid dapat',
    goals: [
      'Mengukur jisim dan isi padu cecair, kemudian mengira ketumpatannya',
      'Merancang eksperimen dengan mengenal pasti pemboleh ubah dimanipulasi, bergerak balas dan dimalarkan',
      'Menggunakan ketumpatan untuk menerangkan objek terapung dan tenggelam',
    ], next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Learning Objectives', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    lesson: 'Experiment 2: Density of pure substances and mixtures', prompt: 'After completing this experiment, students will be able to',
    goals: [
      'Measure the mass and volume of liquids, then calculate their density',
      'Design an investigation by identifying independent, dependent and controlled variables',
      'Use density to explain why objects float or sink',
    ], next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  lesson: string; prompt: string; goals: string[]; next: string; language: string
}>

export function Experiment2LearningObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1" label={copy.back} />
          <div className="objectives-title exp2-title">
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
            <img src={densityImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="objectives-panel exp2-objectives-panel" aria-label={copy.title}>
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
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp2/vocabulary" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
