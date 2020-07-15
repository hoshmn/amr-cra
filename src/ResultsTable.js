import React from 'react';
import sectionsMap from './sections';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


import _ from 'lodash';

// const NEAR_THRESHHOLD = .8;

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nearThreshhold: 90,
    };

    this.updateThreshhold = this.updateThreshhold.bind(this);
  }

  getSectionTable(rSection) {
    const { departments } = sectionsMap[this.props.section];


    let depts = _.keys(_.get(rSection, 'results.0.responseData', {}));
    depts = depts.map(dStr => _.find(departments, d => d.id === dStr));
    return (
      <div>

        <Table striped bordered responsive>
          <thead>
            <tr>
              <th></th>
              <th>Target</th>
              {depts.map(d => <th key={d.name}>{d.name}</th>)}
              <th>Total Actual</th>
            </tr>
          </thead>
          <tbody>
            {rSection.results.map(r => this.getResultRow(r))}
          </tbody>
          </Table>
      </div>
    );
  }

  getResultRow(result) {
    const { text, standards, targetValue, actualPerc, responseData } = result;
    const question = (
      <>
        <span className='response-text'>{text}</span>
        {!!standards && <span className='standard-tag'> ({standards})</span>}
      </>
    );
    return (
      <tr key={text}>
        <td>{question}</td>
        <td>{targetValue+'%'}</td>
        {_.map(responseData, (responseValue, dep) => this.getResponseCell(responseValue, result, dep))}
        {this.getResponseCell(actualPerc, result, 'total')}
      </tr>
    );
  }

  getResponseCell(responseValue, result, dep) {
    const isPerc = result.numerator;

    const { targetValue } = result;
    let perfClass = '';
    let content = null;

    const nearCutoff = (targetValue * this.state.nearThreshhold/100);

    if (isPerc || dep === 'total') {
      content = Math.round(responseValue) + '%';
      if (responseValue >= targetValue) {
        perfClass = 'ahead ';
      } else if (responseValue >= nearCutoff) {
        perfClass = 'near ';
      } else {
        perfClass = 'behind ';
      }
    } else {

      content = !!responseValue ? 'Yes' : 'No';
      if (!!responseValue) {
        perfClass = 'ahead ';
      } else {
        perfClass = 'behind ';
      }
    }

    const classes = 'response-value ' + perfClass + dep;

    return <td className={classes} key={dep}>{content}</td>
  }

  updateThreshhold(e) {
    this.setState({ nearThreshhold: e.target.value });
  }
  getLegend() {
    const threshhold = <span className='threshhold'>{this.state.nearThreshhold}%</span>;
    return (
      <div className='legend'>
        <h4 className='text-center mb-2'>Legend</h4>
        <h5><span className='example ahead'></span>Meets Target</h5>
        <h5><span className='example near'></span>Near Target<strong>*</strong></h5>
        <h5><span className='example behind'></span>Behind Target</h5>
        <Form.Group >
          <Form.Label>
            <strong>*</strong>indicates that the value is at least {threshhold} of the target value
          </Form.Label>
          <Form.Control type="range" custom
            onChange={this.updateThreshhold}
            defaultValue={this.state.nearThreshhold}
            min={1}
            max={99}
          />
          <em>(drag slider to adjust)</em>
        </Form.Group>
      </div>
    )
  }

  render() {

    return (
      <div className='results-table'>
        {this.getLegend()}
        {this.props.resultSections.map(rSection => {

          return (
            <div key={rSection.text}>
              <h4 className='mt-3'>{rSection.text}</h4>
              {this.getSectionTable(rSection)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default ResultsTable;