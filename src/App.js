import React from 'react';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import findLogo from './find-logo.jpg';
import cdcLogo from './africa-cdc-logo.png';
import bdLogo from './bd-logo.png';
import dashboard from './dashboard.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssessmentSection from './AssessmentSection';
import Results from './Results';
import ResultsTable from './ResultsTable';
import sectionsMap from './sections';
import { getTargetId, getTableCellId } from './helperFunctions';
import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'instructions',
      warnings: [],
      submitted: {},
      inputsResults: null,
    };

    this.setActiveTab = this.setActiveTab.bind(this);
    this.sendMap = this.sendMap.bind(this);
    this.submit = this.submit.bind(this);
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
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
    // TODO 'flat map' this.'section' object may no longer be useful
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

        inputSectionObj.departments.forEach(d => {
          const uid = getTableCellId(d, q);
          if (q.subType === 'y_n') {
            const correctAnswerGiven = !!document.querySelector(`#${uid}:checked`);
            q.responses[d.id] = correctAnswerGiven;

          } else if (q.subType === '%') {
            const el = document.querySelector(`#${uid}`);
            let val = el.value ? Number(el.value) : null;
            q.responses[d.id] = val;
          }
        });

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

  getLandingTab() {
    return (
      <div className='landing-page mb-4'>

        <div className='instructions my-3'>
          <div className='my-3'>
            <strong>This Antimicrobial Resistance (AMR) Continuous Quality Improvement (CQI) Assessment Tool</strong> provides users a framework to assess clinical facilities and laboratories in order to identify gaps within the Patient Diagnostic Pathway. This tool uses the AMR standards as measurants and provides a prioritized set of recommended actions to address the identified gaps.
          </div>

          <div className='my-3'>
            <strong>There are three types of sections that are assessed in this tool:</strong>
            <ul>
              <li>Clinical Facility Level - applies to the whole clinical facility</li>
              <li>Clinical Facility, by Department - applies to the individual Department inputs at the Clinical Facility. A minimum of one department’s data is required, with a maximum of 8.</li>
              <li>Laboratory - applies to the relevant laboratory used for AMR diagnostic services by the Clinical Facility </li>
            </ul>
          </div>

          <div className='my-3'>
            <strong>This tool is organized into the following components and is based on the Patient Diagnostic Pathway.</strong>
            <ul>
              <li>Clinical Facility Level - includes indicators that apply to the whole clinical facility </li>
              <li>A. Appropriate Diagnostic Test Order (Clinical Facility, by Department) </li>
              <li>B1. Sample Collection - Faeces (Clinical Facility, by Department)</li>
              <li>B2. Sample Collection - Urine (Clinical Facility, by Department)</li>
              <li>B3. Sample Collection - Blood (Clinical Facility, by Department)</li>
              <li>C. Sample Sent to Lab (Clinical Facility, by Department)</li>
              <li>D. Sample Received at Lab (Laboratory)</li>
              <li>E. Sample Received at Lab (Laboratory)</li>
              <li>F. Test Result Reported (Laboratory)</li>
              <li>G. Use Test Result (Clinical Facility, by Department)</li>
            </ul>
          </div>

          <div className='my-3'>
            Using the list of prioritized gaps and recommended actions, the clinical facility and laboratory can devise and implement a plan. Suggested resources are included to support this.
          </div>

          <em className='note my-3'>
            Note: This is an online prototype and includes only sections Clinical Facility, A. Appropriate Diagnosis and B1-B3. Sample Collection (Faeces, Urine, Blood).
          </em>

          <div className='text-center my-5'>
            <Button onClick={() => this.setActiveTab('facility')}>
              Proceed to Assessment
            </Button>
          </div>

        </div>
      </div>
    )
  }

  getFacilityTab() {
    if (this.state.submitted['facility']) {
      return <Results section='facility' proceed={()=>this.setActiveTab('inputs')} />;
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
          proceed={()=>this.setActiveTab('dashboard')}
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

  getDashboardTab() {
    return (
      <div className='dashboard'>
        <h3 className='my-3 mx-5'>Summary of Recommended Actions by Priority Level</h3>
        <div className='my-3 mx-5'>Please select Clinical Facility or Laboratory. The recommended actions are sorted by priority level and assigned a performance rating, based on the assessment results.</div>
        <div className='note my-3 mx-5'><em>
          Note: This is indicative of the summary output dashboard, but is non-functioning in this online prototype.
        </em></div>
        <div className='text-center my-5'>
          <img src={dashboard} />
        </div>
      </div>
    )
  }

  render() {
    const { facility, inputs } = this.state.submitted;
    let facilityTitle = 'Clinical Facility Level';
    let inputsTitle = 'Clinical Facility, by Department';
    if (facility) {
      facilityTitle += ' [RESULTS]';
    }
    if (inputs) {
      inputsTitle += ' [RESULTS]';
    }

    return (
      <div className='App'>
        <div className='site-title text-center my-4'>

        <div className='logos'>
          <img className='logo find' src={findLogo} />
          <img className='logo cdc' src={cdcLogo} />
          <img className='logo bd' src={bdLogo} />
        </div>
        <h3>AMR Continuous Quality Improvement (CQI)</h3>
        <h4>For Clinical Facilities & Laboratories</h4>
        </div>
        <Tabs id='controlled-tab-example'
          activeKey={this.state.activeTab}
          onSelect={this.setActiveTab}
        >
          <Tab eventKey='instructions' title='Instructions'>
            {this.getLandingTab()}
          </Tab>
          <Tab eventKey='facility' title={facilityTitle}>
            {this.getFacilityTab()}
          </Tab>
          <Tab eventKey='inputs' title={inputsTitle}>
            {this.getInputsTab()}
          </Tab>
          <Tab eventKey='dashboard' title='Dashboard' >
            {this.getDashboardTab()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
