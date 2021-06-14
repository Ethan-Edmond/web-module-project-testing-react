//1. Add in nessisary imports and values to establish the testing suite.
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

//2. Test that the Display component renders without any passed in props.
test('Display component renders without props', () => {
  render(<Display/>);
});
//3. Rebuild or copy a show test data element as used in the previous set of tests.
const testShow = {
  //add in approprate test data structure here.
  name: 'Test Show',
  summary: 'A show about testing',
  seasons: [
    {
      id: 1,
      name: 'Season 1',
      episodes: []
    }
  ]
};

fetchShow.mockResolvedValue(testShow);

//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
const button = () => screen.getByRole('button');

test('Test data shows when fetch button is clicked', async () => {
  render(<Display/>);
  userEvent.click(button());

  const show = await screen.findByTestId('show-container');
  expect(show).toBeInTheDocument();
});

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test('Select options match seasons in test data', async () => {
  render(<Display/>);
  userEvent.click(button());

  const selector = await screen.findAllByTestId('season-option');
  expect(selector.length).toBe(testShow.seasons.length);
});

//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
test('displayFunc is called when fetch button is pressed', async () => {
  const mockFunc = jest.fn();
  render(<Display displayFunc={mockFunc}/>);
  userEvent.click(button());

  // have to wait until fetchShow finishes;
  const show = await screen.findByTestId('show-container');

  expect(mockFunc).toHaveBeenCalledTimes(1);
});
