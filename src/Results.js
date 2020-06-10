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

    return (
      <div className='results'>
        <h3>Facility-Level Assessment</h3>
        <h4>Recommendations & Resources</h4>

        <div className='prio-section prio-1'>

        <h4 className='priority'>Priority 1</h4>
        <div>
          <div className='missed-standard'>
            <h5>Missed Standard:</h5>
            <span className='negate-tag'>+</span>
            <span className='standard-tag'>U3:</span>
            <span className='text'>
              'Do the facility treatment guidelines include the following requirements: To do a urine culture if there are clinical indications such as suspected urinary tract infection; systemic sepsis without a clear focus or asymptomatic bacteriuria in pregnancy'
            </span>
          </div>
          <div className='recommendation'>
            <h5>Recommendation:</h5>
            <span className='text'>
              Develop or revise treatment guidelines to include this requirement and provide training to clinical staff
            </span>
          </div>
          <div className='resources'>
  
          </div>
        </div>

        </div>


        <div className='prio-section prio-2'>

        <h4 className='priority'>Priority 2</h4>
        <div>
          <div className='missed-standard'>
            <h5>Missed Standard:</h5>
            <span className='negate-tag'>+</span>
            <span className='standard-tag'>B9:</span>
            <span className='text'>
              'Does the Laboratory Handbook include the following: Blood cultures should be drawn from peripheral sites'
            </span>
          </div>
          <div className='recommendation'>
            <h5>Recommendation:</h5>
            <span className='text'>
              Include the requirement for blood to be drawn from peripheral sites
            </span>
          </div>
          <div className='resources'>
            <h5>Resources:</h5>
            <a href='http://www.euro.who.int/__data/assets/pdf_file/0005/268790/WHO-guidelines-on-drawing-blood-best-practices-in-phlebotomy-Eng.pdf?ua-1' target='#'>WHO guidelines on drawing blood: best practices in phlebotomy</a>
          </div>
        </div>

        </div>


        <div className='prio-section prio-3'>

        <h4 className='priority'>Priority 3</h4>
        <div>
          <div className='missed-standard'>
            <h5>Missed Standard:</h5>
            <span className='negate-tag'>+</span>
            <span className='standard-tag'>F4, U4, B4:</span>
            <span className='text'>
              'Does the Laboratory Handbook include the following: Informed consent should be obtained before collection of faeces, urine or blood for culture'
            </span>
          </div>
          <div className='recommendation'>
            <h5>Recommendation:</h5>
            <span className='text'>
              Include the requirement for obtaining informed consent prior to faeces, urine or blood collection
            </span>
          </div>
          <div className='resources'>
            <h5>Resources:</h5>
            <a href='http://www.pathology.uct.ac.za/sites/default/files/image_tool/images/231/documents/NHLS_Handbook_2015.pdf' target='#'>NHLS Laboratory Handbook (South Africa)</a>
          </div>
        </div>

        </div>

        <h4>All Missed Standards:</h4>
        {this.props.missedFQs.map(q => this.getMissedItem(q))}

      </div>
    );
  }
}

export default Results;