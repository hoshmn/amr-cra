import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import sectionsMap from './sections';
import { getTableCellId, getTargetId } from './helperFunctions'

import { Multiselect } from 'multiselect-react-dropdown';
import _ from 'lodash'

const DEV = true;

const radioNoTag = '_no';

class AssessmentSection extends React.Component {
  constructor(props) {
    super(props);

    const { departments } = sectionsMap[this.props.section];
    const selectedDepts = DEV && departments ? departments : []
    this.state = { contents: null, selectedDepts, begun: false, warnings: [] };

    this.toggleSubQs = this.toggleSubQs.bind(this);
    this.selectDept = this.selectDept.bind(this);
    this.removeDept = this.removeDept.bind(this);
    this.begin = this.begin.bind(this);

    this.processElement = this.processElement.bind(this);
    this.getSection = this.getSection.bind(this);
    this.getQTable = this.getQTable.bind(this);

    this.qs = [];
  }

  componentDidMount() {
    const { requiresSetup } = sectionsMap[this.props.section];


    const targetData = {};
    if (!requiresSetup || DEV) {

      if (DEV && requiresSetup) {
        const { targets } = sectionsMap[this.props.section];

        targets.forEach(tSection => 
          tSection.sectionTargets.forEach(t => {
            _.set(targetData, [tSection.sectionId, t.id], 100);
          })
        )
      }


      this.generateQuestions(targetData);
    }
  }

  generateQuestions(targetData) {
    const { questions } = sectionsMap[this.props.section];
    const contents = questions.map(el => this.processElement(el));
    this.setState({ contents });
    
    const sectionObj = {
      questions: this.qs,
      departments: this.state.selectedDepts,
      targetData
    }
    this.props.sendMap(this.props.section, sectionObj);
  }

  getInstructions() {
    const { title, instructions } = sectionsMap[this.props.section];
    return (
      <div className='instructions'>
        <h3>{title}</h3>
        {instructions.map((sect, i) =><span className='instruction' key={'inst-'+i}>{sect}</span>)}
        {!DEV && !this.state.begun && this.getDeptSelection()}
        {!DEV && !this.state.begun && this.getTargetSetting()}
        {!DEV && !this.state.begun && this.getStartButton()}
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
        this.qs.push(el);

        if (subType === 'box') {
          return this.getQuestionBox(el);
        } else if (subType === 'y_n') {
          return this.getQuestionYN(el);
        } else if (subType === '%') {
          return this.getQuestionPerc(el);
        }
    
      default:
        console.error('Unknown element type: ', el);
        break;
    }
  }

  getSection(el) {
    const { children, id, text, subType, dataSource='' } = el;
    let content;
    if (subType === 'table') {
      content = this.getQTable(children);
    } else {
      content = _.map(children, this.processElement);
    }
    return (
      <Card key={'sect-'+id}>
        <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey={id}>
              {dataSource + ' ' + text}  
              {/* {dataSource ? `${dataSource} ${text}` : text} */}
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={id}>
          <Card.Body>
            {content}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  getQTable(children) {

    return (
      <Table striped bordered responsive>
      <thead>
        <tr>
          <th></th>
          {this.state.selectedDepts.map(d => {
            return <th key={'th-'+d.name}>{d.name}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {children.map((q, i) => {
          this.qs.push(q);
          const { id, text, tags, standards, subType } = q;
          const question = ( // TODO: KEY
            <>
              {!!tags && !!tags.length &&
                <span className='specimen-tags'>
                  {tags.map(t => <i key={'tag-'+q.id+'-'+t} className={t} />)}
                </span>
              }
              <span className='response-text'>{text}</span>
              {!!standards && <span className='standard-tag'> ({standards})</span>}
            </>
          )

          return (
            <tr key={'tr-'+i+'-'+q.id}>
              <td>{question}</td>
              {this.state.selectedDepts.map(d => {

                const uid = getTableCellId(d, q);
                let content;
                switch (subType) {
                  case '%':
                    let dv = null;
                    if (DEV) {
                      dv = Math.floor(Math.random() * 100);
                    }
                    content = <Form.Control type='number' min={0} id={uid} defaultValue={dv} />;
                    break;

                  case 'y_n':
                    content = (
                      <>
                        <Form.Check name={uid} type='radio' id={uid} label='yes' />
                        <Form.Check name={uid} type='radio' id={uid+radioNoTag} label='no' />
                      </>
                      )
                    break;
                
                  default:
                    console.error('Table not implemented for subtype: ' + subType);
                    return;
                }

                return (
                  <td key={uid}>
                    {content}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </Table>
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
            {tags.map(t => <i key={'tag-'+id+'-'+t} className={t} />)}
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

  getQuestionPerc({ id, text, tags, standards }) {
    // UNUSED
    const label = (
      <>
        {!!tags && !!tags.length &&
          <span className='specimen-tags'>
            {tags.map(t => <i key={'tag-'+id+'-'+t} className={t} />)}
          </span>
        }
        <span className='response-text'>{text}</span>
        {!!standards && <span className='standard-tag'> ({standards})</span>}
      </>
    )
    return (
      <>
        <Form.Control 
          id={id}
          key={id}
          // label={label}
          type='number' min={0} max={100}
        />
        {label}
      </>
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
                {tags.map(t => <i key={'tag-'+id+'-'+t} className={t} />)}
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
    const deptsSelected = this.state.selectedDepts.length;
    
    const { targets } = sectionsMap[this.props.section];
    const targetData = {};

    const targetsComplete = targets.every(tSection => 
      tSection.sectionTargets.every(t => {
        const { sectionId } = tSection;
        const uid = getTargetId(sectionId, t.id);
        const target = document.querySelector(`#${uid}`);
        if (!target.value) {
          return false;
        }
        const val = Number(target.value);
        const validTarget = !isNaN(val) && val >= 0 && val <= 100;

        // _.set
        if (!targetData[sectionId]) {
          targetData[sectionId] = {};
        }
        // we use this opportunity to record all target values for use if the section is complete
        targetData[sectionId][t.id] = val;

        return validTarget;
      })
    )

    const warnings = [];
    if (!deptsSelected) {
      warnings.push('select departments to assess')
    }
    if (!targetsComplete) {
      warnings.push('ensure that all target percentages are set as integers less than or equal to 100')
    }

    const begun = deptsSelected && targetsComplete;
    this.setState({ warnings, begun }, () => {
      if (begun) {
        this.generateQuestions(targetData);
      }
    });
  }

  getStartButton() {
    const { requiresSetup } = sectionsMap[this.props.section];
    if (!requiresSetup) {
      return;
    }

    let warningText = null;
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
        <h4>Select departments to assess</h4>
        <Multiselect
          options={departments}
          placeholder='select departments'
          avoidHighlightFirstOption={true}
          showCheckbox={true}
          closeOnSelect={false}
          closeIcon='cancel'
          //selectedValues={1} // Preselected value to persist in dropdown
          onSelect={this.selectDept}
          onRemove={this.removeDept}
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
                <div key={getTargetId(tSection.sectionId, t.id)}>
                  <Form.Control
                    className='target'
                    // label={t.text}
                    id={getTargetId(tSection.sectionId, t.id)}
                    type='number' min={0} max={100} defaultValue={100}
                    />
                  <Form.Label>{t.text}</Form.Label>
                  <br/>  
                </div>
              ))}
              <br/>
            </div>
          ))}
      </div>
    )
  }

  render() {
    const { departments, targets, requiresSetup } = sectionsMap[this.props.section];
    const showContents = this.state.begun || !requiresSetup;

    return (
      <Accordion id={`${this.props.section}-section`}>
        {this.getInstructions()}
        {(showContents || DEV) && this.state.contents}
      </Accordion>
    );
  }
}

export default AssessmentSection;