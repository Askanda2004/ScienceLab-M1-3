import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/comparison.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปและตาราง', experiment: 'การทดลองที่ 2',
    mystery: 'ความลับของทะเลปัตตานี', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล', language: 'เลือกภาษา',
    summaryTitle: 'สรุปความรู้',
    summary: 'ความหนาแน่น = มวล ÷ ปริมาตร (g/mL) วัตถุลอยเมื่อของเหลวหนาแน่นกว่าวัตถุ สารบริสุทธิ์มีความหนาแน่นคงที่ ส่วนสารผสมเปลี่ยนตามปริมาณสารที่ละลาย การทดลองที่ดีต้องเปลี่ยนตัวแปรทีละตัว และควบคุมตัวแปรอื่นให้คงที่',
    headings: ['ประเด็น', 'สารบริสุทธิ์', 'สารผสม'],
    rows: [
      ['ตัวอย่าง', 'น้ำกลั่น', 'น้ำทะเล น้ำเกลือ'],
      ['ความหนาแน่น', 'คงที่ 1.00 g/mL', 'เพิ่มตามปริมาณเกลือ'],
      ['ไข่ (1.07 g/mL)', 'จม', 'ลอยเมื่อเกลือ ≥ 3 ช้อนชา'],
      ['ในชีวิตจริง', 'ในสระน้ำจืด ตัวจมง่าย', 'ลอยตัวในทะเลได้ง่าย'],
    ],
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan dan Jadual', experiment: 'Eksperimen 2',
    mystery: 'Rahsia Laut Pattani', badge: 'PISA 2 · Reka bentuk · Tafsir data', language: 'Pilih bahasa',
    summaryTitle: 'Ringkasan ilmu',
    summary: 'Ketumpatan = jisim ÷ isi padu (g/mL). Objek terapung apabila cecair lebih tumpat daripada objek. Bahan tulen mempunyai ketumpatan tetap, manakala campuran berubah mengikut jumlah bahan terlarut. Ubah satu pemboleh ubah pada satu masa dan kekalkan pemboleh ubah lain.',
    headings: ['Aspek', 'Bahan tulen', 'Campuran'],
    rows: [
      ['Contoh', 'Air suling', 'Air laut, air garam'],
      ['Ketumpatan', 'Tetap pada 1.00 g/mL', 'Meningkat mengikut jumlah garam'],
      ['Telur (1.07 g/mL)', 'Tenggelam', 'Terapung apabila garam ≥ 3 sudu teh'],
      ['Dalam kehidupan', 'Lebih mudah tenggelam dalam air tawar', 'Lebih mudah terapung di laut'],
    ],
  },
  en: {
    back: 'Back', next: 'Next', title: 'Summary and Table', experiment: 'Experiment 2',
    mystery: 'Secrets of Pattani Sea', badge: 'PISA 2 · Design · Interpret data', language: 'Choose language',
    summaryTitle: 'Key ideas',
    summary: 'Density = mass ÷ volume (g/mL). An object floats when the liquid is denser than the object. Pure substances have constant density, while mixtures change with the amount of dissolved solute. A fair experiment changes one variable at a time and keeps the others constant.',
    headings: ['Aspect', 'Pure substance', 'Mixture'],
    rows: [
      ['Examples', 'Distilled water', 'Seawater, salt water'],
      ['Density', 'Constant at 1.00 g/mL', 'Increases with the amount of salt'],
      ['Egg (1.07 g/mL)', 'Sinks', 'Floats with ≥ 3 teaspoons of salt'],
      ['Everyday life', 'Sinks more easily in fresh water', 'Floats more easily in the sea'],
    ],
  },
} satisfies Record<Language, {
  back: string; next: string; title: string; experiment: string; mystery: string; badge: string; language: string;
  summaryTitle: string; summary: string; headings: string[]; rows: string[][]
}>

export function Experiment2ComparisonPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]

  return (
    <main className="objectives-page comparison-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content comparison-content">
        <header className="objectives-header comparison-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/summary" label={text.back} />
          <div className="objectives-title comparison-title">
            <span className="objectives-number">13</span>
            <h1>{text.title}</h1>
          </div>
        </header>

        <div className="objectives-layout comparison-layout">
          <aside className="objectives-sidecard comparison-sidecard">
            <h2>{text.experiment}</h2>
            <img src={densityImage} alt="" />
            <h3>{text.mystery}</h3>
            <span className="pisa-badge">{text.badge}</span>
          </aside>

          <section className="comparison-panel" aria-label={text.title}>
            <div className="comparison-summary">
              <h2>{text.summaryTitle}</h2>
              <p>{text.summary}</p>
            </div>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>{text.headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr>
                </thead>
                <tbody>
                  {text.rows.map(([feature, pure, mixture]) => (
                    <tr key={feature}>
                      <th scope="row">{feature}</th>
                      <td>{pure}</td>
                      <td>{mixture}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="comparison-actions">
        <NextButton className="comparison-next" label={text.next} href="/gradem1/exp1" />
      </div>
    </main>
  )
}
