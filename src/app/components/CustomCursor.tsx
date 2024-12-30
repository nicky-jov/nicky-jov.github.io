"use client"

import { Suspense, useCallback, useEffect, useRef } from "react"
import cursorStyles from "@/app/styles/Cursor.module.css"

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <Suspense fallback={<></>}>
            <div ref={cursorRef} className={cursorStyles.customCursor} />
        </Suspense>
    );
}