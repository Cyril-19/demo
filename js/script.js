// Write JavaScript here
// Dalsiec Technologies - Main JavaScript

// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const infoCards = document.querySelectorAll('.info-card');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const canvas = document.getElementById('cybersecurity-bg');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundCanvas();
    initCyberInterface();
    initHologram();
    initScrollAnimations();
    initTabSystem();
    initTestimonialSlider();
    initNavigation();
});

// Scroll Effect for Header
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
function initNavigation() {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
        }
    });
}

// Tab System for Use Cases
function initTabSystem() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the target tab to show
            const targetTab = button.getAttribute('data-target');
            
            // Hide all tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the target tab content
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Info card interactions
    infoCards.forEach(card => {
        card.addEventListener('click', () => {
            infoCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Update interface visual based on selected card
            updateCyberInterface(card.getAttribute('data-tab'));
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 8000);
}

// Background Canvas Animation
function initBackgroundCanvas() {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix-like effect with cyber security elements
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    
    // Cyber symbols instead of just matrix characters
    const cyberSymbols = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン{}[]!@#$%^&*()_+-=<>?;:~|';
    
    function draw() {
        ctx.fillStyle = 'rgba(6, 10, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00b4ff';
        ctx.font = '12px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = cyberSymbols[Math.floor(Math.random() * cyberSymbols.length)];
            const x = i * 20;
            const y = drops[i] * 20;
            
            // Fade effect based on drop position
            const alpha = 1 - Math.min(1, (drops[i] * 20) / canvas.height);
            ctx.fillStyle = `rgba(0, 180, 255, ${alpha})`;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
        
        // Draw hexagons
        drawHexagons();
        
        requestAnimationFrame(draw);
    }
    
    // Draw floating hexagons
    const hexagons = [];
    for (let i = 0; i < 15; i++) {
        hexagons.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 40 + 10,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.2
        });
    }
    
    function drawHexagons() {
        hexagons.forEach(hexagon => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = i * Math.PI / 3;
                const x = hexagon.x + hexagon.size * Math.cos(angle);
                const y = hexagon.y + hexagon.size * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(155, 0, 255, ${hexagon.opacity})`;
            ctx.stroke();
            
            // Move hexagon
            hexagon.x += hexagon.speedX;
            hexagon.y += hexagon.speedY;
            
            // Bounce off edges
            if (hexagon.x < 0 || hexagon.x > canvas.width) hexagon.speedX *= -1;
            if (hexagon.y < 0 || hexagon.y > canvas.height) hexagon.speedY *= -1;
        });
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    draw();
}

// 3D Hologram Effect for Hero Section
function initHologram() {
    const hologramContainer = document.querySelector('.cyber-hologram');
    if (!hologramContainer || !THREE) return;
    
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, hologramContainer.offsetWidth / hologramContainer.offsetHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(hologramContainer.offsetWidth, hologramContainer.offsetHeight);
    hologramContainer.appendChild(renderer.domElement);
    
    // Create a sphere with wireframe to represent a globe/network
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00b4ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Create particles around the sphere to represent data points
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        // Create particles in a spherical shape but slightly larger than the wireframe
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI;
        const radius = 3 + Math.random() * 2;
        
        posArray[i] = radius * Math.sin(angle2) * Math.cos(angle1);
        posArray[i+1] = radius * Math.sin(angle2) * Math.sin(angle1);
        posArray[i+2] = radius * Math.cos(angle2);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({ 
        size: 0.02,
        color: 0x9b00ff,
        transparent: true,
        opacity: 0.8
    });
    
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);
    
    // Add lines connecting some particles to represent connections
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for(let i = 0; i < 100; i++) {
        const index1 = Math.floor(Math.random() * particlesCount);
        const index2 = Math.floor(Math.random() * particlesCount);
        
        linePositions.push(
            posArray[index1 * 3], posArray[index1 * 3 + 1], posArray[index1 * 3 + 2],
            posArray[index2 * 3], posArray[index2 * 3 + 1], posArray[index2 * 3 + 2]
        );
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffa3,
        transparent: true,
        opacity: 0.3
    });
    
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    
    camera.position.z = 8;
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate sphere and particles slowly
        sphere.rotation.y += 0.003;
        particleMesh.rotation.y += 0.001;
        lines.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = hologramContainer.offsetWidth / hologramContainer.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(hologramContainer.offsetWidth, hologramContainer.offsetHeight);
    });
}

// Interactive UI mockup for the platform showcase
function initCyberInterface() {
    const interfaceElement = document.querySelector('.cyber-interface');
    if (!interfaceElement) return;
    
    // Create basic UI elements for the interface
    interfaceElement.innerHTML = `
        <div class="interface-header">
            <div class="interface-title">DALSIEC CYBERSECURITY PLATFORM</div>
            <div class="interface-controls">
                <span class="control"></span>
                <span class="control"></span>
                <span class="control"></span>
            </div>
        </div>
        <div class="interface-body">
            <div class="interface-sidebar">
                <div class="sidebar-item active">Dashboard</div>
                <div class="sidebar-item">Labs</div>
                <div class="sidebar-item">Challenges</div>
                <div class="sidebar-item">Analytics</div>
                <div class="sidebar-item">Skills</div>
            </div>
            <div class="interface-content">
                <div class="content-section content-header">
                    <div class="welcome-message">Welcome, Security Analyst</div>
                    <div class="mission-status">Current Mission: <span class="highlight">Active</span></div>
                </div>
                <div class="content-section main-display">
                    <div class="cyber-grid">
                        <!-- Grid lines will be added with JavaScript -->
                    </div>
                    <div class="platform-visual-content">
                        <!-- This will be updated based on selected info card -->
                    </div>
                </div>
                <div class="content-section metrics-panel">
                    <div class="metric-box">
                        <div class="metric-title">Skill Rating</div>
                        <div class="metric-value">78%</div>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: 78%"></div>
                        </div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-title">Challenges Completed</div>
                        <div class="metric-value">14/20</div>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: 70%"></div>
                        </div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-title">Job Readiness</div>
                        <div class="metric-value">85%</div>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: 85%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for the cyber interface
    const style = document.createElement('style');
    style.textContent = `
        .cyber-interface {
            display: flex;
            flex-direction: column;
            height: 100%;
            font-family: 'Orbitron', sans-serif;
            color: rgba(255, 255, 255, 0.9);
            background: linear-gradient(135deg, rgba(10, 14, 23, 0.9), rgba(6, 10, 18, 0.95));
        }
        
        .interface-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: rgba(0, 0, 0, 0.4);
            border-bottom: 1px solid rgba(0, 180, 255, 0.3);
        }
        
        .interface-title {
            font-weight: 700;
            letter-spacing: 1px;
            color: #00b4ff;
        }
        
        .interface-controls {
            display: flex;
            gap: 8px;
        }
        
        .control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(0, 180, 255, 0.5);
        }
        
        .interface-body {
            display: flex;
            flex-grow: 1;
            height: calc(100% - 50px);
        }
        
        .interface-sidebar {
            width: 180px;
            background: rgba(0, 0, 0, 0.3);
            padding: 20px 0;
            border-right: 1px solid rgba(0, 180, 255, 0.2);
        }
        
        .sidebar-item {
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .sidebar-item:hover, .sidebar-item.active {
            background: rgba(0, 180, 255, 0.1);
        }
        
        .sidebar-item.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 3px;
            background: #00b4ff;
        }
        
        .interface-content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 20px;
            position: relative;
        }
        
        .content-section {
            margin-bottom: 20px;
        }
        
        .content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .welcome-message {
            font-size: 1.2rem;
            font-weight: 500;
        }
        
        .mission-status {
            padding: 8px 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 20px;
            border: 1px solid rgba(0, 180, 255, 0.3);
        }
        
        .main-display {
            flex-grow: 1;
            position: relative;
            border: 1px solid rgba(0, 180, 255, 0.3);
            border-radius: 4px;
            overflow: hidden;
            height: 250px;
        }
        
        .cyber-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        
        .platform-visual-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        
        .metrics-panel {
            display: flex;
            gap: 15px;
        }
        
        .metric-box {
            flex: 1;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 180, 255, 0.2);
            border-radius: 4px;
            padding: 15px;
        }
        
        .metric-title {
            font-size: 0.9rem;
            margin-bottom: 10px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .metric-value {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #00b4ff;
        }
        
        .metric-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
        }
        
        .metric-fill {
            height: 100%;
            background: linear-gradient(90deg, #00b4ff, #9b00ff);
            border-radius: 3px;
        }
    `;
    
    document.head.appendChild(style);
    
    // Create grid lines
    const grid = document.querySelector('.cyber-grid');
    if (grid) {
        // Create vertical lines
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.left = `${i * 5}%`;
            line.style.top = '0';
            line.style.width = '1px';
            line.style.height = '100%';
            line.style.background = 'rgba(0, 180, 255, 0.1)';
            line.style.zIndex = '0';
            grid.appendChild(line);
        }
        
        // Create horizontal lines
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.left = '0';
            line.style.top = `${i * 5}%`;
            line.style.width = '100%';
            line.style.height = '1px';
            line.style.background = 'rgba(0, 180, 255, 0.1)';
            line.style.zIndex = '0';
            grid.appendChild(line);
        }
    }
    
    // Set initial interface content
    updateCyberInterface('labs');
}

// Update the cyber interface based on selected feature
function updateCyberInterface(type) {
    const contentElement = document.querySelector('.platform-visual-content');
    if (!contentElement) return;
    
    let content = '';
    
    switch(type) {
        case 'labs':
            content = `
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: #00ffa3;">
                    Interactive Cybersecurity Lab
                </div>
                <div style="font-size: 1.2rem; margin-bottom: 15px;">
                    Active Scenario: Network Intrusion Detection
                </div>
                <div style="display: flex; gap: 15px; margin: 20px 0;">
                    <div style="padding: 10px; background: rgba(0, 255, 163, 0.1); border: 1px solid #00ffa3; border-radius: 4px;">
                        <div style="font-size: 0.9rem; margin-bottom: 5px;">Live Packets</div>
                        <div style="font-size: 1.2rem; font-weight: 700;">387</div>
                    </div>
                    <div style="padding: 10px; background: rgba(155, 0, 255, 0.1); border: 1px solid #9b00ff; border-radius: 4px;">
                        <div style="font-size: 0.9rem; margin-bottom: 5px;">Threats Detected</div>
                        <div style="font-size: 1.2rem; font-weight: 700;">3</div>
                    </div>
                    <div style="padding: 10px; background: rgba(0, 180, 255, 0.1); border: 1px solid #00b4ff; border-radius: 4px;">
                        <div style="font-size: 0.9rem; margin-bottom: 5px;">Time Remaining</div>
                        <div style="font-size: 1.2rem; font-weight: 700;">18:42</div>
                    </div>
                </div>
                <div style="margin-top: 20px; padding: 10px; background: rgba(0, 0, 0, 0.3); border-radius: 4px; font-family: monospace; text-align: left; width: 100%;">
                    <div style="margin-bottom: 5px; color: #00ffa3;">> Scanning network...</div>
                    <div style="margin-bottom: 5px; color: #00b4ff;">> Suspicious activity detected on port 22</div>
                    <div style="margin-bottom: 5px; color: #00b4ff;">> Analyzing packet structure...</div>
                    <div style="color: #9b00ff;">> Identify and mitigate the attack vector</div>
                </div>
            `;
            break;
            
        case 'ai':
            content = `
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: #9b00ff;">
                    AI-Powered CV Analysis
                </div>
                <div style="font-size: 1.2rem; margin-bottom: 15px;">
                    Target Role: Security Operations Analyst
                </div>
                <div style="width: 100%; max-width: 500px; margin: 20px auto; background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 20px; position: relative;">
                    <div style="position: absolute; top: -10px; left: 20px; background: #9b00ff; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem;">
                        Skills Match Analysis
                    </div>
                    <div style="display: flex; margin-bottom: 15px;">
                        <div style="flex: 1; text-align: left;">Network Security</div>
                        <div style="width: 200px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; position: relative; margin: 0 15px;">
                            <div style="position: absolute; top: 0; left: 0; height: 100%; width: 85%; background: linear-gradient(90deg, #00b4ff, #9b00ff); border-radius: 5px;"></div>
                        </div>
                        <div style="width: 30px; text-align: right;">85%</div>
                    </div>
                    <div style="display: flex; margin-bottom: 15px;">
                        <div style="flex: 1; text-align: left;">Threat Detection</div>
                        <div style="width: 200px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; position: relative; margin: 0 15px;">
                            <div style="position: absolute; top: 0; left: 0; height: 100%; width: 70%; background: linear-gradient(90deg, #00b4ff, #9b00ff); border-radius: 5px;"></div>
                        </div>
                        <div style="width: 30px; text-align: right;">70%</div>
                    </div>
                    <div style="display: flex; margin-bottom: 15px;">
                        <div style="flex: 1; text-align: left;">Incident Response</div>
                        <div style="width: 200px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; position: relative; margin: 0 15px;">
                            <div style="position: absolute; top: 0; left: 0; height: 100%; width: 65%; background: linear-gradient(90deg, #00b4ff, #9b00ff); border-radius: 5px;"></div>
                        </div>
                        <div style="width: 30px; text-align: right;">65%</div>
                    </div>
                    <div style="display: flex; margin-bottom: 15px;">
                        <div style="flex: 1; text-align: left;">Security Tools</div>
                        <div style="width: 200px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; position: relative; margin: 0 15px;">
                            <div style="position: absolute; top: 0; left: 0; height: 100%; width: 90%; background: linear-gradient(90deg, #00b4ff, #9b00ff); border-radius: 5px;"></div>
                        </div>
                        <div style="width: 30px; text-align: right;">90%</div>
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">
                    Overall Job Role Readiness: <span style="color: #00ffa3; font-weight: 700;">78%</span>
                </div>
            `;
            break;
            
        case 'challenges':
            content = `
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: #00b4ff;">
                    Dynamic Challenges
                </div>
                <div style="font-size: 1.2rem; margin-bottom: 15px;">
                    Personalized Based on Your CV & Target Role
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin: 20px 0; justify-content: center;">
                    <div style="width: 150px; padding: 15px; background: rgba(0, 180, 255, 0.1); border: 1px solid #00b4ff; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; margin-bottom: 10px;">Web App Penetration</div>
                        <div style="font-size: 1.2rem; font-weight: 700; color: #00b4ff;">Level 3</div>
                    </div>
                    <div style="width: 150px; padding: 15px; background: rgba(155, 0, 255, 0.1); border: 1px solid #9b00ff; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; margin-bottom: 10px;">Malware Analysis</div>
                        <div style="font-size: 1.2rem; font-weight: 700; color: #9b00ff;">Level 2</div>
                    </div>
                    <div style="width: 150px; padding: 15px; background: rgba(0, 255, 163, 0.1); border: 1px solid #00ffa3; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; margin-bottom: 10px;">Network Defense</div>
                        <div style="font-size: 1.2rem; font-weight: 700; color: #00ffa3;">Level 4</div>
                    </div>
                </div>
                <div style="margin-top: 20px; padding: 10px 20px; background: rgba(0, 0, 0, 0.3); border-radius: 20px; display: inline-block;">
                    <span style="font-size: 0.9rem;">Current Challenge Score:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; margin-left: 10px; color: #00ffa3;">420 pts</span>
                </div>
            `;
            break;
            
        case 'evaluation':
            content = `
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: #00ffa3;">
                    Real-time Evaluation
                </div>
                <div style="font-size: 1.2rem; margin-bottom: 15px;">
                    Performance Dashboard
                </div>
                <div style="width: 100%; max-width: 500px; margin: 0 auto; position: relative;">
                    <canvas id="radarChart" width="500" height="300"></canvas>
                </div>
                <div style="display: flex; justify-content: space-around; margin-top: 20px; width: 100%; max-width: 500px;">
                    <div style="text-align: center;">
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">Overall Score</div>
                        <div style="font-size: 1.8rem; font-weight: 700; color: #00ffa3;">83.5%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">Industry Rank</div>
                        <div style="font-size: 1.8rem; font-weight: 700; color: #00b4ff;">Top 15%</div>
                    </div>
                </div>
            `;
            
            // Create radar chart after content is added to DOM
            setTimeout(() => {
                const canvas = document.getElementById('radarChart');
                if (canvas && window.Chart) {
                    const ctx = canvas.getContext('2d');
                    new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: [
                                'Technical Knowledge',
                                'Problem Solving',
                                'Tool Proficiency',
                                'Security Awareness',
                                'Documentation',
                                'Communication'
                            ],
                            datasets: [{
                                label: 'Your Skills',
                                data: [85, 90, 78, 88, 75, 80],
                                fill: true,
                                backgroundColor: 'rgba(0, 180, 255, 0.2)',
                                borderColor: '#00b4ff',
                                pointBackgroundColor: '#00ffa3',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#00ffa3'
                            }, {
                                label: 'Industry Average',
                                data: [65, 70, 72, 68, 65, 75],
                                fill: true,
                                backgroundColor: 'rgba(155, 0, 255, 0.1)',
                                borderColor: '#9b00ff',
                                pointBackgroundColor: '#9b00ff',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#9b00ff'
                            }]
                        },
                        options: {
                            elements: {
                                line: {
                                    borderWidth: 3
                                }
                            },
                            scales: {
                                r: {
                                    angleLines: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    },
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    },
                                    pointLabels: {
                                        font: {
                                            size: 12
                                        },
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    },
                                    ticks: {
                                        backdropColor: 'transparent',
                                        color: 'rgba(255, 255, 255, 0.5)'
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        font: {
                                            size: 12
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }, 100);
            
            break;
            
        default:
            content = `
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">
                    Select a Feature to View
                </div>
            `;
    }
    
    contentElement.innerHTML = content;
}

// Scroll animations for page elements
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.platform-info, .features-grid, .use-case-tabs, .testimonial-slider, .services-grid, .cta-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Add initial styling
    const style = document.createElement('style');
    style.textContent = `
        .platform-info, .features-grid, .use-case-tabs, .testimonial-slider, .services-grid, .cta-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}