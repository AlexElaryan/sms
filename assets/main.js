document.addEventListener('DOMContentLoaded', function () {

  // ✅ MOBILE MENU 
  document.querySelectorAll('.bars_menu').forEach(menu => {
    menu.addEventListener('click', e => {
      e.preventDefault();
      const isActive = menu.classList.toggle('active');
      const mobileMenu = document.querySelector('.mobile_menu');
      if (mobileMenu) mobileMenu.classList.toggle('show');
      document.body.classList.toggle('hidden', isActive);
    });
  });

  // ✅ initMagicScroll GORIZONTAL SCROLL ABOUT HTML
  if (typeof jQuery !== 'undefined') {
    initMagicScroll();
  }
  function initMagicScroll() {
    const groups = [];
    $('.uc-rightscroll, .uc-leftscroll').each(function () {
      if ($(this).prev().hasClass('uc-rightscroll') && $(this).hasClass('uc-rightscroll')) {
        groups[groups.length - 1].$els = groups.at(-1).$els.add($(this));
        return;
      }

      if ($(this).prev().hasClass('uc-leftscroll') && $(this).hasClass('uc-leftscroll')) {
        groups[groups.length - 1].$els = groups.at(-1).$els.add($(this));
        return;
      }

      groups.push({
        $els: $(this),
        options: {
          dir: $(this).hasClass('uc-leftscroll') ? 'left' : 'right'
        }
      });
    });

    const map = {};
    for (let group of groups) {
      const id = 'uc' + Date.now();
      map[id] = group;
      const extraStyle = group.options.dir === 'right' ? `left: -${group.$els.length - 1}00vw; flex-direction: row-reverse;` : '';
      group
        .$els
        .css({
          flex: '0 0 100vw',
        })
        .wrapAll(`<div id="pin-${id}" style="overflow: hidden; width: 100vw; height: 100vh;"><div id="${id}" style="display: flex; width: ${group.$els.length}00vw; height: 100%; position: relative; ${extraStyle}"></div></div>`);
    }

    const controller = new ScrollMagic.Controller();

    for (let id in map) {
      const delta = 100 - 100 / map[id].$els.length;
      const sign = (map[id].options.dir === 'left') ? '-' : '';
      const animation = new TimelineMax().to(`#${id}`, 1, { x: `${sign}${delta}%`, ease: Linear.easeNone });

      new ScrollMagic.Scene({
        triggerElement: `#pin-${id}`,
        triggerHook: "onLeave",
        duration: `${map[id].$els.length}00%`
      })
        .setPin(`#pin-${id}`)
        .setTween(animation)
        .addTo(controller);
    }
  }


  // ✅ MOBILE MENU ichidagi <a> bosilganda menyu faqat oddiy linklarda yopiladi
  const mobileMenu = document.querySelector('.mobile_menu');
  if (mobileMenu) {
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', e => {
        const hasSubmenu = link.hasAttribute('data-submenu');
        if (hasSubmenu) {
          // submenu bo‘lsa — menyu yopilmaydi ❌
          e.preventDefault();
          return;
        }

        // submenu bo‘lmasa — menyu yopiladi ✅
        mobileMenu.classList.remove('show');
        document.querySelectorAll('.bars_menu').forEach(menu => {
          menu.classList.remove('active');
        });
        document.body.classList.remove('hidden');
      });
    });
  }

  // ✅ LANGUAGE TOGGLE
  document.querySelectorAll('.language_toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      toggle.classList.toggle('active');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.language_toggle.active').forEach(active => {
      active.classList.remove('active');
    });
  });

  // ✅ LANGUAGE DROPDOWN SELECTION
  document.querySelectorAll('.language_dropdown li').forEach(lang => {
    lang.addEventListener('click', e => {
      const selectedLang = e.target.getAttribute('data-lang');
      if (selectedLang) {
        alert("Выбранный язык: " + selectedLang.toUpperCase());
        // Til o'zgarishi logikasi shu yerga yoziladi
      }
    });
  });

  // ✅ FOOTER LANGUAGE SWITCH
  const languageOrder = ["RU", "EN", "UZ", "BY"];
  document.querySelectorAll('.lang-toggle').forEach(toggle => {
    const label = toggle.querySelector('.lang-label');
    if (label) {
      toggle.addEventListener('click', () => {
        const currentLang = label.textContent.trim();
        const currentIndex = languageOrder.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languageOrder.length;
        label.textContent = languageOrder[nextIndex];
      });
    }
  });


  // ✅ GLIGHTBOX
  (function () {
    try {
      if (typeof GLightbox === 'function') {
        // Har bir noyob data-gallery qiymatini to‘plash
        const galleryElements = document.querySelectorAll('.glightbox[data-gallery]');
        const uniqueGalleries = new Set();

        galleryElements.forEach(el => {
          const galleryName = el.getAttribute('data-gallery');
          if (galleryName) uniqueGalleries.add(galleryName);
        });

        if (uniqueGalleries.size === 0) {
          console.warn('Элементы .glightbox[data-gallery] не найдены.');
          return;
        }

        // Har bir noyob gallery uchun GLightbox yaratamiz
        uniqueGalleries.forEach(galleryName => {
          const selector = `.glightbox[data-gallery="${galleryName}"]`;
          const matchingElements = document.querySelectorAll(selector);

          if (matchingElements.length > 0) {
            GLightbox({
              selector: selector,
              autoplayVideos: false,
              moreText: ''
            });
            console.log(`GLightbox initialized for gallery: ${galleryName}`);
          } else {
            console.warn(`Elementlar topilmadi: ${selector}`);
          }
        });

      } else {
        console.warn('GLightbox aniqlanmadi yoki funksiya emas.');
      }
    } catch (error) {
      console.error('GLightbox ishga tushirishda xatolik:', error);
    }
  })();


  document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const accordionContent = button.nextElementSibling;

      button.classList.toggle('active');

      if (button.classList.contains('active')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      } else {
        accordionContent.style.maxHeight = 0;
      }

      // Close other open accordion items
      document.querySelectorAll('.accordion-header').forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.classList.remove('active');
          otherButton.nextElementSibling.style.maxHeight = 0;
        }
      });
    });
  });

  // new code 05.10 start
  // SUBMENU
  const menuLinks = document.querySelectorAll(".header_menu.desc li a[data-submenu]");
  const submenuContainer = document.querySelector(".unique_submenu_container");

  if (!menuLinks.length || !submenuContainer) return; // tekshiruv ✅

  menuLinks.forEach(link => {
    link.addEventListener("mouseenter", e => {
      if (!submenuContainer) return; // tekshiruv ✅

      const target = e.currentTarget.getAttribute("data-submenu");
      const targetBlock = submenuContainer.querySelector(`.unique_submenu_block[data-submenu="${target}"]`);

      // Agar kerakli submenu yo‘q bo‘lsa, chiqmasin
      if (!targetBlock) {
        submenuContainer.classList.remove("active");
        return;
      }

      // Container ochilsin
      submenuContainer.classList.add("active");

      // Hammasini yopamiz
      submenuContainer.querySelectorAll(".unique_submenu_block").forEach(block => {
        block.classList.remove("active");
      });

      // Faqat keraklisini ochamiz
      targetBlock.classList.add("active");
    });

    // Mobil uchun click
    link.addEventListener("click", e => {
      if (window.innerWidth < 992) {
        e.preventDefault();

        const target = e.currentTarget.getAttribute("data-submenu");
        const targetBlock = submenuContainer.querySelector(`.unique_submenu_block[data-submenu="${target}"]`);

        // Agar submenu yo‘q bo‘lsa, hech narsa qilinmasin
        if (!targetBlock) {
          submenuContainer.classList.remove("active");
          return;
        }

        submenuContainer.classList.toggle("active");

        submenuContainer.querySelectorAll(".unique_submenu_block").forEach(block => {
          block.classList.remove("active");
        });

        targetBlock.classList.add("active");
      }
    });
  });

  // Hoverdan chiqqanda yopish (faqat desktopda)
  submenuContainer.addEventListener("mouseleave", () => {
    submenuContainer.classList.remove("active");
  });


  // MOBILE
  const menuLinksMob = document.querySelectorAll(".header_menu.mob li a[data-submenu]");
  const submenuBlocks = document.querySelectorAll(".mobile_menu .unique_submenu_block");

  menuLinksMob.forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const target = link.getAttribute("data-submenu");
        const targetBlock = document.querySelector(`.mobile_menu .unique_submenu_block[data-submenu="${target}"]`);

        // Boshqa aktivlarni yopamiz
        submenuBlocks.forEach(block => {
          if (block !== targetBlock) block.classList.remove("active");
        });

        // Shu bosilganni ochib-yopamiz
        targetBlock.classList.toggle("active");
      }
    });
  });

  // ✅ ADVANTAGES SWIPER
  if (typeof Swiper !== 'undefined' && document.querySelector(".advantages_swiper")) {
    new Swiper(".advantages_swiper", {
      spaceBetween: 30,
      navigation: {
        nextEl: ".advantages_btn_next",
        prevEl: ".advantages_btn_prev",
      },
      breakpoints: {
        1300: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 15,
        },
        370: {
          slidesPerView: 1.3,
          spaceBetween: 15,
        },
      },
    });
  }


  // ✅ STAGES SWIPER SMS HTML
  if (typeof Swiper !== 'undefined' && document.querySelector(".stages_swiper")) {
    new Swiper(".stages_swiper", {
      spaceBetween: 15,
      navigation: false,
      breakpoints: {
        1230: {
          slidesPerView: 5,
        },
        1024: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2.5,
        },
        640: {
          slidesPerView: 1.5,
        },
        370: {
          slidesPerView: 1.5,
        },
      },
    });
  }


  // ✅ STAGES SWIPER PUSH HTML
  if (typeof Swiper !== 'undefined' && document.querySelector(".stages_swiper_push")) {
    new Swiper(".stages_swiper_push", {
      spaceBetween: 15,
      navigation: false,
      breakpoints: {
        1230: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 3.5,
        },
        992: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2.5,
        },
        640: {
          slidesPerView: 1.5,
        },
        370: {
          slidesPerView: 1.5,
        },
      },
    });
  }


  // ✅ STAGES SWIPER MOBILE ID HTML
  if (typeof Swiper !== 'undefined' && document.querySelector(".mobile_id_swiper")) {
    new Swiper(".mobile_id_swiper", {
      spaceBetween: 15,
      navigation: false,
      breakpoints: {
        1230: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 3.5,
        },
        992: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2.5,
        },
        640: {
          slidesPerView: 1.5,
        },
        370: {
          slidesPerView: 1.5,
        },
      },
    });
  }

  // connect_platform_stages
  // ✅ STAGES SWIPER MAILING UZB HTML
  if (typeof Swiper !== 'undefined' && document.querySelector(".connect_platform_stages")) {
    new Swiper(".connect_platform_stages", {
      spaceBetween: 15,
      navigation: false,
      breakpoints: {
        1230: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2.5,
        },
        640: {
          slidesPerView: 1.5,
        },
        370: {
          slidesPerView: 1.5,
        },
      },
    });
  }
  
  // ✅ CUSTOM TABS
  const tabGroups = document.querySelectorAll('.custom-tabs[data-tab-group]');
  if (tabGroups.length) {
    tabGroups.forEach(group => {
      const buttons = group.querySelectorAll('.tab-btn');
      const contents = group.querySelectorAll('.tab-content');
      buttons.forEach(button => {
        button.addEventListener('click', function () {
          const tab = this.dataset.tab;
          if (!tab) return;
          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          contents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.content === tab) {
              content.classList.add('active');
            }
          });
        });
      });
    });
  }

  // ✅ ARTICLES SWIPER
  if (typeof Swiper !== 'undefined' && document.querySelector(".articles_block .swiper")) {
    new Swiper(".articles_block .swiper", {
      spaceBetween: 30,
      navigation: {
        nextEl: ".articles_btn_next",
        prevEl: ".articles_btn_prev",
      },
      breakpoints: {
        1300: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
      },
    });
  }

  // ✅ LICENSES SWIPER
  if (typeof Swiper !== 'undefined' && document.querySelector(".license_swiper")) {
    new Swiper(".license_swiper", {
      spaceBetween: 30,
      pagination: {
        el: '.license_swiper .pagination',
        clickable: true,
      },
      navigation: false,
      breakpoints: {
        1230: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        375: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
      },
    });
  }

  // ✅ HISTORY SWIPER
  if (typeof Swiper !== 'undefined' && document.querySelector(".history_swiper")) {
    const historySwiper = new Swiper(".history_swiper", {
      spaceBetween: 30,
      pagination: {
        el: '.history_swiper .pagination',
        clickable: true,
      },
      navigation: false,
      breakpoints: {
        1230: { slidesPerView: 3, spaceBetween: 30 },
        992: { slidesPerView: 2.5, spaceBetween: 15 },
        640: { slidesPerView: 1.6, spaceBetween: 15 },
        375: { slidesPerView: 1.3, spaceBetween: 15 },
        0: { slidesPerView: 1, spaceBetween: 15 },
      },
      on: {
        slideChange: function () {
          updateActiveYearDot(historySwiper.activeIndex);
        }
      }
    });

    // Yillar uchun tugmalar
    const yearButtons = document.querySelectorAll('.history__dot');
    const slides = document.querySelectorAll('.history_swiper .swiper-slide');

    function updateActiveYearDot(index) {
      const currentYear = slides[index]?.querySelector('h3')?.innerText;
      yearButtons.forEach(btn => {
        if (btn.dataset.year === currentYear) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    yearButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const year = button.dataset.year;
        let targetIndex = [...slides].findIndex(slide =>
          slide.querySelector('h3')?.innerText === year
        );
        if (targetIndex !== -1) {
          historySwiper.slideTo(targetIndex);
          updateActiveYearDot(targetIndex);
        }
      });
    });
  }


  // ✅ APP PUSH - PUSH HTML and APP PUSH HTML
  // ✅ App Push – Universal script for dynamic image switching
  document.querySelectorAll(".app_push_block").forEach((block) => {
    const features = block.querySelectorAll(".feature");
    const pushPhoneImages = [
      "./assets/imgs/app_push_1.png",
      "./assets/imgs/app_push_2.png",
      "./assets/imgs/app_push_3.png",
    ];

    const appPushPhoneImages = [
      "./assets/imgs/push_app_1.png",
      "./assets/imgs/push_app_2.png",
      "./assets/imgs/push_app_3.png",
      "./assets/imgs/push_app_4.png",
      "./assets/imgs/push_app_5.png",
      "./assets/imgs/push_app_6.png",
    ];

    // .push-phone-img elementlar ko‘p bo‘lishi mumkin — NodeList sifatida olish kerak
    const phoneImgList1 = block.querySelectorAll(".push-phone-img-one");
    const phoneImgList2 = block.querySelectorAll(".app-push-phone-img");

    if (!features.length) return;

    features.forEach((feature, index) => {
      feature.addEventListener("mouseenter", () => {
        // active klassni faqat bitta elementda saqlaymiz
        features.forEach(f => f.classList.remove("active"));
        feature.classList.add("active");

        // Barcha push-phone-img rasmlarini almashtiramiz
        phoneImgList1.forEach((img) => {
          if (pushPhoneImages[index]) img.src = pushPhoneImages[index];
        });

        // Barcha app-push-phone-img rasmlarini almashtiramiz
        phoneImgList2.forEach((img) => {
          if (appPushPhoneImages[index]) img.src = appPushPhoneImages[index];
        });
      });
    });
  });


  



  document.querySelectorAll('.blue_td').forEach((el) => {
    el.addEventListener('click', () => {
      // 1. Shu .blue_td elementning data-td qiymatini olamiz
      const dataId = el.getAttribute('data-td');

      // 2. O‘ziga toggle qilish
      el.classList.toggle('active');

      // 3. Shu data-td ga teng bo‘lgan barcha .open_info larni topib, toggle qilish
      document.querySelectorAll(`.open_info[data-td='${dataId}']`).forEach(infoRow => {
        infoRow.classList.toggle('active');
      });
    });
  });




  const pushItems = document.querySelectorAll('.app_push_mob_item');

  if (pushItems.length > 0) {
    pushItems.forEach(item => {
      item.addEventListener('click', () => {
        // 1. Avval hamma itemdan classlarni olib tashlaymiz
        pushItems.forEach(el => {
          el.classList.remove('active');
          const feature = el.querySelector('.feature');
          const img = el.querySelector('.app_push_mob_img');
          if (feature) feature.classList.remove('active');
          if (img) img.classList.remove('show');
        });

        // 2. Keyin faqat bosilgan itemga classlarni qo‘shamiz
        item.classList.add('active');
        const thisFeature = item.querySelector('.feature');
        const thisImg = item.querySelector('.app_push_mob_img');
        if (thisFeature) thisFeature.classList.add('active');
        if (thisImg) thisImg.classList.add('show');
      });
    });
  }

  // new code 05.10 end


// new new code 07.10 start
  // LANGUAGE DROPDOWN
  const langDropdown = document.querySelector(".custom_lang_dropdown");
  if (langDropdown) {
    const trigger = langDropdown.querySelector(".lang_trigger");
    const list = langDropdown.querySelector(".lang_list");
    const items = langDropdown.querySelectorAll(".lang_list li");

    if (trigger && list && items.length) {
      // Tugmani bosganda ochish / yopish
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        trigger.classList.toggle("active");
        list.classList.toggle("active");
      });

      // Tanlov qilganda text o‘zgartirish
      items.forEach(item => {
        item.addEventListener("click", () => {
          const code = item.querySelector("b")?.textContent || "";
          trigger.querySelector("span").textContent = code;
          list.classList.remove("active");
          trigger.classList.remove("active");
        });
      });

      // Tashqariga bosganda yopish
      document.addEventListener("click", (e) => {
        if (!langDropdown.contains(e.target)) {
          list.classList.remove("active");
          trigger.classList.remove("active");
        }
      });
    }
  }


  // MODALS JS
  const overlay = document.querySelector(".modal-overlay");
  const modalForm = document.querySelector(".modal-form");
  const modalThanks = document.querySelector(".modal-thanks");
  const openBtns = document.querySelectorAll(".open-modal");

  if (overlay && modalForm && modalThanks && openBtns.length > 0) {
    const closeBtns = document.querySelectorAll(".modal-close");
    const backBtn = modalThanks?.querySelector(".btn-close");
    const formM = modalForm?.querySelector(".js-validate-form");

    // ✅ Modalni ochish
    openBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (!overlay || !modalForm) return;
        overlay.style.display = "block";
        modalForm.classList.add("active");
        document.body.classList.add("hidden");
      });
    });

    // ✅ Yopish funksiyasi
    function closeAll() {
      if (!overlay || !modalForm || !modalThanks) return;
      overlay.style.display = "none";
      modalForm.classList.remove("active");
      modalThanks.classList.remove("active");
      document.body.classList.remove("hidden");
    }

    closeBtns.forEach(btn => btn.addEventListener("click", closeAll));
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeAll();
    });

    // ✅ Telefon inputmask (bor-yo‘qligini tekshirib)
    const telInput = modalForm?.querySelector(".js-tel-input");
    if (telInput && typeof Inputmask !== "undefined") {
      const mask = new Inputmask("+9(999)999-99-99");
      mask.mask(telInput);
    }

    // ✅ Chekbox bilan submit tugmasini boshqarish
    const agreeCheckbox = formM?.querySelector('input[name="agree"]');
    const submitBtn = formM?.querySelector('.btn-submit');

    if (agreeCheckbox && submitBtn) {
      submitBtn.disabled = true; // Dastlab tugma bloklanadi
      agreeCheckbox.addEventListener("change", () => {
        submitBtn.disabled = !agreeCheckbox.checked;
      });
    }

    // ✅ Forma tekshiruvi
    if (formM) {
      formM.addEventListener("submit", e => {
        e.preventDefault();
        let isValid = true;

        const inputs = formM.querySelectorAll("input[required]");
        inputs.forEach(input => {
          input.classList.remove("error");
          if (input.type === "checkbox" && !input.checked) {
            input.classList.add("error");
            isValid = false;
          } else if (input.type !== "checkbox" && input.value.trim() === "") {
            input.classList.add("error");
            isValid = false;
          }
        });

        if (!isValid) return;

        // ✅ To‘g‘ri bo‘lsa — forma yopiladi, rahmat oynasi ochiladi
        modalForm.classList.remove("active");
        modalThanks.classList.add("active");
        formM.reset();
        if (submitBtn) submitBtn.disabled = true; // resetdan keyin yana bloklanadi
      });
    }

    // ✅ "Назад" tugmasi
    if (backBtn) {
      backBtn.addEventListener("click", closeAll);
    }
  }



  // ANY QUESTION SECTIONDAGI FORM
  const feedbackSection = document.querySelector('.feedback_section');
  if (!feedbackSection) return;

  const feedbackForm = feedbackSection.querySelector('.feedback_form');
  const feedbackPhone = feedbackSection.querySelector('.feedback_phone');
  const feedbackAgree = feedbackSection.querySelector('.feedback_agree');
  const feedbackBtn = feedbackSection.querySelector('.feedback_btn');

  // ✅ Telefon inputmask (agar kutubxona bor bo‘lsa)
  if (feedbackPhone && typeof Inputmask !== 'undefined') {
    const mask = new Inputmask("+9(999)999-99-99");
    mask.mask(feedbackPhone);
  }

  // ✅ Checkbox bosilmaguncha button disabled
  if (feedbackAgree && feedbackBtn) {
    feedbackAgree.addEventListener('change', () => {
      feedbackBtn.disabled = !feedbackAgree.checked;
      feedbackBtn.style.cursor = feedbackAgree.checked ? 'pointer' : 'not-allowed';
      feedbackBtn.style.opacity = feedbackAgree.checked ? '1' : '0.6';
    });
  }

  // ✅ Forma yuborish
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => {
      if (!feedbackForm.checkValidity()) {
        e.preventDefault(); // ❌ forma bo‘sh bo‘lsa yubormaydi
        feedbackForm.reportValidity(); // 🔸 HTML5 ogohlantirish chiqaradi
        return;
      }
      console.log('✅ Forma yuborildi');
      feedbackForm.reset();
      feedbackBtn.disabled = true;
      feedbackBtn.style.cursor = 'not-allowed';
      feedbackBtn.style.opacity = '0.6';
    });
  }

  // TESTING VIBER FORM - VIBER BUSINESS HTML
  const form = document.querySelector(".form");
  if (!form) return;

  const phoneInput = form.querySelector('input[name="phone"]');
  const checkbox = form.querySelector('input[name="agree"]');
  const submitBtn = form.querySelector("button");

  const validate = () => {
    const phoneFilled = phoneInput && phoneInput.value.trim() !== "";
    const isChecked = checkbox && checkbox.checked;
    submitBtn.disabled = !(phoneFilled && isChecked);
  };

  phoneInput?.addEventListener("input", validate);
  checkbox?.addEventListener("change", validate);

  validate(); // dastlabki holatda tekshir

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    alert("Forma yuborildi!");
    // Yuborish lozim bo‘lsa, bu yerga fetch/ajax qo‘shing
  });

  const telInput = document.querySelector('input[type="tel"]');

  if (telInput && typeof Inputmask !== "undefined") {
    const mask = new Inputmask("+9(999)999-99-99");
    mask.mask(telInput);
  }


  const header = document.querySelector("header");
  const firstSection = header.nextElementSibling;

  if (firstSection && firstSection.tagName.toLowerCase() === "section") {
    firstSection.classList.add("after-header");
  }


  

  
// new new code 07.10 end


  



  

  



  





  




  




  






  


  


});
