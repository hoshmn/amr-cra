const types = ['q', 'section', 'preface'];
const subTypes = ['box', 'y_n'];

export default [
  {
    id: 'fac_sec_1',
    sectionNum: '1',
    text: 'Oversight Committee [LC1.1]',
    type: 'section',
    defaultOpen: true,
    children: [
      {
        id: 'fac_q_1',
        text: 'Does the clinical facility have an oversight committee?',
        standards: '(F1, U1, B1)',
        tags: '',
        weight: 1,
        recs: [],
        resources: [],
        type: 'q',
        subType: 'y_n',
        // expectedValue: true,
        // revealIf: true,
        subQs: [
          {id:'fac_q_1_sub_preface', text:'Does the committee:', type:'preface'},
          {id:'fac_q_1_c1', text:'Develop/revise treatment guidelines', type:'q', subType:'box'},
          {id:'fac_q_1_c2', text:'Use cumulative AST data to inform guidelines', type:'q', subType:'box'},
          {id:'fac_q_1_c3', text:'Review antibiotic consumption data', type:'q', subType:'box'},
          {id:'fac_q_1_c4', text:'Review data from AMS rounds', type:'q', subType:'box'},
        ],
      },
    ],
  },
  {
    id: 'fac_sec_2',
    sectionNum: '2',
    text: 'Lab Handbook [LC1.2 - 1.4]',
    type: 'section',
    children: [],
  },
  {
    id: 'fac_sec_3',
    sectionNum: '3',
    text: 'Lab Request form [LC1.5]',
    type: 'section',
    children: [],
  },
]