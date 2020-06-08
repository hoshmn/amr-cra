import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import questions from './questions/facility';

const expectedOutput = {
  // id: 'val'
};

const qMap = {};

const radioNoTag = '_no';

class FacilityQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contents: null };

    this.toggleSubQs = this.toggleSubQs.bind(this);
  }

  componentDidMount() {
    const contents = questions.map(el => this.processElement(el));
    this.setState({ contents });
  }

  processElement(el) {
    const { type } = el;

    switch (type) {
      case 'section':
        return this.getSection(el);
    
      case 'preface':
        return this.getPreface(el);
    
      case 'q':
        const { id, subType, expectedValue = true } = el;
        qMap[id] = el;
        expectedOutput[id] = expectedValue;
        if (subType === 'box') {
          return this.getQuestionBox(el);
        } else if (subType === 'y_n') {
          return this.getQuestionYN(el);
        }
    
      // case 'section':
      //   return this.getSection(el);
    
      // case 'section':
      //   return this.getSection(el);
    
      // case 'section':
      //   return this.getSection(el);
    
      default:
        break;
    }
  }

  getSection(el) {
    const { children, id, sectionNum, text, defaultOpen = false } = el;
    
    let classes = 'collapse';
    if (defaultOpen) {
      classes += ' show';
    }
    
    return (
      <Card key={id}>
        <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey={sectionNum}>
              {text}  
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={sectionNum}>
          <Card.Body>
            <div>content</div>
            {children.map(childEl => this.processElement(childEl))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  getPreface({ id, text}) {
    return (
      <Form.Label key={id}>{text}</Form.Label>
    )
  }

  getQuestionBox({ id, text }) {
    return (
      <Form.Check type='checkbox' 
        id={id}
        key={id}
        label={text}
        // name={id}
      />
    )
  }

  toggleSubQs(e) {
    // ASSUMES SHOW IF ANSWER IS YES
    let { id } = e.target;
    let show = true;
    if (id.endsWith(radioNoTag)) {
      id = id.slice(0, id.length - radioNoTag.length);
      show = false;
    }
    // this.setState({ [id]: show });

    // TODO: use refs?
    const parent = document.querySelector(`#${id}_parent`);
    parent.classList.toggle('show-sub-questions', show);
  }

  getQuestionYN({ id, text, standards, subQs }) {
    let showSubQs = false;

    // const cang = e => {
    //   console.log(e.target.id);
    //   showSubQs = !showSubQs;
    // }

    const onChange = subQs ? this.toggleSubQs : null;
    return (
      <div key={id} id={id + '_parent'} class='parent-questions'>
        <Form.Group>
          <Form.Label>
            {text}
            <span className='standard-tag'>{standards}</span>
          </Form.Label>

          <div className='responses'>
              <Form.Check onChange={onChange} name={id} inline type='radio' id={id} label='yes' />
              <Form.Check onChange={onChange} name={id} inline type='radio' id={id+radioNoTag} label='no' />
          </div>
        </Form.Group>

        {subQs && 
          <div className='sub-questions'>
            {subQs.map(childEl => this.processElement(childEl))}
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <Accordion id='facility-questions' defaultActiveKey='1' >
        <div class="instructions">
          <h3>Facility-Level Assessment</h3>
          <span>Please complete the following, from the "Technical Scorecard: Laboratory Clinical Interface AMR Scorecard", Section 1 in C. Clinical Site Assessment.</span>
          <span>The corresponding data sources are indicated in the section headers for reference. The relevant standards are indicated after each question in parentheses.</span>
        </div>
        {this.state.contents}
      </Accordion>
    );
  }
}

export default FacilityQuestions;
