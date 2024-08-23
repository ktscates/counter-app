import {
  increment,
  decrement,
  reset,
  incrementBy,
  undoLastAction,
} from './counter.action';

export type counterTypes =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof reset>
  | ReturnType<typeof incrementBy>
  | ReturnType<typeof undoLastAction>;
