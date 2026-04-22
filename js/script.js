/**
 * ═══════════════════════════════════════════════════════════
 * RANA SIKANDAR HAYAT - OFFICIAL WEBSITE JAVASCRIPT
 * Provincial Minister of School Education, Punjab
 * 
 * This file handles all interactive features:
 * - Theme switching (dark/light mode)
 * - Mobile menu interactions
 * - Scroll effects and animations
 * - Counter animations
 * - Particle background effects
 * ═══════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════
// THEME TOGGLE FUNCTIONALITY
// Allows users to switch between dark and light modes
// ═══════════════════════════════════════════════════════════

/**
 * Toggle between dark and light theme modes
 * Updates the HTML data-theme attribute, UI icons, and saves preference to localStorage
 */
function toggleTheme() {
  const htmlElement = document.documentElement;
  const isCurrentlyDarkMode = htmlElement.getAttribute('data-theme') === 'dark';
  
  // Switch the theme
  const newTheme = isCurrentlyDarkMode ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  
  // Update the icon and text to reflect the new state
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  themeIcon.textContent = isCurrentlyDarkMode ? '🌙' : '☀️';
  themeText.textContent = isCurrentlyDarkMode ? 'Dark Mode' : 'Light Mode';
  
  // Save user's preference to browser storage
  localStorage.setItem('theme', newTheme);
}

// ═══════════════════════════════════════════════════════════
// MOBILE MENU TOGGLE FUNCTIONALITY
// Opens and closes the navigation menu on mobile devices
// ═══════════════════════════════════════════════════════════

/**
 * Toggle the mobile navigation menu open/closed
 * Handles both the menu visibility and hamburger icon animation
 */
function toggleMobileMenu() {
  const navigationMenu = document.getElementById('navMenu');
  const hamburgerIcon = document.getElementById('hamburger');
  
  // Toggle the visual states
  navigationMenu.classList.toggle('open');
  hamburgerIcon.classList.toggle('active');
}

// Close mobile menu when a nav link is clicked
/**
 * Initialize all interactive features when the page loads
 * - Load saved theme preference
 * - Setup mobile menu close-on-click
 * - Setup smooth scroll for anchor links
 * - Initialize scroll effects and animations
 */
/**
 * Handle family photo rotation with 4-second interval
 */
function initFamilyPhotoRotation() {
  const familyPhotosContainers = document.querySelectorAll('.family-photos');

  familyPhotosContainers.forEach(container => {
    const photos = Array.from(container.querySelectorAll('.family-photo-img'));

    if (!photos.length) return;

    let activePhotoIndex = photos.findIndex(photo => photo.classList.contains('is-active'));
    if (activePhotoIndex === -1) {
      activePhotoIndex = 0;
    }

    photos.forEach((photo, index) => {
      photo.classList.toggle('is-active', index === activePhotoIndex);
    });

    if (photos.length < 2) return;

    // Rotate family photos every 3 seconds
    window.setInterval(() => {
      photos[activePhotoIndex].classList.remove('is-active');
      activePhotoIndex = (activePhotoIndex + 1) % photos.length;
      photos[activePhotoIndex].classList.add('is-active');
    }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', function () {

  // ─── RESTORE USER'S THEME PREFERENCE ───
  // Check if user had previously selected a theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    const isUsingDarkMode = savedTheme === 'dark';
    document.getElementById('theme-icon').textContent = isUsingDarkMode ? '☀️' : '🌙';
    document.getElementById('theme-text').textContent = isUsingDarkMode ? 'Light Mode' : 'Dark Mode';
  }

  // ─── CLOSE MOBILE MENU WHEN CLICKING NAV LINKS ───
  // Improves user experience by auto-closing menu after navigation
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navMenu').classList.remove('open');
      document.getElementById('hamburger').classList.remove('active');
    });
  });

  // ─── SMOOTH SCROLLING FOR ANCHOR LINKS ───
  // Provides smooth animated scrolling instead of instant jumps
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        // ✅ iOS 15.4 se purane iPhones par bhi kaam karta hai
        const targetPos = targetElement.getBoundingClientRect().top + (window.pageYOffset || window.scrollY);
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ─── INITIALIZE ALL INTERACTIVE FEATURES ───
  // Setup scroll effects, progress bars, animations, and more
  initScrollNavbar();
  initScrollProgress();
  initBackToTop();
  initScrollAnimations();
  initCounterAnimations();
  initAchievementSlides();
  initGallerySlides();
  initPublicEngagementSlider();
  initFamilyPhotoRotation();
});

// ═══════════════════════════════════════════════════════════
// SCROLL PROGRESS BAR
// Shows a visual indicator of how far down the page the user has scrolled
// ═══════════════════════════════════════════════════════════

/**
 * Update scroll progress bar as user scrolls through page
 * The bar fills from left to right based on scroll position
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  function updateScrollProgress() {
    const scrollPositionTop = window.scrollY || document.documentElement.scrollTop || 0;
    const totalPageHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate percentage scrolled (0-100)
    const scrollPercentage = totalPageHeight > 0 ? (scrollPositionTop / totalPageHeight) * 100 : 0;
    progressBar.style.width = `${Math.max(0, Math.min(scrollPercentage, 100))}%`;
  }

  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
}

// ═══════════════════════════════════════════════════════════
// NAVBAR SCROLL EFFECTS
// Adds shadow effect to navbar when user scrolls down the page
// ═══════════════════════════════════════════════════════════

/**
 * Add visual effects to navbar as user scrolls
 * Adds a subtle shadow when scrolled down to indicate page depth
 */
function initScrollNavbar() {
  const navbar = document.querySelector('nav');
  const scrollThreshold = 100; // pixels
  
  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// ═══════════════════════════════════════════════════════════
// BACK TO TOP BUTTON
// Shows/hides "back to top" button and scrolls page to top when clicked
// ═══════════════════════════════════════════════════════════

/**
 * Show/hide the "back to top" button based on scroll position
 * Button appears when user scrolls down past a certain threshold
 */
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  const scrollThreshold = 500; // Show button after 500px of scrolling
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
}

/**
 * Smoothly scroll the page back to the top
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════
// ANIMATED COUNTER FOR HERO STATS
// Animates numbers counting up from 0 to their target values
// Used for displaying statistics like "50K+ Scholarship Beneficiaries"
// ═══════════════════════════════════════════════════════════

/**
 * Animate a number counter element
 * Smoothly counts from 0 to the target value using ease-out timing
 * 
 * @param {HTMLElement} element - The counter element to animate
 * Expected data attributes: data-target (number), data-suffix (string, optional)
 */
function animateCounter(counterElement) {
  const targetNumber = parseInt(counterElement.getAttribute('data-target'), 10);
  const numberSuffix = counterElement.getAttribute('data-suffix') || '';
  const animationDuration = 2000; // milliseconds
  const animationStartTime = performance.now();

  /**
   * Animation frame update function
   * Uses cubic ease-out curve for natural motion
   */
  function updateCounter(currentTime) {
    const timeElapsed = currentTime - animationStartTime;
    const animationProgress = Math.min(timeElapsed / animationDuration, 1);
    
    // Apply cubic ease-out easing function for smooth animation
    const easedProgress = 1 - Math.pow(1 - animationProgress, 3);
    const currentNumber = Math.round(easedProgress * targetNumber);
    
    // Update the display
    counterElement.textContent = currentNumber + numberSuffix;
    
    // Continue animation if not complete
    if (animationProgress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// ---- 1. PARTICLES BACKGROUND ----
(function(){
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle(){
    this.reset = function(){
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.6 + 0.1;
    };
    this.reset();
  }

  // ✅ Mobile par sirf 40 particles, desktop par 90 — Android lag fix
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 40 : 90;
  for(let i = 0; i < particleCount; i++) particles.push(new Particle());

  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0||p.x > W||p.y < 0||p.y > H) p.reset();
    });

    // Draw faint connecting lines between nearby particles
    for(let i = 0; i < particles.length; i++){
      for(let j = i+1; j < particles.length; j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 80){
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212,175,55,${0.12*(1-dist/80)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ---- 2. SCROLL REVEAL (Intersection Observer) ----
(function(){
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => obs.observe(t));
})();

// ---- 3. TYPEWRITER EFFECT ----
(function(){
  const el = document.getElementById('typewriterEl');
  if(!el) return;
  const phrases = [
    'School Education',
    'Transforming Education',
    'PP-183 Kasur-IX',
    'Vision 2030',
  ];
  let pi = 0, ci = phrases[0].length, deleting = true;
  el.textContent = phrases[0];
  function tick(){
    const word = phrases[pi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if(!deleting && ci > word.length){ deleting = true; setTimeout(tick, 1800); return; }
    if(deleting && ci < 0){ deleting = false; pi = (pi+1) % phrases.length; ci = 0; setTimeout(tick, 400); return; }
    setTimeout(tick, deleting ? 45 : 75);
  }
  setTimeout(tick, 1800);
})();

// ---- 4. SMOOTH COUNTER — handled by initCounterAnimations() below ----
// (duplicate IIFE removed to prevent double animation / memory waste)

// ---- 5. CURSOR GLOW (subtle) ----
(function(){
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:300px; height:300px; border-radius:50%;
    background:radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition: left .15s ease, top .15s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ═══════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (FADE-IN)
// ═══════════════════════════════════════════════════════════

function initAchievementSlides() {
  const mediaBlocks = document.querySelectorAll('.achievement-media');

  mediaBlocks.forEach(mediaBlock => {
    const slides = Array.from(mediaBlock.querySelectorAll('img'));

    if (!slides.length) return;

    mediaBlock.classList.remove('achievement-media-placeholder');

    const placeholderLabel = mediaBlock.querySelector('span');
    if (placeholderLabel) {
      placeholderLabel.remove();
    }

    if (slides.length < 2) return;

    mediaBlock.classList.add('has-slides');

    let activeSlideIndex = 0;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === 0);
    });

    window.setInterval(() => {
      slides[activeSlideIndex].classList.remove('is-active');
      activeSlideIndex = (activeSlideIndex + 1) % slides.length;
      slides[activeSlideIndex].classList.add('is-active');
    }, 3000);
  });
}

function initGallerySlides() {
  const imageContainers = document.querySelectorAll('.feature-image-slides');

  imageContainers.forEach(container => {
    const slides = Array.from(container.querySelectorAll('img'));

    if (!slides.length) return;

    // Only process if there are multiple images
    if (slides.length < 2) {
      // Set first image as active even with single image
      slides[0].classList.add('is-active');
      return;
    }

    container.classList.add('has-slides');

    let activeSlideIndex = 0;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === 0);
    });

    window.setInterval(() => {
      slides[activeSlideIndex].classList.remove('is-active');
      activeSlideIndex = (activeSlideIndex + 1) % slides.length;
      slides[activeSlideIndex].classList.add('is-active');
    }, 3000);
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.stat-card, .achievement-card, .initiative-card, .highlight-card, .contact-card, .engagement-card, .pillar-card'
  );

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// ═══════════════════════════════════════════════════════════
// PUBLIC ENGAGEMENT IMAGE CAROUSEL
// Cycles through carousel images one at a time every 5 seconds
// ═══════════════════════════════════════════════════════════

function initPublicEngagementSlider() {
  const slides = document.querySelectorAll('.carousel-slide');
  const captionEl = document.getElementById('carouselCaption');
  
  if (slides.length === 0) return;
  
  // Array of captions for each image
  const captions = [
    '🤝 With Public',
    '🤝 With Public',
    '🤝 With Public',
    '🤝 With Public',
    '👨‍🎓 With Students',
    '👨‍🎓 With Students',
    '👨‍🎓 With Students',
    '👨‍🎓 With Students'
  ];
  
  let currentIndex = 0;
  
  // Rotate carousel every 3 seconds
  setInterval(() => {
    // Hide current slide
    slides[currentIndex].style.opacity = '0';
    
    // Move to next slide
    currentIndex = (currentIndex + 1) % slides.length;
    
    // Show next slide
    slides[currentIndex].style.opacity = '1';
    
    // Update caption
    if (captionEl) {
      captionEl.textContent = captions[currentIndex];
    }
  }, 3000);
}

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ═══════════════════════════════════════════════════════════
// AUTO-SCROLL BUTTON
// Automatically scrolls the page at a slow, readable pace
// ═══════════════════════════════════════════════════════════

(function () {
  let autoScrollActive = false;
  let autoScrollInterval = null;
  const SCROLL_SPEED = 1.5; // pixels per tick (~90px/sec at 60fps)

  function autoScrollStep() {
    const currentPos = window.pageYOffset || window.scrollY || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (currentPos >= maxScroll - 2) {
      stopAutoScroll();
      return;
    }
    // ✅ window.scrollTo — iPhone aur Android dono par kaam karta hai
    window.scrollTo(0, currentPos + SCROLL_SPEED);
  }

  function startAutoScroll() {
    autoScrollActive = true;
    // ✅ setInterval use karo rAF ki jagah — iOS par reliable hai
    autoScrollInterval = setInterval(autoScrollStep, 16); // ~60fps
    const btn = document.getElementById('autoScrollBtn');
    if (btn) { btn.classList.add('active'); btn.textContent = '⏸'; btn.title = 'Stop Auto Scroll'; }
  }

  function stopAutoScroll() {
    autoScrollActive = false;
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    const btn = document.getElementById('autoScrollBtn');
    if (btn) { btn.classList.remove('active'); btn.textContent = '⇓'; btn.title = 'Auto Scroll'; }
  }

  // Stop auto scroll on user manual scroll
  window.addEventListener('wheel', () => { if (autoScrollActive) stopAutoScroll(); }, { passive: true });
  window.addEventListener('touchmove', () => { if (autoScrollActive) stopAutoScroll(); }, { passive: true });

  window.toggleAutoScroll = function () {
    if (autoScrollActive) stopAutoScroll();
    else startAutoScroll();
  };

  // Wire up the button once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('autoScrollBtn');
    if (btn) {
      // ✅ touchend par preventDefault — iPhone par double-fire nahi hoga
      btn.addEventListener('touchend', function (e) {
        e.preventDefault();
        window.toggleAutoScroll();
      });
      btn.addEventListener('click', window.toggleAutoScroll);

      // Show/hide alongside back-to-top button
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) btn.classList.add('visible');
        else { btn.classList.remove('visible'); if (autoScrollActive) stopAutoScroll(); }
      }, { passive: true });
    }
  });
})();

// ═══════════════════════════════════════════════════════════
// BUTTON POSITIONING ADJUSTMENT FOR FOOTER VISIBILITY
// Moves auto-scroll and back-to-top buttons up when near footer
// ═══════════════════════════════════════════════════════════

(function () {
  function adjustButtonPositionNearFooter() {
    const footer = document.querySelector('footer');
    const autoScrollBtn = document.getElementById('autoScrollBtn');
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!footer || !autoScrollBtn || !backToTopBtn) return;

    if (!autoScrollBtn.dataset.baseBottom) {
      autoScrollBtn.dataset.baseBottom = `${parseFloat(window.getComputedStyle(autoScrollBtn).bottom) || 32}`;
    }

    if (!backToTopBtn.dataset.baseBottom) {
      backToTopBtn.dataset.baseBottom = `${parseFloat(window.getComputedStyle(backToTopBtn).bottom) || 32}`;
    }

    const autoScrollBaseBottom = parseFloat(autoScrollBtn.dataset.baseBottom) || 32;
    const backToTopBaseBottom = parseFloat(backToTopBtn.dataset.baseBottom) || 32;
    const maxLift = 140;
    const viewportHeight = window.innerHeight;
    const footerRect = footer.getBoundingClientRect();
    const footerVisibleHeight = Math.max(
      0,
      Math.min(footerRect.bottom, viewportHeight) - Math.max(footerRect.top, 0)
    );
    const progressRange = Math.max(Math.min(footerRect.height, viewportHeight), 1);
    const progress = Math.max(0, Math.min(footerVisibleHeight / progressRange, 1));
    const autoScrollBottom = autoScrollBaseBottom + (maxLift * progress);
    const backToTopBottom = backToTopBaseBottom + (maxLift * progress);

    autoScrollBtn.style.bottom = `${autoScrollBottom}px`;
    backToTopBtn.style.bottom = `${backToTopBottom}px`;
  }

  // Listen to scroll events and adjust button position
  window.addEventListener('scroll', adjustButtonPositionNearFooter, { passive: true });
  
  // Also adjust on resize in case viewport size changes
  window.addEventListener('resize', adjustButtonPositionNearFooter, { passive: true });
  
  // Initial check when page loads
  document.addEventListener('DOMContentLoaded', adjustButtonPositionNearFooter);
})();

// Contact Form with Success Message
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const formPart = document.getElementById('contact-form-part');
  const successSection = document.getElementById('contact-success');
  const sendBtn = document.getElementById('sendBtn');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;

    const formData = new FormData(form);
    formData.append('_subject', 'New Message from Official Website - Rana Sikandar Hayat');
    formData.append('_captcha', 'false');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Hide form and show success
        formPart.style.display = 'none';
        successSection.style.display = 'block';
        successSection.classList.remove('hidden');

        // Auto hide success after 6 seconds
        setTimeout(() => {
          hideSuccess();
        }, 5000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your internet and try again.');
    }

    // Reset button
    sendBtn.textContent = '📤 SEND MESSAGE';
    sendBtn.disabled = false;
  });
});

function hideSuccess() {
  const formPart = document.getElementById('contact-form-part');
  const successSection = document.getElementById('contact-success');

  successSection.style.display = 'none';
  successSection.classList.add('hidden');
  formPart.style.display = 'block';

  // Reset form
  document.getElementById('contactForm').reset();
}

// ═══════════════════════════════════════════════════════════
// END OF SCRIPT
// ═══════════════════════════════════════════════════════════
