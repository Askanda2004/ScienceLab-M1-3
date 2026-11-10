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
    title: 'จุดประสงค์ของหน่วย',
    experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ',
    pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    unit: 'หน่วย สารรอบตัว: สารบริสุทธิ์และสารผสม',
    intro: 'อามีนะห์กับฟิรเดาล์พบเรื่องแปลก ๆ 3 เรื่องในหมู่บ้านริมอ่าวปัตตานี มาช่วยกันไขปริศนาด้วยการทดลอง แล้วสะสมตรานักสืบให้ครบ 3 ดวงกันเถอะ!',
    objectives: [
      'อธิบายความแตกต่างระหว่างสารบริสุทธิ์และสารผสม โดยใช้จุดเดือดและความหนาแน่นเป็นหลักฐาน',
      'ออกแบบการทดลอง บันทึกผล และแปลความหมายข้อมูลจากกราฟและตาราง',
      'ใช้ข้อมูลทางวิทยาศาสตร์ตัดสินใจเลือกใช้สารในชีวิตประจำวันได้อย่างมีเหตุผล',
    ],
    next: 'ต่อไป',
    language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali',
    title: 'Objektif Unit',
    experiment: 'Eksperimen 1',
    mystery: 'Misteri air gula Mana',
    pisa: 'PISA 1 · Menjelaskan fenomena',
    unit: 'Unit Bahan di Sekeliling Kita: Bahan Tulen dan Campuran',
    intro: 'Aminah dan Firdaus menemui tiga perkara aneh di kampung Teluk Pattani. Mari kita selesaikan misteri ini melalui eksperimen dan kumpulkan tiga lencana penyiasat!',
    objectives: [
      'Terangkan perbezaan antara bahan tulen dengan campuran menggunakan takat didih dan ketumpatan sebagai bukti',
      'Reka eksperimen, catat keputusan dan tafsir maklumat daripada graf serta jadual',
      'Gunakan maklumat sains untuk membuat pilihan yang munasabah tentang bahan dalam kehidupan harian',
    ],
    next: 'Seterusnya',
    language: 'Pilih bahasa',
  },
  en: {
    back: 'Back',
    title: 'Unit Objectives',
    experiment: 'Experiment 1',
    mystery: "Mana's Sugar Water Mystery",
    pisa: 'PISA 1 · Explain phenomena',
    unit: 'Unit: Everyday Materials — Pure Substances and Mixtures',
    intro: 'Aminah and Firdaus have discovered three strange mysteries in a village by Pattani Bay. Help solve them through experiments and collect all three detective badges!',
    objectives: [
      'Explain the difference between pure substances and mixtures using boiling point and density as evidence',
      'Design an experiment, record results, and interpret information from graphs and tables',
      'Use scientific information to make reasoned choices about materials in everyday life',
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
  unit: string
  intro: string
  objectives: string[]
  next: string
  language: string
}>

export function Experiment1ObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">1</span>
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
            <section className="objectives-panel" aria-labelledby="unit-title">
              <h2 id="unit-title">{copy.unit}</h2>
              <p className="objectives-intro">{copy.intro}</p>
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
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp1/learning-objectives" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
