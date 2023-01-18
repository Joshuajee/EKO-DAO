import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Proposal from '../../../src/pages/proposals/[id]';

test('renders component', () => {
    render(<Proposal />);

});
