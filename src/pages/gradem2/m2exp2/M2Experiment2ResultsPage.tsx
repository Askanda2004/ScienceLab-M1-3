import { useMemo, useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp2-results.css'

type Volume = 125 | 250 | 375 | 500
type Result = { calculated: number; measured: number }

const volumes: Volume[] = [125, 250, 375, 500]
const resultStorageKey = 'science-lab-m2-exp2-concentration-results'
const outcomes: Record<Volume, 'high' | 'target' | 'slightly' | 'dilute'> = {
  125: 'high', 250: 'target', 375: 'slightly', 500: 'dilute',
}

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ผลการทดลอง', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    heading: 'ผง ORS 5.0 g เท่าเดิม เปลี่ยนแค่ปริมาณน้ำ', water: 'น้ำ (mL)', powder: 'ผง (g)', concentration: 'ความเข้มข้น (%)', result: 'ผล', high: 'เข้มข้นเกิน', target: 'ตรงเป้า ✓', slightly: 'เจือจาง', dilute: 'เจือจางเกิน',
    summaryTitle: 'สรุปผลการทดลอง', summary: 'เมื่อใช้ผง ORS 5.0 g เท่าเดิม การเพิ่มปริมาตรน้ำทำให้ความเข้มข้นลดลง น้ำ 250 mL ให้ความเข้มข้น 2.0% ตรงตามเป้าหมาย ส่วนน้ำน้อยเกินไปทำให้เข้มข้นเกิน และน้ำมากเกินไปทำให้เจือจางเกิน', chartTitle: 'ความเข้มข้นตามปริมาตรน้ำ', safe: 'ช่วงเป้าหมาย 1.8–2.2%', xTitle: 'ปริมาตรน้ำ (mL)', yTitle: 'ความเข้มข้น (%)', legend: 'ผลการทดลอง', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Keputusan Eksperimen', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', badge: 'PISA 2 · Mereka bentuk · Tafsir data',
    heading: 'Serbuk ORS 5.0 g dikekalkan, isipadu air berubah', water: 'Air (mL)', powder: 'Serbuk (g)', concentration: 'Kepekatan (%)', result: 'Keputusan', high: 'Terlalu pekat', target: 'Tepat sasaran ✓', slightly: 'Sedikit cair', dilute: 'Terlalu cair',
    summaryTitle: 'Rumusan eksperimen', summary: 'Dengan 5.0 g serbuk ORS yang sama, penambahan isipadu air mengurangkan kepekatan. Air 250 mL menghasilkan kepekatan 2.0% seperti sasaran. Air terlalu sedikit menjadi terlalu pekat, manakala air terlalu banyak menjadi terlalu cair.', chartTitle: 'Kepekatan mengikut isipadu air', safe: 'Julat sasaran 1.8–2.2%', xTitle: 'Isipadu air (mL)', yTitle: 'Kepekatan (%)', legend: 'Keputusan eksperimen', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Results', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', badge: 'PISA 2 · Design · Interpret data',
    heading: 'The ORS powder stays at 5.0 g; only water volume changes', water: 'Water (mL)', powder: 'Powder (g)', concentration: 'Concentration (%)', result: 'Result', high: 'Too concentrated', target: 'On target ✓', slightly: 'Slightly dilute', dilute: 'Too dilute',
    summaryTitle: 'Experiment summary', summary: 'With the same 5.0 g of ORS powder, adding more water lowers concentration. At 250 mL, the concentration is 2.0%, matching the target. Too little water makes it too concentrated, while too much water makes it too dilute.', chartTitle: 'Concentration by water volume', safe: 'Target range 1.8–2.2%', xTitle: 'Water volume (mL)', yTitle: 'Concentration (%)', legend: 'Experiment results', next: 'Next', language: 'Choose language',
  },
} satisfies Record<Language, Record<string, string>>

function readResults(): Partial<Record<Volume, Result>> {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(resultStorageKey) || '{}')
    if (!parsed || typeof parsed !== 'object') return {}
    const valid: Partial<Record<Volume, Result>> = {}
    for (const volume of volumes) {
      const value = (parsed as Record<number, unknown>)[volume]
      if (value && typeof value === 'object') {
        const result = value as Partial<Result>
        if (Number.isFinite(result.calculated) && Number.isFinite(result.measured)) {
          valid[volume] = { calculated: result.calculated!, measured: result.measured! }
        }
      }
    }
    return valid
  } catch {
    return {}
  }
}

function ConcentrationChart({ results, text }: { results: Partial<Record<Volume, Result>>; text: Record<string, string> }) {
  const points = volumes.map((volume, index) => {
    const value = results[volume]?.calculated
    return { volume, value, x: 75 + index * 106, y: 350 - ((value ?? 0) / 5) * 285 }
  })
  const line = points.filter((point) => point.value !== undefined)
  const y = (value: number) => 350 - (value / 5) * 285
  return (
    <svg className="m2-exp2-results-chart" viewBox="0 0 500 410" role="img" aria-label={text.chartTitle}>
      {[0, 1, 2, 3, 4, 5].map((tick) => <g key={tick}>
        <line x1="58" x2="470" y1={y(tick)} y2={y(tick)} className="m2-exp2-results-grid" />
        <text x="48" y={y(tick) + 5} textAnchor="end">{tick}</text>
      </g>)}
      <rect x="58" y={y(2.2)} width="412" height={y(1.8) - y(2.2)} className="m2-exp2-results-safe-zone" />
      <text x="462" y={y(2.2) - 8} textAnchor="end" className="m2-exp2-results-safe-label">{text.safe}</text>
      <line x1="58" x2="58" y1="65" y2="350" className="m2-exp2-results-axis" />
      <line x1="58" x2="470" y1="350" y2="350" className="m2-exp2-results-axis" />
      {line.length > 1 && <polyline className="m2-exp2-results-trend" points={line.map((point) => `${point.x},${point.y}`).join(' ')} />}
      {points.map(({ volume, value, x, y: pointY }) => {
        const barTop = value === undefined ? 350 : pointY
        const barClass = `m2-exp2-result-bar m2-exp2-result-${outcomes[volume]}`
        return <g key={volume}>
          <rect x={x - 31} y={barTop} width="62" height={350 - barTop} rx="7" className={barClass} />
          {value !== undefined && <text x={x} y={barTop - 10} textAnchor="middle" className="m2-exp2-results-value">{value.toFixed(1)}</text>}
          <text x={x} y="378" textAnchor="middle">{volume}</text>
        </g>
      })}
      <text x="64" y="30" className="m2-exp2-results-unit">{text.yTitle}</text>
      <text x="466" y="402" textAnchor="end" className="m2-exp2-results-unit">{text.xTitle}</text>
    </svg>
  )
}

export function M2Experiment2ResultsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [results] = useState(readResults)
  const text = copy[language]
  const values = useMemo(() => results, [results])

  return (
    <main className="m2-objectives-page m2-exp2-results-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/lab" label={text.back} />
          <div className="m2-objectives-title"><span className="m2-objectives-number">9</span><h1>{text.title}</h1></div>
        </header>
        <div className="m2-objectives-layout m2-exp2-results-layout">
          <aside className="m2-objectives-sidecard m2-exp2-results-sidecard">
            <h2>{text.experiment}</h2><div className="m2-exp2-results-icon" aria-hidden="true">🩺</div>
            <h3>{text.mystery}</h3><span className="m2-pisa-badge">{text.badge}</span>
          </aside>
          <section className="m2-exp2-results-panel">
            <h2>{text.heading}</h2>
            <div className="m2-exp2-results-columns">
              <div className="m2-exp2-results-data">
                <div className="m2-exp2-results-table-wrap"><table>
                  <thead><tr><th>{text.water}</th><th>{text.powder}</th><th>{text.concentration}</th><th>{text.result}</th></tr></thead>
                  <tbody>{volumes.map((volume) => <tr key={volume} className={`outcome-${outcomes[volume]}`}>
                    <th scope="row">{volume}</th><td>5.0</td><td className="concentration-value">{values[volume]?.calculated.toFixed(volume === 375 ? 2 : 1) ?? '—'}</td>
                    <td><span>{text[outcomes[volume]]}</span></td>
                  </tr>)}</tbody>
                </table></div>
                <article className="m2-exp2-results-summary"><h3>{text.summaryTitle}</h3><p>{text.summary}</p></article>
              </div>
              <figure className="m2-exp2-results-chart-card"><figcaption>{text.chartTitle}</figcaption><ConcentrationChart results={values} text={text} />
                <div className="m2-exp2-results-legend"><span className="legend-high">{text.high}</span><span className="legend-target">{text.target}</span><span className="legend-dilute">{text.dilute}</span></div>
              </figure>
            </div>
            <div className="m2-exp2-results-next"><NextButton className="m2-objectives-next" label={text.next} href="/gradem2/m2exp2/answers" /></div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
    </main>
  )
}
