import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNav from './TopNav';

import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));



describe('Testing Dashboard Top Navigation', () => {

  it("Testing first Link", () => {
      render(<TopNav />);
  })

});

