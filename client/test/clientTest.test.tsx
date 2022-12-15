import * as React from 'react';
import { Exam } from '../src/clientTest';
import { shallow } from 'enzyme';

// Tests the Exam component wiht 100% coverage and 100% branch coverage
describe('Exam tests', () => {
  test('Exam draws correctly wihtout input', () => {
    const wrapper = shallow(<Exam />);

    expect(wrapper.matchesElement(
    <>
      <div>
        Hva er svaret?
        <input
        />
      </div>
      <div>
        Svaret er feil
      </div>
    </>
    )).toEqual(true);
  });

  test('Exam draws correctly with input', () => {
    const wrapper = shallow(<Exam />);

    wrapper.find('input').simulate('change', {currentTarget: {value: '42'}});

    expect(wrapper.matchesElement(
    <>
      <div>
        Hva er svaret?
        <input
        />
      </div>
      <div>
        Svaret er riktig
      </div>
    </>
    )).toEqual(true);
  });
});