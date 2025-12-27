// Game Configuration - Modify these values to adjust game rules
export const GAME_CONFIG = {
  // Tank settings (40% bigger)
  tank: {
    size: 24, // 17 * 1.4 = 23.8, rounded to 24
    collisionSize: 10, // 7 * 1.4 = 9.8, rounded to 10
    speed: 1.4, // 1.12 * 1.25 = 1.4 (25% faster)
    rotationSpeed: 5, // degrees per tick (keep same)
    lives: 3,
    spawnOffset: 2, // 4 * 0.5 = 2
  },
  
  // Bullet settings (60% slower - 40% of current speed)
  bullet: {
    speedMultiplier: 1.8 , // Bullet speed = tank speed * this multiplier (60% slower: 2.4 * 0.4 = 0.96)
    maxPerTank: 5,
    maxAge: 7000, // Maximum lifetime in milliseconds (7 seconds)
    fadeDuration: 500, // Fade duration in milliseconds
    radius: 2, // Twice as big: 1 * 2 = 2
    collisionSize: 3, // 5 * 0.5 = 2.5, rounded to 3 
  },
  
  // Game timing
  game: {
    tickRate: 72, // FPS (20% increase: 60 * 1.2 = 72)
    shootingCooldown: 150, // Milliseconds between shots (reduced for rapid fire)
  },
  
  // Sun physics (50% weaker - 50% of current strength)
  sun: {
    gravitationalConstant: 0.25 , // G - Gravitational constant for suns (50% weaker: 0.18 * 0.5 = 0.09)
    mass: 120.0, // Mass of the sun (2x original)
    influenceRadius: 60, // 120 * 0.5 = 60
    minDistance: 2, // 4 * 0.5 = 2
  },
  
  // Visual settings (scaled down by 50% - 50% of current)
  visual: {
    livesIndicatorRadius: 2, // 3 * 0.5 = 1.5, rounded to 2
    livesIndicatorSpacing: 3, // Reduced spacing for closer life indicators (was 4)
    livesIndicatorOffsetX: 3, // 6 * 0.5 = 3
    livesIndicatorOffsetY: -3, // -6 * 0.5 = -3
    uiTextSize: 7, // 13 * 0.5 = 6.5, rounded to 7
    uiTextOffsetX: 4, // 8 * 0.5 = 4
    uiTextOffsetY: 10, // 20 * 0.5 = 10
  },
  
  // Debug flags
  debug: {
    disableSunGravity: true, // When true, disables sun gravity and hides suns (for performance testing)
  },
} as const;

// Derived constants (calculated from config)
export const TANK_SIZE = GAME_CONFIG.tank.size;
export const TANK_COLLISION_SIZE = GAME_CONFIG.tank.collisionSize;
export const TANK_HALF_SIZE = TANK_SIZE / 2; // Commonly used value, compute once
export const TANK_SPEED = GAME_CONFIG.tank.speed;
export const BULLET_SPEED = TANK_SPEED * GAME_CONFIG.bullet.speedMultiplier;
export const ROTATION_SPEED = GAME_CONFIG.tank.rotationSpeed;
export const TICK_RATE = GAME_CONFIG.game.tickRate;
export const TICK_INTERVAL = 1000 / TICK_RATE;
export const MAX_BULLETS_PER_TANK = GAME_CONFIG.bullet.maxPerTank;
export const BULLET_MAX_AGE = GAME_CONFIG.bullet.maxAge;
export const G = GAME_CONFIG.sun.gravitationalConstant;
export const mSun = GAME_CONFIG.sun.mass;
export const SUN_INFLUENCE_RADIUS = GAME_CONFIG.sun.influenceRadius;

