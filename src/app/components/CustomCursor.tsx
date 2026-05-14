"use client"

import { useEffect, useRef } from "react"
import cursorStyles from "@/app/styles/Cursor.module.css"

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const update = () => {
            const x = Math.round(pos.current.x);
            const y = Math.round(pos.current.y);
            
            if (x !== lastPos.current.x || y !== lastPos.current.y) {
                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                    lastPos.current = { x, y };
                }
            }
            frameRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        frameRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return (
        <div 
            ref={cursorRef} 
            className={cursorStyles.customCursor} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                pointerEvents: 'none',
                willChange: 'transform' 
            }} 
        />
    );
}
