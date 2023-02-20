import React from 'react';
import renderer from 'react-test-renderer';
import LogInScreen from '../src/screens/Login';

test('renders correctly', () => {
  const tree = renderer.create(<LogInScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
