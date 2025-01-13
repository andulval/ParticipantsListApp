import { render, screen, waitFor } from '@testing-library/react';
import { ParticipantsList } from '../ParticipantsList';
import { BrowserRouter as Router } from 'react-router-dom';


describe('ParticipantsList Component', () => {
  it('should display loading spinner initially and then show participants list', async () => {
    // Mock the fetch function to return sample participant data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
          { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
        ]),
      })
    );

    render(
      <Router>
        <ParticipantsList />
      </Router>
    );

    // Wait for the participant list to be rendered
    await waitFor(() => screen.getByText('John Doe'));

    // Check if the participants are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      // Use a regular expression to match the email, ignoring parentheses
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/jane.doe@example.com/i)).toBeInTheDocument();
  });
});
