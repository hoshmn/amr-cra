const getTargetId = (targetSectionId, targetId) => 
  `target-${targetSectionId}--${targetId}`;
  
const getTableCellId = (department, question) => 
  `cell-${department.id}--${question.id}`;

  export {
    getTargetId,
    getTableCellId
  }