export type Experiment1Liquid = 'distilled' | 'salt' | 'syrup'

export type Experiment1Trial = {
  id: string
  liquid: Experiment1Liquid
  spoons: number
  boilingPoint: number
  afterThreeMinutes: number
}

export const EXPERIMENT1_RESULTS_KEY = 'science-lab-exp1-results'

export function readExperiment1Trials(): Experiment1Trial[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(EXPERIMENT1_RESULTS_KEY) ?? '[]')
    if (!Array.isArray(value)) return []

    return value.filter((trial): trial is Experiment1Trial => (
      typeof trial === 'object'
      && trial !== null
      && typeof trial.id === 'string'
      && ['distilled', 'salt', 'syrup'].includes(trial.liquid)
      && typeof trial.spoons === 'number'
      && typeof trial.boilingPoint === 'number'
      && typeof trial.afterThreeMinutes === 'number'
    ))
  } catch {
    return []
  }
}
