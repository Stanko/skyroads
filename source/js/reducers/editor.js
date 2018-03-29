import { Map } from 'immutable';

import {
  SET_BLOCK,
} from 'actions/editor';

const TILES_PER_ROW = 7;
const INITIAL_ROWS_COUNT = 20;

const initMap = [];

for (let y = 0; y < INITIAL_ROWS_COUNT; y++) {
  initMap[y] = [];

  for (let x = 0; x < TILES_PER_ROW; x++) {
    initMap[y][x] = null;
  }
}

const initialState = Map({
  map: initMap,
});

const actionsMap = {
  // Async action
  [SET_BLOCK]: (state, action) => {
    const map = [...state.get('map')];
    map[action.y] = [...map[action.y]];
    map[action.y][action.x] = action.block;

    return state.merge(Map({
      map,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
