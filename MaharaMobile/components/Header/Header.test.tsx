import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import Header from './Header';

it('renders correctly', () => {
  renderer.create(<Header />);
});
