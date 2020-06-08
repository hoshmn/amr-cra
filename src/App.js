import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import Facility
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilityQuestions from './FacilityQuestions';

function App() {
  return (
    <div className="App">

      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <FacilityQuestions />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <div>hihi profile</div>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          <div>hihi contact</div>
        </Tab>
      </Tabs>

    </div>
  );
}

export default App;
