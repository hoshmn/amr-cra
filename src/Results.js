import React from 'react';
import sectionsMap from './sections';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import _ from 'lodash';

class Results extends React.Component {

  getMissedItem({ id, text, standards }) {

    // return <div key={q.id}>{q.text}</div>;
    return (
      <div className='missed-standard' key={id}>
        <h5>Missed Standard:</h5>
        <span className='negate-tag'>+</span>
        {!!standards && <span className='standard-tag'> {standards}: </span>}
        <span className='text'>
          "{text}"
        </span>
      </div>
    );
  }


  getSectionTable(section) {

    const eldest = _.get(section, 'children.0');
    if (!eldest) {
      console.error('Childless section');
      return;
    }

    const indicatorText = eldest.multiText;
    const indicator = (
      <div className='indicator' title={eldest.standards}>
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
              <th>Fulfilled</th>
              <th>Priority</th>
              <th>Recommended Actions</th>
              <th>Links to Resources</th>
            </tr>
          </thead>
          <tbody>
            {/* {section.results.map(r => this.getResultRow(r))} */}
            <tr>
              <td>
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
    if (isFulfilled || !recommendations.length) {
      return <td></td>;
    }

    const formatPoint = (r, i) => {
      console.log('!!', r)
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
    const disabled = isFulfilled;

    return (
      <td>
        <Form.Control as='select' custom disabled={disabled}>
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
      return <td></td>;
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
    console.log("1", this.props.processedQs);
    const defaultKey = processedQs[0].text;
    return (
      <div className='result-page'>
        <Accordion
          id={`${section}-result-page`}
          defaultActiveKey={defaultKey}
          className='my-5'
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
      </div>
    )
  }
}

export default Results;