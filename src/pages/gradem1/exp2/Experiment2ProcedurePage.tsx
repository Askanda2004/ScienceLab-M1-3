import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/procedure.css'
import './exp2.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ขั้นตอนการทดลอง', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    next: 'ต่อไป', language: 'เลือกภาษา',
    steps: [
      'ชั่งบีกเกอร์เปล่า แล้วบันทึกมวล',
      'ตวงของเหลว 100 mL เทใส่บีกเกอร์ แล้วชั่งอีกครั้ง',
      'คำนวณมวลของเหลว และความหนาแน่น = มวล ÷ ปริมาตร',
      'หย่อนวัตถุลงไป แล้วสังเกตว่าลอยหรือจม',
      'เปลี่ยนปริมาณเกลือตามที่ออกแบบไว้ แล้วทำซ้ำอย่างน้อย 4 รอบ',
    ],
  },
  ms: {
    back: 'Kembali', title: 'Prosedur Eksperimen', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    steps: [
      'Timbang bikar kosong dan catat jisimnya',
      'Sukat 100 mL cecair, tuang ke dalam bikar dan timbang sekali lagi',
      'Kira jisim cecair dan ketumpatan = jisim ÷ isi padu',
      'Masukkan objek ke dalam cecair dan perhatikan sama ada ia terapung atau tenggelam',
      'Ubah jumlah garam mengikut reka bentuk dan ulang sekurang-kurangnya 4 kali',
    ],
  },
  en: {
    back: 'Back', title: 'Experiment Procedure', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    next: 'Continue', language: 'Choose language',
    steps: [
      'Weigh an empty beaker and record its mass',
      'Measure 100 mL of liquid, pour it into the beaker and weigh it again',
      'Calculate the liquid mass and density = mass ÷ volume',
      'Place an object in the liquid and observe whether it floats or sinks',
      'Change the amount of salt as planned and repeat at least 4 trials',
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; steps: string[]
}>

export function Experiment2ProcedurePage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/materials" label={copy.back} />
          <div className="objectives-title exp2-title">
            <span className="objectives-number">6</span>
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
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp2/design" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
