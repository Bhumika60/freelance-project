document.addEventListener('DOMContentLoaded', function () {
    // Menu button Javascript==============
    const menuBtn = document.querySelector('.menu__btn');
    const menuIcon = document.querySelector('.bx-menu');
    const closeIcon = document.querySelector('.bx-x');
    const navLinks = document.querySelector('.app__navbar-links');

    menuBtn.addEventListener('click', function () {
        if (navLinks.style.left === '0px') {
            navLinks.style.left = '-100%';
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            navLinks.style.left = '0';
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    });

    // Slider javascript==============
    const slider = document.querySelector('.slider');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.card');
    let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap); // card width + gap

    function getVisibleCardsCount() {
        const containerWidth = slider.offsetWidth;
        return Math.floor(containerWidth / cardWidth);
    }

    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('red-dot');
                dot.classList.remove('black-dot');
            } else {
                dot.classList.add('black-dot');
                dot.classList.remove('red-dot');
            }
        });
    }

    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const visibleCards = getVisibleCardsCount();
        const activeIndex = Math.floor(scrollLeft / (cardWidth * visibleCards));
        updateDots(activeIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            const targetScrollLeft = index * cardWidth * 3;
            slider.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });

            setTimeout(() => {
                updateDots(index);
            }, 500);
        });
    });

    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap);
        const visibleCards = getVisibleCardsCount();
        const activeIndex = Math.floor(slider.scrollLeft / (cardWidth * visibleCards));
        updateDots(activeIndex);
    });

    const initialVisibleCards = getVisibleCardsCount();
    const initialActiveIndex = Math.floor(slider.scrollLeft / (cardWidth * initialVisibleCards));
    updateDots(initialActiveIndex);

    // Image gallery Javascript==============
    const contentItems = document.querySelectorAll('.desc');
    const imageElement = document.querySelector('.left img');
    let currentIndex = 0;

    contentItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageSrc = item.getAttribute('data-image');
            imageElement.src = imageSrc;

            contentItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
        });
    });

    function changeImage() {
        contentItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % contentItems.length;
        const nextImageSrc = contentItems[currentIndex].getAttribute('data-image');
        imageElement.src = nextImageSrc;
        contentItems[currentIndex].classList.add('active');
    }

    setInterval(changeImage, 3000);
});

// jquery for Popup and close form ==========================

$(document).ready(function() {
    const contactBtn = $('#contactBtn');
    const popupForm = $('#popupForm');
    const closeBtn = $('.close-btn');

    contactBtn.click(function() {
        popupForm.css('display', 'block');
    });

    closeBtn.click(function() {
        popupForm.css('display', 'none');
    });

    $(window).click(function(event) {
        if ($(event.target).is(popupForm)) {
            popupForm.css('display', 'none');
        }
    });
});

