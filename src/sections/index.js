import { title as facilityTitle, instructions as facilityInstructions, questions as facilityQuestions } from './facility';
import { title as inputsTitle, instructions as inputsInstructions, questions as inputsQuestions, targets as inputsTargets, departments } from './inputs';

const sectionsMap = {
  facility: { 
    title: facilityTitle,
    instructions: facilityInstructions,
    questions: facilityQuestions
  },
  inputs: { 
    title: inputsTitle,
    instructions: inputsInstructions,
    questions: inputsQuestions,
    requiresSetup: true,
    targets: inputsTargets,
    departments
  }
}

export default sectionsMap;