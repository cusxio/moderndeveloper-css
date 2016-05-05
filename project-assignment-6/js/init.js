/* eslint-disable new-cap, no-undef */

$(document).ready(function () {
    var injectElements = document.querySelectorAll('img.svg');
    SVGInjector(injectElements);

    var placeholderColors = ['#ffd213', '#896f00', '#ffda3a', '#b08e00', '#ffe161', '#ffe575', '#ffec9c', '#d7ae00'];

    var placeholders = $('.product, .picture');
    placeholders.each(function (i, el) {
        var random = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
        var color = placeholderColors[random];
        $(el).css({ 'background-color': color });
    });

    $('#cart').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var seq = [
            { e: $(this), p: { opacity: 0, translateX: '-200%' }, o: { duration: 500 } },
            { e: $('.shopping__cart'), p: { translateX: ['0%', '-200%'] }, o: { duration: 500 } },
        ];

        $.Velocity.RunSequence(seq);
    });

    $('.shopping__cart .cart').on('click', function () {
        var seq = [
            { e: $('.shopping__cart'), p: { translateX: ['-200%', '0%'] }, o: { duration: 500 } },
            { e: $('#cart'), p: { opacity: 1, translateX: ['0%', '-200%'] }, o: { duration: 500 } },
        ];
        $.Velocity.RunSequence(seq);
    });

    $('.price').hover(function () {
        $(this).next().velocity({ opacity: 1 });
    });
});
