import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
      <label className='form-check-label question-text' key={el.id}>{el.text}</label>
    )
  }

  getQuestionBox(el) {
    return (
      <div key={el.id}>
         <input className='form-check-input' type='checkbox' 
          name='oversight-committee-c'
          id={el.id}
          value={el.id}
        />
        <label className='form-check-label' htmlFor={el.id}>
          {el.text}
        </label>
      </div>
    )
  }

  getQuestionYN(el) {
    return (
      <div key={el.id}>
        <label className='form-check-label question-text'>
          {el.text}
          <span className='standard-tag'>{el.standards}</span>
        </label>

        <div className='responses'>

          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' 
              name={el.id}
              id={el.id + '_yes'}
              value={el.id + '_yes'}
            />
            <label className='form-check-label' htmlFor={el.id + '_yes'}>Yes</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' 
              name={el.id}
              id={el.id + '_no'}
              value={el.id + '_no'}
            />
            <label className='form-check-label' htmlFor={el.id + '_no'}>No</label>
          </div>


          {el.subQs && 
            <div className='sub-questions'>
              {el.subQs.map(childEl => this.processElement(childEl))}
            </div>
          }


        </div>
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
