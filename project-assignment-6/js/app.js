/* global SVGInjector, Velocity, chance */
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

    /**
     * A state management function. This functions also holds the state of the application in the state variable. The state of the application is then available via closure whenever the state.getState function is called.
     *
     * @param  {Function} reducer The function to be invoked when actions are dispatched.
     * @return {Object}
     */
    function createStore(reducer) {
        let state;
        let listeners = [];

        function getState() {
            return state;
        }

        function dispatch(action) {
            state = reducer(state, action);
            listeners.forEach(function (listener) {
                return listener();
            });
        }

        function subscribe(listener) {
            listeners.push(listener);
            return function () {
                listeners = listeners.filter(function (l) {
                    return l !== listener;
                });
            };
        }

        dispatch({});

        return {
            getState,
            dispatch,
            subscribe,
        };
    }
    /**
     * A function to prettify float numbers in JavaScript.
     *
     * @param  {String} input Valid number input to be prettified.
     * @return {Number}       Prettified number output.
     */
    function fixFloat(input) {
        return parseFloat(Number(input).toPrecision(9));
    }

    /* ---- Fake Data ----- */
    let products = [];
    for (let i = 0; i < 12; i++) {
        products.push({
            id: i,
            name: chance.word(),
            price: chance.integer({
                min: 19,
                max: 129,
            }),
            desc: chance.word(),
        });
    }

    /* ----  Begin  ----- */
    documentReady(function () {
        /**
         * Initializing state.
         */
        const initialState = {
            cart: 0,
            items: [],
            subtotal: 0,
            quantity: {}, // TODO: Start Here.
        };

        function reducer(state = initialState, action) {
            switch (action.type) {
                case 'ADD': {
                    const arr = state.items.slice();
                    arr.push(action.product);
                    return Object.assign({}, state, {
                        cart: state.cart + 1,
                        items: arr,
                        subtotal: state.subtotal + action.product.price,
                    });
                }
                default:
                    return state;
            }
        }

        const store = createStore(reducer);
        const dispatch = store.dispatch;

        /**
         * Generating products (DOM Nodes) based on the fake data.
         */
        const productsContainer = document.querySelector('.products');
        products.forEach(function (product) {
            productsContainer.insertAdjacentHTML('beforeend', `<div id="${product.id}" class="product">
                <div class="product__info">
                    <span class="name">${product.name}</span>
                    <span class="price">$ ${product.price}</span>
                    <p class="desc">BY ${product.desc}</p>
                </div>
                <div class="add">
                    <i class="ion-ios-cart"></i>
                    <span class="add__text">Add to cart</span>
                </div>
            </div>`);
        });

        /**
         * Inject SVG images into the DOM.
         */
        var injectElements = document.querySelectorAll('img.svg');
        SVGInjector(injectElements);

        /**
         * List of placeholder colors.
         *
         */
        const placeholderColors = ['#ffd213', '#896f00', '#ffda3a', '#b08e00', '#ffe161', '#ffe575', '#ffec9c', '#d7ae00'];

        /**
         * Generating random product "background".
         */
        const placeholders = document.querySelectorAll('.product, .img');
        [].forEach.call(placeholders, function (el) {
            const random = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
            const color = placeholderColors[random];
            el.style.backgroundColor = color;
        });

        /**
         * Attching event listeners to open and close the cart.
         */
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

        /**
         * Attaching event listeners to the add to cart button.
         */
        [].forEach.call(document.querySelectorAll('.product .add'), function (el) {
            el.addEventListener('click', function () {
                dispatch({ type: 'ADD', product: products[el.parentNode.getAttribute('id')] });
                console.log(store.getState());
            });
        });
        /**
        * A function that is invoked whenever the state changes. So when the state changes, the display output in the browser also changes.
        *
        */
        function render() {
            if (store.getState().cart > 0) {
                /**
                 * Checking state so that the DOM does not have to rerender that often.
                 *
                 */
                if (document.querySelector('.noproduct').style.display !== 'none') {
                    document.querySelector('.grandtotal__container').style.display = 'flex';
                    document.querySelector('.voucher__container').style.display = 'block';
                    document.querySelector('.heading.coupon').style.display = 'block';
                    document.querySelector('.heading.summary').style.display = 'block';
                    document.querySelector('.noproduct').style.display = 'none';
                }
                Velocity(document.querySelector('#cart .count'), 'callout.bounce');
                document.querySelector('#cart .count').innerHTML = store.getState().cart;

                /**
                 * Updating the shopping cart as more items are added to it.
                 *
                 */
                const state = store.getState();
                let itemHTMLString = '<div class="noproduct" style="display: none;">Your Shopping Cart is Empty</div>';
                state.items.forEach(function (item) {
                    itemHTMLString += `<div class="checkout__item">
                        <div class="img"></div>
                        <div class="name">${item.name}</div>
                        <div class="quantity">
                            <div class="increase"><i class="ion-ios-arrow-up"></i></div>
                            <input value="1" type="text">
                            <div class="decrease"><i class="ion-ios-arrow-down"></i></div>
                        </div>
                        <div class="price">$ ${item.price}</div>
                        <div class="remove"><i class="ion-trash-b"></i></div>
                    </div>`;
                });
                document.querySelector('.products__container').innerHTML = itemHTMLString;

                /**
                 * Updating the total price.
                 *
                 */
                const subTotal = store.getState().subtotal;
                const taxes = fixFloat(subTotal * 0.07);
                const grandTotal = fixFloat(subTotal + taxes + 15);
                document.querySelector('.subtotal .price').innerHTML = `$ ${subTotal}`;
                document.querySelector('.tax .price').innerHTML = `$ ${taxes}`;
                document.querySelector('.grandtotal .price').innerHTML = `$ ${grandTotal}`;
            }
        }

        store.subscribe(render);
    });
})(document);
