export interface Barrier {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Sun {
  x: number;
  y: number;
  size: number;
}

export interface TankTroubleMapData {
  width: number;
  height: number;
  barriers: Barrier[];
  suns?: Sun[];
  spawnPoints: Array<{ x: number; y: number; angle: number }>;
}

export interface Bullet {
  x: number;
  y: number;
  angle: number;
  speed: number;
  owner: 'blue' | 'red';
  createdAt: number; // timestamp in milliseconds
  vx: number; // velocity x component (for sun physics)
  vy: number; // velocity y component (for sun physics)
}

export interface Tank {
  x: number;
  y: number;
  angle: number; // in degrees
  lives: number;
  color: 'blue' | 'red';
}

export interface SpawnPosition {
  x: number;
  y: number;
  angle: number;
}

