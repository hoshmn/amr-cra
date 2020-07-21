import React from 'react';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssessmentSection from './AssessmentSection';
import Results from './Results';
import ResultsTable from './ResultsTable';
import sectionsMap from './sections';
import { getTargetId, getTableCellId } from './helperFunctions';

import _ from 'lodash'

const DEV = false;

// TODO:
// - feed in correct text for results missed standards, prioritize

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      warnings: [],
      submitted: {},
      // missedFQs: null,
      inputsResults: null,
    };

    this.sendMap = this.sendMap.bind(this);
    this.submit = this.submit.bind(this);
  }

  sendMap(section, sectionObj) {
    this[section] = sectionObj;
  }

  processMultipartQs(qs) {
    if (!qs) return;
    qs.forEach(q => {
      if (q.type === 'q') {
        const correctAnswerGiven = !!document.querySelector(`#${q.id}:checked`);
        q.answeredCorrectly = correctAnswerGiven;
      }

      this.processMultipartQs(q.subQs);
      this.processMultipartQs(q.children);
    })
  }

  submit(section) {
    // TODO "flat map" this."section" object may no longer be useful
    if (section === 'facility') {

      this.processMultipartQs(sectionsMap['facility'].questions);

      const { submitted } = this.state;
      this.setState({ 
        submitted: {...submitted, [section]: true },
        warnings: []
      });

    } else if (section === 'inputs') {

      // process inputs sections
      const inputSectionObj = this['inputs'];
      const { results: inputResultSections } = sectionsMap['inputs'];

      inputSectionObj.questions.forEach(q => {
        // add responses
        q.responses = {};
        // let TOTAL = 0;
        inputSectionObj.departments.forEach(d => {
          const uid = getTableCellId(d, q);
          if (q.subType === 'y_n') {
            const correctAnswerGiven = !!document.querySelector(`#${uid}:checked`);
            q.responses[d.id] = correctAnswerGiven;
            // TOTAL += correctAnswerGiven;
          } else if (q.subType === '%') {
            const el = document.querySelector(`#${uid}`);
            let val = el.value ? Number(el.value) : null;
            q.responses[d.id] = val;
            // TOTAL += val||0;
          }
        });
        // q.responses.TOTAL = TOTAL;
      })

      inputResultSections.forEach(rSect => {
        rSect.results.forEach(r => {
          const { target, question, numerator, denominator } = r;
          if (!target) {
            console.error('Cannot calculate result without target: ', r);
          }
          // _.get
          r.targetValue = inputSectionObj.targetData[target.sectionId][target.id];
          // r.responseData = {};

          if (question) {

            r.responseData = r.question.responses;
            let answered = 0;
            let yeses = 0;
            _.each(r.responseData, resp => {
              if (!_.isNil(resp)) {
                answered++;
              }
              if (!!resp) {
                yeses++;
              }
            });

            r.actualPerc = !answered ? '?' : (yeses/answered) * 100;

          } else if (numerator && denominator) { // it's a % type result

            r.responseData = {};
            let totalNum = 0;
            let totalDenom = 0;
            _.each(r.numerator.responses, (numV, dept) => {
              let perc = null;
              const denomV = _.get(r, ['denominator', 'responses', dept]);
              if (_.isNil(numV) || _.isNil(denomV)) {
                console.warn('Empty num or denom val');
                // _.set(r.responseData, dept, '?');
                // leave null
              } else {
                totalNum += numV;
                totalDenom += denomV;
                perc = (numV / denomV) * 100;
              }

              _.set(r.responseData, dept, perc);
            });

            r.actualPerc = !totalDenom ? null : (totalNum / totalDenom) * 100

          } else {
            console.error('Cannot calculate result without a linked question or num/denom: ', r);
          }
        })
      });


      const { submitted } = this.state;
      this.setState({ 
        submitted: {...submitted, [section]: true },
        inputsResults: inputResultSections,
        warnings: []
      });
      
    }


  }

  getFacilityTab() {
    if (this.state.submitted['facility']) {
      return <Results section='facility' />;
    }
    return (
      <AssessmentSection
        submit={this.submit}
        sendMap={this.sendMap}
        section='facility'
      />
    )
  }


  getInputsTab() {
    if (this.state.submitted['inputs']) {
      return (
        <ResultsTable 
          resultSections={this.state.inputsResults}
          section='inputs'
        />);
    }
    return (
      <AssessmentSection
        submit={this.submit}
        sendMap={this.sendMap}
        section='inputs'
      />
    )
  }

  getSubmitTab() {
    const submittedMessage = !this.state.submitted ? null :
      <div>Assessment sumbitted. See section tabs for results.</div>;
    return (
      <div>
        <div className='warnings text-danger'>{this.state.warnings.join('\n')}</div>
        {submittedMessage}

        <Button
          disabled={this.state.submitted}
          onClick={this.submit} 
          variant='outline-primary' size='lg'
        >
          {this.state.submitted ? 'Submitted' : 'Submit Assessment'}
        </Button>
      </div>
    )
  }

  render() {
    const { facility, inputs } = this.state.submitted;
    let facilityTitle = 'Clinical Facility Level';
    let inputsTitle = 'Clinical Facility - by department';
    if (facility) {
      facilityTitle += ' [RESULTS]';
    } else if (inputs) {
      inputsTitle += ' [RESULTS]';
    }

    const defaultActiveKey = DEV ? 'inputs' : 'instructions';

    return (
      <div className='App'>
        <h2>AMR Continuous Quality Improvement Assessment</h2>
        <Tabs defaultActiveKey={defaultActiveKey}>
          <Tab eventKey='instructions' title='Instructions'>
            do some ish
            Tab and Space for speedier nav
            () hover for standard
            tags
          </Tab>
          <Tab eventKey='facility' title={facilityTitle}>
            {this.getFacilityTab()}
          </Tab>
          <Tab eventKey='inputs' title={inputsTitle}>
            {this.getInputsTab()}
          </Tab>
          <Tab eventKey='dashboard' title='Dashboard' disabled={!facility || !inputs}>
            {this.getSubmitTab()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
