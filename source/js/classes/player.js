import {
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
} from 'three';
import {
  BLOCK_WIDTH,
  BLOCKS_PER_ROW,
  MIN_BLOCK_HEIGHT,
} from 'constants/block';

export default class Player {
  constructor() {
    const geometry = new BoxGeometry(0.6, 1, 0.2);
    const material = new MeshStandardMaterial({ color: 0xff7777 });

    this.model = new Mesh(geometry, material);
    this.model.position.z = MIN_BLOCK_HEIGHT;
    this.model.position.x = BLOCK_WIDTH * BLOCKS_PER_ROW / 2;
    this.model.position.y = 1; // to center player on the first block

    // Initial properties
    this.speed = 0;
  }

  update(keys, framesPassed) {
  }
}
