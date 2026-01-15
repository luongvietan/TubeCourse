"use client";
import React, { useRef, useEffect, useState } from 'react';

interface SquaresProps {
    direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
    speed?: number;
    borderColor?: string;
    squareSize?: number;
    hoverFillColor?: string;
    className?: string;
}

const Squares: React.FC<SquaresProps> = ({
    direction = 'right',
    speed = 1,
    borderColor = '#999',
    squareSize = 40,
    hoverFillColor = '#222',
    className
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const numSquaresX = useRef<number>(0);
    const numSquaresY = useRef<number>(0);
    const gridOffset = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const [hoveredSquare, setHoveredSquare] = useState<{ x: number, y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x / squareSize);
            const startY = Math.floor(gridOffset.current.y / squareSize);

            for (let x = startX; x < startX + numSquaresX.current; x++) {
                for (let y = startY; y < startY + numSquaresY.current; y++) {
                    const squareX = x * squareSize - (gridOffset.current.x % squareSize);
                    const squareY = y * squareSize - (gridOffset.current.y % squareSize);

                    if (hoveredSquare && Math.floor((x * squareSize) / squareSize) === hoveredSquare.x && Math.floor((y * squareSize) / squareSize) === hoveredSquare.y) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(squareX, squareY, squareSize, squareSize);
                    }

                    ctx.strokeStyle = borderColor;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(squareX, squareY, squareSize, squareSize);
                }
            }
        };

        const updateAnimation = () => {
            const effectiveSpeed = Math.max(speed, 0.1);
            switch (direction) {
                case 'right':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed) % squareSize;
                    break;
                case 'left':
                    gridOffset.current.x = (gridOffset.current.x + effectiveSpeed) % squareSize;
                    break;
                case 'down':
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed) % squareSize;
                    break;
                case 'up':
                    gridOffset.current.y = (gridOffset.current.y + effectiveSpeed) % squareSize;
                    break;
                case 'diagonal':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed) % squareSize;
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed) % squareSize;
                    break;
                default:
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed) % squareSize;
            }

            draw();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        // Track mouse hover
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Calculate grid coordinates adjusted for offset
            const hoveredX = Math.floor((mouseX + (gridOffset.current.x % squareSize)) / squareSize);
            const hoveredY = Math.floor((mouseY + (gridOffset.current.y % squareSize)) / squareSize);

            setHoveredSquare({ x: Math.floor((mouseX + gridOffset.current.x) / squareSize), y: Math.floor((mouseY + gridOffset.current.y) / squareSize) });
        };

        // Simplified hover logic for animation
        const handleMouseMoveSimple = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // We need to account for the moving offset to find the "static" grid index if we wanted consistent highlighting
            // But for a visual effect, highlighting the square under the cursor relative to the screen is fine.
            // Actually, let's just highlight based on screen coordinates snapped to grid.

            const x = Math.floor(mouseX / squareSize);
            const y = Math.floor(mouseY / squareSize);
            // setHoveredSquare({ x, y }); // This doesn't quite work with moving grid
        }

        // canvas.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            // canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [direction, speed, borderColor, hoverFillColor, hoveredSquare, squareSize]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full border-none block ${className}`}
        />
    );
};

export default Squares;
