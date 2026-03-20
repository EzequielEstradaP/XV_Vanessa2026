/**
 * XV Vanessa Elyssa - Main Script
 * Handles: YouTube Music Player, Countdown, Animations, Particles, and RSVP
 */

let ytPlayer;
let isPlaying = false;

/**
 * YouTube Player API Callback
 */
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: 'vwp1yxtcD7I',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'vwp1yxtcD7I',
            'origin': window.location.origin,
            'enablejsapi': 1,
            'playsinline': 1, // Crucial for iOS/iPhone
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
};

function onPlayerReady(event) {
    console.log("YouTube Audio Player is Ready");
    // Ensure volume is up
    event.target.setVolume(100);
}

function onPlayerStateChange(event) {
    const audioControl = document.getElementById('audio-control');
    const icon = audioControl.querySelector('i');
    
    // Sync UI with player state
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        audioControl.classList.add('playing');
    } else {
        isPlaying = false;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
        audioControl.classList.remove('playing');
    }
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
    // Silent fail, or could show a message
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Control ---
    const audioControl = document.getElementById('audio-control');
    if (audioControl) {
        audioControl.addEventListener('click', () => {
            if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
                if (isPlaying) {
                    ytPlayer.pauseVideo();
                } else {
                    ytPlayer.playVideo();
                }
            } else {
                console.warn("YouTube Player not ready yet");
                alert("El reproductor de música se está cargando, por favor intenta en un momento.");
            }
        });
    }

    // --- Countdown Logic ---
    const ceremonyDate = new Date("April 17, 2026 18:00:00").getTime();
    const eventEndDate = new Date("April 19, 2026 02:00:00").getTime();
    const countdownLabel = document.getElementById('countdown-label');
    const countdownWrapper = document.querySelector('.countdown-wrapper');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        let targetDate = ceremonyDate;

        if (now < ceremonyDate) {
            targetDate = ceremonyDate;
            if (countdownLabel) countdownLabel.textContent = "Faltan";
        } else if (now < eventEndDate) {
            targetDate = eventEndDate;
            if (countdownLabel) countdownLabel.textContent = "El evento finaliza en";
        } else {
            clearInterval(countdownInterval);
            if (countdownLabel) countdownLabel.textContent = "¡Fue un día inolvidable!";
            if (countdownWrapper) {
                countdownWrapper.innerHTML = "<div class='countdown-item'><span class='time'>✨ ¡Ya cumplí mis XV años! ✨</span></div>";
            }
            return;
        }

        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);

    // --- Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-up').forEach(el => observer.observe(el));

    // --- Particles ---
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        if (!particlesContainer) return;
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + Math.random() * 500;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    // --- RSVP Modal ---
    const rsvpModal = document.getElementById('rsvp-modal');
    const openRsvpBtn = document.getElementById('btn-open-rsvp');
    const closeRsvpBtn = document.querySelector('.close-modal');
    const sendWhatsappBtn = document.getElementById('btn-send-whatsapp');

    if (openRsvpBtn) {
        openRsvpBtn.addEventListener('click', () => {
            rsvpModal.classList.add('show');
        });
    }

    if (closeRsvpBtn) {
        closeRsvpBtn.addEventListener('click', () => {
            rsvpModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === rsvpModal) {
            rsvpModal.classList.remove('show');
        }
    });

    if (sendWhatsappBtn) {
        sendWhatsappBtn.addEventListener('click', () => {
            const guestName = document.getElementById('guest-name').value;
            const guestCount = document.getElementById('guest-count').value;

            if (guestName.trim() === "") {
                alert("Por favor escribe tu nombre para confirmar.");
                return;
            }

            const message = `¡Hola! Confirmo mi asistencia a los XV años de Vanessa Elyssa.%0A%0ANombre: ${encodeURIComponent(guestName)}%0AInvitados adicionales: ${guestCount}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=7772339914&text=${message}`;
            
            window.open(whatsappUrl, '_blank');
            rsvpModal.classList.remove('show');
        });
    }
});
