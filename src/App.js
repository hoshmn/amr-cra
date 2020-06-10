import React from 'react';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssessmentSection from './AssessmentSection';
import Results from './Results';

// TODO:
// - genericize AssessmentSection into AssessmentSection 
// - (take instructions, title, questions obj as props)
// - update sendMap to reflect
// - create Submit tab that becomes Results, disables other tabs, processes this.maps into priorities/recs/resources

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      // facilityMap: null
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
    console.log(missedFQs);
  }

  getSubmitTab() {
    if (this.state.submitted) {
      return <Results missedFQs={this.state.missedFQs} />;
    }

    return (
      <div>
        you sure tho?
        <Button
          onClick={this.submit} 
          variant='outline-primary'
        >
          Submit
        </Button>
      </div>
    )
  }

  render() {
  
    return (
      <div className='App'>
        <h2>AMR Continuous Quality Improvement Assessment</h2>
        <Tabs defaultActiveKey='facility'>
          <Tab eventKey='facility' title='Facility'>
            <AssessmentSection
              sendMap={this.sendMap}
              section='facility'
            />
          </Tab>
          <Tab eventKey='lab' title='Lab' disabled={this.state.submitted}>
            <div>Lab content</div>
          </Tab>
          <Tab eventKey='submit' title='Submit'>
            {this.getSubmitTab()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
