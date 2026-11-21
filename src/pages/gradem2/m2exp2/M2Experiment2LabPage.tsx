import { useMemo, useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import './m2-exp2-lab.css'

type Volume = 125 | 250 | 375 | 500
type Result = { calculated: number; measured: number }

const volumes: Volume[] = [125, 250, 375, 500]
const meterReadings: Record<Volume, number> = { 125: 4.1, 250: 2, 375: 1.3, 500: 0.9 }
const resultStorageKey = 'science-lab-m2-exp2-concentration-results'

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ห้องทดลองจำลอง', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    mixture: 'เลือกการผสม', ors: 'ORS ให้น้อง', target: 'เป้าหมาย 2%', powder: 'ผง ORS', locked: 'กำหนดไว้ 5.0 g', water: 'ปริมาตรน้ำ',
    mix: 'ผสม คน แล้ววัด', restart: 'เริ่มใหม่', stirHint: 'เลือกปริมาตรน้ำ แล้วกดปุ่มเพื่อวัดความเข้มข้น', meter: 'เครื่องวัดความเข้มข้น', targetRange: 'ช่วงเป้าหมาย ORS', save: 'บันทึกผล', saved: 'บันทึกแล้ว ✓', saveHint: 'วัดค่าแล้ว หากต้องการเก็บผล ให้กด “บันทึกผล”',
    tooHigh: 'เข้มข้นเกิน', good: 'ตรงเป้า', slightlyLow: 'เจือจางเล็กน้อย', tooLow: 'เจือจางเกิน',
    recordTitle: 'บันทึกผล · ผง 5.0 g', waterCol: 'น้ำ (mL)', percentCol: '% w/v', resultCol: 'ผล', graph: 'ความเข้มข้นตามปริมาตรน้ำ', recorded: 'บันทึกแล้ว',
    stepHint: 'เลื่อนแถบเลือกปริมาตรน้ำ → กด “ผสม คน แล้ววัด” → ดูว่าความเข้มข้นตรงเป้าหรือไม่', seeResults: 'ดูผลการทดลอง', finishHint: 'ทดลองให้ครบทั้ง 4 ปริมาตร แล้วจึงดูผล', reset: 'ล้างตาราง',
    language: 'เลือกภาษา', cup: 'เหยือกผสม', measure: 'ตวงน้ำ', blend: 'ผสมและคน',
  },
  ms: {
    back: 'Kembali', title: 'Makmal Simulasi', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', badge: 'PISA 2 · Mereka bentuk · Tafsir data',
    mixture: 'Pilih bancuhan', ors: 'ORS untuk adik', target: 'sasaran 2%', powder: 'Serbuk ORS', locked: 'ditetapkan pada 5.0 g', water: 'Isipadu air',
    mix: 'Campur, kacau dan ukur', restart: 'Mula semula', stirHint: 'Pilih isipadu air, kemudian tekan butang untuk mengukur kepekatan', meter: 'Meter kepekatan', targetRange: 'Julat sasaran ORS', save: 'Simpan keputusan', saved: 'Telah disimpan ✓', saveHint: 'Bacaan sudah tersedia. Tekan “Simpan keputusan” untuk merekodkannya.',
    tooHigh: 'Terlalu pekat', good: 'Tepat sasaran', slightlyLow: 'Sedikit cair', tooLow: 'Terlalu cair',
    recordTitle: 'Rekod · Serbuk 5.0 g', waterCol: 'Air (mL)', percentCol: '% w/v', resultCol: 'Keputusan', graph: 'Kepekatan mengikut isipadu air', recorded: 'Direkod',
    stepHint: 'Pilih isipadu air → tekan “Campur, kacau dan ukur” → lihat sama ada kepekatan tepat', seeResults: 'Lihat keputusan', finishHint: 'Cuba keempat-empat isipadu untuk melihat keputusan', reset: 'Kosongkan jadual',
    language: 'Pilih bahasa', cup: 'Bekas bancuhan', measure: 'Sukat air', blend: 'Campur dan kacau',
  },
  en: {
    back: 'Back', title: 'Virtual Laboratory', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', badge: 'PISA 2 · Design · Interpret data',
    mixture: 'Choose mixture', ors: 'ORS for a child', target: 'target 2%', powder: 'ORS powder', locked: 'fixed at 5.0 g', water: 'Water volume',
    mix: 'Mix, stir and measure', restart: 'Start over', stirHint: 'Choose a water volume, then press the button to measure concentration', meter: 'Concentration meter', targetRange: 'ORS target range', save: 'Save result', saved: 'Saved ✓', saveHint: 'The reading is ready. Press “Save result” to add it to the table.',
    tooHigh: 'Too concentrated', good: 'On target', slightlyLow: 'Slightly dilute', tooLow: 'Too dilute',
    recordTitle: 'Record · 5.0 g powder', waterCol: 'Water (mL)', percentCol: '% w/v', resultCol: 'Result', graph: 'Concentration by water volume', recorded: 'Recorded',
    stepHint: 'Choose a water volume → press “Mix, stir and measure” → check whether the concentration is on target', seeResults: 'View results', finishHint: 'Try all 4 volumes to view your results', reset: 'Clear table',
    language: 'Choose language', cup: 'Mixing vessel', measure: 'Measure water', blend: 'Mix and stir',
  },
} satisfies Record<Language, Record<string, string>>

function readSavedResults(): Partial<Record<Volume, Result>> {
  try {
    return JSON.parse(window.localStorage.getItem(resultStorageKey) || '{}') as Partial<Record<Volume, Result>>
  } catch {
    return {}
  }
}

function getOutcome(volume: Volume, language: Language) {
  if (volume === 250) return copy[language].good
  if (volume === 125) return copy[language].tooHigh
  if (volume === 375) return copy[language].slightlyLow
  return copy[language].tooLow
}

export function M2Experiment2LabPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = copy[language]
  const [volume, setVolume] = useState<Volume>(250)
  const [reading, setReading] = useState<Result | null>(null)
  const [readingSaved, setReadingSaved] = useState(false)
  const [results, setResults] = useState<Partial<Record<Volume, Result>>>(readSavedResults)
  const resultCount = volumes.filter((value) => results[value]).length
  const resultClass = !reading ? '' : volume === 125 ? 'too-high' : volume === 250 ? 'on-target' : volume === 375 ? 'slightly-dilute' : 'too-dilute'

  const chartPoints = useMemo(() => volumes.flatMap((value, index) => {
    const saved = results[value]
    return saved ? [{ x: 42 + index * 75, y: 112 - saved.measured / 5 * 88 }] : []
  }), [results])

  function measureMixture() {
    const result = { calculated: 500 / volume, measured: meterReadings[volume] }
    setReading(result)
    setReadingSaved(false)
  }

  function saveMeasurement() {
    if (!reading || readingSaved) return
    const nextResults = { ...results, [volume]: reading }
    setResults(nextResults)
    try { window.localStorage.setItem(resultStorageKey, JSON.stringify(nextResults)) } catch { /* The simulation still works without storage. */ }
    setReadingSaved(true)
  }

  function changeVolume(value: Volume) {
    setVolume(value)
    setReading(results[value] ?? null)
    setReadingSaved(Boolean(results[value]))
  }

  function resetResults() {
    setResults({})
    setReading(null)
    setReadingSaved(false)
    try { window.localStorage.removeItem(resultStorageKey) } catch { /* Ignore unavailable browser storage. */ }
  }

  function restartTrial() {
    setVolume(250)
    setReading(null)
    setReadingSaved(false)
  }

  return (
    <main className="m2-objectives-page m2-exp2-lab-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/design" label={text.back} />
          <div className="m2-objectives-title"><span className="m2-objectives-number">8</span><h1>{text.title}</h1></div>
        </header>

        <section className="m2-exp2-lab-workspace" aria-label={text.title}>
          <section className="m2-exp2-control-panel">
            <h2>{text.mixture}</h2>
            <div className="m2-exp2-mixture-card"><strong>{text.ors}</strong><span>{text.target} ✓</span></div>
            <div className="m2-exp2-powder-card"><span>{text.powder}</span><strong>5.0 g</strong><small>🔒 {text.locked}</small></div>
            <div className="m2-exp2-volume-control">
              <h3>{text.water}: <strong>{volume} mL</strong></h3>
              <input aria-label={text.water} type="range" min="0" max="3" step="1" value={volumes.indexOf(volume)} onChange={(event) => changeVolume(volumes[Number(event.target.value)])} />
              <div>{volumes.map((value) => <button type="button" key={value} className={volume === value ? 'active' : results[value] ? 'done' : ''} onClick={() => changeVolume(value)}>{value}{results[value] ? ' ✓' : ''}</button>)}</div>
            </div>
            <button className="m2-exp2-measure-button" type="button" onClick={measureMixture}>⟳ {text.mix}</button>
            <button className="m2-exp2-restart-button" type="button" onClick={restartTrial}>↻ {text.restart}</button>
            <p className="m2-exp2-stir-hint">{text.stirHint}</p>
          </section>

          <section className="m2-exp2-simulation" aria-live="polite">
            <div className="m2-exp2-meter"><span>{text.meter}</span><strong>{reading ? reading.measured.toFixed(1) : '—'}</strong><b>% w/v</b><em>{reading ? `✓ ${getOutcome(volume, language)}` : text.targetRange}</em></div>
            <div className="m2-exp2-equipment">
              <div className={`m2-exp2-pitcher${resultClass ? ` result-${resultClass}` : ''}`} aria-label={reading ? getOutcome(volume, language) : text.cup}>
                <div className="liquid" style={{ height: `${Math.min(35 + volume / 500 * 42, 77)}%` }}/>
                <div className="handle"/><span aria-hidden="true"></span><small>{reading ? text.blend : text.cup}</small>
              </div>
            </div>
            <div className="m2-exp2-calibration">
              <strong>5.0 g ÷ {volume} mL × 100 = {reading ? `${reading.calculated.toFixed(1)} %` : '? %'}</strong>
              <div className="m2-exp2-range"><span/><b style={{ left: reading ? `${Math.max(2, Math.min(96, reading.measured / 5 * 100))}%` : '37%' }}/></div>
              <div className="m2-exp2-range-labels"><span>เจือจาง</span><strong>1.8–2.2 %</strong><span>เข้มข้นเกิน</span></div>
            </div>
            <button className={`m2-exp2-save-button${reading && !readingSaved ? ' ready' : ''}`} type="button" onClick={saveMeasurement} disabled={!reading || readingSaved}>
              {readingSaved ? text.saved : text.save}
            </button>
            {reading && !readingSaved && <p className="m2-exp2-save-hint" role="status">{text.saveHint}</p>}
          </section>

          <section className="m2-exp2-record-panel">
            <div className="m2-exp2-record-title"><h2>{text.recordTitle}</h2><button type="button" onClick={resetResults} disabled={!resultCount} aria-label={text.reset}>↻</button></div>
            <table><thead><tr><th>{text.waterCol}</th><th>{text.percentCol}</th><th>{text.resultCol}</th></tr></thead><tbody>{volumes.map((value) => <tr key={value} className={volume === value ? 'current' : ''}><th>{value}</th><td>{results[value] ? results[value]?.measured.toFixed(1) : '—'}</td><td>{results[value] ? getOutcome(value, language) : '—'}</td></tr>)}</tbody></table>
            <div className="m2-exp2-chart"><h3>{text.graph}</h3><svg viewBox="0 0 300 145" role="img" aria-label={text.graph}><line x1="35" y1="18" x2="290" y2="18"/><line x1="35" y1="58" x2="290" y2="58"/><line x1="35" y1="98" x2="290" y2="98"/><text x="29" y="22">5</text><text x="29" y="62">2.5</text><text x="29" y="102">0</text>{chartPoints.length > 1 && <polyline points={chartPoints.map((point) => `${point.x},${point.y}`).join(' ')}/ >}{chartPoints.map((point) => <circle key={point.x} cx={point.x} cy={point.y} r="4"/>)}{volumes.map((value, index) => <text className="x" key={value} x={42 + index * 75} y="128">{value}</text>)}</svg></div>
            <p className="m2-exp2-progress">{text.recorded} {resultCount} / 4</p><div className="m2-exp2-progress-track"><span style={{ width: `${resultCount * 25}%` }}/></div>
            {resultCount === 4 ? <a className="m2-exp2-results-link ready" href="/gradem2/m2exp2/results">{text.seeResults} ›</a> : <button className="m2-exp2-results-link" type="button" disabled>🔒 {text.seeResults}</button>}
            {resultCount < 4 && <small>{text.finishHint}</small>}
          </section>
          <p className="m2-exp2-workflow">{text.stepHint}</p>
        </section>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
    </main>
  )
}
