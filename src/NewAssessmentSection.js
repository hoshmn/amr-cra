import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import sectionsMap from './sections';

import { Multiselect } from 'multiselect-react-dropdown';
import _ from 'lodash'

// const expectedOutput = {
//   // id: 'val'
// };

const qs = [];

const radioNoTag = '_no';

const getTargetId = (target, targetSection) => 
  `target-${targetSection.sectionId}--${target.id}`;

class AssessmentSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contents: null, selectedDepts: [], begun: false, warnings: [] };

    this.toggleSubQs = this.toggleSubQs.bind(this);
    this.selectDept = this.selectDept.bind(this);
    this.removeDept = this.removeDept.bind(this);
    this.begin = this.begin.bind(this);
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
        {instructions.map((sect, i) =><span className='instruction' key={i}>{sect}</span>)}
        {!this.state.begun && this.getDeptSelection()}
        {!this.state.begun && this.getTargetSetting()}
        {!this.state.begun && this.getStartButton()}
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

  selectDept(selectedDepts, item) {
    this.setState({ selectedDepts });
  }
  
  removeDept(selectedDepts, item) {
    // const depts = [...this.state.selectedDepts];
    
    this.setState({ selectedDepts });
  }

  begin() {
    const { targets } = sectionsMap[this.props.section];

    const fourDepts = this.state.selectedDepts.length === 4;
    const targetsComplete = targets.every(tSection => 
      tSection.sectionTargets.every(t => {
        const id = getTargetId(t, tSection);
        const target = document.querySelector(`#${id}`);
        if (!target.value) {
          return false;
        }
        const val = Number(target.value);
        console.log(val)
        return !isNaN(val) && val >= 0 && val <= 100;
      })
    )
    console.log(fourDepts)
    console.log(targetsComplete)
    if (fourDepts && targetsComplete) {
      this.setState({ begun: true, warnings: [] });
    }

    const warnings = [];
    if (!fourDepts) {
      warnings.push('select four departments to assess')
    }
    if (!targetsComplete) {
      warnings.push('ensure that all target percentages are set as integers less than or equal to 100')
    }

    this.setState({ warnings });
  }

  getStartButton() {
    const { departments, targets } = sectionsMap[this.props.section];
    if (!departments && !targets) {
      return;
    }

    let warningText = null;
    console.log(this.state.warnings)
    if (this.state.warnings.length) {
      warningText = `Please ${this.state.warnings.join(' and ')}.`;
    }
    return (
      <> 
        <div className='warnings text-danger'>{warningText}</div>
        <Button
          onClick={this.begin} 
        >
          Begin Assessment
        </Button>
      </>
    )
  }

  getDeptSelection() {
    const { departments } = sectionsMap[this.props.section];
    if (!departments) {
      return;
    }

    return (
      <div className='mt-3'>
        <h4>Select 4 departments to assess</h4>
        <Multiselect
          options={departments} // Options to display in the dropdown
          placeholder='Select Department'
          avoidHighlightFirstOption={true}
          selectionLimit={4}
          showCheckbox={true}
          closeOnSelect={false}
          closeIcon='cancel'
          //selectedValues={1} // Preselected value to persist in dropdown
          onSelect={this.selectDept} // Function will trigger on select event
          onRemove={this.removeDept} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
    )
  }

  getTargetSetting() {
    const { targets } = sectionsMap[this.props.section];
    if (!targets) {
      return;
    }

    return (
      <div className='mt-3'>
        <h4>Set targets for the assessment</h4>
          {targets.map(tSection => (
            <div className='target-section' key={tSection.sectionName}>
              <h5>{tSection.sectionName}</h5>
              {tSection.sectionTargets.map((t, idx) => (
                <div className='target' key={getTargetId(t, tSection)}>
                  <input id={getTargetId(t, tSection)} type='number' min={0} max={100} defaultValue={100} />
                  <span>{t.text}</span>
                </div>
              ))}
              <br/>
            </div>
          ))}
      </div>
      // <Card key='targets'>
      //   <Card.Header>
      //       <Accordion.Toggle as={Button} variant='link' eventKey='targets'>
      //         Set Assessment Targets  
      //       </Accordion.Toggle>
      //   </Card.Header>
      //   <Accordion.Collapse eventKey='targets'>
      //     <Card.Body>

      //     </Card.Body>
      //   </Accordion.Collapse>
      // </Card>
    )
  }

  render() {
    return (
      <Accordion id={`${this.props.section}-section`}>
        {this.getInstructions()}
        {this.state.begun && this.state.contents}
      </Accordion>
    );
  }
}

export default AssessmentSection;
