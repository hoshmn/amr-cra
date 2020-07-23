import React from 'react';
import sectionsMap from './sections';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

    const totalTitle = 'This is the total indicator result for all assessed departments';
    return (
      <div>

        <Table striped bordered responsive>
          <thead>
            <tr>
              <th></th>
              <th className='target-th'>Target</th>
              {depts.map(d => <th key={d.name}>{d.name}</th>)}
              <th title={totalTitle}>Total Actual</th>
              <th>Priority</th>
              <th>Recommended Actions</th>
              <th>Links to Resources</th>
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
      <div>
        <span className='response-text'>{text}</span>
        {!!standards && <span className='standard-tag'> ({standards})</span>}
      </div>
    );
    return (
      <tr key={text}>
        <td className='response-text-cell'>{question}</td>
        <td className='target-td'>{targetValue+'%'}</td>
        {_.map(responseData, (responseValue, dep) => this.getResponseCell(responseValue, result, dep))}
        {this.getResponseCell(actualPerc, result, 'total')}
        {this.getPriorityCell(result)}
        {this.getRecsCell(result)}
        {this.getLinksCell(result)}
      </tr>
    );
  }

  getPriorityCell({ actualPerc, targetValue }) {
    if (actualPerc && targetValue && (actualPerc >= targetValue)) {
      return <td>N/A</td>
    }

    return (
      <td>
        <Form.Control as='select' custom>
          <option></option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Form.Control>
      </td>
    )
  }

  getRecsCell({ actualPerc, targetValue, recommendations }) {
    if (actualPerc && targetValue && (actualPerc >= targetValue)) {
      return <td>N/A</td>;
    }

    const formatPoint = (r, i) => {

      const text = r.replace(/^\[\d+\]/, '');
      const pointNumber = recommendations.length > 1 ? i+1 : null;
      return (
        <div className='point' key={i}>
          <span className='point-number'>{pointNumber}</span>{text}
        </div>
      )
    }

    return (
      <td className='recommendations scrollable'>
        <div>
          {recommendations.map((r, i) => formatPoint(r, i))}
        </div>
      </td>
    )
  }

  getLinksCell({ actualPerc, targetValue, resources }) {

    if (actualPerc && targetValue && (actualPerc >= targetValue)) {
      return <td>N/A</td>;
    }

    return (
      <td className='links'>
        <div>{resources && resources.map(r => {
          return (
            <div key={r.title} className='link'>
              <a href={r.link}>{r.title}</a>
            </div>
          )
        })}</div>
      </td>
    )

  }


  getResponseCell(responseValue, result, dep) {
    const isTotal = dep === 'total';
    const isPerc = result.numerator;

    const { targetValue } = result;
    let perfClass = '';
    let content = null;

    const nearCutoff = (targetValue * this.state.nearThreshhold/100);

    if (_.isNil(responseValue)) {
      content = 'No Data';
      perfClass = 'missing ';

    } else if (isPerc || isTotal) {
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

    const classes = 'response-value ' + perfClass + (isTotal ? 'total' : '');
    const title = isTotal ? 'This is the total indicator result for all assessed departments' : null;
    return <td className={classes} title={title} key={dep}>{content}</td>
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
          <Form.Control type='range' custom
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

    const { section, resultSections } = this.props;
    const defaultKey = resultSections[0].text;

    return (
      <div className='results-table'>
        <div className='instructions'>
        <h3>Results for the Clinical Facility, by Department</h3>
          <div className='instruction my-2'>
            Based on your inputs, your assessment results by indicator, recommended actions to address the gaps and relevant links to further resources, where available, are provided.
          </div>
          <div className='instruction my-2'>
            Colour coding of results by department is based on the legend below. You can select the threshold at which a result is considered <span className='target-ex'>Near Target</span>, and if the result is below this, it will be considered <span className='target-ex'>Behind Target</span>.
          </div>
          {this.getLegend()}
          <div className='instruction my-2'>
            For each indicator, please select a priority level for the recommended action, with 1 being the highest and 3 being the lowest.
          </div>

        </div>
        <Accordion
          id={`${section}-result-table`}
          defaultActiveKey={defaultKey}
          className='mb-5'
        >
          {this.props.resultSections.map(rSection => {

            return (
              <Card key={rSection.text}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey={rSection.text}>
                      {rSection.text}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={rSection.text}>
                  <Card.Body>
                    {this.getSectionTable(rSection)}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )
          })}
        </Accordion>

        <div className='text-center my-5'>
          <Button onClick={this.props.proceed}>
            Proceed to Assessment Results Dashboard
          </Button>
        </div>
      </div>
    )
  }
}

export default ResultsTable;