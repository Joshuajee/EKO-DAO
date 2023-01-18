import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Proposals from '../../../src/pages/proposals/';

test('renders component', () => {
    render(<Proposals />);

});
