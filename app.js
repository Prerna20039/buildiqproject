/**
 * BuildIQ Projects — Project Management Consultancy | Architecture | Turnkey Construction
 * Core Application & Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================================
  // 1. Initialize Lucide Icons
  // =============================================================

  if (window.lucide) {
    window.lucide.createIcons();
  }


  // =============================================================
  // 2. Navigation & Sticky Scroll Behavior
  // =============================================================

  const header =
    document.getElementById('main-header');

  const navLinks =
    document.querySelectorAll('.nav-link');

  const sections =
    document.querySelectorAll('section[id]');


  // =============================================================
  // MOBILE MENU ELEMENTS
  // =============================================================

  const mobileMenuBtn =
    document.getElementById('mobile-menu-btn');

  const mobileMenuDrawer =
    document.getElementById('mobile-menu-drawer');

  const closeMobileMenuBtn =
    document.getElementById('close-mobile-menu');


  // =============================================================
  // MOBILE MENU / DRAWER
  // =============================================================

  // Open mobile drawer
  if (mobileMenuBtn && mobileMenuDrawer) {

    mobileMenuBtn.addEventListener('click', () => {

      mobileMenuDrawer.classList.remove('hidden');

      mobileMenuDrawer.classList.add('flex');

      document.body.style.overflow = 'hidden';


      if (window.lucide) {
        window.lucide.createIcons();
      }

    });

  }


  // Close mobile drawer
  if (closeMobileMenuBtn && mobileMenuDrawer) {

    closeMobileMenuBtn.addEventListener('click', () => {

      mobileMenuDrawer.classList.add('hidden');

      mobileMenuDrawer.classList.remove('flex');

      document.body.style.overflow = '';

    });

  }


  // Close drawer when navigation link is clicked
  if (mobileMenuDrawer) {

    const mobileNavLinks =
      mobileMenuDrawer.querySelectorAll('a');


    mobileNavLinks.forEach(link => {

      link.addEventListener('click', () => {

        mobileMenuDrawer.classList.add('hidden');

        mobileMenuDrawer.classList.remove('flex');

        document.body.style.overflow = '';

      });

    });

  }


  // =============================================================
  // CLOSE DRAWER WITH ESC KEY
  // =============================================================

  document.addEventListener('keydown', (e) => {

    if (
      e.key === 'Escape' &&
      mobileMenuDrawer &&
      !mobileMenuDrawer.classList.contains('hidden')
    ) {

      mobileMenuDrawer.classList.add('hidden');

      mobileMenuDrawer.classList.remove('flex');

      document.body.style.overflow = '';

    }

  });


  // =============================================================
  // NAVIGATION SCROLL
  // =============================================================

  window.addEventListener('scroll', () => {

    // -----------------------------------------------------------
    // Sticky header
    // -----------------------------------------------------------

    if (window.scrollY > 40) {

      header?.classList.add('scrolled');

    } else {

      header?.classList.remove('scrolled');

    }


    // -----------------------------------------------------------
    // Detect current section
    // -----------------------------------------------------------

    let currentSectionId = '';

    const scrollPosition =
      window.scrollY + 120;


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;


      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSectionId =
          section.getAttribute('id');

      }

    });


    // -----------------------------------------------------------
    // Update desktop navigation
    // -----------------------------------------------------------

    navLinks.forEach(link => {

      link.classList.remove(
        'text-amber-600',
        'font-semibold'
      );


      if (
        link.getAttribute('href') ===
        `#${currentSectionId}`
      ) {

        link.classList.add(
          'text-amber-600',
          'font-semibold'
        );

      }

    });

  });



  // =============================================================
  // 3. HERO IMAGE SLIDER
  // =============================================================

  const heroSlides =
    document.querySelectorAll('.hero-slide');

  const heroDots =
    document.querySelectorAll('.hero-dot');


  let currentHeroSlide = 0;


  function showHeroSlide(index) {

    // -----------------------------------------------------------
    // Hide all slides
    // -----------------------------------------------------------

    heroSlides.forEach((slide, i) => {

      slide.classList.remove(
        'opacity-100'
      );

      slide.classList.add(
        'opacity-0'
      );


      // ---------------------------------------------------------
      // Reset dots
      // ---------------------------------------------------------

      if (heroDots[i]) {

        heroDots[i].classList.remove(
          'bg-white'
        );

        heroDots[i].classList.add(
          'bg-white/40'
        );

      }

    });


    // -----------------------------------------------------------
    // Show selected slide
    // -----------------------------------------------------------

    if (heroSlides[index]) {

      heroSlides[index].classList.remove(
        'opacity-0'
      );

      heroSlides[index].classList.add(
        'opacity-100'
      );

    }


    // -----------------------------------------------------------
    // Activate selected dot
    // -----------------------------------------------------------

    if (heroDots[index]) {

      heroDots[index].classList.remove(
        'bg-white/40'
      );

      heroDots[index].classList.add(
        'bg-white'
      );

    }

  }


  // -------------------------------------------------------------
  // Start Hero Slider
  // -------------------------------------------------------------

  if (heroSlides.length > 0) {

    showHeroSlide(0);

  }


  if (heroSlides.length > 1) {

    setInterval(() => {

      currentHeroSlide =
        (currentHeroSlide + 1) %
        heroSlides.length;


      showHeroSlide(
        currentHeroSlide
      );

    }, 4000);

  }



  // =============================================================
  // 4. Scroll Reveal Animations
  // =============================================================

  const revealElements =
    document.querySelectorAll(
      '.reveal-on-scroll'
    );


  if ('IntersectionObserver' in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'revealed'
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          root: null,
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px'
        }
      );


    revealElements.forEach(el => {

      revealObserver.observe(el);

    });

  } else {

    // Fallback for older browsers

    revealElements.forEach(el => {

      el.classList.add('revealed');

    });

  }



  // =============================================================
  // 5. Interactive Engineering Dashboard Tabs
  // =============================================================

  const dashboardTabs =
    document.querySelectorAll(
      '.dashboard-tab-btn'
    );

  const dashboardPanels =
    document.querySelectorAll(
      '.dashboard-tab-panel'
    );


  dashboardTabs.forEach(tab => {

    tab.addEventListener('click', () => {

      const targetPanelId =
        tab.getAttribute('data-tab');


      // ---------------------------------------------------------
      // Reset all dashboard tabs
      // ---------------------------------------------------------

      dashboardTabs.forEach(t => {

        t.classList.remove(
          'active',
          'bg-amber-500',
          'text-slate-950',
          'font-bold'
        );


        t.classList.add(
          'bg-white',
          'border',
          'border-slate-200',
          'text-slate-500',
          'font-medium'
        );

      });


      // ---------------------------------------------------------
      // Activate selected tab
      // ---------------------------------------------------------

      tab.classList.add(
        'active',
        'bg-amber-500',
        'text-slate-950',
        'font-bold'
      );


      tab.classList.remove(
        'bg-white',
        'border',
        'border-slate-200',
        'text-slate-500',
        'font-medium'
      );


      // ---------------------------------------------------------
      // Show selected panel
      // ---------------------------------------------------------

      dashboardPanels.forEach(panel => {

        if (
          panel.id === targetPanelId
        ) {

          panel.classList.remove(
            'hidden'
          );

        } else {

          panel.classList.add(
            'hidden'
          );

        }

      });


      if (window.lucide) {

        window.lucide.createIcons();

      }

    });

  });



  // =============================================================
  // 6. Portfolio Category Filter Tabs
  // =============================================================

  const portfolioFilterBtns =
    document.querySelectorAll(
      '.portfolio-filter-btn'
    );

  const projectCards =
    document.querySelectorAll(
      '.project-card'
    );


  portfolioFilterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

      const filterValue =
        btn.getAttribute('data-filter');


      // ---------------------------------------------------------
      // Reset filter buttons
      // ---------------------------------------------------------

      portfolioFilterBtns.forEach(b => {

        b.classList.remove(
          'active',
          'bg-amber-500',
          'text-slate-950',
          'font-bold',
          'shadow-md',
          'shadow-amber-500/20'
        );


        b.classList.add(
          'bg-white',
          'border',
          'border-slate-200',
          'text-slate-500'
        );

      });


      // ---------------------------------------------------------
      // Activate selected filter
      // ---------------------------------------------------------

      btn.classList.add(
        'active',
        'bg-amber-500',
        'text-slate-950',
        'font-bold',
        'shadow-md',
        'shadow-amber-500/20'
      );


      btn.classList.remove(
        'bg-white',
        'border',
        'border-slate-200',
        'text-slate-500'
      );


      // ---------------------------------------------------------
      // Filter project cards
      // ---------------------------------------------------------

      projectCards.forEach(card => {

        const cardCategory =
          card.getAttribute(
            'data-category'
          );


        if (
          filterValue === 'all' ||
          cardCategory === filterValue
        ) {

          card.classList.remove(
            'hidden'
          );

          card.classList.add(
            'flex'
          );

        } else {

          card.classList.add(
            'hidden'
          );

          card.classList.remove(
            'flex'
          );

        }

      });


      if (window.lucide) {

        window.lucide.createIcons();

      }

    });

  });



  // =============================================================
  // 7. Lead Inquiry Form & Consultation Request Handler
  // =============================================================

  const leadForm =
    document.getElementById(
      'consultation-lead-form'
    );

  const formSuccessToast =
    document.getElementById(
      'form-success-toast'
    );

  const uploadInput =
    document.getElementById(
      'drawing-upload'
    );

  const uploadLabel =
    document.getElementById(
      'upload-status-text'
    );

  const waDirectSubmitBtn =
    document.getElementById(
      'whatsapp-direct-submit'
    );


  // =============================================================
  // FILE UPLOAD FEEDBACK
  // =============================================================

  if (
    uploadInput &&
    uploadLabel
  ) {

    uploadInput.addEventListener(
      'change',
      () => {

        if (
          uploadInput.files &&
          uploadInput.files.length > 0
        ) {

          const fileNames =
            Array.from(
              uploadInput.files
            )
            .map(file => file.name)
            .join(', ');


          uploadLabel.textContent =
            `Attached: ${fileNames}`;


          uploadLabel.classList.add(
            'text-amber-600'
          );

        } else {

          uploadLabel.textContent =
            'Click to attach drawings or BOQ files';


          uploadLabel.classList.remove(
            'text-amber-600'
          );

        }

      }
    );

  }



  // =============================================================
  // FORM SUBMISSION
  // =============================================================

  if (leadForm) {

    leadForm.addEventListener(
      'submit',
      (e) => {

        e.preventDefault();


        const submitBtn =
          leadForm.querySelector(
            'button[type="submit"]'
          );


        if (!submitBtn) {
          return;
        }


        const originalBtnText =
          submitBtn.innerHTML;


        submitBtn.disabled = true;


        submitBtn.innerHTML = `
          <span class="inline-flex items-center gap-2 text-slate-950 font-bold">

            <svg
              class="animate-spin h-4 w-4 text-slate-950"
              fill="none"
              viewBox="0 0 24 24"
            >

              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>

              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>

            </svg>

            Submitting Project Scope...

          </span>
        `;


        setTimeout(() => {

          submitBtn.disabled = false;

          submitBtn.innerHTML =
            originalBtnText;


          // -------------------------------------------------------
          // Show success toast
          // -------------------------------------------------------

          if (formSuccessToast) {

            formSuccessToast.classList.remove(
              'hidden'
            );


            formSuccessToast.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });


            setTimeout(() => {

              formSuccessToast.classList.add(
                'hidden'
              );

            }, 8000);

          }


          // -------------------------------------------------------
          // Reset form
          // -------------------------------------------------------

          leadForm.reset();


          if (uploadLabel) {

            uploadLabel.textContent =
              'Click to attach drawings or BOQ files';


            uploadLabel.classList.remove(
              'text-amber-600'
            );

          }

        }, 700);

      }
    );

  }



  // =============================================================
  // 8. WhatsApp Direct Transfer Button
  // =============================================================

  if (waDirectSubmitBtn) {

    waDirectSubmitBtn.addEventListener(
      'click',
      () => {

        const name =
          document.getElementById(
            'lead-name'
          )?.value ||
          'Client';


        const phone =
          document.getElementById(
            'lead-phone'
          )?.value ||
          'Not provided';


        const pLocation =
          document.getElementById(
            'lead-location'
          )?.value ||
          'Not specified';


        const pService =
          document.getElementById(
            'lead-service'
          )?.value ||
          'PMC / Turnkey';


        const pMessage =
          document.getElementById(
            'lead-message'
          )?.value ||
          'Project Discussion';


        const waMessage =
          `*New Project Consultation Inquiry — BuildIQ Projects*\n` +
          `• *Name:* ${name}\n` +
          `• *Phone:* ${phone}\n` +
          `• *Location:* ${pLocation}\n` +
          `• *Service Required:* ${pService}\n` +
          `• *Scope Notes:* ${pMessage}\n\n` +
          `Please connect with me to schedule an initial technical discussion.`;


        window.open(
          `https://wa.me/919820012345?text=${encodeURIComponent(waMessage)}`,
          '_blank'
        );

      }
    );

  }



  // =============================================================
  // 9. Sample Weekly Audit Modal System
  // =============================================================

  const openReportModalBtns =
    document.querySelectorAll(
      '.open-report-modal-btn'
    );

  const closeReportModalBtn =
    document.getElementById(
      'close-report-modal'
    );

  const closeModalBottomBtn =
    document.getElementById(
      'close-modal-bottom'
    );

  const reportModal =
    document.getElementById(
      'sample-report-modal'
    );


  // =============================================================
  // OPEN REPORT MODAL
  // =============================================================

  openReportModalBtns.forEach(btn => {

    btn.addEventListener(
      'click',
      (e) => {

        e.preventDefault();


        if (reportModal) {

          reportModal.classList.remove(
            'hidden'
          );


          document.body.style.overflow =
            'hidden';

        }

      }
    );

  });


  // =============================================================
  // CLOSE REPORT MODAL
  // =============================================================

  const closeReportModal = () => {

    if (reportModal) {

      reportModal.classList.add(
        'hidden'
      );


      document.body.style.overflow =
        '';

    }

  };


  if (closeReportModalBtn) {

    closeReportModalBtn.addEventListener(
      'click',
      closeReportModal
    );

  }


  if (closeModalBottomBtn) {

    closeModalBottomBtn.addEventListener(
      'click',
      closeReportModal
    );

  }


  // Close modal by clicking outside
  if (reportModal) {

    reportModal.addEventListener(
      'click',
      (e) => {

        if (
          e.target === reportModal
        ) {

          closeReportModal();

        }

      }
    );

  }


  // Close modal with Escape
  document.addEventListener('keydown', (e) => {

    if (
      e.key === 'Escape' &&
      reportModal &&
      !reportModal.classList.contains('hidden')
    ) {

      closeReportModal();

    }

  });



  // =============================================================
  // 10. Dynamic Copyright Year
  // =============================================================

  const yearDisplay =
    document.getElementById(
      'year-display'
    );


  if (yearDisplay) {

    yearDisplay.textContent =
      new Date().getFullYear();

  }

});