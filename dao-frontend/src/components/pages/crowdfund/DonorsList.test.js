import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DonorsList from './DonorsList';

test('renders component', () => {
  render(<DonorsList />);

});
