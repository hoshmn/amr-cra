import React from 'react';
import sectionsMap from './sections';
import Table from 'react-bootstrap/Table';

import _ from 'lodash';

const NEAR_THRESHHOLD = .8;

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
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
    const { targetValue } = result;
    let perfClass = '';
    if (responseValue > targetValue) {
      perfClass = 'ahead ';
    } else if (responseValue > (targetValue * NEAR_THRESHHOLD)) {
      perfClass = 'near ';
    } else {
      perfClass = 'behind ';
    }
    const classes = 'response-value ' + perfClass + dep;

    return <td className={classes} key={dep}>{Math.round(responseValue)+'%'}</td>
  }

  render() {

    return (
      <div className='results-table'>
        {this.props.resultSections.map(rSection => {

          return (
            <div>
              <h4 className='mt-2'>{rSection.text}</h4>
              {this.getSectionTable(rSection)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default ResultsTable;