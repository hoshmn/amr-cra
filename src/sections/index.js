import {
  title as facilityTitle,
  instructions as facilityInstructions,
  questions as facilityQuestions } from './facility';
import {
  title as inputsTitle,
  instructions as inputsInstructions,
  questions as inputsQuestions,
  targets as inputsTargets,
  results as inputsResults,
  departments,
  targetInstructions,
  departmentInstructions } from './inputs';

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
    results: inputsResults,
    departments,
    targetInstructions,
    departmentInstructions
  }
}

export default sectionsMap;