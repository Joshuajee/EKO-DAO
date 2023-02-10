import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavLink from './NavLink';
import { dashboardRoutes } from '../../libs/routes';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));


describe('renders component', () => {

    it("Testing first Link", () => {
        render(<NavLink name={dashboardRoutes[0].name} link={dashboardRoutes[0].link}/>);
    })

});

