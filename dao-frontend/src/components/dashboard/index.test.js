import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './';

test('renders component', () => {
  render(<Dashboard> <div></div> </Dashboard>);


});
