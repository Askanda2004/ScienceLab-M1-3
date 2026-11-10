import { useEffect, useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import { EXPERIMENT1_RESULTS_KEY, readExperiment1Trials, type Experiment1Liquid, type Experiment1Trial } from './experiment1Results'
import './objectives.css'
import './lab.css'

type LiquidId = Experiment1Liquid

const liquidIds: LiquidId[] = ['distilled', 'salt', 'syrup']
const liquidInfo: Record<LiquidId, { boilingPoint: (spoons: number) => number; afterThree: (spoons: number) => number }> = {
  distilled: { boilingPoint: () => 100, afterThree: () => 100 },
  salt: { boilingPoint: (spoons) => 100 + spoons * 1.3, afterThree: (spoons) => 100 + spoons * 1.3 + spoons * 0.15 },
  syrup: { boilingPoint: (spoons) => 100 + spoons * 0.1, afterThree: (spoons) => 100 + spoons * 0.1 + spoons * 0.025 },
}

const translations = {
  th: {
    back: 'ย้อนกลับ', title: 'ห้องทดลองจำลอง', language: 'เลือกภาษา',
    chooseLiquid: 'เลือกของเหลว', distilled: 'น้ำกลั่น', salt: 'น้ำเกลือ', syrup: 'น้ำเชื่อม',
    solute: 'ตัวละลาย', spoons: 'ช้อน', amount: 'ปริมาณตัวละลาย', water: 'น้ำ 200 mL',
    heat: 'ให้ความร้อน', pause: 'กำลังให้ความร้อน…', reset: 'รีเซ็ต', heating: 'กำลังเดือด', ready: 'พร้อมทดลอง',
    boiling: 'เริ่มเดือด', timer: 'เวลาในการทดลอง', perMinute: '1 นาที = 3 วินาที',
    tableTitle: 'บันทึกผลการทดลอง', liquid: 'ของเหลว', spoonCount: 'ช้อน', afterThree: 'หลัง 3 นาที',
    noRecords: 'ทดลองของเหลวแต่ละชนิดเพื่อบันทึกผล', seeResults: 'ดูผลการทดลอง', allNeeded: 'ทดลองให้ครบทั้ง 3 ของเหลวก่อนดูผล',
    principles: 'หลักการทดลองและตัวแปร', principleItems: [
      'จุดเดือดคืออุณหภูมิที่ของเหลวเดือดกลายเป็นไอ ขณะเดือด ความร้อนถูกใช้เปลี่ยนน้ำเป็นไอ อุณหภูมิจึงแทบไม่สูงขึ้น',
      'น้ำกลั่นเป็นสารบริสุทธิ์ จึงมีจุดเดือดคงที่ประมาณ 100 °C ที่ความดันปกติ',
      'น้ำเกลือและน้ำเชื่อมเป็นสารละลาย จุดเดือดสูงกว่า 100 °C และเปลี่ยนได้เมื่อน้ำระเหยจนสารละลายเข้มข้นขึ้น',
      'เพิ่มจำนวนช้อนตัวละลายแล้วจุดเดือดจะสูงขึ้น · ตัวแปรต้น: ชนิดของเหลวและจำนวนช้อน · ตัวแปรตาม: อุณหภูมิเริ่มเดือดและหลัง 3 นาที · ตัวแปรควบคุม: น้ำ 200 mL, 1 ช้อน = 15 g, ใช้ไฟเท่ากัน, อุณหภูมิเริ่มต้น 28 °C',
    ],
    degrees: '°C', minutes: 'นาที', startAt: 'เริ่มเดือด', current: 'อุณหภูมิปัจจุบัน',
  },
  ms: {
    back: 'Kembali', title: 'Makmal Simulasi', language: 'Pilih bahasa',
    chooseLiquid: 'Pilih cecair', distilled: 'Air suling', salt: 'Air garam', syrup: 'Air gula',
    solute: 'Bahan terlarut', spoons: 'sudu', amount: 'Jumlah bahan terlarut', water: 'Air 200 mL',
    heat: 'Panaskan', pause: 'Sedang dipanaskan…', reset: 'Set semula', heating: 'Sedang mendidih', ready: 'Sedia untuk eksperimen',
    boiling: 'Mula mendidih', timer: 'Masa eksperimen', perMinute: '1 minit = 3 saat',
    tableTitle: 'Rekod keputusan eksperimen', liquid: 'Cecair', spoonCount: 'Sudu', afterThree: 'Selepas 3 minit',
    noRecords: 'Eksperimen setiap cecair untuk merekod keputusan', seeResults: 'Lihat keputusan', allNeeded: 'Uji ketiga-tiga cecair untuk melihat keputusan',
    principles: 'Prinsip eksperimen dan pemboleh ubah', principleItems: [
      'Takat didih ialah suhu apabila cecair mendidih menjadi wap. Semasa mendidih, haba digunakan untuk menukarkan air kepada wap.',
      'Air suling ialah bahan tulen, maka takat didihnya kekal sekitar 100 °C pada tekanan biasa.',
      'Air garam dan air gula ialah larutan. Takat didihnya melebihi 100 °C dan boleh meningkat apabila air tersejat.',
      'Lebih banyak bahan terlarut meningkatkan takat didih · Dimanipulasi: jenis cecair dan jumlah sudu · Bergerak balas: suhu mula mendidih dan selepas 3 minit · Dimalarkan: 200 mL, 1 sudu = 15 g, tahap haba dan suhu awal 28 °C',
    ],
    degrees: '°C', minutes: 'minit', startAt: 'Mula mendidih', current: 'Suhu semasa',
  },
  en: {
    back: 'Back', title: 'Virtual Laboratory', language: 'Choose language',
    chooseLiquid: 'Choose a liquid', distilled: 'Distilled water', salt: 'Salt water', syrup: 'Sugar water',
    solute: 'Solute', spoons: 'spoons', amount: 'Amount of solute', water: '200 mL of water',
    heat: 'Apply heat', pause: 'Heating…', reset: 'Reset', heating: 'Boiling', ready: 'Ready to experiment',
    boiling: 'Boiling begins', timer: 'Experiment time', perMinute: '1 minute = 3 seconds',
    tableTitle: 'Experiment record', liquid: 'Liquid', spoonCount: 'Spoons', afterThree: 'After 3 min',
    noRecords: 'Run each liquid to record its result', seeResults: 'View results', allNeeded: 'Test all 3 liquids to view results',
    principles: 'Scientific principles and variables', principleItems: [
      'The boiling point is the temperature at which a liquid boils into vapor. During boiling, added heat changes liquid into vapor, so temperature stays nearly constant.',
      'Distilled water is a pure substance, so its boiling point stays near 100 °C at normal pressure.',
      'Salt water and sugar water are solutions. Their boiling points exceed 100 °C and may rise as water evaporates and the solution becomes more concentrated.',
      'More solute raises the boiling point · Independent variables: liquid type and spoon count · Dependent variables: boiling temperature and temperature after 3 minutes · Controls: 200 mL, 1 spoon = 15 g, same heat, starting temperature 28 °C',
    ],
    degrees: '°C', minutes: 'min', startAt: 'Boiling begins', current: 'Current temperature',
  },
} satisfies Record<Language, {
  back: string; title: string; language: string; chooseLiquid: string; distilled: string; salt: string; syrup: string;
  solute: string; spoons: string; amount: string; water: string; heat: string; pause: string; reset: string;
  heating: string; ready: string; boiling: string; timer: string; perMinute: string; tableTitle: string;
  liquid: string; spoonCount: string; afterThree: string; noRecords: string; seeResults: string; allNeeded: string;
  principles: string;
  principleItems: string[]; degrees: string; minutes: string; startAt: string; current: string
}>

const liquidLabels: Record<LiquidId, 'distilled' | 'salt' | 'syrup'> = {
  distilled: 'distilled', salt: 'salt', syrup: 'syrup',
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

function boilingPoint(liquid: LiquidId, spoons: number) {
  return round(liquidInfo[liquid].boilingPoint(spoons))
}

function afterThreeMinutes(liquid: LiquidId, spoons: number) {
  return round(liquidInfo[liquid].afterThree(spoons))
}

function temperatureAt(liquid: LiquidId, spoons: number, minute: number) {
  const boiling = boilingPoint(liquid, spoons)
  const finalTemperature = afterThreeMinutes(liquid, spoons)
  const milestones = [30, 52.4, 78.1, Math.min(boiling - 0.7, 101.9), finalTemperature]
  const lowerMinute = Math.floor(minute)
  if (lowerMinute >= 4) return finalTemperature
  const fraction = minute - lowerMinute
  return round(milestones[lowerMinute] + (milestones[lowerMinute + 1] - milestones[lowerMinute]) * fraction)
}

export function Experiment1LabPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [liquid, setLiquid] = useState<LiquidId>('distilled')
  const [spoons, setSpoons] = useState(2)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isHeating, setIsHeating] = useState(false)
  const [trials, setTrials] = useState<Experiment1Trial[]>(readExperiment1Trials)
  const copy = translations[language]
  const elapsedMinutes = elapsedSeconds / 3
  const currentTemperature = temperatureAt(liquid, spoons, elapsedMinutes)
  const selectedBoilingPoint = boilingPoint(liquid, spoons)
  const completed = liquidIds.every((id) => trials.some((trial) => trial.liquid === id))

  useEffect(() => {
    try {
      window.localStorage.setItem(EXPERIMENT1_RESULTS_KEY, JSON.stringify(trials))
    } catch {
      // Keep the lab usable if browser storage is unavailable.
    }
  }, [trials])

  useEffect(() => {
    if (!isHeating) return
    const timer = window.setInterval(() => setElapsedSeconds((seconds) => Math.min(seconds + 1, 12)), 1000)
    return () => window.clearInterval(timer)
  }, [isHeating])

  useEffect(() => {
    if (!isHeating || elapsedSeconds < 12) return
    setIsHeating(false)
    setTrials((existing) => {
      const nextTrial: Experiment1Trial = {
        id: `${Date.now()}-${existing.length}`,
        liquid,
        spoons: liquid === 'distilled' ? 0 : spoons,
        boilingPoint: selectedBoilingPoint,
        afterThreeMinutes: afterThreeMinutes(liquid, liquid === 'distilled' ? 0 : spoons),
      }
      return [...existing, nextTrial]
    })
  }, [elapsedSeconds, isHeating, liquid, selectedBoilingPoint, spoons])

  function chooseLiquid(nextLiquid: LiquidId) {
    if (isHeating) return
    setLiquid(nextLiquid)
    setElapsedSeconds(0)
    if (nextLiquid === 'distilled') setSpoons(0)
    else if (liquid === 'distilled') setSpoons(2)
  }

  function startHeating() {
    if (elapsedSeconds >= 12) setElapsedSeconds(0)
    setIsHeating(true)
  }

  function resetTrial() {
    setIsHeating(false)
    setElapsedSeconds(0)
  }

  function resetTable() {
    setTrials([])
  }

  return (
    <main className="objectives-page lab-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content lab-content">
        <header className="objectives-header lab-header">
          <BackButton className="objectives-back" href="/gradem1/exp1/prediction" label={copy.back} />
          <div className="objectives-title">
            <span className="objectives-number">9</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <section className="lab-workspace" aria-label={copy.title}>
          <section className="lab-control-panel" aria-labelledby="lab-liquid-title">
            <h2 id="lab-liquid-title">{copy.chooseLiquid}</h2>
            <div className="liquid-options">
              {liquidIds.map((id) => (
                <button
                  className={`liquid-option${liquid === id ? ' is-active' : ''}`}
                  key={id}
                  type="button"
                  disabled={isHeating}
                  aria-pressed={liquid === id}
                  onClick={() => chooseLiquid(id)}
                >
                  {copy[liquidLabels[id]]}{liquid === id ? ' ✓' : ''}
                </button>
              ))}
            </div>

            <div className="solute-control">
              <label htmlFor="solute-spoons">{copy.amount}: <strong>{liquid === 'distilled' ? 0 : spoons} {copy.spoons}</strong></label>
              <input
                id="solute-spoons"
                type="range"
                min="0"
                max="5"
                step="1"
                value={liquid === 'distilled' ? 0 : spoons}
                disabled={isHeating || liquid === 'distilled'}
                onChange={(event) => { setSpoons(Number(event.target.value)); setElapsedSeconds(0) }}
              />
              <div className="range-labels"><span>0</span><span>5 {copy.spoons}</span></div>
            </div>
            <p className="lab-water-note">{copy.water} · 1 {copy.spoons} = 15 g</p>

            <div className="lab-control-actions">
              <button className="lab-heat-button" type="button" onClick={startHeating} disabled={isHeating}>
                <span aria-hidden="true">▶</span> {isHeating ? copy.pause : copy.heat}
              </button>
              <button className="lab-reset-button" type="button" onClick={resetTrial}>↻ {copy.reset}</button>
            </div>
          </section>

          <section className={`lab-simulation-panel${isHeating ? ' is-heating' : ''}`} aria-live="polite">
            <div className="lab-simulation-status">{elapsedSeconds >= 9 ? copy.heating : isHeating ? copy.pause : copy.ready}</div>
            <div className={`lab-beaker liquid-${liquid}`} aria-hidden="true">
              <div className="lab-steam steam-one" />
              <div className="lab-steam steam-two" />
              <div className="lab-steam steam-three" />
              <div className="lab-beaker-neck" />
              <div className="lab-liquid-fill"><i /><i /><i /></div>
              <div className="lab-beaker-glass" />
            </div>
            <strong className="lab-temperature"><span aria-hidden="true">🌡️</span> {currentTemperature.toFixed(1)} {copy.degrees}</strong>
            <div className="lab-live-summary">
              <span>{copy.current}: <b>{currentTemperature.toFixed(1)} {copy.degrees}</b></span>
              <span>{copy.startAt}: <b>{selectedBoilingPoint.toFixed(1)} {copy.degrees}</b></span>
              <span>{copy.timer}: <b>{Math.floor(elapsedMinutes)} {copy.minutes}</b></span>
              <small>{copy.perMinute}</small>
            </div>
            <div className="lab-timeline" aria-label={copy.tableTitle}>
              <div className="lab-timeline-header"><span>{copy.minutes}</span><span>{copy.degrees}</span></div>
              {[0, 1, 2, 3, 4].filter((minute) => minute <= Math.floor(elapsedMinutes)).map((minute) => (
                <div className="lab-timeline-row" key={minute}><span>{minute}</span><b>{temperatureAt(liquid, spoons, minute).toFixed(1)}</b></div>
              ))}
            </div>
          </section>

          <section className="lab-record-panel" aria-labelledby="lab-record-title">
          <div className="lab-record-heading">
            <h2 id="lab-record-title">{copy.tableTitle}</h2>
            <button
              className="lab-table-reset-button"
              type="button"
              onClick={resetTable}
              disabled={trials.length === 0}
            >
              ↻ รีเซ็ตตาราง
            </button>
          </div>
            <div className="lab-record-scroll">
              <table className="lab-record-table">
                <thead><tr><th>{copy.liquid}</th><th>{copy.spoonCount}</th><th>{copy.startAt}<br />({copy.degrees})</th><th>{copy.afterThree}<br />({copy.degrees})</th></tr></thead>
                <tbody>
                  {trials.map((trial, index) => (
                    <tr key={`${trial.liquid}-${index}`}>
                      <th scope="row">{copy[liquidLabels[trial.liquid]]}</th>
                      <td>{trial.spoons}</td>
                      <td>{trial.boilingPoint.toFixed(1)}</td>
                      <td>{trial.afterThreeMinutes.toFixed(1)}</td>
                    </tr>
                  ))}
                  {trials.length === 0 && <tr><td className="lab-empty-record" colSpan={4}>—</td></tr>}
                </tbody>
              </table>
            </div>
            {completed
              ? <a className="lab-results-button" href="/gradem1/exp1/results">{copy.seeResults} ›</a>
              : <button className="lab-results-button" type="button" disabled>{copy.seeResults} ›</button>}
            {!completed && <p className="lab-results-hint">{copy.allNeeded}</p>}
          </section>

          {/* <p className="lab-constants">ตัวแปรควบคุม: {copy.water} · ใช้ไฟระดับเดียวกัน · อุณหภูมิเริ่มต้น 28 °C</p> */}
        </section>

        {/* <details className="lab-principles">
          <summary>{copy.principles}</summary>
          <ol>{copy.principleItems.map((item) => <li key={item}>{item}</li>)}</ol>
        </details> */}
      </div>
      {completed
        ? <NextButton className="lab-next" label={copy.seeResults} href="/gradem1/exp1/results" />
        : <button className="lab-next" type="button" disabled>{copy.seeResults} <span aria-hidden="true">›</span></button>}
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
