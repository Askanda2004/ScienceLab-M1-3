import { HomePage } from '../pages/HomePage'
import { GradeM1Exp1Page } from '../pages/gradem1/exp1/GradeM1Exp1Page'
import { GradeSelectionPage } from '../pages/GradeSelectionPage'
import { Experiment1ObjectivesPage } from '../pages/gradem1/exp1/Experiment1ObjectivesPage'
import { Experiment1LearningPage } from '../pages/gradem1/exp1/Experiment1LearningPage'
import { Experiment1VocabularyPage } from '../pages/gradem1/exp1/Experiment1VocabularyPage'
import { Experiment1ScienceSkillsPage } from '../pages/gradem1/exp1/Experiment1ScienceSkillsPage'
import { Experiment1ThinkingPage } from '../pages/gradem1/exp1/Experiment1ThinkingPage'
import { Experiment1MaterialsPage } from '../pages/gradem1/exp1/Experiment1MaterialsPage'
import { Experiment1ProcedurePage } from '../pages/gradem1/exp1/Experiment1ProcedurePage'
import { Experiment1PredictionPage } from '../pages/gradem1/exp1/Experiment1PredictionPage'
import { Experiment1LabPage } from '../pages/gradem1/exp1/Experiment1LabPage'
import { Experiment1ResultsPage } from '../pages/gradem1/exp1/Experiment1ResultsPage'
import { Experiment1AnswerPage } from '../pages/gradem1/exp1/Experiment1AnswerPage'
import { Experiment1PisaPage } from '../pages/gradem1/exp1/Experiment1PisaPage'
import { Experiment1SummaryPage } from '../pages/gradem1/exp1/Experiment1SummaryPage'
import { Experiment1ComparisonPage } from '../pages/gradem1/exp1/Experiment1ComparisonPage'
import { Experiment2LearningObjectivesPage } from '../pages/gradem1/exp2/Experiment2LearningObjectivesPage'
import { Experiment2VocabularyPage } from '../pages/gradem1/exp2/Experiment2VocabularyPage'
import { Experiment2ScienceSkillsPage } from '../pages/gradem1/exp2/Experiment2ScienceSkillsPage'
import { Experiment2ThinkingPage } from '../pages/gradem1/exp2/Experiment2ThinkingPage'
import { Experiment2MaterialsPage } from '../pages/gradem1/exp2/Experiment2MaterialsPage'
import { Experiment2ProcedurePage } from '../pages/gradem1/exp2/Experiment2ProcedurePage'
import { Experiment2DesignPage } from '../pages/gradem1/exp2/Experiment2DesignPage'
import { Experiment2LabPage } from '../pages/gradem1/exp2/Experiment2LabPage'
import { Experiment2ResultsPage } from '../pages/gradem1/exp2/Experiment2ResultsPage'
import { Experiment2AnswerPage } from '../pages/gradem1/exp2/Experiment2AnswerPage'
import { Experiment2PisaPage } from '../pages/gradem1/exp2/Experiment2PisaPage'
import { Experiment2SummaryPage } from '../pages/gradem1/exp2/Experiment2SummaryPage'
import { Experiment2ComparisonPage } from '../pages/gradem1/exp2/Experiment2ComparisonPage'
import { Experiment3LearningObjectivesPage } from '../pages/gradem1/exp3/Experiment3LearningObjectivesPage'
import { Experiment3VocabularyPage } from '../pages/gradem1/exp3/Experiment3VocabularyPage'
import { Experiment3ScienceSkillsPage } from '../pages/gradem1/exp3/Experiment3ScienceSkillsPage'
import { Experiment3ThinkingPage } from '../pages/gradem1/exp3/Experiment3ThinkingPage'
import { Experiment3MaterialsPage } from '../pages/gradem1/exp3/Experiment3MaterialsPage'
import { Experiment3ProcedurePage } from '../pages/gradem1/exp3/Experiment3ProcedurePage'
import { Experiment3PredictionPage } from '../pages/gradem1/exp3/Experiment3PredictionPage'

export function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '')

  if (currentPath === '/gradem1/exp1/objectives') {
    return <Experiment1ObjectivesPage />
  }

  if (currentPath === '/gradem1/exp1/learning-objectives') {
    return <Experiment1LearningPage />
  }

  if (currentPath === '/gradem1/exp1/vocabulary') {
    return <Experiment1VocabularyPage />
  }

  if (currentPath === '/gradem1/exp1/science-skills') {
    return <Experiment1ScienceSkillsPage />
  }

  if (currentPath === '/gradem1/exp1/thinking') {
    return <Experiment1ThinkingPage />
  }

  if (currentPath === '/gradem1/exp1/materials') {
    return <Experiment1MaterialsPage />
  }

  if (currentPath === '/gradem1/exp1/procedure') {
    return <Experiment1ProcedurePage />
  }

  if (currentPath === '/gradem1/exp1/prediction') {
    return <Experiment1PredictionPage />
  }

  if (currentPath === '/gradem1/exp1/lab') {
    return <Experiment1LabPage />
  }

  if (currentPath === '/gradem1/exp1/results') {
    return <Experiment1ResultsPage />
  }

  if (currentPath === '/gradem1/exp1/conclusion') {
    return <Experiment1AnswerPage />
  }

  if (currentPath === '/gradem1/exp1/pisa') {
    return <Experiment1PisaPage />
  }

  if (currentPath === '/gradem1/exp1/summary') {
    return <Experiment1SummaryPage />
  }

  if (currentPath === '/gradem1/exp1/comparison') {
    return <Experiment1ComparisonPage />
  }

  if (currentPath === '/gradem1/exp2') {
    return <Experiment2LearningObjectivesPage />
  }

  if (currentPath === '/gradem1/exp2/vocabulary') {
    return <Experiment2VocabularyPage />
  }

  if (currentPath === '/gradem1/exp2/science-skills') {
    return <Experiment2ScienceSkillsPage />
  }

  if (currentPath === '/gradem1/exp2/thinking') {
    return <Experiment2ThinkingPage />
  }

  if (currentPath === '/gradem1/exp2/materials') {
    return <Experiment2MaterialsPage />
  }

  if (currentPath === '/gradem1/exp2/procedure') {
    return <Experiment2ProcedurePage />
  }

  if (currentPath === '/gradem1/exp2/design') {
    return <Experiment2DesignPage />
  }

  if (currentPath === '/gradem1/exp2/lab') {
    return <Experiment2LabPage />
  }

  if (currentPath === '/gradem1/exp2/results') {
    return <Experiment2ResultsPage />
  }

  if (currentPath === '/gradem1/exp2/conclusion') {
    return <Experiment2AnswerPage />
  }

  if (currentPath === '/gradem1/exp2/pisa') {
    return <Experiment2PisaPage />
  }

  if (currentPath === '/gradem1/exp2/summary') {
    return <Experiment2SummaryPage />
  }

  if (currentPath === '/gradem1/exp2/comparison') {
    return <Experiment2ComparisonPage />
  }

  if (currentPath === '/gradem1/exp3') {
    return <Experiment3LearningObjectivesPage />
  }

  if (currentPath === '/gradem1/exp3/vocabulary') {
    return <Experiment3VocabularyPage />
  }

  if (currentPath === '/gradem1/exp3/science-skills') {
    return <Experiment3ScienceSkillsPage />
  }

  if (currentPath === '/gradem1/exp3/thinking') {
    return <Experiment3ThinkingPage />
  }

  if (currentPath === '/gradem1/exp3/materials') {
    return <Experiment3MaterialsPage />
  }

  if (currentPath === '/gradem1/exp3/procedure') {
    return <Experiment3ProcedurePage />
  }

  if (currentPath === '/gradem1/exp3/prediction') {
    return <Experiment3PredictionPage />
  }

  if (currentPath === '/gradem1/exp1') {
    return <GradeM1Exp1Page />
  }

  if (currentPath === '/grades') {
    return <GradeSelectionPage />
  }

  return <HomePage />
}

