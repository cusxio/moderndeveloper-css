$(document).ready(function () {
    var sliders = $('#r, #g, #b, #a');
    sliders.each(function (i, el) {
        updateStyles.call(el);
    });
    sliders.mousedown(function () {
        $(this).find('input').addClass('clicked');
    }).mouseup(function () {
        $(this).find('input').removeClass('clicked');
    });
    sliders.mousemove(function () {
        updateStyles.call(this);
    });
    sliders.click(function () {
        updateStyles.call(this);
    });

    var buttons = $('.rgba, .hex');
    buttons.on('click', function (e) {
        var self = this;
        $(this).siblings().select();
        document.execCommand('copy');
        $(this).siblings().blur();
        $(this).html('Copied !');
        setTimeout(function () {
            $(self).html('Copy <i class="ion-ios-copy"></i>');
        }, 1000);

        var x = e.pageX;
        var y = e.pageY;
        var clickY = y - $(this).offset().top;
        var clickX = x - $(this).offset().left;
        var setX = parseInt(clickX, 10);
        var setY = parseInt(clickY, 10);
        $(this).find('svg').remove();
        $(this).append('<svg><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle></svg>');
        var c = $(self).find('circle');
        c.animate({
            r: $(self).outerWidth(),
        }, {
            easing: 'easeOutQuad',
            duration: 500,
            step: function (val) {
                c.attr('r', val);
            },
        });
    });
});

function updateStyles() {
    var el = $(this).find('input');
    var fraction = (el.val() - el.attr('min')) / (el.attr('max') - el.attr('min'));
    if (fraction === 0) {
        el.addClass('zero');
    } else {
        el.removeClass('zero');
    }
    $(this).find('.lower').css('flex-grow', fraction);
    $(this).find('.upper').css('flex-grow', 1 - fraction);

    var r = $('#r').find('input').val();
    var g = $('#g').find('input').val();
    var b = $('#b').find('input').val();
    var a = $('#a').find('input').val();
    var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    var hex = rgba2hex(rgba);
    $('#five').css('background', rgba);
    $('#rgba').val(rgba);
    $('#hex').val(hex);
}

function rgba2hex(color) {
    if (color.indexOf('#') !== -1) {
        return color;
    }
    color = color
        .replace('rgba', '')
        .replace('rgb', '')
        .replace('(', '')
        .replace(')', '');
    color = color.split(',');
    return '#' +
        ('0' + parseInt(color[0], 10).toString(16)).slice(-2) +
        ('0' + parseInt(color[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(color[2], 10).toString(16)).slice(-2);
}
