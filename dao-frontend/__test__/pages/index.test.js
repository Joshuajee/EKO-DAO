import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import user from "@testing-library/user-event";
import Home from '../../src/pages/';

describe ("Testing the landing page", () => {

  it('Explore Button is present, and leads to dashboard when clicked', async() => {
    
    render(<Home />);
  
    const exploreBtn = screen.getByRole("button", {
      name: /explore/i
    })
  
    expect(exploreBtn).toBeInTheDocument()

  });

})


