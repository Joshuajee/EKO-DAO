import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from "@testing-library/user-event";
import HamburgerMenu from './HambuggerMenu';

import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));




describe ("Testing the MenuButton", () => {

    it("Button Exists on large screen", () => {
        
        const setOpen = jest.fn()
        const open = false
    
        render(<HamburgerMenu open={open} setOpen={setOpen} />);
    
        const menu = screen.findByRole("button")

        //expect(menu).toBeInTheDocument()


    })

})


