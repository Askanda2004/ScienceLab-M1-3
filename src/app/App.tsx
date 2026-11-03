import { HomePage } from '../pages/HomePage'
import { GradeM1Exp1Page } from '../pages/gradem1/exp1/GradeM1Exp1Page'

export function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '')

  if (currentPath === '/gradem1/exp1') {
    return <GradeM1Exp1Page />
  }

  return <HomePage />
}
