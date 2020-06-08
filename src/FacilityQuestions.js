import React from 'react';
import questions from './questions/facility';

const expectedOutput = {
  // id: 'val'
};

const qMap = {};

class FacilityQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contents: null };
  }

  componentDidMount() {
    // console.log('qs: ', questions);
    const contents = questions.map(el => this.processElement(el));
    // console.log('?: ',contents);
    this.setState({ contents });
  }

  processElement(el) {
    // console.log('el: ',el);
    const { type } = el;

    switch (type) {
      case 'sectionHeader':
        return this.getSectionHeader(el);
    
      case 'preface':
        return this.getPreface(el);
    
      case 'q':
        const { id, expectedValue = true } = el;
        qMap[id] = el;
        expectedOutput[id] = expectedValue;
        if (el.subType === 'box') {
          return this.getQuestionBox(el);
        } else if (el.subType === 'y_n') {
          return this.getQuestionYN(el);
        }
    
      // case 'sectionHeader':
      //   return this.getSectionHeader(el);
    
      // case 'sectionHeader':
      //   return this.getSectionHeader(el);
    
      // case 'sectionHeader':
      //   return this.getSectionHeader(el);
    
      default:
        // console.log('what tha??: ', el);
        break;
    }
  }

  getSectionHeader(el) {
    let classes = 'collapse';
    const { id, defaultOpen = false } = el;
    if (defaultOpen) {
      classes += ' show';
    }

    console.log(id, classes);
    const headId = id + '_head';
    const bodyId = id + '_body';
    return (
      <div className='card' key={id}>
        <div className='card-header' id={headId}>
          <h2 className='mb-0'>
            <button
              className='btn btn-link btn-block text-left' 
              type='button' data-toggle='collapse'
              data-target={`#${bodyId}`} 
              aria-expanded={defaultOpen} 
              aria-controls={bodyId}
            >
              {el.text}  
            </button>
          </h2>
        </div>
        <div 
          id={bodyId} className={classes}
          data-parent='#facility-questions'
          aria-labelledby={headId}
        >
          <div className='card-body'>
            <div>content</div>
            {el.children.map(childEl => this.processElement(childEl))}
          </div>
        </div>
      </div>
    )
  }

  getPreface(el) {
    return (
      <label className='form-check-label question-text' key={el.id}>{el.text}</label>
    )
  }

  getQuestionBox(el) {
    return (
      <div key={el.id}>
         <input className='form-check-input' type='checkbox' 
          name='oversight-committee-c'
          id={el.id}
          value={el.id}
        />
        <label className='form-check-label' htmlFor={el.id}>
          {el.text}
        </label>
      </div>
    )
  }

  getQuestionYN(el) {
    return (
      <div key={el.id}>
        <label className='form-check-label question-text'>
          {el.text}
          <span className='standard-tag'>{el.standards}</span>
        </label>

        <div className='responses'>

          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' 
              name={el.id}
              id={el.id + '_yes'}
              value={el.id + '_yes'}
            />
            <label className='form-check-label' htmlFor={el.id + '_yes'}>Yes</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' 
              name={el.id}
              id={el.id + '_no'}
              value={el.id + '_no'}
            />
            <label className='form-check-label' htmlFor={el.id + '_no'}>No</label>
          </div>


          {el.subQs && 
            <div className='sub-questions'>
              {el.subQs.map(childEl => this.processElement(childEl))}
            </div>
          }


        </div>
      </div>
    )
  }

  render() {
    // console.log('!', this.state.contents);
    return (
      <div id='facility-questions' className='accordion' action='#'>
        hi
        {this.state.contents}
      </div>
    );
  }
}

export default FacilityQuestions;
