import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import UploadForm from './UploadForm.tsx';

it('renders correctly', () => {

  renderer.create(<Form />);
});