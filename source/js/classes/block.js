import {
  BoxGeometry,
  ExtrudeBufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Shape,
} from 'three';

import {
  heights,
  specialColors,
  BLOCK_WIDTH,
  BLOCK_LENGTH,
  MIN_BLOCK_HEIGHT,
} from 'constants/block';


const TUNNEL_THICKNESS = 0.05;

const points = 10;
const angles = [];
const segmentCount = points - 1;
const segmentAngle = Math.PI / segmentCount;

for (let i = 0; i < points; i++) {
  const a = i * segmentAngle;

  angles[i] = {
    sin: Math.sin(a),
    cos: Math.cos(a),
  };
}

function extrude(shape, tunnelColors) {
  const extrudeSettings = {
    amount: BLOCK_LENGTH,
    bevelEnabled: false,
  };

  const geometry = new ExtrudeBufferGeometry(shape, extrudeSettings);

  const materials = Array.isArray(tunnelColors) ?
    tunnelColors.map(color => new MeshStandardMaterial({ color, wireframe: false })) :
    new MeshStandardMaterial({ color: tunnelColors, wireframe: false });

  const mesh = new Mesh(geometry, materials);

  mesh.rotation.x = Math.PI / 2;
  mesh.rotation.z = Math.PI / 2;

  mesh.position.y = BLOCK_LENGTH;
  mesh.position.x = BLOCK_WIDTH / 2;

  return mesh;
}

function getTunnel(tunnelColors) {
  const r = BLOCK_WIDTH / 2;
  const innerR = r - TUNNEL_THICKNESS;

  const shape = new Shape();

  shape.moveTo(r * angles[0].sin, r * angles[0].cos);

  for (let i = 1; i < points; i++) {
    shape.lineTo(r * angles[i].sin, r * angles[i].cos);
  }

  for (let i = points - 1; i >= 0; i--) {
    shape.lineTo(innerR * angles[i].sin, innerR * angles[i].cos);
  }

  return extrude(shape, tunnelColors);
}

function getTunnelBlock(height, tunnelColors) {
  const r = (BLOCK_WIDTH / 2) - TUNNEL_THICKNESS;
  const shape = new Shape();

  shape.moveTo(0, BLOCK_WIDTH / -2);
  shape.lineTo(height, BLOCK_WIDTH / -2);
  shape.lineTo(height, BLOCK_WIDTH / 2);
  shape.lineTo(0, BLOCK_WIDTH / 2);

  for (let i = 0; i < points; i++) {
    shape.lineTo(r * angles[i].sin, r * angles[i].cos);
  }

  return extrude(shape, tunnelColors);
}

function getSolidBlock(options = {
  color: 0x7777aa,
  height: heights.BASE,
}) {
  const {
    color,
    height,
  } = options;
  const geometry = new BoxGeometry(BLOCK_WIDTH, BLOCK_LENGTH, height);
  const material = new MeshStandardMaterial({ color, wireframe: false });

  const zOffset = (height / 2) - MIN_BLOCK_HEIGHT;

  const mesh = new Mesh(geometry, material);

  mesh.position.set(BLOCK_WIDTH / 2, BLOCK_LENGTH / 2, zOffset);

  return mesh;
}

export default function getBlock(blockOptions = {
  color: 0x7777aa,
  floor: true,
  height: heights.BASE,
  tunnel: true,
  tunnelColors: [0x6666bb, 0x9999ff],
  // special: special.BURNING,
  special: null,
}, position = {
  x: 0,
  y: 0,
}) {
  const group = new Group();

  if (blockOptions.tunnel) {
    const tunnel = blockOptions.height === heights.BASE ?
      getTunnel(blockOptions.tunnelColors) :
      getTunnelBlock(blockOptions.height, blockOptions.tunnelColors);

    group.add(tunnel);

    if (blockOptions.floor) {
      const floor = getSolidBlock({
        height: MIN_BLOCK_HEIGHT,
        color: blockOptions.special ? specialColors[blockOptions.special] : blockOptions.color,
      });

      group.add(floor);
    }
  } else {
    const height = blockOptions.height + MIN_BLOCK_HEIGHT;

    const block = getSolidBlock({
      height,
      color: blockOptions.special ? specialColors[blockOptions.special] : blockOptions.color,
    });

    group.add(block);
  }


  group.position.x = position.x * BLOCK_WIDTH;
  group.position.y = position.y * BLOCK_LENGTH;

  return group;
}


// scene.add(getBlock());
// scene.add(getBlock(blockOptions = {
//   color: 0x3355aa,
//   height: heights.BASE,
//   position: {
//     x: 1,
//     y: 0,
//   },
// }));
// scene.add(getBlock(blockOptions = {
//   color: 0x7777aa,
//   height: heights.BASE,
//   position: {
//     x: 1,
//     y: 1,
//   },
// }));
// scene.add(getBlock(blockOptions = {
//   color: 0x7777aa,
//   height: heights.BASE,
//   position: {
//     x: 2,
//     y: 0,
//   },
// }));
// scene.add(getBlock(blockOptions = {
//   color: 0x7777aa,
//   height: heights.BASE,
//   position: {
//     x: 2,
//     y: 1,
//   },
// }));
// scene.add(getBlock(blockOptions = {
//   color: 0x7777aa,
//   height: heights.BASE,
//   position: {
//     x: 3,
//     y: 0,
//   },
// }));
// scene.add(getBlock(blockOptions = {
//   color: 0x7777aa,
//   height: heights.FULL,
//   tunnel: true,
//   tunnelColors: [0x7777aa, 0x9999ff],
//   position: {
//     x: 3,
//     y: 1,
//   },
// }));
