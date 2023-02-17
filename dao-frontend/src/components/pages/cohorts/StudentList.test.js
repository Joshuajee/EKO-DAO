import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentList from './StudentList';

test('renders component', () => {
  render(<StudentList />);

});
