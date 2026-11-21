import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-comparison.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปและตาราง', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล', language: 'เลือกภาษา',
    summaryTitle: 'สรุปความรู้', summary: 'ร้อยละโดยมวลต่อปริมาตร (% w/v) = มวลตัวละลาย ÷ ปริมาตรสารละลาย × 100 เมื่อใช้ผง ORS เท่าเดิม (5 g) ความเข้มข้นจะแปรผกผันกับปริมาตรน้ำ ผง 1 ซองควรผสมน้ำ 250 mL จึงได้ 2% พอดี น้ำน้อยไปเข้มข้นเกิน มากไปเจือจางเกิน',
    headings: ['ปริมาตรน้ำ', 'ความเข้มข้นที่ได้', 'ผลต่อน้อง'], rows: [
      ['125 mL', '4.0% เข้มข้นเกิน', 'อาจท้องเสียมากขึ้น'],
      ['250 mL', '2.0% ตรงเป้า', 'ได้เกลือแร่พอดี ปลอดภัย'],
      ['500 mL', '1.0% เจือจางเกิน', 'ได้เกลือแร่ไม่พอ'],
      ['น้ำเกลือล้างแผล', '0.9% (4.5 g ใน 500 mL)', 'ใช้ล้างแผลได้ปลอดภัย'],
    ],
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan dan Jadual', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', badge: 'PISA 2 · Mereka bentuk · Tafsir data', language: 'Pilih bahasa',
    summaryTitle: 'Ringkasan ilmu', summary: 'Peratus jisim per isipadu (% w/v) = jisim zat terlarut ÷ isi padu larutan × 100. Dengan jumlah serbuk ORS yang sama (5 g), kepekatan berkadar songsang dengan isi padu air. Satu paket perlu dibancuh dalam 250 mL air untuk menghasilkan 2%. Air terlalu sedikit terlalu pekat; air terlalu banyak terlalu cair.',
    headings: ['Isi padu air', 'Kepekatan', 'Kesan'], rows: [
      ['125 mL', '4.0% terlalu pekat', 'Boleh memburukkan cirit-birit'],
      ['250 mL', '2.0% tepat sasaran', 'Elektrolit mencukupi dan selamat'],
      ['500 mL', '1.0% terlalu cair', 'Elektrolit tidak mencukupi'],
      ['Air garam pencuci luka', '0.9% (4.5 g dalam 500 mL)', 'Selamat untuk mencuci luka'],
    ],
  },
  en: {
    back: 'Back', next: 'Next', title: 'Summary and Table', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', badge: 'PISA 2 · Design · Interpret data', language: 'Choose language',
    summaryTitle: 'Key idea', summary: 'Mass/volume percentage (% w/v) = solute mass ÷ solution volume × 100. With the same amount of ORS powder (5 g), concentration is inversely related to water volume. One sachet should be mixed with 250 mL of water for 2%. Too little water is too concentrated; too much is too dilute.',
    headings: ['Water volume', 'Concentration', 'Effect'], rows: [
      ['125 mL', '4.0% too concentrated', 'May worsen diarrhea'],
      ['250 mL', '2.0% on target', 'Safe, with the intended electrolytes'],
      ['500 mL', '1.0% too dilute', 'Not enough electrolytes'],
      ['Wound-cleaning saline', '0.9% (4.5 g in 500 mL)', 'Safe for cleaning wounds'],
    ],
  },
} satisfies Record<Language, {
  back: string; next: string; title: string; experiment: string; mystery: string; badge: string; language: string;
  summaryTitle: string; summary: string; headings: string[]; rows: string[][]
}>

export function M2Experiment2ComparisonPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]

  return (
    <main className="m2-objectives-page m2-comparison-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-comparison-content">
        <header className="m2-objectives-header m2-comparison-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/summary" label={text.back} />
          <div className="m2-objectives-title m2-comparison-title"><span className="m2-objectives-number">14</span><h1>{text.title}</h1></div>
        </header>
        <div className="m2-objectives-layout m2-comparison-layout">
          <aside className="m2-objectives-sidecard m2-comparison-sidecard">
            <h2>{text.experiment}</h2><div className="m2-comparison-cup" aria-hidden="true">🩺</div>
            <h3>{text.mystery}</h3><span className="m2-pisa-badge">{text.badge}</span>
          </aside>
          <section className="m2-comparison-panel" aria-label={text.title}>
            <div className="m2-comparison-summary"><h2>{text.summaryTitle}</h2><p>{text.summary}</p></div>
            <div className="m2-comparison-table-wrap">
              <table className="m2-comparison-table">
                <thead><tr>{text.headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
                <tbody>{text.rows.map(([volume, concentration, effect]) => <tr key={volume}>
                  <th scope="row">{volume}</th><td>{concentration}</td><td>{effect}</td>
                </tr>)}</tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="m2-comparison-actions"><NextButton className="m2-comparison-next" label={text.next} href="/gradem2/m2exp3/objectives" /></div>
    </main>
  )
}
