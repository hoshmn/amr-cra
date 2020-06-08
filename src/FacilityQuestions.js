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
      case 'sectionHeader':
        return this.getSectionHeader(el);
    
      case 'preface':
        return this.getPreface(el);
    
      case 'q':
        const { id, expectedValue = true } = el;
        qMap[id] = el;
        expectedOutput[id] = expectedValue;
        if (el.subType === 'box') {
          return this.getQuestionBox(el);
        } else if (el.subType === 'y_n') {
          return this.getQuestionYN(el);
        }
    
      // case 'sectionHeader':
      //   return this.getSectionHeader(el);
    
      // case 'sectionHeader':
      //   return this.getSectionHeader(el);
    
      // case 'sectionHeader':
      //   return this.getSectionHeader(el);
    
      default:
        break;
    }
  }

  getSectionHeader(el) {
    const { id, sectionNum, defaultOpen = false } = el;
    
    let classes = 'collapse';
    if (defaultOpen) {
      classes += ' show';
    }
    
    return (
      <Card key={id}>
        <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey={sectionNum}>
              {el.text}  
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={sectionNum}>
          <Card.Body>
            <div>content</div>
            {el.children.map(childEl => this.processElement(childEl))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  getPreface(el) {
    return (
      <Form.Label key={el.id}>{el.text}</Form.Label>
    )
  }

  getQuestionBox(el) {
    return (
      <Form.Check type='checkbox' 
        id={el.id}
        key={el.id}
        label={el.text}
      />
    )
  }

  getQuestionYN(el) {
    return (
      <>
        <Form.Group key={el.id}>
          <Form.Label>
            {el.text}
            <span className='standard-tag'>{el.standards}</span>
          </Form.Label>

          <div className='responses'>
              <Form.Check name={el.id} inline type='radio' id={el.id} label='yes' />
              <Form.Check name={el.id} inline type='radio' id={el.id} label='no' />
          </div>
        </Form.Group>

        {el.subQs && 
          <div className='sub-questions'>
            {el.subQs.map(childEl => this.processElement(childEl))}
          </div>
        }
      </>
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
