import React from 'react';
import sectionsMap from './sections';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import _ from 'lodash';

class Results extends React.Component {
  getSectionTable(section) {

    const eldest = _.get(section, 'children.0');
    if (!eldest) {
      console.error('Childless section');
      return;
    }

    const indicatorText = eldest.multiText;
    const indicator = (
      <div className='indicator' title={eldest.dataSource}>
        {indicatorText}
        {!!eldest.standards && <span className='standard-tag'> ({eldest.standards})</span>}
      </div>
    );

    let somethingRight = !!eldest.answeredCorrectly;
    let somethingWrong = false;
    let recs = [];
    const links = eldest.resources || [];

    if (!_.isUndefined(eldest.answeredCorrectly) && !eldest.answeredCorrectly) {
      // wrong off the bat
      somethingWrong = true;
      const eRecs = eldest.recs || [];
      recs.push(...eRecs);
    } else {
      const parts = eldest.children || eldest.subQs;
      parts.forEach(p => {
        if (_.isUndefined(p.answeredCorrectly)) {
          console.warn('undefined answer constituent of multipart question: ', p);
          return;
        } else if (p.answeredCorrectly) {
          somethingRight = true;
          return
        }
        // wrong answer
        somethingWrong = true;
        const pRecs = p.recs || [];
        recs.push(...pRecs);
      })
    }

    let fulfilled = 'No';
    if (somethingRight && !somethingWrong) {
      fulfilled = 'Yes';
    } else if (somethingRight && somethingWrong) {
      fulfilled = 'Partial';
    }

    const isFulfilled = fulfilled==='Yes';
      
    return (
      <div>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th></th>
              {/* <th>Standard</th> */}
              {/* <th>Indicator</th> */}
              <th>AMR Standard Met</th>
              <th>Priority</th>
              <th>Recommended Actions</th>
              <th>Links to Resources</th>
            </tr>
          </thead>
          <tbody>
            {/* {section.results.map(r => this.getResultRow(r))} */}
            <tr>
              <td className='response-text-cell'>
                {indicator}
              </td>
              <td className={'fulfilled '+fulfilled}>
                {fulfilled}
              </td>
              {this.getPriorityCell(isFulfilled)}
              {this.getRecsCell(isFulfilled, recs)}
              {this.getLinksCell(isFulfilled, links)}
            </tr>
          </tbody>
          </Table>
      </div>
    );
  }

  getRecsCell(isFulfilled, recommendations) {
    if (isFulfilled) {
      return <td>N/A</td>;
    }
    if (!recommendations.length) {
      return <td></td>;
    }

    const formatPoint = (r, i) => {

      const text = r.replace(/^\[\d+\]/, '');
      const pointNumber = recommendations.length > 1 ? i+1 : null;
      return (
        <div className='point' key={i}>
          <span className='point-number'>{pointNumber}</span> {text}
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


  getPriorityCell(isFulfilled) {
    if (isFulfilled) {
      return <td>N/A</td>;
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

  getLinksCell(isFulfilled, links) {
    if (isFulfilled) {
      return <td>N/A</td>;
    }
    return (
      <td className='links'>
        {links.map(l => {
          return <div key={l.text}>
            <a href={l.link}>{l.title}</a>
          </div>
        })}
      </td>
    )
  }

  render() {
    const { section } = this.props;
    const processedQs = sectionsMap[section].questions;

    const defaultKey = processedQs[0].text;
    return (
      <div id={`${section}-result-page`} className='result-page'>
        <div className='instructions'>
          <h3>Results for the Clinical Facility Level</h3>
          <div className='my-3'>
            Based on your inputs, your assessment results by indicator, recommended actions to address the gaps and relevant links to further resources, where available, are provided.
          </div>
          <div className='my-3'>
            Click on each subsection header to expand the provided result, recommendations and resources, where available. 
          </div>
          <div className='my-3'>
            For each indicator that does not meet target performance, please select a priority level for the recommended action, with 1 being the highest and 3 being the lowest. 
          </div>
        </div>
        <Accordion
          defaultActiveKey={defaultKey}
        >
          {processedQs.map(section => {
            return (
              <Card key={section.text}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey={section.text}>
                      {section.text}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={section.text}>
                  <Card.Body>
                    {this.getSectionTable(section)}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )
          })}
        </Accordion>

        <div className='text-center my-5'>
          <Button onClick={this.props.proceed}>
            Proceed to Next Assessment Section
          </Button>
        </div>
      </div>
    )
  }
}

export default Results;