import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../../../src/pages/profile';

test('renders component', () => {
    render(<Profile />);

});
