'use strict';

// Пустая корзина
let basket = {};

// 6 случайных продуктов, их полное описание
const products = [
    [
        0,
        '1.jpg',
        'Product 0',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        52.22
    ],
    [
        1,
        '2.jpg',
        'Product 1',
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        32.12
    ],
    [
        2,
        '3.jpg',
        'Product 2',
        'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
        82.87
    ],
    [
        3,
        '4.jpg',
        'Product 3',
        'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
        22.39
    ],
    [
        4,
        '5.jpg',
        'Product 4',
        'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.',
        92.99
    ],
    [
        5,
        '6.jpg',
        'Product 5',
        'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.',
        12.55
    ]
];

// Методы querySelector*
const cartIconWrap = document.querySelector('.cartIconWrap');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const rightHeader = document.querySelector('.rightHeader');
const featuredEl = document.querySelector('.featuredItems');
const featuredButtons = document.querySelectorAll('.featuredImgDark button');

// Обработчик события для показа или скрытия корзины
cartIconWrap.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
});

// Вставка начальной корзины (наименования и всего) посредством insertAdjacentHTML
function renderInitialBasket() {
    let initialBasket = `
        <div class="basket hidden">
            <div class="basketRow basketHeader">
                <div>Название товара</div>
                <div>Количество</div>
                <div>Цена за шт.</div>
                <div>Итого</div>
            </div>
            <div class="basketTotal">
                Товаров в корзине на сумму:
                $<span class="basketTotalValue">0</span>
            </div>
        </div> 
    `;
    rightHeader.insertAdjacentHTML('beforeend', initialBasket);
}

// Вставка карточек - их тут 6. Определение ниже в addFeaturedItem
function showAllProductsNames() {
    let markupToProductsDiv = '';
    products.forEach(function (product) {
        markupToProductsDiv += addFeaturedItem(product);
    });
    featuredEl.insertAdjacentHTML("afterbegin", markupToProductsDiv);
}

// Вставка необходимой карточки или предотвращение добавления новой позиции,
// если карточка уже есть. В этом случае будет обычное суммирование (productCount)
function addBasketRow(productId) {
    if (basket[productId] > 1) {
        return;
    }
    let productRow = `
        <div class="basketRow">
            <div>${products[productId][2]}</div>
            <div>
                <span class="productCount" data-productId="${productId}">0</span> шт.
            </div>
            <div>$${products[productId][4]}</div>
            <div>
                $<span class="productTotalRow" data-productId="${productId}">${products[productId][4]}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}

renderInitialBasket();

// Методы querySelector
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

// Это разметка (шаблон) карточек.
function addFeaturedItem(product) {
    return `
        <div class="featuredItem">

                <div class="featuredImgWrap">
                    <img src="images/featured/${product[1]}" alt="">
                    <div class="featuredImgDark">
                        <button data-productId="${product[0]}">
                            <img src="images/cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div class="featuredData">
                    <div class="featuredName">
                        ${product[2]}
                    </div>
                    <div class="featuredText">
                        ${product[3]}
                    </div>
                    <div class="featuredPrice">
                        $${product[4]}
                    </div>
                </div>

            </div>
    `;
}

// Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
function increaseProductsCount() {
    basketCounterEl.textContent++;
}

// Функция назначает обработку клика на все кнопки "Add to cart".
function addEventListenersForAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    })
}

// Функция-обработчик события клика по кнопке "Add to cart".
function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId);
}

// Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * products[productId][4]
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}

// Метод добавляет продукт в объект basket.
function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    } else {
        basket[productId]++;
    }
}

// Функция срабатывает когда нужно отрисовать продукт в корзине.
function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInBasket(productId);
    }
}

// Функция пересчитывает стоимость товара умноженное на количество товара
function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * products[productId][4]).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}

// Функция увеличивает количество товаров в строке в корзине.
function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}

// Эта функция срабатывает когда добавляют новый товар в корзину.
function addProductIntoBasket(productId) {
    increaseProductsCount();
    addProductToObject(productId);
    addBasketRow(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}

showAllProductsNames();
addEventListenersForAddToCartButtons();
