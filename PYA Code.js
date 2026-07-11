document.addEventListener('DOMContentLoaded', () => {

    /* --- Navigation Setup --- */
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

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
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
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
        { day: 1, title: 'Prathama Pooja & Sthapana', date: 'Sept 6, 2026', events: ['7:00 AM - Morning Aarti', '9:30 AM - Idol Installation', '6:30 PM - Maha Aarti', '8:00 PM - Welcome Bhajans'] },
        { day: 2, title: 'Dwitiya', date: 'Sept 7, 2026', events: ['7:30 AM - Kakad Aarti', '10:00 AM - Modak Offering', '7:00 PM - Local Talent Show'] },
        { day: 3, title: 'Tritiya', date: 'Sept 8, 2026', events: ['7:30 AM - Morning Aarti', '12:00 PM - Annadanam Starts', '8:00 PM - Classical Dance'] },
        { day: 4, title: 'Chaturthi', date: 'Sept 9, 2026', events: ['7:30 AM - Morning Aarti', '5:00 PM - Kids Drawing Comp', '7:00 PM - Maha Aarti'] },
        { day: 5, title: 'Panchami', date: 'Sept 10, 2026', events: ['7:30 AM - Morning Aarti', '6:30 PM - Traditional Games', '8:30 PM - Devotional Singing'] },
        { day: 6, title: 'Shashthi', date: 'Sept 11, 2026', events: ['7:30 AM - Morning Aarti', '5:00 PM - Rangoli Competition', '7:00 PM - Maha Aarti'] },
        { day: 7, title: 'Saptami', date: 'Sept 12, 2026', events: ['7:30 AM - Morning Aarti', '11:00 AM - Blood Donation Camp', '7:00 PM - Drama Presentation'] },
        { day: 8, title: 'Ashtami', date: 'Sept 13, 2026', events: ['7:30 AM - Morning Aarti', '10:00 AM - Havan/Homam', '8:00 PM - Grand Musical Night'] },
        { day: 9, title: 'Navami & Visarjan', date: 'Sept 14, 2026', events: ['6:00 AM - Final Maha Pooja', '10:00 AM - Visarjan Yatra Begins', 'Prasad Distribution all day'] }
    ];

    const scheduleContainer = document.getElementById('schedule-container');
    const todayStr = 'Sept 6, 2026'; // Mocking "today" for demonstration

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
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightboxImg.src = src;
            lightbox.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    /* --- Fun Mode (Google Gravity Style) integrating Matter.js --- */
    const funModeBtn = document.getElementById('fun-mode-btn');
    const resetModeBtn = document.getElementById('reset-mode-btn');
    const mainContent = document.getElementById('main-content');

    let engine, render, runner;
    let isGravityActive = false;
    let simulatedElements = []; // Store the DOM elements overlaid

    funModeBtn.addEventListener('click', () => {
        if (isGravityActive) return;
        initGravity();
    });

    resetModeBtn.addEventListener('click', () => {
        if (!isGravityActive) return;
        resetGravity();
    });

    function initGravity() {
        isGravityActive = true;
        document.body.classList.add('gravity-active');
        funModeBtn.classList.add('hidden');
        resetModeBtn.classList.remove('hidden');

        // Scroll to top to ensure coordinates are aligned nicely
        window.scrollTo(0, 0);

        // module aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        // create an engine
        engine = Engine.create();

        const canvasContainer = document.getElementById('gravity-container');

        // create a renderer
        render = Render.create({
            element: canvasContainer,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        });

        // Hide the actual canvas display, we just use the physics calculations
        // We will map DOM elements to the bodies instead
        render.canvas.style.opacity = '0';

        // Select what elements to throw around. 
        // Targeting sections, cards, and text individually would be chaotic but fun.
        // Let's target `.gravity-item`
        const items = document.querySelectorAll('.gravity-item');

        let bodies = [];

        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            // Create a physics body for this item
            const body = Bodies.rectangle(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                rect.width,
                rect.height,
                { restitution: 0.6, friction: 0.1 }
            );

            // Clone the DOM node visually
            const clone = item.cloneNode(true);
            clone.classList.add('gravity-box');
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.height + 'px';
            clone.style.top = '0px'; // controlled by transform
            clone.style.left = '0px'; // controlled by transform
            clone.style.margin = '0px';

            // If it's the navbar, need absolute
            clone.style.position = 'fixed';

            // Append clone to body (outside original flow)
            document.body.appendChild(clone);

            // Hide original
            item.classList.add('hidden-for-gravity');

            bodies.push(body);
            simulatedElements.push({ dom: clone, body: body, original: item });
        });

        // Add boundaries
        var ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true });
        var leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
        var rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });

        // add all of the bodies to the world
        Composite.add(engine.world, [...bodies, ground, leftWall, rightWall]);

        // add mouse control
        var mouse = Mouse.create(document.body),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false }
                }
            });

        Composite.add(engine.world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // run the renderer
        Render.run(render);

        // create runner
        runner = Runner.create();
        Runner.run(runner, engine);

        // Update loop to sync DOM bodies to physics bodies
        Matter.Events.on(engine, 'afterUpdate', function () {
            simulatedElements.forEach(sim => {
                const pos = sim.body.position;
                const angle = sim.body.angle;
                // Center origin
                sim.dom.style.transform = `translate(${pos.x - sim.dom.offsetWidth / 2}px, ${pos.y - sim.dom.offsetHeight / 2}px) rotate(${angle}rad)`;
            });
        });

        // Fix mouse events on fixed elements grabbing
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    }

    function resetGravity() {
        isGravityActive = false;
        document.body.classList.remove('gravity-active');
        funModeBtn.classList.remove('hidden');
        resetModeBtn.classList.add('hidden');

        // Stop Matter.js
        if (runner) Matter.Runner.stop(runner);
        if (render) Matter.Render.stop(render);
        if (engine) Matter.World.clear(engine.world);
        if (engine) Matter.Engine.clear(engine);

        // Remove render canvas
        const canvasContainer = document.getElementById('gravity-container');
        canvasContainer.innerHTML = '';

        // Clean up DOM
        simulatedElements.forEach(sim => {
            sim.dom.remove(); // Remove flying clone
            sim.original.classList.remove('hidden-for-gravity'); // Restore original
        });

        simulatedElements = [];
    }
});
