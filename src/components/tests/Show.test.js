import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders testShow and no selected Season without errors', ()=>{
  render(<Show show={testShow} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} selectedSeason={'none'}/>);
  const loading = screen.getByTestId("loading-container");
  expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', ()=>{
  render(<Show show={testShow} selectedSeason={'none'}/>);
  const seasons = screen.getAllByTestId('season-option');
  expect(seasons.length).toBe(1);
});

test('handleSelect is called when an season is selected', () => {
  const mockHandle = jest.fn();
  render(<Show handleSelect={mockHandle} show={testShow} selectedSeason={'none'}/>);
  const selector = screen.getByRole('combobox');
  userEvent.selectOptions(selector, '1');
  const season1 = screen.getByTestId('season-option');
  expect(season1.selected).toBe(true);
  expect(mockHandle).toHaveBeenCalledTimes(1);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
});

//Tasks:
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
