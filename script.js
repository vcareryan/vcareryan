// NexusFlow Services LLP - Landing Page JavaScript
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item');

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(function(otherItem) {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== FORM VALIDATION =====
  const form = document.getElementById('applicationForm');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const errors = [];

      // Get form fields
      const fullName = document.getElementById('fullName');
      const phone = document.getElementById('phone');
      const whatsapp = document.getElementById('whatsapp');
      const age = document.getElementById('age');
      const qualification = document.getElementById('qualification');
      const passport = document.getElementById('passport');
      const state = document.getElementById('state');
      const privacy = document.getElementById('privacy');

      // Reset errors
      document.querySelectorAll('.form-input').forEach(function(input) {
        input.classList.remove('error');
      });
      document.querySelectorAll('.form-error').forEach(function(err) {
        err.style.display = 'none';
      });

      // Validate Full Name
      if (!fullName.value.trim() || fullName.value.trim().length < 3) {
        setError(fullName, 'Please enter your full name (minimum 3 characters)');
        isValid = false;
      }

      // Validate Phone
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        setError(phone, 'Please enter a valid 10-digit phone number');
        isValid = false;
      }

      // Validate WhatsApp
      if (!phoneRegex.test(whatsapp.value.trim())) {
        setError(whatsapp, 'Please enter a valid 10-digit WhatsApp number');
        isValid = false;
      }

      // Validate Age
      const ageVal = parseInt(age.value);
      if (!age.value || ageVal < 18 || ageVal > 55) {
        setError(age, 'Age must be between 18 and 55');
        isValid = false;
      }

      // Validate Qualification
      if (!qualification.value) {
        setError(qualification, 'Please select your qualification');
        isValid = false;
      }

      // Validate Passport
      if (!passport.value) {
        setError(passport, 'Please select passport availability');
        isValid = false;
      }

      // Validate State
      if (!state.value.trim()) {
        setError(state, 'Please enter your state');
        isValid = false;
      }

      // Validate Privacy
      if (!privacy.checked) {
        const privacyError = document.getElementById('privacyError');
        if (privacyError) {
          privacyError.style.display = 'block';
        }
        isValid = false;
      }

      if (isValid) {
        // Show success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Submitting...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(function() {
          submitBtn.innerHTML = '&#10003; Application Submitted Successfully!';
          submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
          
          // Show success toast
          showToast('Application submitted successfully! Our team will contact you soon.', 'success');
          
          // Reset form after delay
          setTimeout(function() {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }, 1500);
      } else {
        showToast('Please fill in all required fields correctly.', 'error');
      }
    });
  }

  function setError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  // ===== TOAST NOTIFICATION =====
  function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 z-[9999] px-6 py-4 rounded-xl shadow-2xl text-white font-medium text-sm max-w-sm transform translate-x-full transition-transform duration-300';
    toast.style.background = type === 'success' 
      ? 'linear-gradient(135deg, #059669, #10b981)' 
      : 'linear-gradient(135deg, #dc2626, #ef4444)';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(function() {
      toast.style.transform = 'translateX(0)';
    });
    
    // Remove after 4 seconds
    setTimeout(function() {
      toast.style.transform = 'translateX(120%)';
      setTimeout(function() {
        toast.remove();
      }, 300);
    }, 4000);
  }

  // ===== LAZY LOADING IMAGES =====
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ===== PHONE AUTO-FORMAT =====
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
  });

  // ===== AGE INPUT RESTRICTION =====
  const ageInput = document.getElementById('age');
  if (ageInput) {
    ageInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '').slice(0, 2);
    });
  }

});
