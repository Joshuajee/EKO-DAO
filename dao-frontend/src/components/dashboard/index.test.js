import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './';

import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));



test('renders component', () => {
  render(<Dashboard> <div></div> </Dashboard>);


});
