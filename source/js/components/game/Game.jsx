import React, { Component } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  DirectionalLight,
} from 'three';
import map from 'constants/dummy-map';
import getBlock from 'classes/block';
import Player from 'classes/player';
import Simulator from 'classes/simulator';
import {
  BLOCK_WIDTH,
  BLOCKS_PER_ROW,
} from 'constants/block';

const FRAME_DURATION = 16; // ~60fps
// const KEY_DELAY = 100;

const getTime = typeof performance === 'function' ? performance.now : Date.now;

const getMaxCanvasSize = () => {
  const MIN_RATIO = 1.5;
  const ratio = window.innerWidth / window.innerHeight;

  if (ratio < MIN_RATIO) {
    return {
      width: window.innerWidth,
      height: window.innerWidth / MIN_RATIO,
      ratio: MIN_RATIO,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio,
  };
};

export default class Game extends Component {
  componentDidMount() {
    // Create scene
    this.isEnd = false;
    this.destroy = false;
    this.stopAnimation = false;
    this.scene = new Scene();

    const canvasSize = getMaxCanvasSize();

    // Renderer
    this.renderer = new WebGLRenderer({
      alpha: true,
      // TODO check if we should use it
      // iOS is pixelated for some reason
      // antialias: true,
    });

    this.renderer.setSize(canvasSize.width, canvasSize.height);
    this.renderer.setClearColor(0xffffff, 0);


    // Camera
    this.camera = new PerspectiveCamera(20, canvasSize.ratio, 0.1, 150);
    this.camera.position.z = 3;
    this.camera.position.y = -10;
    this.camera.position.x = BLOCK_WIDTH * BLOCKS_PER_ROW / 2;

    // this.camera.rotation.x = 1.4;
    this.camera.rotation.x = 80 * Math.PI / 180;
    // 1.4 * Math.PI / 180

    // Lights
    this.hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 1);
    this.scene.add(this.hemisphereLight);

    this.sun = new DirectionalLight(0xffffff, 0.9);
    this.sun.position.set(0, -1, 3);

    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    // Player model
    this.player = new Player();
    this.scene.add(this.player.model);

    // Key map
    this.keys = {};

    // Add canvas to dom
    this.gameDiv.appendChild(this.renderer.domElement);

    // Render map
    this.renderMap();

    // Start animation loop
    this.lastUpdate = getTime();
    this.animate();

    // Event handlers
    window.addEventListener('resize', this.handleResize);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    this.simulator = new Simulator(this.fileInputElement, this.setKeys);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  setKeys = (keys) => {
    this.keys = keys;
  }

  handleResize = () => {
    const canvasSize = getMaxCanvasSize();

    this.camera.aspect = canvasSize.ratio;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(canvasSize.width, canvasSize.height);
  }

  handleKeyDown = (e) => {
    this.keys[e.keyCode] = true;
  }

  handleKeyUp = (e) => {
    this.keys[e.keyCode] = false;
  }

  updateCameraAndLight(y) {
    this.camera.position.y = y;
    this.sun.position.y = y;
    this.sun.target.position.y = y;
  }

  animate = () => {
    const now = getTime();
    // and translating that to frames
    const delta = now - this.lastUpdate;
    const framesPassed = delta / FRAME_DURATION;

    // GAME UPDATES

    if (!this.isEnd) {
      this.player.update(this.keys, now, framesPassed, map);
    }
    // HUD
    // Collision detection
    if (!this.isEnd) {
      const collisionRes = this.player.checkCollision(map);
      if (collisionRes.fall) {
        this.isEnd = true;
      } else if (collisionRes.destroy) {
        this.isEnd = true;
        this.destroy = true;
      }
    }
    this.updateCameraAndLight(this.player.model.position.y - 10);

    // END GAME UPDATES

    // Update time of the last update
    this.lastUpdate = now;

    if (this.isEnd && this.player.model.position.z > -1 && !this.destroy) {
      this.player.model.position.z -= 0.007;
    }

    if (this.isEnd && this.player.model.position.z <= -1) {
      this.stopAnimation = true;
    }

    if (this.destroy) {
      // show destroy animation
      alert('DESTROYED');
      this.stopAnimation = true;
    }

    // TODO remove
    // this.camera.position.y += 0.1;
    // this.sun.position.y += 0.1;
    // this.sun.target.position.y += 0.1;
    // this.player.model.position.y += 0.1;

    // Render updated scene
    this.renderer.render(this.scene, this.camera);

    // Continue animation loop
    if (!this.stopAnimation) {
      requestAnimationFrame(this.animate);
    }
  }

  renderMap() {
    map.forEach((row, rowIndex) => {
      row.forEach((blockProps, blockIndex) => {
        if (blockProps) {
          this.scene.add(getBlock(blockProps, {
            x: blockIndex,
            y: rowIndex,
          }));
        }
      });
    });
  }

  render() {
    return (
      <div className='Game'>
        <label
          className='Game-simulatorLabel'
          htmlFor='simulator-input'
        >
          Select file
          <input
            className='Game-simulatorInput'
            type='file'
            id='simulator-input'
            ref={ el => this.fileInputElement = el }
          />
        </label>
        <div className='Game-canvasWrapper' ref={ el => this.gameDiv = el } />
      </div>
    );
  }
}
