import {
  ObjectLoader,
} from 'three';
import {
  BLOCK_WIDTH,
  BLOCKS_PER_ROW,
  MIN_BLOCK_HEIGHT,
} from 'constants/block';
import modelData from 'constants/spaceship.json';

const keyCodes = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const GRAVITY = 0.005;
const KEY_DELAY = 100;
const SPEED_STEP = 0.015;
const MAX_SPEED = SPEED_STEP * 36;
const MIN_SPEED = 0;

export default class Player {
  constructor() {
    const loader = new ObjectLoader();
    this.model = loader.parse(modelData);

    this.model.position.z = MIN_BLOCK_HEIGHT;
    this.model.position.x = BLOCK_WIDTH * BLOCKS_PER_ROW / 2;
    this.model.position.y = 1; // to move player from the edge of the first block

    this.model.scale.set(0.12, 0.12, 0.12);
    this.model.rotation.set(Math.PI / 2, Math.PI / -2, 0);

    this.speed = MIN_SPEED;
    this.jumping = false;
    this.bounceValue = 0;
    this.speedLastUpdated = Date.now();

    // Initial properties
    this.speed = 0;

    this.hud = {
      speedElement: document.querySelector('.HUD-speed'),
    };
  }

  jumpLogic(keys, framesPassed) {
    // Jumping logic
    if (keys[keyCodes.SPACE] && !this.jumping) {
      this.jumping = true;
      this.bounceValue = 0.1;
    }

    if (this.model.position.z + this.bounceValue < MIN_BLOCK_HEIGHT) {
      this.jumping = false;
      this.bounceValue = 0;
      this.model.position.z = MIN_BLOCK_HEIGHT;
    }

    this.model.position.z += this.bounceValue * framesPassed;
    this.bounceValue -= GRAVITY * framesPassed;
  }

  speedLogic(keys, now, framesPassed) {
    const timeSinceLastSpeedUpdate = now - this.speedLastUpdated;

    if (timeSinceLastSpeedUpdate > KEY_DELAY) {
      const diff = Math.floor(timeSinceLastSpeedUpdate / KEY_DELAY) * SPEED_STEP;

      if (keys[keyCodes.UP] && this.speed < MAX_SPEED) {
        this.speed += diff;

        if (this.speed > MAX_SPEED) {
          this.speed = MAX_SPEED;
        }
      } else if (keys[keyCodes.DOWN] && this.speed > MIN_SPEED) {
        this.speed -= diff;

        if (this.speed < MIN_SPEED) {
          this.speed = MIN_SPEED;
        }
      }

      this.speedLastUpdated = now;
    }

    this.model.position.y += this.speed * framesPassed;
  }

  moveLogic(keys) {
    if (keys[keyCodes.LEFT]) {
      this.model.position.x -= 0.05;
    }
    if (keys[keyCodes.RIGHT]) {
      this.model.position.x += 0.05;
    }
  }

  updateHUD() {
    this.hud.speedElement.innerHTML = Math.round(this.speed / SPEED_STEP);
  }

  update(keys, now, framesPassed) {
    this.jumpLogic(keys, framesPassed);
    this.speedLogic(keys, now, framesPassed);
    this.moveLogic(keys);
    this.updateHUD();
  }
}
