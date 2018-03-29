export const SET_BLOCK = 'SET_BLOCK';

export function setBlock(block, x, y) {
  return {
    type: SET_BLOCK,
    block,
    x,
    y,
  };
}
