class ImageSlider {

    constructor(selector) {

        this.slider = document.querySelector(selector);

        this.track = this.slider.querySelector('.slider-track');

        this.slides = Array.from(this.track.children);

        this.prevButton = this.slider.querySelector('.prev');

        this.nextButton = this.slider.querySelector('.next');

        this.currentIndex = 0;

        this.timer = null;

        this.init();
    }


    init() {

        this.createDots();

        this.bindEvents();

        this.updateSlidePosition();

        this.startAutoSlide();
    }


    // ================= MOVE SLIDE =================

    updateSlidePosition() {

        const offset = this.currentIndex * 100;

        this.track.style.transform = `translateX(-${offset}%)`;

        this.updateDots();
    }


    // ================= NEXT =================

    nextSlide() {

        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.updateSlidePosition();
    }


    // ================= PREVIOUS =================

    prevSlide() {

        if (this.currentIndex > 0) {

            this.currentIndex--;

        } else {

            this.currentIndex = this.slides.length - 1;
        }

        this.updateSlidePosition();
    }


    // ================= DOTS =================

    createDots() {

        this.dotsContainer = document.createElement('div');

        this.dotsContainer.classList.add('dots');

        this.dots = [];


        this.slides.forEach((_, index) => {

            const dot = document.createElement('span');

            dot.classList.add('dot');


            dot.addEventListener('click', () => {

                this.currentIndex = index;

                this.updateSlidePosition();

                // Restart 5-second timer
                this.startAutoSlide();
            });


            this.dotsContainer.appendChild(dot);

            this.dots.push(dot);
        });


        // Put dots BELOW the slider
        this.slider.insertAdjacentElement(
            'afterend',
            this.dotsContainer
        );
    }


    // ================= ACTIVE DOT =================

    updateDots() {

        this.dots.forEach((dot, index) => {

            if (index === this.currentIndex) {

                dot.classList.add('active');

            } else {

                dot.classList.remove('active');
            }
        });
    }


    // ================= AUTO SLIDE =================

    startAutoSlide() {

        // Stop existing timer first
        clearInterval(this.timer);

        // Change slide every 5 seconds
        this.timer = setInterval(() => {

            this.nextSlide();

        }, 5000);
    }


    // ================= MOUSE EVENTS =================

    bindEvents() {

        // Next button
        this.nextButton.addEventListener('click', () => {

            this.nextSlide();

            this.startAutoSlide();
        });


        // Previous button
        this.prevButton.addEventListener('click', () => {

            this.prevSlide();

            this.startAutoSlide();
        });


        // STOP when mouse enters slider
        this.slider.addEventListener('mouseenter', () => {

            clearInterval(this.timer);
        });


        // START again when mouse leaves slider
        this.slider.addEventListener('mouseleave', () => {

            this.startAutoSlide();
        });
    }
}


// ================= START SLIDER =================

document.addEventListener('DOMContentLoaded', () => {

    new ImageSlider('.slider');

});