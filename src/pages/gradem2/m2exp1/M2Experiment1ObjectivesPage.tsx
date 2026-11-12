import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'

const translations = {
  th: {
    back: 'ย้อนกลับ', title: 'จุดประสงค์ของหน่วย', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    unit: 'หน่วย สารละลาย: สภาพละลายได้และความเข้มข้น',
    intro: 'อามีนะห์กับฟิรเดาส์พบเรื่องน่าสงสัย 3 เรื่องบนถนนตลาดในตำบล มาช่วยกันไขปริศนาด้วยการทดลอง แล้วสะสมตรานักปรุงสารละลายให้ครบ 3 ดวงกันเถอะ!',
    objectives: [
      'อธิบายผลของชนิดตัวละลายและอุณหภูมิต่อสภาพละลายได้ โดยใช้หลักฐานจากการทดลอง',
      'คำนวณและเตรียมสารละลายให้มีความเข้มข้นร้อยละตามที่กำหนด และออกแบบการทดลองได้',
      'ใช้ข้อมูลตัดสินใจเจือจางและใช้สารละลายในชีวิตประจำวันได้อย่างปลอดภัย',
    ],
    next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Objektif Unit', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    unit: 'Unit Larutan: Keterlarutan dan Kepekatan',
    intro: 'Aminah dan Firdaus menemui tiga perkara yang mencurigakan di jalan pasar. Mari selesaikan misteri melalui eksperimen dan kumpulkan tiga lencana ahli kimia larutan!',
    objectives: [
      'Terangkan kesan jenis zat terlarut dan suhu terhadap keterlarutan menggunakan bukti eksperimen',
      'Kira dan sediakan larutan pada kepekatan peratus yang ditetapkan serta reka eksperimen',
      'Gunakan maklumat untuk mencairkan dan menggunakan larutan dengan selamat dalam kehidupan harian',
    ],
    next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Unit Objectives', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    unit: 'Solutions Unit: Solubility and Concentration',
    intro: 'Aminah and Firdaus have found three curious mysteries along the market street. Help solve them through experiments and collect all three solution chemist badges!',
    objectives: [
      'Explain how solute type and temperature affect solubility using evidence from an experiment',
      'Calculate and prepare solutions at a given percentage concentration and design an experiment',
      'Use information to dilute and handle solutions safely in everyday life',
    ],
    next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; unit: string; intro: string; objectives: string[]; next: string; language: string
}>

export function M2Experiment1ObjectivesPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="m2-objectives-page m2-exp1-objectives-page">
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
            <img src={teaImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel" aria-labelledby="m2-unit-title">
              <h2 id="m2-unit-title">{copy.unit}</h2>
              <p className="m2-objectives-intro">{copy.intro}</p>
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
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp1/learning-objectives" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
