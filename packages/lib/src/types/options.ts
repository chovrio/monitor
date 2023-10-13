import { Tracker } from '../core';

export interface TrackerOption {
  id: string;
  requestURL: string;
  plugins?: Array<(tracker: Tracker) => void>;
}

export type TrackerPlugin = (tracker: Tracker) => void;
