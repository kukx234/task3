class SwiperContainer extends HTMLElement {
    constructor() {
        super();
        this.element = this;
        this.default_config = {
            slidesPerView: 1,
            pagination: {
              el: '.swiper-pagination',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            scrollbar: {
              el: '.swiper-scrollbar',
            },
        };

        let config = this.element.getAttribute('data-config');
        if (config) {
            try {
                config = JSON.parse(config);
            } catch (error) {
                console.error('Invalid JSON in data-config attribute', error);
            }
        }

        this.config = { ...this.default_config, ...config };
    }

    async connectedCallback() {
        const { default: Swiper } = await import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs');
        this.element.innerHTML += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>';
        const swiper = new Swiper(this.element, this.config);
        swiper.on('slideChangeTransitionEnd', function () {
            console.log('Active index:' + this.activeIndex);
        });

        setTimeout(() => {
            this.element.nextElementSibling.classList.add('hidden');
        }, 100);
    }


}

customElements.define('swiper-container', SwiperContainer);
