import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-comparison.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปและตาราง', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', badge: 'PISA 1 · อธิบายปรากฏการณ์', language: 'เลือกภาษา',
    summaryTitle: 'สรุปความรู้', summary: 'สารละลายประกอบด้วยตัวละลายและตัวทำละลาย สภาพละลายได้คือปริมาณตัวละลายที่ละลายได้มากที่สุดในน้ำ 100 g ซึ่งขึ้นกับชนิดของสารและอุณหภูมิ การคนหรือบดให้ละเอียดช่วยให้ละลายเร็วขึ้น แต่ไม่เพิ่มสภาพละลายได้',
    headings: ['ประเด็น', 'น้ำเย็น 10 °C', 'น้ำร้อน 80 °C'], rows: [
      ['น้ำตาลทราย', '190 g', '360 g'], ['เกลือแกง', '36 g', '38 g'], ['สารส้ม', '4 g', '71 g'], ['ชาชักของกะนะ', 'น้ำตาลค้างก้นแก้ว', 'น้ำตาลละลายหมด'],
    ],
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan dan Jadual', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', badge: 'PISA 1 · Menjelaskan fenomena', language: 'Pilih bahasa',
    summaryTitle: 'Ringkasan ilmu', summary: 'Larutan terdiri daripada zat terlarut dan pelarut. Keterlarutan ialah jumlah maksimum zat yang larut dalam 100 g air, bergantung pada jenis bahan dan suhu. Mengacau atau menghancurkan bahan mempercepat pelarutan tetapi tidak meningkatkan keterlarutan.',
    headings: ['Aspek', 'Air sejuk 10 °C', 'Air panas 80 °C'], rows: [
      ['Gula', '190 g', '360 g'], ['Garam', '36 g', '38 g'], ['Tawas', '4 g', '71 g'], ['Teh tarik Kana', 'Gula tertinggal di dasar', 'Semua gula larut'],
    ],
  },
  en: {
    back: 'Back', next: 'Continue', title: 'Summary and Table', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', badge: 'PISA 1 · Explain phenomena', language: 'Choose language',
    summaryTitle: 'Key idea', summary: 'A solution contains a solute and a solvent. Solubility is the maximum amount of solute that dissolves in 100 g of water, and depends on the substance and temperature. Stirring or crushing helps a solute dissolve faster, but does not increase its solubility.',
    headings: ['Feature', 'Cold water 10 °C', 'Hot water 80 °C'], rows: [
      ['Sugar', '190 g', '360 g'], ['Table salt', '36 g', '38 g'], ['Alum', '4 g', '71 g'], ['Kana’s pulled tea', 'Sugar remains at the bottom', 'All sugar dissolves'],
    ],
  },
} satisfies Record<Language, {
  back: string; next: string; title: string; experiment: string; mystery: string; badge: string; language: string;
  summaryTitle: string; summary: string; headings: string[]; rows: string[][]
}>

export function M2Experiment1ComparisonPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]

  return (
    <main className="m2-objectives-page m2-comparison-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-comparison-content">
        <header className="m2-objectives-header m2-comparison-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/summary" label={text.back} />
          <div className="m2-objectives-title m2-comparison-title">
            <span className="m2-objectives-number">15</span>
            <h1>{text.title}</h1>
          </div>
        </header>

        <div className="m2-objectives-layout m2-comparison-layout">
          <aside className="m2-objectives-sidecard m2-comparison-sidecard">
            <h2>{text.experiment}</h2>
            <div className="m2-comparison-cup" aria-hidden="true">☕</div>
            <h3>{text.mystery}</h3>
            <span className="m2-pisa-badge">{text.badge}</span>
          </aside>

          <section className="m2-comparison-panel" aria-label={text.title}>
            <div className="m2-comparison-summary">
              <h2>{text.summaryTitle}</h2>
              <p>{text.summary}</p>
            </div>
            <div className="m2-comparison-table-wrap">
              <table className="m2-comparison-table">
                <thead><tr>{text.headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
                <tbody>{text.rows.map(([topic, cold, hot]) => <tr key={topic}>
                  <th scope="row">{topic}</th><td>{cold}</td><td>{hot}</td>
                </tr>)}</tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="m2-comparison-actions">
        <NextButton className="m2-comparison-next" label={text.next} href="/gradem2/m2exp1" />
      </div>
    </main>
  )
}
