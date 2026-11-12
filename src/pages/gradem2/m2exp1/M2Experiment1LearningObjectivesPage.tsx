import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'

const translations = {
  th: {
    back: 'ย้อนกลับ', title: 'จุดประสงค์การเรียนรู้การทดลอง', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    lesson: 'การทดลองที่ 1 เรื่อง สภาพละลายได้ของสาร', prompt: 'เมื่อทำการทดลองนี้ นักเรียนสามารถ',
    objectives: [
      'เปรียบเทียบปริมาณตัวละลายที่ละลายได้ในน้ำ 100 g ที่อุณหภูมิต่างกันได้',
      'เขียนและแปลความหมายกราฟสภาพละลายได้–อุณหภูมิของสาร 3 ชนิดได้',
      'อธิบายผลของชนิดตัวละลายและอุณหภูมิต่อสภาพละลายได้ และแยกความแตกต่างจากอัตราการละลายได้',
    ],
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Objektif Pembelajaran Eksperimen', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    lesson: 'Eksperimen 1: Keterlarutan Bahan', prompt: 'Selepas menjalankan eksperimen ini, murid dapat',
    objectives: [
      'Bandingkan kuantiti zat terlarut yang larut dalam 100 g air pada suhu berbeza',
      'Lukis dan tafsir graf keterlarutan melawan suhu bagi tiga bahan',
      'Terangkan kesan jenis zat terlarut dan suhu terhadap keterlarutan serta bezakannya daripada kadar pelarutan',
    ],
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Learning Objectives', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    lesson: 'Experiment 1: Solubility of Substances', prompt: 'After completing this experiment, students will be able to',
    objectives: [
      'Compare the amount of solute that dissolves in 100 g of water at different temperatures',
      'Draw and interpret a solubility–temperature graph for three substances',
      'Explain how solute type and temperature affect solubility and distinguish it from the rate of dissolving',
    ],
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; lesson: string; prompt: string; objectives: string[]; next: string; language: string
}>

export function M2Experiment1LearningObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="m2-objectives-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/objectives" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">2</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={teaImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-learning-panel" aria-labelledby="m2-learning-title">
              <h2 id="m2-learning-title">{copy.lesson}</h2>
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
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp1/vocabulary" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
