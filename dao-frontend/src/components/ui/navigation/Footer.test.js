import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockConnector } from 'wagmi/connectors/mock';
import ConnectionBtn from './button';

describe ("Modal Wrapper", () => {

    it("Wrapper", () => {
        

        render(<ConnectionBtn  />);


    })

})