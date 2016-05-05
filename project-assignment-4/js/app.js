$(document).ready(function () {
    $('.page__control a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('href');
        $('.page__control').find('.active').removeClass('active');
        $(this).find('.dot').addClass('active').siblings().removeClass('active');
        $(target).velocity('scroll', {
            duration: 500,
            easing: 'ease-in-out',
        });
    });

    $(window).scroll(function () {
        var scrollTop = $(document).scrollTop();

        $('.page__control a').each(function () {
            var cur = $(this);
            var target = $(cur.attr('href'));
            if (target.position().top <= scrollTop && target.position().top + target.height() > scrollTop) {
                $('.nav a span').removeClass('active');
                cur.find('span').addClass('active');
            } else {
                cur.find('span').removeClass('active');
            }
        });
    });
});
