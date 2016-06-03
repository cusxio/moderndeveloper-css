/* global SVGInjector, Velocity */
/* eslint-disable new-cap */

(function (document) {
    /* ---- Utility Functions ----- */
    /**
     * A function that is used to determine that the DOM is ready for the JavaScript code to execute. "semi-equivalent" to jQuery's .ready().
     *
     */
    function documentReady(cb) {
        document.readyState === "interactive" || document.readyState === "complete" ? cb() : document.addEventListener("DOMContentLoaded", cb);
    }

    documentReady(function () {
        var injectElements = document.querySelectorAll('img.svg');
        SVGInjector(injectElements);

        const placeholderColors = ['#ffd213', '#896f00', '#ffda3a', '#b08e00', '#ffe161', '#ffe575', '#ffec9c', '#d7ae00'];

        const placeholders = document.querySelectorAll('.product, .picture');
        [].forEach.call(placeholders, function (el) {
            const random = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
            const color = placeholderColors[random];
            el.style.backgroundColor = color;
        });

        document.querySelector('#cart').addEventListener('click', function (e) {
            e.preventDefault();
            document.body.style.overflow = 'hidden';
            document.querySelector('.shopping__container').style.display = 'block';
            Velocity(document.querySelector('.shopping__cart--container'), 'fadeIn');
        });

        document.querySelector('.shopping__container .close').addEventListener('click', function () {
            document.body.style.overflow = 'scroll';
            document.querySelector('.shopping__container').style.display = 'none';
        });
    });
})(document);
