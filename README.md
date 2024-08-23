# NgRx Counter Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [State Management](#state-management)
  - [CounterState](#counterstate)
  - [CounterHistoryState](#counterhistorystate)
- [Customization](#customization)
  - [Adding New Actions](#adding-new-actions)
- [Troubleshooting](#troubleshooting)
  - [Common Errors](#common-errors)
- [Live Link](#live-link)

## Introduction
This is a simple counter application built using Angular and NgRx. The app allows users to increment, decrement, and reset a counter while maintaining a history of the counter values.

## Features
- Increment the counter
- Decrement the counter
- Reset the counter
- Increment by value
- Undo the last action
- Track the history of the counter values

## Technologies Used
- Angular
- NgRx for state management
- TailwindCSS for styling

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ktscates/counter-app.git
   cd counter-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

    ```bash
    ng serve
    ```
    Open your browser and navigate to `http://localhost:4200/`.


## State Management

### CounterState
This state handles the current value of the counter. Actions include incrementing, decrementing, resetting the counter, incrementing by any value, and undoing the last action.

### CounterHistoryState
This state manages an array that tracks the history of the counter values after each action. The history is updated every time the counter is incremented, decremented, reset, incremented by any value, or undo the last action.

## Customization

### Adding New Actions
To add new actions, follow these steps:
1. Define the action in `counter.action.ts`.
2. Update the `counterReducer` in `counter.reducer.ts` to handle the new action.
3. Modify the selectors in `counter.selectors.ts` to include any new data derived from the state.

## Troubleshooting

### Common Errors
- **Undefined Property Error**: If you encounter an error such as "Cannot read properties of undefined (reading 'history')", ensure that your selectors are properly accessing the state and that the state has been initialized correctly.
- **NaN in Counter History**: If your counter history shows NaN values, make sure that you're correctly handling initial values in the reducer. Check the history calculation to ensure it defaults to 0 when the history array is empty.

## Live Link
You can access the deployed application at [Ngrx Counter App](https://ktscates-counter-app.netlify.app/).

