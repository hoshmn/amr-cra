const getTargetId = (target, targetSection) => 
  `target-${targetSection.sectionId}--${target.id}`;
  
const getTableCellId = (department, question) => 
  `cell-${department.id}--${question.id}`;

  export {
    getTargetId,
    getTableCellId
  }