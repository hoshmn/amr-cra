import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilityQuestions from './FacilityQuestions';

function App() {
  return (
    <div className="App">
      <h2>AMR Continuous Quality Improvement Assessment</h2>
      <Tabs defaultActiveKey="facility">
        <Tab eventKey="facility" title="Facility">
          <FacilityQuestions />
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

export default App;
