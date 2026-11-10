import { useEffect, useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import './exp2.css'
import './lab.css'

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
const BEAKER_MASS = 50
const VOLUME_ML = 100
const EGG_DENSITY = 1.07

const copyByLanguage = {
  th: {
    back: 'ย้อนกลับ', title: 'ห้องทดลองจำลอง', experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล', language: 'เลือกภาษา',
    chooseLiquid: 'เลือกของเหลว', distilled: 'น้ำกลั่น', salt: 'น้ำเกลือทำเอง', seawater: 'น้ำทะเล', oil: 'น้ำมันพืช', solute: 'เกลือ', spoon: 'ช้อน',
    amount: 'ปริมาณเกลือ', controlNote: 'ปริมาตร 100 mL · 1 ช้อน ≈ 3 g', weighEmpty: '1  ชั่งบีกเกอร์เปล่า', measure: '2  ตวง 100 mL และชั่ง', drop: '4  หย่อนไข่', save: 'บันทึกผลรอบนี้', newTrial: 'เริ่มรอบใหม่',
    emptyWeighed: 'ชั่งบีกเกอร์เปล่าแล้ว', needsEmpty: 'ชั่งบีกเกอร์เปล่าก่อน', measured: 'ชั่งของเหลวแล้ว · คำนวณความหนาแน่นจากมวล ÷ 100 mL', needsMeasure: 'ตวงและชั่งของเหลวก่อน', dropHint: 'หย่อนไข่เพื่อสังเกตการจมและลอย',
    weighing: 'มวลบีกเกอร์เปล่า (A)', combined: 'มวลบีกเกอร์ + ของเหลว (B)', liquidMass: 'มวลของเหลว (B − A)', density: 'ความหนาแน่น', eggDensity: 'ความหนาแน่นไข่', total: 'มวลรวม',
    sinking: 'ไข่จม', floating: 'ไข่ลอย', suspended: 'ไข่ลอยปริ่มกลางของเหลว', waiting: 'ชั่งและตวงของเหลวก่อนหย่อนไข่', recordTitle: 'บันทึกผลการทดลอง',
    liquid: 'ของเหลว', spoons: 'ช้อน', massColumn: 'มวล 100 mL (g)', densityColumn: 'ความหนาแน่น (g/mL)', egg: 'ผลกับไข่', noTrials: 'ผลการทดลองที่บันทึกจะแสดงที่นี่',
    formula: 'ความหนาแน่น = มวลของเหลว ÷ ปริมาตร', compare: 'ไข่มีความหนาแน่น 1.07 g/mL · น้อยกว่าของเหลวจะลอย มากกว่าจะจม',
    saved: 'บันทึกผลแล้ว', selectFirst: 'เลือกของเหลวและทำขั้นตอนให้ครบก่อนบันทึก',
  },
  ms: {
    back: 'Kembali', title: 'Makmal Simulasi', experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', badge: 'PISA 2 · Reka bentuk · Tafsir data', language: 'Pilih bahasa',
    chooseLiquid: 'Pilih cecair', distilled: 'Air suling', salt: 'Air garam buatan', seawater: 'Air laut', oil: 'Minyak sayuran', solute: 'Garam', spoon: 'sudu',
    amount: 'Jumlah garam', controlNote: 'Isi padu 100 mL · 1 sudu ≈ 3 g', weighEmpty: '1  Timbang bikar kosong', measure: '2  Sukat 100 mL dan timbang', drop: '4  Masukkan telur', save: 'Simpan keputusan ini', newTrial: 'Percubaan baharu',
    emptyWeighed: 'Bikar kosong telah ditimbang', needsEmpty: 'Timbang bikar kosong dahulu', measured: 'Cecair telah ditimbang · ketumpatan = jisim ÷ 100 mL', needsMeasure: 'Sukat dan timbang cecair dahulu', dropHint: 'Masukkan telur untuk melihat sama ada ia terapung atau tenggelam',
    weighing: 'Jisim bikar kosong (A)', combined: 'Jisim bikar + cecair (B)', liquidMass: 'Jisim cecair (B − A)', density: 'Ketumpatan', eggDensity: 'Ketumpatan telur', total: 'Jumlah jisim',
    sinking: 'Telur tenggelam', floating: 'Telur terapung', suspended: 'Telur terapung di tengah', waiting: 'Sukat dan timbang cecair sebelum memasukkan telur', recordTitle: 'Rekod keputusan eksperimen',
    liquid: 'Cecair', spoons: 'Sudu', massColumn: 'Jisim 100 mL (g)', densityColumn: 'Ketumpatan (g/mL)', egg: 'Keadaan telur', noTrials: 'Keputusan yang disimpan akan dipaparkan di sini',
    formula: 'Ketumpatan = jisim cecair ÷ isi padu', compare: 'Ketumpatan telur ialah 1.07 g/mL · kurang daripada cecair: terapung, lebih: tenggelam', saved: 'Keputusan disimpan', selectFirst: 'Pilih cecair dan lengkapkan langkah sebelum menyimpan',
  },
  en: {
    back: 'Back', title: 'Virtual Laboratory', experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', badge: 'PISA 2 · Design · Interpret data', language: 'Choose language',
    chooseLiquid: 'Choose a liquid', distilled: 'Distilled water', salt: 'Salt water', seawater: 'Seawater', oil: 'Vegetable oil', solute: 'Salt', spoon: 'spoons',
    amount: 'Amount of salt', controlNote: 'Volume 100 mL · 1 spoon ≈ 3 g', weighEmpty: '1  Weigh empty beaker', measure: '2  Measure 100 mL and weigh', drop: '4  Drop in the egg', save: 'Save this trial', newTrial: 'New trial',
    emptyWeighed: 'Empty beaker weighed', needsEmpty: 'Weigh the empty beaker first', measured: 'Liquid weighed · density = mass ÷ 100 mL', needsMeasure: 'Measure and weigh the liquid first', dropHint: 'Drop in the egg to observe whether it floats or sinks',
    weighing: 'Empty beaker mass (A)', combined: 'Beaker + liquid mass (B)', liquidMass: 'Liquid mass (B − A)', density: 'Density', eggDensity: 'Egg density', total: 'Total mass',
    sinking: 'The egg sinks', floating: 'The egg floats', suspended: 'The egg is suspended', waiting: 'Measure and weigh the liquid before dropping in the egg', recordTitle: 'Experiment results',
    liquid: 'Liquid', spoons: 'Spoons', massColumn: 'Mass of 100 mL (g)', densityColumn: 'Density (g/mL)', egg: 'Egg result', noTrials: 'Saved trials will appear here',
    formula: 'Density = liquid mass ÷ volume', compare: 'Egg density is 1.07 g/mL · lower than liquid: floats, higher: sinks', saved: 'Trial saved', selectFirst: 'Choose a liquid and complete the steps before saving',
  },
} satisfies Record<Language, Record<string, string>>

const liquidKeys: LiquidId[] = ['distilled', 'salt', 'seawater', 'oil']

function readTrials(): Trial[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is Trial => Boolean(
      item && typeof item === 'object'
      && typeof item.id === 'string'
      && liquidKeys.includes((item as Trial).liquid)
      && typeof (item as Trial).spoons === 'number'
      && typeof (item as Trial).mass === 'number'
      && typeof (item as Trial).density === 'number'
      && ['sink', 'float', 'suspend'].includes((item as Trial).outcome),
    ))
  } catch {
    return []
  }
}

function getDensity(liquid: LiquidId, spoons: number) {
  if (liquid === 'salt') return 1 + spoons * 0.03
  if (liquid === 'seawater') return 1.025
  if (liquid === 'oil') return 0.92
  return 1
}

function outcomeFor(density: number): Trial['outcome'] {
  if (Math.abs(density - EGG_DENSITY) < 0.005) return 'suspend'
  return density > EGG_DENSITY ? 'float' : 'sink'
}

export function Experiment2LabPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [liquid, setLiquid] = useState<LiquidId>('distilled')
  const [spoons, setSpoons] = useState(0)
  const [emptyWeighed, setEmptyWeighed] = useState(false)
  const [measured, setMeasured] = useState(false)
  const [eggDropped, setEggDropped] = useState(false)
  const [trials, setTrials] = useState<Trial[]>(readTrials)
  const [notice, setNotice] = useState('')
  const copy = copyByLanguage[language]

  const density = getDensity(liquid, liquid === 'salt' ? spoons : 0)
  const liquidMass = Math.round(density * VOLUME_ML * 10) / 10
  const combinedMass = BEAKER_MASS + liquidMass
  const outcome = outcomeFor(density)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trials))
    } catch {
      // Keep the experiment usable when browser storage is unavailable.
    }
  }, [trials])

  function startNewTrial(nextLiquid = liquid) {
    setLiquid(nextLiquid)
    setEmptyWeighed(false)
    setMeasured(false)
    setEggDropped(false)
    setNotice('')
    if (nextLiquid === 'distilled') setSpoons(0)
    else if (liquid === 'distilled' && nextLiquid === 'salt') setSpoons(1)
  }

  function saveTrial() {
    if (!measured || !eggDropped) return
    const record: Trial = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      liquid,
      spoons: liquid === 'salt' ? spoons : 0,
      mass: liquidMass,
      density,
      outcome,
    }
    setTrials((current) => [...current, record])
    setNotice(copy.saved)
    setEggDropped(false)
  }

  function resetTable() {
    setTrials([])
  }

  return (
    <main className="objectives-page exp2-page density-lab-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content density-lab-content">
        <header className="objectives-header density-lab-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/design" label={copy.back} />
          <div className="objectives-title exp2-title">
            <span className="objectives-number">8</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="objectives-layout density-lab-layout">
          <section className="density-lab-workspace" aria-label={copy.title}>
            <section className="density-controls" aria-labelledby="density-liquid-title">
              <h2 id="density-liquid-title">{copy.chooseLiquid}</h2>
              <div className="density-liquid-options">
                {liquidKeys.map((id) => (
                  <button
                    className={`density-liquid-option${liquid === id ? ' is-active' : ''}`}
                    type="button"
                    key={id}
                    aria-pressed={liquid === id}
                    onClick={() => startNewTrial(id)}
                  >
                    {copy[id]}{liquid === id ? ' ✓' : ''}
                  </button>
                ))}
              </div>

              <div className="density-spoon-control">
                <label htmlFor="density-spoons">{copy.amount}: <strong>{liquid === 'salt' ? spoons : 0} {copy.spoon}</strong></label>
                <input id="density-spoons" type="range" min="0" max="5" step="1" value={liquid === 'salt' ? spoons : 0} disabled={liquid !== 'salt'} onChange={(event) => { setSpoons(Number(event.target.value)); setEmptyWeighed(false); setMeasured(false); setEggDropped(false); setNotice('') }} />
                <div className="density-range-labels"><span>0</span><span>5 {copy.spoon}</span></div>
              </div>
              <p className="density-control-note">{copy.controlNote}</p>

              <div className="density-step-actions">
                <button className={`density-step-button${emptyWeighed ? ' is-complete' : ''}`} type="button" onClick={() => { setEmptyWeighed(true); setMeasured(false); setEggDropped(false); setNotice('') }}>
                  {emptyWeighed ? '✓ ' : ''}{copy.weighEmpty}
                </button>
                <button className={`density-step-button${measured ? ' is-complete' : ''}`} type="button" disabled={!emptyWeighed} onClick={() => { setMeasured(true); setEggDropped(false); setNotice('') }}>
                  {measured ? '✓ ' : ''}{copy.measure}
                </button>
                <button className="density-step-button density-drop-button" type="button" disabled={!measured} onClick={() => { setEggDropped(true); setNotice('') }}>
                  🥚 {copy.drop}
                </button>
                <button className="density-new-trial" type="button" onClick={() => startNewTrial()}>{copy.newTrial}</button>
              </div>
            </section>

            <section className={`density-simulation${eggDropped ? ` egg-${outcome}` : ''}`} aria-live="polite">
              <p className="density-simulation-status">
                {eggDropped ? copy[outcome === 'float' ? 'floating' : outcome === 'sink' ? 'sinking' : 'suspended'] : measured ? copy.measured : emptyWeighed ? copy.needsMeasure : copy.waiting}
              </p>
              <div className={`density-beaker liquid-${liquid}`} aria-label={eggDropped ? copy[outcome === 'float' ? 'floating' : outcome === 'sink' ? 'sinking' : 'suspended'] : copy.waiting}>
                <span className="density-beaker-neck" />
                <span className="density-liquid-fill" />
                {eggDropped && <span className="density-egg" aria-hidden="true">🥚</span>}
                <span className="density-beaker-glass" />
                <span className="density-bubble bubble-a" />
                <span className="density-bubble bubble-b" />
              </div>
              <strong className="density-reading">{measured ? `${density.toFixed(2)} g/mL` : '— g/mL'}</strong>
              <div className="density-mass-readings">
                <span>{copy.weighing}: <b>{emptyWeighed ? BEAKER_MASS.toFixed(1) : '—'} g</b></span>
                <span>{copy.combined}: <b>{measured ? combinedMass.toFixed(1) : '—'} g</b></span>
                <span>{copy.liquidMass}: <b>{measured ? liquidMass.toFixed(1) : '—'} g</b></span>
              </div>
              <p className="density-formula">{copy.formula}</p>
              <p className="density-sample-caption">{copy[liquid]}{liquid === 'salt' ? ` · ${spoons} ${copy.spoon}` : ''} · 100 mL</p>
              <p className="density-egg-note">{copy.eggDensity}: {EGG_DENSITY.toFixed(2)} g/mL</p>
            </section>

            <section className="density-record-panel" aria-labelledby="density-record-title">
              <div className="density-record-heading">
                <h2 id="density-record-title">{copy.recordTitle}</h2>
                <button className="density-reset-table" type="button" onClick={resetTable} disabled={trials.length === 0}>
                  รีเซ็ตตาราง
                </button>
              </div>
              <div className="density-record-scroll">
                <table className="density-record-table">
                  <thead><tr><th>{copy.liquid}</th><th>{copy.spoons}</th><th>{copy.massColumn}</th><th>{copy.densityColumn}</th><th>{copy.egg}</th></tr></thead>
                  <tbody>
                    {trials.map((trial) => (
                      <tr key={trial.id}>
                        <th scope="row">{copy[trial.liquid]}</th>
                        <td>{trial.liquid === 'salt' ? trial.spoons : '—'}</td>
                        <td>{trial.mass.toFixed(1)}</td>
                        <td>{trial.density.toFixed(2)}</td>
                        <td className={`density-outcome outcome-${trial.outcome}`}>{copy[trial.outcome === 'float' ? 'floating' : trial.outcome === 'sink' ? 'sinking' : 'suspended']}</td>
                      </tr>
                    ))}
                    {measured && eggDropped && (
                      <tr className="density-pending-row">
                        <th scope="row">{copy[liquid]}</th>
                        <td>{liquid === 'salt' ? spoons : '—'}</td>
                        <td>{liquidMass.toFixed(1)}</td>
                        <td>{density.toFixed(2)}</td>
                        <td className={`density-outcome outcome-${outcome}`}>{copy[outcome === 'float' ? 'floating' : outcome === 'sink' ? 'sinking' : 'suspended']}</td>
                      </tr>
                    )}
                    {trials.length === 0 && !eggDropped && <tr><td className="density-empty-record" colSpan={5}>{copy.noTrials}</td></tr>}
                  </tbody>
                </table>
              </div>
              <p className="density-compare-note">{copy.compare}</p>
              {notice && <p className="density-saved-notice" role="status">{notice}</p>}
              <button className="density-save-button" type="button" disabled={!measured || !eggDropped} onClick={saveTrial}>
                {copy.save} <span aria-hidden="true">›</span>
              </button>
              {!measured || !eggDropped ? <p className="density-save-hint">{copy.selectFirst}</p> : null}
            </section>
          </section>
        </div>
        <div className="density-lab-footer">
          <NextButton className="objectives-next" label="ดูผลการทดลอง" href="/gradem1/exp2/results" />
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
