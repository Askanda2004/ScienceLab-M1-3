import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-results.css'

type SoluteId = 'sugar' | 'salt' | 'alum'
type Temperature = 10 | 30 | 50 | 80
type Measurement = { grams: number; spoonAdditions: number }
type Results = Record<SoluteId, Partial<Record<Temperature, Measurement>>>

const RESULTS_KEY = 'science-lab-m2-exp1-solubility-results'
const solutes: SoluteId[] = ['sugar', 'salt', 'alum']
const temperatures: Temperature[] = [10, 30, 50, 80]
const emptyResults: Results = { sugar: {}, salt: {}, alum: {} }
const colors: Record<SoluteId, string> = { sugar: '#e6813d', salt: '#4c83d2', alum: '#8054ce' }

const names: Record<SoluteId, Record<Language, string>> = {
  sugar: { th: 'น้ำตาล', ms: 'Gula', en: 'Sugar' },
  salt: { th: 'เกลือ', ms: 'Garam', en: 'Salt' },
  alum: { th: 'สารส้ม', ms: 'Tawas', en: 'Alum' },
}

function readResults(): Results {
  try {
    const raw = window.localStorage.getItem(RESULTS_KEY)
    if (!raw) return emptyResults
    const parsed = JSON.parse(raw) as Partial<Results>
    const results: Results = { sugar: {}, salt: {}, alum: {} }
    for (const solute of solutes) {
      for (const temperature of temperatures) {
        const measurement = parsed[solute]?.[temperature]
        if (measurement && Number.isFinite(measurement.grams)) results[solute][temperature] = measurement
      }
    }
    return results
  } catch {
    return emptyResults
  }
}

const translations = {
  th: {
    back: 'ย้อนกลับ', title: 'ผลการทดลอง', experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    chartTitle: 'สภาพละลายได้ของสาร 3 ชนิด (g ต่อน้ำ 100 g)',
    substance: 'ตัวละลาย', low: '10 °C', high: '80 °C', trend: 'กราฟ', trendSugar: 'ขึ้นมาก', trendSalt: 'เกือบคงที่', trendAlum: 'เพิ่มขึ้น',
    summaryTitle: 'สรุปผลการทดลอง', summary: 'น้ำร้อนละลายตัวละลายได้มากกว่าน้ำเย็น แต่เพิ่มไม่เท่ากัน: น้ำตาลเพิ่มมาก เกลือแทบไม่เปลี่ยน ส่วนสารส้มเพิ่มขึ้นชัดเจนเมื่อน้ำร้อน',
    observation: 'ตอบปริศนา', lowTemp: 'อุณหภูมิต่ำ 10 °C', dataHint: 'กราฟแสดงเฉพาะข้อมูลที่บันทึกในแล็บ',
    graphAxis: 'g / น้ำ 100 g', temperatures: 'อุณหภูมิ (°C)', next: 'ต่อไป', language: 'เลือกภาษา',
    incomplete: 'ยังมีข้อมูลไม่ครบทุกชนิด กลับไปบันทึกผลในแล็บเพื่อเปรียบเทียบให้ครบ',
    missing: 'ยังไม่มีข้อมูล',
  },
  ms: {
    back: 'Kembali', title: 'Keputusan Eksperimen', experiment: 'Eksperimen 1',
    mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    chartTitle: 'Keterlarutan 3 bahan (g bagi setiap 100 g air)',
    substance: 'Zat terlarut', low: '10 °C', high: '80 °C', trend: 'Graf', trendSugar: 'Meningkat banyak', trendSalt: 'Hampir tetap', trendAlum: 'Meningkat',
    summaryTitle: 'Rumusan eksperimen', summary: 'Air panas melarutkan lebih banyak bahan, tetapi kesannya berbeza: gula meningkat banyak, garam hampir tidak berubah, manakala tawas meningkat dengan ketara.',
    observation: 'Jawapan misteri', lowTemp: 'Suhu rendah 10 °C', dataHint: 'Graf memaparkan data yang direkodkan di makmal',
    graphAxis: 'g / 100 g air', temperatures: 'Suhu (°C)', next: 'Seterusnya', language: 'Pilih bahasa',
    incomplete: 'Data belum lengkap untuk semua bahan. Kembali ke makmal untuk merekodkan keputusan yang selebihnya.',
    missing: 'Tiada data',
  },
  en: {
    back: 'Back', title: 'Experiment Results', experiment: 'Experiment 1',
    mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    chartTitle: 'Solubility of 3 solutes (g per 100 g water)',
    substance: 'Solute', low: '10 °C', high: '80 °C', trend: 'Graph', trendSugar: 'Large increase', trendSalt: 'Almost unchanged', trendAlum: 'Increases',
    summaryTitle: 'Experiment summary', summary: 'Hot water dissolves more solute, but not equally: sugar increases greatly, salt changes very little, and alum rises clearly as the water gets hotter.',
    observation: 'Answer to the mystery', lowTemp: 'At 10 °C', dataHint: 'The graph shows measurements recorded in the lab',
    graphAxis: 'g / 100 g water', temperatures: 'Temperature (°C)', next: 'Continue', language: 'Choose language',
    incomplete: 'Some solute data is missing. Return to the lab and record the remaining results for comparison.',
    missing: 'No data',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  chartTitle: string; substance: string; low: string; high: string; trend: string; trendSugar: string; trendSalt: string; trendAlum: string;
  summaryTitle: string; summary: string; observation: string; lowTemp: string; dataHint: string;
  graphAxis: string; temperatures: string; next: string; language: string; incomplete: string; missing: string
}>

export function M2Experiment1ResultsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [results] = useState<Results>(readResults)
  const copy = translations[language]
  const complete = solutes.every((solute) => temperatures.every((temperature) => results[solute][temperature] !== undefined))
  const completedSolutes = solutes.filter((solute) => temperatures.every((temperature) => results[solute][temperature] !== undefined)).length

  return (
    <main className="m2-objectives-page m2-results-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/lab" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">10</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="m2-objectives-layout m2-results-layout">
          <aside className="m2-objectives-sidecard m2-results-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-results-cup" aria-hidden="true">☕</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>

          <section className="m2-results-panel" aria-label={copy.title}>
            <h2 className="m2-results-heading">{copy.chartTitle}</h2>
            <div className="m2-results-columns">
              <div className="m2-results-data-column">
                <div className="m2-results-table-wrap">
                  <table className="m2-results-table">
                    <thead><tr><th>{copy.substance}</th><th>{copy.low}</th><th>{copy.high}</th><th>{copy.trend}</th></tr></thead>
                    <tbody>
                      {solutes.map((solute) => {
                        const low = results[solute][10]?.grams
                        const high = results[solute][80]?.grams
                        const change = low !== undefined && high !== undefined ? high - low : undefined
                        const trendLabel = solute === 'sugar' ? copy.trendSugar : solute === 'salt' ? copy.trendSalt : copy.trendAlum
                        const trendText = change === undefined ? copy.missing : `${trendLabel} (+${change})`
                        return <tr key={solute}>
                          <th scope="row"><i style={{ background: colors[solute] }} />{names[solute][language]}</th>
                          <td>{low ?? '—'}</td>
                          <td className="m2-results-high">{high ?? '—'}</td>
                          <td>{trendText}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>

                <article className="m2-results-summary">
                  <h3>{copy.summaryTitle}</h3>
                  <p>{copy.summary}</p>
                  <div className="m2-results-observation">
                    <strong>{copy.observation}: {copy.lowTemp}</strong>
                    <span>{solutes.map((solute) => `${names[solute][language]} ${results[solute][10]?.grams ?? '—'} g`).join(' · ')}</span>
                  </div>
                  {!complete && <p className="m2-results-incomplete">{copy.incomplete} ({completedSolutes}/3)</p>}
                </article>
              </div>

              <div className="m2-results-chart-card">
                <strong className="m2-results-chart-axis-title">{copy.graphAxis}</strong>
                <svg className="m2-results-chart" viewBox="0 0 390 390" role="img" aria-label={copy.chartTitle}>
                  {[0, 100, 200, 300, 400].map((tick) => {
                    const y = 328 - tick / 400 * 275
                    return <g key={tick}><line className="m2-results-grid-line" x1="48" x2="372" y1={y} y2={y} /><text className="m2-results-y-label" x="40" y={y + 4}>{tick}</text></g>
                  })}
                  {temperatures.map((temperature, index) => {
                    const x = 54 + index * 104
                    return <text className="m2-results-x-label" key={temperature} x={x} y="352">{temperature}°</text>
                  })}
                  {solutes.map((solute) => {
                    const points = temperatures.flatMap((temperature, index) => {
                      const grams = results[solute][temperature]?.grams
                      if (grams === undefined) return []
                      return [{ x: 54 + index * 104, y: 328 - grams / 400 * 275, grams, temperature }]
                    })
                    return <g key={solute} className={`m2-results-series m2-results-series-${solute}`}>
                      {points.length > 1 && <polyline points={points.map((point) => `${point.x},${point.y}`).join(' ')} />}
                      {points.map((point) => <g key={point.temperature}><circle cx={point.x} cy={point.y} r="6" /><text x={point.x} y={point.y - 11}>{point.grams}</text></g>)}
                    </g>
                  })}
                </svg>
                <p className="m2-results-x-title">{copy.temperatures}</p>
                <div className="m2-results-legend">
                  {solutes.map((solute) => <span key={solute}><i style={{ background: colors[solute] }} />{names[solute][language]}</span>)}
                </div>
                <small>{copy.dataHint}</small>
              </div>
            </div>
            <div className="m2-results-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp1/answers" />
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
