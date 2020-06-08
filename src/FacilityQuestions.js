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

class FacilityQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contents: null };
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

  getQuestionYN({ id, text, standards, subQs }) {
    return (
      <div key={id}>
        <Form.Group>
          <Form.Label>
            {text}
            <span className='standard-tag'>{standards}</span>
          </Form.Label>

          <div className='responses'>
              <Form.Check name={id} inline type='radio' id={id} label='yes' />
              <Form.Check name={id} inline type='radio' id={id} label='no' />
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
        hi
        {this.state.contents}
      </Accordion>
    );
  }
}

export default FacilityQuestions;
