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
    console.log('qs: ', questions);
    const contents = questions.map(el => this.processElement(el));
    console.log('?: ',contents);
    this.setState({ contents });
  }

  processElement(el) {
    console.log('el: ',el);
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
        console.log('what tha??: ', el);
        break;
    }
  }

  getSectionHeader(el) {
    return (
      <div class='card' key={el.id}>
        <div class="card-header" id={el.id}>
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left" 
              type="button" data-toggle="collapse" data-target={`#${el.id}`} 
              aria-expanded="true" aria-controls={el.id}
              >
              {el.text}  
            </button>
          </h2>
        </div>
        {el.children ? el.children.map(childEl => this.processElement(childEl)) : null}
      </div>
    )
  }

  getPreface(el) {
    return (
      <label class="form-check-label question-text" key={el.id}>{el.text}</label>
    )
  }

  getQuestionBox(el) {
    return (
      <div key={el.id}>
         <input class="form-check-input" type="checkbox" 
          name="oversight-committee-c"
          id={el.id}
          value={el.id}
        />
        <label class="form-check-label" for={el.id}>
          {el.text}
        </label>
      </div>
    )
  }

  getQuestionYN(el) {
    return (
      <div key={el.id}>
        <label class="form-check-label question-text">
          {el.text}
          <span class='standard-tag'>(F1, U1, B1)</span>
        </label>

        <div class="responses">

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" 
              name={el.id}
              id={el.id + '_yes'}
              value={el.id + '_yes'}
            />
            <label class="form-check-label" for={el.id + '_yes'}>Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" 
              name={el.id}
              id={el.id + '_no'}
              value={el.id + '_no'}
            />
            <label class="form-check-label" for={el.id + '_no'}>No</label>
          </div>


          {el.subQs && 
            <div class='sub-questions'>
              {el.subQs.map(childEl => this.processElement(childEl))}
            </div>
          }


        </div>
      </div>
    )
  }

  render() {
    console.log('!', this.state.contents);
    return (
      <div className="FacilityQuestions">
        hi
        {this.state.contents}
      </div>
    );
  }
}

export default FacilityQuestions;
