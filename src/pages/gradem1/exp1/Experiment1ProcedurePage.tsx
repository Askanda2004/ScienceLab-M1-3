import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './procedure.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ขั้นตอนการทดลอง', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ',
    pisa: 'PISA 1 · อธิบายปรากฏการณ์', next: 'ต่อไป', language: 'เลือกภาษา',
    steps: [
      'เลือกของเหลวที่จะต้ม: น้ำกลั่น น้ำเกลือ หรือน้ำเชื่อม (น้ำ 200 mL)',
      'เลือกปริมาณตัวละลาย 0–3 ช้อน แล้วคนให้ละลาย',
      'กด “ให้ความร้อน” แล้วอ่านอุณหภูมิทุก 1 นาทีให้อัตโนมัติ',
      'สังเกตฟองเดือด และดูกราฟอุณหภูมิ–เวลาที่วาดขึ้น',
      'เปลี่ยนของเหลวแล้วทำซ้ำจนครบ 3 ชนิด แล้วกด “ดูผลการทดลอง”',
    ],
  },
  ms: {
    back: 'Kembali', title: 'Prosedur Eksperimen', experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana',
    pisa: 'PISA 1 · Menjelaskan fenomena', next: 'Seterusnya', language: 'Pilih bahasa',
    steps: [
      'Pilih cecair untuk dididihkan: air suling, air garam atau air gula (200 mL)',
      'Pilih jumlah bahan terlarut 0–3 sudu, kemudian kacau hingga larut',
      'Tekan “Panaskan” dan baca suhu secara automatik setiap 1 minit',
      'Perhatikan gelembung didih dan graf suhu-masa yang terbentuk',
      'Tukar cecair dan ulangi untuk ketiga-tiga jenis, kemudian tekan “Lihat keputusan”',
    ],
  },
  en: {
    back: 'Back', title: 'Experiment Procedure', experiment: 'Experiment 1', mystery: "Mana's Sugar Water Mystery",
    pisa: 'PISA 1 · Explain phenomena', next: 'Continue', language: 'Choose language',
    steps: [
      'Choose a liquid to heat: distilled water, salt water or sugar water (200 mL)',
      'Choose 0–3 spoonfuls of solute, then stir until it dissolves',
      'Press “Heat” and read the temperature automatically every minute',
      'Observe the boiling bubbles and the temperature-time graph as it forms',
      'Change the liquid and repeat for all 3 types, then press “View results”',
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string; steps: string[]
}>

export function Experiment1ProcedurePage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/materials" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">7</span>
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
            <section className="procedure-panel" aria-label={copy.title}>
              <ol className="procedure-list">
                {copy.steps.map((step, index) => (
                  <li key={step}>
                    <span className="procedure-index">{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp1/prediction" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
