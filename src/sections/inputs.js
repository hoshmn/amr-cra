// section and preface may have children, q may have subQs
const types = ['q', 'section', 'preface'];
const subTypes = ['box', 'y_n', '%'];

const title = 'Clinical Facility Data Inputs';

const instructions = [
  'Please complete the following, from the "Technical Scorecard: Laboratory Clinical Interface AMR Scorecard", Section 1 in C. Clinical Site Assessment.',
  'The corresponding data sources are indicated in the section headers for reference. The relevant standards are indicated after each question in parentheses.'
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
  { id: 'card', name: 'Cardiology' },
  { id: 'pedi', name: 'Pediatric Intensive Care Unit' },
  { id: 'neur', name: 'Neurology' },
  { id: 'onco', name: 'Oncology' },
  { id: 'burn', name: 'Burn Unit' },
  { id: 'gast', name: 'Gastroenterology' },
  { id: 'neph', name: 'Nephrology / Urology' },
];

const targets = [
  { sectionId: 'documentation', sectionName: 'Indicator: Documentation, Policies & Structures', sectionTargets: [
    { id: 'guidelines', text: "Percentage of departments that should have a copy of the current treatment guidelines" },
    { id: 'handbook', text: "Percentage of departments that should have a copy of the current Laboratory Handbook" },
    { id: 'monitor', text: "Percentage of departments that actively monitor test results for patterns suggestive of nosocomial outbreaks or hospital acquired infections" },
    { id: 'nosocomial', text: "Percentage of departments that engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections?" },
    { id: 'meet', text: "Percentage of departments that have clinical staff and laboratory staff regularly meet (at least quarterly) to troubleshoot gaps in laboratory-clinical linkages, including specimen collection, referral, interpretation and reporting?" },
  ]},
  
  { sectionId: 'collection-all', sectionName: 'Indicator: Sample Collection (All)', sectionTargets: [
    { id: 'informed', text: "Percentage of patients for whom sample collection and informed consent was obtained and documented in the clinical notes" },
    { id: 'significant', text: "Percentage of patients for whom a clinically significant sample was collected" },
    { id: 'aseptic', text: "Percentage of patients from whom the sample was collected using aseptic and correct technique" },
    { id: 'antibiotics', text: "Percentage of patients for culture whose sample was collected prior to administration of antibiotics" },
    { id: 'minimum', text: "Percentage of patients for whom the minimum sample volume was collected" },
    { id: 'labelled', text: "Percentage of patients with correctly labelled sample collection containers" },
    { id: 'form', text: "Percentage of patients with completely and accurately completed lab request form" },
  ]},
  
  { sectionId: 'collection-blood', sectionName: 'Indicator: Sample Collection (Blood only)', sectionTargets: [
    { id: 'washed', text: "Percentage of patients for whom clinician taking blood sample washed hands prior to procedure" },
    { id: 'disinfected', text: "Percentage of patients for whom clinician taking blood sample disinfected hands prior to procedure" },
    { id: 'sterile', text: "Percentage of patients for whom clinician taking blood sample used sterile gloves for procedure" },
    { id: 'peripheral', text: "Percentage of patients from whom blood was drawn from peripheral sites for blood culture" },
    { id: 'venipuncture', text: "Percentage of patients for whom blood cultures were drawn from separate venipuncture sites" },
    { id: 'cleaned', text: "Percentage of patients for whom puncture site was cleaned using appropriate disinfectant" },
    { id: 'site-dry', text: "Percentage of patients for whom puncture site was disinfected allowed time to dry before inserting needle" },
    { id: 'tops-disinfected', text: "Percentage of patients for whom the blood culture bottle tops were disinfected prior to inoculation" },
    { id: 'tops-dry', text: "Percentage of patients for whom the blood culture bottle tops allowed to dry prior to inoculation" },
    { id: 'needles', text: "Percentage of patients whom needles were not exchanged between blood culture collection and inoculation of blood culture bottles" },
    { id: 'first', text: "Percentage of patients whom had blood culture bottles inoculated first, if blood is collected for other tests" },
    { id: 'drawn', text: "Percentage of patients whom had a minimum of 2 and maximum of 3 blood cultures drawn within 24 hours" },
    { id: 'aerobic', text: "Percentage of patients patients whom had an aerobic blood culture in a resource-limited setting" },
    { id: 'volume', text: "Percentageof patients whom had blood collection where the volume followed the manufacturer's recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children" },
  ]},
  
  { sectionId: 'turnaround', sectionName: 'Indicator: Turnaround time (TAT) of sample sent to lab', sectionTargets: [
    { id: 'faeces', text: "Turnaround time from faeces sample collection to receipt at lab (in hours)" },
    { id: 'urine', text: "Turnaround time from urine sample collection to receipt at lab  (in hours)" },
    { id: 'blood', text: "Turnaround time from blood sample collection to receipt at lab  (in hours)" },
    { id: 'transported', text: "Percentage of samples transported to lab within target TAT" },
    { id: 'sent', text: "Percentage of clinical staff that are aware of the target times for sample sent to the lab" },
    { id: 'store', text: "Percentage of clinical staff that are aware of how to store a sample if there is a delay in transporting it to the lab" },
    { id: 'fridge', text: "Percentage of departments that have a designated fridge for storage of samples" },
  ]},
  
  { sectionId: 'result-use', sectionName: 'Indicator: Use Test Result', sectionTargets: [
    { id: 'folder', text: "Percentage of patients whose records were reviewed where there is evidence that laboratory test results are placed in the patient folder" },
    { id: 'communicated', text: "Percentage of patients that critical call out test results from the lab were communicated promptly to the clinician/wards and documented" },
    { id: 'revised', text: "Percentage of patients where there is evidence that antibiotic treatment is revised based on the laboratory AST result" },
    { id: 'guidelines', text: "Proportion of patients where antibiotic treatment followed the clinical site prescriber guidelines for common medical conditions" },
    { id: 'formulary', text: "Proportion of patients where there is evidence that antibiotic treatment is consistent with medices formulary " },
    { id: 'engage', text: "Percentage of wards or department that engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections" },
    { id: 'meet', text: "Percentage of wards or departments where clinical staff and laboratory staff meet at least quarterly" },
  ]},
];

const q_1_1 = {
  id: 'q_1_1',
  text: 'Is a copy of the current treatment guidelines available in this department?',
  type: 'q',
  subType: 'y_n',
  standards: 'F1, U1, B1'
};
const q_1_2 = {
  id: 'q_1_2',
  text: 'Is there evidence that the ward or department actively monitors test results for patterns suggestive of nosocomial outbreaks or hospital acquired infections?',
  type: 'q',
  subType: 'y_n',
  standards: 'F17, U19, B30'
};
const q_1_3 = {
  id: 'q_1_3',
  text: 'Does the ward or department engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections?',
  type: 'q',
  subType: 'y_n',
  standards: 'F17, U19, B30'
};
const q_1_4 = {
  id: 'q_1_4',
  text: 'Do the ward or department clinical staff and laboratory staff regularly meet (at least quarterly) to troubleshoot gaps in laboratory-clinical linkages, including specimen collection, referral, interpretation and reporting?',
  type: 'q',
  subType: 'y_n',
  standards: 'F17, U19, B30'
};
const inp_sec_1 = {
  id: 'fac_sec_1',
  text: 'Department Documents, Policies & Structures',
  type: 'section',
  children: [q_1_1, q_1_2, q_1_3, q_1_4]
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
  children: [q_2_1, q_2_2, q_2_3, q_2_4, q_2_5]
};
const q_3_01 = {
  id: 'q_3_01',
  text: 'Number of patients with dysentery whose records were reviewed',
  type: 'q',
  subType: '%',
  standards: 'F3'
};
const q_3_02 = {
  id: 'q_3_02',
  text: 'Number of patients reviewed who had faecal culture ordered',
  type: 'q',
  subType: '%',
  standards: 'F3'
};
const q_3_03 = {
  id: 'q_3_03',
  text: 'Number of patients for whom faecal sample collection procedure was witnessed',
  type: 'q',
  subType: '%',
  standards: 'F4-F9'
};
const q_3_04 = {
  id: 'q_3_04',
  text: 'Number of patients for whom informed consent was obtained and documented in the clinical notes before performing faeces culture',
  type: 'q',
  subType: '%',
  standards: 'F4'
};
const q_3_05 = {
  id: 'q_3_05',
  text: 'Number of patients from whom faeces were collected using aseptic technique',
  type: 'q',
  subType: '%',
  standards: 'F5'
};
const q_3_06 = {
  id: 'q_3_06',
  text: 'Number of patients for whom a minimum of 1g of feaces was collected for faeces culture',
  type: 'q',
  subType: '%',
  standards: 'F6'
};
const q_3_07 = {
  id: 'q_3_07',
  text: 'Number of patients for whom the faeces collection containers are correctly labelled including at least: patient identifiers, site, date and time of collection',
  type: 'q',
  subType: '%',
  standards: 'F7'
};
 const q_3_08 = {
   id: 'q_3_08',
   text: 'Number of patients for whom the lab request form was filled out completely and accurately, including at least: patient identifiers, site, date and time of collection, clinical information regarding suspected diagnosis, and contact details of requesting doctor',
   type: 'q',
   subType: '%',
   standards: 'F8'
 };
const q_3_09 = {
  id: 'q_3_09',
  text: 'Number of patients for whom faeces collection is documented in the clinical notes',
  type: 'q',
  subType: '%',
  standards: 'F9'
};
const q_3_10 = {
  id: 'q_3_10',
  text: 'Number of patients for faeces culture whose records were reviewed ',
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
  text: 'Number of patients for faeces culture whose records were reviewed and there is evidence that antibiotic treatment is consistent with medices formulary ',
  type: 'q',
  subType: '%',
  standards: 'F16'
};
const inp_sec_3 = {
  id: 'fac_sec_3',
  text: 'Faeces Culture',
  type: 'section',
  children: [q_3_01, q_3_02, q_3_03, q_3_04, q_3_05, q_3_06, q_3_07, q_3_08, q_3_09, q_3_10, q_3_11, q_3_12, q_3_13, q_3_14, q_3_15]
};

const questions = [
  inp_sec_1,
  inp_sec_2,
  inp_sec_3,
];

export { title, instructions, questions, targets, departments }