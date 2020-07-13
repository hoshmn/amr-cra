import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import sectionsMap from './sections';

// const expectedOutput = {
//   // id: 'val'
// };

const qs = [];

const radioNoTag = '_no';

class AssessmentSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contents: null };

    this.toggleSubQs = this.toggleSubQs.bind(this);
  }

  componentDidMount() {
    const { questions } = sectionsMap[this.props.section];
    const contents = questions.map(el => this.processElement(el));
    this.setState({ contents });
    this.props.sendMap(this.props.section, qs);
  }

  getInstructions() {
    const { title, instructions } = sectionsMap[this.props.section];
    return (
      <div className='instructions'>
        <h3>{title}</h3>
        {instructions.map((sect, i) =><span key={i}>{sect}</span>)}
      </div>
    )
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
        qs.push(el);
        // expectedOutput[id] = expectedValue;
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
    const { children, id, text } = el;
    
    return (
      <Card key={id}>
        <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey={id}>
              {text}  
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={id}>
          <Card.Body>
            {children.map(childEl => this.processElement(childEl))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  getPreface({ id, text, standards, children }) {
    return (
      <div key={id}>
        <Form.Label>
          <span className='question-text'>{text}</span>
          {!!standards && <span className='standard-tag'> ({standards})</span>}
        </Form.Label>
        {!!children && !!children.length &&
          <div className='child-questions'>
            {children.map(childEl => this.processElement(childEl))}
          </div>
        }
      </div>
    )
  }

  getQuestionBox({ id, text, tags, standards }) {
    const label = (
      <>
        {!!tags && !!tags.length &&
          <span className='specimen-tags'>
            {tags.map(t => <i key={t} className={t} />)}
          </span>
        }
        <span className='response-text'>{text}</span>
        {!!standards && <span className='standard-tag'> ({standards})</span>}
      </>
    )
    return (
      <Form.Check type='checkbox' 
        id={id}
        key={id}
        label={label}
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

  getQuestionYN({ id, text, standards, subQs, tags }) {

    const onChange = subQs ? this.toggleSubQs : null;
    return (
      <div key={id} id={id + '_parent'} className='parent-questions'>
        <Form.Group>
          <Form.Label>
            {!!tags && !!tags.length &&
              <span className='specimen-tags'>
                {tags.map(t => <i key={t} className={t} />)}
              </span>
            }
            <span className='question-text'>{text}</span>
            {!!standards && <span className='standard-tag'> ({standards})</span>}
          </Form.Label>

          <div className='response-text'>
              <Form.Check onChange={onChange} name={id} inline type='radio' id={id} label='yes' />
              <Form.Check onChange={onChange} name={id} inline type='radio' id={id+radioNoTag} label='no' />
          </div>
        </Form.Group>

        {!!subQs && 
          <div className='sub-questions child-questions'>
            {subQs.map(childEl => this.processElement(childEl))}
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <Accordion id={`${this.props.section}-section`} defaultActiveKey='1' >
        {this.getInstructions()}
        {this.state.contents}
      </Accordion>
    );
  }
}

export default AssessmentSection;
