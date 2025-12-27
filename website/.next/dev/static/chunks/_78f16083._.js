(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/website/components/Navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Navigation() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isBlogPosts = pathname === '/' || pathname.startsWith('/posts/');
    const isPhotos = pathname === '/photos';
    const isAnimals = pathname === '/animals';
    const isGames = pathname.startsWith('/games');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "flex flex-row md:flex-col gap-2 md:gap-4 justify-center md:justify-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: `px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${isBlogPosts ? 'bg-[#629C77] !text-white' : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'}`,
                children: "Posts"
            }, void 0, false, {
                fileName: "[project]/website/components/Navigation.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/photos",
                className: `px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${isPhotos ? 'bg-[#629C77] !text-white' : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'}`,
                children: "Photos"
            }, void 0, false, {
                fileName: "[project]/website/components/Navigation.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/animals",
                className: `px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${isAnimals ? 'bg-[#629C77] !text-white' : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'}`,
                children: "Animals"
            }, void 0, false, {
                fileName: "[project]/website/components/Navigation.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/games",
                className: `hidden md:block px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${isGames ? 'bg-[#629C77] !text-white' : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'}`,
                children: "Games"
            }, void 0, false, {
                fileName: "[project]/website/components/Navigation.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/website/components/Navigation.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(Navigation, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/components/Navigation.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Sidebar() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sidebarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startXRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const handleMouseMove = {
                "Sidebar.useEffect.handleMouseMove": (e)=>{
                    if (!isDragging || !sidebarRef.current) return;
                    const deltaX = e.clientX - startXRef.current;
                    const threshold = 30; // Minimum drag distance
                    if (isOpen) {
                        // If open, dragging left closes it
                        if (deltaX < -threshold) {
                            setIsOpen(false);
                            setIsDragging(false);
                        }
                    } else {
                        // If closed, dragging right opens it
                        if (deltaX > threshold) {
                            setIsOpen(true);
                            setIsDragging(false);
                        }
                    }
                }
            }["Sidebar.useEffect.handleMouseMove"];
            const handleMouseUp = {
                "Sidebar.useEffect.handleMouseUp": ()=>{
                    setIsDragging(false);
                }
            }["Sidebar.useEffect.handleMouseUp"];
            if (isDragging) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                document.body.style.cursor = 'ew-resize';
                document.body.style.userSelect = 'none';
            }
            return ({
                "Sidebar.useEffect": ()=>{
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    document.body.style.cursor = '';
                    document.body.style.userSelect = '';
                }
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], [
        isDragging,
        isOpen
    ]);
    const handleMouseDown = (e)=>{
        e.preventDefault();
        startXRef.current = e.clientX;
        setIsDragging(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "md:hidden w-full bg-[#EDF2F7] border-b border-[#E2E8F0] px-2 py-2 fixed top-0 left-0 right-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/website/components/Sidebar.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/components/Sidebar.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                ref: sidebarRef,
                className: `hidden md:block relative transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0'} min-h-screen bg-[#EDF2F7] border-r border-[#E2E8F0] overflow-hidden`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `h-full p-6 ${isOpen ? 'opacity-100' : 'opacity-0'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/website/components/Sidebar.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/website/components/Sidebar.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseDown: handleMouseDown,
                        className: `absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-[#629C77]/30 transition-colors ${isOpen ? 'block' : 'hidden'}`,
                        style: {
                            zIndex: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/website/components/Sidebar.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/website/components/Sidebar.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(true),
                className: "hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-20 bg-[#EDF2F7] border-r border-[#E2E8F0] px-2 py-4 rounded-r-lg hover:bg-[#629C77] hover:text-white transition-colors",
                "aria-label": "Open sidebar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M9 5l7 7-7 7"
                    }, void 0, false, {
                        fileName: "[project]/website/components/Sidebar.tsx",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/website/components/Sidebar.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/components/Sidebar.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(Sidebar, "ng1TbWFaSFFTzHVTXaBouW3xcZg=");
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/shared/content/games/tank-trouble-map.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"width":480,"height":360,"barriers":[{"x":60,"y":60,"width":120,"height":18},{"x":300,"y":60,"width":120,"height":18},{"x":60,"y":282,"width":120,"height":18},{"x":300,"y":282,"width":120,"height":18}],"spawnPoints":[{"x":90,"y":90,"angle":0},{"x":408,"y":240,"angle":180}]});}),
"[project]/website/lib/type-guards.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Type Guard Utilities
 * 
 * Generic type guard functions to reduce duplicate validation logic
 * and provide consistent error handling throughout the codebase.
 */ /**
 * Generic type guard function that validates a value and throws an error if invalid
 * 
 * @param value - The value to validate
 * @param guard - A type guard function that returns true if value is valid
 * @param errorMessage - Error message to throw if validation fails
 * @returns The validated value with proper type
 * 
 * @example
 * const num = assertType(unknownValue, (v): v is number => typeof v === 'number', 'Expected number');
 */ __turbopack_context__.s([
    "assertType",
    ()=>assertType,
    "hasProperties",
    ()=>hasProperties,
    "hasProperty",
    ()=>hasProperty,
    "hasPropertyOfType",
    ()=>hasPropertyOfType,
    "is2DNumberArray",
    ()=>is2DNumberArray,
    "isArray",
    ()=>isArray,
    "isEnumValue",
    ()=>isEnumValue,
    "isError",
    ()=>isError,
    "isInRange",
    ()=>isInRange,
    "isInstanceOf",
    ()=>isInstanceOf,
    "isKeyOf",
    ()=>isKeyOf,
    "isNonNegativeNumber",
    ()=>isNonNegativeNumber,
    "isNotNull",
    ()=>isNotNull,
    "isNumber",
    ()=>isNumber,
    "isNumberArray",
    ()=>isNumberArray,
    "isObject",
    ()=>isObject,
    "isPositiveNumber",
    ()=>isPositiveNumber,
    "isString",
    ()=>isString,
    "isValidArrayLength",
    ()=>isValidArrayLength,
    "parseAndValidate",
    ()=>parseAndValidate,
    "satisfiesAll",
    ()=>satisfiesAll,
    "satisfiesAny",
    ()=>satisfiesAny
]);
function assertType(value, guard, errorMessage) {
    if (!guard(value)) {
        throw new Error(errorMessage);
    }
    return value;
}
function isNotNull(value) {
    return value !== null && value !== undefined;
}
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
function isString(value) {
    return typeof value === 'string';
}
function isArray(value, elementGuard) {
    if (!Array.isArray(value)) {
        return false;
    }
    if (elementGuard) {
        return value.every(elementGuard);
    }
    return true;
}
function isNumberArray(value) {
    return Array.isArray(value) && value.every((item)=>typeof item === 'number' && !isNaN(item));
}
function is2DNumberArray(value) {
    return Array.isArray(value) && value.length > 0 && value.every((row)=>Array.isArray(row) && row.every((item)=>typeof item === 'number' && !isNaN(item)));
}
function isInstanceOf(value, constructor) {
    return value instanceof constructor;
}
function isError(value) {
    return value instanceof Error;
}
function hasProperty(value, key) {
    return isObject(value) && key in value;
}
function hasProperties(value, keys) {
    if (!isObject(value)) {
        return false;
    }
    return keys.every((key)=>key in value);
}
function hasPropertyOfType(value, key, guard) {
    if (!hasProperty(value, key)) {
        return false;
    }
    return guard(value[key]);
}
function satisfiesAll(value, ...guards) {
    return guards.every((guard)=>guard(value));
}
function satisfiesAny(value, ...guards) {
    return guards.some((guard)=>guard(value));
}
function isInRange(value, min, max) {
    return value >= min && value <= max;
}
function isEnumValue(value, enumObject) {
    return typeof value === 'string' && Object.values(enumObject).includes(value);
}
function isKeyOf(key, validKeys) {
    return typeof key === 'string' && validKeys.includes(key);
}
function parseAndValidate(json, guard, errorMessage) {
    let parsed;
    if (typeof json === 'string') {
        try {
            parsed = JSON.parse(json);
        } catch  {
            throw new Error(`Invalid JSON: ${errorMessage}`);
        }
    } else {
        // If already an object, use JSON round-trip to create clean copy
        try {
            const jsonString = JSON.stringify(json);
            parsed = JSON.parse(jsonString);
        } catch  {
            throw new Error(`Failed to serialize: ${errorMessage}`);
        }
    }
    return assertType(parsed, guard, errorMessage);
}
function isValidArrayLength(value) {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}
function isPositiveNumber(value) {
    return isNumber(value) && value > 0;
}
function isNonNegativeNumber(value) {
    return isNumber(value) && value >= 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/hooks/useGameInput.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGameInput",
    ()=>useGameInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
// Pre-compute game keys as Set for O(1) lookup instead of O(n) array.includes()
const GAME_KEYS_SET = new Set([
    'arrowup',
    'arrowdown',
    'arrowleft',
    'arrowright',
    ' ',
    'w',
    'a',
    's',
    'd',
    'q',
    'p'
]);
function useGameInput(options) {
    _s();
    const keysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const gameOverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(options?.gameOver ?? false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGameInput.useEffect": ()=>{
            gameOverRef.current = options?.gameOver ?? false;
        }
    }["useGameInput.useEffect"], [
        options?.gameOver
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGameInput.useEffect": ()=>{
            const handleKeyDown = {
                "useGameInput.useEffect.handleKeyDown": (e)=>{
                    // Skip processing if game is over
                    if (gameOverRef.current) {
                        return;
                    }
                    // Normalize key to lowercase, handle special cases
                    let key;
                    // Handle space key
                    if (e.key === ' ' || e.code === 'Space') {
                        key = ' ';
                    } else if (e.key.startsWith('Arrow') || e.code.startsWith('Arrow')) {
                        const arrowDir = e.key.replace('Arrow', '').toLowerCase() || e.code.replace('Arrow', '').toLowerCase();
                        key = `arrow${arrowDir}`;
                    } else {
                        // e.code gives "KeyP", "KeyW", etc. - remove "Key" prefix
                        if (e.code.startsWith('Key')) {
                            key = e.code.replace('Key', '').toLowerCase(); // 'KeyW' -> 'w', 'KeyP' -> 'p', etc.
                        } else {
                            key = e.key.toLowerCase();
                        }
                    }
                    // Use Set for O(1) lookup instead of O(n) array.includes()
                    if (GAME_KEYS_SET.has(key)) {
                        e.preventDefault(); // Prevent default browser behavior (scrolling, etc.) - prevents the "ding" sound
                        e.stopPropagation(); // Stop event from bubbling
                        // Handle pause toggle
                        if (key === 'p') {
                            setIsPaused({
                                "useGameInput.useEffect.handleKeyDown": (prev)=>!prev
                            }["useGameInput.useEffect.handleKeyDown"]);
                            return; // Don't add 'p' to keys set
                        }
                        keysRef.current.add(key);
                    }
                }
            }["useGameInput.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "useGameInput.useEffect.handleKeyUp": (e)=>{
                    // Skip processing if game is over
                    if (gameOverRef.current) {
                        return;
                    }
                    // Normalize key to lowercase, handle special cases
                    let key;
                    // Handle space key
                    if (e.key === ' ' || e.code === 'Space') {
                        key = ' ';
                    } else if (e.key.startsWith('Arrow') || e.code.startsWith('Arrow')) {
                        const arrowDir = e.key.replace('Arrow', '').toLowerCase() || e.code.replace('Arrow', '').toLowerCase();
                        key = `arrow${arrowDir}`;
                    } else {
                        // e.code gives "KeyP", "KeyW", etc. - remove "Key" prefix
                        if (e.code.startsWith('Key')) {
                            key = e.code.replace('Key', '').toLowerCase(); // 'KeyW' -> 'w', 'KeyP' -> 'p', etc.
                        } else {
                            key = e.key.toLowerCase();
                        }
                    }
                    // Use Set for O(1) lookup instead of O(n) array.includes()
                    if (GAME_KEYS_SET.has(key)) {
                        e.preventDefault(); // Prevent default browser behavior
                        e.stopPropagation(); // Stop event from bubbling
                        // Don't remove 'p' from keys set since we never added it
                        if (key !== 'p') {
                            keysRef.current.delete(key);
                        }
                    }
                }
            }["useGameInput.useEffect.handleKeyUp"];
            // Use capture phase to catch events early and prevent default behavior
            window.addEventListener('keydown', handleKeyDown, true);
            window.addEventListener('keyup', handleKeyUp, true);
            return ({
                "useGameInput.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown, true);
                    window.removeEventListener('keyup', handleKeyUp, true);
                }
            })["useGameInput.useEffect"];
        }
    }["useGameInput.useEffect"], []);
    return {
        keysRef,
        isPaused
    };
}
_s(useGameInput, "UsVo7Qz5NS70nfX7wBtQwXpqJIo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/hooks/useTankImages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTankImages",
    ()=>useTankImages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useTankImages() {
    _s();
    const [tankImages, setTankImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        blue: null,
        red: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTankImages.useEffect": ()=>{
            const blueImg = new Image();
            blueImg.src = '/games/tank-blue.svg';
            blueImg.onload = ({
                "useTankImages.useEffect": ()=>{
                    setTankImages({
                        "useTankImages.useEffect": (prev)=>({
                                ...prev,
                                blue: blueImg
                            })
                    }["useTankImages.useEffect"]);
                }
            })["useTankImages.useEffect"];
            const redImg = new Image();
            redImg.src = '/games/tank-red.svg';
            redImg.onload = ({
                "useTankImages.useEffect": ()=>{
                    setTankImages({
                        "useTankImages.useEffect": (prev)=>({
                                ...prev,
                                red: redImg
                            })
                    }["useTankImages.useEffect"]);
                }
            })["useTankImages.useEffect"];
        }
    }["useTankImages.useEffect"], []);
    return tankImages;
}
_s(useTankImages, "w0lP9CdMH9JPN6wLdPJjg4ExBSs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Game Configuration - Modify these values to adjust game rules
__turbopack_context__.s([
    "BULLET_MAX_AGE",
    ()=>BULLET_MAX_AGE,
    "BULLET_SPEED",
    ()=>BULLET_SPEED,
    "G",
    ()=>G,
    "GAME_CONFIG",
    ()=>GAME_CONFIG,
    "MAX_BULLETS_PER_TANK",
    ()=>MAX_BULLETS_PER_TANK,
    "ROTATION_SPEED",
    ()=>ROTATION_SPEED,
    "SUN_INFLUENCE_RADIUS",
    ()=>SUN_INFLUENCE_RADIUS,
    "TANK_COLLISION_SIZE",
    ()=>TANK_COLLISION_SIZE,
    "TANK_HALF_SIZE",
    ()=>TANK_HALF_SIZE,
    "TANK_SIZE",
    ()=>TANK_SIZE,
    "TANK_SPEED",
    ()=>TANK_SPEED,
    "TICK_INTERVAL",
    ()=>TICK_INTERVAL,
    "TICK_RATE",
    ()=>TICK_RATE,
    "mSun",
    ()=>mSun
]);
const GAME_CONFIG = {
    // Tank settings (40% bigger)
    tank: {
        size: 24,
        collisionSize: 10,
        speed: 1.4,
        rotationSpeed: 5,
        lives: 3,
        spawnOffset: 2
    },
    // Bullet settings (60% slower - 40% of current speed)
    bullet: {
        speedMultiplier: 1.8,
        maxPerTank: 5,
        maxAge: 7000,
        fadeDuration: 500,
        radius: 2,
        collisionSize: 3
    },
    // Game timing
    game: {
        tickRate: 72,
        shootingCooldown: 150
    },
    // Sun physics (50% weaker - 50% of current strength)
    sun: {
        gravitationalConstant: 0.25,
        mass: 120.0,
        influenceRadius: 60,
        minDistance: 2
    },
    // Visual settings (scaled down by 50% - 50% of current)
    visual: {
        livesIndicatorRadius: 2,
        livesIndicatorSpacing: 3,
        livesIndicatorOffsetX: 3,
        livesIndicatorOffsetY: -3,
        uiTextSize: 7,
        uiTextOffsetX: 4,
        uiTextOffsetY: 10
    },
    // Debug flags
    debug: {
        disableSunGravity: true
    }
};
const TANK_SIZE = GAME_CONFIG.tank.size;
const TANK_COLLISION_SIZE = GAME_CONFIG.tank.collisionSize;
const TANK_HALF_SIZE = TANK_SIZE / 2; // Commonly used value, compute once
const TANK_SPEED = GAME_CONFIG.tank.speed;
const BULLET_SPEED = TANK_SPEED * GAME_CONFIG.bullet.speedMultiplier;
const ROTATION_SPEED = GAME_CONFIG.tank.rotationSpeed;
const TICK_RATE = GAME_CONFIG.game.tickRate;
const TICK_INTERVAL = 1000 / TICK_RATE;
const MAX_BULLETS_PER_TANK = GAME_CONFIG.bullet.maxPerTank;
const BULLET_MAX_AGE = GAME_CONFIG.bullet.maxAge;
const G = GAME_CONFIG.sun.gravitationalConstant;
const mSun = GAME_CONFIG.sun.mass;
const SUN_INFLUENCE_RADIUS = GAME_CONFIG.sun.influenceRadius;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/lib/physics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Physics utilities for game mechanics
 * Shared between BouncingBall and TankTrouble components
 */ __turbopack_context__.s([
    "applyGravityFromSources",
    ()=>applyGravityFromSources,
    "bounceOffBoundaries",
    ()=>bounceOffBoundaries,
    "bounceOffRectangle",
    ()=>bounceOffRectangle,
    "calculateGravity",
    ()=>calculateGravity,
    "checkRectCollision",
    ()=>checkRectCollision,
    "clampVelocity",
    ()=>clampVelocity,
    "ensureMinimumVelocity",
    ()=>ensureMinimumVelocity
]);
function checkRectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
function bounceOffBoundaries(position, velocity, size, boundaries) {
    let newX = position.x;
    let newY = position.y;
    let newVx = velocity.x;
    let newVy = velocity.y;
    let bounced = false;
    // No padding - objects can navigate right up to walls with no gap
    const padding = 0;
    // Check which boundaries are being hit
    const hitLeft = newX - padding < boundaries.left;
    const hitRight = newX + padding > boundaries.right;
    const hitTop = newY - padding < boundaries.top;
    const hitBottom = newY + padding > boundaries.bottom;
    // Handle corner collisions (when two boundaries are hit)
    if ((hitLeft || hitRight) && (hitTop || hitBottom)) {
        // Corner collision - bounce both velocities
        if (hitLeft) {
            newX = boundaries.left + padding;
            newVx = -newVx;
        } else if (hitRight) {
            newX = boundaries.right - padding;
            newVx = -newVx;
        }
        if (hitTop) {
            newY = boundaries.top + padding;
            newVy = -newVy;
        } else if (hitBottom) {
            newY = boundaries.bottom - padding;
            newVy = -newVy;
        }
        bounced = true;
    } else {
        // Handle edge collisions (single boundary)
        if (hitLeft) {
            newX = boundaries.left + padding;
            newVx = -newVx;
            bounced = true;
        } else if (hitRight) {
            newX = boundaries.right - padding;
            newVx = -newVx;
            bounced = true;
        }
        if (hitTop) {
            newY = boundaries.top + padding;
            newVy = -newVy;
            bounced = true;
        } else if (hitBottom) {
            newY = boundaries.bottom - padding;
            newVy = -newVy;
            bounced = true;
        }
    }
    return {
        newPosition: {
            x: newX,
            y: newY
        },
        newVelocity: {
            x: newVx,
            y: newVy
        },
        bounced
    };
}
function bounceOffRectangle(position, velocity, size, barrier, previousPosition) {
    const halfSize = size / 2;
    const bulletLeft = position.x - halfSize;
    const bulletRight = position.x + halfSize;
    const bulletTop = position.y - halfSize;
    const bulletBottom = position.y + halfSize;
    let newVx = velocity.x;
    let newVy = velocity.y;
    let bounced = false;
    // Check if colliding with barrier
    if (bulletLeft < barrier.x + barrier.width && bulletRight > barrier.x && bulletTop < barrier.y + barrier.height && bulletBottom > barrier.y) {
        // Determine which side of the barrier was hit
        // Use previous position if available for more accurate detection
        const refX = previousPosition?.x ?? position.x;
        const refY = previousPosition?.y ?? position.y;
        // Calculate distances from bullet center to each barrier edge
        const distToLeft = Math.abs(refX - barrier.x);
        const distToRight = Math.abs(refX - (barrier.x + barrier.width));
        const distToTop = Math.abs(refY - barrier.y);
        const distToBottom = Math.abs(refY - (barrier.y + barrier.height));
        // Find the closest edge
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
        let newX = position.x;
        let newY = position.y;
        if (minDist === distToLeft) {
            // Hit left edge - bounce x velocity and position to left of barrier
            newVx = -newVx;
            newX = barrier.x - halfSize;
            bounced = true;
        } else if (minDist === distToRight) {
            // Hit right edge - bounce x velocity and position to right of barrier
            newVx = -newVx;
            newX = barrier.x + barrier.width + halfSize;
            bounced = true;
        } else if (minDist === distToTop) {
            // Hit top edge - bounce y velocity and position above barrier
            newVy = -newVy;
            newY = barrier.y - halfSize;
            bounced = true;
        } else if (minDist === distToBottom) {
            // Hit bottom edge - bounce y velocity and position below barrier
            newVy = -newVy;
            newY = barrier.y + barrier.height + halfSize;
            bounced = true;
        }
        return {
            newPosition: {
                x: newX,
                y: newY
            },
            newVelocity: {
                x: newVx,
                y: newVy
            },
            bounced
        };
    }
    return {
        newPosition: {
            x: position.x,
            y: position.y
        },
        newVelocity: {
            x: newVx,
            y: newVy
        },
        bounced: false
    };
}
function calculateGravity(position, source, config) {
    const dx = source.x - position.x;
    const dy = source.y - position.y;
    const distanceSquared = dx * dx + dy * dy;
    // Early exit: check squared distance first (avoid sqrt if outside influence)
    const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;
    if (distanceSquared >= influenceRadiusSquared || distanceSquared === 0) {
        return {
            x: 0,
            y: 0
        };
    }
    // Only calculate sqrt when we know we're within influence radius
    const distance = Math.sqrt(distanceSquared);
    const effectiveDistance = Math.max(distance, config.minDistance);
    const effectiveDistanceSquared = effectiveDistance * effectiveDistance;
    // Calculate gravitational acceleration
    let gravitationalAcceleration = config.gravitationalConstant * config.sourceMass / effectiveDistanceSquared;
    // Cap maximum acceleration if specified
    if (config.maxAcceleration !== undefined) {
        gravitationalAcceleration = Math.min(gravitationalAcceleration, config.maxAcceleration);
    }
    // Normalize direction vector
    const directionX = dx / distance;
    const directionY = dy / distance;
    return {
        x: directionX * gravitationalAcceleration,
        y: directionY * gravitationalAcceleration
    };
}
function applyGravityFromSources(position, sources, config) {
    let totalAccelerationX = 0;
    let totalAccelerationY = 0;
    // Pre-compute squared influence radius for faster distance comparison
    const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;
    for (const source of sources){
        // Quick squared distance check before calling calculateGravity
        const dx = source.x - position.x;
        const dy = source.y - position.y;
        const distanceSquared = dx * dx + dy * dy;
        // Skip this source if it's outside influence radius (calculateGravity also checks, but this avoids function call overhead)
        if (distanceSquared >= influenceRadiusSquared || distanceSquared === 0) {
            continue;
        }
        const gravity = calculateGravity(position, source, config);
        totalAccelerationX += gravity.x;
        totalAccelerationY += gravity.y;
    }
    return {
        x: totalAccelerationX,
        y: totalAccelerationY
    };
}
function ensureMinimumVelocity(velocity, minSpeed) {
    const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    if (currentSpeed < minSpeed && currentSpeed > 0) {
        // Normalize and scale to minimum velocity
        const scale = minSpeed / currentSpeed;
        return {
            x: velocity.x * scale,
            y: velocity.y * scale
        };
    }
    return velocity;
}
function clampVelocity(velocity, maxSpeed) {
    const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    if (currentSpeed > maxSpeed) {
        const scale = maxSpeed / currentSpeed;
        return {
            x: velocity.x * scale,
            y: velocity.y * scale
        };
    }
    return velocity;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Game Constants
 * 
 * Central location for all magic numbers and configuration values
 * used throughout the game logic.
 */ // Spawn Constants
__turbopack_context__.s([
    "AGGRESSION_CHECK_INTERVAL_MS",
    ()=>AGGRESSION_CHECK_INTERVAL_MS,
    "AI_VS_AI_SPEED_MULTIPLIER",
    ()=>AI_VS_AI_SPEED_MULTIPLIER,
    "BULLET_DRAW_LENGTH",
    ()=>BULLET_DRAW_LENGTH,
    "BULLET_DRAW_RADIUS",
    ()=>BULLET_DRAW_RADIUS,
    "BULLET_DRAW_WIDTH",
    ()=>BULLET_DRAW_WIDTH,
    "BULLET_MIN_VELOCITY",
    ()=>BULLET_MIN_VELOCITY,
    "CANVAS_SCALE_FACTOR",
    ()=>CANVAS_SCALE_FACTOR,
    "COLLISION_EPSILON",
    ()=>COLLISION_EPSILON,
    "COLLISION_SIZE_BUFFER",
    ()=>COLLISION_SIZE_BUFFER,
    "DEGREES_TO_RADIANS",
    ()=>DEGREES_TO_RADIANS,
    "DISTANCE_REDUCTION_FACTOR",
    ()=>DISTANCE_REDUCTION_FACTOR,
    "DODGE_REWARD_PER_BULLET",
    ()=>DODGE_REWARD_PER_BULLET,
    "ENEMY_PREDICTION_TIME_MS",
    ()=>ENEMY_PREDICTION_TIME_MS,
    "GAME_DISPLAY_SCALE",
    ()=>GAME_DISPLAY_SCALE,
    "GOT_HIT_PENALTY",
    ()=>GOT_HIT_PENALTY,
    "GRAVITY_ARROW_GRID_SPACING",
    ()=>GRAVITY_ARROW_GRID_SPACING,
    "GRAVITY_ARROW_HEAD_SIZE",
    ()=>GRAVITY_ARROW_HEAD_SIZE,
    "GRAVITY_ARROW_LENGTH",
    ()=>GRAVITY_ARROW_LENGTH,
    "HIGH_THREAT_DISTANCE_MULTIPLIER",
    ()=>HIGH_THREAT_DISTANCE_MULTIPLIER,
    "HIT_ENEMY_REWARD",
    ()=>HIT_ENEMY_REWARD,
    "INACTIVITY_THRESHOLD_MS",
    ()=>INACTIVITY_THRESHOLD_MS,
    "MAX_EPISODE_TIME_MS",
    ()=>MAX_EPISODE_TIME_MS,
    "MAX_GAMES",
    ()=>MAX_GAMES,
    "MAX_SPAWN_ATTEMPTS",
    ()=>MAX_SPAWN_ATTEMPTS,
    "MIN_DISTANCE_TO_ENEMY",
    ()=>MIN_DISTANCE_TO_ENEMY,
    "MIN_SPAWN_DISTANCE",
    ()=>MIN_SPAWN_DISTANCE,
    "MOVE_BACKWARD_ANGLE_TOLERANCE",
    ()=>MOVE_BACKWARD_ANGLE_TOLERANCE,
    "MOVE_FORWARD_ANGLE_TOLERANCE",
    ()=>MOVE_FORWARD_ANGLE_TOLERANCE,
    "OPTIMAL_DISTANCE_TO_ENEMY",
    ()=>OPTIMAL_DISTANCE_TO_ENEMY,
    "PATH_CHECK_STEPS",
    ()=>PATH_CHECK_STEPS,
    "RADIANS_TO_DEGREES",
    ()=>RADIANS_TO_DEGREES,
    "SIGNIFICANT_MOVEMENT_THRESHOLD",
    ()=>SIGNIFICANT_MOVEMENT_THRESHOLD,
    "SPAWN_PADDING",
    ()=>SPAWN_PADDING,
    "SURVIVAL_REWARD_PER_TICK",
    ()=>SURVIVAL_REWARD_PER_TICK,
    "TIMEOUT_PENALTY",
    ()=>TIMEOUT_PENALTY,
    "TOO_CLOSE_DISTANCE",
    ()=>TOO_CLOSE_DISTANCE,
    "UI_TEXT_SPACING",
    ()=>UI_TEXT_SPACING,
    "URGENT_THREAT_THRESHOLD",
    ()=>URGENT_THREAT_THRESHOLD
]);
const SPAWN_PADDING = 8; // Minimum distance from edges
const MAX_SPAWN_ATTEMPTS = 100;
const MIN_SPAWN_DISTANCE = 50; // Minimum distance between spawns
const BULLET_MIN_VELOCITY = 0.5;
const COLLISION_EPSILON = 0.001; // Floating point precision tolerance
const URGENT_THREAT_THRESHOLD = 0.85; // Threat level to trigger dodge
const ENEMY_PREDICTION_TIME_MS = 500; // Time to predict enemy position ahead
const MOVE_FORWARD_ANGLE_TOLERANCE = 60; // Degrees tolerance for forward movement
const MOVE_BACKWARD_ANGLE_TOLERANCE = 120; // Degrees tolerance for backward movement
const MIN_DISTANCE_TO_ENEMY = 50; // Minimum ideal distance to enemy
const TOO_CLOSE_DISTANCE = 30; // Distance considered too close
const DISTANCE_REDUCTION_FACTOR = 0.8; // Factor for reducing distance to enemy
const PATH_CHECK_STEPS = 20; // Steps for path clearance checking
const COLLISION_SIZE_BUFFER = 5; // Buffer pixels for collision detection
const HIGH_THREAT_DISTANCE_MULTIPLIER = 3; // Multiplier for high threat distance
const TIMEOUT_PENALTY = -100;
const MAX_EPISODE_TIME_MS = 60000; // 60 seconds - maximum episode duration before timeout
const SURVIVAL_REWARD_PER_TICK = 0.01;
const HIT_ENEMY_REWARD = 100;
const GOT_HIT_PENALTY = -100;
const OPTIMAL_DISTANCE_TO_ENEMY = 120; // Optimal distance for engagement
const INACTIVITY_THRESHOLD_MS = 1500; // Time before inactivity penalty
const SIGNIFICANT_MOVEMENT_THRESHOLD = 5; // Pixels - minimum movement to count
const AGGRESSION_CHECK_INTERVAL_MS = 2000; // Time window for aggression check
const DODGE_REWARD_PER_BULLET = 10;
const CANVAS_SCALE_FACTOR = 2; // Internal resolution multiplier
const GRAVITY_ARROW_GRID_SPACING = 30;
const GRAVITY_ARROW_LENGTH = 8;
const GRAVITY_ARROW_HEAD_SIZE = 3;
const BULLET_DRAW_LENGTH = 6;
const BULLET_DRAW_WIDTH = 3;
const BULLET_DRAW_RADIUS = 1;
const UI_TEXT_SPACING = 12; // Vertical spacing between UI text lines
const AI_VS_AI_SPEED_MULTIPLIER = 1;
const MAX_GAMES = 4;
const GAME_DISPLAY_SCALE = 0.45; // Scale factor for game display
const DEGREES_TO_RADIANS = Math.PI / 180;
const RADIANS_TO_DEGREES = 180 / Math.PI;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/collision.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canMoveTo",
    ()=>canMoveTo,
    "isValidTankPosition",
    ()=>isValidTankPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/physics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
;
;
;
function isValidTankPosition(x, y, mapWidth, mapHeight, barriers, tanks, suns, excludeTankIndex) {
    // Calculate collision box position (centered on tank)
    const collisionOffset = (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"]) / 2;
    const collisionX = x + collisionOffset;
    const collisionY = y + collisionOffset;
    // Check boundaries - allow tanks to be exactly at walls (with small epsilon for floating point precision)
    if (collisionX < -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLLISION_EPSILON"] || collisionY < -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLLISION_EPSILON"] || collisionX + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"] > mapWidth + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLLISION_EPSILON"] || collisionY + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"] > mapHeight + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLLISION_EPSILON"]) {
        return false;
    }
    // Check barriers using collision size
    for (const barrier of barriers){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRectCollision"])(collisionX, collisionY, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"], barrier.x, barrier.y, barrier.width, barrier.height)) {
            return false;
        }
    }
    // Check suns - tanks cannot overlap with suns
    for (const sun of suns){
        const sunLeft = sun.x - sun.size;
        const sunRight = sun.x + sun.size;
        const sunTop = sun.y - sun.size;
        const sunBottom = sun.y + sun.size;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRectCollision"])(collisionX, collisionY, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"], sunLeft, sunTop, sunRight - sunLeft, sunBottom - sunTop)) {
            return false;
        }
    }
    // Tanks can now overlap each other - no tank-to-tank collision check
    return true;
}
function canMoveTo(x, y, mapWidth, mapHeight, barriers, tanks, suns, excludeTankIndex) {
    return isValidTankPosition(x, y, mapWidth, mapHeight, barriers, tanks, suns, excludeTankIndex);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "angleToPoint",
    ()=>angleToPoint,
    "degToRad",
    ()=>degToRad,
    "distance",
    ()=>distance,
    "distancePoints",
    ()=>distancePoints,
    "normalizeAngle",
    ()=>normalizeAngle,
    "normalizeAngleDifference",
    ()=>normalizeAngleDifference,
    "radToDeg",
    ()=>radToDeg
]);
/**
 * Math Utilities
 * 
 * Common mathematical operations used throughout the game.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
;
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
function distancePoints(p1, p2) {
    return distance(p1.x, p1.y, p2.x, p2.y);
}
function degToRad(degrees) {
    return degrees * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREES_TO_RADIANS"];
}
function radToDeg(radians) {
    return radians * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RADIANS_TO_DEGREES"];
}
function normalizeAngle(angle) {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
}
function normalizeAngleDifference(angleDiff) {
    while(angleDiff > 180)angleDiff -= 360;
    while(angleDiff < -180)angleDiff += 360;
    return angleDiff;
}
function angleToPoint(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return radToDeg(Math.atan2(dy, dx));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/bullet-creation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Bullet Creation Utilities
 * 
 * Centralized logic for creating bullet objects.
 */ __turbopack_context__.s([
    "createBullet",
    ()=>createBullet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
;
;
function createBullet(tank, angle, tickTime, owner) {
    const rad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degToRad"])(angle);
    const bulletX = tank.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + Math.cos(rad) * (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.spawnOffset);
    const bulletY = tank.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + Math.sin(rad) * (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.spawnOffset);
    return {
        x: bulletX,
        y: bulletY,
        angle: angle,
        speed: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"],
        owner: owner,
        createdAt: tickTime,
        vx: Math.cos(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"],
        vy: Math.sin(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"]
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/tank-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Tank Utilities
 * 
 * Common operations for tank manipulation.
 */ __turbopack_context__.s([
    "clampTankPosition",
    ()=>clampTankPosition,
    "getTankCenter",
    ()=>getTankCenter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
;
function getTankCenter(tank) {
    return {
        x: tank.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_HALF_SIZE"],
        y: tank.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_HALF_SIZE"]
    };
}
function clampTankPosition(x, y, mapWidth, mapHeight) {
    const collisionOffset = (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"]) / 2;
    const clampedX = Math.max(-collisionOffset, Math.min(x, mapWidth - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] + collisionOffset));
    const clampedY = Math.max(-collisionOffset, Math.min(y, mapHeight - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] + collisionOffset));
    return {
        x: clampedX,
        y: clampedY
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/bullet-optimization.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Optimized bullet collision utilities
 * 
 * Pre-computes bullet groupings to reduce O(n²) operations to O(n)
 */ __turbopack_context__.s([
    "countBulletsByOwner",
    ()=>countBulletsByOwner,
    "detectBulletCollisions",
    ()=>detectBulletCollisions,
    "groupBulletsByOwner",
    ()=>groupBulletsByOwner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
;
;
function groupBulletsByOwner(bullets) {
    const groups = new Map();
    for(let i = 0; i < bullets.length; i++){
        const bullet = bullets[i];
        if (bullet.exploding) continue;
        const indices = groups.get(bullet.owner) || [];
        indices.push(i);
        groups.set(bullet.owner, indices);
    }
    return groups;
}
function countBulletsByOwner(bullets) {
    const counts = new Map();
    for (const bullet of bullets){
        if (!bullet.exploding) {
            counts.set(bullet.owner, (counts.get(bullet.owner) || 0) + 1);
        }
    }
    return counts;
}
function detectBulletCollisions(bullets, bulletGroups) {
    const collisions = new Set();
    const checked = new Set();
    const collisionSize = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].bullet.collisionSize;
    const blueIndices = bulletGroups.get('blue') || [];
    const redIndices = bulletGroups.get('red') || [];
    // Only check blue vs red bullets (not same owner)
    // This reduces from O(n²) to O(blue_count * red_count), which is typically much smaller
    for (const i of blueIndices){
        if (collisions.has(i)) continue;
        const bullet = bullets[i];
        if (bullet.exploding) continue;
        for (const j of redIndices){
            if (collisions.has(j)) continue;
            const otherBullet = bullets[j];
            if (otherBullet.exploding) continue;
            // Create unique key to avoid duplicate checks
            const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
            if (checked.has(key)) continue;
            checked.add(key);
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(bullet.x, bullet.y, otherBullet.x, otherBullet.y);
            if (dist < collisionSize) {
                collisions.add(i);
                collisions.add(j);
                break; // This bullet collided, no need to check more
            }
        }
    }
    return collisions;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/tank.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updatePlayer1Tank",
    ()=>updatePlayer1Tank,
    "updatePlayer2Tank",
    ()=>updatePlayer2Tank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$creation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet-creation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/tank-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet-optimization.ts [app-client] (ecmascript)");
;
;
;
;
;
;
/**
 * Update tank movement and shooting using control mappings
 */ function updatePlayerTank(params, controls, owner) {
    const { tank, keys, tickTime, lastShotTime, bullets, mapWidth, mapHeight, barriers, suns, allTanks, tankIndex } = params;
    let newAngle = tank.angle;
    let newX = tank.x;
    let newY = tank.y;
    const newBullets = [];
    let newLastShotTime = lastShotTime;
    // Handle rotation
    if (keys.has(controls.rotateLeft)) {
        newAngle -= __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
    }
    if (keys.has(controls.rotateRight)) {
        newAngle += __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
    }
    // Handle forward movement
    if (keys.has(controls.moveForward)) {
        const rad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degToRad"])(newAngle);
        const dx = Math.cos(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"];
        const dy = Math.sin(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"];
        const testX = newX + dx;
        const testY = newY + dy;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canMoveTo"])(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
            newX = testX;
            newY = testY;
        }
    }
    // Handle backward movement
    if (keys.has(controls.moveBackward)) {
        const rad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degToRad"])(newAngle);
        const dx = -Math.cos(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"];
        const dy = -Math.sin(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"];
        const testX = newX + dx;
        const testY = newY + dy;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canMoveTo"])(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
            newX = testX;
            newY = testY;
        }
    }
    // Handle shooting
    if (keys.has(controls.shoot) && tickTime - lastShotTime > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].game.shootingCooldown) {
        // Use optimized bullet counting instead of filter (O(n) instead of O(n) but cached result)
        const bulletCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countBulletsByOwner"])(bullets);
        const bulletCount = bulletCounts.get(owner) || 0;
        if (bulletCount < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_BULLETS_PER_TANK"]) {
            const bullet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$creation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBullet"])({
                ...tank,
                x: newX,
                y: newY,
                angle: newAngle
            }, newAngle, tickTime, owner);
            newBullets.push(bullet);
            newLastShotTime = tickTime;
        }
    }
    // Clamp position to ensure collision box stays within bounds
    const clamped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampTankPosition"])(newX, newY, mapWidth, mapHeight);
    return {
        updatedTank: {
            ...tank,
            x: clamped.x,
            y: clamped.y,
            angle: newAngle
        },
        newBullets,
        lastShotTime: newLastShotTime
    };
}
function updatePlayer1Tank(params) {
    return updatePlayerTank(params, {
        rotateLeft: 'arrowleft',
        rotateRight: 'arrowright',
        moveForward: 'arrowup',
        moveBackward: 'arrowdown',
        shoot: ' '
    }, 'blue');
}
function updatePlayer2Tank(params) {
    return updatePlayerTank(params, {
        rotateLeft: 'a',
        rotateRight: 'd',
        moveForward: 'w',
        moveBackward: 's',
        shoot: 'q'
    }, 'red');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/bullet.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateBullets",
    ()=>updateBullets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/physics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet-optimization.ts [app-client] (ecmascript)");
;
;
;
;
;
// Cache for sun sources (suns are static during gameplay)
let cachedSunSources = null;
let cachedSunsReference = null;
let cachedDisableSunGravity = null;
// Cache for gravity config (only maxAcceleration depends on BULLET_SPEED)
let cachedGravityConfig = null;
let cachedBulletSpeed = null;
/**
 * Get or compute sun sources array (cached for performance)
 */ function getSunSources(suns) {
    const disableSunGravity = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].debug.disableSunGravity;
    // Check if suns array reference changed, disable flag changed, or cache is invalid
    if (cachedSunSources === null || cachedSunsReference !== suns || cachedDisableSunGravity !== disableSunGravity) {
        if (disableSunGravity) {
            cachedSunSources = [];
        } else {
            cachedSunSources = suns.map((sun)=>({
                    x: sun.x,
                    y: sun.y
                }));
        }
        cachedSunsReference = suns;
        cachedDisableSunGravity = disableSunGravity;
    }
    return cachedSunSources;
}
/**
 * Get or compute gravity config (cached for performance)
 */ function getGravityConfig() {
    // Check if BULLET_SPEED changed (only maxAcceleration depends on it)
    if (cachedGravityConfig === null || cachedBulletSpeed !== __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"]) {
        cachedGravityConfig = {
            gravitationalConstant: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"],
            sourceMass: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mSun"],
            influenceRadius: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"],
            minDistance: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].sun.minDistance,
            maxAcceleration: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"] * 0.3
        };
        cachedBulletSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"];
    }
    return cachedGravityConfig;
}
function updateBullets(params) {
    const { bullets, tickTime, mapWidth, mapHeight, barriers, suns, tanks } = params;
    const updatedBullets = [];
    const updatedTanks = [
        ...tanks
    ];
    const bulletCollisionSize = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].bullet.collisionSize;
    // First pass: optimized bullet-bullet collision detection
    // Groups bullets by owner first, reducing O(n²) to O(blue_count * red_count)
    const bulletGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupBulletsByOwner"])(bullets);
    const bulletsToRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectBulletCollisions"])(bullets, bulletGroups);
    // Get cached sun sources (only recomputed if suns array reference changes)
    const sunSources = getSunSources(suns);
    // Get cached gravity config (only recomputed if BULLET_SPEED changes)
    const gravityConfig = getGravityConfig();
    // Second pass: update remaining bullets
    for(let i = 0; i < bullets.length; i++){
        if (bulletsToRemove.has(i)) continue;
        const bullet = bullets[i];
        // Remove exploding bullets immediately (no animation)
        if (bullet.exploding) {
            continue;
        }
        // Check bullet age - bullets fade away instead of exploding
        const age = tickTime - bullet.createdAt;
        if (age > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MAX_AGE"]) {
            // Remove bullet after fade duration
            const fadeDuration = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].bullet.fadeDuration;
            if (age > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MAX_AGE"] + fadeDuration) {
                continue; // Bullet has faded completely, remove it
            }
        // Keep bullet but mark as fading (will be handled in rendering)
        }
        // Apply gravitational force from suns (skip if disabled via debug flag)
        const gravityAcceleration = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].debug.disableSunGravity ? {
            x: 0,
            y: 0
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyGravityFromSources"])({
            x: bullet.x,
            y: bullet.y
        }, sunSources, gravityConfig);
        // Update velocity with gravitational acceleration
        let newVx = bullet.vx + gravityAcceleration.x;
        let newVy = bullet.vy + gravityAcceleration.y;
        // Ensure minimum velocity to prevent bullets from getting stuck (very small minimum to prevent division by zero)
        const velocity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureMinimumVelocity"])({
            x: newVx,
            y: newVy
        }, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MIN_VELOCITY"]);
        newVx = velocity.x;
        newVy = velocity.y;
        // Allow gravity to slow bullets naturally - no minimum speed enforcement
        // Update position using velocity
        let newX = bullet.x + newVx;
        let newY = bullet.y + newVy;
        // Bounce off boundaries (walls)
        const boundaryBounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bounceOffBoundaries"])({
            x: newX,
            y: newY
        }, {
            x: newVx,
            y: newVy
        }, bulletCollisionSize, {
            left: 0,
            right: mapWidth,
            top: 0,
            bottom: mapHeight
        });
        newX = boundaryBounce.newPosition.x;
        newY = boundaryBounce.newPosition.y;
        newVx = boundaryBounce.newVelocity.x;
        newVy = boundaryBounce.newVelocity.y;
        // Check collision with barriers - bounce off barriers
        // Early exit when collision found - barriers array is typically small so O(n) is acceptable
        for (const barrier of barriers){
            const barrierRect = {
                x: barrier.x,
                y: barrier.y,
                width: barrier.width,
                height: barrier.height
            };
            const barrierBounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bounceOffRectangle"])({
                x: newX,
                y: newY
            }, {
                x: newVx,
                y: newVy
            }, bulletCollisionSize, barrierRect, {
                x: bullet.x,
                y: bullet.y
            } // Previous position for accurate side detection
            );
            if (barrierBounce.bounced) {
                newX = barrierBounce.newPosition.x;
                newY = barrierBounce.newPosition.y;
                newVx = barrierBounce.newVelocity.x;
                newVy = barrierBounce.newVelocity.y;
                break; // Only one barrier collision per tick
            }
        }
        // Check collision with tanks
        let hitTank = false;
        for(let j = 0; j < updatedTanks.length; j++){
            const tank = updatedTanks[j];
            if (tank.lives > 0) {
                // Check if tank is invincible (recently respawned)
                const isInvincible = tank.invincibleUntil !== undefined && tickTime < tank.invincibleUntil;
                if (isInvincible) {
                    continue;
                }
                const bulletLeft = newX - bulletCollisionSize / 2;
                const bulletTop = newY - bulletCollisionSize / 2;
                const bulletRight = newX + bulletCollisionSize / 2;
                const bulletBottom = newY + bulletCollisionSize / 2;
                // Calculate tank collision box (centered on tank position)
                const tankCollisionOffset = (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"]) / 2;
                const tankCollisionLeft = tank.x + tankCollisionOffset;
                const tankCollisionTop = tank.y + tankCollisionOffset;
                const tankCollisionRight = tankCollisionLeft + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"];
                const tankCollisionBottom = tankCollisionTop + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"];
                // Check if bullet rectangle overlaps with tank collision rectangle
                if (bulletLeft < tankCollisionRight && bulletRight > tankCollisionLeft && bulletTop < tankCollisionBottom && bulletBottom > tankCollisionTop) {
                    // Tank hit! Decrease lives and respawn immediately
                    const newLives = tank.lives - 1;
                    // Use random spawn (will be handled by game logic)
                    updatedTanks[j] = {
                        ...tank,
                        lives: newLives
                    };
                    hitTank = true;
                    break;
                }
            }
        }
        if (hitTank) {
            continue;
        }
        // Update angle based on new velocity
        const newAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radToDeg"])(Math.atan2(newVy, newVx));
        updatedBullets.push({
            ...bullet,
            x: newX,
            y: newY,
            angle: newAngle,
            vx: newVx,
            vy: newVy
        });
    }
    return {
        updatedBullets,
        updatedTanks
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/utils/spawn.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateRandomSpawnPosition",
    ()=>generateRandomSpawnPosition,
    "getInitialSpawnPositions",
    ()=>getInitialSpawnPositions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
;
;
;
;
function generateRandomSpawnPosition(mapData, barriers, tanks, suns, excludePosition) {
    if (!mapData || typeof mapData.width !== 'number' || typeof mapData.height !== 'number') {
        // Fallback to safe defaults - use type guard utility for validation
        return {
            x: 90,
            y: 90,
            angle: 0
        };
    }
    const maxAttempts = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_SPAWN_ATTEMPTS"];
    const padding = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAWN_PADDING"];
    // Validate map dimensions
    const mapWidth = mapData.width;
    const mapHeight = mapData.height;
    const availableWidth = mapWidth - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] - padding * 2;
    const availableHeight = mapHeight - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] - padding * 2;
    if (isNaN(availableWidth) || isNaN(availableHeight) || availableWidth <= 0 || availableHeight <= 0) {
        // Fallback to spawn points
        if (mapData.spawnPoints && mapData.spawnPoints.length > 0) {
            return {
                x: mapData.spawnPoints[0].x,
                y: mapData.spawnPoints[0].y,
                angle: mapData.spawnPoints[0].angle
            };
        }
        return {
            x: padding,
            y: padding,
            angle: 0
        };
    }
    for(let attempt = 0; attempt < maxAttempts; attempt++){
        const x = padding + Math.random() * availableWidth;
        const y = padding + Math.random() * availableHeight;
        // Check if position is too close to exclude position (if provided)
        if (excludePosition) {
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distancePoints"])({
                x,
                y
            }, excludePosition);
            if (dist < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_SPAWN_DISTANCE"]) {
                continue;
            }
        }
        // Check if position is valid (no barrier or sun collision)
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTankPosition"])(x, y, mapData.width, mapData.height, barriers, tanks, suns)) {
            // Tanks can overlap, so no distance check needed
            // Random angle between 0 and 360
            const angle = Math.random() * 360;
            return {
                x,
                y,
                angle
            };
        }
    }
    // Fallback to default spawn points if random generation fails
    const spawnPoints = mapData.spawnPoints;
    if (!spawnPoints || spawnPoints.length === 0) {
        // Last resort: return a safe default position if spawn points are missing
        return {
            x: padding,
            y: padding,
            angle: 0
        };
    }
    // Try each spawn point until we find a valid one
    for (const spawnPoint of spawnPoints){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTankPosition"])(spawnPoint.x, spawnPoint.y, mapData.width, mapData.height, barriers, tanks, suns)) {
            // Check exclude position if provided
            if (excludePosition) {
                const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distancePoints"])(spawnPoint, excludePosition);
                if (dist < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_SPAWN_DISTANCE"]) {
                    continue;
                }
            }
            return {
                x: spawnPoint.x,
                y: spawnPoint.y,
                angle: spawnPoint.angle
            };
        }
    }
    // If all spawn points are invalid, use the first one anyway (last resort)
    return {
        x: spawnPoints[0].x,
        y: spawnPoints[0].y,
        angle: spawnPoints[0].angle
    };
}
function getInitialSpawnPositions(mapData, barriers, suns) {
    const blueSpawn = generateRandomSpawnPosition(mapData, barriers || [], [], suns || []);
    // Validate blue spawn position
    if (typeof blueSpawn.x !== 'number' || typeof blueSpawn.y !== 'number' || isNaN(blueSpawn.x) || isNaN(blueSpawn.y)) {
        // Fallback to safe default
        blueSpawn.x = 90;
        blueSpawn.y = 90;
        blueSpawn.angle = 0;
    }
    // Create blue tank object to pass to red spawn generation (for collision checking)
    const blueTank = {
        x: blueSpawn.x,
        y: blueSpawn.y,
        angle: blueSpawn.angle,
        lives: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.lives,
        color: 'blue'
    };
    const redSpawn = generateRandomSpawnPosition(mapData, barriers, [
        blueTank
    ], suns, blueSpawn);
    // Validate red spawn position
    if (typeof redSpawn.x !== 'number' || typeof redSpawn.y !== 'number' || isNaN(redSpawn.x) || isNaN(redSpawn.y)) {
        // Fallback to safe default (different from blue)
        redSpawn.x = mapData.spawnPoints && mapData.spawnPoints.length > 1 ? mapData.spawnPoints[1].x : 390;
        redSpawn.y = mapData.spawnPoints && mapData.spawnPoints.length > 1 ? mapData.spawnPoints[1].y : 270;
        redSpawn.angle = mapData.spawnPoints && mapData.spawnPoints.length > 1 ? mapData.spawnPoints[1].angle : 180;
    }
    return [
        {
            x: blueSpawn.x,
            y: blueSpawn.y,
            angle: blueSpawn.angle,
            lives: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.lives,
            color: 'blue',
            // Explicitly exclude death/respawn state
            exploding: undefined,
            explosionStartTime: undefined,
            respawning: undefined,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined
        },
        {
            x: redSpawn.x,
            y: redSpawn.y,
            angle: redSpawn.angle,
            lives: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.lives,
            color: 'red',
            // Explicitly exclude death/respawn state
            exploding: undefined,
            explosionStartTime: undefined,
            respawning: undefined,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined
        }
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/prediction.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "predictBulletPath",
    ()=>predictBulletPath,
    "predictTankPosition",
    ()=>predictTankPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/physics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
;
;
;
function predictBulletPath(bullet, suns, barriers, mapWidth, mapHeight, maxTime, stepSize = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"]) {
    const points = [];
    let currentX = bullet.x;
    let currentY = bullet.y;
    let currentVx = bullet.vx;
    let currentVy = bullet.vy;
    let currentTime = 0;
    const bulletCollisionSize = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].bullet.collisionSize;
    let isBlocked = false;
    // Convert suns to vector sources (pre-compute once, skip if disabled via debug flag)
    const sunSources = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].debug.disableSunGravity ? [] : suns.map((sun)=>({
            x: sun.x,
            y: sun.y
        }));
    // Pre-compute gravity config (avoid recreating object in loop)
    const gravityConfig = {
        gravitationalConstant: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"],
        sourceMass: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mSun"],
        influenceRadius: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"],
        minDistance: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].sun.minDistance,
        maxAcceleration: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"] * 0.3
    };
    // Store initial point
    points.push({
        x: currentX,
        y: currentY,
        time: currentTime
    });
    while(currentTime < maxTime && !isBlocked){
        // Apply gravity (skip if disabled via debug flag)
        const gravityAcceleration = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].debug.disableSunGravity ? {
            x: 0,
            y: 0
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyGravityFromSources"])({
            x: currentX,
            y: currentY
        }, sunSources, gravityConfig);
        // Update velocity
        let newVx = currentVx + gravityAcceleration.x;
        let newVy = currentVy + gravityAcceleration.y;
        // Ensure minimum velocity
        const velocity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureMinimumVelocity"])({
            x: newVx,
            y: newVy
        }, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MIN_VELOCITY"]);
        newVx = velocity.x;
        newVy = velocity.y;
        // Update position
        let newX = currentX + newVx;
        let newY = currentY + newVy;
        // Check boundary collision
        const boundaryBounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bounceOffBoundaries"])({
            x: newX,
            y: newY
        }, {
            x: newVx,
            y: newVy
        }, bulletCollisionSize, {
            left: 0,
            right: mapWidth,
            top: 0,
            bottom: mapHeight
        });
        if (boundaryBounce.bounced) {
            newX = boundaryBounce.newPosition.x;
            newY = boundaryBounce.newPosition.y;
            newVx = boundaryBounce.newVelocity.x;
            newVy = boundaryBounce.newVelocity.y;
        }
        // Check barrier collision
        for (const barrier of barriers){
            const barrierRect = {
                x: barrier.x,
                y: barrier.y,
                width: barrier.width,
                height: barrier.height
            };
            const barrierBounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bounceOffRectangle"])({
                x: newX,
                y: newY
            }, {
                x: newVx,
                y: newVy
            }, bulletCollisionSize, barrierRect, {
                x: currentX,
                y: currentY
            });
            if (barrierBounce.bounced) {
                newX = barrierBounce.newPosition.x;
                newY = barrierBounce.newPosition.y;
                newVx = barrierBounce.newVelocity.x;
                newVy = barrierBounce.newVelocity.y;
            // Continue after bounce
            }
        }
        currentX = newX;
        currentY = newY;
        currentVx = newVx;
        currentVy = newVy;
        currentTime += stepSize;
        // Add point (sample every few steps to reduce memory)
        if (points.length === 0 || currentTime - points[points.length - 1].time >= stepSize * 5) {
            points.push({
                x: currentX,
                y: currentY,
                time: currentTime
            });
        }
        // Stop if bullet is moving too slowly (stuck in sun)
        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        if (speed < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MIN_VELOCITY"]) {
            isBlocked = true;
            break;
        }
    }
    return {
        points,
        isBlocked,
        endTime: currentTime
    };
}
function predictTankPosition(tank, timeAhead, tankSpeed) {
    const rad = tank.angle * Math.PI / 180;
    const dx = Math.cos(rad) * tankSpeed * (timeAhead / __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"]);
    const dy = Math.sin(rad) * tankSpeed * (timeAhead / __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"]);
    return {
        x: tank.x + dx,
        y: tank.y + dy
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/threat-assessment.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assessThreats",
    ()=>assessThreats,
    "findEscapeDirection",
    ()=>findEscapeDirection,
    "isPositionSafe",
    ()=>isPositionSafe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/prediction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/tank-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
;
;
;
;
;
function assessThreats(tank, bullets, suns, barriers, mapWidth, mapHeight, maxPredictionTime) {
    const threats = [];
    for (const bullet of bullets){
        // Skip own bullets and exploding bullets
        if (bullet.owner === tank.color || bullet.exploding) {
            continue;
        }
        // Predict bullet path
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictBulletPath"])(bullet, suns, barriers, mapWidth, mapHeight, maxPredictionTime, 16 // Use smaller steps for accuracy
        );
        // Check if path gets close to tank
        let closestDistance = Infinity;
        let closestTime = 0;
        let collisionPoint = {
            x: bullet.x,
            y: bullet.y
        };
        // Calculate tank center once (reused for all points)
        const tankCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(tank);
        const hitThreshold = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"] + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLLISION_SIZE_BUFFER"];
        // Early exit optimization: if we find a collision, break immediately
        for (const point of path.points){
            // Distance from bullet to tank center
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(point.x, point.y, tankCenter.x, tankCenter.y);
            // Check if bullet would hit tank (within collision size)
            if (dist < hitThreshold) {
                closestDistance = dist;
                closestTime = point.time;
                collisionPoint = {
                    x: point.x,
                    y: point.y
                };
                break; // Early exit when collision detected
            }
            if (dist < closestDistance) {
                closestDistance = dist;
                closestTime = point.time;
                collisionPoint = {
                    x: point.x,
                    y: point.y
                };
            }
        }
        // Calculate threat level based on distance and time
        const threatDistanceThreshold = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"] * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HIGH_THREAT_DISTANCE_MULTIPLIER"];
        if (closestDistance < threatDistanceThreshold) {
            // High threat if very close
            const timeFactor = Math.max(0, 1 - closestTime / maxPredictionTime);
            const distanceFactor = Math.max(0, 1 - closestDistance / threatDistanceThreshold);
            const threatLevel = (timeFactor + distanceFactor) / 2;
            threats.push({
                bullet,
                timeToCollision: closestTime,
                closestDistance,
                collisionPoint,
                threatLevel: Math.min(1, threatLevel)
            });
        }
    }
    // Sort by threat level (most dangerous first)
    threats.sort((a, b)=>b.threatLevel - a.threatLevel);
    return threats;
}
function isPositionSafe(x, y, bullets, suns, barriers, mapWidth, mapHeight, predictionTime, safeMargin) {
    // Check each bullet
    for (const bullet of bullets){
        if (bullet.exploding) continue;
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictBulletPath"])(bullet, suns, barriers, mapWidth, mapHeight, predictionTime, 16);
        // Check if any point gets too close (early exit optimization)
        const safeDistance = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_COLLISION_SIZE"] + safeMargin;
        for (const point of path.points){
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(point.x, point.y, x, y);
            if (dist < safeDistance) {
                return false; // Early exit when unsafe position found
            }
        }
    }
    return true;
}
function findEscapeDirection(tank, threats, barriers, suns, mapWidth, mapHeight) {
    if (threats.length === 0) {
        return {
            angle: tank.angle,
            urgency: 0
        };
    }
    // Find the most urgent threat
    const urgentThreat = threats[0];
    if (urgentThreat.threatLevel < 0.5) {
        return {
            angle: tank.angle,
            urgency: urgentThreat.threatLevel
        };
    }
    // Calculate direction away from threat
    const tankCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(tank);
    const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(tankCenter.x, tankCenter.y, urgentThreat.collisionPoint.x, urgentThreat.collisionPoint.y);
    if (dist < 1) {
        // Too close, pick random direction
        return {
            angle: (tank.angle + 90) % 360,
            urgency: 1
        };
    }
    const escapeAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["angleToPoint"])(urgentThreat.collisionPoint, tankCenter);
    return {
        angle: escapeAngle,
        urgency: urgentThreat.threatLevel
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/sun-calculations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateOptimalShotAngle",
    ()=>calculateOptimalShotAngle,
    "findSunLeveragedShot",
    ()=>findSunLeveragedShot,
    "isPositionShieldedBySun",
    ()=>isPositionShieldedBySun
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/prediction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
;
;
function findSunLeveragedShot(shooter, target, suns, barriers, mapWidth, mapHeight, sunSkill) {
    // Only attempt sun shots if skill is high enough
    if (sunSkill < 0.3 || suns.length === 0) {
        return null;
    }
    let bestShot = null;
    let bestConfidence = 0;
    // Check each sun for potential leverage
    for (const sun of suns){
        // Find angles that will curve around this sun toward target
        const anglesToTest = 16; // Test multiple angles
        const angleSpread = 60; // Test ±60 degrees
        for(let i = 0; i < anglesToTest; i++){
            const baseAngle = Math.atan2(target.y - (shooter.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2), target.x - (shooter.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2));
            const testAngle = baseAngle * 180 / Math.PI + (i / (anglesToTest - 1) - 0.5) * angleSpread;
            // Create test bullet
            const rad = testAngle * Math.PI / 180;
            const bulletX = shooter.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + Math.cos(rad) * (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.spawnOffset);
            const bulletY = shooter.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + Math.sin(rad) * (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.spawnOffset);
            const testBullet = {
                x: bulletX,
                y: bulletY,
                angle: testAngle,
                speed: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"],
                owner: shooter.color,
                createdAt: 0,
                vx: Math.cos(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"],
                vy: Math.sin(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"]
            };
            // Predict path
            const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictBulletPath"])(testBullet, suns, barriers, mapWidth, mapHeight, 3000, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"]);
            // Check if path gets close to target
            let closestDistance = Infinity;
            let closestTime = 0;
            for (const point of path.points){
                const dx = point.x - target.x;
                const dy = point.y - target.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < closestDistance) {
                    closestDistance = dist;
                    closestTime = point.time;
                }
                // Hit if within tank collision size
                if (dist < 15) {
                    const confidence = sunSkill * (1 - Math.min(closestDistance / 30, 1));
                    if (confidence > bestConfidence) {
                        bestConfidence = confidence;
                        bestShot = {
                            angle: testAngle,
                            confidence,
                            timeToHit: closestTime,
                            usesSun: true
                        };
                    }
                }
            }
        }
    }
    return bestShot;
}
function isPositionShieldedBySun(position, attackerPosition, suns) {
    for (const sun of suns){
        // Check if sun is between position and attacker
        const dxToSun = sun.x - position.x;
        const dyToSun = sun.y - position.y;
        const dxToAttacker = attackerPosition.x - position.x;
        const dyToAttacker = attackerPosition.y - position.y;
        // Dot product to check if sun is in same direction as attacker
        const dot = dxToSun * dxToAttacker + dyToSun * dyToAttacker;
        if (dot > 0) {
            // Sun is in same direction, check distance
            const distToSun = Math.sqrt(dxToSun * dxToSun + dyToSun * dyToSun);
            const distToAttacker = Math.sqrt(dxToAttacker * dxToAttacker + dyToAttacker * dyToAttacker);
            // If sun is closer and large enough to block, we're shielded
            if (distToSun < distToAttacker && distToSun < sun.size * 2) {
                return true;
            }
        }
    }
    return false;
}
function calculateOptimalShotAngle(shooter, target, suns, barriers, mapWidth, mapHeight, sunSkill) {
    // First, try direct shot
    const directAngle = Math.atan2(target.y - (shooter.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2), target.x - (shooter.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2)) * 180 / Math.PI;
    const rad = directAngle * Math.PI / 180;
    const bulletX = shooter.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + Math.cos(rad) * (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.spawnOffset);
    const bulletY = shooter.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + Math.sin(rad) * (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.spawnOffset);
    const testBullet = {
        x: bulletX,
        y: bulletY,
        angle: directAngle,
        speed: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"],
        owner: shooter.color,
        createdAt: 0,
        vx: Math.cos(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"],
        vy: Math.sin(rad) * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"]
    };
    const directPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictBulletPath"])(testBullet, suns, barriers, mapWidth, mapHeight, 3000, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"]);
    let directConfidence = 0;
    for (const point of directPath.points){
        const dx = point.x - target.x;
        const dy = point.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
            directConfidence = 0.8;
            break;
        }
    }
    // Try sun-leveraged shot
    const sunShot = findSunLeveragedShot(shooter, target, suns, barriers, mapWidth, mapHeight, sunSkill);
    // Return best shot
    if (sunShot && sunShot.confidence > directConfidence) {
        return sunShot;
    }
    return {
        angle: directAngle,
        confidence: directConfidence,
        timeToHit: 1000,
        usesSun: false
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateOptimalPosition",
    ()=>calculateOptimalPosition,
    "findSafeDodgePosition",
    ()=>findSafeDodgePosition,
    "isPathClear",
    ()=>isPathClear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/collision.ts [app-client] (ecmascript)");
;
function calculateOptimalPosition(aiTank, enemyTank, aggressiveness, barriers, suns, mapWidth, mapHeight) {
    const aiCenterX = aiTank.x + 12; // Half of TANK_SIZE
    const aiCenterY = aiTank.y + 12;
    const enemyCenterX = enemyTank.x + 12;
    const enemyCenterY = enemyTank.y + 12;
    // Calculate distance to enemy
    const dx = enemyCenterX - aiCenterX;
    const dy = enemyCenterY - aiCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Much more aggressive: always move toward enemy, minimal ideal distance
    // Reduced ideal distance significantly to encourage close combat
    const idealDistance = 50 + (1 - aggressiveness) * 50; // Reduced from 100 + (1-aggressiveness)*100
    // Calculate angle toward enemy (always approach, never retreat)
    const angleToEnemy = Math.atan2(dy, dx) * 180 / Math.PI;
    // Always try to move closer to enemy (removed retreat logic)
    // Only stop approaching if already very close (within 30 pixels)
    let targetX = enemyCenterX;
    let targetY = enemyCenterY;
    if (distance > 30) {
        // Always move closer if not extremely close
        const approachAngle = angleToEnemy;
        // Move to ideal distance, but if already closer, still move forward (just slower)
        const targetDistance = Math.min(distance * 0.8, idealDistance); // Always reduce distance by 20% minimum
        targetX = enemyCenterX - Math.cos(approachAngle * Math.PI / 180) * targetDistance;
        targetY = enemyCenterY - Math.sin(approachAngle * Math.PI / 180) * targetDistance;
    } else {
        // Very close - stay at current distance but keep facing enemy
        targetX = aiCenterX;
        targetY = aiCenterY;
    }
    // Clamp to map bounds
    targetX = Math.max(12, Math.min(targetX, mapWidth - 12));
    targetY = Math.max(12, Math.min(targetY, mapHeight - 12));
    // Calculate angle toward target
    const targetDx = targetX - aiCenterX;
    const targetDy = targetY - aiCenterY;
    const targetAngle = Math.atan2(targetDy, targetDx) * 180 / Math.PI;
    return {
        x: targetX - 12,
        y: targetY - 12,
        angle: targetAngle
    };
}
function isPathClear(from, to, barriers, suns, tanks, mapWidth, mapHeight, excludeTankIndex) {
    // Simple line-of-sight check (could be improved with proper pathfinding)
    const steps = 20;
    const dx = (to.x - from.x) / steps;
    const dy = (to.y - from.y) / steps;
    for(let i = 0; i <= steps; i++){
        const testX = from.x + dx * i;
        const testY = from.y + dy * i;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canMoveTo"])(testX, testY, mapWidth, mapHeight, barriers, tanks, suns, excludeTankIndex)) {
            return false;
        }
    }
    return true;
}
function findSafeDodgePosition(tank, dodgeAngle, dodgeDistance, barriers, suns, allTanks, mapWidth, mapHeight, tankIndex) {
    const rad = dodgeAngle * Math.PI / 180;
    const targetX = tank.x + Math.cos(rad) * dodgeDistance;
    const targetY = tank.y + Math.sin(rad) * dodgeDistance;
    // Check if target position is valid
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canMoveTo"])(targetX, targetY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
        return {
            x: targetX,
            y: targetY
        };
    }
    // Try perpendicular directions
    const perpAngle1 = (dodgeAngle + 90) % 360;
    const perpAngle2 = (dodgeAngle - 90 + 360) % 360;
    for (const angle of [
        perpAngle1,
        perpAngle2
    ]){
        const rad = angle * Math.PI / 180;
        const testX = tank.x + Math.cos(rad) * dodgeDistance;
        const testY = tank.y + Math.sin(rad) * dodgeDistance;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canMoveTo"])(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
            return {
                x: testX,
                y: testY
            };
        }
    }
    // Try smaller distance
    if (dodgeDistance > 20) {
        return findSafeDodgePosition(tank, dodgeAngle, dodgeDistance * 0.5, barriers, suns, allTanks, mapWidth, mapHeight, tankIndex);
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/shared/config/game-config.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"game":{"tank":{"size":24,"collisionSize":10,"speed":1.4,"rotationSpeed":5,"lives":3,"spawnOffset":2},"bullet":{"speedMultiplier":1.8,"maxPerTank":5,"maxAge":7000,"fadeDuration":500,"radius":2,"collisionSize":3},"timing":{"tickRate":72,"shootingCooldown":150},"sun":{"gravitationalConstant":0.25,"mass":120.0,"influenceRadius":60,"minDistance":2},"spawn":{"padding":8,"maxAttempts":100,"minDistance":50},"collision":{"epsilon":0.001,"bulletMinVelocity":0.5},"map":{"width":480,"height":360}},"rl":{"reward":{"timeoutPenalty":-50,"maxEpisodeTimeMs":60000,"survivalRewardPerTick":0.02,"hitEnemyReward":100,"gotHitPenalty":-50,"optimalDistanceToEnemy":120,"inactivityThresholdMs":1500,"significantMovementThreshold":5,"aggressionCheckIntervalMs":2000,"dodgeRewardPerBullet":15,"recentBulletThresholdMs":100,"positionHistorySize":10,"positionRepeatThreshold":30,"threatDistance":50,"bulletMatchDistance":10,"movementAwayThreshold":10,"shotAccuracyMaxDistance":50,"movementRewardMax":0.15,"movementRewardMultiplier":0.0015,"stagnationPenalty":-0.1,"stalematePenalty":-0.2,"repetitiveActionPenalty":-0.03,"positionDiversityReward":0.02,"lifeAdvantageReward":0.02,"inactivityBasePenalty":-0.3,"inactivityMaxPenalty":-0.5,"inactivityScalingFactor":0.1,"lackOfAggressionPenalty":-0.15},"observation":{"maxBullets":20,"maxSuns":10,"barrierDirections":8,"bulletFeatures":5,"sunFeatures":3,"size":152},"action":{"numDiscreteActions":14,"actions":[{"id":0,"name":"NO_ACTION","description":"Do nothing"},{"id":1,"name":"ROTATE_LEFT","description":"Rotate tank left only"},{"id":2,"name":"ROTATE_RIGHT","description":"Rotate tank right only"},{"id":3,"name":"MOVE_FORWARD","description":"Move tank forward only"},{"id":4,"name":"MOVE_BACKWARD","description":"Move tank backward only"},{"id":5,"name":"SHOOT","description":"Shoot only"},{"id":6,"name":"ROTATE_LEFT_FORWARD","description":"Rotate left while moving forward"},{"id":7,"name":"ROTATE_RIGHT_FORWARD","description":"Rotate right while moving forward"},{"id":8,"name":"ROTATE_LEFT_SHOOT","description":"Rotate left while shooting"},{"id":9,"name":"ROTATE_RIGHT_SHOOT","description":"Rotate right while shooting"},{"id":10,"name":"MOVE_FORWARD_SHOOT","description":"Move forward while shooting"},{"id":11,"name":"MOVE_BACKWARD_SHOOT","description":"Move backward while shooting"},{"id":12,"name":"ROTATE_LEFT_BACKWARD","description":"Rotate left while moving backward"},{"id":13,"name":"ROTATE_RIGHT_BACKWARD","description":"Rotate right while moving backward"}]},"dqn":{"observationSize":152,"actionSize":14,"learningRate":0.0005,"hiddenLayers":[128,128,64],"gamma":0.99,"epsilonStart":1.0,"epsilonEnd":0.05,"epsilonDecay":0.998,"batchSize":64,"replayBufferSize":10000,"targetUpdateFrequency":100},"training":{"simulationsPerBatch":5,"speedMultiplier":1,"saveIntervalMinutes":5}},"model":{"architecture":{"inputSize":152,"hiddenLayers":[128,128,64],"outputSize":14,"activation":"relu","outputActivation":"linear"},"weights":{"format":"array","structure":[{"layer":0,"type":"dense","weights":"inputSize x hiddenLayers[0]","biases":"hiddenLayers[0]"},{"layer":1,"type":"dense","weights":"hiddenLayers[0] x hiddenLayers[1]","biases":"hiddenLayers[1]"},{"layer":2,"type":"dense","weights":"hiddenLayers[1] x hiddenLayers[2]","biases":"hiddenLayers[2]"},{"layer":3,"type":"dense","weights":"hiddenLayers[2] x outputSize","biases":"outputSize"}]}}});}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-action-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTION_BY_ID",
    ()=>ACTION_BY_ID,
    "ACTION_BY_NAME",
    ()=>ACTION_BY_NAME,
    "ACTION_DEFINITIONS",
    ()=>ACTION_DEFINITIONS,
    "NUM_DISCRETE_ACTIONS",
    ()=>NUM_DISCRETE_ACTIONS
]);
/**
 * Action Configuration - Shared with Go backend
 * 
 * This file reads from the shared game-config.json to ensure
 * action definitions stay in sync between Go and TypeScript
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$config$2f$game$2d$config$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/shared/config/game-config.json (json)");
;
const NUM_DISCRETE_ACTIONS = __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$config$2f$game$2d$config$2e$json__$28$json$29$__["default"].rl.action.numDiscreteActions;
const ACTION_DEFINITIONS = __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$config$2f$game$2d$config$2e$json__$28$json$29$__["default"].rl.action.actions;
const ACTION_BY_ID = new Map(ACTION_DEFINITIONS.map((action)=>[
        action.id,
        action
    ]));
const ACTION_BY_NAME = new Map(ACTION_DEFINITIONS.map((action)=>[
        action.name,
        action
    ]));
// Validate that actions are properly defined
if (ACTION_DEFINITIONS.length !== NUM_DISCRETE_ACTIONS) {
    console.warn(`Warning: Action definitions count (${ACTION_DEFINITIONS.length}) doesn't match ` + `NUM_DISCRETE_ACTIONS (${NUM_DISCRETE_ACTIONS}) in config`);
}
// Validate action IDs are sequential 0..N-1
for(let i = 0; i < ACTION_DEFINITIONS.length; i++){
    if (ACTION_DEFINITIONS[i].id !== i) {
        console.warn(`Warning: Action at index ${i} has ID ${ACTION_DEFINITIONS[i].id}, expected ${i}`);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-actions.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Action Conversion Utilities
 * 
 * Converts between keyboard input and discrete action numbers (0-13)
 * Matching the Go backend's action space
 * 
 * Action definitions are standardized in shared/config/game-config.json
 */ __turbopack_context__.s([
    "actionToDecision",
    ()=>actionToDecision,
    "decisionToAction",
    ()=>decisionToAction,
    "keysToAction",
    ()=>keysToAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-action-config.ts [app-client] (ecmascript)");
;
;
;
function keysToAction(keys, controls = {
    rotateLeft: 'arrowleft',
    rotateRight: 'arrowright',
    moveForward: 'arrowup',
    moveBackward: 'arrowdown',
    shoot: ' '
}) {
    const rotateLeft = keys.has(controls.rotateLeft);
    const rotateRight = keys.has(controls.rotateRight);
    const moveForward = keys.has(controls.moveForward);
    const moveBackward = keys.has(controls.moveBackward);
    const shoot = keys.has(controls.shoot);
    // Check for shooting actions first (they take priority)
    if (shoot) {
        if (moveForward) {
            return 10; // MOVE_FORWARD_SHOOT
        } else if (moveBackward) {
            return 11; // MOVE_BACKWARD_SHOOT
        } else if (rotateLeft) {
            return 8; // ROTATE_LEFT_SHOOT
        } else if (rotateRight) {
            return 9; // ROTATE_RIGHT_SHOOT
        }
        return 5; // SHOOT
    }
    // Movement actions
    if (moveForward) {
        if (rotateLeft) {
            return 6; // ROTATE_LEFT_FORWARD
        } else if (rotateRight) {
            return 7; // ROTATE_RIGHT_FORWARD
        }
        return 3; // MOVE_FORWARD
    } else if (moveBackward) {
        if (rotateLeft) {
            return 12; // ROTATE_LEFT_BACKWARD
        } else if (rotateRight) {
            return 13; // ROTATE_RIGHT_BACKWARD
        }
        return 4; // MOVE_BACKWARD
    }
    // Rotation-only actions
    if (rotateLeft) {
        return 1; // ROTATE_LEFT
    } else if (rotateRight) {
        return 2; // ROTATE_RIGHT
    }
    return 0; // NO_ACTION
}
function actionToDecision(action, currentAngle) {
    const decision = {
        angleDelta: 0,
        moveDirection: 0,
        shouldShoot: false
    };
    switch(action){
        case 0:
            break;
        case 1:
            decision.angleDelta = -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            break;
        case 2:
            decision.angleDelta = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            break;
        case 3:
            decision.moveDirection = 1;
            break;
        case 4:
            decision.moveDirection = -1;
            break;
        case 5:
            decision.shouldShoot = true;
            break;
        case 6:
            decision.angleDelta = -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            decision.moveDirection = 1;
            break;
        case 7:
            decision.angleDelta = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            decision.moveDirection = 1;
            break;
        case 8:
            decision.angleDelta = -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            decision.shouldShoot = true;
            break;
        case 9:
            decision.angleDelta = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            decision.shouldShoot = true;
            break;
        case 10:
            decision.moveDirection = 1;
            decision.shouldShoot = true;
            break;
        case 11:
            decision.moveDirection = -1;
            decision.shouldShoot = true;
            break;
        case 12:
            decision.angleDelta = -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            decision.moveDirection = -1;
            break;
        case 13:
            decision.angleDelta = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
            decision.moveDirection = -1;
            break;
        default:
            break;
    }
    return decision;
}
function decisionToAction(decision) {
    // Check for shooting actions first (they take priority)
    if (decision.shouldShoot) {
        if (decision.moveDirection > 0) {
            return 10; // MOVE_FORWARD_SHOOT
        } else if (decision.moveDirection < 0) {
            return 11; // MOVE_BACKWARD_SHOOT
        } else if (decision.angleDelta < 0) {
            return 8; // ROTATE_LEFT_SHOOT
        } else if (decision.angleDelta > 0) {
            return 9; // ROTATE_RIGHT_SHOOT
        }
        return 5; // SHOOT
    }
    // Movement actions
    if (decision.moveDirection > 0) {
        if (decision.angleDelta < 0) {
            return 6; // ROTATE_LEFT_FORWARD
        } else if (decision.angleDelta > 0) {
            return 7; // ROTATE_RIGHT_FORWARD
        }
        return 3; // MOVE_FORWARD
    } else if (decision.moveDirection < 0) {
        if (decision.angleDelta < 0) {
            return 12; // ROTATE_LEFT_BACKWARD
        } else if (decision.angleDelta > 0) {
            return 13; // ROTATE_RIGHT_BACKWARD
        }
        return 4; // MOVE_BACKWARD
    }
    // Rotation-only actions
    if (decision.angleDelta < 0) {
        return 1; // ROTATE_LEFT
    } else if (decision.angleDelta > 0) {
        return 2; // ROTATE_RIGHT
    }
    return 0; // NO_ACTION
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Observation Space Definition
 * 
 * Converts game state into a numerical observation vector for the RL agent.
 * The observation should be normalized and contain all relevant information.
 */ __turbopack_context__.s([
    "extractObservation",
    ()=>extractObservation,
    "getObservationSize",
    ()=>getObservationSize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
;
let cachedBarrierBounds = null;
let cachedBarriersReference = null;
/**
 * Get or compute barrier bounds (cached for performance)
 */ function getBarrierBounds(barriers) {
    // Check if barriers array reference changed
    if (cachedBarrierBounds === null || cachedBarriersReference !== barriers) {
        cachedBarrierBounds = barriers.map((barrier)=>({
                left: barrier.x,
                right: barrier.x + barrier.width,
                top: barrier.y,
                bottom: barrier.y + barrier.height
            }));
        cachedBarriersReference = barriers;
    }
    return cachedBarrierBounds;
}
// Constants for observation space
const MAX_BULLETS = 20; // Maximum bullets to track
const MAX_SUNS = 10; // Maximum suns to track
const BARRIER_DIRECTIONS = 8; // 8 directions for barrier detection
const BULLET_FEATURES = 5; // x, y, vx, vy, owner
const SUN_FEATURES = 3; // x, y, size
function extractObservation(context) {
    const { aiTank, enemyTank, bullets, suns, barriers, mapWidth, mapHeight } = context;
    const features = [];
    // 1. AI Tank state (4 features)
    features.push(normalize(aiTank.x, 0, mapWidth));
    features.push(normalize(aiTank.y, 0, mapHeight));
    features.push(normalizeAngle(aiTank.angle));
    features.push(normalize(aiTank.lives, 0, 3));
    // 2. Enemy Tank state (4 features)
    features.push(normalize(enemyTank.x, 0, mapWidth));
    features.push(normalize(enemyTank.y, 0, mapHeight));
    features.push(normalizeAngle(enemyTank.angle));
    features.push(normalize(enemyTank.lives, 0, 3));
    // 3. Relative position and distance (3 features)
    const dx = enemyTank.x - aiTank.x;
    const dy = enemyTank.y - aiTank.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = Math.sqrt(mapWidth * mapWidth + mapHeight * mapHeight);
    features.push(normalize(dx, -mapWidth, mapWidth));
    features.push(normalize(dy, -mapHeight, mapHeight));
    features.push(normalize(distance, 0, maxDistance));
    // 4. Angle to enemy (1 feature)
    const angleToEnemy = Math.atan2(dy, dx) * 180 / Math.PI;
    const angleDiff = normalizeAngleDifference(angleToEnemy - aiTank.angle);
    features.push(angleDiff);
    // 5. Bullet states (MAX_BULLETS * BULLET_FEATURES features)
    // Optimized: single pass to collect active bullets (avoid filter + slice creating intermediate array)
    const activeBullets = [];
    for(let i = 0; i < bullets.length && activeBullets.length < MAX_BULLETS; i++){
        const bullet = bullets[i];
        if (!bullet.exploding) {
            activeBullets.push(bullet);
        }
    }
    for(let i = 0; i < MAX_BULLETS; i++){
        if (i < activeBullets.length) {
            const bullet = activeBullets[i];
            features.push(normalize(bullet.x, 0, mapWidth));
            features.push(normalize(bullet.y, 0, mapHeight));
            features.push(normalize(bullet.vx, -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"] * 2, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"] * 2));
            features.push(normalize(bullet.vy, -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"] * 2, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_SPEED"] * 2));
            features.push(bullet.owner === aiTank.color ? 1 : 0); // Owner (0 or 1)
        } else {
            // Pad with zeros
            features.push(0, 0, 0, 0, 0);
        }
    }
    // 6. Sun states (MAX_SUNS * SUN_FEATURES features)
    const activeSuns = (suns || []).slice(0, MAX_SUNS);
    for(let i = 0; i < MAX_SUNS; i++){
        if (i < activeSuns.length) {
            const sun = activeSuns[i];
            features.push(normalize(sun.x, 0, mapWidth));
            features.push(normalize(sun.y, 0, mapHeight));
            features.push(normalize(sun.size, 0, 100));
        } else {
            features.push(0, 0, 0);
        }
    }
    // 7. Barrier distances in 8 directions (BARRIER_DIRECTIONS features)
    const barrierDistances = getBarrierDistances(aiTank.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2, aiTank.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2, barriers, mapWidth, mapHeight);
    features.push(...barrierDistances.map((d)=>normalize(d, 0, Math.max(mapWidth, mapHeight))));
    // 8. Game state (2 features)
    features.push(normalize(context.tickTime % 10000, 0, 10000)); // Time modulo
    features.push(normalize(mapWidth, 0, 2000)); // Map size indicator
    // Total: 4 + 4 + 3 + 1 + (20 * 5) + (10 * 3) + 8 + 2 = 152 features
    return {
        vector: features,
        size: features.length
    };
}
/**
 * Normalize a value to [0, 1] range
 */ function normalize(value, min, max) {
    if (max === min) return 0.5;
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
/**
 * Normalize angle to [0, 1] range (0-360 degrees -> 0-1)
 */ function normalizeAngle(angle) {
    // Normalize angle to 0-360
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized / 360;
}
/**
 * Normalize angle difference to [-1, 1] range
 */ function normalizeAngleDifference(angleDiff) {
    // Normalize to -180 to 180
    while(angleDiff > 180)angleDiff -= 360;
    while(angleDiff < -180)angleDiff += 360;
    return angleDiff / 180; // Normalize to -1 to 1
}
/**
 * Get distances to nearest barriers in 8 directions
 * Optimized with pre-computed barrier bounds
 */ function getBarrierDistances(x, y, barriers, mapWidth, mapHeight) {
    const directions = [
        {
            dx: 1,
            dy: 0
        },
        {
            dx: 1,
            dy: 1
        },
        {
            dx: 0,
            dy: 1
        },
        {
            dx: -1,
            dy: 1
        },
        {
            dx: -1,
            dy: 0
        },
        {
            dx: -1,
            dy: -1
        },
        {
            dx: 0,
            dy: -1
        },
        {
            dx: 1,
            dy: -1
        }
    ];
    // Get cached barrier bounds (only recomputed if barriers array reference changes)
    const barrierBounds = getBarrierBounds(barriers);
    const step = 5; // Check every 5 pixels
    const maxDistance = Math.max(mapWidth, mapHeight);
    return directions.map((dir)=>{
        let distance = 0;
        while(distance < maxDistance){
            const testX = x + dir.dx * distance;
            const testY = y + dir.dy * distance;
            // Check if out of bounds
            if (testX < 0 || testX > mapWidth || testY < 0 || testY > mapHeight) {
                break;
            }
            // Use pre-computed bounds for faster barrier check
            // Early exit when barrier found
            let hitBarrier = false;
            for (const bounds of barrierBounds){
                if (testX >= bounds.left && testX <= bounds.right && testY >= bounds.top && testY <= bounds.bottom) {
                    hitBarrier = true;
                    break;
                }
            }
            if (hitBarrier) {
                break;
            }
            distance += step;
        }
        return distance;
    });
}
function getObservationSize() {
    return 4 + 4 + 3 + 1 + MAX_BULLETS * BULLET_FEATURES + MAX_SUNS * SUN_FEATURES + BARRIER_DIRECTIONS + 2;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RL Model Interface
 * 
 * Defines the interface for RL models and provides a way to load/use
 * trained models. Supports both TensorFlow.js models and custom implementations.
 */ __turbopack_context__.s([
    "RLModelManager",
    ()=>RLModelManager,
    "RuleBasedRLModel",
    ()=>RuleBasedRLModel,
    "TensorFlowJSModel",
    ()=>TensorFlowJSModel,
    "rlModelManager",
    ()=>rlModelManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-actions.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-action-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
;
;
class RuleBasedRLModel {
    loaded = true;
    isLoaded() {
        return this.loaded;
    }
    async load(_path) {
        this.loaded = true;
    }
    async predict(observation, currentAngle) {
        // Simple rule-based decision based on observation
        // This is just a placeholder - in practice, you'd use a trained model
        // Extract some key features
        const enemyX = observation.vector[4];
        const enemyY = observation.vector[5];
        const angleToEnemy = observation.vector[11]; // Normalized angle difference
        // Simple strategy: rotate toward enemy and shoot
        let angleDelta = 0;
        let moveDirection = 0;
        let shouldShoot = false;
        // Rotate toward enemy
        if (Math.abs(angleToEnemy) > 0.1) {
            angleDelta = angleToEnemy > 0 ? 5 : -5;
        }
        // Move forward if roughly facing enemy
        if (Math.abs(angleToEnemy) < 0.2) {
            moveDirection = 1;
            shouldShoot = true;
        }
        return {
            angleDelta,
            moveDirection,
            shouldShoot
        };
    }
    getInfo() {
        return {
            name: 'Rule-Based Fallback',
            type: 'discrete',
            observationSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getObservationSize"])(),
            actionSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NUM_DISCRETE_ACTIONS"]
        };
    }
}
class TensorFlowJSModel {
    loaded = false;
    model = null;
    info;
    constructor(info){
        this.info = info;
    }
    isLoaded() {
        return this.loaded && this.model !== null;
    }
    async load(path) {
        try {
            // TODO: Implement TensorFlow.js model loading
            // Example:
            // const tf = await import('@tensorflow/tfjs');
            // this.model = await tf.loadLayersModel(path);
            // this.loaded = true;
            // Removed warning logs
            this.loaded = false;
        } catch (error) {
            // Removed error log
            this.loaded = false;
            throw error;
        }
    }
    async predict(observation, currentAngle) {
        if (!this.isLoaded()) {
            throw new Error('Model not loaded');
        }
        // TODO: Implement TensorFlow.js prediction
        // Example:
        // const tf = await import('@tensorflow/tfjs');
        // const input = tf.tensor2d([observation.vector]);
        // const output = this.model.predict(input) as tf.Tensor;
        // const action = await output.data();
        // return actionToDecision(action[0], currentAngle);
        throw new Error('TensorFlow.js prediction not yet implemented');
    }
    getInfo() {
        return this.info;
    }
}
class RLModelManager {
    model = null;
    fallbackModel;
    constructor(){
        this.fallbackModel = new RuleBasedRLModel();
    }
    /**
   * Set the active model
   */ setModel(model) {
        this.model = model;
    }
    /**
   * Get the active model (or fallback)
   */ getModel() {
        return this.model && this.model.isLoaded() ? this.model : this.fallbackModel;
    }
    /**
   * Check if RL model is active
   */ isRLActive() {
        return this.model !== null && this.model.isLoaded();
    }
    /**
   * Load model from path
   */ async loadModel(path) {
        if (!this.model) {
            throw new Error('No model set. Call setModel() first.');
        }
        await this.model.load(path);
    }
}
const rlModelManager = new RLModelManager();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/controller.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeAIDecision",
    ()=>makeAIDecision
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$threat$2d$assessment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/threat-assessment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$sun$2d$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/sun-calculations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/prediction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/tank-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet-optimization.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
async function makeAIDecision(context) {
    const { aiTank, enemyTank, bullets, barriers, suns, mapWidth, mapHeight, tickTime, config } = context;
    // Skip if tank is respawning or exploding
    if (aiTank.respawning || aiTank.exploding || aiTank.lives <= 0) {
        return {
            angleDelta: 0,
            moveDirection: 0,
            shouldShoot: false
        };
    }
    // Try to use RL model if available
    // Note: This function is now async to support async model predictions
    if (__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].isRLActive()) {
        try {
            const model = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].getModel();
            const observation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractObservation"])(context);
            const decision = await model.predict(observation, aiTank.angle);
            return decision;
        } catch (error) {
        // Removed warning log
        // Fall through to rule-based AI
        }
    }
    // Fall back to rule-based AI
    return makeRuleBasedDecision(context);
}
/**
 * Rule-based decision making (original implementation)
 */ function makeRuleBasedDecision(context) {
    const { aiTank, enemyTank, bullets, barriers, suns, mapWidth, mapHeight, config } = context;
    // Assess threats
    const threats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$threat$2d$assessment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assessThreats"])(aiTank, bullets, suns, barriers, mapWidth, mapHeight, config.maxPredictionTime);
    // More aggressive: only dodge if threat is truly imminent (very high threat level)
    // This encourages movement toward enemy even when under moderate threat
    const hasUrgentThreat = threats.length > 0 && threats[0].threatLevel > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_THREAT_THRESHOLD"];
    // Decision making: only dodge for truly urgent threats, otherwise always attack
    if (hasUrgentThreat) {
        return handleDodge(context, threats);
    }
    // Otherwise, pursue and attack aggressively
    return handleAttack(context);
}
/**
 * Handle dodging from threats
 */ function handleDodge(context, threats) {
    const { aiTank, enemyTank, barriers, suns, mapWidth, mapHeight, config, bullets } = context;
    // Find escape direction
    const escape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$threat$2d$assessment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findEscapeDirection"])(aiTank, threats, barriers, suns, mapWidth, mapHeight);
    // Find safe position to dodge to
    const dodgePos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSafeDodgePosition"])(aiTank, escape.angle, config.dodgeMargin * 2, barriers, suns, [
        aiTank,
        enemyTank
    ], mapWidth, mapHeight, 1 // AI is tank index 1
    );
    let angleDelta = 0;
    let moveDirection = 0;
    if (dodgePos) {
        // Calculate angle to dodge position
        const aiCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(aiTank);
        const targetAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["angleToPoint"])(aiCenter, dodgePos);
        // Calculate angle difference
        let angleDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAngleDifference"])(targetAngle - aiTank.angle);
        // Rotate toward target
        if (Math.abs(angleDiff) > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"]) {
            angleDelta = angleDiff > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"] : -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
        } else {
            angleDelta = angleDiff;
        }
        // Move forward
        moveDirection = 1;
    } else {
        // Can't dodge to position, just rotate away from threat
        let angleDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAngleDifference"])(escape.angle - aiTank.angle);
        if (Math.abs(angleDiff) > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"]) {
            angleDelta = angleDiff > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"] : -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
        } else {
            angleDelta = angleDiff;
        }
        // Try to move backward
        moveDirection = -1;
    }
    // Even while dodging, try to shoot if possible (more aggressive)
    // But prioritize dodging movement
    return {
        angleDelta,
        moveDirection,
        shouldShoot: false
    };
}
/**
 * Handle attacking the enemy
 */ function handleAttack(context) {
    const { aiTank, enemyTank, bullets, barriers, suns, mapWidth, mapHeight, tickTime, config } = context;
    // Predict enemy position
    const predictedEnemyPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$prediction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictTankPosition"])(enemyTank, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENEMY_PREDICTION_TIME_MS"], __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"]);
    // Calculate optimal shot
    const shot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$sun$2d$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateOptimalShotAngle"])(aiTank, predictedEnemyPos, suns, barriers, mapWidth, mapHeight, config.sunSkill);
    // Calculate optimal position
    const optimalPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateOptimalPosition"])(aiTank, enemyTank, config.aggressiveness, barriers, suns, mapWidth, mapHeight);
    // Calculate movement decision - always aggressive
    let angleDelta = 0;
    let moveDirection = 0;
    // Always rotate toward enemy/shot angle (prioritize shooting over positioning)
    const targetAngle = shot.angle; // Always prioritize shooting angle
    let angleDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAngleDifference"])(targetAngle - aiTank.angle);
    if (Math.abs(angleDiff) > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"]) {
        angleDelta = angleDiff > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"] : -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROTATION_SPEED"];
    } else {
        angleDelta = angleDiff;
    }
    // Always move toward enemy (aggressive behavior - move forward whenever possible)
    // Calculate angle directly to enemy
    const aiCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(aiTank);
    const enemyCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(enemyTank);
    const moveAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["angleToPoint"])(aiCenter, enemyCenter);
    const normalizedMoveDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAngleDifference"])(moveAngle - aiTank.angle);
    // Always move forward toward enemy if facing roughly the right direction (wider tolerance)
    if (Math.abs(normalizedMoveDiff) < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVE_FORWARD_ANGLE_TOLERANCE"]) {
        moveDirection = 1; // Forward
    } else if (Math.abs(normalizedMoveDiff) > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVE_BACKWARD_ANGLE_TOLERANCE"]) {
        moveDirection = -1; // Backward (to quickly reorient)
    } else {
        // Even if not perfectly aligned, still move forward if somewhat close
        moveDirection = 1; // Always move forward aggressively
    }
    // Decide whether to shoot - more aggressive shooting
    let shouldShoot = false;
    let shootAngle;
    // Check if we have bullets available (use optimized counting)
    const bulletCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countBulletsByOwner"])(bullets);
    const bulletCount = bulletCounts.get(aiTank.color) || 0;
    const canShoot = bulletCount < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_BULLETS_PER_TANK"];
    // More aggressive shooting: lower confidence threshold, wider angle tolerance
    if (canShoot && shot.confidence > 0.2 - config.accuracyPenalty) {
        // Apply accuracy penalty
        const adjustedConfidence = shot.confidence * (1 - config.accuracyPenalty);
        // Shoot if confidence is reasonable and angle is somewhat close (wider tolerance)
        if (adjustedConfidence > 0.15 && Math.abs(angleDiff) < 45) {
            shouldShoot = true;
            shootAngle = shot.angle;
        }
    }
    return {
        angleDelta,
        moveDirection,
        shouldShoot,
        shootAngle
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_AI_CONFIG",
    ()=>DEFAULT_AI_CONFIG,
    "EASY_AI_CONFIG",
    ()=>EASY_AI_CONFIG,
    "HARD_AI_CONFIG",
    ()=>HARD_AI_CONFIG
]);
const DEFAULT_AI_CONFIG = {
    reactionDelay: 30,
    accuracyPenalty: 0.08,
    aggressiveness: 0.85,
    sunSkill: 0.65,
    maxPredictionTime: 3000,
    dodgeMargin: 25
};
const EASY_AI_CONFIG = {
    reactionDelay: 150,
    accuracyPenalty: 0.3,
    aggressiveness: 0.4,
    sunSkill: 0.3,
    maxPredictionTime: 2000,
    dodgeMargin: 40
};
const HARD_AI_CONFIG = {
    reactionDelay: 20,
    accuracyPenalty: 0.05,
    aggressiveness: 0.9,
    sunSkill: 0.85,
    maxPredictionTime: 4000,
    dodgeMargin: 20
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-reward-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Reward Configuration
 * 
 * Defines reward constants that match the shared game-config.json
 * This ensures consistency between TypeScript and Go implementations
 */ __turbopack_context__.s([
    "DEFAULT_REWARD_CONFIG",
    ()=>DEFAULT_REWARD_CONFIG
]);
const DEFAULT_REWARD_CONFIG = {
    timeoutPenalty: -100,
    maxEpisodeTimeMs: 60000,
    survivalRewardPerTick: 0.01,
    hitEnemyReward: 100,
    gotHitPenalty: -100,
    optimalDistanceToEnemy: 120,
    inactivityThresholdMs: 1500,
    significantMovementThreshold: 5,
    aggressionCheckIntervalMs: 2000,
    dodgeRewardPerBullet: 10,
    recentBulletThresholdMs: 100,
    positionHistorySize: 10,
    positionRepeatThreshold: 30,
    threatDistance: 50,
    bulletMatchDistance: 10,
    movementAwayThreshold: 10,
    shotAccuracyMaxDistance: 50,
    movementRewardMax: 0.15,
    movementRewardMultiplier: 0.0015,
    stagnationPenalty: -0.1,
    stalematePenalty: -0.2,
    repetitiveActionPenalty: -0.03,
    positionDiversityReward: 0.02,
    lifeAdvantageReward: 0.02,
    inactivityBasePenalty: -0.3,
    inactivityMaxPenalty: -0.5,
    inactivityScalingFactor: 0.1,
    lackOfAggressionPenalty: -0.15
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-reward.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Reward Function
 * 
 * Calculates rewards for the RL agent based on game state transitions.
 * Reward shaping is critical for RL success - rewards should guide the agent
 * toward desired behaviors.
 */ __turbopack_context__.s([
    "calculateReward",
    ()=>calculateReward
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/tank-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-reward-config.ts [app-client] (ecmascript)");
;
;
;
;
function calculateReward(previous, current, action, maxEpisodeTimeMs = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_EPISODE_TIME_MS"], config = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_REWARD_CONFIG"]) {
    let totalReward = 0;
    const breakdown = {};
    // Apply timeout penalty if episode exceeded max episode time (only once)
    if (previous.episodeStartTime && !previous.timeoutApplied) {
        const episodeElapsed = current.tickTime - previous.episodeStartTime;
        if (episodeElapsed >= maxEpisodeTimeMs) {
            const timeoutPenalty = config.timeoutPenalty;
            totalReward += timeoutPenalty;
            breakdown.timeoutPenalty = timeoutPenalty;
        }
    }
    // 1. Survival reward (small positive per tick)
    // Encourages staying alive
    const survivalReward = config.survivalRewardPerTick;
    totalReward += survivalReward;
    breakdown.survival = survivalReward;
    // 2. Hit enemy (large positive)
    // Check if enemy lost a life
    if (current.enemyLives < previous.enemyLives) {
        const hitReward = config.hitEnemyReward;
        totalReward += hitReward;
        breakdown.hitEnemy = hitReward;
    }
    // 3. Got hit (large negative)
    // Check if AI lost a life
    if (current.aiLives < previous.aiLives) {
        const hitPenalty = config.gotHitPenalty;
        totalReward += hitPenalty;
        breakdown.gotHit = hitPenalty;
    }
    // 4. Distance to enemy (shaped reward)
    // Reward maintaining optimal distance (not too close, not too far)
    // Optimal distance reasoning:
    // - Too close (< 80px): Hard to dodge, easy to get hit, bullets travel too fast
    // - Too far (> 200px): Hard to hit enemy, bullets take too long, less pressure
    // - Sweet spot (100-150px): Good balance - can dodge, can hit, maintains engagement
    // - Based on: map size (480x360), tank size (24px), bullet speed (~2px/tick)
    // - At 150px: ~75 ticks for bullet to travel, gives ~1 second reaction time at 72 FPS
    const prevDistance = getDistance(previous.aiTank, previous.enemyTank);
    const currDistance = getDistance(current.aiTank, current.enemyTank);
    const optimalDistance = config.optimalDistanceToEnemy;
    const prevDistanceError = Math.abs(prevDistance - optimalDistance) / optimalDistance;
    const currDistanceError = Math.abs(currDistance - optimalDistance) / optimalDistance;
    // Reward getting closer to optimal distance
    const distanceImprovement = prevDistanceError - currDistanceError;
    const distanceReward = distanceImprovement * 2; // Scale factor
    totalReward += distanceReward;
    breakdown.distanceReward = distanceReward;
    // 5. Dodged bullet (positive)
    // Check if a bullet that was threatening is now gone or missed
    const dodgedReward = checkDodgedBullet(previous, current, config);
    if (dodgedReward > 0) {
        totalReward += dodgedReward;
        breakdown.dodgedBullet = dodgedReward;
    }
    // 6. Shot accuracy (reward for shots that get close to enemy)
    if (action.shouldShoot) {
        // Find bullets that were just created (within threshold)
        const recentBulletThresholdMs = config.recentBulletThresholdMs;
        for (const bullet of current.bullets){
            // Check owner and recency in single pass
            if (bullet.owner === current.aiTank.color && current.tickTime - bullet.createdAt < recentBulletThresholdMs) {
                const closestApproach = getClosestBulletApproach(bullet, current.enemyTank);
                // Reward inversely proportional to closest approach
                const accuracyReward = Math.max(0, 5 * (1 - closestApproach / config.shotAccuracyMaxDistance));
                totalReward += accuracyReward;
                breakdown.shotAccuracy = (breakdown.shotAccuracy || 0) + accuracyReward;
            }
        }
    }
    // 7. Life advantage (encourage maintaining/improving life advantage)
    // Only reward maintaining advantage, not changes (changes are handled by hit rewards above)
    const prevLifeDiff = previous.aiLives - previous.enemyLives;
    const currLifeDiff = current.aiLives - current.enemyLives;
    // Small bonus for having life advantage (maintains incentive when ahead)
    if (currLifeDiff > 0) {
        const lifeAdvantageReward = config.lifeAdvantageReward;
        totalReward += lifeAdvantageReward;
        breakdown.lifeAdvantage = lifeAdvantageReward;
    }
    // 8. Movement reward (encourage active movement, penalize staying still)
    // Cache distance calculation to avoid redundant sqrt operations
    const movementDistance = getDistance(previous.aiTank, current.aiTank);
    const moved = movementDistance > 0.1;
    if (moved) {
        // Reward proportional to distance moved (encourage significant movement)
        const movementReward = Math.min(config.movementRewardMax, movementDistance * config.movementRewardMultiplier);
        totalReward += movementReward;
        breakdown.movement = movementReward;
    } else {
        // Increased penalty for not moving (stalling) - stronger penalty to encourage movement
        const stagnationPenalty = config.stagnationPenalty;
        totalReward += stagnationPenalty;
        breakdown.stagnationPenalty = stagnationPenalty;
        breakdown.movement = stagnationPenalty;
    }
    // 9. Stalemate detection (both tanks in similar positions, not making progress)
    // Cache distance calculations to avoid redundant sqrt operations
    const tankDistance = getDistance(current.aiTank, current.enemyTank);
    const prevTankDistance = getDistance(previous.aiTank, previous.enemyTank);
    const distanceChange = Math.abs(tankDistance - prevTankDistance);
    // Check if both tanks are in a stalemate situation
    // Stalemate: tanks aren't changing relative positions much, and AI isn't moving much
    // This catches both close-range standoffs and long-range circling
    const isStalemate = distanceChange < 5 && // Distance between tanks isn't changing much
    movementDistance < 2; // AI tank isn't moving much
    if (isStalemate) {
        // Stronger penalty for stalemate - encourages breaking out of deadlock
        const stalematePenalty = config.stalematePenalty;
        totalReward += stalematePenalty;
        breakdown.stalematePenalty = stalematePenalty;
    }
    // 10. Repetitive action penalty (shooting without movement or progress)
    // Penalize if shooting repeatedly without moving or making progress
    if (action.shouldShoot && !moved && current.bullets.length >= previous.bullets.length) {
        // Shooting but not moving and bullet count isn't decreasing (bullets colliding or missing)
        const repetitiveActionPenalty = config.repetitiveActionPenalty;
        totalReward += repetitiveActionPenalty;
        breakdown.repetitiveActionPenalty = repetitiveActionPenalty;
    }
    // 11. Position diversity reward (encourage exploring different positions)
    // Track if tank has been in similar position recently (if history available)
    if (previous.aiPositionHistory && previous.aiPositionHistory.length > 0) {
        const positionRepeatThreshold = config.positionRepeatThreshold;
        const positionHistorySize = config.positionHistorySize;
        // Only check recent positions (avoid full array slice if history is large)
        const startIdx = Math.max(0, previous.aiPositionHistory.length - positionHistorySize);
        const currentPos = {
            x: current.aiTank.x,
            y: current.aiTank.y
        };
        // Check if current position is similar to recent positions (early exit optimization)
        let isRepeatingPosition = false;
        for(let i = startIdx; i < previous.aiPositionHistory.length; i++){
            const pos = previous.aiPositionHistory[i];
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(currentPos.x, currentPos.y, pos.x, pos.y);
            if (dist < positionRepeatThreshold) {
                isRepeatingPosition = true;
                break; // Early exit when repeat found
            }
        }
        if (!isRepeatingPosition && moved) {
            // Reward for moving to a new area
            const diversityReward = config.positionDiversityReward;
            totalReward += diversityReward;
            breakdown.movement = (breakdown.movement || 0) + diversityReward;
        }
    }
    // 12. Inactivity penalty (tank sitting still for more than 1.5 seconds)
    const inactivityThreshold = config.inactivityThresholdMs;
    const significantMovementThreshold = config.significantMovementThreshold;
    if (moved && movementDistance >= significantMovementThreshold) {
    // Tank moved significantly, update last movement time
    // This will be tracked in the environment state
    } else {
        // Tank didn't move significantly, check if it's been inactive too long
        const lastMovementTime = previous.lastMovementTime || previous.episodeStartTime || previous.tickTime;
        const timeSinceLastMovement = current.tickTime - lastMovementTime;
        if (timeSinceLastMovement >= inactivityThreshold) {
            // Stronger penalty that scales with inactivity duration
            const inactivityDuration = timeSinceLastMovement - inactivityThreshold;
            const scalingPenalty = Math.min(config.inactivityMaxPenalty, config.inactivityBasePenalty - inactivityDuration / 1000 * config.inactivityScalingFactor);
            totalReward += scalingPenalty;
            breakdown.inactivityPenalty = scalingPenalty;
        }
    }
    // 13. Lack of aggression penalty
    // Penalize if tank is not being aggressive enough (not shooting, not moving toward enemy, etc.)
    const aggressionCheckInterval = config.aggressionCheckIntervalMs;
    const timeSinceLastShot = previous.lastShotTime ? current.tickTime - previous.lastShotTime : Infinity;
    // Check if tank is being passive:
    // - Not shooting for a while (more than 2 seconds)
    // - Moving away from enemy
    // - Not closing distance to enemy
    const isPassive = timeSinceLastShot > aggressionCheckInterval && // Not shooting
    !action.shouldShoot && // Not about to shoot
    movementDistance < 2; // Not moving much
    // Also check if moving away from enemy
    const distanceToEnemyChange = currDistance - prevDistance;
    const isMovingAway = distanceToEnemyChange > config.movementAwayThreshold;
    if (isPassive || isMovingAway && !action.shouldShoot) {
        const lackOfAggressionPenalty = config.lackOfAggressionPenalty;
        totalReward += lackOfAggressionPenalty;
        breakdown.lackOfAggressionPenalty = lackOfAggressionPenalty;
    }
    return {
        reward: totalReward,
        breakdown
    };
}
/**
 * Get Euclidean distance between two tanks
 * Uses utility function for consistency
 */ function getDistance(tank1, tank2) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(tank1.x, tank1.y, tank2.x, tank2.y);
}
/**
 * Check if AI successfully dodged a bullet
 * 
 * Returns reward if a bullet that was close to AI is now gone or far away
 * Optimized to use Map for O(1) lookups instead of O(n) searches
 */ function checkDodgedBullet(previous, current, config) {
    const threatDistance = config.threatDistance;
    const bulletMatchDistance = config.bulletMatchDistance;
    // Find bullets that were threatening AI in previous state
    const threateningBullets = [];
    for (const bullet of previous.bullets){
        if (bullet.owner === previous.aiTank.color || bullet.exploding) {
            continue; // Ignore own bullets and exploding bullets
        }
        const dist = getDistanceToTank(bullet, previous.aiTank);
        if (dist < threatDistance) {
            threateningBullets.push(bullet);
        }
    }
    // Create a Map of current bullets by owner for faster lookup
    // Key: owner, Value: array of bullets from that owner
    const currentBulletsByOwner = new Map();
    for (const bullet of current.bullets){
        if (!bullet.exploding) {
            const bullets = currentBulletsByOwner.get(bullet.owner) || [];
            bullets.push(bullet);
            currentBulletsByOwner.set(bullet.owner, bullets);
        }
    }
    // Check if any threatening bullets are now gone or far away
    let dodgedCount = 0;
    const aiTankCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(current.aiTank);
    for (const prevBullet of threateningBullets){
        const ownerBullets = currentBulletsByOwner.get(prevBullet.owner) || [];
        // Check if a similar bullet still exists (matching by position)
        let stillThreatening = false;
        for (const currBullet of ownerBullets){
            const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(currBullet.x, currBullet.y, prevBullet.x, prevBullet.y);
            if (dist < bulletMatchDistance) {
                stillThreatening = true;
                break;
            }
        }
        if (!stillThreatening) {
            // Bullet is gone - check if closest bullet from same owner is now far away
            let minDistance = Infinity;
            for (const currBullet of ownerBullets){
                const dist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(currBullet.x, currBullet.y, aiTankCenter.x, aiTankCenter.y);
                if (dist < minDistance) {
                    minDistance = dist;
                }
            }
            if (minDistance > threatDistance) {
                dodgedCount++;
            }
        }
    }
    return dodgedCount * config.dodgeRewardPerBullet;
}
/**
 * Get distance from bullet to tank center
 * Uses utility functions for consistency and performance
 */ function getDistanceToTank(bullet, tank) {
    const tankCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTankCenter"])(tank);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance"])(bullet.x, bullet.y, tankCenter.x, tankCenter.y);
}
/**
 * Calculate closest approach distance of bullet to tank
 * 
 * This is a simplified calculation - in reality, we'd need to account for
 * bullet trajectory and tank movement.
 */ function getClosestBulletApproach(bullet, tank) {
    // Simplified: just use current distance
    // In a full implementation, we'd predict the bullet path
    return getDistanceToTank(bullet, tank);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-environment.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RL Environment Wrapper
 * 
 * Wraps the Tank Trouble game as a reinforcement learning environment.
 * Converts game state to observations, executes actions, and calculates rewards.
 */ __turbopack_context__.s([
    "TankTroubleRLEnv",
    ()=>TankTroubleRLEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-reward.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-reward-config.ts [app-client] (ecmascript)");
;
;
;
;
class TankTroubleRLEnv {
    previousState = null;
    episodeStartTime = 0;
    episodeLength = 0;
    totalReward = 0;
    positionHistory = [];
    maxEpisodeTimeMs;
    constructor(maxEpisodeTimeMs = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_EPISODE_TIME_MS"]){
        this.maxEpisodeTimeMs = maxEpisodeTimeMs;
    }
    /**
   * Reset the environment to initial state
   */ reset(context) {
        const observation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractObservation"])(context);
        // Reset position history
        this.positionHistory = [
            {
                x: context.aiTank.x,
                y: context.aiTank.y,
                tickTime: context.tickTime
            }
        ];
        // Store initial state
        this.episodeStartTime = context.tickTime;
        this.previousState = {
            aiTank: {
                ...context.aiTank
            },
            enemyTank: {
                ...context.enemyTank
            },
            bullets: context.bullets.map((b)=>({
                    ...b
                })),
            aiLives: context.aiTank.lives,
            enemyLives: context.enemyTank.lives,
            tickTime: context.tickTime,
            aiPositionHistory: [],
            lastMovementTime: context.tickTime,
            lastShotTime: 0,
            episodeStartTime: context.tickTime,
            timeoutApplied: false
        };
        this.episodeLength = 0;
        this.totalReward = 0;
        return {
            observation,
            reward: 0,
            done: false,
            info: {
                episodeLength: 0,
                totalReward: 0,
                aiLives: context.aiTank.lives,
                enemyLives: context.enemyTank.lives
            }
        };
    }
    /**
   * Step the environment with an action
   * 
   * @param action - Action from RL agent (discrete or continuous)
   * @param context - Current game context
   * @param decision - The decision that was executed (for reward calculation)
   * @returns Next state, reward, done flag, and info
   */ step(action, context, decision) {
        if (!this.previousState) {
            // If not initialized, reset first
            return this.reset(context);
        }
        // Calculate reward based on state transition (no boolean arguments needed)
        const rewardInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateReward"])(this.previousState, {
            aiTank: context.aiTank,
            enemyTank: context.enemyTank,
            bullets: context.bullets,
            aiLives: context.aiTank.lives,
            enemyLives: context.enemyTank.lives,
            tickTime: context.tickTime
        }, decision, this.maxEpisodeTimeMs, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_REWARD_CONFIG"]);
        this.totalReward += rewardInfo.reward;
        this.episodeLength++;
        // Check if episode is done
        const done = this.isDone(context);
        // Extract new observation
        const observation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractObservation"])(context);
        // Update position history (keep last 20 positions)
        this.positionHistory.push({
            x: context.aiTank.x,
            y: context.aiTank.y,
            tickTime: context.tickTime
        });
        if (this.positionHistory.length > 20) {
            this.positionHistory.shift();
        }
        // Track movement and shooting for inactivity/aggression penalties
        const movementDistance = Math.sqrt(Math.pow(context.aiTank.x - this.previousState.aiTank.x, 2) + Math.pow(context.aiTank.y - this.previousState.aiTank.y, 2));
        const SIGNIFICANT_MOVEMENT_THRESHOLD = 5; // pixels
        const lastMovementTime = movementDistance >= SIGNIFICANT_MOVEMENT_THRESHOLD ? context.tickTime : this.previousState.lastMovementTime || context.tickTime;
        const lastShotTime = decision.shouldShoot ? context.tickTime : this.previousState.lastShotTime || 0;
        // Check if timeout penalty was applied (check in reward function, but track here)
        const episodeElapsed = context.tickTime - this.episodeStartTime;
        const timeoutApplied = episodeElapsed >= this.maxEpisodeTimeMs && !this.previousState?.timeoutApplied;
        // Update previous state
        this.previousState = {
            aiTank: {
                ...context.aiTank
            },
            enemyTank: {
                ...context.enemyTank
            },
            bullets: context.bullets.map((b)=>({
                    ...b
                })),
            aiLives: context.aiTank.lives,
            enemyLives: context.enemyTank.lives,
            tickTime: context.tickTime,
            aiPositionHistory: [
                ...this.positionHistory
            ],
            lastMovementTime,
            lastShotTime,
            episodeStartTime: this.episodeStartTime,
            timeoutApplied: timeoutApplied || this.previousState?.timeoutApplied || false
        };
        return {
            observation,
            reward: rewardInfo.reward,
            done,
            info: {
                episodeLength: this.episodeLength,
                totalReward: this.totalReward,
                aiLives: context.aiTank.lives,
                enemyLives: context.enemyTank.lives,
                ...rewardInfo.breakdown
            }
        };
    }
    /**
   * Get current observation without stepping
   */ getObservation(context) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractObservation"])(context);
    }
    /**
   * Check if episode is done
   */ isDone(context) {
        // Episode ends when:
        // 1. AI tank has no lives left
        // 2. Enemy tank has no lives left
        // 3. Episode exceeds max episode time (timeout)
        if (context.aiTank.lives <= 0 || context.enemyTank.lives <= 0) {
            return true;
        }
        // Check if episode has exceeded max episode time
        const episodeElapsed = context.tickTime - this.episodeStartTime;
        if (episodeElapsed >= this.maxEpisodeTimeMs) {
            return true;
        }
        return false;
    }
    /**
   * Get episode statistics
   */ getStats() {
        return {
            episodeLength: this.episodeLength,
            totalReward: this.totalReward
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-training-example.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trainRLAgent",
    ()=>trainRLAgent,
    "useTrainedModel",
    ()=>useTrainedModel
]);
/**
 * Example RL Training Script
 * 
 * This is a template for training an RL agent. In practice, you would:
 * 1. Use Python with Stable-Baselines3 for faster training
 * 2. Or use TensorFlow.js for browser-based training (slower but simpler)
 * 
 * This example shows the structure but requires actual RL implementation.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$environment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-environment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-actions.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-action-config.ts [app-client] (ecmascript)");
;
;
;
;
async function trainRLAgent(episodes = 1000, modelPath) {
    // Removed debug logs
    // Initialize environment
    const env = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$environment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TankTroubleRLEnv"]();
    // Initialize model (placeholder - would be actual RL model)
    const model = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TensorFlowJSModel"]({
        name: 'TankTroubleRL',
        type: 'discrete',
        observationSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getObservationSize"])(),
        actionSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NUM_DISCRETE_ACTIONS"]
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].setModel(model);
    if (modelPath) {
        try {
            await model.load(modelPath);
        // Model loaded
        } catch (error) {
        // No existing model found, starting fresh
        }
    }
    // Training statistics
    const stats = {
        episode: 0,
        totalReward: 0
    };
    // Example training loop structure
    for(let episode = 0; episode < episodes; episode++){
        stats.episode = episode;
        // Reset environment (would get initial game state)
        // const initialState = getInitialGameState();
        // let state = env.reset(initialState);
        let episodeReward = 0;
        let done = false;
        let stepCount = 0;
        // Episode loop
        while(!done && stepCount < 10000){
            // TODO: Implement actual RL algorithm
            // 1. Select action (epsilon-greedy, policy, etc.)
            // 2. Execute action in environment
            // 3. Observe reward and next state
            // 4. Store experience in replay buffer
            // 5. Update model (if batch ready)
            stepCount++;
        }
        // Log episode statistics (removed console.log)
        // TODO: Save model periodically
        if (episode % 1000 === 0 && modelPath) {
        // await model.save(modelPath);
        }
    }
    return stats;
}
function useTrainedModel(modelPath) {
    const model = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TensorFlowJSModel"]({
        name: 'TankTroubleRL',
        type: 'discrete',
        observationSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getObservationSize"])(),
        actionSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NUM_DISCRETE_ACTIONS"]
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].setModel(model);
    // Load model
    model.load(modelPath).then(()=>{
    // Model loaded successfully
    }).catch((error)=>{
    // Failed to load model, falling back to rule-based AI
    });
} /**
 * Python Training Example (Recommended)
 * 
 * For actual training, use Python with Stable-Baselines3:
 * 
 * ```python
 * from stable_baselines3 import PPO
 * from stable_baselines3.common.env_util import make_vec_env
 * from tank_trouble_env import TankTroubleEnv
 * 
 * # Create environment
 * env = make_vec_env(TankTroubleEnv, n_envs=4)
 * 
 * # Create and train model
 * model = PPO("MlpPolicy", env, verbose=1)
 * model.learn(total_timesteps=1_000_000)
 * 
 * # Save model
 * model.save("tank_ai_ppo")
 * 
 * # Export for TensorFlow.js (requires conversion)
 * # See: https://www.tensorflow.org/js/guide/conversion
 * ```
 */ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * AI Tank System - Main Entry Point
 * 
 * This module exports the main AI tank update function and configuration
 */ __turbopack_context__.s([
    "updateAITank",
    ()=>updateAITank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$controller$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/controller.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$creation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet-creation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/tank-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet-optimization.ts [app-client] (ecmascript)");
// Export RL components
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$environment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-environment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$reward$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-reward.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-actions.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-action-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$training$2d$example$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-training-example.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
async function updateAITank(params, aiConfig = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_AI_CONFIG"], trainingManager, gameId) {
    const { tank, tankIndex, tickTime, lastShotTime, bullets, mapWidth, mapHeight, barriers, suns, allTanks } = params;
    // Find enemy tank - optimized O(1) lookup instead of O(n) find
    // Tanks array is always [blue, red], so use index directly
    let enemyTank;
    if (allTanks.length >= 2 && tankIndex !== undefined) {
        // Direct index lookup: enemy is the other tank
        const enemyIndex = tankIndex === 0 ? 1 : 0;
        enemyTank = allTanks[enemyIndex];
        // Validate enemy tank exists and has lives
        if (!enemyTank || enemyTank.lives <= 0) {
            // Fallback: try the other index if current enemy is invalid
            const fallbackIndex = enemyIndex === 0 ? 1 : 0;
            enemyTank = allTanks[fallbackIndex] || enemyTank;
        }
    } else {
        // Fallback to find if array structure is unexpected (defensive)
        enemyTank = allTanks.find((t)=>t && t.color !== tank.color && t.lives > 0) || allTanks.find((t)=>t && t !== tank);
    }
    // If still no enemy tank, use a dummy tank at center of map (shouldn't happen in normal gameplay)
    if (!enemyTank) {
        enemyTank = {
            x: mapWidth / 2,
            y: mapHeight / 2,
            angle: 0,
            lives: 3,
            color: tank.color === 'blue' ? 'red' : 'blue'
        };
    }
    // Create AI context
    const context = {
        aiTank: tank,
        enemyTank,
        bullets,
        barriers,
        suns,
        mapWidth,
        mapHeight,
        tickTime,
        config: aiConfig
    };
    // Get AI decision (async)
    const decision = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$controller$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAIDecision"])(context);
    // If training, collect step (async, don't wait)
    if (trainingManager && trainingManager.getIsTraining()) {
        trainingManager.step(context, decision, undefined, gameId).catch(()=>{
        // Silently handle errors
        });
    }
    // Apply decision to tank
    let newAngle = tank.angle + decision.angleDelta;
    let newX = tank.x;
    let newY = tank.y;
    const newBullets = [];
    let newLastShotTime = lastShotTime;
    // Handle movement
    if (decision.moveDirection !== 0) {
        const rad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degToRad"])(newAngle);
        const speed = decision.moveDirection > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"] : -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SPEED"] * 0.7; // Backward is slower
        const dx = Math.cos(rad) * speed;
        const dy = Math.sin(rad) * speed;
        const testX = newX + dx;
        const testY = newY + dy;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canMoveTo"])(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
            newX = testX;
            newY = testY;
        }
    }
    // Handle shooting
    if (decision.shouldShoot && tickTime - lastShotTime > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].game.shootingCooldown) {
        const bulletCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$optimization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countBulletsByOwner"])(bullets);
        const bulletCount = bulletCounts.get(tank.color) || 0;
        if (bulletCount < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_BULLETS_PER_TANK"]) {
            const shootAngle = decision.shootAngle ?? newAngle;
            const bullet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2d$creation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBullet"])({
                ...tank,
                x: newX,
                y: newY,
                angle: shootAngle
            }, shootAngle, tickTime, tank.color);
            newBullets.push(bullet);
            newLastShotTime = tickTime;
        }
    }
    // Clamp position
    const clamped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampTankPosition"])(newX, newY, mapWidth, mapHeight);
    newX = clamped.x;
    newY = clamped.y;
    return {
        updatedTank: {
            ...tank,
            x: newX,
            y: newY,
            angle: newAngle
        },
        newBullets,
        lastShotTime: newLastShotTime,
        decision
    };
}
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/components/GameLogic.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMultiGameLogic",
    ()=>useMultiGameLogic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/tank.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/bullet.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/spawn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function useMultiGameLogic({ mapData, barriers, suns, aiConfig, trainingManager, maxEpisodeTimeMs = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_EPISODE_TIME_MS"], gameInstances, onTanksUpdate, onBulletsUpdate, onLastShotTimesUpdate, onGameOver }) {
    _s();
    // Track game over states per game
    const gameOverTriggeredRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // Track last tick times per game
    const lastTickRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // Track tank/bullet refs per game
    const tanksRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const bulletsRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // Store latest gameInstances in ref for access in callback (avoid stale closure)
    const gameInstancesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(gameInstances);
    // Create a Map for O(1) lookup by gameId instead of O(n) filter
    const gameInstancesMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMultiGameLogic.useEffect": ()=>{
            gameInstancesRef.current = gameInstances;
            // Update Map for efficient lookups
            const map = new Map();
            gameInstances.forEach({
                "useMultiGameLogic.useEffect": (instance)=>{
                    map.set(instance.id, instance);
                }
            }["useMultiGameLogic.useEffect"]);
            gameInstancesMapRef.current = map;
        }
    }["useMultiGameLogic.useEffect"], [
        gameInstances
    ]);
    // Initialize refs for all games
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMultiGameLogic.useEffect": ()=>{
            gameInstances.forEach({
                "useMultiGameLogic.useEffect": (instance)=>{
                    if (!tanksRefs.current.has(instance.id)) {
                        tanksRefs.current.set(instance.id, instance.tanks);
                    }
                    if (!bulletsRefs.current.has(instance.id)) {
                        bulletsRefs.current.set(instance.id, instance.bullets);
                    }
                }
            }["useMultiGameLogic.useEffect"]);
        }
    }["useMultiGameLogic.useEffect"], [
        gameInstances
    ]);
    // Update refs when state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMultiGameLogic.useEffect": ()=>{
            gameInstances.forEach({
                "useMultiGameLogic.useEffect": (instance)=>{
                    const prevTanks = tanksRefs.current.get(instance.id);
                    tanksRefs.current.set(instance.id, instance.tanks);
                    bulletsRefs.current.set(instance.id, instance.bullets);
                    // Reset game over flag when tanks are reset (new game started)
                    if (instance.tanks.length >= 2 && instance.tanks[0]?.lives === __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.lives && instance.tanks[1]?.lives === __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].tank.lives) {
                        gameOverTriggeredRefs.current.set(instance.id, false);
                    }
                }
            }["useMultiGameLogic.useEffect"]);
        }
    }["useMultiGameLogic.useEffect"], [
        gameInstances
    ]);
    const gameTick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMultiGameLogic.useCallback[gameTick]": async (options)=>{
            // Use ref to get latest game instances (avoid stale closure)
            const currentGameInstances = gameInstancesRef.current;
            const gamesToTick = options?.gameId !== undefined ? ({
                "useMultiGameLogic.useCallback[gameTick]": ()=>{
                    // Use Map for O(1) lookup instead of O(n) filter
                    const instance = gameInstancesMapRef.current.get(options.gameId);
                    return instance ? [
                        instance
                    ] : [];
                }
            })["useMultiGameLogic.useCallback[gameTick]"]() : currentGameInstances;
            // Use for...of instead of forEach to support async/await
            for (const instance of gamesToTick){
                // Skip if paused
                if (instance.isPaused) {
                    continue;
                }
                const now = Date.now();
                const lastTickTime = lastTickRefs.current.get(instance.id) || 0;
                // Check interval (unless skipIntervalCheck is true)
                if (!options?.skipIntervalCheck) {
                    const adjustedTickInterval = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"] / instance.speedMultiplier;
                    if (now - lastTickTime < adjustedTickInterval) {
                        return;
                    }
                }
                const tickTime = now;
                lastTickRefs.current.set(instance.id, tickTime);
                const currentTanks = [
                    ...tanksRefs.current.get(instance.id) || []
                ];
                const currentBullets = [
                    ...bulletsRefs.current.get(instance.id) || []
                ];
                let newLastShotTimes = {
                    ...instance.lastShotTimes
                };
                const keys = instance.keysRef.current;
                // Validate tanks exist
                if (!currentTanks || currentTanks.length < 2) {
                    continue;
                }
                // Update Player 1 (Blue)
                if (currentTanks[0]?.lives > 0) {
                    let result;
                    if (instance.gameMode === 'person-vs-ai') {
                        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePlayer1Tank"])({
                            tank: currentTanks[0],
                            tankIndex: 0,
                            keys,
                            tickTime,
                            lastShotTime: instance.lastShotTimes.blue,
                            bullets: currentBullets,
                            mapWidth: mapData.width,
                            mapHeight: mapData.height,
                            barriers,
                            suns,
                            allTanks: currentTanks
                        });
                    } else if (trainingManager && trainingManager.getIsTraining() && instance.gameMode === 'ai') {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateAITank"])({
                            tank: currentTanks[0],
                            tankIndex: 0,
                            keys,
                            tickTime,
                            lastShotTime: instance.lastShotTimes.blue,
                            bullets: currentBullets,
                            mapWidth: mapData.width,
                            mapHeight: mapData.height,
                            barriers,
                            suns,
                            allTanks: currentTanks
                        }, aiConfig, trainingManager, `${instance.gameId}-blue`);
                    } else {
                        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$tank$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePlayer1Tank"])({
                            tank: currentTanks[0],
                            tankIndex: 0,
                            keys,
                            tickTime,
                            lastShotTime: instance.lastShotTimes.blue,
                            bullets: currentBullets,
                            mapWidth: mapData.width,
                            mapHeight: mapData.height,
                            barriers,
                            suns,
                            allTanks: currentTanks
                        });
                    }
                    currentTanks[0] = result.updatedTank;
                    currentBullets.push(...result.newBullets);
                    newLastShotTimes.blue = result.lastShotTime;
                }
                // Update Player 2 (Red)
                if (currentTanks[1]?.lives > 0) {
                    // Always use AI for red tank (simplified logic - removed duplicate branch)
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateAITank"])({
                        tank: currentTanks[1],
                        tankIndex: 1,
                        keys,
                        tickTime,
                        lastShotTime: instance.lastShotTimes.red,
                        bullets: currentBullets,
                        mapWidth: mapData.width,
                        mapHeight: mapData.height,
                        barriers,
                        suns,
                        allTanks: currentTanks
                    }, aiConfig, trainingManager, instance.gameId);
                    currentTanks[1] = result.updatedTank;
                    currentBullets.push(...result.newBullets);
                    newLastShotTimes.red = result.lastShotTime;
                }
                // Update bullets
                const bulletResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$bullet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBullets"])({
                    bullets: currentBullets,
                    tickTime,
                    mapWidth: mapData.width,
                    mapHeight: mapData.height,
                    barriers,
                    suns,
                    tanks: currentTanks
                });
                const gameOverTriggered = gameOverTriggeredRefs.current.get(instance.id) || false;
                // Check for timeout
                if (!gameOverTriggered && instance.episodeStartTime) {
                    const episodeElapsed = tickTime - instance.episodeStartTime;
                    if (episodeElapsed >= maxEpisodeTimeMs) {
                        gameOverTriggeredRefs.current.set(instance.id, true);
                        const blueTank = bulletResult.updatedTanks[0];
                        const redTank = bulletResult.updatedTanks[1];
                        let winner = null;
                        if (blueTank && redTank) {
                            if (blueTank.lives > redTank.lives) {
                                winner = 'blue';
                            } else if (redTank.lives > blueTank.lives) {
                                winner = 'red';
                            }
                        }
                        bulletResult.updatedBullets = [];
                        bulletResult.updatedTanks[0] = {
                            ...blueTank,
                            exploding: false,
                            explosionStartTime: undefined,
                            respawning: false,
                            respawnStartTime: undefined,
                            respawnTargetX: undefined,
                            respawnTargetY: undefined,
                            respawnTargetAngle: undefined,
                            invincibleUntil: undefined
                        };
                        bulletResult.updatedTanks[1] = {
                            ...redTank,
                            exploding: false,
                            explosionStartTime: undefined,
                            respawning: false,
                            respawnStartTime: undefined,
                            respawnTargetX: undefined,
                            respawnTargetY: undefined,
                            respawnTargetAngle: undefined,
                            invincibleUntil: undefined
                        };
                        onTanksUpdate(instance.id, bulletResult.updatedTanks);
                        onBulletsUpdate(instance.id, bulletResult.updatedBullets);
                        onGameOver(instance.id, winner);
                        return;
                    }
                }
                // Check for game over (tank reached 0 lives)
                const blueTankAfterBullets = bulletResult.updatedTanks[0];
                const redTankAfterBullets = bulletResult.updatedTanks[1];
                if (!gameOverTriggered && blueTankAfterBullets && redTankAfterBullets) {
                    if (blueTankAfterBullets.lives <= 0 || redTankAfterBullets.lives <= 0) {
                        gameOverTriggeredRefs.current.set(instance.id, true);
                        const winner = blueTankAfterBullets.lives <= 0 ? 'red' : 'blue';
                        bulletResult.updatedBullets = [];
                        bulletResult.updatedTanks[0] = {
                            ...blueTankAfterBullets,
                            exploding: false,
                            explosionStartTime: undefined,
                            respawning: false,
                            respawnStartTime: undefined,
                            respawnTargetX: undefined,
                            respawnTargetY: undefined,
                            respawnTargetAngle: undefined,
                            invincibleUntil: undefined
                        };
                        bulletResult.updatedTanks[1] = {
                            ...redTankAfterBullets,
                            exploding: false,
                            explosionStartTime: undefined,
                            respawning: false,
                            respawnStartTime: undefined,
                            respawnTargetX: undefined,
                            respawnTargetY: undefined,
                            respawnTargetAngle: undefined,
                            invincibleUntil: undefined
                        };
                        onTanksUpdate(instance.id, bulletResult.updatedTanks);
                        onBulletsUpdate(instance.id, bulletResult.updatedBullets);
                        onGameOver(instance.id, winner);
                        return;
                    }
                }
                // Handle respawning
                for(let i = 0; i < bulletResult.updatedTanks.length; i++){
                    const tank = bulletResult.updatedTanks[i];
                    const originalTank = currentTanks[i];
                    if (tank.lives < originalTank.lives && tank.lives > 0) {
                        const tankColor = tank.color;
                        // Optimized: build new array instead of filter (more explicit, same complexity but clearer intent)
                        const filteredBullets = [];
                        for (const bullet of bulletResult.updatedBullets){
                            if (bullet.owner !== tankColor) {
                                filteredBullets.push(bullet);
                            }
                        }
                        bulletResult.updatedBullets = filteredBullets;
                        const spawn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateRandomSpawnPosition"])(mapData, barriers, bulletResult.updatedTanks, suns, i === 0 ? bulletResult.updatedTanks[1] : bulletResult.updatedTanks[0] ? {
                            x: bulletResult.updatedTanks[i === 0 ? 1 : 0].x,
                            y: bulletResult.updatedTanks[i === 0 ? 1 : 0].y
                        } : undefined);
                        // Set invincibility for 2 seconds after respawn
                        const INVINCIBILITY_DURATION_MS = 2000; // 2 seconds
                        bulletResult.updatedTanks[i] = {
                            ...tank,
                            x: spawn.x,
                            y: spawn.y,
                            angle: spawn.angle,
                            exploding: false,
                            explosionStartTime: undefined,
                            respawning: false,
                            respawnStartTime: undefined,
                            respawnTargetX: undefined,
                            respawnTargetY: undefined,
                            respawnTargetAngle: undefined,
                            invincibleUntil: tickTime + INVINCIBILITY_DURATION_MS
                        };
                    }
                    if (tank.exploding || tank.respawning) {
                        bulletResult.updatedTanks[i] = {
                            ...tank,
                            exploding: false,
                            explosionStartTime: undefined,
                            respawning: false,
                            respawnStartTime: undefined,
                            respawnTargetX: undefined,
                            respawnTargetY: undefined,
                            respawnTargetAngle: undefined
                        };
                    }
                    // Clear invincibility if it has expired
                    if (tank.invincibleUntil !== undefined && tickTime >= tank.invincibleUntil) {
                        bulletResult.updatedTanks[i] = {
                            ...tank,
                            invincibleUntil: undefined
                        };
                    }
                }
                if (!gameOverTriggered) {
                    onTanksUpdate(instance.id, bulletResult.updatedTanks);
                    onBulletsUpdate(instance.id, bulletResult.updatedBullets);
                    onLastShotTimesUpdate(instance.id, newLastShotTimes);
                }
            }
        }
    }["useMultiGameLogic.useCallback[gameTick]"], [
        mapData,
        barriers,
        suns,
        aiConfig,
        trainingManager,
        maxEpisodeTimeMs,
        onTanksUpdate,
        onBulletsUpdate,
        onLastShotTimesUpdate,
        onGameOver
    ]);
    return {
        gameTick
    };
}
_s(useMultiGameLogic, "eILmygrCxCuKublFZBiaV9ASrJQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/components/GameCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameCanvas",
    ()=>GameCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function GameCanvas({ width, height, tanks, bullets, barriers, suns, isPaused, tankImages, gameOverWinner, scale = 1 }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-focus canvas on mount to enable immediate keyboard input
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (canvas) {
                // Focus the canvas so keyboard events work immediately
                canvas.focus();
                // Also focus on click to ensure it stays focused
                const handleCanvasClick = {
                    "GameCanvas.useEffect.handleCanvasClick": ()=>{
                        canvas.focus();
                    }
                }["GameCanvas.useEffect.handleCanvasClick"];
                canvas.addEventListener('click', handleCanvasClick);
                return ({
                    "GameCanvas.useEffect": ()=>{
                        canvas.removeEventListener('click', handleCanvasClick);
                    }
                })["GameCanvas.useEffect"];
            }
        }
    }["GameCanvas.useEffect"], []);
    // Render function
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            // Scale factor for crisp rendering
            const scale = 2;
            canvas.width = width * scale;
            canvas.height = height * scale;
            // Reset transform matrix and scale the context
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(scale, scale);
            // Clear canvas completely
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#2D3748';
            ctx.fillRect(0, 0, width, height);
            // Draw barriers
            ctx.fillStyle = '#4A5568';
            for (const barrier of barriers){
                ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
            }
            // Draw gravitational field arrows (before suns so they appear behind)
            // Skip if sun gravity is disabled via debug flag
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].debug.disableSunGravity) {
                ctx.strokeStyle = 'rgba(98, 156, 119, 0.3)';
                ctx.fillStyle = 'rgba(98, 156, 119, 0.3)';
                ctx.lineWidth = 1 / scale;
                for (const sun of suns){
                    const gridSpacing = 30;
                    const arrowLength = 8;
                    const arrowHeadSize = 3;
                    // Draw arrows in a grid around the sun
                    for(let x = sun.x - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"]; x <= sun.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"]; x += gridSpacing){
                        for(let y = sun.y - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"]; y <= sun.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"]; y += gridSpacing){
                            const dx = sun.x - x;
                            const dy = sun.y - y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            // Only draw if within influence radius and not too close to sun
                            if (distance > sun.size + 5 && distance < __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUN_INFLUENCE_RADIUS"]) {
                                const angle = Math.atan2(dy, dx);
                                const normalizedDx = dx / distance;
                                const normalizedDy = dy / distance;
                                // Draw arrow line
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + normalizedDx * arrowLength, y + normalizedDy * arrowLength);
                                ctx.stroke();
                                // Draw arrowhead
                                ctx.save();
                                ctx.translate(x + normalizedDx * arrowLength, y + normalizedDy * arrowLength);
                                ctx.rotate(angle);
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(-arrowHeadSize, -arrowHeadSize / 2);
                                ctx.lineTo(-arrowHeadSize, arrowHeadSize / 2);
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                            }
                        }
                    }
                }
            }
            // Draw suns (skip if disabled via debug flag)
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].debug.disableSunGravity) {
                for (const sun of suns){
                    const gradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.size);
                    gradient.addColorStop(0, 'rgba(98, 156, 119, 0.9)');
                    gradient.addColorStop(0.7, 'rgba(98, 156, 119, 0.75)');
                    gradient.addColorStop(1, 'rgba(98, 156, 119, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(sun.x, sun.y, sun.size, 0, Math.PI * 2);
                    ctx.fill();
                    // Draw sun outline
                    ctx.strokeStyle = 'rgba(98, 156, 119, 0.5)';
                    ctx.lineWidth = 2 / scale;
                    ctx.stroke();
                }
            }
            // Draw tanks (no animations)
            // Only draw valid tanks (exactly 2 tanks expected: blue and red)
            // Optimized: direct array access instead of filter (tanks are guaranteed to be valid)
            const validTanks = tanks.length >= 2 ? [
                tanks[0],
                tanks[1]
            ] : tanks.slice(0, 2);
            for (const tank of validTanks){
                // Skip tanks with 0 lives or invalid positions
                if (tank.lives <= 0 || tank.x === undefined || tank.y === undefined) continue;
                ctx.save();
                // Check if tank is invincible (recently respawned)
                // Use Date.now() for visual feedback (rendering doesn't need precise tick time)
                const isInvincible = tank.invincibleUntil !== undefined && Date.now() < tank.invincibleUntil;
                // Draw golden circle for invincibility (before tank rotation so it stays centered)
                if (isInvincible) {
                    const tankCenterX = tank.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2;
                    const tankCenterY = tank.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2;
                    const circleRadius = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2 + 3; // Slightly larger than tank
                    ctx.beginPath();
                    ctx.arc(tankCenterX, tankCenterY, circleRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = '#FFD700'; // Golden color
                    ctx.lineWidth = 2 / scale;
                    ctx.stroke();
                }
                ctx.translate(tank.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2, tank.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2);
                ctx.rotate(tank.angle * Math.PI / 180);
                ctx.translate(-__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2, -__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"] / 2);
                // Draw tank image
                const tankImage = tank.color === 'blue' ? tankImages.blue : tankImages.red;
                if (tankImage) {
                    ctx.drawImage(tankImage, 0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"]);
                } else {
                    // Fallback: draw colored rectangle if image not loaded
                    ctx.fillStyle = tank.color === 'blue' ? '#3B82F6' : '#EF4444';
                    ctx.fillRect(0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"]);
                    ctx.strokeStyle = tank.color === 'blue' ? '#1E40AF' : '#DC2626';
                    ctx.lineWidth = 2 / scale;
                    ctx.strokeRect(0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TANK_SIZE"]);
                }
                ctx.restore();
                // Draw lives indicator
                ctx.fillStyle = tank.color === 'blue' ? '#3B82F6' : '#EF4444';
                for(let i = 0; i < tank.lives; i++){
                    ctx.beginPath();
                    ctx.arc(tank.x + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.livesIndicatorOffsetX + i * __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.livesIndicatorSpacing, tank.y + __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.livesIndicatorOffsetY, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.livesIndicatorRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // Draw bullets (no explosion animations)
            for (const bullet of bullets){
                // Skip exploding bullets (they're removed immediately, no animation)
                if (bullet.exploding) {
                    continue;
                }
                // Calculate fade alpha for bullets that are expiring (after 7 seconds)
                const age = Date.now() - bullet.createdAt;
                const fadeDuration = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].bullet.fadeDuration;
                let alpha = 1;
                if (age > __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MAX_AGE"]) {
                    // Bullet is fading out
                    const fadeProgress = (age - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BULLET_MAX_AGE"]) / fadeDuration;
                    alpha = Math.max(0, 1 - fadeProgress);
                }
                // Only draw if still visible
                if (alpha > 0) {
                    // Extract RGB values and apply alpha
                    const r = bullet.owner === 'blue' ? 59 : 239;
                    const g = bullet.owner === 'blue' ? 130 : 68;
                    const b = bullet.owner === 'blue' ? 246 : 68;
                    ctx.save();
                    ctx.globalAlpha = alpha;
                    // Draw simple rectangle bullet with rounded corners
                    const bulletLength = 6;
                    const bulletWidth = 3;
                    const radius = 1; // Small border radius
                    const angleRad = bullet.angle * Math.PI / 180;
                    // Translate and rotate to bullet position and angle
                    ctx.translate(bullet.x, bullet.y);
                    ctx.rotate(angleRad);
                    // Draw rounded rectangle
                    const x = -bulletLength / 2;
                    const y = -bulletWidth / 2;
                    const w = bulletLength;
                    const h = bulletWidth;
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    ctx.beginPath();
                    ctx.moveTo(x + radius, y);
                    ctx.lineTo(x + w - radius, y);
                    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
                    ctx.lineTo(x + w, y + h - radius);
                    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
                    ctx.lineTo(x + radius, y + h);
                    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
                    ctx.lineTo(x, y + radius);
                    ctx.quadraticCurveTo(x, y, x + radius, y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }
            // Draw UI (lives counter removed from bottom-left)
            // Draw instructions in top-right corner
            ctx.textAlign = 'right';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = `${__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.uiTextSize - 1}px Inter`;
            const instructionY = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.uiTextOffsetY;
            const instructionX = width - __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].visual.uiTextOffsetX;
            ctx.fillText('Player 1 (Blue): Arrows + Space', instructionX, instructionY);
            ctx.fillText('Player 2 (Red): WASD + Q', instructionX, instructionY + 12);
            ctx.textAlign = 'left'; // Reset alignment
            // Draw game over screen
            if (gameOverWinner) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 32px Inter';
                ctx.textAlign = 'center';
                const winnerText = gameOverWinner === 'blue' ? 'BLUE WINS!' : 'RED WINS!';
                ctx.fillText(winnerText, width / 2, height / 2 - 20);
                ctx.font = '20px Inter';
                ctx.fillText('Press any key to play again', width / 2, height / 2 + 20);
                ctx.textAlign = 'left'; // Reset alignment
            }
            // Draw pause indicator
            if (isPaused && !gameOverWinner) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 48px Inter';
                ctx.textAlign = 'center';
                ctx.fillText('PAUSED', width / 2, height / 2);
                ctx.textAlign = 'left'; // Reset alignment
            }
        // Debug text removed
        }
    }["GameCanvas.useEffect"], [
        width,
        height,
        tanks,
        bullets,
        barriers,
        suns,
        isPaused,
        tankImages,
        gameOverWinner
    ]);
    // Calculate display size: internal resolution is 2x for crisp rendering, then apply scale
    const displayWidth = width * 2 * scale;
    const displayHeight = height * 2 * scale;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "border-2 border-[#4A5568] rounded outline-none",
        style: {
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
            display: 'block'
        },
        tabIndex: 0,
        onFocus: (e)=>e.target.focus()
    }, void 0, false, {
        fileName: "[project]/website/app/games/tank-trouble/components/GameCanvas.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
_s(GameCanvas, "1O11hef6JMAr7xpSnL0aZ5Ib60Q=");
_c = GameCanvas;
var _c;
__turbopack_context__.k.register(_c, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-dqn-model.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_DQN_CONFIG",
    ()=>DEFAULT_DQN_CONFIG,
    "DQNAgent",
    ()=>DQNAgent
]);
/**
 * DQN (Deep Q-Network) Model Implementation
 * 
 * Implements a DQN agent using TensorFlow.js for browser-based training.
 * DQN is well-suited for discrete action spaces.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$40$4$2e$22$2e$0_seedrandom$40$3$2e$0$2e$5$2f$node_modules$2f40$tensorflow$2f$tfjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs@4.22.0_seedrandom@3.0.5/node_modules/@tensorflow/tfjs/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-layers@4.22.0_@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-layers/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$train$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-core/dist/train.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor2d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-core/dist/ops/tensor2d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$tensor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-core/dist/tensor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$io$2f$io$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__io$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-core/dist/io/io.js [app-client] (ecmascript) <export * as io>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor1d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-core/dist/ops/tensor1d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-actions.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-action-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/type-guards.ts [app-client] (ecmascript)");
;
;
;
;
const DEFAULT_DQN_CONFIG = {
    observationSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getObservationSize"])(),
    actionSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$action$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NUM_DISCRETE_ACTIONS"],
    learningRate: 0.001,
    hiddenLayers: [
        128,
        128,
        64
    ],
    gamma: 0.99,
    epsilonStart: 1.0,
    epsilonEnd: 0.01,
    epsilonDecay: 0.995,
    batchSize: 32,
    replayBufferSize: 10000,
    targetUpdateFrequency: 100
};
class DQNAgent {
    qNetwork = null;
    targetNetwork = null;
    config;
    epsilon;
    stepCount = 0;
    trainingInProgress = null;
    isDisposed = false;
    constructor(config = {}){
        this.config = {
            ...DEFAULT_DQN_CONFIG,
            ...config
        };
        this.epsilon = this.config.epsilonStart;
    }
    /**
   * Initialize the neural networks
   */ async initialize() {
        this.qNetwork = this.createNetwork();
        this.targetNetwork = this.createNetwork();
        this.updateTargetNetwork();
    }
    /**
   * Create the Q-network architecture
   */ createNetwork() {
        const model = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sequential"]();
        // Input layer
        model.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layers"].dense({
            inputShape: [
                this.config.observationSize
            ],
            units: this.config.hiddenLayers[0],
            activation: 'relu',
            kernelInitializer: 'heNormal'
        }));
        // Hidden layers
        for(let i = 1; i < this.config.hiddenLayers.length; i++){
            model.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layers"].dense({
                units: this.config.hiddenLayers[i],
                activation: 'relu',
                kernelInitializer: 'heNormal'
            }));
        }
        // Output layer (Q-values for each action)
        model.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layers"].dense({
            units: this.config.actionSize,
            activation: 'linear',
            kernelInitializer: 'zeros'
        }));
        // Compile model
        model.compile({
            optimizer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$train$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["train"].adam(this.config.learningRate),
            loss: 'meanSquaredError'
        });
        return model;
    }
    /**
   * Check if networks are valid and not disposed
   */ areNetworksValid() {
        return !this.isDisposed && this.qNetwork !== null && this.targetNetwork !== null;
    }
    /**
   * Select action using epsilon-greedy policy
   */ async selectAction(observation, training = true) {
        if (!this.qNetwork) {
            throw new Error('Network not initialized. Call initialize() first.');
        }
        // Exploration: random action
        if (training && Math.random() < this.epsilon) {
            return Math.floor(Math.random() * this.config.actionSize);
        }
        // Exploitation: best action according to Q-network
        const stateTensor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor2d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tensor2d"]([
            observation.vector
        ]);
        const qValuesResult = this.qNetwork.predict(stateTensor);
        // Type guard for TensorFlow Tensor
        const qValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertType"])(qValuesResult, (val)=>val instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$tensor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tensor"], 'Expected Tensor from predict');
        const qValuesArray = await qValues.data();
        stateTensor.dispose();
        qValues.dispose();
        // Find action with highest Q-value
        let bestAction = 0;
        let bestQValue = qValuesArray[0];
        for(let i = 1; i < qValuesArray.length; i++){
            if (qValuesArray[i] > bestQValue) {
                bestQValue = qValuesArray[i];
                bestAction = i;
            }
        }
        return bestAction;
    }
    /**
   * Predict action (for inference, no exploration)
   */ async predict(observation, currentAngle) {
        const action = await this.selectAction(observation, false);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["actionToDecision"])(action, currentAngle);
    }
    /**
   * Train on a batch of steps
   * 
   * Note: This method prevents concurrent training calls by using a promise-based lock.
   * If training is already in progress, this call will wait for it and skip (return 0).
   */ async train(steps) {
        if (!this.areNetworksValid() || steps.length === 0) {
            return 0;
        }
        // If training is already in progress, wait for it and skip this call
        if (this.trainingInProgress) {
            try {
                await this.trainingInProgress;
            } catch (error) {
            // Ignore errors from previous training - we're just waiting
            }
            return 0;
        }
        // Create and assign the promise SYNCHRONOUSLY before any async work
        let resolveTraining;
        let rejectTraining;
        this.trainingInProgress = new Promise((resolve, reject)=>{
            resolveTraining = resolve;
            rejectTraining = reject;
        });
        // Start async training work
        this.executeTraining(steps, this.trainingInProgress).then((result)=>{
            this.trainingInProgress = null;
            if (resolveTraining) resolveTraining(result);
        }).catch((error)=>{
            this.trainingInProgress = null;
            if (rejectTraining) rejectTraining(error);
        });
        try {
            return await this.trainingInProgress;
        } catch (error) {
            // Return 0 on error instead of throwing - training errors shouldn't crash the app
            return 0;
        }
    }
    /**
   * Internal method that performs the actual training
   */ async executeTraining(steps, currentTrainingPromise) {
        // Prepare batch
        const batchSize = Math.min(steps.length, this.config.batchSize);
        const states = [];
        const actions = [];
        const rewards = [];
        const nextStates = [];
        const dones = [];
        for(let i = 0; i < batchSize; i++){
            const step = steps[i];
            states.push(step.state);
            actions.push(step.action);
            rewards.push(step.reward);
            nextStates.push(step.nextState);
            dones.push(step.done);
        }
        // Create tensors
        const statesTensor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor2d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tensor2d"](states);
        const nextStatesTensor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor2d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tensor2d"](nextStates);
        // Track all tensors for cleanup
        const tensorsToDispose = [
            statesTensor,
            nextStatesTensor
        ];
        try {
            // Verify we're still the active training call and networks are valid
            if (!this.areNetworksValid() || this.trainingInProgress !== currentTrainingPromise) {
                return 0;
            }
            // Get Q-values from both networks
            if (!this.qNetwork || !this.targetNetwork) {
                throw new Error('Networks not initialized');
            }
            const currentQValuesResult = this.qNetwork.predict(statesTensor);
            const nextQValuesResult = this.targetNetwork.predict(nextStatesTensor);
            // Type guards for TensorFlow Tensors
            const currentQValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertType"])(currentQValuesResult, (val)=>val instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$tensor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tensor"], 'Expected Tensor from predict');
            const nextQValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertType"])(nextQValuesResult, (val)=>val instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$tensor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tensor"], 'Expected Tensor from predict');
            tensorsToDispose.push(currentQValues, nextQValues);
            // Extract arrays (this is async, but if network is disposed, it will throw)
            const currentQArrayResult = await currentQValues.array();
            const nextQArrayResult = await nextQValues.array();
            // Type guard for 2D number arrays
            const currentQArray = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertType"])(currentQArrayResult, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["is2DNumberArray"], 'Expected 2D number array from tensor.array()');
            const nextQArray = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertType"])(nextQArrayResult, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["is2DNumberArray"], 'Expected 2D number array from tensor.array()');
            // Verify again after async operation
            if (!this.areNetworksValid() || this.trainingInProgress !== currentTrainingPromise) {
                return 0;
            }
            // Compute target Q-values
            const targets = [];
            for(let i = 0; i < batchSize; i++){
                const target = [
                    ...currentQArray[i]
                ];
                const maxNextQ = Math.max(...nextQArray[i]);
                const targetQ = rewards[i] + (dones[i] ? 0 : this.config.gamma * maxNextQ);
                target[actions[i]] = targetQ;
                targets.push(target);
            }
            const targetsTensor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor2d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tensor2d"](targets);
            tensorsToDispose.push(targetsTensor);
            // Final check before training
            if (!this.areNetworksValid() || this.trainingInProgress !== currentTrainingPromise) {
                return 0;
            }
            // Train the network
            if (!this.qNetwork) {
                throw new Error('Network not initialized');
            }
            const history = await this.qNetwork.fit(statesTensor, targetsTensor, {
                epochs: 1,
                verbose: 0,
                batchSize: batchSize
            });
            // Extract loss value
            let loss = 0;
            if (Array.isArray(history.history.loss)) {
                const firstLoss = history.history.loss[0];
                if (typeof firstLoss === 'number') {
                    loss = firstLoss;
                }
            } else if (typeof history.history.loss === 'number') {
                loss = history.history.loss;
            } else if (history.history.loss && typeof history.history.loss === 'object') {
                // Check if it has dataSync method (TensorFlow Tensor)
                // Use JSON to safely access properties without type assertions
                try {
                    const jsonString = JSON.stringify(history.history.loss);
                    const parsed = JSON.parse(jsonString);
                // TensorFlow tensors can't be serialized, so if we get here it's not a tensor
                // Skip this branch for tensor objects
                } catch  {
                // If JSON.stringify fails, it might be a TensorFlow tensor
                // Check for dataSync method using property access
                // Skip tensor handling to avoid type assertions
                // In practice, loss should be a number or array, not a tensor
                // TensorFlow tensors can't be safely handled without type assertions
                }
            }
            // Update epsilon
            this.epsilon = Math.max(this.config.epsilonEnd, this.epsilon * this.config.epsilonDecay);
            // Update target network periodically
            this.stepCount++;
            if (this.stepCount % this.config.targetUpdateFrequency === 0) {
                this.updateTargetNetwork();
            }
            return loss;
        } catch (error) {
            // If network was disposed, silently return 0
            // Otherwise, log the error but don't throw (training errors shouldn't crash)
            const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(error) ? error.message : String(error);
            if (!errorMessage.includes('disposed')) {}
            return 0;
        } finally{
            // Always cleanup tensors
            tensorsToDispose.forEach((tensor)=>{
                try {
                    tensor.dispose();
                } catch (e) {
                // Ignore disposal errors
                }
            });
        }
    }
    /**
   * Copy weights from Q-network to target network
   */ updateTargetNetwork() {
        if (!this.qNetwork || !this.targetNetwork) {
            return;
        }
        const weights = this.qNetwork.getWeights();
        this.targetNetwork.setWeights(weights);
    }
    /**
   * Get current epsilon (for logging)
   */ getEpsilon() {
        return this.epsilon;
    }
    /**
   * Save model
   */ async save(path) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (!this.qNetwork) {
            throw new Error('Network not initialized. Cannot save model.');
        }
        // Verify the model is valid and not disposed
        if (!this.areNetworksValid()) {
            throw new Error('Network has been disposed. Cannot save model.');
        }
        // Check if IndexedDB is available
        if (typeof indexedDB === 'undefined') {
            throw new Error('IndexedDB is not available in this browser. Cannot save model.');
        }
        try {
            // Verify path format - TensorFlow.js expects 'indexeddb://model-name'
            // Common issue: extra slashes or special characters cause silent failures
            if (!path.startsWith('indexeddb://')) {
                throw new Error(`Invalid path format. Expected 'indexeddb://...', got: ${path}`);
            }
            const cleanPath = path.replace('indexeddb://', '');
            // Validate clean path - TensorFlow.js object store names have restrictions
            // They cannot contain certain characters and should be simple identifiers
            if (cleanPath.includes('/') || cleanPath.includes('\\') || cleanPath.includes(' ')) {
                throw new Error(`Invalid model name. Object store names cannot contain slashes or spaces. Got: ${cleanPath}`);
            }
            if (cleanPath.length === 0) {
                throw new Error('Invalid model name. Model name cannot be empty.');
            }
            // Check browser IndexedDB support and permissions
            if (typeof indexedDB === 'undefined') {
                throw new Error('IndexedDB is not available in this browser. Cannot save model.');
            }
            // Check if we're in a context where IndexedDB might be restricted
            // (e.g., Safari private browsing, iframe without permissions)
            try {
                const testDbName = '__tfjs_test_db__';
                const testRequest = indexedDB.open(testDbName);
                await new Promise((resolve, reject)=>{
                    testRequest.onsuccess = ()=>{
                        testRequest.result.close();
                        indexedDB.deleteDatabase(testDbName);
                        resolve();
                    };
                    testRequest.onerror = ()=>reject(new Error('IndexedDB open failed - may be restricted'));
                    testRequest.onblocked = ()=>reject(new Error('IndexedDB is blocked - may need user interaction'));
                });
            } catch (testError) {
                const error = testError instanceof Error ? testError : new Error(String(testError));
                console.warn('DQNAgent: IndexedDB access test failed:', error.message);
                throw new Error(`IndexedDB access restricted: ${error.message}. This may be due to browser privacy settings, private browsing mode, or iframe permissions.`);
            }
            // Save the model - TensorFlow.js will create the object store automatically
            // Note: TensorFlow.js save() returns a ModelArtifactsInfo object with modelTopology and weightData
            let saveResult = null;
            try {
                // Check model state before saving
                const weights = this.qNetwork.getWeights();
                // Try saving - TensorFlow.js should create the object store
                // Note: model.save() should work for LayersModel, but let's verify it's actually saving
                // CRITICAL: TensorFlow.js save() can fail silently if:
                // 1. Model isn't compiled (we check this above)
                // 2. Path format is wrong (we validate this above)
                // 3. IndexedDB permissions are restricted (browser issue)
                // 4. Model hasn't been trained (weights are still initial values)
                // Verify model is in a saveable state
                if (!this.qNetwork.optimizer) {
                    throw new Error('Model is not compiled. Cannot save uncompiled model.');
                }
                // Check if model has been trained (weights updated from initial values)
                // TensorFlow.js may have issues saving models that haven't been trained
                // We check stepCount to see if training has occurred
                if (this.stepCount === 0) {
                    console.warn('DQNAgent: WARNING - Model has not been trained yet (stepCount = 0). Saving anyway, but this may cause issues.');
                }
                // Try saving - wrap in additional error handling
                try {
                    saveResult = await this.qNetwork.save(path);
                } catch (saveError) {
                    // Re-throw with more context
                    const error = saveError instanceof Error ? saveError : new Error(String(saveError));
                    console.error('DQNAgent: TensorFlow.js save() threw an error:', error);
                    console.error('DQNAgent: Error details:', {
                        message: error.message,
                        stack: error.stack,
                        path: path,
                        modelCompiled: !!this.qNetwork.optimizer
                    });
                    throw new Error(`TensorFlow.js save() failed: ${error.message}`);
                }
                // Wait a brief moment for IndexedDB transaction to commit
                // IndexedDB operations are asynchronous and may need time to complete
                await new Promise((resolve)=>setTimeout(resolve, 200));
                // Check what databases exist after saving
                if (indexedDB.databases) {
                    try {
                        const databasesAfter = await indexedDB.databases();
                        // Look for TensorFlow.js database
                        const tfDb = databasesAfter.find((db)=>db.name === 'tensorflowjs_models' || db.name && db.name.includes('tensorflow'));
                        if (tfDb && tfDb.name) {
                            // Try to inspect the database
                            const inspectRequest = indexedDB.open(tfDb.name);
                            inspectRequest.onsuccess = ()=>{
                                const db = inspectRequest.result;
                                db.close();
                            };
                            inspectRequest.onerror = ()=>{
                                console.warn('DQNAgent: Could not inspect TensorFlow.js database');
                            };
                        } else {
                            console.warn('DQNAgent: WARNING - No TensorFlow.js database found after save!');
                        }
                    } catch (dbError) {
                        console.warn('DQNAgent: Could not list databases:', dbError);
                    }
                }
                // Check if TensorFlow.js can list the model
                // TensorFlow.js provides tf.io.listModels() to enumerate saved models
                try {
                    const savedModels = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$io$2f$io$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__io$3e$__["io"].listModels();
                    const modelKeys = Object.keys(savedModels);
                    // Check if our model is in the list
                    const cleanPath = path.replace('indexeddb://', '');
                    const modelInList = modelKeys.some((key)=>key.includes(cleanPath) || key === path || key.endsWith(cleanPath));
                    if (!modelInList) {
                        console.warn('DQNAgent: WARNING - Model not found in TensorFlow.js list, but save() completed');
                        console.warn('DQNAgent: Expected path:', path);
                        console.warn('DQNAgent: Clean path:', cleanPath);
                    }
                } catch (listError) {
                    console.warn('DQNAgent: Could not list models (this is okay):', listError);
                }
                // Immediately try to load the model to verify it was saved
                // This is a common pattern to catch silent failures
                try {
                    const testLoad = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadLayersModel"](path);
                    // Dispose the test load - we don't need it
                    testLoad.dispose();
                } catch (loadError) {
                    const error = loadError instanceof Error ? loadError : new Error(String(loadError));
                    console.error('DQNAgent: CRITICAL - Model save() completed but cannot be loaded!');
                    console.error('DQNAgent: Load error:', error.message);
                    console.error('DQNAgent: Load error stack:', error.stack);
                    // Try to get more information about what TensorFlow.js sees
                    try {
                        const savedModels = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$io$2f$io$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__io$3e$__["io"].listModels();
                        console.error('DQNAgent: Available models according to TensorFlow.js:', Object.keys(savedModels));
                    } catch (e) {
                        console.error('DQNAgent: Could not list models:', e);
                    }
                    throw new Error(`Model save() completed but verification load failed: ${error.message}. This indicates the model was not actually saved to IndexedDB.`);
                }
                if (!saveResult) {
                    console.warn('DQNAgent: WARNING - save() returned null/undefined');
                }
                // After saving, check what databases exist now and debug what was created
                if (typeof indexedDB.databases === 'function') {
                    // Debug: List all databases and their object stores
                    const { debugListAllIndexedDBDatabases } = await __turbopack_context__.A("[project]/website/app/games/tank-trouble/ai-tank/rl-model-storage.ts [app-client] (ecmascript, async loader)");
                    await debugListAllIndexedDBDatabases();
                }
            } catch (saveErr) {
                const saveError = saveErr instanceof Error ? saveErr : new Error(String(saveErr));
                console.error('DQNAgent: Error during model.save():', saveError);
                console.error('DQNAgent: Error message:', saveError.message);
                console.error('DQNAgent: Error stack:', saveError.stack);
                throw saveError;
            }
            // Wait longer for IndexedDB to sync (TensorFlow.js might be async)
            await new Promise((resolve)=>setTimeout(resolve, 500));
            // Verify the model was actually saved
            const { modelExists, listAvailableModelPaths } = await __turbopack_context__.A("[project]/website/app/games/tank-trouble/ai-tank/rl-model-storage.ts [app-client] (ecmascript, async loader)");
            // First, check what's actually in the database
            await listAvailableModelPaths();
            // Try verification with retries (IndexedDB can be slow to sync)
            let exists = false;
            let retries = 0;
            while(!exists && retries < 5){
                exists = await modelExists(path);
                if (!exists && retries < 4) {
                    // Re-check available paths in case they changed
                    await listAvailableModelPaths();
                    await new Promise((resolve)=>setTimeout(resolve, 500));
                }
                retries++;
            }
            if (!exists) {
                // Final check of what's available
                const finalPaths = await listAvailableModelPaths();
                const errorMsg = `Model save() completed but weights were NOT saved to IndexedDB.\n` + `Expected path: ${path}\n` + `Clean path: ${cleanPath}\n` + `Available paths: ${finalPaths.join(', ') || 'none'}\n` + `This suggests TensorFlow.js save() failed silently or used a different path format.`;
                console.error('DQNAgent: CRITICAL ERROR:', errorMsg);
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('DQNAgent: Error saving model:', error);
            throw error;
        }
    }
    /**
   * Load model
   */ async load(path) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Wait for any in-progress training to complete before loading new model
        if (this.trainingInProgress) {
            await this.trainingInProgress.catch(()=>{
            // Ignore errors from previous training
            });
        }
        // Verify model exists before attempting to load
        // Note: Dexie stores metadata, but TensorFlow.js stores the actual model weights in IndexedDB
        const { modelExists, listAvailableModelPaths, listSavedModels } = await __turbopack_context__.A("[project]/website/app/games/tank-trouble/ai-tank/rl-model-storage.ts [app-client] (ecmascript, async loader)");
        // First check if model exists in TensorFlow.js IndexedDB (where the weights are stored)
        const exists = await modelExists(path);
        if (!exists) {
            // Check if model exists in Dexie metadata (to provide better error message)
            const savedModels = await listSavedModels();
            const modelInMetadata = savedModels.find((m)=>m.path === path);
            const availablePaths = await listAvailableModelPaths();
            const cleanPath = path.replace('indexeddb://', '');
            let errorMessage = `Cannot find model weights for '${path}'.\n\n`;
            errorMessage += `Note: Model metadata is stored in Dexie DB, but the actual model weights are stored in TensorFlow.js IndexedDB.\n\n`;
            if (modelInMetadata) {
                errorMessage += `⚠️ Model metadata exists in Dexie, but the model weights are missing from TensorFlow.js IndexedDB.\n`;
                errorMessage += `This can happen if:\n`;
                errorMessage += `• The model was deleted from IndexedDB but metadata remains\n`;
                errorMessage += `• Browser storage was cleared for IndexedDB but not Dexie\n`;
                errorMessage += `• There was an error during model save\n\n`;
            }
            errorMessage += `Looking for TensorFlow.js object store: '${cleanPath}'\n\n`;
            if (availablePaths.length > 0) {
                errorMessage += `Available models in TensorFlow.js IndexedDB:\n`;
                availablePaths.forEach((p)=>{
                    errorMessage += `  - ${p}\n`;
                });
            } else {
                errorMessage += `No models found in TensorFlow.js IndexedDB. Make sure you've saved a model first.`;
            }
            throw new Error(errorMessage);
        }
        try {
            const newQNetwork = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$layers$40$4$2e$22$2e$0_$40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$layers$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadLayersModel"](path);
            // CRITICAL: Models loaded from IndexedDB are NOT compiled.
            // TensorFlow.js requires models to be compiled before they can be saved.
            // Compile the loaded model with the same optimizer and loss function.
            newQNetwork.compile({
                optimizer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$train$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["train"].adam(this.config.learningRate),
                loss: 'meanSquaredError'
            });
            const newTargetNetwork = this.createNetwork();
            // Dispose old networks only after new ones are loaded
            if (this.qNetwork) {
                this.qNetwork.dispose();
            }
            if (this.targetNetwork) {
                this.targetNetwork.dispose();
            }
            this.qNetwork = newQNetwork;
            this.targetNetwork = newTargetNetwork;
            this.updateTargetNetwork();
        } catch (error) {
            console.error('DQNAgent: Error loading model:', error);
            // Check for Safari/IndexedDB specific issues
            const isSafari = ("TURBOPACK compile-time value", "object") !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const errorMessage = error instanceof Error ? error.message : String(error);
            let detailedError = `Failed to load model from ${path}: ${errorMessage}`;
            if (isSafari) {
                detailedError += '\n\nSafari detected. Common issues:\n';
                detailedError += '• Private Browsing mode disables IndexedDB - try regular browsing mode\n';
                detailedError += '• Safari may require user interaction before accessing IndexedDB\n';
                detailedError += '• Check Safari settings: Preferences > Privacy > uncheck "Prevent cross-site tracking"';
            }
            throw new Error(detailedError);
        }
    }
    /**
   * Load model weights from Supabase JSON format
   * @param weightsData Array of layer weights in Supabase format: [{weights: number[], biases: number[]}, ...]
   */ async loadWeightsFromJSON(weightsData) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Wait for any in-progress training to complete
        if (this.trainingInProgress) {
            await this.trainingInProgress.catch(()=>{
            // Ignore errors from previous training
            });
        }
        // Ensure networks are initialized
        if (!this.qNetwork || !this.targetNetwork) {
            await this.initialize();
        }
        if (!this.qNetwork || !this.targetNetwork) {
            throw new Error('Failed to initialize networks');
        }
        try {
            // Convert JSON weights to TensorFlow.js weight format
            // TensorFlow.js expects: [kernel, bias] for each layer
            const tfWeights = [];
            for (const layer of weightsData){
                // Get layer shape from existing network
                const layerIndex = tfWeights.length / 2; // Each layer has 2 tensors (kernel, bias)
                const layerConfig = this.qNetwork.layers[layerIndex];
                if (!layerConfig) {
                    throw new Error(`Layer ${layerIndex} not found in network`);
                }
                // Get expected shape from layer
                const kernelShape = layerConfig.getWeights()[0].shape;
                const biasShape = layerConfig.getWeights()[1].shape;
                // Reshape weights array to match layer shape
                // Weights are stored as flat array: [inputSize * outputSize]
                const kernel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor2d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tensor2d"](layer.weights, kernelShape);
                // Biases are stored as flat array: [outputSize]
                const bias = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$ops$2f$tensor1d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tensor1d"](layer.biases);
                tfWeights.push(kernel, bias);
            }
            // Set weights on both networks
            this.qNetwork.setWeights(tfWeights);
            this.targetNetwork.setWeights(tfWeights);
            this.updateTargetNetwork();
            // Dispose temporary tensors
            tfWeights.forEach((t)=>t.dispose());
        } catch (error) {
            console.error('DQNAgent: Error loading weights from JSON:', error);
            throw new Error(`Failed to load weights from JSON: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
   * Dispose resources
   */ dispose() {
        this.isDisposed = true;
        // Wait for any in-progress training to complete before disposing
        const disposeNetworks = ()=>{
            if (this.qNetwork) {
                this.qNetwork.dispose();
            }
            if (this.targetNetwork) {
                this.targetNetwork.dispose();
            }
        };
        if (this.trainingInProgress) {
            this.trainingInProgress.then(disposeNetworks).catch(disposeNetworks); // Dispose even if training fails
        } else {
            disposeNetworks();
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-replay-buffer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Step Replay Buffer
 * 
 * Stores steps for training the DQN agent.
 * Uses a circular buffer to maintain a fixed-size memory.
 */ __turbopack_context__.s([
    "ReplayBuffer",
    ()=>ReplayBuffer
]);
class ReplayBuffer {
    buffer = [];
    maxSize;
    currentIndex = 0;
    constructor(maxSize = 10000){
        this.maxSize = maxSize;
    }
    /**
   * Add step to buffer
   */ add(step) {
        if (this.buffer.length < this.maxSize) {
            this.buffer.push(step);
        } else {
            // Overwrite oldest step (circular buffer)
            this.buffer[this.currentIndex] = step;
            this.currentIndex = (this.currentIndex + 1) % this.maxSize;
        }
    }
    /**
   * Add multiple steps
   */ addBatch(steps) {
        for (const step of steps){
            this.add(step);
        }
    }
    /**
   * Sample a batch of steps
   */ sample(batchSize) {
        if (this.buffer.length < batchSize) {
            // Return all steps if buffer is smaller than batch size
            return [
                ...this.buffer
            ];
        }
        // Random sampling
        const indices = [];
        const sampled = [];
        while(indices.length < batchSize){
            const index = Math.floor(Math.random() * this.buffer.length);
            if (!indices.includes(index)) {
                indices.push(index);
                sampled.push(this.buffer[index]);
            }
        }
        return sampled;
    }
    /**
   * Get current buffer size
   */ size() {
        return this.buffer.length;
    }
    /**
   * Check if buffer has enough samples for training
   */ canSample(batchSize) {
        return this.buffer.length >= batchSize;
    }
    /**
   * Clear buffer
   */ clear() {
        this.buffer = [];
        this.currentIndex = 0;
    }
    /**
   * Get all steps (for debugging)
   */ getAll() {
        return [
            ...this.buffer
        ];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-model-storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debugListAllIndexedDBDatabases",
    ()=>debugListAllIndexedDBDatabases,
    "deleteModel",
    ()=>deleteModel,
    "getModelMetadata",
    ()=>getModelMetadata,
    "listAvailableModelPaths",
    ()=>listAvailableModelPaths,
    "listSavedModels",
    ()=>listSavedModels,
    "modelExists",
    ()=>modelExists,
    "saveModelWithMetadata",
    ()=>saveModelWithMetadata
]);
/**
 * Model Storage Utilities
 * 
 * Functions to list, save, and load models using Dexie for metadata
 * and TensorFlow.js IndexedDB for actual model storage.
 * 
 * This module provides a clean interface for managing TensorFlow.js models
 * stored in IndexedDB. It uses Dexie to track model metadata independently
 * of TensorFlow.js's internal storage.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$dexie$40$4$2e$2$2e$1$2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/dexie@4.2.1/node_modules/dexie/import-wrapper.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$40$4$2e$22$2e$0_seedrandom$40$3$2e$0$2e$5$2f$node_modules$2f40$tensorflow$2f$tfjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs@4.22.0_seedrandom@3.0.5/node_modules/@tensorflow/tfjs/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$io$2f$io$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__io$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tensorflow+tfjs-core@4.22.0/node_modules/@tensorflow/tfjs-core/dist/io/io.js [app-client] (ecmascript) <export * as io>");
;
;
class ModelDatabase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$dexie$40$4$2e$2$2e$1$2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    modelMetadata;
    constructor(){
        super('tank_ai_models');
        this.version(1).stores({
            modelMetadata: '++id, path, createdAt, evalScore'
        });
    }
}
// Initialize database with error handling for Safari compatibility and SSR safety
// IMPORTANT: This module may be imported during SSR, so we must guard all browser API access
let db = null;
/**
 * Get or initialize the Dexie database instance
 * This function ensures the database is only created in the browser (not during SSR)
 */ function getDatabase() {
    // Return existing instance if already initialized
    if (db !== null) {
        return db;
    }
    // Only initialize in browser environment (not during SSR)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Check if IndexedDB is available before creating Dexie instance
        if (typeof window.indexedDB !== 'undefined') {
            db = new ModelDatabase();
            return db;
        } else {
            console.warn('IndexedDB not available in this browser');
            return null;
        }
    } catch (error) {
        // Safari private browsing or other IndexedDB restrictions
        console.warn('Failed to initialize Dexie database:', error);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
            console.warn('Safari detected. IndexedDB may be disabled (e.g., Private Browsing mode)');
        }
        return null;
    }
}
const MODEL_NAME_PREFIX = 'tank-ai-';
const MAX_MODELS = 8;
/**
 * Check if IndexedDB is available (basic check)
 */ function isIndexedDBAvailable() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return typeof window.indexedDB !== 'undefined';
}
/**
 * Get a user-friendly error message for IndexedDB issues
 */ function getIndexedDBErrorMessage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        return 'Safari detected. IndexedDB may be unavailable due to:\n' + '• Private Browsing mode (disables IndexedDB)\n' + '• Safari privacy settings blocking storage\n' + '• Try: Safari > Preferences > Privacy > uncheck "Prevent cross-site tracking"\n' + '• Or use regular browsing mode instead of Private Browsing';
    }
    return 'IndexedDB is not available. This may be due to:\n' + '• Private/Incognito browsing mode\n' + '• Browser privacy settings blocking storage\n' + '• Browser does not support IndexedDB';
}
/**
 * Format date as "December 3, 2:49 pm"
 */ function formatDateString(timestamp) {
    const date = new Date(timestamp);
    const formatted = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    // Convert AM/PM to lowercase
    return formatted.replace(/\s(AM|PM)$/, (match)=>match.toLowerCase());
}
/**
 * Save model metadata to Dexie
 */ async function saveMetadata(path, name, createdAt, evalScore) {
    const db = getDatabase();
    if (!db) {
        const errorMsg = getIndexedDBErrorMessage();
        console.warn('Dexie not available:', errorMsg);
        return;
    }
    // Check if IndexedDB is actually available
    if (!isIndexedDBAvailable()) {
        const errorMsg = getIndexedDBErrorMessage();
        throw new Error(`Cannot save model metadata: ${errorMsg}`);
    }
    try {
        const metadata = {
            path,
            name,
            createdAt,
            createdAtString: formatDateString(createdAt),
            evalScore
        };
        await db.modelMetadata.put(metadata);
    } catch (error) {
        console.error('Failed to save model metadata:', error);
        // Re-throw so we know if metadata save fails
        throw error;
    }
}
/**
 * Get metadata for a model
 */ async function getMetadata(path) {
    const db = getDatabase();
    if (!db) {
        return null;
    }
    try {
        const metadata = await db.modelMetadata.get({
            path
        });
        if (metadata) {
            return {
                name: metadata.name,
                path: metadata.path,
                createdAt: metadata.createdAt,
                createdAtString: metadata.createdAtString,
                evalScore: metadata.evalScore
            };
        }
        return null;
    } catch (error) {
        console.warn('Failed to get model metadata:', error);
        return null;
    }
}
/**
 * Delete metadata for a model
 */ async function deleteMetadata(path) {
    const db = getDatabase();
    if (!db) {
        return;
    }
    try {
        await db.modelMetadata.delete(path);
    } catch (error) {
        console.warn('Failed to delete model metadata:', error);
    // Don't throw - metadata deletion is optional
    }
}
async function modelExists(modelPath) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Use TensorFlow.js's official API to check if model exists
        const savedModels = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$io$2f$io$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__io$3e$__["io"].listModels();
        const modelKeys = Object.keys(savedModels);
        const exists = modelKeys.includes(modelPath);
        if (!exists) {}
        return exists;
    } catch (error) {
        console.warn(`[modelExists] Error checking model existence with TensorFlow.js API:`, error);
        // Fallback to manual IndexedDB inspection if TensorFlow.js API fails
        return await modelExistsFallback(modelPath);
    }
}
/**
 * Fallback method: manually inspect IndexedDB
 * Only used if TensorFlow.js API is unavailable
 */ async function modelExistsFallback(modelPath) {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || typeof indexedDB === 'undefined') {
        return false;
    }
    const cleanPath = modelPath.replace('indexeddb://', '');
    const dbName = 'tensorflowjs_models';
    return new Promise((resolve)=>{
        const request = indexedDB.open(dbName);
        request.onsuccess = ()=>{
            const db = request.result;
            // Check if object store exists
            if (!db.objectStoreNames.contains(cleanPath)) {
                db.close();
                resolve(false);
                return;
            }
            // Check if the object store has any data
            try {
                const transaction = db.transaction([
                    cleanPath
                ], 'readonly');
                const store = transaction.objectStore(cleanPath);
                const countRequest = store.count();
                countRequest.onsuccess = ()=>{
                    const hasData = countRequest.result > 0;
                    db.close();
                    resolve(hasData);
                };
                countRequest.onerror = (e)=>{
                    console.warn(`[modelExistsFallback] Error counting entries in '${cleanPath}':`, e);
                    db.close();
                    resolve(false);
                };
                transaction.onerror = (e)=>{
                    console.warn(`[modelExistsFallback] Transaction error for '${cleanPath}':`, e);
                    db.close();
                    resolve(false);
                };
            } catch (e) {
                console.warn(`[modelExistsFallback] Exception checking model existence for '${cleanPath}':`, e);
                db.close();
                resolve(false);
            }
        };
        request.onerror = (e)=>{
            console.warn(`[modelExistsFallback] Error opening database '${dbName}':`, e);
            resolve(false);
        };
        request.onupgradeneeded = ()=>{
            // Database doesn't exist yet or needs upgrade
            resolve(false);
        };
    });
}
async function listAvailableModelPaths() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Use TensorFlow.js's official API to list models
        // This is the correct way to get all saved models
        const savedModels = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tensorflow$2b$tfjs$2d$core$40$4$2e$22$2e$0$2f$node_modules$2f40$tensorflow$2f$tfjs$2d$core$2f$dist$2f$io$2f$io$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__io$3e$__["io"].listModels();
        const modelKeys = Object.keys(savedModels);
        // Filter to only IndexedDB models that match our naming pattern
        const indexedDbModels = modelKeys.filter((key)=>key.startsWith('indexeddb://') && key.includes(MODEL_NAME_PREFIX));
        return indexedDbModels;
    } catch (error) {
        console.warn(`[listAvailableModelPaths] Error listing models with TensorFlow.js API:`, error);
        // Fallback to manual IndexedDB inspection if TensorFlow.js API fails
        return await listAvailableModelPathsFallback();
    }
}
/**
 * Fallback method: manually inspect IndexedDB
 * Only used if TensorFlow.js API is unavailable
 */ async function listAvailableModelPathsFallback() {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || typeof indexedDB === 'undefined') {
        return [];
    }
    const dbName = 'tensorflowjs_models';
    return new Promise((resolve)=>{
        const request = indexedDB.open(dbName);
        request.onsuccess = ()=>{
            const db = request.result;
            const objectStoreNames = Array.from(db.objectStoreNames);
            const modelPaths = objectStoreNames.filter((name)=>name.startsWith(MODEL_NAME_PREFIX)).map((name)=>`indexeddb://${name}`);
            // Also log all object stores (not just ones starting with MODEL_NAME_PREFIX)
            if (objectStoreNames.length > 0) {} else {}
            db.close();
            resolve(modelPaths);
        };
        request.onerror = (e)=>{
            console.warn(`[listAvailableModelPathsFallback] Error opening database '${dbName}':`, e);
            resolve([]);
        };
        request.onupgradeneeded = ()=>{
            resolve([]);
        };
    });
}
async function debugListAllIndexedDBDatabases() {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || typeof indexedDB === 'undefined') {
        return;
    }
    if (indexedDB.databases) {
        try {
            const databases = await indexedDB.databases();
            // Open each database and list object stores
            for (const dbInfo of databases){
                if (!dbInfo.name) continue;
                try {
                    const request = indexedDB.open(dbInfo.name);
                    request.onsuccess = ()=>{
                        const db = request.result;
                        const objectStores = Array.from(db.objectStoreNames);
                        db.close();
                    };
                    request.onerror = ()=>{
                        console.warn(`[debugListAllIndexedDBDatabases] Could not open database '${dbInfo.name}'`);
                    };
                } catch (e) {
                    console.warn(`[debugListAllIndexedDBDatabases] Error inspecting database '${dbInfo.name}':`, e);
                }
            }
        } catch (e) {
            console.warn('[debugListAllIndexedDBDatabases] Error getting database list:', e);
        }
    } else {
        console.warn('[debugListAllIndexedDBDatabases] indexedDB.databases() not available in this browser');
    }
}
async function listSavedModels() {
    const db = getDatabase();
    if (!db) {
        console.warn('Dexie not available (likely SSR or browser not supported)');
        return [];
    }
    try {
        // Get all metadata from Dexie, sorted by creation date (newest first)
        // db is guaranteed to be non-null here because we checked above
        const allModels = await db.modelMetadata.orderBy('createdAt').reverse().toArray();
        // Filter to only include models that actually exist in TensorFlow.js IndexedDB
        // This filters out orphaned metadata entries (metadata without corresponding model weights)
        const validModels = [];
        const orphanedModels = [];
        for (const m of allModels){
            const exists = await modelExists(m.path);
            if (exists) {
                validModels.push({
                    name: m.name,
                    path: m.path,
                    createdAt: m.createdAt,
                    createdAtString: m.createdAtString,
                    evalScore: m.evalScore
                });
            } else {
                // Model metadata exists but weights are missing - will be cleaned up below
                orphanedModels.push(m.path);
            }
        }
        // Clean up orphaned metadata entries (models with metadata but no weights)
        // This can happen if IndexedDB was cleared but Dexie metadata remained, or if a save failed
        if (orphanedModels.length > 0) {
            for (const orphanedPath of orphanedModels){
                try {
                    await deleteMetadata(orphanedPath);
                } catch (error) {
                // Silently handle cleanup errors - not critical
                }
            }
        }
        return validModels;
    } catch (error) {
        console.error('Error listing models:', error);
        return [];
    }
}
async function deleteModel(modelPath) {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || typeof indexedDB === 'undefined') {
        throw new Error('IndexedDB not available (likely SSR or browser not supported)');
    }
    const cleanPath = modelPath.replace('indexeddb://', '');
    try {
        // Delete from TensorFlow.js database
        // TensorFlow.js stores models in object stores. We clear all data from the store.
        const tfDbName = 'tensorflowjs_models';
        await new Promise((resolve, reject)=>{
            const request = indexedDB.open(tfDbName);
            request.onsuccess = ()=>{
                const db = request.result;
                if (db.objectStoreNames.contains(cleanPath)) {
                    // Clear all data from the object store
                    const transaction = db.transaction([
                        cleanPath
                    ], 'readwrite');
                    const store = transaction.objectStore(cleanPath);
                    const clearRequest = store.clear();
                    clearRequest.onsuccess = ()=>{
                        db.close();
                        resolve();
                    };
                    clearRequest.onerror = ()=>{
                        db.close();
                        reject(new Error('Failed to clear model data'));
                    };
                    transaction.onerror = ()=>{
                        db.close();
                        reject(new Error('Transaction failed'));
                    };
                } else {
                    db.close();
                    resolve(); // Model doesn't exist, consider it deleted
                }
            };
            request.onerror = ()=>{
                reject(new Error('Failed to open TensorFlow.js database'));
            };
        });
        // Delete metadata from Dexie
        await deleteMetadata(modelPath);
    } catch (error) {
        console.error('Error deleting model:', error);
        // Still try to delete metadata even if TensorFlow.js deletion failed
        try {
            await deleteMetadata(modelPath);
        } catch (metaError) {
            console.warn('Failed to delete metadata:', metaError);
        }
        throw error;
    }
}
async function getModelMetadata(modelPath) {
    // Get from Dexie metadata store
    const metadata = await getMetadata(modelPath);
    if (metadata) {
        return metadata;
    }
    // Fallback: extract from path (for backward compatibility)
    const cleanPath = modelPath.replace('indexeddb://', '');
    const timestampMatch = cleanPath.match(/tank-ai-(\d{10,})$/);
    if (timestampMatch) {
        const timestamp = parseInt(timestampMatch[1]);
        return {
            name: cleanPath,
            path: modelPath,
            createdAt: timestamp,
            createdAtString: formatDateString(timestamp)
        };
    }
    return null;
}
async function saveModelWithMetadata(modelPath, evalScore, displayName) {
    const db = getDatabase();
    if (!db) {
        console.warn('Dexie not available, cannot save metadata');
        return;
    }
    const cleanPath = modelPath.replace('indexeddb://', '');
    // Extract timestamp from path or use current time
    let timestamp = Date.now();
    let name = displayName || cleanPath;
    // Try to extract timestamp from path
    const timestampMatch = cleanPath.match(/tank-ai-(\d{10,})$/);
    if (timestampMatch) {
        timestamp = parseInt(timestampMatch[1]);
    }
    // Use ISO timestamp for display name if not provided
    if (!displayName) {
        const isoString = new Date(timestamp).toISOString();
        name = isoString;
    }
    // Save metadata
    await saveMetadata(modelPath, name, timestamp, evalScore);
    // Keep only the most recent MAX_MODELS models
    const allModels = await db.modelMetadata.orderBy('createdAt').reverse().toArray();
    if (allModels.length > MAX_MODELS) {
        // Delete oldest models (keep the first MAX_MODELS)
        const modelsToDelete = allModels.slice(MAX_MODELS);
        for (const modelToDelete of modelsToDelete){
            try {
                // Use the deleteModel function which properly deletes from both TensorFlow.js IndexedDB and Dexie
                await deleteModel(modelToDelete.path);
            } catch (error) {
                console.warn(`Failed to delete old model ${modelToDelete.path}:`, error);
            }
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-training-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RLTrainingManager",
    ()=>RLTrainingManager
]);
/**
 * RL Training Manager
 * 
 * Coordinates the training process, managing episodes, step collection,
 * and model updates. Integrates with the game to collect training data.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-dqn-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$replay$2d$buffer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-replay-buffer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$environment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-environment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model-storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
;
;
;
;
;
;
class RLTrainingManager {
    agent;
    replayBuffer;
    env;
    config;
    stats;
    isTraining = false;
    currentEpisode = 0;
    completedEpisodes = 0;
    stepCount = 0;
    hasTrainedAtLeastOnce = false;
    // Per-game state tracking
    gameStates = new Map();
    activeGameEpisodes = new Set();
    gameEpisodeRewards = new Map();
    gameEpisodeLengths = new Map();
    constructor(config = {}){
        this.config = {
            dqn: {},
            episodes: 1000,
            trainEvery: 4,
            saveEvery: 100,
            selfPlay: true,
            // TODO: Implement headless mode later - this will allow faster training by skipping rendering
            // When implemented, set headless: true by default, or use config.headless if provided
            headless: false,
            maxEpisodeTimeMs: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_EPISODE_TIME_MS"],
            ...config
        };
        this.agent = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DQNAgent"]({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"],
            ...this.config.dqn
        });
        this.replayBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$replay$2d$buffer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplayBuffer"](this.config.dqn.replayBufferSize || __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].replayBufferSize);
        this.env = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$environment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TankTroubleRLEnv"](this.config.maxEpisodeTimeMs);
        this.stats = {
            episode: 0,
            episodeReward: 0,
            episodeLength: 0,
            totalReward: 0,
            averageReward: 0,
            epsilon: 1.0,
            loss: 0
        };
    }
    /**
   * Initialize training (create networks, etc.)
   */ async initialize() {
        await this.agent.initialize();
        // Set up model for game and connect agent to model manager
        // This allows the game to use the trained model during training
        const model = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TensorFlowJSModel"]({
            name: 'TankTroubleRL',
            type: 'discrete',
            observationSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].observationSize,
            actionSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].actionSize
        });
        // Connect agent to model interface for use in game
        // This allows the game controller to use the trained model during training
        // Note: RLModel.predict is synchronous, but agent.predict is async
        // We use a synchronous wrapper that falls back to rule-based for game loop
        // The actual RL predictions happen in training step (async)
        const extendedModel = {
            isLoaded: ()=>model.isLoaded(),
            load: (path)=>model.load(path),
            getInfo: ()=>model.getInfo(),
            agent: this.agent,
            // Synchronous predict for game loop compatibility
            // Actual RL predictions happen in training step
            predict: (obs, angle)=>{
                // For game loop, return rule-based decision
                // RL predictions are handled separately in training step
                // This is a design limitation - ideally controller would be async
                return {
                    angleDelta: 0,
                    moveDirection: 0,
                    shouldShoot: false
                };
            }
        };
        // Set model in global model manager so game controller can use it during training
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].setModel(extendedModel);
    }
    /**
   * Run one training step
   * 
   * This should be called from the game loop after each game tick.
   * The decision parameter is the action that was actually taken.
   * 
   * @param gameId - Unique identifier for the game instance (e.g., "game-0", "game-1")
   *                 This allows tracking state per game while sharing the model
   */ async step(context, decision, actionTaken, gameId) {
        if (!this.isTraining) {
            return;
        }
        // Get current observation
        const observation = this.env.getObservation(context);
        // Use gameId to track state per game (default to "default" if not provided for backward compatibility)
        const gameKey = gameId || 'default';
        // Get or initialize state for this specific game
        let envState = this.gameStates.get(gameKey);
        // If this is the first step or state is invalid, reset environment for this game
        if (!envState || !envState.observation) {
            envState = this.env.reset(context);
            this.gameStates.set(gameKey, envState);
            // Mark this game as having an active episode
            this.activeGameEpisodes.add(gameKey);
            // Initialize episode reward and length for this game (reset from previous episode)
            this.gameEpisodeRewards.set(gameKey, 0);
            this.gameEpisodeLengths.set(gameKey, 0);
            // Update shared stats to include this newly active game
            this.updateSharedStats();
            return;
        }
        // Use provided action or select new one
        let action = 0; // Default to action 0 (no-op)
        if (actionTaken !== undefined && actionTaken !== null) {
            action = actionTaken;
        } else {
            // Select action using epsilon-greedy
            action = await this.agent.selectAction(envState.observation, true);
        }
        // Execute action and get next state
        const nextEnvState = this.env.step(action, context, decision);
        // Ensure we have valid state before storing step
        if (!envState || !envState.observation || !nextEnvState || !nextEnvState.observation) {
            // Skip step collection if state is invalid, reset for this game
            this.gameStates.set(gameKey, nextEnvState || this.env.reset(context));
            return;
        }
        // Store step from previous state to current state
        // All games contribute to the SAME shared replay buffer
        const step = {
            state: envState.observation.vector,
            action: action,
            reward: nextEnvState.reward,
            nextState: nextEnvState.observation.vector,
            done: nextEnvState.done
        };
        // Add to shared replay buffer (all games contribute here)
        this.replayBuffer.add(step);
        // Track reward and length per game (for proper episode tracking)
        const currentGameReward = this.gameEpisodeRewards.get(gameKey) || 0;
        const currentGameLength = this.gameEpisodeLengths.get(gameKey) || 0;
        this.gameEpisodeRewards.set(gameKey, currentGameReward + nextEnvState.reward);
        this.gameEpisodeLengths.set(gameKey, currentGameLength + 1);
        // Update shared stats for display (sum of all active games)
        this.updateSharedStats();
        // Debug: Log every 100 steps to verify accumulation
        if (this.stats.episodeLength % 100 === 0) {}
        // Train periodically on shared model
        // All games' steps are batched together for training
        this.stepCount++;
        if (this.stepCount % this.config.trainEvery === 0 && this.replayBuffer.canSample(32)) {
            const batch = this.replayBuffer.sample(32); // Sample from ALL games' steps
            const loss = await this.agent.train(batch); // Train shared model
            this.stats.loss = loss;
            // Mark that training has occurred (even if loss is 0, training ran)
            // This ensures we only save models that have actually been trained
            this.hasTrainedAtLeastOnce = true;
            if (this.config.onTrainingUpdate) {
                this.config.onTrainingUpdate({
                    loss,
                    epsilon: this.agent.getEpsilon()
                });
            }
        }
        // Check if episode is done for this specific game
        if (nextEnvState.done) {
            await this.onEpisodeComplete(nextEnvState, gameKey);
            // Reset state for this game only (other games unaffected)
            this.gameStates.delete(gameKey);
        // Note: Don't remove from activeGameEpisodes here - it will be re-added when the game restarts
        // This prevents the brief window where all games might be "inactive" causing premature reset
        // Note: We also don't clear gameEpisodeRewards/gameEpisodeLengths here - they'll be reset
        // when the game restarts and step() is called with a fresh state
        } else {
            // Update state for this specific game
            this.gameStates.set(gameKey, nextEnvState);
        }
    }
    /**
   * Update shared stats from per-game rewards and lengths
   * This sums all active game rewards/lengths for display
   */ updateSharedStats() {
        let totalReward = 0;
        let totalLength = 0;
        for (const [gameKey, reward] of this.gameEpisodeRewards.entries()){
            if (this.activeGameEpisodes.has(gameKey)) {
                totalReward += reward;
            }
        }
        for (const [gameKey, length] of this.gameEpisodeLengths.entries()){
            if (this.activeGameEpisodes.has(gameKey)) {
                totalLength += length;
            }
        }
        this.stats.episodeReward = totalReward;
        this.stats.episodeLength = totalLength;
    }
    /**
   * Increment episode count (called when a new game starts)
   * This is shared across all 4 games running in parallel
   * Each game that starts increments the shared counter by 1
   * 
   * Note: The reward from the completed episode should have already been
   * added to totalReward in onEpisodeComplete(). This just increments the counter.
   */ incrementEpisode() {
        // Increment episode count
        this.currentEpisode++;
        this.stats.episode = this.currentEpisode;
        this.stats.epsilon = this.agent.getEpsilon();
        // Update average reward using completed episodes (not currentEpisode which includes in-progress games)
        // This ensures averageReward reflects only completed games
        if (this.completedEpisodes > 0) {
            this.stats.averageReward = this.stats.totalReward / this.completedEpisodes;
        }
        // Save model periodically
        if (this.currentEpisode % this.config.saveEvery === 0) {
            // Save asynchronously without blocking
            const timestamp = Date.now();
            const isoString = new Date(timestamp).toISOString();
            const evalScore = this.stats.averageReward;
            this.saveModel(`indexeddb://tank-ai-${timestamp}`, evalScore, isoString).catch((error)=>{
                console.error('Error saving model:', error);
            });
        }
        // Callback to notify listeners
        if (this.config.onEpisodeComplete) {
            this.config.onEpisodeComplete({
                ...this.stats
            });
        }
    }
    /**
   * Handle episode completion (simplified - no longer increments episode count)
   * Episode count is now incremented when a new game starts, not when it ends
   * 
   * This method adds the completed game's reward to totalReward and cleans up
   * per-game tracking. The episode counter is incremented separately when
   * the new game starts.
   */ async onEpisodeComplete(finalState, gameKey) {
        // Get the base game key (without "-blue" suffix) to combine both tanks' rewards
        const isBlueTank = gameKey.includes('-blue');
        const baseGameKey = isBlueTank ? gameKey.replace('-blue', '') : gameKey;
        // Get rewards from both tanks for this game (blue and red)
        const redReward = this.gameEpisodeRewards.get(baseGameKey) || 0;
        const blueReward = this.gameEpisodeRewards.get(`${baseGameKey}-blue`) || 0;
        const totalGameReward = redReward + blueReward;
        // Get lengths from both tanks
        const redLength = this.gameEpisodeLengths.get(baseGameKey) || 0;
        const blueLength = this.gameEpisodeLengths.get(`${baseGameKey}-blue`) || 0;
        const totalGameLength = redLength + blueLength;
        // Add this game's total reward to totalReward (only count once per game, not per tank)
        // In AI vs AI mode, both tanks call this, but we only want to count once
        if (!isBlueTank) {
            this.stats.totalReward += totalGameReward;
            this.completedEpisodes++;
            // Update average reward immediately when episode completes
            // Use completedEpisodes for accurate average (not currentEpisode which includes in-progress games)
            if (this.completedEpisodes > 0) {
                this.stats.averageReward = this.stats.totalReward / this.completedEpisodes;
            }
        }
        // Clean up per-game tracking for this game when episode completes
        // We'll reset these when the game restarts and step() is called with fresh state
        // Note: We mark as inactive so it doesn't contribute to shared stats
        this.activeGameEpisodes.delete(baseGameKey);
        this.activeGameEpisodes.delete(`${baseGameKey}-blue`); // Also remove blue variant if it exists
        // Update shared stats (will exclude this completed game)
        this.updateSharedStats();
    }
    /**
   * Start training
   */ start() {
        if (!this.isTraining) {
            this.isTraining = true;
            this.currentEpisode = 0;
            this.completedEpisodes = 0;
            this.stepCount = 0;
            // Reset episode stats when training starts
            this.stats.episodeReward = 0;
            this.stats.episodeLength = 0;
            this.stats.totalReward = 0;
            this.stats.averageReward = 0;
            this.activeGameEpisodes.clear();
            this.gameEpisodeRewards.clear();
            this.gameEpisodeLengths.clear();
        }
    }
    /**
   * Stop training
   */ stop() {
        this.isTraining = false;
    }
    /**
   * Check if training is active
   */ getIsTraining() {
        return this.isTraining;
    }
    /**
   * Get current training statistics
   */ getStats() {
        return {
            ...this.stats
        };
    }
    /**
   * Check if model can be saved
   * Requirements:
   * 1. Replay buffer has enough steps (32+) for at least one training batch
   * 2. At least one episode has completed (to have meaningful averageReward)
   * 3. Training has actually occurred at least once (hasTrainedAtLeastOnce)
   * 
   * Note: We require hasTrainedAtLeastOnce instead of loss > 0 because:
   * - Loss might be 0 even after training (if there was an error or loss extraction failed)
   * - But if training ran, the model weights have been updated, making it worth saving
   * - This ensures we only save models that have actually been trained, not just initialized
   */ canSaveModel() {
        const hasEnoughData = this.replayBuffer.canSample(32);
        const hasCompletedEpisode = this.currentEpisode > 0; // Need at least one episode for meaningful stats
        // Require that training has actually occurred (model weights have been updated)
        return hasEnoughData && hasCompletedEpisode && this.hasTrainedAtLeastOnce;
    }
    /**
   * Get replay buffer size
   */ getReplayBufferSize() {
        return this.replayBuffer.size();
    }
    /**
   * Save model
   */ async saveModel(path, evalScore, displayName) {
        // Ensure path has indexeddb:// prefix for IndexedDB storage
        // If path already has the prefix, use it as-is; otherwise add it
        const fullPath = path.startsWith('indexeddb://') ? path : `indexeddb://${path}`;
        if (!this.agent) {
            throw new Error('Agent not initialized. Cannot save model.');
        }
        // CRITICAL: Save model weights FIRST and verify they were saved
        // Only save metadata AFTER we confirm the weights are in IndexedDB
        // This prevents orphaned metadata entries
        try {
            await this.agent.save(fullPath);
        // agent.save() now includes verification - if it returns, weights are saved
        } catch (error) {
            console.error('RLTrainingManager: Model weights save/verification failed:', error);
            throw new Error(`Failed to save model weights: ${error instanceof Error ? error.message : String(error)}`);
        }
        // Only save metadata if weights were successfully saved and verified
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveModelWithMetadata"])(fullPath, evalScore, displayName);
        } catch (metaError) {
            // If metadata save fails, log but don't throw - weights are already saved
            console.warn('RLTrainingManager: Failed to save model metadata (weights are saved):', metaError);
        // Don't throw - metadata is optional, weights are the important part
        }
    }
    /**
   * Load model
   */ async loadModel(path) {
        await this.agent.load(`indexeddb://${path}`);
    }
    /**
   * Reset environment for new episode
   */ resetEpisode(context, gameId) {
        const gameKey = gameId || 'default';
        const newState = this.env.reset(context);
        this.gameStates.set(gameKey, newState);
    }
    /**
   * Get max episode time in milliseconds
   */ getMaxEpisodeTimeMs() {
        return this.config.maxEpisodeTimeMs;
    }
    /**
   * Dispose resources
   */ dispose() {
        this.stop();
        this.agent.dispose();
        this.replayBuffer.clear();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/ai-tank/rl-training-hook.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRLTraining",
    ()=>useRLTraining
]);
/**
 * React Hook for RL Training
 * 
 * Provides a hook interface for training that can be used in React components.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$training$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-training-manager.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useRLTraining(config = {}) {
    _s();
    const [isTraining, setIsTraining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const managerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const configRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(config);
    // Keep config ref up to date
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRLTraining.useEffect": ()=>{
            configRef.current = config;
        }
    }["useRLTraining.useEffect"], [
        config
    ]);
    // Memoize callbacks to prevent recreation
    const onEpisodeCompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(config.onEpisodeComplete);
    const onTrainingUpdateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(config.onTrainingUpdate);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRLTraining.useEffect": ()=>{
            onEpisodeCompleteRef.current = config.onEpisodeComplete;
            onTrainingUpdateRef.current = config.onTrainingUpdate;
        }
    }["useRLTraining.useEffect"], [
        config.onEpisodeComplete,
        config.onTrainingUpdate
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRLTraining.useEffect": ()=>{
            const manager = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$training$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RLTrainingManager"]({
                ...configRef.current,
                onEpisodeComplete: {
                    "useRLTraining.useEffect": (episodeStats)=>{
                        setStats({
                            "useRLTraining.useEffect": (prev)=>{
                                // Preserve loss value from previous stats if it exists and is non-zero
                                // This prevents loss from being reset to 0 when episodes complete
                                const preservedLoss = (prev?.loss ?? 0) > 0 ? prev?.loss ?? 0 : episodeStats.loss;
                                return {
                                    ...episodeStats,
                                    loss: preservedLoss
                                };
                            }
                        }["useRLTraining.useEffect"]);
                        if (onEpisodeCompleteRef.current) {
                            onEpisodeCompleteRef.current(episodeStats);
                        }
                    }
                }["useRLTraining.useEffect"],
                onTrainingUpdate: {
                    "useRLTraining.useEffect": (updateStats)=>{
                        setStats({
                            "useRLTraining.useEffect": (prev)=>{
                                // Type guard to check if key is valid TrainingStats key
                                const isValidTrainingStatsKey = {
                                    "useRLTraining.useEffect.isValidTrainingStatsKey": (key)=>{
                                        const validKeys = [
                                            'episode',
                                            'episodeReward',
                                            'episodeLength',
                                            'totalReward',
                                            'averageReward',
                                            'epsilon',
                                            'loss'
                                        ];
                                        return typeof key === 'string' && validKeys.includes(key);
                                    }
                                }["useRLTraining.useEffect.isValidTrainingStatsKey"];
                                // Filter out undefined values to prevent overwriting with undefined
                                const definedUpdates = {};
                                for (const [key, value] of Object.entries(updateStats)){
                                    if (value !== undefined && isValidTrainingStatsKey(key)) {
                                        definedUpdates[key] = value;
                                    }
                                }
                                // If prev is null, initialize with default values and merge defined updates
                                if (!prev) {
                                    const defaultStats = {
                                        episode: 0,
                                        episodeReward: 0,
                                        episodeLength: 0,
                                        totalReward: 0,
                                        averageReward: 0,
                                        epsilon: 1.0,
                                        loss: 0
                                    };
                                    return {
                                        ...defaultStats,
                                        ...definedUpdates
                                    };
                                }
                                // Only update if values actually changed to prevent infinite loops
                                const hasChanges = Object.keys(definedUpdates).some({
                                    "useRLTraining.useEffect.hasChanges": (key)=>{
                                        if (isValidTrainingStatsKey(key)) {
                                            return prev[key] !== definedUpdates[key];
                                        }
                                        return false;
                                    }
                                }["useRLTraining.useEffect.hasChanges"]);
                                return hasChanges ? {
                                    ...prev,
                                    ...definedUpdates
                                } : prev;
                            }
                        }["useRLTraining.useEffect"]);
                        if (onTrainingUpdateRef.current) {
                            onTrainingUpdateRef.current(updateStats);
                        }
                    }
                }["useRLTraining.useEffect"]
            });
            manager.initialize().then({
                "useRLTraining.useEffect": ()=>{
                    setIsInitialized(true);
                    managerRef.current = manager;
                    // Initialize stats with current manager stats to ensure all fields are present
                    const initialStats = manager.getStats();
                    setStats(initialStats);
                }
            }["useRLTraining.useEffect"]);
            return ({
                "useRLTraining.useEffect": ()=>{
                    if (managerRef.current) {
                        managerRef.current.dispose();
                    }
                }
            })["useRLTraining.useEffect"];
        }
    }["useRLTraining.useEffect"], []);
    const startTraining = ()=>{
        if (managerRef.current && isInitialized) {
            managerRef.current.start();
            setIsTraining(true);
        }
    };
    const stopTraining = ()=>{
        if (managerRef.current) {
            managerRef.current.stop();
            setIsTraining(false);
        }
    };
    const step = async (context, decision, actionTaken)=>{
        if (managerRef.current && isTraining) {
            await managerRef.current.step(context, decision, actionTaken);
        }
    };
    const saveModel = async (name, evalScore, displayName)=>{
        if (managerRef.current) {
            await managerRef.current.saveModel(name, evalScore, displayName);
        }
    };
    const loadModel = async (name)=>{
        if (managerRef.current) {
            await managerRef.current.loadModel(name);
        }
    };
    const resetEpisode = (context)=>{
        if (managerRef.current) {
            managerRef.current.resetEpisode(context);
        }
    };
    const incrementEpisode = ()=>{
        if (managerRef.current) {
            managerRef.current.incrementEpisode();
        }
    };
    const canSaveModel = ()=>{
        return managerRef.current ? managerRef.current.canSaveModel() : false;
    };
    const getReplayBufferSize = ()=>{
        return managerRef.current ? managerRef.current.getReplayBufferSize() : 0;
    };
    return {
        isTraining,
        isInitialized,
        stats,
        startTraining,
        stopTraining,
        step,
        saveModel,
        loadModel,
        resetEpisode,
        incrementEpisode,
        canSaveModel,
        getReplayBufferSize,
        get manager () {
            return managerRef.current;
        }
    };
}
_s(useRLTraining, "Rxk7i1vgz5gnk9yoxrPuo9vp8fc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnifiedTrainingView",
    ()=>UnifiedTrainingView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$content$2f$games$2f$tank$2d$trouble$2d$map$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/shared/content/games/tank-trouble-map.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/type-guards.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useGameInput$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/hooks/useGameInput.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useTankImages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/hooks/useTankImages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameLogic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/components/GameLogic.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/components/GameCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/spawn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$training$2d$hook$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-training-hook.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model-storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-dqn-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/constants/game-constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
/**
 * Unified Training View
 * 
 * Single interface for all training modes: AI vs AI and Person vs AI
 * Supports up to 4 games simultaneously with stats and model summary
 */ 'use client';
;
// Component to update stats reactively (no polling)
function StatsDebouncer({ stats, onUpdate }) {
    _s();
    const prevStatsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Update reactively when stats change (no artificial delays)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatsDebouncer.useEffect": ()=>{
            const prev = prevStatsRef.current;
            // Only update if values actually changed
            if (!prev || prev.episodeReward !== stats.episodeReward || prev.episodeLength !== stats.episodeLength) {
                prevStatsRef.current = stats;
                onUpdate(stats);
            }
        }
    }["StatsDebouncer.useEffect"], [
        stats.episodeReward,
        stats.episodeLength,
        onUpdate
    ]);
    return null;
}
_s(StatsDebouncer, "zPcERvg/NVHwwcyCCdntw/vqRis=");
_c = StatsDebouncer;
;
;
// Type guard for TankTroubleMapData
function isTankTroubleMapData(data) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObject"])(data)) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'width', __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'height', __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'barriers', (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArray"])(val)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'spawnPoints', (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArray"])(val)) && (!('suns' in data) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'suns', (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArray"])(val)));
}
// Validate and construct map data without type assertions
function validateMapData(data) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAndValidate"])(data, isTankTroubleMapData, 'Invalid map data structure: missing or invalid required properties');
    return {
        width: parsed.width,
        height: parsed.height,
        barriers: parsed.barriers,
        spawnPoints: parsed.spawnPoints,
        suns: parsed.suns || []
    };
}
const mapData = validateMapData(__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$content$2f$games$2f$tank$2d$trouble$2d$map$2e$json__$28$json$29$__["default"]);
;
;
;
;
;
;
;
;
;
;
;
// Speed multiplier for AI vs AI games (1x speed for normal training)
const AI_VS_AI_SPEED_MULTIPLIER = 1;
// Configuration: Number of simultaneous games to train
const MAX_GAMES = 4;
const MAX_GAMES_HEADLESS = 8; // More games in headless mode since we're not rendering
const AUTO_SAVE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
function UnifiedTrainingView() {
    _s1();
    const typedMapData = mapData;
    // These are static values from map data, so use constants instead of refs
    // Refs should only be used for values that change and shouldn't trigger re-renders
    const barriers = typedMapData.barriers || [];
    const suns = []; // Suns removed from map - always use empty array
    const aiConfig = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_AI_CONFIG"];
    // Headless training mode
    const [isHeadlessMode, setIsHeadlessMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoSaveCount, setAutoSaveCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const autoSaveIntervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Use more games in headless mode since we're not rendering
    const maxGames = isHeadlessMode ? MAX_GAMES_HEADLESS : MAX_GAMES;
    // Game statistics
    const [gameStats, setGameStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        totalGames: 0,
        aiVsAiGames: 0,
        personVsAiGames: 0
    });
    // Track total games started (including incomplete ones)
    // Starts at MAX_GAMES because we have MAX_GAMES games running initially
    const [totalGamesStarted, setTotalGamesStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(MAX_GAMES);
    // Model selection
    const [savedModels, setSavedModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedModel, setSelectedModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoadingModels, setIsLoadingModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedModelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    // Dictionary visibility (commented out - using separate component)
    // const [isDictionaryVisible, setIsDictionaryVisible] = useState(true);
    // Debounced stats for display (update every 5 seconds)
    const [displayStats, setDisplayStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Memoize the update callback to prevent recreation
    const handleDisplayStatsUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTrainingView.useCallback[handleDisplayStatsUpdate]": (stats)=>{
            setDisplayStats({
                "UnifiedTrainingView.useCallback[handleDisplayStatsUpdate]": (prev)=>{
                    // Only update if values actually changed
                    if (!prev || prev.reward !== stats.episodeReward || prev.length !== stats.episodeLength) {
                        return {
                            reward: stats.episodeReward,
                            length: stats.episodeLength
                        };
                    }
                    return prev;
                }
            }["UnifiedTrainingView.useCallback[handleDisplayStatsUpdate]"]);
        }
    }["UnifiedTrainingView.useCallback[handleDisplayStatsUpdate]"], []);
    // Track which game the user is playing (only one at a time)
    const [userPlayingGameId, setUserPlayingGameId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Ref to track next episode number atomically (prevents race conditions when multiple games end simultaneously)
    const nextEpisodeNumberRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(MAX_GAMES + 1); // Start at MAX_GAMES + 1 (will be updated when headless mode changes)
    // Track current time for duration calculations
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    // Update current time every second for duration display
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            const interval = setInterval({
                "UnifiedTrainingView.useEffect.interval": ()=>{
                    setCurrentTime(Date.now());
                }
            }["UnifiedTrainingView.useEffect.interval"], 1000); // Update every second
            return ({
                "UnifiedTrainingView.useEffect": ()=>clearInterval(interval)
            })["UnifiedTrainingView.useEffect"];
        }
    }["UnifiedTrainingView.useEffect"], []);
    // Create game instances (start with MAX_GAMES AI vs AI games, will expand to MAX_GAMES_HEADLESS in headless mode)
    const [gameInstances, setGameInstances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "UnifiedTrainingView.useState": ()=>{
            const instances = Array.from({
                length: MAX_GAMES
            }, {
                "UnifiedTrainingView.useState.instances": (_, i)=>{
                    const initialTanks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitialSpawnPositions"])(typedMapData, barriers, suns);
                    return {
                        id: i,
                        tanks: initialTanks,
                        bullets: [],
                        lastShotTimes: {
                            blue: 0,
                            red: 0
                        },
                        gameOverWinner: null,
                        episodeReward: 0,
                        episodeLength: 0,
                        episodeStartTime: Date.now(),
                        gameType: 'ai-vs-ai',
                        episodeNumber: i + 1
                    };
                }
            }["UnifiedTrainingView.useState.instances"]);
            return instances;
        }
    }["UnifiedTrainingView.useState"]);
    // Shared training manager
    const training = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$training$2d$hook$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRLTraining"])({
        episodes: 1000,
        trainEvery: 4,
        saveEvery: 100,
        selfPlay: true
    });
    // All games are always active (assume all games are always running)
    const activeGamesCount = gameInstances.length;
    // Sync gameStats.totalGames with training episode count (completed games)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            if (training.stats && training.stats.episode !== undefined) {
                const completedGames = training.stats.episode;
                setGameStats({
                    "UnifiedTrainingView.useEffect": (prev)=>({
                            ...prev,
                            totalGames: completedGames
                        })
                }["UnifiedTrainingView.useEffect"]);
            }
        }
    }["UnifiedTrainingView.useEffect"], [
        training.stats?.episode
    ]);
    // Update total games started when a game completes
    // This includes both completed and incomplete games
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            if (training.stats && training.stats.episode !== undefined) {
                // Total games started = completed games + active games count
                setTotalGamesStarted(training.stats.episode + activeGamesCount);
            }
        }
    }["UnifiedTrainingView.useEffect"], [
        training.stats?.episode,
        activeGamesCount
    ]);
    // Helper function to save model (used by both manual and auto-save)
    const saveModelHelper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTrainingView.useCallback[saveModelHelper]": async ()=>{
            if (!training.manager || !training.canSaveModel()) {
                return false;
            }
            try {
                const episode = training.stats?.episode || 0;
                const modelVersion = Math.floor(episode / activeGamesCount) + 1;
                const timestamp = Date.now();
                const isoString = new Date(timestamp).toISOString();
                const modelPath = `indexeddb://tank-ai-${timestamp}`;
                const evalScore = training.stats?.averageReward;
                // COMMENTED OUT: Frontend training disabled - using backend training service instead
                // await training.saveModel(modelPath, evalScore, isoString);
                // await new Promise(resolve => setTimeout(resolve, 500));
                // const models = await listSavedModels();
                // setSavedModels(models);
                // setAutoSaveCount(prev => prev + 1);
                return true;
            } catch (error) {
                console.error('Error auto-saving model:', error);
                return false;
            }
        }
    }["UnifiedTrainingView.useCallback[saveModelHelper]"], [
        training,
        activeGamesCount
    ]);
    // Auto-save interval for headless mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            if (isHeadlessMode && training.isTraining) {
                // Clear any existing interval
                if (autoSaveIntervalRef.current) {
                    clearInterval(autoSaveIntervalRef.current);
                }
                // Set up auto-save every 5 minutes
                autoSaveIntervalRef.current = setInterval({
                    "UnifiedTrainingView.useEffect": ()=>{
                        saveModelHelper();
                    }
                }["UnifiedTrainingView.useEffect"], AUTO_SAVE_INTERVAL_MS);
                return ({
                    "UnifiedTrainingView.useEffect": ()=>{
                        if (autoSaveIntervalRef.current) {
                            clearInterval(autoSaveIntervalRef.current);
                        }
                    }
                })["UnifiedTrainingView.useEffect"];
            } else {
                // Clear interval when headless mode is disabled or training stops
                if (autoSaveIntervalRef.current) {
                    clearInterval(autoSaveIntervalRef.current);
                    autoSaveIntervalRef.current = null;
                }
            }
        }
    }["UnifiedTrainingView.useEffect"], [
        isHeadlessMode,
        training.isTraining,
        saveModelHelper
    ]);
    // Update game instances when headless mode changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            const targetCount = isHeadlessMode ? MAX_GAMES_HEADLESS : MAX_GAMES;
            setGameInstances({
                "UnifiedTrainingView.useEffect": (prev)=>{
                    if (prev.length === targetCount) {
                        return prev; // No change needed
                    }
                    if (prev.length < targetCount) {
                        // Add more game instances
                        const newInstances = Array.from({
                            length: targetCount - prev.length
                        }, {
                            "UnifiedTrainingView.useEffect.newInstances": (_, i)=>{
                                const instanceId = prev.length + i;
                                const initialTanks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitialSpawnPositions"])(typedMapData, barriers, suns);
                                return {
                                    id: instanceId,
                                    tanks: initialTanks,
                                    bullets: [],
                                    lastShotTimes: {
                                        blue: 0,
                                        red: 0
                                    },
                                    gameOverWinner: null,
                                    episodeReward: 0,
                                    episodeLength: 0,
                                    episodeStartTime: Date.now(),
                                    gameType: 'ai-vs-ai',
                                    episodeNumber: nextEpisodeNumberRef.current++
                                };
                            }
                        }["UnifiedTrainingView.useEffect.newInstances"]);
                        return [
                            ...prev,
                            ...newInstances
                        ];
                    } else {
                        // Remove excess game instances (remove from end, but don't remove if user is playing)
                        const instancesToKeep = prev.slice(0, targetCount);
                        // Make sure we don't remove the game the user is playing
                        const userGameIndex = userPlayingGameId !== null ? instancesToKeep.findIndex({
                            "UnifiedTrainingView.useEffect": (gi)=>gi.id === userPlayingGameId
                        }["UnifiedTrainingView.useEffect"]) : -1;
                        if (userGameIndex === -1 && userPlayingGameId !== null) {
                            // User's game would be removed, keep it and remove a different one
                            const userGame = prev.find({
                                "UnifiedTrainingView.useEffect.userGame": (gi)=>gi.id === userPlayingGameId
                            }["UnifiedTrainingView.useEffect.userGame"]);
                            if (userGame) {
                                const withoutUserGame = prev.filter({
                                    "UnifiedTrainingView.useEffect.withoutUserGame": (gi)=>gi.id !== userPlayingGameId
                                }["UnifiedTrainingView.useEffect.withoutUserGame"]);
                                const toKeep = withoutUserGame.slice(0, targetCount - 1);
                                return [
                                    ...toKeep,
                                    userGame
                                ];
                            }
                        }
                        return instancesToKeep;
                    }
                }
            }["UnifiedTrainingView.useEffect"]);
        }
    }["UnifiedTrainingView.useEffect"], [
        isHeadlessMode,
        typedMapData,
        barriers,
        suns,
        userPlayingGameId
    ]);
    const tankImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useTankImages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTankImages"])();
    // Single keyboard input hook - only one game can be personal at a time
    const activeGameOver = userPlayingGameId !== null ? gameInstances[userPlayingGameId]?.gameOverWinner !== null : false;
    const gameInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useGameInput$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameInput"])({
        gameOver: activeGameOver
    });
    // Stable empty keys ref for non-user games (created once, reused)
    const emptyKeysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // Use appropriate keys ref based on game type
    const getKeysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTrainingView.useCallback[getKeysRef]": (gameId)=>{
            // Only return the keys ref if this is the game the user is playing
            if (gameId === userPlayingGameId) {
                return gameInput.keysRef;
            }
            return emptyKeysRef;
        }
    }["UnifiedTrainingView.useCallback[getKeysRef]"], [
        userPlayingGameId,
        gameInput.keysRef
    ]);
    // Replace AI game with person game (user joins as Blue, AI is Red)
    // Preserves current game state - user takes control of existing blue tank
    const replaceWithPersonGame = (gameId)=>{
        // If user is already playing another game, convert that one back to AI vs AI first
        if (userPlayingGameId !== null && userPlayingGameId !== gameId) {
            replaceWithAIGame(userPlayingGameId);
        }
        setUserPlayingGameId(gameId);
        setGameInstances((prev)=>prev.map((gi)=>gi.id === gameId ? {
                    ...gi,
                    gameType: 'person-vs-ai'
                } : gi));
    };
    // Replace person game with AI game
    // Preserves current game state - AI simply takes control of the blue tank
    const replaceWithAIGame = (gameId)=>{
        if (userPlayingGameId === gameId) {
            setUserPlayingGameId(null);
        }
        setGameInstances((prev)=>prev.map((gi)=>gi.id === gameId ? {
                    ...gi,
                    gameType: 'ai-vs-ai'
                } : gi));
    };
    // Get max episode time from training manager
    const maxEpisodeTimeMs = training.manager?.getMaxEpisodeTimeMs() || __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$constants$2f$game$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_EPISODE_TIME_MS"];
    // Prepare game instances for multi-game logic hook - memoize to avoid recreating on every render
    // Note: This will still recreate when gameInstances changes (which is frequent during gameplay),
    // but prevents recreation on unrelated renders (UI state changes, etc.)
    const gameLogicInstances = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTrainingView.useMemo[gameLogicInstances]": ()=>{
            return gameInstances.map({
                "UnifiedTrainingView.useMemo[gameLogicInstances]": (instance)=>({
                        id: instance.id,
                        tanks: instance.tanks,
                        bullets: instance.bullets,
                        lastShotTimes: instance.lastShotTimes,
                        gameMode: instance.gameType === 'person-vs-ai' ? 'person-vs-ai' : 'ai',
                        gameId: `game-${instance.id}`,
                        isPaused: !training.isTraining || instance.id === userPlayingGameId && gameInput.isPaused,
                        speedMultiplier: instance.gameType === 'ai-vs-ai' ? AI_VS_AI_SPEED_MULTIPLIER : 1,
                        episodeStartTime: instance.episodeStartTime,
                        keysRef: getKeysRef(instance.id)
                    })
            }["UnifiedTrainingView.useMemo[gameLogicInstances]"]);
        }
    }["UnifiedTrainingView.useMemo[gameLogicInstances]"], [
        gameInstances,
        training.isTraining,
        userPlayingGameId,
        gameInput.isPaused,
        getKeysRef
    ]);
    // Single hook call for all games
    const gameLogic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameLogic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMultiGameLogic"])({
        mapData: typedMapData,
        barriers: barriers,
        suns: suns,
        aiConfig,
        trainingManager: training.manager,
        maxEpisodeTimeMs,
        gameInstances: gameLogicInstances,
        onTanksUpdate: {
            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gameId, tanks)=>{
                setGameInstances({
                    "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (prev)=>{
                        const updated = prev.map({
                            "UnifiedTrainingView.useMultiGameLogic[gameLogic].updated": (gi)=>{
                                if (gi.id === gameId) {
                                    return {
                                        ...gi,
                                        tanks
                                    };
                                }
                                return gi;
                            }
                        }["UnifiedTrainingView.useMultiGameLogic[gameLogic].updated"]);
                        return updated;
                    }
                }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"]);
            }
        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"],
        onBulletsUpdate: {
            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gameId, bullets)=>{
                setGameInstances({
                    "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (prev)=>prev.map({
                            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gi)=>gi.id === gameId ? {
                                    ...gi,
                                    bullets
                                } : gi
                        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"])
                }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"]);
            }
        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"],
        onLastShotTimesUpdate: {
            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gameId, times)=>{
                setGameInstances({
                    "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (prev)=>prev.map({
                            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gi)=>gi.id === gameId ? {
                                    ...gi,
                                    lastShotTimes: times
                                } : gi
                        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"])
                }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"]);
            }
        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"],
        onGameOver: {
            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gameId, winner)=>{
                const newEpisodeNumber = nextEpisodeNumberRef.current++;
                training.incrementEpisode();
                // Check the game type before resetting (to preserve user control if it's person-vs-ai)
                const gameBeforeReset = gameInstances.find({
                    "UnifiedTrainingView.useMultiGameLogic[gameLogic].gameBeforeReset": (gi)=>gi.id === gameId
                }["UnifiedTrainingView.useMultiGameLogic[gameLogic].gameBeforeReset"]);
                const wasPersonVsAI = gameBeforeReset?.gameType === 'person-vs-ai';
                setGameInstances({
                    "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (prev)=>prev.map({
                            "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (gi)=>{
                                if (gi.id === gameId) {
                                    setGameStats({
                                        "UnifiedTrainingView.useMultiGameLogic[gameLogic]": (stats)=>({
                                                ...stats,
                                                aiVsAiGames: gi.gameType === 'ai-vs-ai' ? stats.aiVsAiGames + 1 : stats.aiVsAiGames,
                                                personVsAiGames: gi.gameType === 'person-vs-ai' ? stats.personVsAiGames + 1 : stats.personVsAiGames
                                            })
                                    }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"]);
                                    return {
                                        ...gi,
                                        tanks: (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitialSpawnPositions"])(typedMapData, barriers, suns),
                                        bullets: [],
                                        lastShotTimes: {
                                            blue: 0,
                                            red: 0
                                        },
                                        gameOverWinner: null,
                                        episodeReward: 0,
                                        episodeLength: 0,
                                        episodeStartTime: Date.now(),
                                        episodeNumber: newEpisodeNumber
                                    };
                                }
                                return gi;
                            }
                        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"])
                }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"]);
                // Only clear userPlayingGameId if the game was NOT person-vs-ai
                // If it was person-vs-ai, the user should keep control for the new episode
                if (gameId === userPlayingGameId && !wasPersonVsAI) {
                    setUserPlayingGameId(null);
                }
            // If wasPersonVsAI is true, keep userPlayingGameId set so controls continue working
            }
        }["UnifiedTrainingView.useMultiGameLogic[gameLogic]"]
    });
    // Games are always active - no need to track isActive state
    // Run all game loops (only if training is active)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            if (!training.isTraining) {
                return;
            }
            const animationFrames = [];
            let lastFrameTime = performance.now();
            const gameLoop = {
                "UnifiedTrainingView.useEffect.gameLoop": async (currentTime)=>{
                    // Tick all games (all games are always active)
                    // Use for...of to support async/await
                    for (const instance of gameInstances){
                        const isAIVsAI = instance.gameType === 'ai-vs-ai';
                        const speedMultiplier = isAIVsAI ? AI_VS_AI_SPEED_MULTIPLIER : 1;
                        if (isAIVsAI && speedMultiplier > 1) {
                            // For AI vs AI games, run multiple ticks per frame
                            const elapsed = currentTime - lastFrameTime;
                            const targetFrameTime = 1000 / 72; // Target 72 FPS base
                            const ticksToRun = Math.max(1, Math.floor(elapsed / targetFrameTime * speedMultiplier));
                            for(let i = 0; i < ticksToRun; i++){
                                await gameLogic.gameTick({
                                    skipIntervalCheck: i > 0,
                                    gameId: instance.id
                                });
                            }
                        } else {
                            // Normal speed (one tick per frame)
                            await gameLogic.gameTick({
                                gameId: instance.id
                            });
                        }
                        // Update episode length reactively
                        if (instance.episodeStartTime) {
                            const elapsed = (Date.now() - instance.episodeStartTime) / 1000;
                            const newEpisodeLength = Math.floor(elapsed * 72);
                            if (instance.episodeLength !== newEpisodeLength) {
                                setGameInstances({
                                    "UnifiedTrainingView.useEffect.gameLoop": (prev)=>prev.map({
                                            "UnifiedTrainingView.useEffect.gameLoop": (gi)=>gi.id === instance.id ? {
                                                    ...gi,
                                                    episodeLength: newEpisodeLength
                                                } : gi
                                        }["UnifiedTrainingView.useEffect.gameLoop"])
                                }["UnifiedTrainingView.useEffect.gameLoop"]);
                            }
                        }
                    }
                    lastFrameTime = currentTime;
                    const frameId = requestAnimationFrame(gameLoop);
                    animationFrames.push(frameId);
                }
            }["UnifiedTrainingView.useEffect.gameLoop"];
            const frameId = requestAnimationFrame(gameLoop);
            animationFrames.push(frameId);
            return ({
                "UnifiedTrainingView.useEffect": ()=>{
                    animationFrames.forEach({
                        "UnifiedTrainingView.useEffect": (id)=>cancelAnimationFrame(id)
                    }["UnifiedTrainingView.useEffect"]);
                }
            })["UnifiedTrainingView.useEffect"];
        }
    }["UnifiedTrainingView.useEffect"], [
        training.isTraining,
        gameLogic,
        gameInstances
    ]);
    const loadSavedModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTrainingView.useCallback[loadSavedModels]": async ()=>{
            setIsLoadingModels(true);
            try {
                const models = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listSavedModels"])();
                setSavedModels(models);
                // Preserve selectedModel if it still exists in the new list
                if (selectedModelRef.current && !models.some({
                    "UnifiedTrainingView.useCallback[loadSavedModels]": (m)=>m.path === selectedModelRef.current
                }["UnifiedTrainingView.useCallback[loadSavedModels]"])) {
                // If selected model is no longer in the list, keep it selected anyway
                // (it might have been renamed or the list refresh happened before save completed)
                // Don't clear it - let the user decide
                }
            } catch (error) {
                console.error('Failed to load models:', error);
                // Check for Safari/IndexedDB issues
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                if (isSafari && typeof window.indexedDB === 'undefined') {
                    console.warn('Safari detected with IndexedDB unavailable. This may be due to Private Browsing mode.');
                }
            } finally{
                setIsLoadingModels(false);
            }
        }
    }["UnifiedTrainingView.useCallback[loadSavedModels]"], []);
    // Load saved models on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            loadSavedModels();
        }
    }["UnifiedTrainingView.useEffect"], [
        loadSavedModels
    ]);
    // Start training automatically on mount (only once when manager becomes available)
    // COMMENTED OUT: Frontend training disabled - using backend training service instead
    // const hasStartedTrainingRef = useRef(false);
    // useEffect(() => {
    //   if (!hasStartedTrainingRef.current && !training.isTraining && training.manager) {
    //     hasStartedTrainingRef.current = true;
    //     training.startTraining();
    //   }
    // }, [training.isTraining, training.manager]);
    // Refresh models when training saves
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTrainingView.useEffect": ()=>{
            if (training.stats && training.stats.episode > 0 && training.stats.episode % 100 === 0) {
                // Refresh model list when model is saved (every 100 games)
                // Preserve current selection using ref to avoid stale closure
                const currentSelection = selectedModelRef.current;
                loadSavedModels().then({
                    "UnifiedTrainingView.useEffect": ()=>{
                        // Restore selection if it still exists
                        if (currentSelection) {
                            setSelectedModel(currentSelection);
                            selectedModelRef.current = currentSelection;
                        }
                    }
                }["UnifiedTrainingView.useEffect"]);
            }
        }
    }["UnifiedTrainingView.useEffect"], [
        training.stats?.episode,
        loadSavedModels
    ]);
    const handleModelSelect = async (modelPath)=>{
        if (!modelPath) return;
        try {
            setSelectedModel(modelPath);
            selectedModelRef.current = modelPath;
            // Load the model
            const agent = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DQNAgent"]();
            await agent.load(modelPath);
            // Wrap in model interface
            const model = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TensorFlowJSModel"]({
                name: 'TankTroubleRL',
                type: 'discrete',
                observationSize: 142,
                actionSize: 14
            });
            // Extend model with agent-specific methods
            // Note: predict must be synchronous to match RLModel interface
            // The agent's async predict is used in training, not in game loop
            const extendedModel = {
                isLoaded: ()=>model.isLoaded(),
                load: (path)=>model.load(path),
                getInfo: ()=>model.getInfo(),
                agent,
                predict: (obs, angle)=>{
                    // Synchronous wrapper - actual async predictions happen in training
                    // For game loop compatibility, return default decision
                    // RL predictions are handled separately in training step
                    return {
                        angleDelta: 0,
                        moveDirection: 0,
                        shouldShoot: false
                    };
                }
            };
            // Set as active model for AI controller (for playing against AI)
            __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].setModel(extendedModel);
            // Always load the model into the training manager's agent
            // This allows training to continue from the selected model
            if (training.manager) {
                // Extract path without indexeddb:// prefix for loadModel (it adds the prefix)
                const cleanPath = modelPath.replace('indexeddb://', '');
                await training.manager.loadModel(cleanPath);
            }
            alert('Model loaded successfully! Training will continue from this model.');
        } catch (error) {
            console.error('Failed to load model:', error);
            // Check for Safari/IndexedDB specific issues
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const errorMessage = error instanceof Error ? error.message : String(error);
            let userMessage = 'Failed to load model.\n\n';
            if (isSafari) {
                userMessage += 'Safari detected. Common issues:\n';
                userMessage += '• Private Browsing mode disables IndexedDB - try regular browsing mode\n';
                userMessage += '• Safari may require user interaction before accessing IndexedDB\n';
                userMessage += '• Check Safari settings: Preferences > Privacy > uncheck "Prevent cross-site tracking"\n\n';
            }
            userMessage += `Error: ${errorMessage}\n\n`;
            userMessage += 'Check the browser console for more details.';
            alert(userMessage);
        }
    };
    // Calculate episode length on-demand (no polling)
    // Episode length is calculated from episodeStartTime when needed
    // This is done reactively in the game loop or when rendering
    // Calculate grid layout dynamically based on number of games
    // Aim for roughly square grid (e.g., 4 games = 2x2, 9 games = 3x3, 10 games = 4x3)
    const gridCols = Math.ceil(Math.sqrt(MAX_GAMES));
    const gridRows = Math.ceil(MAX_GAMES / gridCols);
    // Scale down to fit games in grid
    // Use 0.45 to ensure proper fit with padding
    const scale = 0.45;
    // Speed multiplier for AI vs AI games (3x faster for faster training)
    // Get model info
    const modelInfo = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].getModel().getInfo();
    const isRLActive = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].isRLActive();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white border border-gray-300 rounded shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-semibold whitespace-nowrap",
                                            children: "Select Model (Optional):"
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 726,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedModel,
                                            onChange: (e)=>handleModelSelect(e.target.value),
                                            className: "px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",
                                            style: {
                                                maxWidth: '200px'
                                            },
                                            disabled: isLoadingModels,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: isLoadingModels ? 'Loading models...' : '-- Select a model --'
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 17
                                                }, this),
                                                savedModels.length === 0 && !isLoadingModels && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    children: "No saved models found"
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 19
                                                }, this),
                                                savedModels.map((model)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: model.path,
                                                        children: [
                                                            model.createdAtString,
                                                            model.evalScore !== undefined ? ` (Eval: ${model.evalScore.toFixed(2)})` : ''
                                                        ]
                                                    }, model.path, true, {
                                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                        lineNumber: 739,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 727,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: loadSavedModels,
                                            style: {
                                                backgroundColor: '#e5e7eb'
                                            },
                                            className: "px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-200 disabled:opacity-50 text-sm font-medium whitespace-nowrap flex-shrink-0",
                                            disabled: isLoadingModels,
                                            children: isLoadingModels ? 'Loading...' : 'Refresh'
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 744,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: async ()=>{
                                                try {
                                                    setIsLoadingModels(true);
                                                    const response = await fetch('/api/backend/models/latest');
                                                    if (!response.ok) {
                                                        throw new Error(`Failed to fetch model: ${response.statusText}`);
                                                    }
                                                    const modelData = await response.json();
                                                    // Convert backend model format to TensorFlow.js format
                                                    // The backend returns { layers, metadata }
                                                    // We need to load this into the DQN agent
                                                    const agent = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DQNAgent"]();
                                                    // TODO: Convert backend model weights to TensorFlow.js format
                                                    // For now, we'll need to implement a conversion function
                                                    // This is a placeholder - full implementation would convert the weights
                                                    alert('Model fetched from backend! (Conversion to TensorFlow.js format pending)');
                                                // After conversion, load the model similar to handleModelSelect
                                                // await agent.load(convertedModelPath);
                                                // ... rest of loading logic
                                                } catch (error) {
                                                    console.error('Error fetching model from backend:', error);
                                                    alert(`Failed to fetch model from backend: ${error instanceof Error ? error.message : String(error)}`);
                                                } finally{
                                                    setIsLoadingModels(false);
                                                }
                                            },
                                            style: {
                                                backgroundColor: '#dbeafe'
                                            },
                                            className: "px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:bg-gray-200 disabled:opacity-50 text-sm font-medium whitespace-nowrap flex-shrink-0",
                                            disabled: isLoadingModels,
                                            children: isLoadingModels ? 'Loading...' : 'Fetch from Backend'
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 752,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 725,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-xs text-gray-500 italic",
                                    children: "Models are saved in your browser's local storage (Dexie DB). Maximum 8 models kept."
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 789,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 724,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white border border-gray-300 rounded shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: async ()=>{
                                                        try {
                                                            // Check if training manager is initialized
                                                            if (!training.manager) {
                                                                alert('Training manager not initialized. Please wait for initialization.');
                                                                return;
                                                            }
                                                            // Check if model can be saved
                                                            if (!training.canSaveModel()) {
                                                                const bufferSize = training.getReplayBufferSize();
                                                                const hasEpisodes = (training.stats?.episode ?? 0) > 0;
                                                                let message = 'Cannot save model yet. Requirements:\n';
                                                                if (bufferSize < 32) {
                                                                    message += `- Need at least 32 steps in replay buffer (current: ${bufferSize})\n`;
                                                                }
                                                                if (!hasEpisodes) {
                                                                    message += '- Need at least one completed episode\n';
                                                                }
                                                                if (bufferSize >= 32 && hasEpisodes) {
                                                                    message += '- Need to wait for training to occur (training happens every 4 steps when buffer has 32+ steps)\n';
                                                                }
                                                                alert(message);
                                                                return;
                                                            }
                                                            // Get model version from Game Status (vX where X = Math.floor(episode / activeGamesCount) + 1)
                                                            const episode = training.stats?.episode || 0;
                                                            const modelVersion = Math.floor(episode / activeGamesCount) + 1;
                                                            // Use ISO timestamp for model name
                                                            const timestamp = Date.now();
                                                            const isoString = new Date(timestamp).toISOString();
                                                            const modelPath = `indexeddb://tank-ai-${timestamp}`;
                                                            // Get eval score (average reward)
                                                            const evalScore = training.stats?.averageReward;
                                                            // COMMENTED OUT: Frontend training disabled - using backend training service instead
                                                            // await training.saveModel(modelPath, evalScore, isoString);
                                                            // // Wait a bit for IndexedDB to fully sync (TensorFlow.js save is async)
                                                            // await new Promise(resolve => setTimeout(resolve, 500));
                                                            // // Preserve current selection before refreshing
                                                            // const currentSelection = selectedModelRef.current;
                                                            // // Try loading models with retry logic in case of timing issues
                                                            // let models = await listSavedModels();
                                                            // let retries = 0;
                                                            // while (models.length === 0 && retries < 3) {
                                                            //   await new Promise(resolve => setTimeout(resolve, 500));
                                                            //   models = await listSavedModels();
                                                            //   retries++;
                                                            // }
                                                            // setSavedModels(models);
                                                            // // If we had a selection and it still exists, restore it
                                                            // // Otherwise, the newly saved model will be available but not auto-selected
                                                            // if (currentSelection && models.some(m => m.path === currentSelection)) {
                                                            //   setSelectedModel(currentSelection);
                                                            //   selectedModelRef.current = currentSelection;
                                                            // }
                                                            // if (models.some(m => m.path === modelPath)) {
                                                            //   alert(`Model v${modelVersion} saved successfully! It should now appear in the dropdown.`);
                                                            // } else {
                                                            //   console.warn('Model saved but not found in list. This may be a timing issue. Try refreshing the model list manually.');
                                                            //   alert(`Model v${modelVersion} saved, but it's not showing in the dropdown yet. Try clicking "Refresh" to reload the model list.`);
                                                            // }
                                                            alert('Frontend training is disabled. Models are saved automatically by the backend training service every 5 minutes.');
                                                        } catch (error) {
                                                            console.error('Error saving model:', error);
                                                            const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(error) ? error.message : String(error);
                                                            alert(`Failed to save model: ${errorMessage}\n\nCheck the browser console for details.`);
                                                        }
                                                    },
                                                    disabled: !training.manager || !training.canSaveModel(),
                                                    style: {
                                                        backgroundColor: !training.manager || !training.canSaveModel() ? '#d1d5db' : '#bfdbfe',
                                                        opacity: !training.manager || !training.canSaveModel() ? 0.6 : 1,
                                                        cursor: !training.manager || !training.canSaveModel() ? 'not-allowed' : 'pointer'
                                                    },
                                                    className: `px-4 py-2 rounded font-medium ${!training.manager || !training.canSaveModel() ? 'bg-gray-300 text-gray-500' : 'bg-blue-200 text-blue-700 hover:bg-blue-300'}`,
                                                    title: !training.manager || !training.canSaveModel() ? `Requirements: 32+ steps in replay buffer, at least 1 episode completed, and training must have occurred at least once` : 'Save current model (creates new model, does not overwrite)',
                                                    children: "Save Model"
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 799,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "headless-mode",
                                                            checked: isHeadlessMode,
                                                            onChange: (e)=>setIsHeadlessMode(e.target.checked),
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "headless-mode",
                                                            className: "text-sm font-medium cursor-pointer",
                                                            children: "Headless Training (8 games, auto-save every 5 min)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 906,
                                                            columnNumber: 19
                                                        }, this),
                                                        isHeadlessMode && autoSaveCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-600",
                                                            children: [
                                                                "(Auto-saved: ",
                                                                autoSaveCount,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 910,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 898,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 798,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `inline-block w-3 h-3 rounded-full ${training.isTraining ? 'bg-green-500' : 'bg-gray-400'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: training.isTraining ? 'Training Active' : 'Training Stopped'
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 920,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 918,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 796,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-xs text-gray-500 italic",
                                    children: "Saving a model requires: 32+ steps in replay buffer, at least 1 episode completed, and training must have occurred at least once"
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 923,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 795,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white border border-gray-300 rounded shadow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4",
                                style: {
                                    gridTemplateColumns: `repeat(${Math.min(activeGamesCount, 8)}, 1fr)`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-600",
                                                children: "Total Games"
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 932,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold",
                                                children: training.stats?.episode || 0
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 933,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                        lineNumber: 931,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-600",
                                                children: "AI vs AI"
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 936,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-blue-600",
                                                children: gameStats.aiVsAiGames
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 937,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                        lineNumber: 935,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-600",
                                                children: "Person vs AI"
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 940,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-green-600",
                                                children: gameStats.personVsAiGames
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 941,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                        lineNumber: 939,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-600",
                                                children: "Active Games"
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 944,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-purple-600",
                                                children: activeGamesCount
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 945,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                        lineNumber: 943,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                lineNumber: 930,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 929,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white border border-gray-300 rounded shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mb-2",
                                    children: "Model Summary"
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 954,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-4 text-sm mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Model Type: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 958,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: isRLActive ? 'RL (Trained)' : 'Rule-Based (Fallback)'
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 959,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 957,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 italic mt-0.5",
                                                    children: "Type of AI model being used"
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 961,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 956,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Action Space: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 965,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: modelInfo.type === 'discrete' ? 'Discrete (14 actions)' : 'Continuous'
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 966,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 italic mt-0.5",
                                                    children: "Number of possible actions the AI can take"
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 968,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 963,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Observation Size: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 972,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                modelInfo.observationSize,
                                                                " features"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 973,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 971,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 italic mt-0.5",
                                                    children: "Number of input features the AI observes"
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 975,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 970,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 955,
                                    columnNumber: 13
                                }, this),
                                training.stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsDebouncer, {
                                            stats: training.stats,
                                            onUpdate: handleDisplayStatsUpdate
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 981,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 pt-2 border-t border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-semibold mb-2 text-sm",
                                                    children: "Training Statistics"
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3 text-sm mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-600",
                                                                            children: "Games: "
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 990,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold",
                                                                            children: training.stats.episode
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 991,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 989,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500 italic mt-0.5",
                                                                    children: "Total games completed (auto-saves every 100 games). Each game = one complete game session."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 993,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 988,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-600",
                                                                            children: "Avg Reward: "
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 997,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold",
                                                                            children: (training.stats.averageReward ?? 0).toFixed(2)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 998,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 996,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500 italic mt-0.5",
                                                                    children: "Average reward per game"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 1000,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 995,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-600",
                                                                            children: "Epsilon: "
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 1004,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold",
                                                                            children: (training.stats.epsilon ?? 0).toFixed(3)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 1005,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 1003,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500 italic mt-0.5",
                                                                    children: "Exploration rate (higher = more random)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 1007,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 987,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 pt-2 border-t border-gray-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold mb-2 text-sm",
                                                            children: "Active Games Stats"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1012,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-3 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-gray-600",
                                                                                    children: "Reward: "
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                                    lineNumber: 1016,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold",
                                                                                    children: displayStats?.reward !== undefined ? displayStats.reward.toFixed(2) : training.stats?.episodeReward.toFixed(2) || '0.00'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                                    lineNumber: 1017,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 1015,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-500 italic mt-0.5",
                                                                            children: [
                                                                                "Total reward across all ",
                                                                                activeGamesCount,
                                                                                " active games (positive = good, negative = poor performance, but still valid training data)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 1023,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 1014,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-gray-600",
                                                                                    children: "Length: "
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                                    lineNumber: 1029,
                                                                                    columnNumber: 23
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold",
                                                                                    children: displayStats?.length !== undefined ? displayStats.length : training.stats?.episodeLength || 0
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                                    lineNumber: 1030,
                                                                                    columnNumber: 23
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 1028,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-500 italic mt-0.5",
                                                                            children: [
                                                                                "Total steps across all ",
                                                                                activeGamesCount,
                                                                                " active games (updates every 5 seconds)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                            lineNumber: 1036,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                                    lineNumber: 1027,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1013,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1011,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 985,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 953,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                    lineNumber: 722,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                lineNumber: 720,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-white border border-gray-300 rounded shadow",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold mb-3 text-lg",
                            children: "Game Status"
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 1055,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4",
                            style: {
                                gridTemplateColumns: `repeat(${MAX_GAMES}, 1fr)`
                            },
                            children: gameInstances.map((instance)=>{
                                const blueLives = instance.tanks[0]?.lives || 0;
                                const redLives = instance.tanks[1]?.lives || 0;
                                const isAIVsAI = instance.gameType === 'ai-vs-ai';
                                const isPersonVsAI = instance.gameType === 'person-vs-ai';
                                // Calculate active duration
                                // Show N/A if training hasn't started or game hasn't started yet
                                const hasStarted = training.isTraining && instance.episodeStartTime;
                                let durationSeconds = 0;
                                if (hasStarted) {
                                    durationSeconds = Math.floor((currentTime - instance.episodeStartTime) / 1000);
                                }
                                const formatDuration = (seconds)=>{
                                    const mins = Math.floor(seconds / 60);
                                    const secs = seconds % 60;
                                    return `${mins}:${secs.toString().padStart(2, '0')}`;
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-gray-200 rounded p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold text-sm",
                                                    children: [
                                                        "Game ",
                                                        instance.id + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-xs px-2 py-1 rounded ${isPersonVsAI ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`,
                                                    children: isPersonVsAI ? 'Person vs AI' : 'AI vs AI'
                                                }, void 0, false, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 1080,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Status:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1092,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `font-semibold ${training.isTraining ? 'text-green-600' : 'text-gray-400'}`,
                                                            children: training.isTraining ? 'Active' : 'Paused'
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1093,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1091,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Duration:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1098,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-semibold text-gray-700",
                                                            children: hasStarted ? formatDuration(durationSeconds) : 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1099,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1097,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-600",
                                                            children: "Blue Lives:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-semibold",
                                                            children: blueLives
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1105,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-600",
                                                            children: "Red Lives:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1108,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-semibold",
                                                            children: redLives
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1109,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 21
                                                }, this),
                                                training.stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Model:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1113,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-blue-600",
                                                            children: [
                                                                "v",
                                                                Math.floor((training.stats.episode || 0) / MAX_GAMES) + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1114,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 23
                                                }, this),
                                                instance.gameOverWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 pt-1 border-t border-gray-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Winner: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1119,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `font-semibold ${instance.gameOverWinner === 'blue' ? 'text-blue-600' : 'text-red-600'}`,
                                                            children: instance.gameOverWinner.toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                            lineNumber: 1120,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1118,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, instance.id, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 1079,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 1056,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                    lineNumber: 1054,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                lineNumber: 1053,
                columnNumber: 7
            }, this),
            !isHeadlessMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4",
                    style: {
                        gridTemplateColumns: `repeat(${gridCols}, 1fr)`
                    },
                    children: gameInstances.map((instance)=>{
                        const keysRef = getKeysRef(instance.id);
                        const isPersonGame = instance.gameType === 'person-vs-ai';
                        // Calculate scaled canvas size (internal resolution is 2x, then apply scale)
                        const scaledWidth = typedMapData.width * 2 * scale;
                        const scaledHeight = typedMapData.height * 2 * scale;
                        const isUserPlaying = userPlayingGameId === instance.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `border rounded p-2 bg-gray-50 relative flex flex-col items-center ${isUserPlaying ? 'border-blue-600 border-2' : 'border-gray-300'}`,
                            style: {
                                height: `${scaledHeight + 60}px`,
                                minHeight: `${scaledHeight + 60}px`,
                                maxHeight: `${scaledHeight + 60}px`,
                                overflow: 'hidden'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-1 w-full",
                                    style: {
                                        width: `${scaledWidth}px`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-gray-700",
                                                    children: [
                                                        "ID: ",
                                                        instance.id + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-medium",
                                                    children: [
                                                        "Game ",
                                                        instance.episodeNumber,
                                                        " / ",
                                                        (training.stats?.episode || 0) + MAX_GAMES
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                    lineNumber: 1170,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 21
                                        }, this),
                                        !isPersonGame && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    // Only allow joining if not already in a different game
                                                    if (userPlayingGameId === null || userPlayingGameId === instance.id) {
                                                        replaceWithPersonGame(instance.id);
                                                    }
                                                },
                                                className: `text-xs px-2 py-1 rounded font-medium transition-colors ${!training.isTraining || userPlayingGameId !== null && userPlayingGameId !== instance.id ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60' : 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'}`,
                                                disabled: !training.isTraining || userPlayingGameId !== null && userPlayingGameId !== instance.id,
                                                children: userPlayingGameId === instance.id ? 'You are playing' : 'Join Game'
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                                lineNumber: 1177,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 23
                                        }, this),
                                        isPersonGame && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>replaceWithAIGame(instance.id),
                                            className: "text-xs px-2 py-1 bg-orange-200 text-orange-700 rounded hover:bg-orange-300 font-medium",
                                            children: "Make AI vs AI"
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                            lineNumber: 1196,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 1164,
                                    columnNumber: 19
                                }, this),
                                !training.isTraining && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white text-sm",
                                        children: "Training paused"
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                        lineNumber: 1206,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 1205,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center overflow-hidden",
                                    style: {
                                        width: `${scaledWidth}px`,
                                        height: `${scaledHeight}px`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameCanvas"], {
                                        width: typedMapData.width,
                                        height: typedMapData.height,
                                        tanks: instance.tanks,
                                        bullets: instance.bullets,
                                        barriers: barriers,
                                        suns: suns,
                                        isPaused: !training.isTraining,
                                        tankImages: tankImages,
                                        gameOverWinner: instance.gameOverWinner,
                                        scale: scale
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                        lineNumber: 1217,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                                    lineNumber: 1210,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, instance.id, true, {
                            fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                            lineNumber: 1152,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                    lineNumber: 1136,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                lineNumber: 1135,
                columnNumber: 7
            }, this),
            isHeadlessMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full p-8 bg-gray-100 border border-gray-300 rounded text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-semibold text-gray-700 mb-2",
                        children: "Headless Training Mode Active"
                    }, void 0, false, {
                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                        lineNumber: 1238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600 mb-4",
                        children: [
                            "Running ",
                            activeGamesCount,
                            " games simultaneously (no rendering for better performance)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                        lineNumber: 1239,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600",
                        children: [
                            "Auto-save: ",
                            autoSaveCount > 0 ? `${autoSaveCount} model(s) saved` : 'Waiting for first save...'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                        lineNumber: 1242,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
                lineNumber: 1237,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx",
        lineNumber: 718,
        columnNumber: 5
    }, this);
}
_s1(UnifiedTrainingView, "wwayVzyWqDEOUWotcl63I65jIYY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$training$2d$hook$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRLTraining"],
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useTankImages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTankImages"],
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useGameInput$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameInput"],
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameLogic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMultiGameLogic"]
    ];
});
_c1 = UnifiedTrainingView;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatsDebouncer");
__turbopack_context__.k.register(_c1, "UnifiedTrainingView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayYourAI",
    ()=>PlayYourAI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$content$2f$games$2f$tank$2d$trouble$2d$map$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/shared/content/games/tank-trouble-map.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/type-guards.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useGameInput$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/hooks/useGameInput.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useTankImages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/hooks/useTankImages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameLogic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/components/GameLogic.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/components/GameCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/utils/spawn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-dqn-model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-observation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/ai-tank/rl-actions.ts [app-client] (ecmascript) <locals>");
// import { listSavedModels, type SavedModel } from '@/app/games/tank-trouble/ai-tank/rl-model-storage'; // Commented out - using Supabase instead
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Type guard for TankTroubleMapData
function isTankTroubleMapData(data) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObject"])(data)) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'width', __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'height', __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'barriers', (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArray"])(val)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'spawnPoints', (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArray"])(val)) && (!('suns' in data) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPropertyOfType"])(data, 'suns', (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArray"])(val)));
}
// Validate and construct map data without type assertions
function validateMapData(data) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAndValidate"])(data, isTankTroubleMapData, 'Invalid map data structure: missing or invalid required properties');
    return {
        width: parsed.width,
        height: parsed.height,
        barriers: parsed.barriers,
        spawnPoints: parsed.spawnPoints,
        suns: parsed.suns || []
    };
}
const mapData = validateMapData(__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$content$2f$games$2f$tank$2d$trouble$2d$map$2e$json__$28$json$29$__["default"]);
;
;
;
;
;
;
;
;
;
;
;
function PlayYourAI({ onBack }) {
    _s();
    const typedMapData = mapData;
    const barriers = typedMapData.barriers || [];
    const suns = []; // Suns removed from map - always use empty array
    const aiConfig = __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_AI_CONFIG"];
    // Model loading from Supabase
    const [isLoadingModel, setIsLoadingModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isModelLoaded, setIsModelLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modelError, setModelError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dqnAgent, setDqnAgent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Game state
    const [tanks, setTanks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PlayYourAI.useState": ()=>{
            const initialTanks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitialSpawnPositions"])(typedMapData, barriers, suns);
            return initialTanks;
        }
    }["PlayYourAI.useState"]);
    const [bullets, setBullets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lastShotTimes, setLastShotTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        blue: 0,
        red: 0
    });
    const [gameOverWinner, setGameOverWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Demonstration collection state
    const [demonstrationSteps, setDemonstrationSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Use refs to avoid dependency cycles in useEffect
    const previousObservationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const previousActionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Capture action that was actually taken
    const [isSavingDemonstrations, setIsSavingDemonstrations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [demonstrationSaveStatus, setDemonstrationSaveStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const tankImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useTankImages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTankImages"])();
    const gameInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useGameInput$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameInput"])({
        gameOver: gameOverWinner !== null
    });
    // Load latest model from Supabase
    // Note: This callback depends on dqnAgent, but we only load once on mount
    const loadLatestModelFromSupabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlayYourAI.useCallback[loadLatestModelFromSupabase]": async ()=>{
            setIsLoadingModel(true);
            setModelError(null);
            setIsModelLoaded(false);
            try {
                // Initialize DQN agent if not already done
                let agentToUse = dqnAgent;
                if (!agentToUse) {
                    const agent = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DQNAgent"](__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"]);
                    await agent.initialize();
                    setDqnAgent(agent);
                    agentToUse = agent;
                    // Set up model for game controller
                    const model = new __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TensorFlowJSModel"]({
                        name: 'TankTroubleRL',
                        type: 'discrete',
                        observationSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].observationSize,
                        actionSize: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].actionSize
                    });
                    const extendedModel = {
                        isLoaded: {
                            "PlayYourAI.useCallback[loadLatestModelFromSupabase]": ()=>{
                                // Agent is initialized after initialize() is called above
                                return true;
                            }
                        }["PlayYourAI.useCallback[loadLatestModelFromSupabase]"],
                        load: {
                            "PlayYourAI.useCallback[loadLatestModelFromSupabase]": async (path)=>{
                                // This is a placeholder - we load weights directly from Supabase
                                // The path parameter is not used when loading from Supabase
                                if (agentToUse) {
                                    await agentToUse.load(path);
                                }
                            }
                        }["PlayYourAI.useCallback[loadLatestModelFromSupabase]"],
                        getInfo: {
                            "PlayYourAI.useCallback[loadLatestModelFromSupabase]": ()=>model.getInfo()
                        }["PlayYourAI.useCallback[loadLatestModelFromSupabase]"],
                        agent: agentToUse,
                        predict: {
                            "PlayYourAI.useCallback[loadLatestModelFromSupabase]": async (obs, angle)=>{
                                // Now async! This allows us to properly call the agent's async predict method
                                if (!agentToUse) {
                                    console.warn('Agent not initialized, returning default decision');
                                    return {
                                        angleDelta: 0,
                                        moveDirection: 0,
                                        shouldShoot: false
                                    };
                                }
                                try {
                                    // Call the agent's async predict method
                                    const decision = await agentToUse.predict(obs, angle);
                                    return decision;
                                } catch (error) {
                                    console.error('Error in agent predict:', error);
                                    return {
                                        angleDelta: 0,
                                        moveDirection: 0,
                                        shouldShoot: false
                                    };
                                }
                            }
                        }["PlayYourAI.useCallback[loadLatestModelFromSupabase]"]
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rlModelManager"].setModel(extendedModel);
                }
                // Ensure we have an agent at this point
                if (!agentToUse) {
                    throw new Error('Failed to initialize DQN agent');
                }
                // Fetch latest model from API
                const response = await fetch('/api/backend/models/latest');
                if (!response.ok) {
                    const errorData = await response.json().catch({
                        "PlayYourAI.useCallback[loadLatestModelFromSupabase]": ()=>({
                                error: 'Unknown error'
                            })
                    }["PlayYourAI.useCallback[loadLatestModelFromSupabase]"]);
                    throw new Error(errorData.error || `Failed to fetch model: ${response.statusText}`);
                }
                const modelData = await response.json();
                // Log model data structure for debugging
                console.log('Model data received from Supabase:', {
                    layersCount: modelData.layers?.length || 0,
                    hasMetadata: !!modelData.metadata,
                    metadata: modelData.metadata
                });
                // Convert Supabase format to TensorFlow.js format
                // Supabase format: { layers: [{ weights: number[], biases: number[] }, ...], metadata: {...} }
                // We need: Array<{ weights: number[], biases: number[] }>
                const weightsData = modelData.layers.map({
                    "PlayYourAI.useCallback[loadLatestModelFromSupabase].weightsData": (layer, index)=>{
                        const weights = layer.weights || layer.Weights || [];
                        const biases = layer.biases || layer.Biases || [];
                        // Log layer info and verify non-zero values
                        const nonZeroWeights = weights.filter({
                            "PlayYourAI.useCallback[loadLatestModelFromSupabase].weightsData": (w)=>Math.abs(w) > 1e-10
                        }["PlayYourAI.useCallback[loadLatestModelFromSupabase].weightsData"]).length;
                        const nonZeroBiases = biases.filter({
                            "PlayYourAI.useCallback[loadLatestModelFromSupabase].weightsData": (b)=>Math.abs(b) > 1e-10
                        }["PlayYourAI.useCallback[loadLatestModelFromSupabase].weightsData"]).length;
                        const totalWeights = weights.length;
                        const totalBiases = biases.length;
                        const weightSample = weights.slice(0, 10); // First 10 weights
                        const biasSample = biases.slice(0, 5); // First 5 biases
                        console.log(`Layer ${index}:`, {
                            weightsCount: totalWeights,
                            biasesCount: totalBiases,
                            nonZeroWeights,
                            nonZeroBiases,
                            weightSample,
                            biasSample,
                            allZeros: nonZeroWeights === 0 && nonZeroBiases === 0
                        });
                        return {
                            weights,
                            biases
                        };
                    }
                }["PlayYourAI.useCallback[loadLatestModelFromSupabase].weightsData"]);
                // Load weights into the agent
                await agentToUse.loadWeightsFromJSON(weightsData);
                // Verify loaded weights by checking a sample prediction
                // Create a test observation with proper structure
                const testObs = {
                    vector: new Array(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].observationSize).fill(0.5),
                    size: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].observationSize
                };
                try {
                    const testAction = await agentToUse.selectAction(testObs, false);
                    console.log('Model verification - test action:', testAction, '(should be 0-', __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$dqn$2d$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DQN_CONFIG"].actionSize - 1, ')');
                    // Also test a full prediction
                    const testDecision = await agentToUse.predict(testObs, 0);
                    console.log('Model verification - test decision:', testDecision);
                } catch (err) {
                    console.error('Model verification failed:', err);
                }
                setIsModelLoaded(true);
                console.log('Successfully loaded latest model from Supabase', modelData.metadata);
            } catch (error) {
                console.error('Failed to load model from Supabase:', error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                setModelError(errorMessage);
                setIsModelLoaded(false);
            } finally{
                setIsLoadingModel(false);
            }
        }
    }["PlayYourAI.useCallback[loadLatestModelFromSupabase]"], [
        dqnAgent
    ]);
    // Auto-load latest model on mount (only once)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayYourAI.useEffect": ()=>{
            loadLatestModelFromSupabase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // Intentionally only run on mount - dqnAgent is initialized inside loadLatestModelFromSupabase
        }
    }["PlayYourAI.useEffect"], []); // Empty deps - only run once on mount
    // Save demonstrations to backend
    const saveDemonstrations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlayYourAI.useCallback[saveDemonstrations]": async ()=>{
            if (demonstrationSteps.length === 0) {
                return;
            }
            setIsSavingDemonstrations(true);
            setDemonstrationSaveStatus(null);
            try {
                // Generate unique game ID for this session
                const gameId = crypto.randomUUID();
                const response = await fetch('http://localhost:8080/api/demonstrations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        steps: demonstrationSteps,
                        isDefault: true,
                        metadata: {
                            gameId: gameId,
                            episodeLength: demonstrationSteps.length,
                            totalReward: 0,
                            timestamp: new Date().toISOString()
                        }
                    })
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to save: ${response.status} ${errorText}`);
                }
                const result = await response.json();
                setDemonstrationSaveStatus(`✅ Saved ${result.steps} demonstration steps`);
                // Clear demonstrations after successful save
                setDemonstrationSteps([]);
                previousObservationRef.current = null;
                previousActionRef.current = null;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                setDemonstrationSaveStatus(`❌ Failed to save: ${errorMessage}`);
                console.error('Failed to save demonstrations:', error);
            } finally{
                setIsSavingDemonstrations(false);
            }
        }
    }["PlayYourAI.useCallback[saveDemonstrations]"], [
        demonstrationSteps
    ]);
    // Reset game
    const resetGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlayYourAI.useCallback[resetGame]": ()=>{
            // Save demonstrations before resetting if game ended
            if (gameOverWinner !== null && demonstrationSteps.length > 0) {
                saveDemonstrations();
            }
            const initialTanks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$utils$2f$spawn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitialSpawnPositions"])(typedMapData, barriers, suns);
            setTanks(initialTanks);
            setBullets([]);
            setLastShotTimes({
                blue: 0,
                red: 0
            });
            setGameOverWinner(null);
            setIsPaused(false);
            // Reset demonstration state refs
            previousObservationRef.current = null;
            previousActionRef.current = null;
        // Don't reset demonstrationSteps here - let saveDemonstrations clear them
        }
    }["PlayYourAI.useCallback[resetGame]"], [
        typedMapData,
        barriers,
        suns,
        gameOverWinner,
        demonstrationSteps,
        saveDemonstrations
    ]);
    // Game logic instance
    const gameLogicInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayYourAI.useMemo[gameLogicInstance]": ()=>({
                id: 0,
                tanks,
                bullets,
                lastShotTimes,
                gameMode: 'person-vs-ai',
                gameId: 'play-ai-game',
                isPaused,
                speedMultiplier: 1,
                episodeStartTime: Date.now(),
                keysRef: gameInput.keysRef
            })
    }["PlayYourAI.useMemo[gameLogicInstance]"], [
        tanks,
        bullets,
        lastShotTimes,
        isPaused,
        gameInput.keysRef
    ]);
    // No timeout in PlayYourAI mode - games can run indefinitely since we're not training
    const maxEpisodeTimeMs = Number.MAX_SAFE_INTEGER;
    const gameLogic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameLogic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMultiGameLogic"])({
        mapData: typedMapData,
        barriers,
        suns,
        aiConfig,
        trainingManager: null,
        maxEpisodeTimeMs,
        gameInstances: [
            gameLogicInstance
        ],
        onTanksUpdate: {
            "PlayYourAI.useMultiGameLogic[gameLogic]": (gameId, updatedTanks)=>{
                setTanks(updatedTanks);
                // Check for game over
                if (updatedTanks[0]?.lives <= 0 || updatedTanks[1]?.lives <= 0) {
                    const winner = updatedTanks[0]?.lives <= 0 ? 'red' : 'blue';
                    setGameOverWinner(winner);
                }
            }
        }["PlayYourAI.useMultiGameLogic[gameLogic]"],
        onBulletsUpdate: {
            "PlayYourAI.useMultiGameLogic[gameLogic]": (gameId, updatedBullets)=>{
                setBullets(updatedBullets);
            }
        }["PlayYourAI.useMultiGameLogic[gameLogic]"],
        onLastShotTimesUpdate: {
            "PlayYourAI.useMultiGameLogic[gameLogic]": (gameId, times)=>{
                setLastShotTimes(times);
            }
        }["PlayYourAI.useMultiGameLogic[gameLogic]"],
        onGameOver: {
            "PlayYourAI.useMultiGameLogic[gameLogic]": (gameId, winner)=>{
                setGameOverWinner(winner);
            }
        }["PlayYourAI.useMultiGameLogic[gameLogic]"]
    });
    // Collect demonstration steps during gameplay
    // IMPORTANT: We need to capture the action that was actually taken, not current keyboard state
    // Flow: BEFORE tick -> capture state + action, AFTER tick -> capture nextState
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayYourAI.useEffect": ()=>{
            if (isPaused || !isModelLoaded || gameOverWinner !== null || tanks.length < 2) {
                return;
            }
            // Extract observation from blue tank's perspective (human player)
            const blueTank = tanks[0];
            const redTank = tanks[1];
            if (!blueTank || !redTank) {
                return;
            }
            // Create AIContext from blue tank's perspective
            const context = {
                aiTank: blueTank,
                enemyTank: redTank,
                bullets: bullets,
                barriers: barriers,
                suns: suns,
                mapWidth: typedMapData.width,
                mapHeight: typedMapData.height,
                tickTime: Date.now(),
                config: __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_AI_CONFIG"]
            };
            const currentObservation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$observation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractObservation"])(context);
            // If we have a previous observation AND previous action, we can create a step
            // This means an action was taken that transitioned from previousObservation to currentObservation
            const prevObs = previousObservationRef.current;
            const prevAction = previousActionRef.current;
            if (prevObs && prevAction !== null) {
                // Check if game ended (this tick)
                const done = blueTank.lives <= 0 || redTank.lives <= 0;
                // Create step with reward (0.1 for imitation learning - encourages following expert)
                // Note: We store observations (normalized feature vectors) which contain all game state information
                // State = observation before action was applied
                // Action = action that was actually applied (captured before previous tick)
                // NextState = observation after action was applied
                const step = {
                    state: prevObs.vector,
                    action: prevAction,
                    reward: 0.1,
                    nextState: currentObservation.vector,
                    done: done
                };
                setDemonstrationSteps({
                    "PlayYourAI.useEffect": (prev)=>[
                            ...prev,
                            step
                        ]
                }["PlayYourAI.useEffect"]);
            }
            // Capture the action that corresponds to current keyboard state
            // This action will be applied in the next game tick
            // Note: Since ticks are frequent (72 FPS = ~14ms) and keys don't change rapidly,
            // the action we capture here is very close to what was applied during the previous tick
            const nextAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$ai$2d$tank$2f$rl$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["keysToAction"])(gameInput.keysRef.current);
            // Update refs for next iteration (refs don't trigger re-renders)
            // previousObservation becomes the "state" for the next step
            // previousAction becomes the "action" that was applied (or will be applied)
            previousObservationRef.current = currentObservation;
            previousActionRef.current = nextAction;
        }
    }["PlayYourAI.useEffect"], [
        tanks,
        bullets,
        barriers,
        suns,
        gameInput.keysRef,
        isPaused,
        isModelLoaded,
        gameOverWinner,
        typedMapData
    ]);
    // Save demonstrations when game ends
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayYourAI.useEffect": ()=>{
            if (gameOverWinner !== null && demonstrationSteps.length > 0 && !isSavingDemonstrations) {
                saveDemonstrations();
            }
        }
    }["PlayYourAI.useEffect"], [
        gameOverWinner,
        demonstrationSteps.length,
        isSavingDemonstrations,
        saveDemonstrations
    ]);
    // Game loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayYourAI.useEffect": ()=>{
            if (isPaused || !isModelLoaded || gameOverWinner !== null) {
                return;
            }
            let lastTickTime = Date.now();
            const gameLoop = {
                "PlayYourAI.useEffect.gameLoop": async ()=>{
                    const now = Date.now();
                    if (now - lastTickTime >= __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICK_INTERVAL"]) {
                        await gameLogic.gameTick({
                            skipIntervalCheck: false
                        });
                        lastTickTime = now;
                    }
                    requestAnimationFrame(gameLoop);
                }
            }["PlayYourAI.useEffect.gameLoop"];
            const frameId = requestAnimationFrame(gameLoop);
            return ({
                "PlayYourAI.useEffect": ()=>cancelAnimationFrame(frameId)
            })["PlayYourAI.useEffect"];
        }
    }["PlayYourAI.useEffect"], [
        isPaused,
        isModelLoaded,
        gameOverWinner,
        gameLogic
    ]);
    // Handle pause
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayYourAI.useEffect": ()=>{
            const handleKeyPress = {
                "PlayYourAI.useEffect.handleKeyPress": (e)=>{
                    if (e.key === 'Escape') {
                        setIsPaused({
                            "PlayYourAI.useEffect.handleKeyPress": (prev)=>!prev
                        }["PlayYourAI.useEffect.handleKeyPress"]);
                    }
                }
            }["PlayYourAI.useEffect.handleKeyPress"];
            window.addEventListener('keydown', handleKeyPress);
            return ({
                "PlayYourAI.useEffect": ()=>window.removeEventListener('keydown', handleKeyPress)
            })["PlayYourAI.useEffect"];
        }
    }["PlayYourAI.useEffect"], []);
    const scale = 1.0; // Full size for play mode
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4 w-full p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Play Your AI"
                    }, void 0, false, {
                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300",
                        children: "Back to Training"
                    }, void 0, false, {
                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-semibold",
                                children: "AI Model:"
                            }, void 0, false, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 504,
                                columnNumber: 11
                            }, this),
                            isLoadingModel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: "Loading latest model from Supabase..."
                            }, void 0, false, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this) : isModelLoaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-green-600",
                                children: "✓ Latest model loaded from Supabase"
                            }, void 0, false, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 508,
                                columnNumber: 13
                            }, this) : modelError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-red-600",
                                        children: "✗ Failed to load model"
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: modelError
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: loadLatestModelFromSupabase,
                                        className: "mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600",
                                        children: "Retry"
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 510,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: "Ready to load"
                            }, void 0, false, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 521,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                        lineNumber: 503,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 pt-3 border-t border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold",
                                    children: "Demonstration Collection:"
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 528,
                                    columnNumber: 13
                                }, this),
                                demonstrationSteps.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-blue-600",
                                    children: [
                                        "📝 ",
                                        demonstrationSteps.length,
                                        " steps collected"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: "Not collecting"
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this),
                                isSavingDemonstrations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Saving..."
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 537,
                                    columnNumber: 15
                                }, this),
                                demonstrationSaveStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-sm ${demonstrationSaveStatus.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`,
                                    children: demonstrationSaveStatus
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 540,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 527,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600",
                                            children: "You (Blue): "
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                            lineNumber: 574,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-blue-600",
                                            children: [
                                                tanks[0]?.lives ?? 0,
                                                " lives"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                            lineNumber: 575,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 573,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600",
                                            children: "AI (Red): "
                                        }, void 0, false, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                            lineNumber: 578,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-red-600",
                                            children: [
                                                tanks[1]?.lives ?? 0,
                                                " lives"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                            lineNumber: 579,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                    lineNumber: 577,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 572,
                            columnNumber: 11
                        }, this),
                        isPaused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-lg font-semibold text-gray-600",
                            children: "PAUSED (Press ESC to resume)"
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 583,
                            columnNumber: 13
                        }, this),
                        gameOverWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-lg font-semibold",
                            children: gameOverWinner === 'blue' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-600",
                                children: "You Win!"
                            }, void 0, false, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 588,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-600",
                                children: "AI Wins!"
                            }, void 0, false, {
                                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                                lineNumber: 590,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 586,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                    lineNumber: 571,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                lineNumber: 570,
                columnNumber: 7
            }, this),
            isModelLoaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameCanvas"], {
                    width: typedMapData.width,
                    height: typedMapData.height,
                    tanks: tanks,
                    bullets: bullets,
                    barriers: barriers,
                    suns: suns,
                    isPaused: isPaused,
                    tankImages: tankImages,
                    gameOverWinner: gameOverWinner,
                    scale: scale
                }, void 0, false, {
                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                    lineNumber: 600,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                lineNumber: 599,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl p-8 bg-gray-100 border border-gray-300 rounded text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-lg text-gray-600",
                    children: isLoadingModel ? 'Loading model from Supabase...' : 'Waiting for AI model to load from Supabase'
                }, void 0, false, {
                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                    lineNumber: 615,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                lineNumber: 614,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold mb-2",
                            children: "Controls:"
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 624,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Player 1 (Blue - You): Arrow keys to move, Space to shoot"
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 625,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Press ESC to pause/resume"
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 626,
                            columnNumber: 11
                        }, this),
                        gameOverWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resetGame,
                            className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
                            children: "Play Again"
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                            lineNumber: 628,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                    lineNumber: 623,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx",
        lineNumber: 489,
        columnNumber: 5
    }, this);
}
_s(PlayYourAI, "s9rKq3zx/lQKpYZChZFDjV1ZD3Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useTankImages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTankImages"],
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$hooks$2f$useGameInput$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameInput"],
        __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$GameLogic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMultiGameLogic"]
    ];
});
_c = PlayYourAI;
var _c;
__turbopack_context__.k.register(_c, "PlayYourAI");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/tank-trouble/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TankTroublePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$UnifiedTrainingView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/components/UnifiedTrainingView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$PlayYourAI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/components/PlayYourAI.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TankTroublePage({ view, onViewChange }) {
    _s();
    // Memoize the onBack handler to prevent unnecessary re-renders
    const handleBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TankTroublePage.useCallback[handleBack]": ()=>{
            onViewChange('training');
        }
    }["TankTroublePage.useCallback[handleBack]"], [
        onViewChange
    ]);
    if (view === 'play') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$PlayYourAI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayYourAI"], {
            onBack: handleBack
        }, void 0, false, {
            fileName: "[project]/website/app/games/tank-trouble/page.tsx",
            lineNumber: 19,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$components$2f$UnifiedTrainingView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnifiedTrainingView"], {}, void 0, false, {
        fileName: "[project]/website/app/games/tank-trouble/page.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_s(TankTroublePage, "mjyQyoJOT82lYanmO05ylCKxreQ=");
_c = TankTroublePage;
var _c;
__turbopack_context__.k.register(_c, "TankTroublePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/website/app/games/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/components/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/games/tank-trouble/page.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GamesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [tankTroubleView, setTankTroubleView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('training');
    // Memoize the view change handler to ensure stable reference
    const handleViewChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamesPage.useCallback[handleViewChange]": (view)=>{
            setTankTroubleView(view);
        }
    }["GamesPage.useCallback[handleViewChange]"], []);
    // Memoize the play button handler
    const handlePlayClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamesPage.useCallback[handlePlayClick]": ()=>{
            setTankTroubleView('play');
        }
    }["GamesPage.useCallback[handlePlayClick]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamesPage.useEffect": ()=>{
            // Check if we're on mobile (width < 768px)
            const checkMobile = {
                "GamesPage.useEffect.checkMobile": ()=>{
                    if (window.innerWidth < 768) {
                        router.push('/');
                    }
                }
            }["GamesPage.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "GamesPage.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["GamesPage.useEffect"];
        }
    }["GamesPage.useEffect"], [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F7FAFC]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col md:flex-row pt-[60px] md:pt-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/website/app/games/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex-1 max-w-6xl mx-auto px-4 md:px-8 py-8 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "mb-8 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base text-[#4A5568]",
                                        children: "Nishant Iyengar"
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/page.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-[#718096] mt-1",
                                        children: "iyengar.nish@gmail.com"
                                    }, void 0, false, {
                                        fileName: "[project]/website/app/games/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/website/app/games/page.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/website/app/games/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-[#4A5568]",
                                    children: "Games"
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-semibold text-[#4A5568]",
                                                        children: "Tank Trouble"
                                                    }, void 0, false, {
                                                        fileName: "[project]/website/app/games/page.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 19
                                                    }, this),
                                                    tankTroubleView === 'training' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handlePlayClick,
                                                        className: "px-4 py-2 bg-green-200 text-white rounded hover:bg-green-300 font-medium shadow-lg",
                                                        children: "Play your AI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/website/app/games/page.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/website/app/games/page.tsx",
                                                lineNumber: 55,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$games$2f$tank$2d$trouble$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                view: tankTroubleView,
                                                onViewChange: handleViewChange
                                            }, void 0, false, {
                                                fileName: "[project]/website/app/games/page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/website/app/games/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/website/app/games/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/website/app/games/page.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/website/app/games/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/website/app/games/page.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/website/app/games/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(GamesPage, "QwzHBgDiKr/IQqNFK4PL1490ido=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GamesPage;
var _c;
__turbopack_context__.k.register(_c, "GamesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_78f16083._.js.map