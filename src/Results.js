import React from 'react';

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

  render() {
    console.log("1", this.props.processedQs);
    return (
      <div>hihi</div>
    );
  }
}

export default Results;