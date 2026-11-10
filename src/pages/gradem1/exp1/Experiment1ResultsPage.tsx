import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import { readExperiment1Trials, type Experiment1Liquid, type Experiment1Trial } from './experiment1Results'
import './objectives.css'
import './results.css'

const liquidOrder: Experiment1Liquid[] = ['distilled', 'salt', 'syrup']
const liquidKeys: Record<Experiment1Liquid, 'distilled' | 'salt' | 'syrup'> = {
  distilled: 'distilled', salt: 'salt', syrup: 'syrup',
}
const colors: Record<Experiment1Liquid, string> = { distilled: '#4266d5', salt: '#e77b3d', syrup: '#8a5bd7' }

const copyByLanguage = {
  th: {
    back: 'ย้อนกลับ', title: 'ผลการทดลอง', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    panelTitle: 'จุดเดือดของของเหลว 3 ชนิด', panelNote: 'น้ำ 200 mL · แสดงผลทุกครั้งที่ทดลอง พร้อมจำนวนช้อนตัวละลาย', chartTitle: 'กราฟอุณหภูมิขณะเดือด', xTitle: 'เวลา (นาที)', chartLatest: 'แสดงผลการทดลองล่าสุดของของเหลวแต่ละชนิด',
    distilled: 'น้ำกลั่น', salt: 'น้ำเกลือ', syrup: 'น้ำเชื่อม',
    liquid: 'ของเหลว', spoons: 'ตัวละลาย', boiling: 'เริ่มเดือด °C', afterThree: 'หลัง 3 นาที °C', behavior: 'แนวโน้ม',
    stable: 'ราบ', rising: 'ยังเพิ่ม', summaryTitle: 'สรุปผลการทดลอง',
    summary: 'น้ำกลั่นเดือดที่ประมาณ 100 °C และคงที่ ส่วนสารละลายมีจุดเดือดสูงกว่าและอาจเพิ่มขึ้นเมื่อให้ความร้อนต่อ',
    next: 'ต่อไป', noData: 'ยังไม่มีผลการทดลอง กลับไปทดลองของเหลวทั้ง 3 ชนิดเพื่อดูตารางและกราฟ',
    afterLabel: '3 นาที', spoonUnit: 'ช้อน',
  },
  ms: {
    back: 'Kembali', title: 'Keputusan Eksperimen', experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana', pisa: 'PISA 1 · Menjelaskan fenomena',
    panelTitle: 'Takat didih tiga jenis cecair', panelNote: 'Air 200 mL · Semua percubaan dan jumlah sudu bahan terlarut', chartTitle: 'Graf suhu semasa mendidih', xTitle: 'Masa (minit)', chartLatest: 'Keputusan terkini bagi setiap cecair',
    distilled: 'Air suling', salt: 'Air garam', syrup: 'Air gula',
    liquid: 'Cecair', spoons: 'Bahan terlarut', boiling: 'Mula mendidih °C', afterThree: 'Selepas 3 minit °C', behavior: 'Trend',
    stable: 'Mendatar', rising: 'Meningkat', summaryTitle: 'Ringkasan keputusan',
    summary: 'Air suling mendidih sekitar 100 °C dan kekal stabil. Larutan mempunyai takat didih lebih tinggi dan boleh meningkat apabila dipanaskan berterusan.',
    next: 'Seterusnya', noData: 'Belum ada keputusan. Kembali dan uji ketiga-tiga cecair untuk melihat jadual dan graf.',
    afterLabel: '3 minit', spoonUnit: 'sudu',
  },
  en: {
    back: 'Back', title: 'Experiment Results', experiment: 'Experiment 1', mystery: "Mana’s Sugar Water Mystery", pisa: 'PISA 1 · Explain phenomena',
    panelTitle: 'Boiling points of three liquids', panelNote: '200 mL water · All trials with solute spoon counts', chartTitle: 'Boiling temperature graph', xTitle: 'Time (minutes)', chartLatest: 'Latest trial for each liquid',
    distilled: 'Distilled water', salt: 'Salt water', syrup: 'Sugar water',
    liquid: 'Liquid', spoons: 'Solute', boiling: 'Boiling point °C', afterThree: 'After 3 min °C', behavior: 'Trend',
    stable: 'Flat', rising: 'Rising', summaryTitle: 'Summary',
    summary: 'Distilled water boils at about 100 °C and stays steady. Solutions have higher boiling points and may continue rising when heated.',
    next: 'Next', noData: 'No results yet. Return to the lab and test all three liquids to view the table and graph.',
    afterLabel: '3 min', spoonUnit: 'spoons',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; panelTitle: string; panelNote: string; chartTitle: string; xTitle: string; chartLatest: string;
  liquid: string; distilled: string; salt: string; syrup: string; spoons: string; boiling: string; afterThree: string; behavior: string;
  stable: string; rising: string; summaryTitle: string; summary: string; next: string;
  noData: string; afterLabel: string; spoonUnit: string
}>

function latestTrials(trials: Experiment1Trial[]) {
  return liquidOrder.map((liquid) => [...trials].reverse().find((trial) => trial.liquid === liquid)).filter((trial): trial is Experiment1Trial => Boolean(trial))
}

function ResultsChart({ trials, afterLabel, xTitle }: { trials: Experiment1Trial[]; afterLabel: string; xTitle: string }) {
  const left = 52
  const right = 405
  const top = 28
  const bottom = 268
  const low = 25
  const high = Math.max(110, Math.ceil(Math.max(...trials.flatMap((trial) => [trial.boilingPoint, trial.afterThreeMinutes])) / 10) * 10)
  const x = (minute: number) => left + (minute / 3) * (right - left)
  const y = (temperature: number) => bottom - ((temperature - low) / (high - low)) * (bottom - top)
  const ticks = [30, 50, 70, 90, 110].filter((tick) => tick <= high)

  return (
    <svg className="results-chart" viewBox="0 0 450 330" role="img" aria-label={`${xTitle}: ${afterLabel}`}>
      <defs>
        <linearGradient id="chart-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eaf0f8" />
        </linearGradient>
        <filter id="chart-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#304982" floodOpacity=".16" />
        </filter>
      </defs>
      <rect x={left} y={top} width={right - left} height={bottom - top} rx="12" fill="url(#chart-area)" />
      <text x={left - 20} y={top - 8} className="chart-unit">°C</text>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} className="chart-gridline" />
          <text x={left - 9} y={y(tick) + 4} textAnchor="end" className="chart-tick">{tick}</text>
        </g>
      ))}
      <line x1={left} x2={right} y1={bottom} y2={bottom} className="chart-axis" />
      <line x1={left} x2={left} y1={top} y2={bottom} className="chart-axis" />
      <line x1={right} x2={right} y1={top} y2={bottom} className="chart-after-mark" />
      {[0, 1, 2, 3].map((minute) => <text key={minute} x={x(minute)} y={bottom + 20} textAnchor="middle" className="chart-tick">{minute}</text>)}
      <text x={right} y={bottom + 43} textAnchor="end" className="chart-x-title">{xTitle}</text>
      {trials.map((trial) => {
        const color = colors[trial.liquid]
        const pointValues = [30, 30 + (trial.boilingPoint - 30) * 0.58, trial.boilingPoint, trial.afterThreeMinutes]
        const pointTimes = [0, 0.55, 1.25, 3]
        const points = pointValues.map((temperature, index) => `${x(pointTimes[index])},${y(temperature)}`).join(' ')
        return (
          <g key={trial.liquid}>
            <polyline points={points} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity=".12" />
            <polyline points={points} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {pointValues.map((temperature, index) => (
              <g key={index} filter="url(#chart-shadow)">
                <circle cx={x(pointTimes[index])} cy={y(temperature)} r="6.5" fill="#fff" />
                <circle cx={x(pointTimes[index])} cy={y(temperature)} r="4.2" fill={color} />
              </g>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export function Experiment1ResultsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [trials] = useState<Experiment1Trial[]>(readExperiment1Trials)
  const copy = copyByLanguage[language]
  const latest = latestTrials(trials)
  const chartTrials = latestTrials(trials)

  return (
    <main className="objectives-page results-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content results-content">
        <header className="objectives-header results-header">
          <BackButton className="objectives-back results-back" href="/gradem1/exp1/lab" label={copy.back} />
          <div className="objectives-title results-title">
            <span className="objectives-number">10</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="objectives-layout results-page-layout">
          <aside className="objectives-sidecard results-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={boilingImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <section className="results-panel" aria-label={copy.title}>
            <div className="results-panel-heading">
              <h2>{copy.panelTitle}</h2>
              <p>{copy.panelNote}</p>
            </div>
            {latest.length === 0 ? (
              <div className="results-empty">{copy.noData}</div>
            ) : (
              <>
                <div className="results-layout">
                  <div className="results-data-column">
                    <div className="results-table-scroll">
                      <table className="results-table">
                        <thead>
                          <tr><th>{copy.liquid}</th><th>{copy.boiling}</th><th>{copy.afterThree}</th><th>{copy.behavior}</th></tr>
                        </thead>
                        <tbody>
                          {trials.map((trial) => (
                            <tr key={trial.id}>
                              <th scope="row">
                                <span className="results-liquid-name">{copy[liquidKeys[trial.liquid]]}</span>
                                <small>{trial.spoons === 0 ? '–' : `${trial.spoons} ${copy.spoonUnit}`}</small>
                              </th>
                              <td>{trial.boilingPoint.toFixed(1)}</td>
                              <td>{trial.afterThreeMinutes.toFixed(1)}</td>
                              <td className="results-trend">{trial.liquid === 'distilled' ? copy.stable : copy.rising}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <article className="results-summary">
                      <h3>{copy.summaryTitle}</h3>
                      <p>{copy.summary}</p>
                    </article>
                  </div>

                  <aside className="results-chart-card">
                    <h3>{copy.chartTitle}</h3>
                    <p className="results-chart-note">{copy.chartLatest}</p>
                    <ResultsChart trials={chartTrials} afterLabel={copy.afterLabel} xTitle={copy.xTitle} />
                    <ul className="results-legend">
                      {chartTrials.map((trial) => {
                        const liquid = trial.liquid
                        return <li key={liquid}><i style={{ backgroundColor: colors[liquid] }} />{copy[liquidKeys[liquid]]}</li>
                      })}
                    </ul>
                  </aside>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
      <NextButton className="results-footer-next" label={copy.next} href="/gradem1/exp1/conclusion" />
      <LanguageSwitcher language={language} label={language === 'th' ? 'เลือกภาษา' : language === 'ms' ? 'Pilih bahasa' : 'Choose language'} onLanguageChange={setLanguage} />
    </main>
  )
}
