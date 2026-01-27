import React, { useEffect, useRef } from 'react';

const Background = ({ debugMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Configuration
        const isMobile = width < 768;
        const gridSize = isMobile ? 30 : 40; // Tighter grid for mobile
        const speed = isMobile ? 1.0 : 2; // Slower packets on mobile
        const packetChance = isMobile ? 0.08 : 0.15; // Fewer packets on mobile

        let packets = [];
        let spots = [];
        let scanX = 0;
        const scanSpeed = isMobile ? 1.5 : 3; // Slower scanning beam on mobile

        // Resize
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // Moving & Pulsating Electric Cyan Glow Spots (Standard Mode)
        class GlowSpot {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseRadius = Math.random() * 150 + 250;
                this.radius = this.baseRadius;
                this.vx = Math.random() * 0.15 - 0.075;
                this.vy = Math.random() * 0.15 - 0.075;
                this.baseOpacity = 0.07;
                this.opacity = this.baseOpacity;
                this.pulseAngle = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.02;
            }

            update() {
                if (debugMode) return;
                this.x += this.vx;
                this.y += this.vy;
                this.pulseAngle += this.pulseSpeed;
                const pulse = Math.sin(this.pulseAngle);
                this.opacity = this.baseOpacity + (pulse * 0.03);
                this.radius = this.baseRadius * (1 + pulse * 0.15);

                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
            }

            draw(context) {
                if (debugMode) return;
                const gradient = context.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, Math.max(1, this.radius)
                );
                gradient.addColorStop(0, `rgba(34, 211, 238, ${Math.max(0, this.opacity)})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                context.fillStyle = gradient;
                context.fillRect(0, 0, width, height);
            }
        }

        class Packet {
            constructor() {
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
                this.dir = Math.floor(Math.random() * 4);
                this.life = Math.random() * 100 + 50;
                this.color = Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6';
                this.history = [];
            }

            update() {
                this.life--;
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > 25) this.history.shift();

                if (this.dir === 0) this.x += speed;
                if (this.dir === 1) this.y += speed;
                if (this.dir === 2) this.x -= speed;
                if (this.dir === 3) this.y -= speed;

                if (this.x % gridSize === 0 && this.y % gridSize === 0) {
                    if (Math.random() > 0.5) {
                        const turn = Math.random() > 0.5 ? 1 : -1;
                        this.dir = (this.dir + turn + 4) % 4;
                    }
                }

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.life = 0;
                }
            }

            draw(ctx) {
                if (debugMode) return;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';

                ctx.beginPath();
                if (this.history.length > 0) {
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                }
                ctx.lineTo(this.x, this.y);
                ctx.stroke();

                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const drawGrid = () => {
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        };

        const drawDebugMode = () => {
            // 1. Dark Blueprint Base
            ctx.fillStyle = '#010409';
            ctx.fillRect(0, 0, width, height);

            // 2. Technical Grid with Measurement Ticks
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
            ctx.lineWidth = 1;

            for (let x = 0; x <= width; x += gridSize / 2) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, x % gridSize === 0 ? 10 : 5);
                ctx.stroke();
                if (x % gridSize === 0) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.globalAlpha = 0.1;
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }
            }
            for (let y = 0; y <= height; y += gridSize / 2) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(y % gridSize === 0 ? 10 : 5, y);
                ctx.stroke();
                if (y % gridSize === 0) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                    ctx.globalAlpha = 0.1;
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }
            }

            // 3. Moving Scanning Beam
            scanX = (scanX + scanSpeed) % width;
            const beamWidth = 150;
            const gradient = ctx.createLinearGradient(scanX - beamWidth, 0, scanX, 0);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.15)');
            ctx.fillStyle = gradient;
            ctx.fillRect(scanX - beamWidth, 0, beamWidth, height);

            ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
            ctx.beginPath();
            ctx.moveTo(scanX, 0);
            ctx.lineTo(scanX, height);
            ctx.stroke();

            // 4. Infrastructure Nodes (Packets) Visualization
            packets.forEach((p, idx) => {
                const distToBeam = Math.abs(p.x - scanX);
                const isActive = distToBeam < 100;
                const color = isActive ? '#10b981' : 'rgba(16, 185, 129, 0.3)';

                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.strokeRect(p.x - 3, p.y - 3, 6, 6);

                if (isActive) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.font = '9px "Fira Code", monospace';
                    ctx.fillStyle = color;
                    ctx.fillText(`ID: 0x${idx.toString(16).toUpperCase()}`, p.x + 15, p.y - 8);
                    ctx.fillText(`STATUS: ONLINE`, p.x + 15, p.y + 4);
                }
            });

            // 5. System Status HUD & Explanation
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 13px "Fira Code", monospace';
            ctx.fillText('>> SYSTEM_OBSERVABILITY_ACTIVE', 20, 40);

            ctx.font = '10px "Fira Code", monospace';
            ctx.globalAlpha = 0.8;
            ctx.fillText('ACCESSING_INFRASTRUCTURE_LAYER...', 20, 60);
            ctx.fillText('STATUS: VISUALIZING_LIVE_DATA_FLOW', 20, 75);

            // Explanatory Legend Box
            const boxWidth = 280;
            const boxHeight = 110;
            ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
            ctx.fillRect(20, 100, boxWidth, boxHeight);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.strokeRect(20, 100, boxWidth, boxHeight);

            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.fillText('PROD_ENGINEER_VIEW', 30, 120);

            ctx.font = '9px "Fira Code", monospace';
            ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
            const story = [
                'This mode reflects my engineering mindset.',
                'Behind every clean UI is a complex web',
                'of infrastructure, metrics, and data.',
                '',
                '• PACKETS: Representing live system events.',
                '• SCANNER: Real-time health & latency monitoring.'
            ];
            story.forEach((line, i) => ctx.fillText(line, 30, 135 + (i * 12)));
            ctx.globalAlpha = 1.0;

            // Dynamic Coordinates Tracking
            ctx.fillStyle = '#10b981';
            ctx.font = '11px "Fira Code", monospace';
            ctx.fillText(`TRACE_X: ${Math.floor(scanX).toString().padStart(4, '0')}`, width - 180, height - 30);
            ctx.fillText('DIAGNOSTICS: ACTIVE', width - 180, height - 15);

            // Technical crosshair center
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.beginPath();
            ctx.moveTo(width / 2 - 20, height / 2);
            ctx.lineTo(width / 2 + 20, height / 2);
            ctx.moveTo(width / 2, height / 2 - 20);
            ctx.lineTo(width / 2, height / 2 + 20);
            ctx.stroke();
        };

        const render = () => {
            if (canvas.width !== width || canvas.height !== height) resize();

            if (debugMode) {
                drawDebugMode();
                packets.forEach(p => p.update());
                packets = packets.filter(p => p.life > 0);
                if (Math.random() < packetChance) packets.push(new Packet());
            } else {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, width, height);
                spots.forEach(s => {
                    s.update();
                    s.draw(ctx);
                });
                drawGrid();
                packets.forEach(p => {
                    p.update();
                    p.draw(ctx);
                });
                packets = packets.filter(p => p.life > 0);
                if (Math.random() < packetChance) packets.push(new Packet());
            }

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();

        for (let i = 0; i < 40; i++) packets.push(new Packet());
        for (let i = 0; i < 5; i++) {
            const spot = new GlowSpot();
            if (i < 2) spot.x = Math.random() * (width / 3);
            else if (i < 3) spot.x = (width / 3) + Math.random() * (width / 3);
            else spot.x = (2 * width / 3) + Math.random() * (width / 3);
            spots.push(spot);
        }

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [debugMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none bg-black"
        />
    );
};

export default Background;
