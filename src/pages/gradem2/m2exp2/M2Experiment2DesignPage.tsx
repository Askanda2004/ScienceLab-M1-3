import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp2-design.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ออกแบบการทดลอง', experiment: 'การทดลองที่ 2',
    mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    question: 'คำถามวิจัย: ปริมาตรน้ำมีผลต่อความเข้มข้นของ ORS อย่างไร เมื่อใช้ผง 1 ซองเท่าเดิม?',
    instruction: 'ลากชิปตัวแปรลงช่องให้ถูก (ระวังชิปปลอม “ยี่ห้อ ORS”)',
    labels: ['ตัวแปรต้น', 'ตัวแปรตาม', 'ตัวแปรควบคุม'],
    variables: ['ปริมาตรน้ำ (125 / 250 / 375 / 500 mL)', 'ความเข้มข้นของ ORS (% w/v)', 'มวลผง ORS 5 g · ชนิดน้ำ · คนจนละลายหมด'],
    start: 'เริ่มการทดลอง', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Reka Bentuk Eksperimen', experiment: 'Eksperimen 2',
    mystery: 'Bancuh ORS untuk adik\ndengan selamat', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    question: 'Soalan kajian: Bagaimanakah isipadu air mempengaruhi kepekatan ORS apabila jumlah serbuk satu paket dikekalkan?',
    instruction: 'Padankan pemboleh ubah dengan kategori yang betul (awas cip palsu “jenama ORS”)',
    labels: ['Pemboleh ubah dimanipulasi', 'Pemboleh ubah bergerak balas', 'Pemboleh ubah dimalarkan'],
    variables: ['Isipadu air (125 / 250 / 375 / 500 mL)', 'Kepekatan ORS (% w/v)', 'Jisim serbuk ORS 5 g · jenis air · kacau hingga larut'],
    start: 'Mulakan eksperimen', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Design the Experiment', experiment: 'Experiment 2',
    mystery: 'Mix ORS for a child\nsafely', pisa: 'PISA 2 · Design · Interpret data',
    question: 'Research question: How does water volume affect ORS concentration when the same one-sachet amount of powder is used?',
    instruction: 'Match each variable to the correct category (watch out for the fake “ORS brand” chip)',
    labels: ['Independent variable', 'Dependent variable', 'Controlled variables'],
    variables: ['Water volume (125 / 250 / 375 / 500 mL)', 'ORS concentration (% w/v)', 'ORS powder mass 5 g · water type · stir until dissolved'],
    start: 'Start experiment', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  question: string; instruction: string; labels: string[]; variables: string[];
  start: string; language: string
}>

export function M2Experiment2DesignPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp2-design-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/procedure" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">7</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp2-design-art" aria-hidden="true">🩺</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-design-panel" aria-label={copy.title}>
              <h2 className="m2-design-question">{copy.question}</h2>
              <p className="m2-design-instruction">{copy.instruction}</p>
              <div className="m2-design-variable-list">
                {copy.labels.map((label, index) => (
                  <div className="m2-design-variable-row" key={label}>
                    <span>{label}</span>
                    <p>{copy.variables[index]}</p>
                  </div>
                ))}
              </div>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next m2-design-start" label={copy.start} />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
