import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './comparison.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปและตาราง', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 1 ปริศนาหม้อน้ำเชื่อมของมะนะ',
    experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', badge: 'PISA 1 · อธิบายปรากฏการณ์', language: 'เลือกภาษา',
    summaryTitle: 'สรุปความรู้', summary: 'สารบริสุทธิ์มีจุดเดือดคงที่ ส่วนสารผสมเดือดที่อุณหภูมิสูงกว่าและไม่คงที่ ยิ่งมีตัวละลายมาก จุดเดือดยิ่งสูง และช่วงที่กราฟอุณหภูมิ–เวลาเป็นเส้นราบ คือช่วงที่สารกำลังเดือด',
    headings: ['ประเด็น', 'สารบริสุทธิ์', 'สารผสม'], rows: [
      ['ส่วนประกอบ', 'มีสารเพียงชนิดเดียว', 'มีสาร 2 ชนิดขึ้นไปผสมกัน'],
      ['จุดเดือด', 'คงที่ เช่น น้ำกลั่น 100 °C', 'สูงกว่าตัวทำละลาย และไม่คงที่'],
      ['กราฟอุณหภูมิ–เวลา', 'มีช่วงราบชัดเจนขณะเดือด', 'ช่วงเดือดยังเอียงขึ้น'],
      ['ตัวอย่างใกล้ตัว', 'น้ำกลั่น น้ำตาลทราย เกลือแกง', 'น้ำเกลือ น้ำเชื่อม น้ำทะเล'],
    ],
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan dan Jadual', subtitle: 'Tingkatan 1 · Eksperimen 1: Misteri air gula Mana',
    experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana', badge: 'PISA 1 · Menjelaskan fenomena', language: 'Pilih bahasa',
    summaryTitle: 'Ringkasan ilmu', summary: 'Bahan tulen mempunyai takat didih tetap. Campuran mendidih pada suhu yang lebih tinggi dan tidak tetap. Lebih banyak zat terlarut meningkatkan takat didih. Bahagian graf suhu–masa yang mendatar menunjukkan bahan sedang mendidih.',
    headings: ['Aspek', 'Bahan tulen', 'Campuran'], rows: [
      ['Komposisi', 'Hanya satu jenis bahan', 'Campuran dua atau lebih bahan'],
      ['Takat didih', 'Tetap, seperti air suling pada 100 °C', 'Lebih tinggi daripada pelarut dan tidak tetap'],
      ['Graf suhu–masa', 'Bahagian mendatar yang jelas semasa mendidih', 'Graf terus menaik semasa mendidih'],
      ['Contoh harian', 'Air suling, gula, garam', 'Air garam, air gula, air laut'],
    ],
  },
  en: {
    back: 'Back', next: 'Next', title: 'Summary and Table', subtitle: 'Grade 7 · Experiment 1: Mana’s Sugar Water Mystery',
    experiment: 'Experiment 1', mystery: "Mana's Sugar Water Mystery", badge: 'PISA 1 · Explain phenomena', language: 'Choose language',
    summaryTitle: 'Key idea', summary: 'Pure substances have a constant boiling point. Mixtures boil at a higher, changing temperature. More solute raises the boiling point. A flat section on a temperature–time graph shows that the substance is boiling.',
    headings: ['Feature', 'Pure substance', 'Mixture'], rows: [
      ['Composition', 'Only one kind of substance', 'Two or more substances mixed together'],
      ['Boiling point', 'Constant, such as distilled water at 100 °C', 'Higher than the solvent and not constant'],
      ['Temperature–time graph', 'A clear flat section while boiling', 'The line continues to rise while boiling'],
      ['Everyday examples', 'Distilled water, sugar, table salt', 'Salt water, sugar water, seawater'],
    ],
  },
} satisfies Record<Language, {
  back: string; next: string; title: string; subtitle: string; experiment: string; mystery: string; badge: string; language: string;
  summaryTitle: string; summary: string; headings: string[]; rows: string[][]
}>

export function Experiment1ComparisonPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]

  return (
    <main className="objectives-page comparison-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content comparison-content">
        <header className="objectives-header comparison-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/summary" label={text.back} />
          <div className="objectives-title comparison-title">
            <span className="objectives-number">14</span>
            <div>
              <h1>{text.title}</h1>
              {/* <p>{text.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout comparison-layout">
          <aside className="objectives-sidecard comparison-sidecard">
            <h2>{text.experiment}</h2>
            <img src={boilingImage} alt="" />
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
