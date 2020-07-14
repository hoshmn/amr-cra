import React from 'react';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssessmentSection from './NewAssessmentSection';
import Results from './Results';
import { getTargetId, getTableCellId } from './helperFunctions';

const DEV = true;

// TODO:
// - feed in correct text for results missed standards, prioritize

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      submitted: false,
      missedFQs: null,
    };

    this.sendMap = this.sendMap.bind(this);
    this.submit = this.submit.bind(this);
  }

  sendMap(section, qs, departments) {
    qs.departments = departments
    this[section] = qs;
  }

  submit() {
    const missedFQs = this['facility'].filter(q => {
      const correctAnswerGiven = document.querySelector(`#${q.id}:checked`);
      return !correctAnswerGiven;
    });

    // process inputs sections
    const iqs = this['inputs'];
    iqs.forEach(q => {
      // add answers
      q.answers = {};
      let TOTAL = 0;
      iqs.departments.forEach(d => {
        const uid = getTableCellId(d, q);
        if (q.subType === 'y_n') {
          const correctAnswerGiven = !!document.querySelector(`#${uid}:checked`);
          q.answers[d.id] = correctAnswerGiven;
          TOTAL += correctAnswerGiven;
        } else if (q.subType === '%') {
          const el = document.querySelector(`#${uid}`);
          let val = el ? Number(el.value) : null;
          console.log(el)
          console.log(val)
          q.answers[d.id] = val;
          TOTAL += val||0;
        }
      });
      q.answers.TOTAL = TOTAL;
    })
    console.log(iqs);
    debugger;

    this.setState({ submitted: true, missedFQs });;
  }

  getSubmitTab() {
    if (this.state.submitted) {
      return <Results missedFQs={this.state.missedFQs} />;
    }

    return (
      <div>
        <Button
          onClick={this.submit} 
          variant='outline-primary' size='lg'
        >
          Submit Assessment
        </Button>
      </div>
    )
  }

  render() {
    const submitTitle = this.state.submitted ? 'Results': 'Submit';
    return (
      <div className='App'>
        <h2>AMR Continuous Quality Improvement Assessment</h2>
        <Tabs defaultActiveKey='inputs'>
          <Tab eventKey='facility' title='Clinical Facility Level' disabled={!DEV && this.state.submitted}>
            <AssessmentSection
              sendMap={this.sendMap}
              section='facility'
            />
          </Tab>
          <Tab eventKey='inputs' title='Clinical Facility Data Inputs' disabled={!DEV && this.state.submitted}>
            <AssessmentSection
              sendMap={this.sendMap}
              section='inputs'
            />
          </Tab>
          <Tab eventKey='submit' title={submitTitle}>
            {this.getSubmitTab()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
