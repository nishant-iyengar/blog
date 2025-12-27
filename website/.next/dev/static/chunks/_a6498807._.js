(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/website/components/BouncingBall.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BouncingBall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
// Physics constants (moved outside component to avoid dependency issues)
const G = 1.0; // Gravitational constant (scaled for simulation)
const mSun = 125.0; // Mass of the sun (proportional to size - sun is 2x ball, so much heavier)
const bounceDebounceMs = 50; // Minimum time between bounces (50ms)
const numSuns = 10; // Number of static suns
const sunDriftSpeed = 0.2; // slower drift speed for suns
const airFriction = 0.01; // Air friction factor (0.01 = 1% velocity loss per application)
const frictionIntervalMs = 12000; // Apply friction every 7 seconds (7000ms)
const maxBallSpeed = 8.0; // Maximum speed cap for the ball (pixels per frame)
function BouncingBall({ ballSize = 12, speed = 4 }) {
    _s();
    const ballRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const positionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 100,
        y: 100
    });
    const velocityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: speed,
        y: speed
    });
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sunPositions, setSunPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const sunPositionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const sunVelocitiesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]); // Velocities for each sun
    const lastBounceTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0); // Timestamp of last bounce
    const lastFrictionTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0); // Timestamp of last friction application
    const sunSize = ballSize * 2; // Sun is 2x the ball size
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BouncingBall.useEffect": ()=>{
            const checkMobile = {
                "BouncingBall.useEffect.checkMobile": ()=>{
                    setIsMobile(window.innerWidth < 768); // md breakpoint
                    // Reposition ball if it goes out of bounds after resize
                    const ball = ballRef.current;
                    if (ball) {
                        const sidebar = document.querySelector('aside');
                        const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
                        const mobileNav = document.querySelector('nav.md\\:hidden');
                        const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
                        const boundaries = {
                            left: sidebarWidth,
                            right: window.innerWidth,
                            top: navBarHeight,
                            bottom: window.innerHeight
                        };
                        // Clamp position to valid bounds
                        positionRef.current = {
                            x: Math.max(boundaries.left, Math.min(boundaries.right - ballSize, positionRef.current.x)),
                            y: Math.max(boundaries.top, Math.min(boundaries.bottom - ballSize, positionRef.current.y))
                        };
                    }
                }
            }["BouncingBall.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "BouncingBall.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["BouncingBall.useEffect"];
        }
    }["BouncingBall.useEffect"], [
        ballSize
    ]);
    // Generate random sun positions on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BouncingBall.useEffect": ()=>{
            const generateSunPositions = {
                "BouncingBall.useEffect.generateSunPositions": ()=>{
                    const sidebar = document.querySelector('aside');
                    const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
                    const mobileNav = document.querySelector('nav.md\\:hidden');
                    const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
                    const boundaries = {
                        left: sidebarWidth + sunSize,
                        right: window.innerWidth - sunSize,
                        top: navBarHeight + sunSize,
                        bottom: window.innerHeight - sunSize
                    };
                    // Get all tiles to avoid placing suns on them
                    const allTiles = document.querySelectorAll('[data-post-tile], [data-photo-tile], [data-article-tile]');
                    const tileRects = [];
                    allTiles.forEach({
                        "BouncingBall.useEffect.generateSunPositions": (tile)=>{
                            const rect = tile.getBoundingClientRect();
                            tileRects.push({
                                x: rect.left,
                                y: rect.top,
                                width: rect.width,
                                height: rect.height
                            });
                        }
                    }["BouncingBall.useEffect.generateSunPositions"]);
                    // Check if a position overlaps with any tile
                    const isPositionValid = {
                        "BouncingBall.useEffect.generateSunPositions.isPositionValid": (x, y)=>{
                            const sunRadius = sunSize / 2;
                            const margin = 5; // Extra margin to keep suns away from tiles
                            for (const tile of tileRects){
                                // Check if sun center is within tile bounds (with margin)
                                const sunLeft = x - sunRadius - margin;
                                const sunRight = x + sunRadius + margin;
                                const sunTop = y - sunRadius - margin;
                                const sunBottom = y + sunRadius + margin;
                                // Check for overlap
                                if (sunRight >= tile.x && sunLeft <= tile.x + tile.width && sunBottom >= tile.y && sunTop <= tile.y + tile.height) {
                                    return false; // Overlaps with a tile
                                }
                            }
                            return true; // Position is valid
                        }
                    }["BouncingBall.useEffect.generateSunPositions.isPositionValid"];
                    const positions = [];
                    const velocities = [];
                    const maxAttempts = 100; // Maximum attempts to find a valid position
                    for(let i = 0; i < numSuns; i++){
                        let attempts = 0;
                        let validPosition = false;
                        let x = 0;
                        let y = 0;
                        // Keep trying until we find a valid position or hit max attempts
                        while(!validPosition && attempts < maxAttempts){
                            x = boundaries.left + Math.random() * (boundaries.right - boundaries.left);
                            y = boundaries.top + Math.random() * (boundaries.bottom - boundaries.top);
                            if (isPositionValid(x, y)) {
                                validPosition = true;
                            }
                            attempts++;
                        }
                        // Add position even if we hit max attempts (fallback)
                        if (validPosition || attempts >= maxAttempts) {
                            positions.push({
                                x,
                                y
                            });
                            // Initialize random velocity (very slow, random direction)
                            const angle = Math.random() * Math.PI * 2; // Random angle in radians
                            velocities.push({
                                x: Math.cos(angle) * sunDriftSpeed,
                                y: Math.sin(angle) * sunDriftSpeed
                            });
                        }
                    }
                    return {
                        positions,
                        velocities
                    };
                }
            }["BouncingBall.useEffect.generateSunPositions"];
            const { positions, velocities } = generateSunPositions();
            setSunPositions(positions);
            sunPositionsRef.current = positions;
            sunVelocitiesRef.current = velocities;
            // Adjust positions on resize (preserve existing positions, just clamp to new boundaries)
            const handleResize = {
                "BouncingBall.useEffect.handleResize": ()=>{
                    const sidebar = document.querySelector('aside');
                    const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
                    const mobileNav = document.querySelector('nav.md\\:hidden');
                    const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
                    const boundaries = {
                        left: sidebarWidth + sunSize,
                        right: window.innerWidth - sunSize,
                        top: navBarHeight + sunSize,
                        bottom: window.innerHeight - sunSize
                    };
                    const sunRadius = sunSize / 2;
                    // Clamp existing positions to new boundaries
                    const adjustedPositions = sunPositionsRef.current.map({
                        "BouncingBall.useEffect.handleResize.adjustedPositions": (pos)=>({
                                x: Math.max(boundaries.left + sunRadius, Math.min(boundaries.right - sunRadius, pos.x)),
                                y: Math.max(boundaries.top + sunRadius, Math.min(boundaries.bottom - sunRadius, pos.y))
                            })
                    }["BouncingBall.useEffect.handleResize.adjustedPositions"]);
                    setSunPositions(adjustedPositions);
                    sunPositionsRef.current = adjustedPositions;
                // Keep velocities unchanged
                }
            }["BouncingBall.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "BouncingBall.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["BouncingBall.useEffect"];
        }
    }["BouncingBall.useEffect"], [
        sunSize,
        numSuns
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BouncingBall.useEffect": ()=>{
            const ball = ballRef.current;
            if (!ball) return;
            const getBoundaries = {
                "BouncingBall.useEffect.getBoundaries": ()=>{
                    // Dynamically detect sidebar width
                    const sidebar = document.querySelector('aside');
                    const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
                    // Dynamically detect navigation bar height (mobile nav bar at top)
                    const mobileNav = document.querySelector('nav.md\\:hidden');
                    const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
                    return {
                        left: sidebarWidth,
                        right: window.innerWidth,
                        top: navBarHeight,
                        bottom: window.innerHeight
                    };
                }
            }["BouncingBall.useEffect.getBoundaries"];
            const getPostTilePositions = {
                "BouncingBall.useEffect.getPostTilePositions": ()=>{
                    const tiles = [];
                    // Get all tiles: post tiles, photo tiles (animals and photos), and article tiles
                    const allTiles = document.querySelectorAll('[data-post-tile], [data-photo-tile], [data-article-tile]');
                    allTiles.forEach({
                        "BouncingBall.useEffect.getPostTilePositions": (tile)=>{
                            const rect = tile.getBoundingClientRect();
                            tiles.push({
                                x: rect.left,
                                y: rect.top,
                                width: rect.width,
                                height: rect.height
                            });
                        }
                    }["BouncingBall.useEffect.getPostTilePositions"]);
                    return tiles;
                }
            }["BouncingBall.useEffect.getPostTilePositions"];
            const checkCollisionWithTile = {
                "BouncingBall.useEffect.checkCollisionWithTile": (ballX, ballY, tile)=>{
                    const ballRadius = ballSize / 2;
                    const ballCenterX = ballX + ballRadius;
                    const ballCenterY = ballY + ballRadius;
                    // Find the closest point on the tile rectangle to the ball center
                    const closestX = Math.max(tile.x, Math.min(ballCenterX, tile.x + tile.width));
                    const closestY = Math.max(tile.y, Math.min(ballCenterY, tile.y + tile.height));
                    // Calculate distance from ball center to closest point
                    const dx = ballCenterX - closestX;
                    const dy = ballCenterY - closestY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    // Check if ball is colliding (distance <= radius)
                    if (distance > ballRadius) {
                        return {
                            hit: false
                        };
                    }
                    // Determine which side the collision is on
                    // Check if we're near a corner or an edge
                    const margin = 2; // Small margin for edge detection
                    const distToLeft = Math.abs(ballCenterX - tile.x);
                    const distToRight = Math.abs(ballCenterX - (tile.x + tile.width));
                    const distToTop = Math.abs(ballCenterY - tile.y);
                    const distToBottom = Math.abs(ballCenterY - (tile.y + tile.height));
                    // If ball is within the tile bounds, determine exit direction based on velocity
                    const isInsideX = ballCenterX >= tile.x && ballCenterX <= tile.x + tile.width;
                    const isInsideY = ballCenterY >= tile.y && ballCenterY <= tile.y + tile.height;
                    if (isInsideX && isInsideY) {
                        // Ball is inside tile, bounce based on which edge is closest
                        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
                        if (minDist === distToLeft) return {
                            hit: true,
                            side: 'left'
                        };
                        if (minDist === distToRight) return {
                            hit: true,
                            side: 'right'
                        };
                        if (minDist === distToTop) return {
                            hit: true,
                            side: 'top'
                        };
                        if (minDist === distToBottom) return {
                            hit: true,
                            side: 'bottom'
                        };
                    }
                    // Ball is outside but colliding, determine which edge
                    if (distToLeft < margin && ballCenterY >= tile.y && ballCenterY <= tile.y + tile.height) {
                        return {
                            hit: true,
                            side: 'left'
                        };
                    }
                    if (distToRight < margin && ballCenterY >= tile.y && ballCenterY <= tile.y + tile.height) {
                        return {
                            hit: true,
                            side: 'right'
                        };
                    }
                    if (distToTop < margin && ballCenterX >= tile.x && ballCenterX <= tile.x + tile.width) {
                        return {
                            hit: true,
                            side: 'top'
                        };
                    }
                    if (distToBottom < margin && ballCenterX >= tile.x && ballCenterX <= tile.x + tile.width) {
                        return {
                            hit: true,
                            side: 'bottom'
                        };
                    }
                    // Default to closest edge
                    const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
                    if (minDist === distToLeft) return {
                        hit: true,
                        side: 'left'
                    };
                    if (minDist === distToRight) return {
                        hit: true,
                        side: 'right'
                    };
                    if (minDist === distToTop) return {
                        hit: true,
                        side: 'top'
                    };
                    if (minDist === distToBottom) return {
                        hit: true,
                        side: 'bottom'
                    };
                    return {
                        hit: false
                    };
                }
            }["BouncingBall.useEffect.checkCollisionWithTile"];
            const animate = {
                "BouncingBall.useEffect.animate": ()=>{
                    const boundaries = getBoundaries();
                    const tiles = getPostTilePositions();
                    // Update sun positions (drift and bounce)
                    if (sunPositionsRef.current.length > 0 && sunVelocitiesRef.current.length > 0) {
                        for(let i = 0; i < sunPositionsRef.current.length; i++){
                            const sun = sunPositionsRef.current[i];
                            const velocity = sunVelocitiesRef.current[i];
                            // Update position
                            let newSunX = sun.x + velocity.x;
                            let newSunY = sun.y + velocity.y;
                            // Bounce off boundaries
                            const sunRadius = sunSize / 2;
                            if (newSunX - sunRadius <= boundaries.left) {
                                newSunX = boundaries.left + sunRadius;
                                sunVelocitiesRef.current[i].x = -velocity.x;
                            } else if (newSunX + sunRadius >= boundaries.right) {
                                newSunX = boundaries.right - sunRadius;
                                sunVelocitiesRef.current[i].x = -velocity.x;
                            }
                            if (newSunY - sunRadius <= boundaries.top) {
                                newSunY = boundaries.top + sunRadius;
                                sunVelocitiesRef.current[i].y = -velocity.y;
                            } else if (newSunY + sunRadius >= boundaries.bottom) {
                                newSunY = boundaries.bottom - sunRadius;
                                sunVelocitiesRef.current[i].y = -velocity.y;
                            }
                            // Update sun position
                            sunPositionsRef.current[i] = {
                                x: newSunX,
                                y: newSunY
                            };
                        }
                        // Update state for rendering (only update positions, not velocities)
                        setSunPositions([
                            ...sunPositionsRef.current
                        ]);
                    }
                    // Apply gravitational force from all static suns
                    const ballRadius = ballSize / 2;
                    const ballCenterX = positionRef.current.x + ballRadius;
                    const ballCenterY = positionRef.current.y + ballRadius;
                    // Sum up gravitational forces from all suns
                    let totalAccelerationX = 0;
                    let totalAccelerationY = 0;
                    // Only calculate gravity if we have sun positions
                    if (sunPositionsRef.current.length > 0) {
                        for (const sunPos of sunPositionsRef.current){
                            const sunCenterX = sunPos.x;
                            const sunCenterY = sunPos.y;
                            // Calculate distance and direction from ball to sun
                            const dx = sunCenterX - ballCenterX;
                            const dy = sunCenterY - ballCenterY;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            // Apply gravitational force using Newton's Law: F = G * (m1 * m2) / r^2
                            // Acceleration of ball: a = F / m_ball = G * m_sun / r^2
                            // Use minimum distance to prevent infinite acceleration
                            const minDistance = 10;
                            const effectiveDistance = Math.max(distance, minDistance);
                            const distanceSquared = effectiveDistance * effectiveDistance;
                            // Calculate gravitational acceleration: a = G * m_sun / r^2
                            const gravitationalAcceleration = G * mSun / distanceSquared;
                            // Normalize direction vector (from ball to sun)
                            if (distance > 0) {
                                const directionX = dx / distance;
                                const directionY = dy / distance;
                                // Accumulate acceleration from this sun
                                totalAccelerationX += directionX * gravitationalAcceleration;
                                totalAccelerationY += directionY * gravitationalAcceleration;
                            }
                        }
                    }
                    // Apply total gravitational acceleration to velocity
                    velocityRef.current.x += totalAccelerationX;
                    velocityRef.current.y += totalAccelerationY;
                    // Apply air friction every 2-3 seconds to prevent infinite acceleration
                    const now = Date.now();
                    if (now - lastFrictionTimeRef.current >= frictionIntervalMs) {
                        velocityRef.current.x *= 1 - airFriction;
                        velocityRef.current.y *= 1 - airFriction;
                        lastFrictionTimeRef.current = now;
                    }
                    // Clamp velocity to maximum speed
                    const currentSpeed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y);
                    if (currentSpeed > maxBallSpeed) {
                        const scale = maxBallSpeed / currentSpeed;
                        velocityRef.current.x *= scale;
                        velocityRef.current.y *= scale;
                    }
                    let newX = positionRef.current.x + velocityRef.current.x;
                    let newY = positionRef.current.y + velocityRef.current.y;
                    // Check collisions with suns (circular collision detection)
                    const sunRadius = sunSize / 2;
                    const combinedRadius = ballRadius + sunRadius;
                    if (sunPositionsRef.current.length > 0) {
                        for (const sunPos of sunPositionsRef.current){
                            const sunCenterX = sunPos.x;
                            const sunCenterY = sunPos.y;
                            const ballCenterX = newX + ballRadius;
                            const ballCenterY = newY + ballRadius;
                            // Calculate distance between ball and sun centers
                            const dx = sunCenterX - ballCenterX;
                            const dy = sunCenterY - ballCenterY;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            // Check if colliding (distance < sum of radii)
                            if (distance < combinedRadius && distance > 0) {
                                // Calculate collision normal (from ball to sun)
                                const normalX = dx / distance;
                                const normalY = dy / distance;
                                // Reflect velocity off the sun's surface
                                // Dot product of velocity and normal
                                const dotProduct = velocityRef.current.x * normalX + velocityRef.current.y * normalY;
                                // Reflect: v' = v - 2 * (v · n) * n
                                velocityRef.current.x -= 2 * dotProduct * normalX;
                                velocityRef.current.y -= 2 * dotProduct * normalY;
                                // Push ball away from sun to prevent overlap
                                const overlap = combinedRadius - distance;
                                newX -= normalX * overlap;
                                newY -= normalY * overlap;
                                break; // Only handle one sun collision per frame
                            }
                        }
                    }
                    // Check collisions with window boundaries (with debounce)
                    const currentTime = Date.now();
                    const timeSinceLastBounce = currentTime - lastBounceTimeRef.current;
                    if (newX <= boundaries.left && timeSinceLastBounce >= bounceDebounceMs) {
                        newX = boundaries.left;
                        velocityRef.current.x = -velocityRef.current.x;
                        lastBounceTimeRef.current = currentTime;
                    } else if (newX + ballSize >= boundaries.right && timeSinceLastBounce >= bounceDebounceMs) {
                        newX = boundaries.right - ballSize;
                        velocityRef.current.x = -velocityRef.current.x;
                        lastBounceTimeRef.current = currentTime;
                    }
                    if (newY <= boundaries.top && timeSinceLastBounce >= bounceDebounceMs) {
                        newY = boundaries.top;
                        velocityRef.current.y = -velocityRef.current.y;
                        lastBounceTimeRef.current = currentTime;
                    } else if (newY + ballSize >= boundaries.bottom && timeSinceLastBounce >= bounceDebounceMs) {
                        newY = boundaries.bottom - ballSize;
                        velocityRef.current.y = -velocityRef.current.y;
                        lastBounceTimeRef.current = currentTime;
                    }
                    // Check collisions with PostTiles (with debounce)
                    const currentTimeForTiles = Date.now();
                    const timeSinceLastBounceForTiles = currentTimeForTiles - lastBounceTimeRef.current;
                    if (timeSinceLastBounceForTiles >= bounceDebounceMs) {
                        for (const tile of tiles){
                            const collision = checkCollisionWithTile(newX, newY, tile);
                            if (collision.hit) {
                                lastBounceTimeRef.current = currentTimeForTiles;
                                if (collision.side === 'left' || collision.side === 'right') {
                                    velocityRef.current.x = -velocityRef.current.x;
                                    // Adjust position to prevent ball from going into tile
                                    if (collision.side === 'left') {
                                        newX = tile.x - ballSize - 1;
                                    } else {
                                        newX = tile.x + tile.width + 1;
                                    }
                                } else if (collision.side === 'top' || collision.side === 'bottom') {
                                    velocityRef.current.y = -velocityRef.current.y;
                                    // Adjust position to prevent ball from going into tile
                                    if (collision.side === 'top') {
                                        newY = tile.y - ballSize - 1;
                                    } else {
                                        newY = tile.y + tile.height + 1;
                                    }
                                }
                                break; // Only handle one collision per frame
                            }
                        }
                    }
                    positionRef.current = {
                        x: newX,
                        y: newY
                    };
                    ball.style.left = `${newX}px`;
                    ball.style.top = `${newY}px`;
                    // Initialize position on first frame if not set
                    if (positionRef.current.x === 100 && positionRef.current.y === 100) {
                        positionRef.current = {
                            x: Math.max(boundaries.left + 10, Math.min(boundaries.right - ballSize - 10, positionRef.current.x)),
                            y: Math.max(boundaries.top + 10, Math.min(boundaries.bottom - ballSize - 10, positionRef.current.y))
                        };
                        ball.style.left = `${positionRef.current.x}px`;
                        ball.style.top = `${positionRef.current.y}px`;
                    }
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            }["BouncingBall.useEffect.animate"];
            // Initialize position - will be set on first animate call
            animationFrameRef.current = requestAnimationFrame(animate);
            return ({
                "BouncingBall.useEffect": ()=>{
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                    }
                }
            })["BouncingBall.useEffect"];
        }
    }["BouncingBall.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ballRef,
                className: "fixed z-50 rounded-full bg-[#629C77] pointer-events-none",
                style: {
                    width: `${ballSize}px`,
                    height: `${ballSize}px`,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }
            }, void 0, false, {
                fileName: "[project]/website/components/BouncingBall.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, this),
            sunPositions.map((sunPos, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed z-40 pointer-events-none",
                    style: {
                        width: `${sunSize}px`,
                        height: `${sunSize}px`,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(98, 156, 119, 0.75)',
                        boxShadow: '0 0 10px rgba(98, 156, 119, 0.5)',
                        transform: 'translate(-50%, -50%)',
                        left: `${sunPos.x}px`,
                        top: `${sunPos.y}px`,
                        border: 'none',
                        outline: 'none'
                    }
                }, index, false, {
                    fileName: "[project]/website/components/BouncingBall.tsx",
                    lineNumber: 537,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true);
}
_s(BouncingBall, "hYUb5eqo/gcmBoUAgeYlc7eQizM=");
_c = BouncingBall;
var _c;
__turbopack_context__.k.register(_c, "BouncingBall");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/components/ConditionalBouncingBall.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConditionalBouncingBall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$BouncingBall$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/components/BouncingBall.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ConditionalBouncingBall() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isGamesPage = pathname.startsWith('/games');
    if (isGamesPage) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$BouncingBall$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/website/components/ConditionalBouncingBall.tsx",
        lineNumber: 14,
        columnNumber: 10
    }, this);
}
_s(ConditionalBouncingBall, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ConditionalBouncingBall;
var _c;
__turbopack_context__.k.register(_c, "ConditionalBouncingBall");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_a6498807._.js.map