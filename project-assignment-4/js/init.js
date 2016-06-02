/* global validator */

(function (document) {
    /* ---- Utility Functions ----- */

    function documentReady(cb) {
        document.readyState === "interactive" || document.readyState === "complete" ? cb() : document.addEventListener("DOMContentLoaded", cb);
    }
    /**
     * Underscore.js implementation of debounce.
     * https://davidwalsh.name/javascript-debounce-function
     *
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;

            function later() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    function addDebounceEvent(elm, evt, cb, time) {
        elm.addEventListener(evt, debounce(cb, time));
    }

    function validationMessage(elm, msg, err) {
        const next = elm.nextElementSibling;
        if (err) {
            elm.classList.add('invalid');
            next.style.opacity = 1;
            next.style.color = '#d9534f';
            next.innerHTML = '<i class="ion-close-round"></i> ' + msg;
        } else {
            elm.classList.remove('invalid');
            next.style.opacity = 1;
            next.style.color = '#5cb85c';
            next.innerHTML = '<i class="ion-checkmark-round"></i> ' + msg;
        }
    }
    /* ---- Navigation Bar ----- */
    const navButtons = document.querySelectorAll('.page__control a[href*="#"]');
    [].forEach.call(navButtons, function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const target = el.getAttribute('href');
            document.querySelector('.page__control .active').classList.remove('active');
            el.querySelector('.dot').classList.add('active');
            Velocity(document.querySelector(target), 'scroll', { //eslint-disable-line
                duration: 500,
                easing: 'ease-in-out',
            });
        });
    });

    window.addEventListener('scroll', function () {
        const scrollTop = document.body.scrollTop;
        const anchors = document.querySelectorAll('.page__control a');
        [].forEach.call(anchors, function (el) {
            const current = el;
            const target = document.querySelector(current.getAttribute('href'));
            if (target.offsetTop <= scrollTop && target.offsetTop + target.clientHeight > scrollTop) {
                document.querySelector('.nav a span').classList.remove('active');
                current.querySelector('span').classList.add('active');
            } else {
                current.querySelector('span').classList.remove('active');
            }
        });
    });

    /* ---- Constants from the validator library ----- */

    const isEmpty = validator.isEmpty;
    const isOfLength = validator.isOfLength;
    const isEmailAddress = validator.isEmailAddress;
    const isBeforeDate = validator.isBeforeDate;
    const isBetween = validator.isBetween;

    /* ---- Begin Here ----- */
    documentReady(function () {
        /* ---- Question 1 ----- */
        const firstName = document.querySelector('#one [placeholder^="First"]');
        addDebounceEvent(firstName, 'keyup', function (e) {
            if (e.keyCode !== 9) {
                if (isEmpty(this.value) || !isOfLength(this.value, 2)) {
                    validationMessage(this, 'Please enter a valid first name', true);
                    this.setCustomValidity('Please read the hint.');
                } else {
                    validationMessage(this, 'First name looks great.');
                    this.setCustomValidity('');
                }
            }
        }, 500);

        const lastName = document.querySelector('#one [placeholder^="Last"]');
        addDebounceEvent(lastName, 'keyup', function (e) {
            if (e.keyCode !== 9) {
                if (isEmpty(this.value) || !isOfLength(this.value, 2)) {
                    validationMessage(this, 'Please enter a valid first name', true);
                    this.setCustomValidity('Please read the hint.');
                } else {
                    validationMessage(this, 'Last name looks great.');
                    this.setCustomValidity('');
                }
            }
        }, 500);

        const email = document.querySelector('#one [placeholder^="Email"]');
        addDebounceEvent(email, 'keyup', function (e) {
            if (e.keyCode !== 9) {
                if (isEmpty(this.value) || !isEmailAddress(this.value)) {
                    validationMessage(this, 'Doesn\'t look like a valid email.', true);
                    this.setCustomValidity('Please read the hint.');
                } else {
                    validationMessage(this, 'Email is beautiful.');
                    this.setCustomValidity('');
                }
            }
        }, 500);

        const date = document.querySelector('#one [type="date"]');
        addDebounceEvent(date, 'change', function (e) {
            if (e.keyCode !== 9) {
                if (isEmpty(this.value) || !isBeforeDate(this.value, new Date())) {
                    validationMessage(this, 'Looks like you weren\'t born yet.', true);
                    if (!this.validationMessage) {
                        this.setCustomValidity('Please read the hint.');
                    }
                } else {
                    validationMessage(this, 'Sweet :)');
                    this.setCustomValidity('');
                }
            }
        }, 500);

        const passwordOne = document.querySelector('#one [type="password"]');
        addDebounceEvent(passwordOne, 'keyup', function (e) {
            if (e.keyCode !== 9) {
                if (isEmpty(this.value) || !isBetween(this.value.length, 6, 8)) {
                    validationMessage(this, 'Password needs to be 6-8 characters long.', true);
                    this.setCustomValidity('Please read the hint.');
                } else {
                    validationMessage(this, 'Password is a-o-kay.');
                    this.setCustomValidity('');
                }
            }
        }, 500);
    });
    /* ---- Question 4 ----- */
    const username = document.querySelector('#four [type="text"]');
    addDebounceEvent(username, 'keyup', function (e) {
        if (e.keyCode !== 9) {
            if (isEmpty(this.value) || !isOfLength(this.value, 2)) {
                validationMessage(this, 'Please enter a valid username', true);
                this.setCustomValidity('Please read the hint.');
            } else {
                validationMessage(this, 'Username looks good.');
                this.setCustomValidity('');
            }
        }
    }, 500);

    const passwordTwo = document.querySelector('#four [type="password"]');
    addDebounceEvent(passwordTwo, 'keyup', function (e) {
        if (e.keyCode !== 9) {
            if (isEmpty(this.value) || !isBetween(this.value.length, 6, 8)) {
                validationMessage(this, 'Password needs to be 6-8 characters long.', true);
                this.setCustomValidity('Please read the hint.');
            } else {
                validationMessage(this, 'Password is fine.');
                this.setCustomValidity('');
            }
        }
    }, 500);
    /* ---- Question 5 ----- */
    const sliders = document.querySelectorAll('#r, #g, #b, #a');
    [].forEach.call(sliders, function (el) {
        updateStyle.call(el);
        el.addEventListener('mousedown', function () {
            this.querySelector('input').classList.add('clicked');
        });
        el.addEventListener('mouseup', function () {
            this.querySelector('input').classList.remove('clicked');
        });
        el.addEventListener('mousemove', function () {
            updateStyle.call(this);
        });
        el.addEventListener('click', function () {
            updateStyle.call(this);
        });
    });

    const buttons = document.querySelectorAll('.rgba, .hex');
    [].forEach.call(buttons, function (el) {
        el.addEventListener('click', function () {
            el.previousElementSibling.select();
            document.execCommand('copy');
            el.previousElementSibling.select();
            document.execCommand('blur');
            el.innerHTML = 'Copied !';
            debounce(function () {
                el.innerHTML = 'Copy <i class="ion-ios-copy"></i>';
            }, 800)();
        });
    });
    function updateStyle() {
        const el = this.querySelector('input');
        const fraction = (el.value - el.getAttribute('min')) / (el.getAttribute('max') - el.getAttribute('min'));
        if (fraction === 0) {
            el.classList.add('zero');
        } else {
            el.classList.remove('zero');
        }
        el.nextElementSibling.querySelector('.lower').style.flexGrow = fraction;
        el.nextElementSibling.querySelector('.upper').style.flexGrow = 1 - fraction;

        const r = document.querySelector('#r').querySelector('input').value;
        const g = document.querySelector('#g').querySelector('input').value;
        const b = document.querySelector('#b').querySelector('input').value;
        const a = document.querySelector('#a').querySelector('input').value;
        const rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        const hex = rgba2hex(rgba);
        document.querySelector('#five').style.background = rgba;
        document.querySelector('#five #rgba').value = rgba;
        document.querySelector('#five #hex').value = hex;
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
})(document);
