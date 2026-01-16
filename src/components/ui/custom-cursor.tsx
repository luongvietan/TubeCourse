"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor implements the "Cursor 1" (ArrowPointer) effect.
 * It follows the mouse movement and rotates based on the direction of travel.
 */
export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for tracking motion state to avoid effect re-runs and state overhead
    const motionState = useRef({
        pointerX: 0,
        pointerY: 0,
        previousPointerX: 0,
        previousPointerY: 0,
        distanceX: 0,
        distanceY: 0,
        distance: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
    });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const cursorSize = 20;
        const degrees = 57.296;

        const rotate = () => {
            const m = motionState.current;
            let unsortedAngle = Math.atan(Math.abs(m.distanceY) / Math.abs(m.distanceX)) * degrees;
            m.previousAngle = m.angle;

            if (m.distanceX <= 0 && m.distanceY >= 0) {
                m.angle = 90 - unsortedAngle + 0;
            } else if (m.distanceX < 0 && m.distanceY < 0) {
                m.angle = unsortedAngle + 90;
            } else if (m.distanceX >= 0 && m.distanceY <= 0) {
                m.angle = 90 - unsortedAngle + 180;
            } else if (m.distanceX > 0 && m.distanceY > 0) {
                m.angle = unsortedAngle + 270;
            }

            if (isNaN(m.angle)) {
                m.angle = m.previousAngle;
            } else {
                if (m.angle - m.previousAngle <= -270) {
                    m.angleDisplace += 360 + m.angle - m.previousAngle;
                } else if (m.angle - m.previousAngle >= 270) {
                    m.angleDisplace += m.angle - m.previousAngle - 360;
                } else {
                    m.angleDisplace += m.angle - m.previousAngle;
                }
            }

            cursor.style.left = `${-cursorSize / 2}px`;
            cursor.style.top = `${0}px`;
            cursor.style.transform += ` rotate(${m.angleDisplace}deg)`;
        };

        const move = (x: number, y: number) => {
            const m = motionState.current;
            m.previousPointerX = m.pointerX;
            m.previousPointerY = m.pointerY;
            m.pointerX = x;
            m.pointerY = y;
            m.distanceX = m.previousPointerX - m.pointerX;
            m.distanceY = m.previousPointerY - m.pointerY;
            m.distance = Math.sqrt(m.distanceY ** 2 + m.distanceX ** 2);

            cursor.style.transform = `translate3d(${m.pointerX}px, ${m.pointerY}px, 0)`;

            if (m.distance > 1) {
                rotate();
            } else {
                cursor.style.transform += ` rotate(${m.angleDisplace}deg)`;
            }
        };

        const onMouseMove = (event: MouseEvent) => {
            move(event.clientX, event.clientY);
            setIsVisible(true);
        };

        const onTouchMove = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                move(event.touches[0].clientX, event.touches[0].clientY);
                setIsVisible(true);
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        // Hide initially until moved or after init delay
        const timeout = setTimeout(() => {
            // No automatic show, wait for interaction
        }, 500);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`curzr-arrow-pointer fixed pointer-events-none select-none z-[999999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                width: '20px',
                height: '20px',
                top: '0',
                left: '0',
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
                boxSizing: 'border-box',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full">
                <path
                    className="inner"
                    d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
                    fill="#F2F5F8"
                />
                <path
                    className="outer"
                    d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
                    fill="#111920"
                />
            </svg>
        </div>
    );
};
