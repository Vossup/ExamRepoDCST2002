import * as React from 'react';
import { ReactNode, ChangeEvent } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

class Exam extends Component {
  answer: string = 'Skriv svaret ditt her';

  render() {
    return (
      <>
        <div>
          Hva er svaret?
          <input
            type="text"
            value={this.answer}
            onChange={(event) => (this.answer = event.currentTarget.value)}
          />
        </div>
        <div>Svaret er {this.answer == '42' ? 'riktig' : 'feil'}</div>
      </>
    );
  }
}

export { Exam };