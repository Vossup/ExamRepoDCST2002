import * as React from 'react';
import { /*Alert,*/ Count } from '../src/clientTest';
import { shallow } from 'enzyme';

// describe('Alert tests', () => {
//   test.skip('No alerts initially', () => {
//     const wrapper = shallow(<Alert />);

//     expect(wrapper.matchesElement(<div></div>)).toEqual(true);
//   });

//   test.skip('Show alert message', (done) => {
//     const wrapper = shallow(<Alert />);

//     Alert.danger('test');

//     // Wait for events to complete
//     setTimeout(() => {
//       expect(
//         wrapper.matchesElement(
//           <div>
//             <div>
//               test
//               <button />
//             </div>
//           </div>
//         )
//       ).toEqual(true);

//       done();
//     });
//   });
// });

describe('Count tests', () => {
  test('Initial count is 0', () => {
    const wrapper = shallow(<Count />);

    expect(wrapper.containsMatchingElement(<button>{0}</button>)).toEqual(true);
  });

  test('Increment count', () => {
    const wrapper = shallow(<Count />);

    wrapper.find('button').simulate('click');

    expect(wrapper.containsMatchingElement(<button>{1}</button>)).toEqual(true);
  });
});