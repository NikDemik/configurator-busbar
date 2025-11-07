import { useEffect, useRef } from 'react';

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
}

export function MetaballGradient() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Белый цвет для всех шариков
        const color = '#ffffff';
        const balls: Ball[] = Array.from({ length: 4 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1, // медленнее
            vy: (Math.random() - 0.5) * 1, // медленнее
            r: 400 + Math.random() * 100, // больше и с разницей
            color,
        }));

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Заливка фона черным
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'lighter';

            balls.forEach((ball) => {
                // Обновляем позицию
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Отскок от границ
                if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.vx *= -1;
                if (ball.y < ball.r || ball.y > canvas.height - ball.r) ball.vy *= -1;

                // Радиальный градиент
                const gradient = ctx.createRadialGradient(
                    ball.x,
                    ball.y,
                    0,
                    ball.x,
                    ball.y,
                    ball.r,
                );
                gradient.addColorStop(0, 'rgba(255,128,178,100)');
                // gradient.addColorStop(0.5, 'rgba(179,39,193,80)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Размытие для эффекта слипания (метаболл)
            ctx.filter = 'blur(40px)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
}
