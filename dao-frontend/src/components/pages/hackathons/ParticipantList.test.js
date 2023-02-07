import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DonorsList from './ParticipantList';

test('renders component', () => {
  render(<DonorsList />);

});
