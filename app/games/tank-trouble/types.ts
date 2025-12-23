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
  exploding?: boolean; // true when bullet is exploding
  explosionStartTime?: number; // timestamp when explosion started
}

export interface Tank {
  x: number;
  y: number;
  angle: number; // in degrees
  lives: number;
  color: 'blue' | 'red';
  exploding?: boolean; // true when tank is exploding
  explosionStartTime?: number; // timestamp when explosion started
  respawning?: boolean; // true when tank is respawning
  respawnStartTime?: number; // timestamp when respawn animation started
  respawnTargetX?: number; // target x position for respawn
  respawnTargetY?: number; // target y position for respawn
  respawnTargetAngle?: number; // target angle for respawn
}

export interface SpawnPosition {
  x: number;
  y: number;
  angle: number;
}

