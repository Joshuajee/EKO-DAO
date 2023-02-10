import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConnectionBtn from './button';

 
// const connector = new MockConnector({
//   chains: [polygonMumbai],
// })


describe ("Connection Button", () => {

    it("Button Exists", () => {
        

        render(<ConnectionBtn  />);


    })

})
