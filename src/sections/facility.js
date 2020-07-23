// section and preface may have children, q may have subQs
const types = ['q', 'section', 'preface'];
const subTypes = ['box', 'y_n'];

const title = 'Clinical Facility Level';

const instructions = [
  'This section assesses indicators applicable to the whole clinical facility. Please complete the following, from the "Technical Scorecard: Laboratory Clinical Interface AMR Scorecard", Section 1 in C. Clinical Site Assessment and click “Submit Assessment Section”, when complete.',
  'The corresponding data sources are indicated in the subsection headers for reference. The relevant AMR standards are indicated after each question in parentheses.'
];

// const questions = [{
//   id: 'fac_sec_1',
//   text: 'Oversight Committee',
//   dataSource: '[LC1.1]',
//   type: 'section',
//   children: [{
//     id: 'fac_q_1',
//     text: 'Does the clinical facility have an oversight committee?',
//     standards: 'F1, U1, B1',
//     tags: [],
//     weight: 1,
//     recs: [],
//     resources: [],
//     type: 'q',
//     subType: 'y_n',
//     // expectedValue: true,
//     // revealIf: true,
//     multipart: true,
//     multiText: 'The clinical facility have an oversight committee that revises treatment guidelines and medicines formulary and/or stewardship practices based on cumulative AST antibiograms, pharmacy antibiotic usage data and the outcomes from stewardship ward rounds.',
//     subQs: [{
//         id:'fac_q_1_sub_preface', text:'Does the committee:', type:'preface'
//       },{
//         id:'fac_q_1_c1', type:'q', subType:'box',
//         text:'Develop/revise treatment guidelines',
//         recs:['Establish committee and develop Terms of Reference (ToR)'],
//       },{
//         id:'fac_q_1_c2', type:'q', subType:'box',
//         text:'Use cumulative AST data to inform guidelines',
//         recs:['Within committee, develop standard process to use cumulative AST data to inform guidelines '],
//       },{
//         id:'fac_q_1_c3', type:'q', subType:'box',
//         text:'Review antibiotic consumption data',
//         recs:['Within committee, develop standard process to collect and review AMS data from ward rounds '],
//       },{
//         id:'fac_q_1_c4', type:'q', subType:'box',
//         text:'Review data from AMS rounds',
//         recs:['Within committee, develop standard process to collect and review AMS data from ward rounds '],
//       },
//     ]},
//   ],
// },

// {
//   id: 'fac_sec_2',
//   text: 'Lab Handbook',
//   dataSource: '[LC1.2 - 1.4]',
//   type: 'section',
//   children: [{
//     id: 'fac_q_2',
//     text: 'Does the clinical facility have a “Laboratory Handbook” which describes specimen collection, storage, and transportation of samples?',
//     standards: 'F2, U2, B2',
//     tags: [],
//     weight: 1,
//     recs: [],
//     resources: [],
//     type: 'q',
//     subType: 'y_n',
//     multipart: true,
//     multiText: 'A “Laboratory Handbook” available to clinical staff which describes specimen collection, storage, and transportation of samples, and meets all requirements.',
//     subQs: [{
//       id:'fac_q_2_sub_preface', text:'Does the handbook state:', type:'preface'
//     },{
//       id:'fac_q_2_c1', type:'q', subType:'box', tags:['f','u','b'], standards: 'F4, U4, B4',
//       text: `Informed consent should be obtained before collection of faeces, urine or blood for culture`,
//       recs: ['Include the requirement for obtaining informed consent prior to faeces, urine or blood collection']
//     },{
//       id:'fac_q_2_c2', type:'q', subType:'box', tags:['u','b'], standards: 'F5',
//       text: `Urine and blood should be collected before administration of antibiotics `,
//       recs: ['Include the requirement for collecting faeces using aseptic technique']
//     },{
//       id:'fac_q_2_c3', type:'q', subType:'box', tags:['f'], standards: 'U5, B5',
//       text: `Faeces should be collected using aseptic technique `,
//       recs: ['Include the requirement for urine or blood to be collected before administration of antibiotics']
//     },{
//       id:'fac_q_2_c4', type:'q', subType:'box', tags:['f'], standards: 'F6',
//       text: `Minimum of 1g of faeces should be collected for faeces culture`,
//       recs: ['Include the requirement for collecting a minimum of 1g of faeces']
//     },{
//       id:'fac_q_2_c5', type:'q', subType:'box', tags:['u'], standards: 'U8',
//       text: `A minimum of 3 mL urine should be collected for urine culture`,
//       recs: ['Include the requirement for a minimum of 3ml blood collection']
//     },{
//       id:'fac_q_2_c6', type:'q', subType:'box', tags:['b'], standards: 'B6',
//       text: `Handwashing should be performed prior to performing blood collection for culture`,
//       recs: ['Include the requirement for handwashing by clinician before performing blood collection']
//     },{
//       id:'fac_q_2_c7', type:'q', subType:'box', tags:['b'], standards: 'B7',
//       text: `Hands should be disinfected prior to performing a blood culture`,
//       recs: ['Include the requirement for disinfecting of hands prior to performing blood culture']
//     },{
//       id:'fac_q_2_c8', type:'q', subType:'box', tags:['b'], standards: 'B8',
//       text: `Sterile gloves should be used when performing a blood culture`,
//       recs: ['Include the requirement for using sterile gloves when performing blood culture']
//     },{
//       id:'fac_q_2_c9', type:'q', subType:'box', tags:['b'], standards: 'B9',
//       text: `Blood cultures should be drawn from peripheral sites`,
//       recs: ['Include the requirement for blood to be drawn from peripheral sites']
//     },{
//       id:'fac_q_2_c10', type:'q', subType:'box', tags:['b'], standards: 'B10',
//       text: `Serial blood cultures should be collected from separate venipuncture sites`,
//       recs: ['Include the requirement for blood collection from separate venipuncture sites']
//     },{
//       id:'fac_q_2_c11', type:'q', subType:'box', tags:['b'], standards: 'B11',
//       text: `Puncture site should be cleaned properly as per manufacturer recommended technique and using appropriate disinfectant`,
//       recs: ['Include the requirement cleaning puncture site with appropriate disinfentant']
//     },{
//       id:'fac_q_2_c12', type:'q', subType:'box', tags:['b'], standards: 'B14',
//       text: `Bottle-top should be disinfected and disinfectant should be allowed to dry prior to inoculation`,
//       recs: ['Include the requirement for bottle-top disinfectant to be dry prior to inoculation']
//     },{
//       id:'fac_q_2_c13', type:'q', subType:'box', tags:['b'], standards: 'B15',
//       text: `Needles should not be exchanged between blood culture collection and inoculation of blood culture bottles`,
//       recs: ['Include the requirement to not allow needles to be exchanged between blood collection and inoculation of blood culture bottles']
//     },{
//       id:'fac_q_2_c14', type:'q', subType:'box', tags:['b'], standards: 'B17',
//       text: `Minimum of 2 and maximum of 3 Blood cultures should be drawn within 24 hours`,
//       recs: ['Include the requirement for 2 to 3 blood cultures drawn within 24 hours']
//     },{
//       id:'fac_q_2_c15', type:'q', subType:'box', tags:['b'], standards: 'B19',
//       text: `The volume of blood collected should follow the manufacturer's recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children`,
//       recs: ['Include the requirement for following the manufacturer\'s recommendations for volume of blood collected']
//     },{
//       id:'fac_q_2_sub_preface_d', type:'preface', text:'Are collection containers correctly labelled for:'
//     },{
//       id:'fac_q_2_d1', type:'q', subType:'box', tags:['f'], standards: 'F7',
//       text: `Faeces`
//     },{
//       id:'fac_q_2_d2', type:'q', subType:'box', tags:['b'], standards: 'B20',
//       text: `Blood`
//     },{
//       id:'fac_q_2_d3', type:'q', subType:'box', tags:['u'], standards: 'U9',
//       text: `Urine`
//     },{
//       id:'fac_q_2_sub_preface_e', type:'preface', text:'Are samples delivered to the laboratory as soon as possible and within the recommended time periods for:'
//     },{
//       id:'fac_q_2_e1', type:'q', subType:'box', tags:['f'], standards: 'F11',
//       text: `Faeces`
//     },{
//       id:'fac_q_2_e2', type:'q', subType:'box', tags:['b'], standards: 'B24',
//       text: `Blood`
//     },{
//       id:'fac_q_2_e3', type:'q', subType:'box', tags:['u'], standards: 'U16',
//       text: `Urine`
//     }]
//   },{
//     id:'fac_q_3_preface', type:'preface',
//     text:'Do the facility treatment guidelines include the following requirements:',
//     children: [{
//       id: 'fac_q_3a',
//       text: 'To do faecal culture if there is dysentery, suspicion of a public health threat / outbreak or if there are associated signs of systemic infection?',
//       standards: 'F3',
//       tags: ['f'],
//       weight: 1,
//       recs: [],
//       resources: [],
//       type: 'q',
//       subType: 'y_n'
//     },{
//       id: 'fac_q_3b',
//       text: 'To do urine culture if there are clinical indications such as suspected urinary tract infection; systemic sepsis without a clear focus or asymptomatic bacteriuria in pregnancy?',
//       standards: 'U3',
//       tags: ['u'],
//       weight: 1,
//       recs: [],
//       resources: [],
//       type: 'q',
//       subType: 'y_n'
//     },{
//       id: 'fac_q_3c',
//       text: 'To do blood culture with clinical suspicion of blood stream infection?',
//       standards: 'B3',
//       tags: ['b'],
//       weight: 1,
//       recs: [],
//       resources: [],
//       type: 'q',
//       subType: 'y_n'
//     }]
//   }],
// },

// {
//   id: 'fac_sec_3',
//   text: 'Lab Request form',
//   dataSource: '[LC1.5]',
//   type: 'section',
//   children: [{
//     id:'fac_q_4_preface', type:'preface', standards: 'F8, U10, B21',
//     text:'Does the laboratory request form include:'
//   },{
//     id:'fac_q_4a', type:'q', subType:'box',
//     text: `Patient identifiers`
//   },{
//     id:'fac_q_4b', type:'q', subType:'box',
//     text: `Site name`
//   },{
//     id:'fac_q_4c', type:'q', subType:'box',
//     text: `Date of admission`
//   },{
//     id:'fac_q_4d', type:'q', subType:'box',
//     text: `Date & time of collection`
//   },{
//     id:'fac_q_4e', type:'q', subType:'box',
//     text: `Clinical information regarding suspected diagnosis`
//   },{
//     id:'fac_q_4f', type:'q', subType:'box',
//     text: `Contact details of requesting doctor`
//   }],
// }];

const fac_q_1_sub_preface = {
  id:'fac_q_1_sub_preface', text:'Does the committee:', type:'preface'
}
const fac_q_1_c1 = {
  id:'fac_q_1_c1', type:'q', subType:'box',
  text:'Develop/revise treatment guidelines',
  recs:['Establish committee and develop Terms of Reference (ToR)'],
}
const fac_q_1_c2 = {
  id:'fac_q_1_c2', type:'q', subType:'box',
  text:'Use cumulative AST data to inform guidelines',
  recs:['Within committee, develop standard process to use cumulative AST data to inform guidelines '],
}
const fac_q_1_c3 = {
  id:'fac_q_1_c3', type:'q', subType:'box',
  text:'Review antibiotic consumption data',
  recs:['Within committee, develop standard process to collect and review AMS data from ward rounds '],
}
const fac_q_1_c4 = {
  id:'fac_q_1_c4', type:'q', subType:'box',
  text:'Review data from AMS rounds',
  recs:['Within committee, develop standard process to collect and review AMS data from ward rounds '],
}
const fac_q_1 = {
  id: 'fac_q_1',
  text: 'Does the clinical facility have an oversight committee?',
  standards: 'F1, U1, B1',
  tags: [],
  weight: 1,
  recs: ['Establish committee and develop Terms of Reference (ToR)'],
  resources: [],
  type: 'q',
  subType: 'y_n',
  // expectedValue: true,
  // revealIf: true,
  multipart: true,
  multiText: 'The clinical facility has an oversight committee that revises treatment guidelines and medicines formulary and/or stewardship practices based on cumulative AST antibiograms, pharmacy antibiotic usage data and the outcomes from stewardship ward rounds.',
  subQs: [fac_q_1_sub_preface,fac_q_1_c1,fac_q_1_c2,fac_q_1_c3,fac_q_1_c4]
}
const fac_sec_1 = {
  id: 'fac_sec_1',
  text: 'Oversight Committee',
  dataSource: '[LC1.1]',
  type: 'section',
  children: [fac_q_1]
}

// -----------------------------------------------------------------------

const fac_q_2_sub_preface = {
  id:'fac_q_2_sub_preface', text:'Does the handbook state:', type:'preface'
}
const fac_q_2_c1 = {
  id:'fac_q_2_c1', type:'q', subType:'box', tags:['f','u','b'], standards: 'F4, U4, B4',
  text: `Informed consent should be obtained before collection of faeces, urine or blood for culture`,
  recs: ['Include the requirement for obtaining informed consent prior to faeces, urine or blood collection']
}
const fac_q_2_c2 = {
  id:'fac_q_2_c2', type:'q', subType:'box', tags:['u','b'], standards: 'F5',
  text: `Urine and blood should be collected before administration of antibiotics `,
  recs: ['Include the requirement for collecting faeces using aseptic technique']
}
const fac_q_2_c3 = {
  id:'fac_q_2_c3', type:'q', subType:'box', tags:['f'], standards: 'U5, B5',
  text: `Faeces should be collected using aseptic technique `,
  recs: ['Include the requirement for urine or blood to be collected before administration of antibiotics']
}
const fac_q_2_c4 = {
  id:'fac_q_2_c4', type:'q', subType:'box', tags:['f'], standards: 'F6',
  text: `Minimum of 1g of faeces should be collected for faeces culture`,
  recs: ['Include the requirement for collecting a minimum of 1g of faeces']
}
const fac_q_2_c5 = {
  id:'fac_q_2_c5', type:'q', subType:'box', tags:['u'], standards: 'U8',
  text: `A minimum of 3 mL urine should be collected for urine culture`,
  recs: ['Include the requirement for a minimum of 3ml blood collection']
}
const fac_q_2_c6 = {
  id:'fac_q_2_c6', type:'q', subType:'box', tags:['b'], standards: 'B6',
  text: `Handwashing should be performed prior to performing blood collection for culture`,
  recs: ['Include the requirement for handwashing by clinician before performing blood collection']
}
const fac_q_2_c7 = {
  id:'fac_q_2_c7', type:'q', subType:'box', tags:['b'], standards: 'B7',
  text: `Hands should be disinfected prior to performing a blood culture`,
  recs: ['Include the requirement for disinfecting of hands prior to performing blood culture']
}
const fac_q_2_c8 = {
  id:'fac_q_2_c8', type:'q', subType:'box', tags:['b'], standards: 'B8',
  text: `Sterile gloves should be used when performing a blood culture`,
  recs: ['Include the requirement for using sterile gloves when performing blood culture']
}
const fac_q_2_c9 = {
  id:'fac_q_2_c9', type:'q', subType:'box', tags:['b'], standards: 'B9',
  text: `Blood cultures should be drawn from peripheral sites`,
  recs: ['Include the requirement for blood to be drawn from peripheral sites']
}
const fac_q_2_c10 = {
  id:'fac_q_2_c10', type:'q', subType:'box', tags:['b'], standards: 'B10',
  text: `Serial blood cultures should be collected from separate venipuncture sites`,
  recs: ['Include the requirement for blood collection from separate venipuncture sites']
}
const fac_q_2_c11 = {
  id:'fac_q_2_c11', type:'q', subType:'box', tags:['b'], standards: 'B11',
  text: `Puncture site should be cleaned properly as per manufacturer recommended technique and using appropriate disinfectant`,
  recs: ['Include the requirement cleaning puncture site with appropriate disinfentant']
}
const fac_q_2_c12 = {
  id:'fac_q_2_c12', type:'q', subType:'box', tags:['b'], standards: 'B14',
  text: `Bottle-top should be disinfected and disinfectant should be allowed to dry prior to inoculation`,
  recs: ['Include the requirement for bottle-top disinfectant to be dry prior to inoculation']
}
const fac_q_2_c13 = {
  id:'fac_q_2_c13', type:'q', subType:'box', tags:['b'], standards: 'B15',
  text: `Needles should not be exchanged between blood culture collection and inoculation of blood culture bottles`,
  recs: ['Include the requirement to not allow needles to be exchanged between blood collection and inoculation of blood culture bottles']
}
const fac_q_2_c14 = {
  id:'fac_q_2_c14', type:'q', subType:'box', tags:['b'], standards: 'B17',
  text: `Minimum of 2 and maximum of 3 Blood cultures should be drawn within 24 hours`,
  recs: ['Include the requirement for 2 to 3 blood cultures drawn within 24 hours']
}
const fac_q_2_c15 = {
  id:'fac_q_2_c15', type:'q', subType:'box', tags:['b'], standards: 'B19',
  text: `The volume of blood collected should follow the manufacturer's recommendations: typically 10mL per bottle for adults, 1-3 mL per bottle for children`,
  recs: ['Include the requirement for following the manufacturer\'s recommendations for volume of blood collected']
}
const fac_q_2 = {
  id: 'fac_q_2',
  text: 'Does the clinical facility have a “Laboratory Handbook” which describes specimen collection, storage, and transportation of samples?',
  standards: 'F2, U2, B2',
  tags: [],
  weight: 1,
  recs: ['Make Laboratory Handbook available in the facility, inclusive of guidance on all AMR standards'],
  resources: [
    {
      title: 'NHLS Laboratory Handbook',
      link: 'https://drive.google.com/file/d/1E8WrlSW0smDgWjvhcVLSEsib17KyrBkk/view?usp=sharing'
    }
  ],
  type: 'q',
  subType: 'y_n',
  multipart: true,
  multiText: 'A “Laboratory Handbook” is available to clinical staff which describes specimen collection, storage, and transportation of samples, and meets all requirements.',
  subQs: [fac_q_2_sub_preface,fac_q_2_c1,fac_q_2_c2,fac_q_2_c3,fac_q_2_c4,fac_q_2_c5,fac_q_2_c6,fac_q_2_c7,fac_q_2_c8,fac_q_2_c9,fac_q_2_c10,fac_q_2_c11,fac_q_2_c12,fac_q_2_c13,fac_q_2_c14,fac_q_2_c15]
}
// collection containers / sample deliveries?
const fac_sec_2 = {
  id: 'fac_sec_2',
  text: 'Lab Handbook',
  dataSource: '[LC1.2]',
  type: 'section',
  children: [fac_q_2]
}

// -----------------------------------------------------------------------

const fac_q_3a = {
  id: 'fac_q_3a',
  text: 'To do faecal culture if there is dysentery, suspicion of a public health threat / outbreak or if there are associated signs of systemic infection?',
  recs: ['Add to guidelines to do faecal culture if there is dysentery, suspicion of a public health threat / outbreak or if there are associated signs of systemic infection'],
  standards: 'F3',
  tags: ['f'],
  weight: 1,
  resources: [],
  type: 'q',
  subType: 'y_n'
}
const fac_q_3b = {
  id: 'fac_q_3b',
  text: 'To do urine culture if there are clinical indications such as suspected urinary tract infection; systemic sepsis without a clear focus or asymptomatic bacteriuria in pregnancy?',
  recs: ['Add to guidelines to do urine culture if there are clinical indications such as suspected urinary tract infection; systemic sepsis without a clear focus or asymptomatic bacteriuria in pregnancy'],
  standards: 'U3',
  tags: ['u'],
  weight: 1,
  resources: [],
  type: 'q',
  subType: 'y_n'
}
const fac_q_3c = {
  id: 'fac_q_3c',
  text: 'To do blood culture with clinical suspicion of blood stream infection?',
  recs: ['Add to guidelines to do blood culture with clinical suspicion of blood stream infection'],
  standards: 'B3',
  tags: ['b'],
  weight: 1,
  resources: [],
  type: 'q',
  subType: 'y_n'
}
const fac_q_3_preface = {
  id:'fac_q_3_preface', type:'preface',
  standards: 'F3, U3, B3',
  text:'Do the facility treatment guidelines include the following requirements:',
  multipart: true,
  multiText: 'The facility treatment guidelines include the correct requirements',
  children: [fac_q_3a,fac_q_3b,fac_q_3c]
}
const fac_sec_2b = {
  id: 'fac_sec_2b',
  text: 'Treatment Guidelines',
  dataSource: '[LC1.3 - 1.5]',
  type: 'section',
  children: [fac_q_3_preface]
}

// -----------------------------------------------------------------------


const fac_q_4a = {
  id:'fac_q_4a', type:'q', subType:'box',
  text: `Patient identifiers`,
  recs: [`Add patient identifiers`]
}
const fac_q_4b = {
  id:'fac_q_4b', type:'q', subType:'box',
  text: `Site name`,
  recs: [`Add site name`]
}
const fac_q_4c = {
  id:'fac_q_4c', type:'q', subType:'box',
  text: `Date of admission`,
  recs: [`Add date of admission`]
}
const fac_q_4d = {
  id:'fac_q_4d', type:'q', subType:'box',
  text: `Date & time of collection`,
  recs: [`Add date & time of collection`]
}
const fac_q_4e = {
  id:'fac_q_4e', type:'q', subType:'box',
  text: `Clinical information regarding suspected diagnosis`,
  recs: [`Add clinical information regarding suspected diagnosis`]
}
const fac_q_4f = {
  id:'fac_q_4f', type:'q', subType:'box',
  text: `Contact details of requesting doctor`,
  recs: [`Add contact details of requesting doctor`]
}
const fac_q_4_preface = {
  id:'fac_q_4_preface', type:'preface', standards: 'F8, U10, B21',
  text:'Does the laboratory request form include:',
  resources: [
    {
      title: 'SLMTA Toolkit (English). 7 - Specimen collection and processing',
      link: 'https://slmta.org/tool-kit/'
    }
  ],
  multipart: true,
  multiText: 'The laboratory request form includes the correct fields.',
  children: [fac_q_4a,fac_q_4b,fac_q_4c,fac_q_4d,fac_q_4e,fac_q_4f]
}
const fac_sec_3 = {
  id: 'fac_sec_3',
  text: 'Lab Request Form',
  dataSource: '[LC1.5]',
  type: 'section',
  children: [fac_q_4_preface]
}

const questions = [
  fac_sec_1,
  fac_sec_2,
  fac_sec_2b,
  fac_sec_3,
]


const results = [

]

export { title, instructions, questions }
