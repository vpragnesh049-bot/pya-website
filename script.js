document.addEventListener('DOMContentLoaded', () => {

    /* --- Flower Rain Animation --- */
    function startFlowerRain() {
        const flowerContainer = document.createElement('div');
        flowerContainer.id = 'flower-container';
        document.body.appendChild(flowerContainer);

        const flowers = ['🌸', '🌼', '🌺', '🏵️', '🌻', '🌹', '🪷'];
        const duration = 6000; // Generate flowers for 6 seconds
        const spawnInterval = 100; // Every 100ms

        const interval = setInterval(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

            // Randomize spawn position, size, and fall duration
            const startPos = Math.random() * 100; // 0 to 100 vw
            const size = Math.random() * 1.5 + 0.8; // 0.8rem to 2.3rem
            const fallDuration = Math.random() * 3 + 4; // 4s to 7s

            flower.style.left = startPos + 'vw';
            flower.style.fontSize = size + 'rem';
            flower.style.animationDuration = fallDuration + 's';

            flowerContainer.appendChild(flower);

            // Clean up individual flower after it finishes falling
            setTimeout(() => {
                flower.remove();
            }, fallDuration * 1000);

        }, spawnInterval);

        // Stop generating flowers after `duration` 
        setTimeout(() => {
            clearInterval(interval);
            // Wait for the absolute last flowers to hit the ground then remove container
            setTimeout(() => {
                flowerContainer.remove();
            }, 8000);
        }, duration);
    }

    // Trigger on page load
    startFlowerRain();

    /* --- Navigation Setup --- */
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navBottomRow = document.querySelector('.nav-bottom-row');

    // Sticky Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        navBottomRow.classList.toggle('active');
    });

    // Close mobile menu on click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navBottomRow.classList.remove('active');
        });
    });

    /* --- Countdown Timer Setup --- */
    // Set for Ganesh Chaturthi (Example: September 6, 2026)
    const festivalDate = new Date('September 6, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = festivalDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<h4>The Festival Has Begun!</h4>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* --- Daily Programs Setup --- */
    const scheduleData = [
        { day: 1, title: 'Prathama Pooja & Sthapana', date: 'Sept 14, 2026', events: ['9:30 AM - Idol Installation', '10:00 AM - Prathama Pooja', '8:00 PM - Maha Aarti', 'Followed by Prasad Distribution'] },
        { day: 2, title: 'Dwitiya', date: 'Sept 15, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 3, title: 'Tritiya', date: 'Sept 16, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 4, title: 'Chaturthi', date: 'Sept 17, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 5, title: 'Panchami', date: 'Sept 18, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 6, title: 'Shashthi', date: 'Sept 19, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 7, title: 'Saptami', date: 'Sept 20, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 8, title: 'Ashtami', date: 'Sept 21, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 9, title: 'Navami', date: 'Sept 22, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti'] },
        { day: 10, title: 'Dashami', date: 'Sept 23, 2026', events: ['7:00 PM - Evening Pooja', 'Followed by Prasad Distribution', '8:30 PM - Maha Aarti', '9:30 PM - Udvasana Rituals'] },
        { day: 11, title: 'Ekadashi & Visarjan', date: 'Sept 24, 2026', events: ['9:00 AM - The Tradition of Auctioning PYA Ganesh Laddu', '10:30 AM - Visarjan Yatra Begins', 'Prasad Distribution all day'] }
    ];

    const scheduleContainer = document.getElementById('schedule-container');
    const todayStr = 'Sept 14, 2026'; // Mocking "today" for demonstration

    scheduleData.forEach(dayInfo => {
        const isToday = dayInfo.date === todayStr;
        const card = document.createElement('div');
        card.className = `day-card ${isToday ? 'today' : ''}`;

        let eventsHtml = dayInfo.events.map(ev => `<li>${ev}</li>`).join('');

        card.innerHTML = `
            <div class="day-header">
                <h3 class="day-title">Day ${dayInfo.day} - ${dayInfo.title}</h3>
                <div class="day-date">${dayInfo.date} ${isToday ? '<span style="color:var(--accent);font-weight:bold;margin-left:10px;">(Today)</span>' : ''}</div>
            </div>
            <ul class="day-events">
                ${eventsHtml}
            </ul>
        `;
        scheduleContainer.appendChild(card);
    });

    /* --- Gallery Lightbox --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentAlbum = [];
    let currentIndex = 0;

    function showLightboxImage(index) {
        if (!currentAlbum || currentAlbum.length === 0) return;
        currentIndex = index;
        const src = currentAlbum[currentIndex];

        if (src.toLowerCase().endsWith('.heic') && typeof heic2any !== 'undefined') {
            lightboxImg.style.visibility = 'hidden';
            fetch(src)
                .then(res => res.blob())
                .then(blob => heic2any({ blob, toType: "image/jpeg" }))
                .then(conversionResult => {
                    const url = URL.createObjectURL(Array.isArray(conversionResult) ? conversionResult[0] : conversionResult);
                    lightboxImg.src = url;
                    lightboxImg.style.visibility = 'visible';
                })
                .catch(e => {
                    console.error("HEIC conversion failed:", e);
                    lightboxImg.src = src; // fallback
                    lightboxImg.style.visibility = 'visible';
                });
        } else {
            lightboxImg.src = src;
            lightboxImg.style.visibility = 'visible';
        }

        if (currentAlbum.length > 1) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const albumData = item.getAttribute('data-album');
            const singleSrc = item.getAttribute('data-src');

            if (albumData) {
                try {
                    currentAlbum = JSON.parse(albumData);
                } catch (e) {
                    currentAlbum = [singleSrc || item.querySelector('img').src];
                }
            } else if (singleSrc) {
                currentAlbum = [singleSrc];
            } else {
                currentAlbum = [item.querySelector('img').src];
            }

            showLightboxImage(0);
            lightbox.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        currentAlbum = [];
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            currentAlbum = [];
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentAlbum.length > 1) {
            const newIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
            showLightboxImage(newIndex);
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentAlbum.length > 1) {
            const newIndex = (currentIndex + 1) % currentAlbum.length;
            showLightboxImage(newIndex);
        }
    });

    /* --- Fun Mode Game Overlay Logic: Mushika & The Golden Laddus --- */
    const funModeBtn = document.getElementById('fun-mode-btn');
    const resetModeBtn = document.getElementById('reset-mode-btn');
    const gravityContainer = document.getElementById('gravity-container');
    const gameCanvas = document.getElementById('game-canvas');
    const startGameBtn = document.getElementById('start-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const exitGameBtn = document.getElementById('exit-game-btn');
    const exitGameOverBtn = document.getElementById('exit-game-over-btn');
    const gameStartModal = document.getElementById('game-start-modal');
    const gameOverModal = document.getElementById('game-over-modal');
    const gameHud = document.querySelector('.game-hud');
    const gameScoreLabel = document.getElementById('game-score');
    const gameTimerLabel = document.getElementById('game-timer');

    let ctx = gameCanvas.getContext('2d');
    let isGameRunning = false;
    let isGravityActive = false;
    let animationFrameId;
    let timerInterval;

    // Game variables
    let score = 0;
    let timeLeft = 120; // 2 minutes (120 seconds)
    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight - 80;
    let targetX = window.innerWidth / 2;
    let items = [];
    let particles = [];
    let popups = [];
    let nextSpawnTime = 0;
    let baseSpawnInterval = 1000; // ms
    let lastTime = 0;
    let gameSpeedMultiplier = 1.0;

    // Handle Resize
    function resizeCanvas() {
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;
        playerY = window.innerHeight - 80;
    }
    window.addEventListener('resize', resizeCanvas);

    funModeBtn.addEventListener('click', () => {
        if (isGravityActive) return;
        initGameOverlay();
    });

    exitGameBtn.addEventListener('click', () => {
        closeGameOverlay();
    });

    exitGameOverBtn.addEventListener('click', () => {
        closeGameOverlay();
    });

    resetModeBtn.addEventListener('click', () => {
        closeGameOverlay();
    });

    startGameBtn.addEventListener('click', () => {
        startGame();
    });

    restartGameBtn.addEventListener('click', () => {
        startGame();
    });

    // Control listeners
    window.addEventListener('mousemove', (e) => {
        if (!isGameRunning) return;
        targetX = e.clientX;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isGameRunning) return;
        if (e.touches && e.touches.length > 0) {
            targetX = e.touches[0].clientX;
        }
    }, { passive: true });

    function initGameOverlay() {
        isGravityActive = true;
        document.body.classList.add('gravity-active');
        funModeBtn.classList.add('hidden');
        resetModeBtn.classList.remove('hidden');
        window.scrollTo(0, 0);

        gameStartModal.classList.remove('hidden');
        gameOverModal.classList.add('hidden');
        gameHud.classList.add('hidden');
        resizeCanvas();
    }

    function closeGameOverlay() {
        isGravityActive = false;
        isGameRunning = false;
        document.body.classList.remove('gravity-active');
        funModeBtn.classList.remove('hidden');
        resetModeBtn.classList.add('hidden');

        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (timerInterval) clearInterval(timerInterval);

        gameStartModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        gameHud.classList.add('hidden');
    }

    function startGame() {
        // Reset state
        score = 0;
        timeLeft = 120;
        items = [];
        particles = [];
        popups = [];
        playerX = window.innerWidth / 2;
        targetX = window.innerWidth / 2;
        gameSpeedMultiplier = 1.0;
        
        // Update HUD
        updateHUD();

        // Modals
        gameStartModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        gameHud.classList.remove('hidden');

        isGameRunning = true;
        lastTime = performance.now();
        nextSpawnTime = lastTime + 500; // spawn first laddu in 500ms

        // Start Timer
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(decrementTimer, 1000);

        // Start Game loop
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function decrementTimer() {
        if (!isGameRunning) return;
        timeLeft--;
        updateHUD();

        if (timeLeft <= 0) {
            endGame();
        }
    }

    function updateHUD() {
        gameScoreLabel.innerText = score;
        
        // Timer formatting (MM:SS)
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        gameTimerLabel.innerText = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    }

    function endGame() {
        isGameRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (timerInterval) clearInterval(timerInterval);

        // Game over modals
        gameHud.classList.add('hidden');
        gameOverModal.classList.remove('hidden');

        // Custom Game-over Messages
        const titleEl = gameOverModal.querySelector('h2');
        const textEl = gameOverModal.querySelector('p');
        titleEl.innerText = "Time's Up!";
        textEl.innerHTML = `Mushika ate plenty of sweets! You collected: <strong id="final-score">${score}</strong> laddus.`;
    }

    // Spawning items
    function spawnReward() {
        const rand = Math.random();
        let type = 'normal';
        let radius = 18;
        
        if (rand < 0.15) {
            type = 'golden'; // 15% super laddu
            radius = 14;
        } else if (rand < 0.30) {
            type = 'bomb'; // 15% obstacle bomb
            radius = 20;
        }

        const x = Math.random() * (window.innerWidth - 65) + 32;
        const y = -30;
        // speed range
        let baseSpeed = 3.5 + Math.random() * 2.5; // 3.5 to 6 px/frame base
        if (type === 'golden') baseSpeed += 2; // Golden falls faster
        if (type === 'bomb') baseSpeed += 0.5;

        items.push({
            x: x,
            y: y,
            radius: radius,
            type: type,
            vy: baseSpeed * gameSpeedMultiplier,
            angle: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 0.05
        });
    }

    // Game loop
    function gameLoop(timestamp) {
        if (!isGameRunning) return;

        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Dynamic difficulty speedup over time
        gameSpeedMultiplier = 1.0 + (120 - timeLeft) * 0.007; // Speed scales up with remaining time

        // Clears
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Handle Spawning
        if (timestamp >= nextSpawnTime) {
            spawnReward();
            // Scaling spawn frequency
            const dynamicInterval = Math.max(350, baseSpawnInterval - (120 - timeLeft) * 5);
            nextSpawnTime = timestamp + dynamicInterval;
        }

        // Draw Player (Mushika)
        updatePlayerPos();
        drawMushika(ctx, playerX, playerY);

        // Update & Draw Items
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            item.y += item.vy;
            item.angle += item.spin;

            // Render it
            if (item.type === 'bomb') {
                drawBomb(ctx, item.x, item.y, item.radius, item.angle);
            } else if (item.type === 'golden') {
                drawLaddu(ctx, item.x, item.y, item.radius, true, timestamp);
            } else {
                drawLaddu(ctx, item.x, item.y, item.radius, false, timestamp);
            }

            // Collisions Check
            const platterWidth = 90;
            const platterHeight = 15;
            // Does it intersect with the platter boundaries?
            // Player y represents raw plate top. Platter height is 15px down.
            if (item.y + item.radius >= playerY && item.y - item.radius <= playerY + platterHeight) {
                if (item.x + item.radius >= playerX - platterWidth/2 && item.x - item.radius <= playerX + platterWidth/2) {
                    // CATCH!
                    if (item.type === 'bomb') {
                        score = Math.max(0, score - 2); // Penalize score, but don't let it drop below 0
                        createExplosion(item.x, item.y, '#e63946', 20);
                        createPopup(item.x, item.y - 15, '-2 Laddus 💥', '#ff4d4d');
                        triggerScreenShake();
                    } else if (item.type === 'golden') {
                        score += 3;
                        createExplosion(item.x, item.y, '#ffd700', 15);
                        createPopup(item.x, item.y - 15, '+3 Golden! ✨', '#ffd700');
                    } else {
                        score += 1;
                        createExplosion(item.x, item.y, '#ff9933', 10);
                        createPopup(item.x, item.y - 15, '+1', '#ff9933');
                    }

                    updateHUD();
                    items.splice(i, 1);
                    continue;
                }
            }

            // Boundary Bottom check
            if (item.y - item.radius > window.innerHeight) {
                if (item.type !== 'bomb') {
                    // Visual splash on missing laddu, no penalty
                    createExplosion(item.x, window.innerHeight - 10, 'rgba(255, 153, 51, 0.4)', 5);
                }
                items.splice(i, 1);
            }
        }

        // Draw and update particles
        updateAndDrawParticles(ctx);

        // Draw and update floating popups
        updateAndDrawPopups(ctx);

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function updatePlayerPos() {
        // Smoothly interpolate player position towards mouse pointer coordinate
        const ease = 0.22;
        playerX += (targetX - playerX) * ease;

        // Keep inside bounds
        const halfWidth = 45;
        if (playerX < halfWidth) playerX = halfWidth;
        if (playerX > window.innerWidth - halfWidth) playerX = window.innerWidth - halfWidth;
    }

    function triggerScreenShake() {
        gameCanvas.classList.add('game-shake-active');
        setTimeout(() => {
            gameCanvas.classList.remove('game-shake-active');
        }, 300);
    }

    // DRAWING UTIL: Mushika & Platter
    function drawMushika(ctx, x, y) {
        // y is the top level of the platter
        const platterW = 90;
        const platterH = 12;

        // Draw Ganesha's Platter/Bowl (holding laddus)
        let platterGrad = ctx.createLinearGradient(x - platterW/2, y, x + platterW/2, y + platterH);
        platterGrad.addColorStop(0, '#cca300'); // Shadow gold
        platterGrad.addColorStop(0.3, '#ffd700'); // Shiny gold
        platterGrad.addColorStop(0.7, '#ffe680'); // Bright gold
        platterGrad.addColorStop(1, '#cca300');

        ctx.fillStyle = platterGrad;
        ctx.beginPath();
        // Drawing an elliptic platter
        ctx.ellipse(x, y + platterH/2, platterW/2, platterH/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e68a00';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw platter rim design (little red dots representing kumkum/turmeric borders)
        ctx.fillStyle = '#ff3300';
        for (let offset = -platterW/2 + 10; offset <= platterW/2 - 10; offset += 15) {
            ctx.beginPath();
            ctx.arc(x + offset, y + platterH/2, 2.5, 0, Math.PI*2);
            ctx.fill();
        }

        // DRAW MUSHIKA BODY (below platter)
        const my = y + platterH + 5; // offset downwards
        ctx.fillStyle = '#808080'; // grey mouse

        // Body Oval
        ctx.beginPath();
        ctx.ellipse(x, my + 30, 22, 16, 0, 0, Math.PI*2);
        ctx.fill();

        // Head Circle/Oval
        ctx.beginPath();
        ctx.ellipse(x, my + 13, 14, 11, 0, 0, Math.PI*2);
        ctx.fill();

        // Ears (Outer Grey, Inner Pink)
        // Left Ear
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        ctx.arc(x - 12, my + 4, 7, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#ffb3d9';
        ctx.beginPath();
        ctx.arc(x - 12, my + 4, 4, 0, Math.PI*2);
        ctx.fill();

        // Right Ear
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        ctx.arc(x + 12, my + 4, 7, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#ffb3d9';
        ctx.beginPath();
        ctx.arc(x + 12, my + 4, 4, 0, Math.PI*2);
        ctx.fill();

        // Eyes (Cute Black beads)
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(x - 5, my + 10, 2, 0, Math.PI*2);
        ctx.arc(x + 5, my + 10, 2, 0, Math.PI*2);
        ctx.fill();

        // Nose (Cute Pink dot)
        ctx.fillStyle = '#ff66b3';
        ctx.beginPath();
        ctx.arc(x, my + 17, 3, 0, Math.PI*2);
        ctx.fill();

        // Whiskers (Thin grey lines)
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        // Left whiskers
        ctx.beginPath();
        ctx.moveTo(x - 4, my + 14); ctx.lineTo(x - 22, my + 11);
        ctx.moveTo(x - 4, my + 14); ctx.lineTo(x - 24, my + 15);
        ctx.moveTo(x - 4, my + 14); ctx.lineTo(x - 21, my + 19);
        // Right whiskers
        ctx.moveTo(x + 4, my + 14); ctx.lineTo(x + 22, my + 11);
        ctx.moveTo(x + 4, my + 14); ctx.lineTo(x + 24, my + 15);
        ctx.moveTo(x + 4, my + 14); ctx.lineTo(x + 21, my + 19);
        ctx.stroke();

        // Little pink nose whiskers
        ctx.strokeStyle = '#ff66b3';
        ctx.beginPath();
        ctx.moveTo(x, my + 18);
        ctx.lineTo(x, my + 23);
        ctx.stroke();
    }

    // DRAWING UTIL: Laddus
    function drawLaddu(ctx, x, y, radius, isGolden, timestamp) {
        // Main sphere gradient
        let grad = ctx.createRadialGradient(x - radius/3, y - radius/3, radius/10, x, y, radius);
        
        if (isGolden) {
            // Shiny neon gold
            grad.addColorStop(0, '#ffffff'); // bright halo
            grad.addColorStop(0.3, '#fff280');
            grad.addColorStop(0.7, '#e6b800');
            grad.addColorStop(1, '#806600');
        } else {
            // Traditional Saffron-Yellow Laddu
            grad.addColorStop(0, '#ffeb99'); // top left highlight
            grad.addColorStop(0.4, '#ff9900'); // orange boondi base
            grad.addColorStop(1, '#b34700'); // deep shadow
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Boondi dot texture overlay
        ctx.fillStyle = isGolden ? '#ffe53b' : '#ffcf40';
        for (let i = 0; i < 6; i++) {
            // Seeded dot generation using coordinate mathematical functions (for stability)
            let angle = (i * 1.04) + (isGolden ? 0.3 : 0); // disperse evenly
            let dist = (0.2 + (i % 3) * 0.2) * radius;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, radius * 0.14, 0, Math.PI*2);
            ctx.fill();
        }

        // Add a sliver of pistachio (green) or saffron strand (red) on top
        ctx.fillStyle = isGolden ? '#ffffff' : '#39e639';
        ctx.beginPath();
        ctx.ellipse(x - 2, y - radius/3, radius*0.25, radius*0.08, Math.PI/4, 0, Math.PI*2);
        ctx.fill();

        ctx.fillStyle = '#cc2900'; // red saffron thread
        ctx.beginPath();
        ctx.ellipse(x + 3, y - radius/4, radius*0.28, radius*0.06, -Math.PI/6, 0, Math.PI*2);
        ctx.fill();

        // Shimmer aura for Golden Laddu
        if (isGolden) {
            ctx.strokeStyle = `rgba(255, 235, 128, ${0.4 + Math.sin(timestamp * 0.015) * 0.22})`;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(x, y, radius + 5, 0, Math.PI*2);
            ctx.stroke();

            // sparkling points
            ctx.fillStyle = '#fff';
            let particleX = x + Math.cos(timestamp * 0.01) * (radius + 6);
            let particleY = y + Math.sin(timestamp * 0.01) * (radius + 6);
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2, 0, Math.PI*2);
            ctx.fill();
        }
    }

    // DRAWING UTIL: Obstacle Bomb
    function drawBomb(ctx, x, y, radius, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Bomb Body (Dark stone sphere)
        let grad = ctx.createRadialGradient(-radius/4, -radius/4, radius/10, 0, 0, radius);
        grad.addColorStop(0, '#595959');
        grad.addColorStop(0.5, '#262626');
        grad.addColorStop(1, '#000000');

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI*2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Threat indicators (glowing red fissures)
        ctx.strokeStyle = '#e63946';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-radius * 0.5, -radius * 0.1);
        ctx.lineTo(-radius * 0.1, radius * 0.4);
        ctx.lineTo(radius * 0.4, -radius * 0.3);
        ctx.stroke();

        // Bomb cap (grey metal cylinder)
        ctx.fillStyle = '#737373';
        ctx.beginPath();
        ctx.rect(-6, -radius - 4, 12, 5);
        ctx.fill();

        ctx.restore();

        // Bomb fuse (static/twisting rope line)
        ctx.strokeStyle = '#d9b38c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - radius - 4);
        ctx.quadraticCurveTo(x + 8, y - radius - 12, x + 4, y - radius - 20);
        ctx.stroke();

        // Glowing spark (yellow star)
        let sparkGrad = ctx.createRadialGradient(x + 4, y - radius - 20, 1, x + 4, y - radius - 20, 5);
        sparkGrad.addColorStop(0, '#ffffff');
        sparkGrad.addColorStop(0.4, '#ffd700');
        sparkGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = sparkGrad;
        ctx.beginPath();
        ctx.arc(x + 4, y - radius - 20, 6, 0, Math.PI*2);
        ctx.fill();
    }

    // PARTICLES SYSTEM
    function createExplosion(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 1, // slight up gravity
                color: color,
                radius: 2 + Math.random() * 3,
                alpha: 1.0,
                decay: 0.02 + Math.random() * 0.03
            });
        }
    }

    function updateAndDrawParticles(ctx) {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        }
    }

    // POPUPS SYSTEM (FLOATING TEXTS)
    function createPopup(x, y, text, color) {
        popups.push({
            x: x,
            y: y,
            text: text,
            color: color,
            alpha: 1.0,
            vy: -1.2, // floating upwards
            scale: 1.0
        });
    }

    function updateAndDrawPopups(ctx) {
        ctx.save();
        ctx.font = 'bold 16px "Poppins", sans-serif';
        ctx.textAlign = 'center';

        for (let i = popups.length - 1; i >= 0; i--) {
            const popup = popups[i];
            popup.y += popup.vy;
            popup.alpha -= 0.02;
            popup.scale += 0.005;

            if (popup.alpha <= 0) {
                popups.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = popup.alpha;
            ctx.fillStyle = popup.color;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            
            // Draw text
            ctx.fillText(popup.text, popup.x, popup.y);
        }
        ctx.restore();
    }
});
