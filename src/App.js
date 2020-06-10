import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssessmentSection from './AssessmentSection';

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
    };

    this.sendMap = this.sendMap.bind(this);
  }

  sendMap(section, qMap) {
    this[section] = qMap;
  }

  render() {
  
    return (
      <div className="App">
        <h2>AMR Continuous Quality Improvement Assessment</h2>
        <Tabs defaultActiveKey="facility">
          <Tab eventKey="facility" title="Facility">
            <AssessmentSection
              sendMap={this.sendMap}
              section='facility'
            />
          </Tab>
          <Tab eventKey="lab" title="Lab">
            <div>Lab content</div>
          </Tab>
          <Tab eventKey="submit" title="Submit" disabled>
            <div>hihi submit</div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
