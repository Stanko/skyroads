/* eslint-disable */

// --- Create scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 200);
const renderer = new THREE.WebGLRenderer({
  // antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.type = THREE.BasicShadowMap;

document.body.appendChild(renderer.domElement);


const map = [
  [' ',' ',' ','e',' ',' ',' '],
  [' ',' ',' ','e',' ',' ',' '],
  [' ',' ',' ','e',' ',' ',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x',' ','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ','x',' ','x',' ','x',' '],
  ['x','y','x','y','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x',' ','x','y','x'],
  ['y','x','y',' ','y','x','y'],
  ['x','y','x',' ','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x',' ','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  ['x','y',' ','y',' ','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ','x',' ',' ',' ','x',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
  ['y','x','y',' ','y','x','y'],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x',' ','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  ['x','y','x',' ','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  [' ',' ','x','y','x',' ',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
  [' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','x',' ',' ',' '],
  ['x','y','x','y','x','y','x'],
  [' ','x','y','x','y','x',' '],
  [' ','y',' ','y',' ','y',' '],
  [' ','x','y','x','y','x',' '],
  ['x','y','x','y','x','y','x'],
];

// const map = [
//   [' ',' ',' ','T',' ',' ',' '],
//   [' ',' ',' ','3',' ',' ',' '],
//   [' ',' ',' ','3',' ',' ',' '],
//   [' ',' ',' ','3',' ',' ',' '],
//   [' ',' ',' ','3',' ',' ',' '],
//   [' ','3',' ','3',' ','3',' '],
//   [' ','3','3','3','3','3',' '],
//   [' ','3',' ','3',' ','3',' '],
//   [' ','3','3','3','3','3',' '],
//   [' ','3',' ','3',' ','3',' '],
//   [' ','3',' ','3',' ','3',' '],
//   [' ',' ',' ','3',' ',' ',' '],
//   [' ',' ',' ','T',' ',' ',' '],
//   [' ',' ',' ','T',' ',' ',' '],
//   [' ',' ',' ','T',' ',' ',' '],
//   [' ',' ',' ','T',' ',' ',' '],
//   [' ',' ','b','b','b',' ',' '],
//   [' ',' ','b','b','b',' ',' '],
//   [' ',' ','b',' ','b',' ',' '],
//   [' ',' ','T','b','T',' ',' '],
//   [' ',' ','T','b','T',' ',' '],
//   [' ',' ','b',' ','b',' ',' '],
//   [' ','b','b',' ','b','b',' '],
//   [' ','b','T','b','T','b',' '],
//   [' ','b','b',' ','b','b',' '],
//   [' ','b','b',' ','b','b',' '],
//   [' ','7','7',' ','7','7',' '],
//   [' ','7','7',' ','7','7',' '],
//   [' ','7','7',' ','7','7',' '],
//   ['7','7','7',' ','7','7','7'],
//   ['7','7','7',' ','7','7','7'],
//   ['7','7','7',' ','7','7','7'],
//   [' ',' ','5',' ','5',' ',' '],
//   ['5',' ','5',' ','5',' ','5'],
//   ['5',' ','5',' ','5',' ','5'],
//   ['5','7','5','5','5','7','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5','7','5','5','5','7','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   [' ',' ','5','5','5',' ',' '],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5','7','5','5','5','7','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5','7','5','5','5','7','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
//   ['5',' ','5','5','5',' ','5'],
// ];

const blocksPerRow = 7;
const blockWidth = 1;
const blockLength = 4; // 2
const blockHeight = 0.1;
const offsetX = blockWidth * ((blocksPerRow - 1) / 2);

const renderMap = function() {
  const geometry = new THREE.BoxGeometry(blockWidth, blockLength, blockHeight);

  const materials = {
    '3': new THREE.MeshStandardMaterial({ color: 0xC76545 }),
    '5': new THREE.MeshStandardMaterial({ color: 0x8E8EA2 }),
    '7': new THREE.MeshStandardMaterial({ color: 0x7D6955 }),
    'b': new THREE.MeshStandardMaterial({ color: 0x555D65 }),
    'T': new THREE.MeshStandardMaterial({ color: 0xFF3C65 }),
    'e': new THREE.MeshStandardMaterial({ color: 0xFF3C65 }),
    'x': new THREE.MeshStandardMaterial({ color: 0x333355 }),
    'y': new THREE.MeshStandardMaterial({ color: 0x7777aa }),
  };

  // darkMaterial.flatShading = true;

  let rowIndex = 0;

  for (let i = map.length - 1; i >= 0; i--) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      const block = row[j];
      if (block !== ' ') {
        const cube = new THREE.Mesh(geometry, materials[block]);
        cube.position.x = j * blockWidth - offsetX;
        cube.position.y = rowIndex * blockLength;
        cube.position.z = blockHeight / -2;
        cube.receiveShadow = true;
        scene.add(cube);
      }
    }
    rowIndex++;
  }
};


renderMap();

camera.position.z = 2;
camera.position.y = -12;
// camera.position.x = offsetX;

camera.rotation.x = 1.5;

// --- Global properties

const gravity = 0.005;

// --- Lights

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
scene.add(hemisphereLight);

sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(0, 0, 3);
sun.castShadow = true;
scene.add(sun);
scene.add(sun.target);
// Set up shadow properties for the sun light
sun.shadow.mapSize.width = 128;
sun.shadow.mapSize.height = 128;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 100;

// --- Player properties

let bounceValue = 0;
let jumping = false;
let speed = 0;
const maxSpeed = 20;
const minSpeed = 0;
const speedStep = 1;
let speedLastUpdated = -1;

const timeStep = 0.1;

const playerBase = 0.1;

// --- Player model

const playerGeometry = new THREE.BoxGeometry(0.6, 1, 0.2);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff7777 });
playerMaterial.flatShading = true;
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.z = playerBase;
// player.castShadow = true;
scene.add(player);

// --- Multiple keys map

const keys = {};
window.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

// --- Resize, update camera

window.addEventListener('resize', function(e) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

let lastTime = 0;

let fallen = false;
let won = false;

function animate() {
  const timeElapsed = clock.getElapsedTime();
  const framesPassed = (timeElapsed - lastTime) / 0.016;
  const speedTimeElapsed = timeElapsed - speedLastUpdated;

  if (!fallen && !won) {
    if (speedTimeElapsed > timeStep) {
      const relativeSpeedStep = speedStep * speedTimeElapsed / timeStep;

      if (keys[38] && speed < maxSpeed) {
        speed += relativeSpeedStep;
        speed = speed > maxSpeed ? maxSpeed : speed;
      }
      if (keys[40] && speed > minSpeed) {
        speed -= relativeSpeedStep;

        speed = speed < minSpeed ? minSpeed : speed;
      }

      speedLastUpdated = timeElapsed;

    }

    if (keys[37]) {
      player.position.x -= 0.05;
    }
    if (keys[39]) {
      player.position.x += 0.05;
    }

    if (keys[32] && !jumping) {
      jumping = true;
      bounceValue = 0.075;
    }

    if (player.position.z + bounceValue < playerBase) {
      jumping = false;
      bounceValue = 0;
      player.position.z = playerBase;
    }

    player.position.z += bounceValue * framesPassed;
    bounceValue -= gravity * framesPassed;


    const relativeSpeed = (speed / 40) * framesPassed;

    player.position.y += relativeSpeed;
  }
  const relativeSpeed = (speed / 40) * framesPassed;

  camera.position.y += relativeSpeed;
  sun.position.y += relativeSpeed;
  sun.target.position.y += relativeSpeed;

  const x = Math.round(player.position.x / blockWidth + offsetX);
  const row = Math.floor((player.position.y + blockLength / 2) / blockLength);
  const y = map.length - 1 - row;

  const currentBlock = map[y][x];

  const fell = (currentBlock === ' ' || typeof currentBlock === 'undefined') && !jumping;
  const end = currentBlock === 'e';

  if (fell || end) {
    player.position.x = x * blockWidth - offsetX;
    player.position.y = (row) * blockLength; // + blockLength / 2;

    if (fell) {
      player.position.z = playerBase * -2;
      fallen = true;
    } else {
      won = true;
    }
  }


  lastTime = timeElapsed;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
