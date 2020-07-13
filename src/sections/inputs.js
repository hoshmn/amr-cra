// section and preface may have children, q may have subQs
const types = ['q', 'section', 'preface'];
const subTypes = ['box', 'y_n'];

const title = 'Clinical Facility Data Inputs';

const instructions = [
  'Please complete the following, from the "Technical Scorecard: Laboratory Clinical Interface AMR Scorecard", Section 1 in C. Clinical Site Assessment.',
  'The corresponding data sources are indicated in the section headers for reference. The relevant standards are indicated after each question in parentheses.'
];

const departments = [
  { id: 'medi', display: 'Medical' },
  { id: 'gene', display: 'General Surgery' },
  { id: 'pedi', display: 'Pediatrics' },
  { id: 'inte', display: 'Intensive Care Unit (Adult)' },
  { id: 'obst', display: 'Obstetrics / Gynaecology' },
  { id: 'emer', display: 'Emergency / Trauma' },
  { id: 'neon', display: 'Neonatal Intensive Care Unit' },
  { id: 'orth', display: 'Orthopeadics' },
  { id: 'card', display: 'Cardiology' },
  { id: 'pedi', display: 'Pediatric Intensive Care Unit' },
  { id: 'neur', display: 'Neurology' },
  { id: 'onco', display: 'Oncology' },
  { id: 'burn', display: 'Burn Unit' },
  { id: 'gast', display: 'Gastroenterology' },
  { id: 'neph', display: 'Nephrology / Urology' },
];

const targets = [
  { sectionId: 'documentation', sectionName: 'Indicator: Documentation, Policies & Structures', sectionTargets: [
    "Percentage of departments that should have a copy of the current treatment guidelines",
    "Percentage of departments that should have a copy of the current Laboratory Handbook",
    "Percentage of departments that actively monitor test results for patterns suggestive of nosocomial outbreaks or hospital acquired infections",
    "Percentage of departments that engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections?",
    "Percentage of departments that have clinical staff and laboratory staff regularly meet (at least quarterly) to troubleshoot gaps in laboratory-clinical linkages, including specimen collection, referral, interpretation and reporting?",
  ]},
  
  { sectionId: 'collectionAll', sectionName: 'Indicator: Sample Collection (All)', sectionTargets: [
    "Percentage of patients for whom sample collection and informed consent was obtained and documented in the clinical notes",
    "Percentage of patients for whom a clinically significant sample was collected",
    "Percentage of patients from whom the sample was collected using aseptic and correct technique",
    "Percentage of patients for culture whose sample was collected prior to administration of antibiotics",
    "Percentage of patients for whom the minimum sample volume was collected",
    "Percentage of patients with correctly labelled sample collection containers",
    "Percentage of patients with completely and accurately completed lab request form",
  ]},
  
  { sectionId: 'collectionBlood', sectionName: 'Indicator: Sample Collection (Blood only)', sectionTargets: [
    "Percentage of patients for whom clinician taking blood sample washed hands prior to procedure",
    "Percentage of patients for whom clinician taking blood sample disinfected hands prior to procedure",
    "Percentage of patients for whom clinician taking blood sample used sterile gloves for procedure",
    "Percentage of patients from whom blood was drawn from peripheral sites for blood culture",
    "Percentage of patients for whom blood cultures were drawn from separate venipuncture sites",
    "Percentage of patients for whom puncture site was cleaned using appropriate disinfectant",
    "Percentage of patients for whom puncture site was disinfected allowed time to dry before inserting needle",
    "Percentage of patients for whom the blood culture bottle tops were disinfected prior to inoculation",
    "Percentage of patients for whom the blood culture bottle tops allowed to dry prior to inoculation",
    "Percentage of patients whom needles were not exchanged between blood culture collection and inoculation of blood culture bottles",
    "Percentage of patients whom had blood culture bottles inoculated first, if blood is collected for other tests",
    "Percentage of patients whom had a minimum of 2 and maximum of 3 blood cultures drawn within 24 hours",
    "Percentage of patients patients whom had an aerobic blood culture in a resource-limited setting",
    "Percentageof patients whom had blood collection where the volume followed the manufacturer's recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children",
  ]},
  
  { sectionId: 'turnaround', sectionName: 'Indicator: Turnaround time (TAT) of sample sent to lab', sectionTargets: [
    "Turnaround time from faeces sample collection to receipt at lab (in hours)",
    "Turnaround time from urine sample collection to receipt at lab  (in hours)",
    "Turnaround time from blood sample collection to receipt at lab  (in hours)",
    "Percentage of samples transported to lab within target TAT",
    "Percentage of clinical staff that are aware of the target times for sample sent to the lab",
    "Percentage of clinical staff that are aware of how to store a sample if there is a delay in transporting it to the lab",
    "Percentage of departments that have a designated fridge for storage of samples",
  ]},
  
  { sectionId: 'resultUse', sectionName: 'Indicator: Use Test Result', sectionTargets: [
    "Percentage of patients whose records were reviewed where there is evidence that laboratory test results are placed in the patient folder",
    "Percentage of patients that critical call out test results from the lab were communicated promptly to the clinician/wards and documented",
    "Percentage of patients where there is evidence that antibiotic treatment is revised based on the laboratory AST result",
    "Proportion of patients where antibiotic treatment followed the clinical site prescriber guidelines for common medical conditions",
    "Proportion of patients where there is evidence that antibiotic treatment is consistent with medices formulary ",
    "Percentage of wards or department that engage the laboratory if there is suggestive of nosocomial outbreaks or hospital acquired infections",
    "Percentage of wards or departments where clinical staff and laboratory staff meet at least quarterly",
  ]},
];

const questions = [{
  id: 'fac_sec_1',
  sectionNum: '1',
  text: 'Oversight Committee [LC1.1]',
  type: 'section',
  defaultOpen: true,
  children: [{
    id: 'fac_q_1',
    text: 'Does the clinical facility have an oversight committee?',
    standards: 'F1, U1, B1',
    tags: [],
    weight: 1,
    recs: [],
    resources: [],
    type: 'q',
    subType: 'y_n',
    // expectedValue: true,
    // revealIf: true,
    subQs: [{
        id:'fac_q_1_sub_preface', text:'Does the committee:', type:'preface'
      },{
        id:'fac_q_1_c1', type:'q', subType:'box',
        text:'Develop/revise treatment guidelines',
        recs:[],
      },{
        id:'fac_q_1_c2', type:'q', subType:'box',
        text:'Use cumulative AST data to inform guidelines',
        recs:[],
      },{
        id:'fac_q_1_c3', type:'q', subType:'box',
        text:'Review antibiotic consumption data',
        recs:[],
      },{
        id:'fac_q_1_c4', type:'q', subType:'box',
        text:'Review data from AMS rounds',
        recs:[],
      },
    ]},
  ],
},

{
  id: 'fac_sec_2',
  sectionNum: '2',
  text: 'Lab Handbook [LC1.2 - 1.4]',
  type: 'section',
  children: [{
    id: 'fac_q_2',
    text: 'Does the clinical facility have a “Laboratory Handbook” which describes specimen collection, storage, and transportation of samples?',
    standards: 'F2, U2, B2',
    tags: [],
    weight: 1,
    recs: [],
    resources: [],
    type: 'q',
    subType: 'y_n',
    subQs: [{
      id:'fac_q_2_sub_preface', text:'Does the handbook state:', type:'preface'
    },{
      id:'fac_q_2_c1', type:'q', subType:'box', tags:['f','u','b'], standards: 'F4, U4, B4',
      text: `Informed consent should be obtained before collection of faeces, urine or blood for culture`
    },{
      id:'fac_q_2_c2', type:'q', subType:'box', tags:['u','b'], standards: 'F5',
      text: `Urine and blood should be collected before administration of antibiotics `
    },{
      id:'fac_q_2_c3', type:'q', subType:'box', tags:['f'], standards: 'U5, B5',
      text: `Faeces should be collected using aseptic technique `
    },{
      id:'fac_q_2_c4', type:'q', subType:'box', tags:['f'], standards: 'F6',
      text: `Minimum of 1g of faeces should be collected for faeces culture`
    },{
      id:'fac_q_2_c5', type:'q', subType:'box', tags:['u'], standards: 'U8',
      text: `A minimum of 3 mL urine should be collected for urine culture`
    },{
      id:'fac_q_2_c6', type:'q', subType:'box', tags:['b'], standards: 'B6',
      text: `Handwashing should be performed prior to performing blood collection for culture`
    },{
      id:'fac_q_2_c7', type:'q', subType:'box', tags:['b'], standards: 'B7',
      text: `Hands should be disinfected prior to performing a blood culture`
    },{
      id:'fac_q_2_c8', type:'q', subType:'box', tags:['b'], standards: 'B8',
      text: `Sterile gloves should be used when performing a blood culture`
    },{
      id:'fac_q_2_c9', type:'q', subType:'box', tags:['b'], standards: 'B9',
      text: `Blood cultures should be drawn from peripheral sites`
    },{
      id:'fac_q_2_c10', type:'q', subType:'box', tags:['b'], standards: 'B10',
      text: `Serial blood cultures should be collected from separate venipuncture sites`
    },{
      id:'fac_q_2_c11', type:'q', subType:'box', tags:['b'], standards: 'B11',
      text: `Puncture site should be cleaned properly as per manufacturer recommended technique and using appropriate disinfectant`
    },{
      id:'fac_q_2_c12', type:'q', subType:'box', tags:['b'], standards: 'B14',
      text: `Bottle-top should be disinfected and disinfectant should be allowed to dry prior to inoculation`
    },{
      id:'fac_q_2_c13', type:'q', subType:'box', tags:['b'], standards: 'B15',
      text: `Needles should not be exchanged between blood culture collection and inoculation of blood culture bottles`
    },{
      id:'fac_q_2_c14', type:'q', subType:'box', tags:['b'], standards: 'B17',
      text: `Minimum of 2 and maximum of 3 Blood cultures should be drawn within 24 hours`
    },{
      id:'fac_q_2_c15', type:'q', subType:'box', tags:['b'], standards: 'B19',
      text: `The volume of blood collected should follow the manufacturer's recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children`
    },{
      id:'fac_q_2_sub_preface_d', type:'preface', text:'Are collection containers correctly labelled for:'
    },{
      id:'fac_q_2_d1', type:'q', subType:'box', tags:['f'], standards: 'F7',
      text: `Faeces`
    },{
      id:'fac_q_2_d2', type:'q', subType:'box', tags:['b'], standards: 'B20',
      text: `Blood`
    },{
      id:'fac_q_2_d3', type:'q', subType:'box', tags:['u'], standards: 'U9',
      text: `Urine`
    },{
      id:'fac_q_2_sub_preface_e', type:'preface', text:'Are samples delivered to the laboratory as soon as possible and within the recommended time periods for:'
    },{
      id:'fac_q_2_e1', type:'q', subType:'box', tags:['f'], standards: 'F11',
      text: `Faeces`
    },{
      id:'fac_q_2_e2', type:'q', subType:'box', tags:['b'], standards: 'B24',
      text: `Blood`
    },{
      id:'fac_q_2_e3', type:'q', subType:'box', tags:['u'], standards: 'U16',
      text: `Urine`
    }]
  },{
    id:'fac_q_3_preface', type:'preface',
    text:'Do the facility treatment guidelines include the following requirements:',
    children: [{
      id: 'fac_q_3a',
      text: 'To do faecal culture if there is dysentery, suspicion of a public health threat / outbreak or if there are associated signs of systemic infection?',
      standards: 'F3',
      tags: ['f'],
      weight: 1,
      recs: [],
      resources: [],
      type: 'q',
      subType: 'y_n'
    },{
      id: 'fac_q_3b',
      text: 'To do urine culture if there are clinical indications such as suspected urinary tract infection; systemic sepsis without a clear focus or asymptomatic bacteriuria in pregnancy?',
      standards: 'U3',
      tags: ['u'],
      weight: 1,
      recs: [],
      resources: [],
      type: 'q',
      subType: 'y_n'
    },{
      id: 'fac_q_3c',
      text: 'To do blood culture with clinical suspicion of blood stream infection?',
      standards: 'B3',
      tags: ['b'],
      weight: 1,
      recs: [],
      resources: [],
      type: 'q',
      subType: 'y_n'
    }]
  }],
},

{
  id: 'fac_sec_3',
  sectionNum: '3',
  text: 'Lab Request form [LC1.5]',
  type: 'section',
  children: [{
    id:'fac_q_4_preface', type:'preface', standards: 'F8, U10, B21',
    text:'Does the laboratory request form include:'
  },{
    id:'fac_q_4a', type:'q', subType:'box',
    text: `Patient identifiers`
  },{
    id:'fac_q_4b', type:'q', subType:'box',
    text: `Site name`
  },{
    id:'fac_q_4c', type:'q', subType:'box',
    text: `Date of admission`
  },{
    id:'fac_q_4d', type:'q', subType:'box',
    text: `Date & time of collection`
  },{
    id:'fac_q_4e', type:'q', subType:'box',
    text: `Clinical information regarding suspected diagnosis`
  },{
    id:'fac_q_4f', type:'q', subType:'box',
    text: `Contact details of requesting doctor`
  }],
}];

export { title, instructions, questions }