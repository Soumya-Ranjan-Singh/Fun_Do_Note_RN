import React from 'react';
import renderer from 'react-test-renderer';
//import App from '../App';
//import LogInScreen from '../src/screens/Login';
import Demo from '../src/screens/Demo';

test('renders correctly', () => {
  const tree = renderer.create(<Demo />).toJSON();
  expect(tree).toMatchSnapshot();
});
