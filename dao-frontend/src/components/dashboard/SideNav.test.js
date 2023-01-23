import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideNav from './SideNav';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));


describe ("Testing the SideNavigation", () => {

  it("All Links are present ", () => {

    render(<SideNav />);

    const menu = screen.findAllByRole("link")

      //expect(menu).toBeInTheDocument()


  })

})