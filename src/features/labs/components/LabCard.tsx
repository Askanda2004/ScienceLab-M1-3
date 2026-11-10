import type { Lab } from '../types'

type Props = { lab: Lab }

export function LabCard({ lab }: Props) {
  const experimentPath = lab.id === 'plant-cell' ? '/gradem1/exp1' : undefined

  return (
    <article className="lab-card">
      <div className={`lab-art ${lab.accent} has-image`} aria-hidden="true">
        <img className="lab-art-image" src={lab.image} alt="" />
      </div>
      <div className="lab-card-body">
        <div className="lab-meta"><span>{lab.subject}</span><span>{lab.level}</span></div>
        <h3>{lab.title}</h3>
        <p>{lab.description}</p>
        {experimentPath ? (
          <a className="start-button" href={experimentPath} aria-label={`เริ่มการทดลอง${lab.title}`}>
            เริ่มทดลอง <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <button className="start-button" type="button" aria-label={`เริ่มการทดลอง${lab.title}`}>
            เริ่มทดลอง <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </article>
  )
}
