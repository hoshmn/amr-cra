// section and preface may have children, q may have subQs
const types = ['q', 'section', 'preface'];
const subTypes = [
  'box', 'y_n', '%', // for qs
  'table' // for sections
];

const title = 'Clinical Facility, by Department';

const instructions = [
  'For each Department selected, collect and input the data for the indicators under each assessment subsection below. Please click on each subsection to expand the data inputs required.',
  'For your information, data inputs that act as denominators (totals) are bolded.'
];
const departmentInstructions = [
  'This section assess indicators relevant to the clinical facility, by department level. Before beginning, please select a minimum of 1 and up to 8 relevant departments at the clinical facility of assessment.'
];
const targetInstructions = [
  'For the following clinical facility indicator categories, please select a target that is appropriate for the clinical facility. Default targets are set based on best practice, but can be changed. Click on each subsection to expand the targets required.'
];

const departments = [
  { id: 'medi', name: 'Medical' },
  { id: 'gene', name: 'General Surgery' },
  { id: 'pedi', name: 'Pediatrics' },
  { id: 'inte', name: 'Intensive Care Unit (Adult)' },
  { id: 'obst', name: 'Obstetrics / Gynaecology' },
  { id: 'emer', name: 'Emergency / Trauma' },
  { id: 'neon', name: 'Neonatal Intensive Care Unit' },
  { id: 'orth', name: 'Orthopeadics' },
  { id: 'cardi', name: 'Cardiology' },
  { id: 'pedi', name: 'Pediatric Intensive Care Unit' },
  { id: 'neur', name: 'Neurology' },
  { id: 'onco', name: 'Oncology' },
  { id: 'burn', name: 'Burn Unit' },
  { id: 'gast', name: 'Gastroenterology' },
  { id: 'neph', name: 'Nephrology / Urology' },
];

const targets = [
  { sectionId: 'documentation', sectionName: 'Indicator: Documentation, Policies & Structures', sectionTargets: [
    { id: 'guidelines', text: 'Percentage of departments that should have a copy of the current treatment guidelines' },
    // { id: 'handbook', text: 'Percentage of departments that should have a copy of the current Laboratory Handbook' },
    // { id: 'monitor', text: 'Percentage of departments that actively monitor test results for patterns suggestive of nosocomial outbreaks or hospital acquired infections' },
    // { id: 'nosocomial', text: 'Percentage of departments that engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections?' },
    // { id: 'meet', text: 'Percentage of departments that have clinical staff and laboratory staff regularly meet (at least quarterly) to troubleshoot gaps in laboratory-clinical linkages, including specimen collection, referral, interpretation and reporting?' },
  ]},

  { sectionId: 'collection-all', sectionName: 'Indicator: Sample Collection (All)', sectionTargets: [
    { id: 'informed', text: 'Percentage of patients for whom sample collection and informed consent was obtained and documented in the clinical notes' },
    { id: 'significant', text: 'Percentage of patients for whom a clinically significant sample was collected' },
    { id: 'aseptic', text: 'Percentage of patients from whom the sample was collected using aseptic and correct technique' },
    { id: 'antibiotics', text: 'Percentage of patients for culture whose sample was collected prior to administration of antibiotics' },
    { id: 'minimum', text: 'Percentage of patients for whom the minimum sample volume was collected' },
    { id: 'labelled', text: 'Percentage of patients with correctly labelled sample collection containers' },
    { id: 'form', text: 'Percentage of patients with completely and accurately completed lab request form' },
  ]},

  { sectionId: 'collection-blood', sectionName: 'Indicator: Sample Collection (Blood only)', sectionTargets: [
    { id: 'washed', text: 'Percentage of patients for whom clinician taking blood sample washed hands prior to procedure' },
    { id: 'disinfected', text: 'Percentage of patients for whom clinician taking blood sample disinfected hands prior to procedure' },
    { id: 'sterile', text: 'Percentage of patients for whom clinician taking blood sample used sterile gloves for procedure' },
    { id: 'peripheral', text: 'Percentage of patients from whom blood was drawn from peripheral sites for blood culture' },
    { id: 'venipuncture', text: 'Percentage of patients for whom blood cultures were drawn from separate venipuncture sites' },
    { id: 'cleaned', text: 'Percentage of patients for whom puncture site was cleaned using appropriate disinfectant' },
    { id: 'site-dry', text: 'Percentage of patients for whom puncture site was disinfected allowed time to dry before inserting needle' },
    { id: 'tops-disinfected', text: 'Percentage of patients for whom the blood culture bottle tops were disinfected prior to inoculation' },
    { id: 'tops-dry', text: 'Percentage of patients for whom the blood culture bottle tops allowed to dry prior to inoculation' },
    { id: 'needles', text: 'Percentage of patients whom needles were not exchanged between blood culture collection and inoculation of blood culture bottles' },
    { id: 'first', text: 'Percentage of patients whom had blood culture bottles inoculated first, if blood is collected for other tests' },
    { id: 'drawn', text: 'Percentage of patients whom had a minimum of 2 and maximum of 3 blood cultures drawn within 24 hours' },
    { id: 'aerobic', text: 'Percentage of patients patients whom had an aerobic blood culture in a resource-limited setting' },
    { id: 'volume', text: 'Percentageof patients whom had blood collection where the volume followed the manufacturer\'s recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children' },
  ]},

  // { sectionId: 'turnaround', sectionName: 'Indicator: Turnaround time (TAT) of sample sent to lab', sectionTargets: [
  //   { id: 'faeces', text: 'Turnaround time from faeces sample collection to receipt at lab (in hours)' },
  //   { id: 'urine', text: 'Turnaround time from urine sample collection to receipt at lab  (in hours)' },
  //   { id: 'blood', text: 'Turnaround time from blood sample collection to receipt at lab  (in hours)' },
  //   { id: 'transported', text: 'Percentage of samples transported to lab within target TAT' },
  //   { id: 'sent', text: 'Percentage of clinical staff that are aware of the target times for sample sent to the lab' },
  //   { id: 'store', text: 'Percentage of clinical staff that are aware of how to store a sample if there is a delay in transporting it to the lab' },
  //   { id: 'fridge', text: 'Percentage of departments that have a designated fridge for storage of samples' },
  // ]},

  // { sectionId: 'result-use', sectionName: 'Indicator: Use Test Result', sectionTargets: [
  //   { id: 'folder', text: 'Percentage of patients whose records were reviewed where there is evidence that laboratory test results are placed in the patient folder' },
  //   { id: 'communicated', text: 'Percentage of patients that critical call out test results from the lab were communicated promptly to the clinician/wards and documented' },
  //   { id: 'revised', text: 'Percentage of patients where there is evidence that antibiotic treatment is revised based on the laboratory AST result' },
  //   { id: 'guidelines', text: 'Proportion of patients where antibiotic treatment followed the clinical site prescriber guidelines for common medical conditions' },
  //   { id: 'formulary', text: 'Proportion of patients where there is evidence that antibiotic treatment is consistent with medices formulary ' },
  //   { id: 'engage', text: 'Percentage of wards or department that engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections' },
  //   { id: 'meet', text: 'Percentage of wards or departments where clinical staff and laboratory staff meet at least quarterly' },
  // ]},
];

// QUESTIONS

const q_1_1 = {
  id: 'q_1_1',
  text: 'Is a copy of the current treatment guidelines available in this department?',
  type: 'q',
  subType: 'y_n',
  standards: 'F1, U1, B1',
  dataSource: '[LC2.1]'
};
const q_1_2 = {
  id: 'q_1_2',
  text: 'Is there evidence that the ward or department actively monitors test results for patterns suggestive of nosocomial outbreaks or hospital acquired infections?',
  type: 'q',
  subType: 'y_n',
  standards: 'F17, U19, B30',
  dataSource: '[LC2.2]'
};
const q_1_3 = {
  id: 'q_1_3',
  text: 'Does the ward or department engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections?',
  type: 'q',
  subType: 'y_n',
  standards: 'F17, U19, B30',
  dataSource: '[LC2.2]'
};
const q_1_4 = {
  id: 'q_1_4',
  text: 'Do the ward or department clinical staff and laboratory staff regularly meet (at least quarterly) to troubleshoot gaps in laboratory-clinical linkages, including specimen collection, referral, interpretation and reporting?',
  type: 'q',
  subType: 'y_n',
  standards: 'F17, U19, B30',
  dataSource: '[LC2.2]'
};
const inp_sec_1 = {
  id: 'fac_sec_1',
  text: 'Department Documents, Policies & Structures',
  type: 'section',
  subType: 'table',
  children: [q_1_1] // not needed for now, q_1_2, q_1_3, q_1_4]
};


const q_2_1 = {
  id: 'q_2_1',
  text: 'Is a “Laboratory Handbook” which describes specimen collection, storage, and transportation of samples available to clinical staff in the ward or department?',
  type: 'q',
  subType: 'y_n',
  standards: 'F2, U2, B2',
};
const q_2_2 = {
  id: 'q_2_2',
  text: 'Are clinical staff aware of the target time to transfer samples (all specimen types) to the lab?',
  type: 'q',
  subType: 'y_n',
  standards: 'F11, U13',
};
const q_2_3 = {
  id: 'q_2_3',
  text: 'Are clinical staff aware of the need to store faeces and urine samples in fridge if there is a delay?',
  type: 'q',
  subType: 'y_n',
  standards: 'F10, U12',
};
const q_2_4 = {
  id: 'q_2_4',
  text: 'Is there designated fridge storage space for samples in the department/ward?',
  type: 'q',
  subType: 'y_n',
  standards: 'F10, U12',
};
const q_2_5 = {
  id: 'q_2_5',
  text: 'Are clinical staff aware of the need to store blood samples at room temperature if there is a delay?',
  type: 'q',
  subType: 'y_n',
  standards: 'B23',
};
const inp_sec_2 = {
  id: 'fac_sec_2',
  text: 'Sample Requisition, collection, transport & storage',
  type: 'section',
  subType: 'table',
  children: [q_2_1, q_2_2, q_2_3, q_2_4, q_2_5]
};


const q_3_1 = {
  id: 'q_3_1',
  denominator: true,
  text: 'Number of patients with dysentery whose records were reviewed',
  type: 'q',
  subType: '%',
  standards: 'F3'
};
const q_3_2 = {
  id: 'q_3_2',
  text: 'Number of patients reviewed who had faecal culture ordered',
  type: 'q',
  subType: '%',
  standards: 'F3',
};
const q_3_3 = {
  id: 'q_3_3',
  denominator: true,
  text: 'Number of patients for whom faecal sample collection procedure was witnessed',
  type: 'q',
  subType: '%',
  standards: 'F4-F9'
};
const q_3_4 = {
  id: 'q_3_4',
  text: 'Number of patients for whom informed consent was obtained and documented in the clinical notes before performing faeces culture',
  type: 'q',
  subType: '%',
  standards: 'F4'
};
const q_3_5 = {
  id: 'q_3_5',
  text: 'Number of patients from whom faeces were collected using aseptic technique',
  type: 'q',
  subType: '%',
  standards: 'F5'
};
const q_3_6 = {
  id: 'q_3_6',
  text: 'Number of patients for whom a minimum of 1g of feaces was collected for faeces culture',
  type: 'q',
  subType: '%',
  standards: 'F6'
};
const q_3_7 = {
  id: 'q_3_7',
  text: 'Number of patients for whom the faeces collection containers are correctly labelled including at least: patient identifiers, site, date and time of collection',
  type: 'q',
  subType: '%',
  standards: 'F7'
};
 const q_3_8 = {
   id: 'q_3_8',
   text: 'Number of patients for whom the lab request form was filled out completely and accurately, including at least: patient identifiers, site, date and time of collection, clinical information regarding suspected diagnosis, and contact details of requesting doctor',
   type: 'q',
   subType: '%',
   standards: 'F8'
 };
const q_3_9 = {
  id: 'q_3_9',
  text: 'Number of patients for whom faeces collection is documented in the clinical notes',
  type: 'q',
  subType: '%',
  standards: 'F9'
};
const q_3_10 = {
  id: 'q_3_10',
  text: 'Number of patients for faeces culture whose records were reviewed',
  type: 'q',
  subType: '%',
  standards: 'F14, F16'
};
const q_3_11  = {
  id: 'q_3_11',
  text: 'Number of patients for faeces culture whose records were reviewed where there is evidence that laboratory test results are placed in the patient folder',
  type: 'q',
  subType: '%',
  standards: 'F14'
};
const q_3_12  = {
  id: 'q_3_12',
  text: 'Number of patients for faeces that critical call outs regarding patients test results received from lab are promptly communicated to the clinician/wards and documented',
  type: 'q',
  subType: '%',
  standards: 'F16'
};
const q_3_13  = {
  id: 'q_3_13',
  text: 'Number of patients for faeces culture whose records were reviewed there is evidence that antibiotic treatment is revised based on the laboratory AST result',
  type: 'q',
  subType: '%',
  standards: 'F16'
};
const q_3_14  = {
  id: 'q_3_14',
  text: 'Number of patients for faeces culture whose records were reviewed and there is evidence that antibiotic treatment followed the clinical site prescriber guidelines for common medical conditions',
  type: 'q',
  subType: '%',
  standards: 'F16'
};
const q_3_15  = {
  id: 'q_3_15',
  text: 'Number of patients for faeces culture whose records were reviewed and there is evidence that antibiotic treatment is consistent with medices formulary',
  type: 'q',
  subType: '%',
  standards: 'F16'
};
const inp_sec_3 = {
  id: 'fac_sec_3',
  text: 'Faeces Culture',
  type: 'section',
  subType: 'table',
  children: [q_3_1, q_3_2, q_3_3, q_3_4, q_3_5, q_3_6, q_3_7, q_3_8, q_3_9] 
  // not needed for now, q_3_10, q_3_11, q_3_12, q_3_13, q_3_14, q_3_15]
};

const q_4_1 = {
  id: 'q_4_1',
  denominator: true,
  type: 'q',
  subType: '%',
  standards: 'U3',
  text: 'Number of patients with urinary tract infection whose records were reviewed'
};
const q_4_2 = {
  id: 'q_4_2',
  type: 'q',
  subType: '%',
  standards: 'U3',
  text: 'Number of patients reviewed who had urine culture ordered '
};
const q_4_3 = {
  id: 'q_4_3',
  denominator: true,
  type: 'q',
  subType: '%',
  standards: 'U5-11',
  text: 'Number of patients for whom urine sample collection procedure was witnessed'
};
const q_4_4 = {
  id: 'q_4_4',
  type: 'q',
  subType: '%',
  standards: 'U4',
  text: 'Number of patients for whom informed consent was obtained and documented in the clinical notes before performing urine culture'
};
const q_4_5 = {
  id: 'q_4_5',
  type: 'q',
  subType: '%',
  standards: 'U5',
  text: 'Number of patients for whom urine was collected before administration of antibiotics'
};
const q_4_6 = {
  id: 'q_4_6',
  type: 'q',
  subType: '%',
  standards: 'U6',
  text: 'Number of patients advised by clinical staff on the correct procedure for mid-stream urine collection '
};
const q_4_7 = {
  id: 'q_4_7',
  type: 'q',
  subType: '%',
  standards: 'U7',
  text: 'Number of patients reviewed for whom suprapubic urine samples were collected for culture'
};
const q_4_8 = {
  id: 'q_4_8',
  type: 'q',
  subType: '%',
  standards: 'U7',
  text: 'Number of patients from whom suprapubic urine samples were collected using aseptic technique'
};
const q_4_9 = {
  id: 'q_4_9',
  type: 'q',
  subType: '%',
  standards: 'U8',
  text: 'Number of patients for whom a minimum of 3ml of urine was collected for culture'
};
const q_4_10 = {
  id: 'q_4_10',
  type: 'q',
  subType: '%',
  standards: 'U9',
  text: 'Number of patients for whom urine collection containers are correctly labelled including at least: patient identifiers, site, date and time of collection'
};
const q_4_11 = {
  id: 'q_4_11',
  type: 'q',
  subType: '%',
  standards: 'U10',
  text: 'Number of patients for whom the lab request form was filled out completely and accurately, including at least: patient identifiers, site, date and time of collection, clinical information regarding suspected diagnosis, and contact details of requesting doctor'
};
const q_4_12 = {
  id: 'q_4_12',
  type: 'q',
  subType: '%',
  standards: 'U11',
  text: 'Number of patients for whom urine collection is documented in the clinical notes'
};
const q_4_13 = {
  id: 'q_4_13',
  type: 'q',
  subType: '%',
  standards: 'U16/U18',
  text: 'Number of patients for urine culture whose records were reviewed '
};
const q_4_14 = {
  id: 'q_4_14',
  type: 'q',
  subType: '%',
  standards: 'U16',
  text: 'Number of patients for urine culture whose records were reviewed where there is evidence that laboratory test results are placed in the patient folder'
};
const q_4_15 = {
  id: 'q_4_15',
  type: 'q',
  subType: '%',
  standards: 'U16',
  text: 'Number of patients for urine that critical call outs regarding patients test results received from lab are promptly communicated to the clinician/wards and documented'
};
const q_4_16 = {
  id: 'q_4_16',
  type: 'q',
  subType: '%',
  standards: 'U18',
  text: 'Number of patients for urine culture whose records were reviewed there is evidence that antibiotic treatment is revised based on the laboratory AST result'
};
const q_4_17 = {
  id: 'q_4_17',
  type: 'q',
  subType: '%',
  standards: 'U18',
  text: 'Number of patients for urine culture whose records were reviewed and there is evidence that antibiotic treatment followed the clinical site prescriber guidelines for common medical conditions'
};
const q_4_18 = {
  id: 'q_4_18',
  type: 'q',
  subType: '%',
  standards: 'U18',
  text: 'Number of patients for urine culture whose records were reviewed and there is evidence that antibiotic treatment is consistent with medices formulary '
};

const inp_sec_4 = {
  id: 'fac_sec_4',
  text: 'Urine Culture',
  type: 'section',
  subType: 'table',
  children: [q_4_1, q_4_2, q_4_3, q_4_4, q_4_5, q_4_6, q_4_7, q_4_8, q_4_9, q_4_10, q_4_11, q_4_12, q_4_13] 
  // not needed for now, q_4_14, q_4_15, q_4_16, q_4_17, q_4_18]
};


const q_5_1 = {
  id: 'q_5_1',
  denominator: true,
  type: 'q',
  subType: '%',
  standards: 'B3',
  text: 'Number of patients with bloodstream infection whose records were reviewed'
};
const q_5_2 = {
  id: 'q_5_2',
  type: 'q',
  subType: '%',
  standards: 'B3',
  text: 'Number of patients reviewed who had blood culture ordered '
};
const q_5_3 = {
  id: 'q_5_3',
  denominator: true,
  type: 'q',
  subType: '%',
  standards: 'B4-B22',
  text: 'Number of patients for whom blood culture sample collection procedure was witnessed'
};
const q_5_4 = {
  id: 'q_5_4',
  type: 'q',
  subType: '%',
  standards: 'B4',
  text: 'Number of patients for whom informed consent was obtained and documented in the clinical notes before performing blood culture'
};
const q_5_5 = {
  id: 'q_5_5',
  type: 'q',
  subType: '%',
  standards: 'B5',
  text: 'Number of patients for whom blood for culture was taken prior to administration of antibiotics'
};
const q_5_6 = {
  id: 'q_5_6',
  type: 'q',
  subType: '%',
  standards: 'B6',
  text: 'Number of patients for whom clinician taking blood sample washed hands prior to procedure'
};
const q_5_7 = {
  id: 'q_5_7',
  type: 'q',
  subType: '%',
  standards: 'B7',
  text: 'Number of patients for whom clinician taking blood sample disinfected hands prior to procedure'
};
const q_5_8 = {
  id: 'q_5_8',
  type: 'q',
  subType: '%',
  standards: 'B8',
  text: 'Number of patients for whom clinician taking blood sample used sterile gloves for procedure'
};
const q_5_9 = {
  id: 'q_5_9',
  type: 'q',
  subType: '%',
  standards: 'B9',
  text: 'Number of patients from whom blood was drawn from peripheral sites for blood culture'
};
const q_5_10 = {
  id: 'q_5_10',
  type: 'q',
  subType: '%',
  standards: 'B10',
  text: 'Number of patients for whom blood cultures were drawn from separate venipuncture sites'
};
const q_5_11 = {
  id: 'q_5_11',
  type: 'q',
  subType: '%',
  standards: 'B11',
  text: 'Number of patients for whom puncture site was cleaned using appropriate disinfectant'
};
const q_5_12 = {
  id: 'q_5_12',
  type: 'q',
  subType: '%',
  standards: 'B12',
  text: 'Number of patients for whom puncture site was disinfected allowed time to dry before inserting needle'
};
const q_5_13 = {
  id: 'q_5_13',
  type: 'q',
  subType: '%',
  standards: 'B13',
  text: 'Number of patients for whom the blood culture bottle tops were disinfected prior to inoculation'
};
const q_5_14 = {
  id: 'q_5_14',
  type: 'q',
  subType: '%',
  standards: 'B14',
  text: 'Number of patients for whom the blood culture bottle tops were allowed to dry prior to inoculation'
};
const q_5_15 = {
  id: 'q_5_15',
  type: 'q',
  subType: '%',
  standards: 'B15',
  text: 'Number of patients whom had needles exchanged between blood culture collection and inoculation of blood culture bottles'
};
const q_5_16 = {
  id: 'q_5_16',
  type: 'q',
  subType: '%',
  standards: 'B16',
  text: 'Number of patients whom had blood culture bottles inoculated first, if blood is collected for other tests'
};
const q_5_17 = {
  id: 'q_5_17',
  type: 'q',
  subType: '%',
  standards: 'B17',
  text: 'Number of patients whom had a minimum of 2 and maximum of 3 blood cultures drawn within 24 hours'
};
const q_5_18 = {
  id: 'q_5_18',
  type: 'q',
  subType: '%',
  standards: 'B18',
  text: 'Number of patients whom had an aerobic blood culture in a resource-limited setting'
};
const q_5_19 = {
  id: 'q_5_19',
  type: 'q',
  subType: '%',
  standards: 'B19',
  text: 'Number of patients whom had blood collection where the volume followed the manufacturer\'s recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children'
};
const q_5_20 = {
  id: 'q_5_20',
  type: 'q',
  subType: '%',
  standards: 'B20',
  text: 'Number of patients for whom blood culture bottles are correctly including at least: patient identifiers, site, date and time of collection'
};
const q_5_21 = {
  id: 'q_5_21',
  type: 'q',
  subType: '%',
  standards: 'B21',
  text: 'Number of patients for whom the lab request form was filled out completely and accurately, including at least: patient identifiers, site, date and time of collection, clinical information regarding suspected diagnosis, and contact details of requesting doctor'
};
const q_5_22 = {
  id: 'q_5_22',
  type: 'q',
  subType: '%',
  standards: 'B22',
  text: 'Number of patients for whom blood collection is documented in the clinical notes'
};
const q_5_23 = {
  id: 'q_5_23',
  type: 'q',
  subType: '%',
  standards: 'B27/B29',
  text: 'Number of patients for blood culture whose records were reviewed '
};
const q_5_24 = {
  id: 'q_5_24',
  type: 'q',
  subType: '%',
  standards: 'B27',
  text: 'Number of patients for blood culture whose records were reviewed where there is evidence that laboratory test results are placed in the patient folder'
};
const q_5_25 = {
  id: 'q_5_25',
  type: 'q',
  subType: '%',
  standards: 'B27',
  text: 'Number of patients for blood culture that critical call outs regarding patients test results received from lab are promptly communicated to the clinician/wards and documented'
};
const q_5_26 = {
  id: 'q_5_26',
  type: 'q',
  subType: '%',
  standards: 'B29',
  text: 'Number of patients for blood culture whose records were reviewed there is evidence that antibiotic treatment is revised based on the laboratory AST result'
};
const q_5_27 = {
  id: 'q_5_27',
  type: 'q',
  subType: '%',
  standards: 'B29',
  text: 'Number of patients for blood culture whose records were reviewed and there is evidence that antibiotic treatment followed the clinical site prescriber guidelines for common medical conditions'
};
const q_5_28 = {
  id: 'q_5_28',
  type: 'q',
  subType: '%',
  standards: 'B29',
  text: 'Number of patients for blood culture whose records were reviewed and there is evidence that antibiotic treatment is consistent with medices formulary '
};

const inp_sec_5 = {
  id: 'fac_sec_5',
  text: 'Blood Culture',
  type: 'section',
  subType: 'table',
  children: [q_5_1, q_5_2, q_5_3, q_5_4, q_5_5, q_5_6, q_5_7, q_5_8, q_5_9, q_5_10, q_5_11, q_5_12, q_5_13, q_5_14, q_5_15, q_5_16, q_5_17, q_5_18, q_5_19, q_5_20, q_5_21, q_5_22]
  // not needed for now, q_5_23, q_5_24, q_5_25, q_5_26, q_5_27, q_5_28]
};

const questions = [
  inp_sec_1,
  // inp_sec_2, not needed for now
  inp_sec_3,
  inp_sec_4,
  inp_sec_5
];


// RESULTS

const r_1_1 = {
  text: 'Percentage of departments that should have a copy of the current treatment guidelines',
  question: q_1_1,
  target: { sectionId: 'documentation', id: 'guidelines' },
  standards: 'F1, U1, B1',
  resources: [],
  recommendations: [
    'Distribute treatment guidelines to departments with none currently available'
  ]
}
const r_1_2 = {
  text: 'Proportion of patients with dysentery, suspicion of a public health threat / outbreak or if there are associated signs of systemic infection who had faecal culture ordered',
  numerator: q_3_2,
  denominator: q_3_1,
  target: { sectionId: 'collection-all', id: 'significant' },
  standards: 'F3',
  resources: [
    {
      title: 'Faecal culture methodology',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
    {
      title: 'Laboratory Diagnosis of Bacterial Gastroenteritis',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Conduct clinician training on use of faecal culture to diagnose diahorreal disease',
    '[2] Ensure uninterrupted supplies and reagents available to conduct faecal culture testing',
    '[3] Ensure efficient systems for sample collection and transport to lab',
    '[4] Consider official training visits for facilities with <60% compliance',
    '[5] Consider clinical audits for facilites with <40% compliance',
  ]
}
const r_1_3 = {
  text: 'Proportion of patients with clinical indications such as suspected urinary tract infection; systemic sepsis without a clear focus or asymptomatic bacteriuria in pregnancy who had urine culture ordered',
  numerator: q_4_2,
  denominator: q_4_1,
  target: { sectionId: 'collection-all', id: 'significant' },
  standards: 'U3',
  resources: [
    {
      title: 'Primary Culture Media for Routine Urine Processing',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Conduct clinician training on use of urine culture to diagnose urinary tract infection',
    '[2] Ensure uninterrupted supplies and reagents available to conduct faecal culture testing',
    '[3] Ensure efficient systems for sample collection and transport to lab',
    '[4] Consider official training visits for facilities with <60% compliance',
    '[5] Consider clinical audits for facilites with <40% compliance',
  ]
}
const r_1_4 = {
  text: 'Proportion of patients with clinical suspicion of bloodstream infection who had blood culture ordered',
  numerator: q_5_2,
  denominator: q_5_1,
  target: { sectionId: 'collection-all', id: 'significant' },
  standards: 'B3',
  resources: [
    {
      title: 'Epidemiology of Bacteremia in Febrile Infants in the United States',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
    {
      title: 'Sepsis: A Review of Advances in Management',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
    {
      title: 'Sepsis Management',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
    {
      title: 'Sepsis Roadmap',
      link: 'https://drive.google.com/drive/folders/1Y2LqvJ374uNHXtIXvyNhLpet9s8SKnol?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Conduct clinician training on use of blood culture to diagnose bloodstream infections',
    '[2] Ensure uninterrupted supplies and reagents available to conduct faecal culture testing',
    '[3] Ensure efficient systems for sample collection and transport to lab',
    '[4] Consider official training visits for facilities with <60% compliance',
    '[5] Consider clinical audits for facilites with <40% compliance',
  ]
}
const inp_r_sec_1 = {
  text: 'A. Appropriate Diagnostic Test Order (Clinical Facility, by Department)',
  results: [r_1_1, r_1_2, r_1_3, r_1_4]
};


const r_2_1 = {
  standards: 'F4',
  text: 'Proportion of patients for whom informed consent was obtained and documented in the clinical notes before performing faeces culture',
  numerator: q_3_4,
  denominator: q_3_3,
  target: { sectionId: 'collection-all', id: 'informed' },
  recommendations: [
    '[1] Remind clinicians of the importance of correct use & documentation of request forms, including informed consent, as incomplete forms will lead to samples being rejected.',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that patient details, including informed consent, are essential for sample processing',
  ],
  resources: [
    {
      title: 'An effective multisource informed consent procedure for research and clinical practice',
      link: 'https://drive.google.com/file/d/1h4jZn94FORB4Mau8BL13vaY9-DPeVjF7/view?usp=sharing'
    }
  ]
}
const r_2_2 = {
  standards: 'F5',
  text: 'Proportion of patients from whom faeces were collected using aseptic technique',
  numerator: q_3_5,
  denominator: q_3_3,
  target: { sectionId: 'collection-all', id: 'aseptic' },
  recommendations: [
    '[1] Remind clinicians that samples not collected aseptically, are of doubtful clinical significance.',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that samples not collected aseptically, are of doubtful clinical significance, and a repeat sample must be sent ASAP',
  ],
  resources: [
    {
      title: 'An effective multisource informed consent procedure for research and clinical practice',
      link: 'https://drive.google.com/file/d/1h4jZn94FORB4Mau8BL13vaY9-DPeVjF7/view?usp=sharing'
    }

  ]
}
const r_2_3 = {
  standards: 'F6',
  text: 'Proportion of patients for whom a minimum of 1g of feaces was collected for faeces culture',
  numerator: q_3_6,
  denominator: q_3_3,
  target: { sectionId: 'collection-all', id: 'minimum' },
  recommendations: [
    '[1] Remind clinicians that a suffient quantity of faecal mater is required for testing and true representation of the microbes within',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that samples not collected in sufficient quantity may adversly affect the results and may lead to false negatives',
  ],
  resources: [
    {
      title: 'Laboratory Diagnosis of Bacterial Gastroenteritis',
      link: 'https://drive.google.com/file/d/1h4jZn94FORB4Mau8BL13vaY9-DPeVjF7/view?usp=sharing'
    }
  ]
}
const r_2_4 = {
  standards: 'F7',
  text: 'Proportion of patients with correctly labelled sample collection containers',
  numerator: q_3_7,
  denominator: q_3_3,
  target: { sectionId: 'collection-all', id: 'labelled' },
  recommendations: [
    '[1] Remind clinicians of the significance of correctly labelling patient identifiers on sample containers, as incomplete or incorrect details will lead to samples being rejected',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that correct patient details on samples are essential for sample processing, those with incomplete patient identifiers must be rejected and if possible a request for a new sample sent',
  ],
  resources: [
    {
      title: 'Correct labelling of samples in: WHO guidelines on drawing blood',
      link: 'https://drive.google.com/file/d/1h4jZn94FORB4Mau8BL13vaY9-DPeVjF7/view?usp=sharing'
    }
  ]
}
const r_2_5 = {
  standards: 'F8',
  text: 'Proportion of patients with completely and accurately completed lab request form',
  numerator: q_3_8,
  denominator: q_3_3,
  target: { sectionId: 'collection-all', id: 'form' },
  recommendations: [
    '[1] Remind clinicians of the significance of correct documentation of patient and sample details on all request forms, as incomplete or incorrect details will lead to samples being rejected',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that correct patient & sample details on request forms are essential for sample processing, those with incomplete patient identifiers or wrong sample details must be rejected and if possible a request for a new sample sent',
  ],
  resources: [
    {
      title: 'Correct labelling of request forms in: WHO guidelines on drawing blood',
      link: 'https://drive.google.com/file/d/1h4jZn94FORB4Mau8BL13vaY9-DPeVjF7/view?usp=sharing'
    }
  ]
}
const r_2_6 = {
  standards: 'F9',
  text: 'Proportion of patients with faecal collection documented in clinical notes',
  numerator: q_3_9,
  denominator: q_3_3,
  target: { sectionId: 'collection-all', id: 'informed' },
  recommendations: [
    '[1] Remind clinicians on the importance of complete and correct sample notes and clinical history',
    '[2] All samples must be noted and described for the material they contain on the request form to ensure correct sample processing and pairing of samples with the relevant request form',
  ],
  resources: [
    {
      title: 'Laboratory Diagnosis of Bacterial Gastroenteritis',
      link: 'https://drive.google.com/file/d/1h4jZn94FORB4Mau8BL13vaY9-DPeVjF7/view?usp=sharing'
    }
  ]
}

const inp_r_sec_2 = {
  text: 'B1. Sample Collection: Faeces',
  results: [r_2_1, r_2_2, r_2_3, r_2_4, r_2_5, r_2_6]
};

const r_3_1 = {
  standards: 'U4',
  text: 'Proportion of patients for whom informed consent was obtained and documented in the clinical notes before performing urine culture',
  numerator: q_4_4,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'informed' },
  resources: [
    {
      title: 'An effective multisource informed consent procedure for research and clinical practice',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the importance of correct use & documentation of request forms, including informed consent, as incomplete forms will lead to samples being rejected. ',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that patient details, including informed consent, are essential for sample processing'
  ]
};
const r_3_2 = {
  standards: 'U5',
  text: 'Proportion of patients with urine collected for culture prior to administration of antibiotics',
  numerator: q_4_5,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'antibiotics' },
  resources: [
    {
      title: 'Update on the approach of urinary tract infection in childhood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Please note that best practice states that urine sample should be sent prior to prescribing of antibiotics',
    '[2] Samples where patients have already taken antibiotics must have this noted, as well as which antibiotic was taken, as antibiotic use can lead to false negatives and will require staff to have knowledge in order to interpret results correctly',
    '[3] Stipulate that a "Report" line is included in all clinical reports, that antibiotic use prior to urine sampling, must be noted'
]
};
const r_3_3 = {
  standards: 'U6',
  text: 'Proportion of patients advised by clinical staff on the correct procedure for mid-stream urine collection ',
  numerator: q_4_6,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'aseptic' },
  resources: [
    {
      title: 'Collection of Mid-Stream urine guidelines',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the importance of correct urinary sample collection, in order to prevent contamination with commensals ',
    '[2] Provide training resources for clinicans',
    '[3] Provide "How to" poster for doctors toilet walls, informing patients to evacuate the first part of urine, clean and then collect a mid-stream sample',
    '[4] Make sure each surgery has adequate provisions for patients to clean themselves when collecting a sample'
  ]
};
const r_3_4 = {
  standards: 'U7',
  text: 'Proportion of patients reviewed for whom suprapubic urine samples were collected for culture',
  numerator: q_4_7,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'aseptic' },
  resources: [

  ],
  recommendations: [
    '[1] Remind clinicians of the significance of correct sample collection, to prevent contamination',
    '[2] Train clinicians on the correct indications for when a suprapubic sample is required '
  ]
};
const r_3_5 = {
  standards: 'U8',
  text: 'Proportion of patients from whom suprapubic urine was collected using aseptic technique',
  numerator: q_4_8,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'aseptic' },
  resources: [
    {
      title: 'Update on the approach of urinary tract infection in childhood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the significance of correct sample collection, to prevent contamination',
    '[2] Train clinicians on the correct indications for when a suprapubic sample is required '
  ]
};
const r_3_6 = {
  standards: 'U9',
  text: 'Proportion of patients for whom a minimum of 3ml urine was collected for culture',
  numerator: q_4_9,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'minimum' },
  resources: [
    {
      title: 'Update on the approach of urinary tract infection in childhood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Collection of mid-stream urine samples guidelines',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the importance of having sufficient sample to test',
    '[2] Provide training for clinicians to make sure they ask patients to have drunk enough water, and wait a minimum 30m to 1h before giving a sample'
  ]
};
const r_3_7 = {
  standards: 'U10',
  text: 'Proportion of patients with correctly labelled sample collection containers',
  numerator: q_4_10,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'labelled' },
  resources: [
    {
      title: 'Correct labelling of samples in: WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the significance of correctly labelling patient identifiers on sample containers, as incomplete or incorrect details will lead to samples being rejected ',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that correct patient details on samples are essential for sample processing, those with incomplete patient identifiers must be rejected and if possible a request for a new sample sent'
  ]
};
const r_3_8 = {
  standards: 'U11',
  text: 'Proportion of patients with completely and accurately completed lab request form',
  numerator: q_4_11,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'form' },
  resources: [
    {
      title: 'Correct labelling of request forms in: WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the significance of correct documentation of patient and sample details on all request forms, as incomplete or incorrect details will lead to samples being rejected ',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that correct patient & sample details on request forms are essential for sample processing, those with incomplete patient identifiers or wrong sample details must be rejected and if possible a request for a new sample sent'
  ]
};
const r_3_9 = {
  standards: 'U12',
  text: 'Proportion of patient with urine collection documented in clinical notes',
  numerator: q_4_12,
  denominator: q_4_3,
  target: { sectionId: 'collection-all', id: 'informed' },
  resources: [

  ],
  recommendations: [
    '[1] Remind clinicians on the importance of complete and correct sample notes and clinical history ',
    '[2] All samples must be noted and described for the material they contain on the request form to ensure correct sample processing and pairing of samples with the relevant request form'
  ]
};

const inp_r_sec_3 = {
  text: 'B2. Sample Collection: Urine',
  results: [r_3_1, r_3_2, r_3_3, r_3_4, r_3_5, r_3_6, r_3_7, r_3_8, r_3_9]
};


const r_4_1 = {
  standards: 'B4',
  text: 'Proportion of patients for whom informed consent was obtained and documented in the clinical notes before taking blood for culture',
  numerator: q_5_4,
  denominator: q_5_3,
  target: { sectionId: 'collection-all', id: 'informed' },
  resources: [
    {
      title: 'An effective multisource informed consent procedure ',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the importance of correct use & documentation of request forms, including informed consent, as incomplete forms will lead to samples being rejected. ',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that patient details, including informed consent, are essential for sample processing',
  ]

};
const r_4_2 = {
  standards: 'B5',
  text: 'Proportion of patients for whom blood for culture was taken prior to administration of antibiotics',
  numerator: q_5_5,
  denominator: q_5_3,
  target: { sectionId: 'collection-all', id: 'antibiotics' },
  resources: [
    {
      title: 'Blood Culture BioMerieux',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Sepsis: A Review of Advances in Management',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Please note that best practice states that blood samples should be sent prior to prescribing of antibiotics',
    '[2] Samples where patients have already taken antibiotics must have this noted, as well as which antibiotic was taken, as antibiotic use can lead to false negatives and will require staff to have knowledge in order to interpret results correctly',
    '[3] Stipulate that a "Report" line is included in all clinical reports, that antibiotic use prior to blood sampling, must be noted',
  ]

};
const r_4_3 = {
  standards: 'B6',
  text: 'Proportion of patients for whom clinician taking blood sample washed hands prior to procedure',
  numerator: q_5_6,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'washed' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination',
    '[2] Send clinicians "How to" posters, if possible, showing correctly collect blood samples',
    '[3] Ensure clinicians have sufficient access to wash stations, disinfection material & gloves',
  ]

};
const r_4_4 = {
  standards: 'B7',
  text: 'Proportion of patients for whom clinician taking blood sample disinfected hands prior to procedure',
  numerator: q_5_7,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'disinfected' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination',
    '[2] Send clinicians "How to" posters, if possible, showing correctly collect blood samples',
    '[3] Ensure clinicians have sufficient access to wash stations, disinfection material & gloves',
  ]

};
const r_4_5 = {
  standards: 'B8',
  text: 'Proportion of patients for whom clinician taking blood sample used sterile gloves for procedure',
  numerator: q_5_8,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'sterile' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination',
    '[2] Send clinicians "How to" posters, if possible, showing correctly collect blood samples',
    '[3] Ensure clinicians have sufficient access to wash stations, disinfection material & gloves',
  ]

};
const r_4_6 = {
  standards: 'B9',
  text: 'Proportion of patients from whom blood was drawn from peripheral sites for blood culture',
  numerator: q_5_9,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'peripheral' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Ensure there is sufficient training for clinicians on the correct procedures and sites for blood sampling',
  ]

};
const r_4_7 = {
  standards: 'B10',
  text: 'Proportion of patients for whom blood cultures were drawn from separate venipuncture sites',
  numerator: q_5_10,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'venipuncture' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Ensure there is sufficient training for clinicians on the correct procedures and sites for blood sampling',
  ]

};
const r_4_8 = {
  standards: 'B11',
  text: 'Proportion of patients for whom puncture site was cleaned using appropriate disinfectant',
  numerator: q_5_11,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'cleaned' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination',
    '[2] Send clinicians "How to" posters, if possible, showing correctly collect blood samples ',
    '[3] Ensure clinicians have sufficient access to disinfection materials and alcohol swabs',
    '[4] Conduct onsite training if samples are repeatedly contaminated',
  ]

};
const r_4_9 = {
  standards: 'B12',
  text: 'Proportion of patients for whom puncture site was disinfected allowed time to dry before inserting needle',
  numerator: q_5_12,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'site-dry' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination',
    '[2] Ensure clinicians understand the correct method for decontaminating a blood sampling site, including letting the disinfection dry off before use',
    '[3] Conduct onsite training if samples are repeatedly contaminated',
  ]

};
const r_4_10 = {
  standards: 'B13',
  text: 'Proportion of patients for whom the blood culture bottle tops were disinfected prior to inoculation',
  numerator: q_5_13,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'tops-disinfected' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination, including alcohol cleaning of bottle tops before introducing blood sample',
    '[2] Ensure clinicians understand the correct method for decontaminating a blood bottles - conduct onsite training if samples are repeatedly contaminated',
  ]

};
const r_4_11 = {
  standards: 'B14',
  text: 'Proportion of patients for whom the blood culture bottle tops allowed to dry prior to inoculation',
  numerator: q_5_14,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'tops-dry' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting introducing blood samples to avoid cross contamination',
    '[2] Ensure clinicians understand the correct method for decontaminating a blood bottle, including letting the disinfection dry off before use',
    '[3] Conduct onsite training if samples are repeatedly contaminated',
  ]

};
const r_4_12 = {
  standards: 'B15',
  text: 'Proportion of patients whom needles were not exchanged between blood culture collection and inoculation of blood culture bottles',
  numerator: q_5_15,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'needles' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the significance of correct asceptic technique when collecting blood samples to avoid cross contamination',
    '[2] Ensure clinicians understand the significance of sterile single use needles for blood collection',
    '[3] Ensure a sufficient supply of single use sterile needles and equipment',
    '[4] Conduct onsite training if samples are repeatedly contaminated',
  ]

};
const r_4_13 = {
  standards: 'B16',
  text: 'Proportion of patients whom had blood culture bottles inoculated first, if blood is collected for other tests',
  numerator: q_5_16,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'first' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Blood collection procedure',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Order of Blood bottle collection',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Ensure clinicians understand the significance of introducing blood into culture bottles first to avoid chemical cross contamination with other tests. ',
    '[2] Provide clinicians with charts, to show the order in which to inoculate bottles',
    '[3] Conduct onsite training if samples are repeatedly spoiled',
  ]

};
const r_4_14 = {
  standards: 'B17',
  text: 'Proportion of patients whom had a minimum of 2 and maximum of 3 blood cultures drawn within 24 hours',
  numerator: q_5_17,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'drawn' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Blood collection procedure',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Ensure training for clinicians to understand the reasons why 2-3 bottles are required within a 24h period',
  ]

};
const r_4_15 = {
  standards: 'B18',
  text: 'Proportion of patients patients whom had an aerobic blood culture in a resource-limited setting',
  numerator: q_5_18,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'aerobic' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Blood collection procedure',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Ensure clinicians understand the significance of collecting an aerobic bottle of blood over an anaerobic one - Paediatric patients rarely have anaerobes, therefore prioritise aerobic bottles',
    '[2] Send clinicians reminders that aerobic bacteria predominate in adult blood infections too, if a choice is necessary, choose to use aerobic',
  ]

};
const r_4_16 = {
  standards: 'B19',
  text: 'Proportion of patients whom had blood collection where the volume followed the manufacturer\'s recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children',
  numerator: q_5_19,
  denominator: q_5_3,
  target: { sectionId: 'collection-blood', id: 'volume' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Blood collection procedure',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Ensure clinicians understand the significance of adequate blood volumes required for reliable blood cultures. Less than the recommended volume will most likely lead to a false negative',
    '[2] Conduct onsite training for sites where blood isn\'t routinely collected at sufficient quantities',
  ]

};
const r_4_17 = {
  standards: 'B20',
  text: 'Proportion of patients with correctly labelled blood culture bottles',
  numerator: q_5_20,
  denominator: q_5_3,
  target: { sectionId: 'collection-all', id: 'labelled' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Blood collection procedure',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the significance of correctly labelling patient identifiers on sample containers, as incomplete or incorrect details will lead to samples being rejected ',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that correct patient details on samples are essential for sample processing, those with incomplete patient identifiers must be rejected and if possible a request for a new sample sent',
  ]

};
const r_4_18 = {
  standards: 'B21',
  text: 'Proportion of patients with completely and accurately completed lab request form',
  numerator: q_5_21,
  denominator: q_5_3,
  target: { sectionId: 'collection-all', id: 'form' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
    {
      title: 'Blood collection procedure',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians of the significance of correct documentation of patient and sample details on all request forms, as incomplete or incorrect details will lead to samples being rejected ',
    '[2] Stipulate that a "Reply" line should be included on clinical reports that correct patient & sample details on request forms are essential for sample processing, those with incomplete patient identifiers or wrong sample details must be rejected and if possible a request for a new sample sent',
  ]

};
const r_4_19 = {
  standards: 'B22',
  text: 'Proportion of patient with blood collection documented in clinical notes',
  numerator: q_5_22,
  denominator: q_5_3,
  target: { sectionId: 'collection-all', id: 'informed' },
  resources: [
    {
      title: 'WHO guidelines on drawing blood',
      link: 'https://drive.google.com/drive/folders/14aQ12USIOsuHyLOU75sHVQ8oVi4N0Pk0?usp=sharing'
    },
  ],
  recommendations: [
    '[1] Remind clinicians on the importance of complete and correct sample notes and clinical history',
    '[2] All samples must be noted and described for the material they contain on the request form to ensure correct sample processing and pairing of samples with the relevant request form',
  ]

};
const inp_r_sec_4 = {
  text: 'B3. Sample Collection: Blood',
  results: [r_4_1, r_4_2, r_4_3, r_4_4, r_4_5, r_4_6, r_4_7, r_4_8, r_4_9, r_4_10, r_4_11, r_4_12, r_4_13, r_4_14, r_4_15, r_4_16, r_4_17, r_4_18, r_4_19]
};

const results = [
  inp_r_sec_1,
  inp_r_sec_2,
  inp_r_sec_3,
  inp_r_sec_4
]

export { title, instructions, targetInstructions, departmentInstructions, questions, targets, results, departments }