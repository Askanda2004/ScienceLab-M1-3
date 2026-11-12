import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-procedure.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ขั้นตอนการทดลอง', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์', next: 'ต่อไป', language: 'เลือกภาษา',
    steps: [
      'เลือกตัวละลาย: น้ำตาลทราย เกลือแกง หรือสารส้ม (น้ำ 100 g)',
      'ตั้งอุณหภูมิน้ำ 10, 30, 50 หรือ 80 °C ด้วยเตาหรือถังน้ำแข็ง',
      'เติมตัวละลายทีละ 1 ช้อน (10 g) แล้วคนจนละลายหมด',
      'ถ้าคนแล้วผลึกไม่หาย แปลว่าอิ่มตัว ให้บันทึกปริมาณที่ละลายได้',
      'ทำซ้ำจนครบ 4 อุณหภูมิ แล้วกด “ดูผลการทดลอง”',
    ],
  },
  ms: {
    back: 'Kembali', title: 'Prosedur Eksperimen', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena', next: 'Seterusnya', language: 'Pilih bahasa',
    steps: [
      'Pilih zat terlarut: gula, garam atau tawas (dalam 100 g air)',
      'Tetapkan suhu air kepada 10, 30, 50 atau 80 °C menggunakan pemanas atau bekas ais',
      'Tambah satu sudu zat terlarut (10 g) setiap kali dan kacau hingga larut',
      'Jika kristal masih kelihatan selepas dikacau, larutan tepu; catat jumlah yang larut',
      'Ulang untuk keempat-empat suhu, kemudian tekan “Lihat keputusan eksperimen”',
    ],
  },
  en: {
    back: 'Back', title: 'Experiment Procedure', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena', next: 'Continue', language: 'Choose language',
    steps: [
      'Choose a solute: sugar, table salt or alum (in 100 g of water)',
      'Set the water to 10, 30, 50 or 80 °C using a heater or an ice bath',
      'Add one spoonful of solute (10 g) at a time and stir until it dissolves',
      'If crystals remain after stirring, the solution is saturated; record the amount dissolved',
      'Repeat at all four temperatures, then press “View experiment results”',
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; next: string; language: string; steps: string[]
}>

export function M2Experiment1ProcedurePage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-procedure-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/materials" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">7</span>
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
            <section className="m2-objectives-panel m2-procedure-panel" aria-label={copy.title}>
              <ol className="m2-procedure-list">
                {copy.steps.map((step, index) => (
                  <li key={step}>
                    <span className="m2-procedure-index">{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp1/prediction" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
