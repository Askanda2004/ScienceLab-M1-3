import { useMemo, useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import './exp2.css'
import './results.css'

type LiquidId = 'distilled' | 'salt' | 'seawater' | 'oil'
type Trial = {
  id: string
  liquid: LiquidId
  spoons: number
  mass: number
  density: number
  outcome: 'sink' | 'float' | 'suspend'
}

const STORAGE_KEY = 'science-lab-exp2-density-trials'
const EGG_DENSITY = 1.07
const liquidIds: LiquidId[] = ['distilled', 'seawater', 'salt', 'oil']
const colors: Record<LiquidId, string> = {
  distilled: '#4c79d5',
  seawater: '#4c8a5b',
  salt: '#ed8051',
  oil: '#d9a73a',
}

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ผลการทดลอง', experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    panelTitle: 'ความหนาแน่นของของเหลวกับการลอยของไข่ (ไข่ 1.07 g/mL)', liquid: 'ของเหลว', salt: 'เกลือ', density: 'g/mL', egg: 'ไข่',
    distilled: 'น้ำกลั่น', seawater: 'น้ำทะเล', saltWater: 'น้ำเกลือ', oil: 'น้ำมัน', spoon: 'ช้อนชา', sink: 'จม', float: 'ลอย', suspend: 'ลอยปริ่ม',
    summaryTitle: 'สรุปผลการทดลอง', summary: 'วัตถุลอยเมื่อของเหลวมีความหนาแน่นมากกว่าวัตถุ น้ำกลั่นมีความหนาแน่นประมาณ 1.00 g/mL ส่วนน้ำเกลือมีความหนาแน่นเพิ่มขึ้นตามปริมาณเกลือ ไข่ความหนาแน่น 1.07 g/mL จึงเริ่มลอยเมื่อเติมเกลือประมาณ 3 ช้อนชา',
    chartTitle: 'เปรียบเทียบความหนาแน่น', eggLine: 'ความหนาแน่นของไข่ 1.07', noTrials: 'ยังไม่มีผลจากการทดลอง จึงแสดงค่าตัวอย่าง', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Keputusan Eksperimen', experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', badge: 'PISA 2 · Reka bentuk · Tafsir data',
    panelTitle: 'Ketumpatan cecair dan telur terapung (telur 1.07 g/mL)', liquid: 'Cecair', salt: 'Garam', density: 'g/mL', egg: 'Telur',
    distilled: 'Air suling', seawater: 'Air laut', saltWater: 'Air garam', oil: 'Minyak', spoon: 'sudu teh', sink: 'Tenggelam', float: 'Terapung', suspend: 'Terapung di tengah',
    summaryTitle: 'Ringkasan keputusan', summary: 'Objek terapung apabila ketumpatan cecair melebihi ketumpatan objek. Air suling mempunyai ketumpatan kira-kira 1.00 g/mL. Ketumpatan air garam meningkat apabila lebih banyak garam ditambah. Telur 1.07 g/mL mula terapung dengan kira-kira 3 sudu teh garam.',
    chartTitle: 'Perbandingan ketumpatan', eggLine: 'Ketumpatan telur 1.07', noTrials: 'Belum ada keputusan. Nilai contoh dipaparkan.', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Experiment Results', experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', badge: 'PISA 2 · Design · Interpret data',
    panelTitle: 'Liquid density and egg buoyancy (egg 1.07 g/mL)', liquid: 'Liquid', salt: 'Salt', density: 'g/mL', egg: 'Egg',
    distilled: 'Distilled water', seawater: 'Seawater', saltWater: 'Salt water', oil: 'Oil', spoon: 'tsp', sink: 'Sinks', float: 'Floats', suspend: 'Suspended',
    summaryTitle: 'Experiment summary', summary: 'An object floats when the liquid is denser than the object. Distilled water is about 1.00 g/mL. Salt water gets denser as salt is added. The 1.07 g/mL egg begins to float at around 3 teaspoons of salt.',
    chartTitle: 'Compare liquid densities', eggLine: 'Egg density 1.07', noTrials: 'No saved trials yet. Example values are shown.', next: 'Next', language: 'Choose language',
  },
} satisfies Record<Language, Record<string, string>>

const sampleTrials: Trial[] = [
  { id: 'sample-distilled', liquid: 'distilled', spoons: 0, mass: 100, density: 1, outcome: 'sink' },
  { id: 'sample-seawater', liquid: 'seawater', spoons: 0, mass: 103, density: 1.03, outcome: 'sink' },
  { id: 'sample-salt', liquid: 'salt', spoons: 3, mass: 109, density: 1.09, outcome: 'float' },
]

function readTrials(): Trial[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(value)) return []
    return value.filter((item): item is Trial => Boolean(
      item && typeof item === 'object'
      && typeof item.id === 'string'
      && liquidIds.includes((item as Trial).liquid)
      && typeof (item as Trial).spoons === 'number'
      && typeof (item as Trial).mass === 'number'
      && typeof (item as Trial).density === 'number'
      && ['sink', 'float', 'suspend'].includes((item as Trial).outcome),
    ))
  } catch {
    return []
  }
}

function liquidName(id: LiquidId, text: Record<string, string>) {
  if (id === 'salt') return text.saltWater
  return text[id]
}

function outcomeName(outcome: Trial['outcome'], text: Record<string, string>) {
  return text[outcome]
}

function DensityChart({ values, text }: { values: Record<LiquidId, number>; text: Record<string, string> }) {
  const left = 54
  const right = 420
  const top = 34
  const bottom = 316
  const low = 0.85
  const high = 1.2
  const y = (density: number) => bottom - ((density - low) / (high - low)) * (bottom - top)
  const ticks = [0.9, 1, 1.1, 1.2]
  const names: Record<LiquidId, string> = {
    distilled: text.distilled,
    seawater: text.seawater,
    salt: text.saltWater,
    oil: text.oil,
  }
  const barWidth = 52
  const gap = (right - left - barWidth * liquidIds.length) / (liquidIds.length + 1)

  return (
    <svg className="exp2-results-chart" viewBox="0 0 470 390" role="img" aria-label={text.chartTitle}>
      <text x="60" y="25" className="chart-unit">g/mL</text>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} className="chart-gridline" />
          <text x={left - 9} y={y(tick) + 5} textAnchor="end" className="chart-tick">{tick.toFixed(tick === 1 ? 1 : 1)}</text>
        </g>
      ))}
      <line x1={left} x2={left} y1={top} y2={bottom} className="chart-axis" />
      <line x1={left} x2={right} y1={bottom} y2={bottom} className="chart-axis" />
      <line x1={left} x2={right} y1={y(EGG_DENSITY)} y2={y(EGG_DENSITY)} className="egg-density-line" />
      <rect x="270" y={y(EGG_DENSITY) - 23} width="138" height="25" rx="12" className="egg-line-label-bg" />
      <text x="339" y={y(EGG_DENSITY) - 6} textAnchor="middle" className="egg-line-label">{text.eggLine}</text>
      {liquidIds.map((id, index) => {
        const x = left + gap * (index + 1) + barWidth * index
        const barY = y(values[id])
        return (
          <g key={id}>
            <rect x={x} y={barY} width={barWidth} height={bottom - barY} rx="8" fill={colors[id]} className="density-bar" />
            <text x={x + barWidth / 2} y={barY - 9} textAnchor="middle" className="bar-value">{values[id].toFixed(2)}</text>
            <text x={x + barWidth / 2} y={bottom + 24} textAnchor="middle" className="bar-label">{names[id]}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function Experiment2ResultsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [trials] = useState<Trial[]>(readTrials)
  const text = copy[language]
  const rows = trials.length ? trials : sampleTrials
  const values = useMemo(() => {
    const current: Record<LiquidId, number> = { distilled: 1, seawater: 1.03, salt: 1.09, oil: 0.92 }
    for (const id of liquidIds) {
      const latest = [...trials].reverse().find((trial) => trial.liquid === id)
      if (latest) current[id] = latest.density
    }
    return current
  }, [trials])

  return (
    <main className="objectives-page exp2-page exp2-results-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content exp2-results-content">
        <header className="objectives-header exp2-results-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/lab" label={text.back} />
          <div className="objectives-title exp2-title">
            <span className="objectives-number">9</span>
            <h1>{text.title}</h1>
          </div>
        </header>

        <div className="objectives-layout exp2-results-layout">
          <aside className="objectives-sidecard exp2-results-sidecard">
            <h2>{text.experiment}</h2>
            <img src={densityImage} alt="" />
            <h3>{text.mystery}</h3>
            <span className="pisa-badge">{text.badge}</span>
          </aside>

          <section className="objectives-panel exp2-results-panel">
            <h2>{text.panelTitle}</h2>
            {!trials.length && <p className="exp2-results-sample-note">{text.noTrials}</p>}
            <div className="exp2-results-columns">
              <div className="exp2-results-data">
                <div className="exp2-results-table-wrap">
                  <table className="exp2-results-table">
                    <thead>
                      <tr><th>{text.liquid}</th><th>{text.salt}</th><th>{text.density}</th><th>{text.egg}</th></tr>
                    </thead>
                    <tbody>
                      {rows.map((trial) => (
                        <tr key={trial.id}>
                          <th scope="row">{liquidName(trial.liquid, text)}</th>
                          <td>{trial.liquid === 'salt' ? `${trial.spoons} ${text.spoon}` : '—'}</td>
                          <td>{trial.density.toFixed(2)}</td>
                          <td className={`exp2-outcome exp2-outcome-${trial.outcome}`}>{outcomeName(trial.outcome, text)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <article className="exp2-results-summary">
                  <h3>{text.summaryTitle}</h3>
                  <p>{text.summary}</p>
                </article>
              </div>
              <figure className="exp2-results-figure">
                <figcaption>{text.chartTitle}</figcaption>
                <DensityChart values={values} text={text} />
                <div className="exp2-results-legend">
                  {liquidIds.map((id) => <span key={id}><i style={{ backgroundColor: colors[id] }} />{liquidName(id, text)}</span>)}
                </div>
              </figure>
            </div>
          </section>
        </div>
      </div>
      <div className="exp2-results-actions">
        <NextButton className="objectives-next" label={text.next} href="/gradem1/exp2/conclusion" />
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
    </main>
  )
}
