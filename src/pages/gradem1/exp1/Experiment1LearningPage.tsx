import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'

const translations = {
  th: {
    back: 'ย้อนกลับ',
    title: 'จุดประสงค์การเรียนรู้การทดลอง',
    experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ',
    pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    lesson: 'การทดลองที่ 1 เรื่อง จุดเดือดของสารบริสุทธิ์และสารผสม',
    prompt: 'เมื่อทำการทดลองนี้ นักเรียนสามารถ',
    objectives: [
      'วัดและบันทึกอุณหภูมิของของเหลวขณะให้ความร้อนจนเดือดได้',
      'เขียนและแปลความหมายกราฟอุณหภูมิ–เวลาได้',
      'อธิบายความแตกต่างของจุดเดือดระหว่างสารบริสุทธิ์กับสารผสม โดยใช้หลักฐานจากการทดลองได้',
    ],
    next: 'ต่อไป',
    language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali',
    title: 'Objektif Pembelajaran Eksperimen',
    experiment: 'Eksperimen 1',
    mystery: 'Misteri air gula Mana',
    pisa: 'PISA 1 · Menjelaskan fenomena',
    lesson: 'Eksperimen 1: Takat Didih Bahan Tulen dan Campuran',
    prompt: 'Selepas menjalankan eksperimen ini, murid dapat',
    objectives: [
      'Mengukur dan merekod suhu cecair semasa dipanaskan sehingga mendidih',
      'Melukis dan mentafsir graf suhu-masa',
      'Menerangkan perbezaan takat didih bahan tulen dan campuran menggunakan bukti eksperimen',
    ],
    next: 'Seterusnya',
    language: 'Pilih bahasa',
  },
  en: {
    back: 'Back',
    title: 'Experiment Learning Objectives',
    experiment: 'Experiment 1',
    mystery: "Mana's Sugar Water Mystery",
    pisa: 'PISA 1 · Explain phenomena',
    lesson: 'Experiment 1: Boiling Points of Pure Substances and Mixtures',
    prompt: 'After completing this experiment, students will be able to',
    objectives: [
      'Measure and record the temperature of a liquid as it is heated to boiling',
      'Create and interpret a temperature-time graph',
      'Explain boiling-point differences between pure substances and mixtures using experimental evidence',
    ],
    next: 'Continue',
    language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string
  title: string
  experiment: string
  mystery: string
  pisa: string
  lesson: string
  prompt: string
  objectives: string[]
  next: string
  language: string
}>

export function Experiment1LearningPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/objectives" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">2</span>
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
            <section className="objectives-panel learning-panel" aria-labelledby="learning-title">
              <h2 id="learning-title">{copy.lesson}</h2>
              <p className="learning-prompt">{copy.prompt}</p>
              <ol className="objectives-list">
                {copy.objectives.map((objective, index) => (
                  <li key={objective}>
                    <span className="objective-index">{index + 1}</span>
                    <p>{objective}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp1/vocabulary" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
