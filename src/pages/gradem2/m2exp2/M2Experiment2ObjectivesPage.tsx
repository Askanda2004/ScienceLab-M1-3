import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp2-objectives.css'

const translations = {
  th: {
    back: 'ย้อนกลับ', title: 'จุดประสงค์การเรียนรู้การทดลอง', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    lesson: 'การทดลองที่ 2 เรื่อง ความเข้มข้นของสารละลาย (ร้อยละ)', prompt: 'เมื่อทำการทดลองนี้ นักเรียนสามารถ',
    objectives: [
      'คำนวณความเข้มข้นร้อยละโดยมวลต่อปริมาตร (% w/v) มวลต่อมวล (% w/w) และปริมาตรต่อปริมาตร (% v/v) ได้',
      'เตรียมสารละลายให้ได้ความเข้มข้นที่กำหนด โดยชั่ง ตวง และตรวจสอบด้วยเครื่องวัดได้',
      'ออกแบบการทดลองและแปลความหมายกราฟความเข้มข้น–ปริมาตรน้ำ (ความสัมพันธ์ผกผัน) ได้',
    ],
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Objektif Pembelajaran Eksperimen', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    lesson: 'Eksperimen 2: Kepekatan Larutan (Peratus)', prompt: 'Selepas menjalankan eksperimen ini, murid dapat',
    objectives: [
      'Mengira kepekatan peratus jisim per isipadu (% w/v), jisim per jisim (% w/w) dan isipadu per isipadu (% v/v)',
      'Menyediakan larutan pada kepekatan yang ditetapkan dengan menimbang, menyukat dan mengukurnya',
      'Mereka bentuk eksperimen dan mentafsir graf kepekatan melawan isipadu air (hubungan songsang)',
    ],
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Learning Objectives', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', pisa: 'PISA 2 · Design · Interpret data',
    lesson: 'Experiment 2: Percentage Concentration of Solutions', prompt: 'After completing this experiment, students will be able to',
    objectives: [
      'Calculate percentage concentration by mass per volume (% w/v), mass per mass (% w/w), and volume per volume (% v/v)',
      'Prepare a solution at a given concentration by weighing, measuring, and checking it with an instrument',
      'Design an experiment and interpret a concentration–water volume graph (an inverse relationship)',
    ],
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; lesson: string; prompt: string; objectives: string[]; next: string; language: string
}>

export function M2Experiment2ObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="m2-objectives-page m2-exp2-objectives-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">1</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp2-object-art" aria-hidden="true">🩺</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-exp2-objectives-panel" aria-labelledby="m2-exp2-unit-title">
              <h2 id="m2-exp2-unit-title">{copy.lesson}</h2>
              <p className="m2-learning-prompt">{copy.prompt}</p>
              <ol className="m2-objectives-list">
                {copy.objectives.map((objective, index) => (
                  <li key={objective}>
                    <span className="m2-objective-index">{index + 1}</span>
                    <p>{objective}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp2/vocabulary" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
