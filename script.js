// Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    const slideCount = slides.length;

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
});

// Enhanced Search Functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    let searchTimeout;

    // Focus effects
    searchInput.addEventListener('focus', () => {
        searchBox.classList.add('focused');
    });

    searchInput.addEventListener('blur', () => {
        searchBox.classList.remove('focused');
    });

    // Search triggers
    searchButton.addEventListener('click', executeSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') executeSearch();
    });

    // Improved search function
    function executeSearch() {
        clearTimeout(searchTimeout);

        const query = searchInput.value.trim();
        if (!query) {
            showSearchError();
            return;
        }

        // Visual feedback
        searchBox.classList.add('loading');
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        // Simulate search delay (replace with real API call)
        searchTimeout = setTimeout(() => {
            processSearchResults(query);
        }, 800);
    }

    function processSearchResults(query) {
        console.log('Searching for:', query); // Replace with actual search logic

        // Reset UI
        searchBox.classList.remove('loading');
        searchButton.innerHTML = '<i class="fas fa-search"></i>';

        // Here you would:
        // 1. Fetch API results OR
        // 2. Filter page content OR
        // 3. Redirect to search page
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }

    function showSearchError() {
        searchBox.classList.add('error');
        setTimeout(() => {
            searchBox.classList.remove('error');
        }, 1500);
    }

    // Optional: Auto-complete
    searchInput.addEventListener('input', debounce(function () {
        if (searchInput.value.length > 2) {
            // fetchAutocompleteSuggestions(searchInput.value);
        }
    }, 300));

    function debounce(func, delay) {
        let timer;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(func, delay);
        };
    }
});
// my update company overview section 


document.addEventListener('DOMContentLoaded', function () {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#005f73"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#005f73",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Animate stats
    function animateStats() {
        const statItems = document.querySelectorAll('.stat-item');

        statItems.forEach(item => {
            const target = parseInt(item.getAttribute('data-target'));
            const statNumber = item.querySelector('.stat-number');
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    statNumber.textContent = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    statNumber.textContent = target + (item.getAttribute('data-target') === '134' ? 'M' : '+');
                }
            };

            updateCount();
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('interactive-stats')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.about-card, .mv-grid, .timeline-container, .values-carousel');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Product Section Interactive Elements
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const slider = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const productItems = document.querySelectorAll('.product-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const quickViewBtns = document.querySelectorAll('.quick-view');

    // Slider Variables
    let currentIndex = 0;
    const itemWidth = productItems[0].offsetWidth + parseInt(getComputedStyle(productItems[0]).marginRight);
    const visibleItems = Math.min(3, productItems.length); // Show 3 items by default

    // Initialize slider
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Filter products with animation
            productItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100); // Staggered animation
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Reset slider position
            currentIndex = 0;
            setTimeout(updateSliderPosition, 350); // Wait for filter animation
        });
    });

    // Slider Navigation
    nextBtn.addEventListener('click', function () {
        const maxIndex = productItems.length - visibleItems;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
        updateNavButtons();
    });

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
        updateNavButtons();
    });

    function updateNavButtons() {
        const maxIndex = productItems.length - visibleItems;
        prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        nextBtn.style.opacity = currentIndex < maxIndex ? '1' : '0.5';
    }

    // Quick View Modal (example implementation)
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const productCard = this.closest('.product-item');
            const productName = productCard.querySelector('h3').textContent;

            // In a real implementation, you would:
            // 1. Fetch detailed product data
            // 2. Show a modal with product details
            // 3. Add to cart functionality

            console.log(`Quick view requested for: ${productName}`);
            alert(`Showing details for: ${productName}`);
        });
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe left - next
            nextBtn.click();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right - previous
            prevBtn.click();
        }
    }

    // Initialize
    updateNavButtons();
});

document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.process-step');

    steps.forEach((step, index) => {
        // Add delay based on index
        step.style.transitionDelay = `${index * 0.1}s`;

        // Add click interaction
        step.addEventListener('click', function () {
            this.querySelector('.step-content').classList.toggle('active');
        });
    });

    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function () {
            // Replace with actual product modal implementation
            const productName = this.querySelector('h3').textContent;
            console.log(`Selected product: ${productName}`);
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const counterSection = document.querySelector('.why-choose-era');
    const statCircles = document.querySelectorAll('.stat-circle');
    let animationStarted = false;

    // Smooth easing function
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    const animateCounters = () => {
        if (animationStarted) return;

        statCircles.forEach(circle => {
            const counter = circle.querySelector('.stat-number');
            const target = +circle.getAttribute('data-target');
            const duration = 2200;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const value = Math.floor(easedProgress * target);

                counter.textContent = value === target ? `${value}+` : value;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final animation flourish
                    circle.style.transform = 'translateY(-10px) scale(1.05)';
                    setTimeout(() => {
                        circle.style.transform = 'translateY(-15px) scale(1.05)';
                    }, 100);
                }
            };

            requestAnimationFrame(updateCounter);
        });

        animationStarted = true;
    };

    // Intersection Observer with smooth trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay for dramatic effect
                setTimeout(animateCounters, 300);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(counterSection);

    // Enhanced hover effects for reason cards
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'rotate(15deg) scale(1.15)';
            card.style.boxShadow = '0 25px 60px rgba(98, 218, 74, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = '';
            card.style.boxShadow = '0 15px 40px rgba(52, 207, 47, 0.1)';
        });
    });

    // Floating animation for decorative shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const duration = 15000 + (index * 3000);
        const delay = index * 2000;

        function floatAnimation() {
            shape.animate([
                { transform: 'translateY(0) rotate(0deg)' },
                { transform: 'translateY(-50px) rotate(5deg)' },
                { transform: 'translateY(0) rotate(0deg)' }
            ], {
                duration: duration,
                iterations: Infinity,
                delay: delay,
                easing: 'ease-in-out'
            });
        }

        floatAnimation();
    });
});
// Pause carousel on hover
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelector('.carousel-track').style.animationPlayState = 'paused';
    });
    item.addEventListener('mouseleave', () => {
        document.querySelector('.carousel-track').style.animationPlayState = 'running';
    });
});
// Enhanced 3D Carousel Logic
document.addEventListener('DOMContentLoaded', function () {
    // Position orbital items in 3D space
    const orbit = document.querySelector('.orbit');
    const items = document.querySelectorAll('.orbital-item');
    const radius = 180;
    const angle = (2 * Math.PI) / items.length;

    items.forEach((item, index) => {
        const x = radius * Math.cos(angle * index);
        const z = radius * Math.sin(angle * index);
        item.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${angle * index * -1}rad)`;
    });

    // Carousel navigation
    let currentIndex = 0;
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    // Create particles
    const separator = document.querySelector('.particles-separator');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        separator.appendChild(particle);
    }

    // Partner filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const partnerItems = document.querySelectorAll('.diamond-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            partnerItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
// Card Flip Interaction
document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('click', function () {
        this.classList.toggle('flipped');
    });
});

// Optional: Auto-flip back when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.content-card')) {
        document.querySelectorAll('.content-card.flipped').forEach(card => {
            card.classList.remove('flipped');
        });
    }
});

// Auto-Rotation Feature
let rotationInterval;
const rotationSpeed = 5000; // 5 seconds

function startRotation() {
    const cards = document.querySelectorAll('.recognition-card');
    let currentIndex = 0;

    rotationInterval = setInterval(() => {
        cards.forEach(card => card.classList.remove('featured'));
        currentIndex = (currentIndex + 1) % cards.length;
        cards[currentIndex].classList.add('featured');
    }, rotationSpeed);
}

function pauseRotation() {
    clearInterval(rotationInterval);
    document.getElementById('pause-rotation').style.display = 'none';
    document.getElementById('play-rotation').style.display = 'block';
}

function resumeRotation() {
    startRotation();
    document.getElementById('pause-rotation').style.display = 'block';
    document.getElementById('play-rotation').style.display = 'none';
}

// Mobile Carousel
function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.recognition-card');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Clone cards for infinite effect
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove('featured');
        track.appendChild(clone);
    });

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => slideTo(index));
        dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    const slideWidth = cards[0].offsetWidth;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide % cards.length);
        });
    }

    function slideTo(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % cards.length;
        updateCarousel();
    }

    document.querySelector('.carousel-next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    // Auto-advance for mobile
    setInterval(nextSlide, 3000);
}

// Download functionality
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.recognition-card');
        const imgSrc = card.querySelector('.certificate-frame img').src;
        const fileName = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-') + '.jpg';

        // Create temporary link
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Modal download
document.querySelector('.modal-download').addEventListener('click', function () {
    const imgSrc = document.querySelector('.modal-image').src;
    const fileName = document.querySelector('.modal-caption').textContent.toLowerCase().replace(/\s+/g, '-') + '.jpg';

    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    startRotation();
    if (window.innerWidth <= 768) setupCarousel();

    // Rotation controls
    document.getElementById('pause-rotation').addEventListener('click', pauseRotation);
    document.getElementById('play-rotation').addEventListener('click', resumeRotation);
});

// Responsive check
window.addEventListener('resize', function () {
    if (window.innerWidth <= 768 && !document.querySelector('.carousel-track').children.length) {
        setupCarousel();
    }
});

// Category Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter articles
        const category = this.dataset.category;
        document.querySelectorAll('.news-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Social Share Functionality
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const article = this.closest('.news-card');
        const title = article.querySelector('h3').textContent;
        const url = window.location.href;

        if (this.querySelector('svg path').getAttribute('d').includes('M5.026 15')) {
            // LinkedIn share
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        } else {
            // Twitter share
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        }
    });
});
// Calendar Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // DOM Elements
    const monthYearElement = document.querySelector('.month-year');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const timeSlotContainer = document.querySelector('.slot-container');
    const selectedDateElement = document.getElementById('selectedDate');
    const selectedTimeElement = document.getElementById('selectedTime');
    const confirmNameElement = document.getElementById('confirmName');
    const confirmDateElement = document.getElementById('confirmDate');
    const confirmTimeElement = document.getElementById('confirmTime');
    const confirmDeptElement = document.getElementById('confirmDept');
    const confirmEmailElement = document.getElementById('confirmEmail');
    const form = document.getElementById('appointmentForm');
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.querySelector('.btn-next');
    const prevBtn = document.querySelector('.btn-prev');
    const confirmationModal = document.querySelector('.confirmation-modal');
    const closeModalBtn = document.querySelector('.btn-close-modal');

    // Time slots data
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    // Initialize calendar
    function initCalendar() {
        renderCalendar(currentMonth, currentYear);
        renderTimeSlots();
    }

    // Render calendar
    function renderCalendar(month, year) {
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;

        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day-header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell empty';
            calendarGrid.appendChild(emptyCell);
        }

        // Add day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.textContent = day;

            // Highlight current day
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayCell.classList.add('current-day');
            }

            // Disable past dates
            const cellDate = new Date(year, month, day);
            if (cellDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.addEventListener('click', () => selectDate(day, month, year));
            }

            calendarGrid.appendChild(dayCell);
        }
    }

    // Render time slots
    function renderTimeSlots() {
        timeSlotContainer.innerHTML = '';
        timeSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot;
            slotElement.addEventListener('click', () => selectTimeSlot(slot));
            timeSlotContainer.appendChild(slotElement);
        });
    }

    // Select date
    function selectDate(day, month, year) {
        // Remove previous selection
        const selectedCells = document.querySelectorAll('.day-cell.selected');
        selectedCells.forEach(cell => cell.classList.remove('selected'));

        // Add selection to clicked cell
        const selectedDate = new Date(year, month, day);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        selectedDateElement.textContent = formattedDate;

        // Highlight selected cell
        const dayCells = document.querySelectorAll('.day-cell:not(.empty):not(.disabled)');
        dayCells.forEach(cell => {
            if (parseInt(cell.textContent) === day) {
                cell.classList.add('selected');
            }
        });

        // Reset time selection
        selectedTimeElement.textContent = 'Not selected';
        const selectedSlots = document.querySelectorAll('.time-slot.selected');
        selectedSlots.forEach(slot => slot.classList.remove('selected'));
    }

    // Select time slot
    function selectTimeSlot(time) {
        // Remove previous selection
        const selectedSlots = document.querySelectorAll('.time-slot.selected');
        selectedSlots.forEach(slot => slot.classList.remove('selected'));

        // Add selection to clicked slot
        const slotElements = document.querySelectorAll('.time-slot');
        slotElements.forEach(slot => {
            if (slot.textContent === time) {
                slot.classList.add('selected');
                selectedTimeElement.textContent = time;
            }
        });
    }

    // Navigation buttons
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Form navigation
    nextBtn.addEventListener('click', () => {
        // Validate step 1
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!name || !email || !phone) {
            alert('Please fill in all personal information fields');
            return;
        }

        // Check if date and time are selected
        if (selectedDateElement.textContent === 'Not selected' ||
            selectedTimeElement.textContent === 'Not selected') {
            alert('Please select a date and time for your appointment');
            return;
        }

        // Go to next step
        steps[0].classList.remove('active');
        steps[1].classList.add('active');
    });

    prevBtn.addEventListener('click', () => {
        steps[1].classList.remove('active');
        steps[0].classList.add('active');
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        const notes = document.getElementById('notes').value;
        const date = selectedDateElement.textContent;
        const time = selectedTimeElement.textContent;

        // Set confirmation details
        confirmNameElement.textContent = name;
        confirmDateElement.textContent = date;
        confirmTimeElement.textContent = time;
        confirmDeptElement.textContent = document.getElementById('department').options[document.getElementById('department').selectedIndex].text;
        confirmEmailElement.textContent = email;

        // Show confirmation modal
        confirmationModal.classList.add('active');

        // Reset form
        form.reset();
        selectedDateElement.textContent = 'Not selected';
        selectedTimeElement.textContent = 'Not selected';
        steps[1].classList.remove('active');
        steps[0].classList.add('active');

        // Reset calendar selection
        const selectedCells = document.querySelectorAll('.day-cell.selected');
        selectedCells.forEach(cell => cell.classList.remove('selected'));

        // Reset time slots selection
        const selectedSlots = document.querySelectorAll('.time-slot.selected');
        selectedSlots.forEach(slot => slot.classList.remove('selected'));
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        confirmationModal.classList.remove('active');
    });

    // Initialize
    initCalendar();
});

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const plusIcon = item.querySelector('.plus');
        const minusIcon = item.querySelector('.minus');

        question.addEventListener('click', () => {
            // Toggle current item
            const isOpening = !item.classList.contains('active');

            // Close all others if opening this one
            if (isOpening) {
                document.querySelectorAll('.faq-item.active').forEach(openItem => {
                    openItem.classList.remove('active');
                    openItem.querySelector('.faq-answer').style.maxHeight = '0';
                    openItem.querySelector('.plus').style.display = 'block';
                    openItem.querySelector('.minus').style.display = 'none';
                });
            }

            // Toggle current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                plusIcon.style.display = 'none';
                minusIcon.style.display = 'block';
            } else {
                answer.style.maxHeight = '0';
                plusIcon.style.display = 'block';
                minusIcon.style.display = 'none';
            }
        });

        // Initialize closed state
        answer.style.maxHeight = '0';
        plusIcon.style.display = 'block';
        minusIcon.style.display = 'none';
    });

    // Keyboard accessibility
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
});

// Form Submission Handling
document.getElementById('inquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to your server
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});

// Social media hover effects
document.querySelectorAll('.social-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.querySelector('img').style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseleave', function () {
        this.querySelector('img').style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const form = document.getElementById('quoteForm');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const progressBar = document.querySelector('.progress-bar');
    const stepCircles = document.querySelectorAll('.step-circle');
    const confirmationModal = document.querySelector('.confirmation-modal');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const confirmEmail = document.getElementById('confirm-email');

    // Review elements
    const reviewName = document.getElementById('review-name');
    const reviewEmail = document.getElementById('review-email');
    const reviewPhone = document.getElementById('review-phone');
    const reviewCompany = document.getElementById('review-company');
    const reviewProducts = document.getElementById('review-products');
    const reviewRequest = document.getElementById('review-request');

    // Current step
    let currentStep = 1;

    // Next button functionality
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Validate current step before proceeding
            if (currentStep === 1) {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;

                if (!name || !email || !phone) {
                    alert('Please fill in all required fields');
                    return;
                }
            } else if (currentStep === 2) {
                const products = document.querySelectorAll('input[name="products[]"]:checked');
                const request = document.getElementById('request').value;

                if (products.length === 0 || !request) {
                    alert('Please select at least one product and describe your requirements');
                    return;
                }
            }

            // Update review summary
            if (currentStep === 2) {
                updateReviewSummary();
            }

            // Move to next step
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep].classList.add('active');
            currentStep++;

            // Update progress bar and steps
            updateProgress();
        });
    });

    // Previous button functionality
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep - 2].classList.add('active');
            currentStep--;

            // Update progress bar and steps
            updateProgress();
        });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // In a real implementation, you would send the form data to your server here
        // For demonstration, we'll just show the confirmation modal

        // Set confirmation email
        confirmEmail.textContent = document.getElementById('email').value;

        // Show modal
        confirmationModal.classList.add('active');

        // Reset form (optional)
        // form.reset();
        // currentStep = 1;
        // updateProgress();
        // steps.forEach((step, index) => {
        //   step.classList.toggle('active', index === 0);
        // });
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        confirmationModal.classList.remove('active');
    });

    // Update progress bar and steps
    function updateProgress() {
        // Update progress bar width
        const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Update step circles
        stepCircles.forEach((circle, index) => {
            if (index < currentStep) {
                circle.style.backgroundColor = '#005b96';
                circle.style.color = 'white';
            } else {
                circle.style.backgroundColor = '#e2e8f0';
                circle.style.color = '#64748b';
            }
        });
    }

    // Update review summary
    function updateReviewSummary() {
        // Contact info
        reviewName.textContent = document.getElementById('name').value;
        reviewEmail.textContent = document.getElementById('email').value;
        reviewPhone.textContent = document.getElementById('phone').value;
        reviewCompany.textContent = document.getElementById('company').value || 'Not provided';

        // Products
        reviewProducts.innerHTML = '';
        const products = document.querySelectorAll('input[name="products[]"]:checked');
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product.value;
            reviewProducts.appendChild(li);
        });

        // Request
        reviewRequest.textContent = document.getElementById('request').value;
    }
});
// Job Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter jobs
        const filter = this.dataset.filter;
        document.querySelectorAll('.job-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider Navigation
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialize
showTestimonial(0);