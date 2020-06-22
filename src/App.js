import React from 'react';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssessmentSection from './AssessmentSection';
import Results from './Results';

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

  sendMap(section, qs) {
    this[section] = qs;
  }

  submit() {
    const missedFQs = this.facility.filter(q => {
      const el = document.querySelector(`#${q.id}:checked`);
      return !el;
    });
    this.setState({ submitted: true, missedFQs });
    // console.log(missedFQs);
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
        <Tabs defaultActiveKey='facility'>
          <Tab eventKey='facility' title='Facility' disabled={this.state.submitted}>
            <AssessmentSection
              sendMap={this.sendMap}
              section='facility'
            />
          </Tab>
          <Tab eventKey='lab' title='Lab' disabled={this.state.submitted}>
            <div>Lab Content</div>
            <em>[each assessment section gets a tab like this]</em>
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
