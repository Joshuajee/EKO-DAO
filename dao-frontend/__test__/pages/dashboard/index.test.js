import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '../../../src/pages/dashboard';

test('renders component', () => {
    render(<DashboardPage />);

});
