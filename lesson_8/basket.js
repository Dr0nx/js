'use strict';

// Пустая корзина
let basket = {};

class Product {
    /**
     * @param {number} id уникальный идентификатор каждого товара
     * @param {string} image название файла с картинкой, например 0.jpg
     * @param {string} name имя товара
     * @param {string} description описание товара
     * @param {number} price цена товара
     */
    constructor(id, image, name, description, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

// 6 случайных продуктов, их полное описание
const products = [
    new Product(
        0,
        '1.jpg',
        'Product 0',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        52.22,
    ),
    new Product(
        1,
        '2.jpg',
        'Product 1',
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        32.12,
    ),
    new Product(
        2,
        '3.jpg',
        'Product 2',
        'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
        82.87,
    ),
    new Product(
        3,
        '4.jpg',
        'Product 3',
        'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
        22.39,
    ),
    new Product(
        4,
        '5.jpg',
        'Product 4',
        'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.',
        92.99,
    ),
    new Product(
        5,
        '6.jpg',
        'Product 5',
        'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.',
        12.55,
    ),
];

// Методы querySelector*
const cartIconWrap = document.querySelector('.cartIconWrap');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const rightHeader = document.querySelector('.rightHeader');
const featuredEl = document.querySelector('.featuredItems');

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
            <div>${products[productId].name}</div>
            <div>
                <span class="productCount" data-productId="${productId}">0</span> шт.
            </div>
            <div>$${products[productId].price}</div>
            <div>
                $<span class="productTotalRow" data-productId="${productId}">${products[productId].price}</span>
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
                    <img src="images/featured/${product.image}" alt="">
                    <div class="featuredImgDark">
                        <button data-productId="${product.id}">
                            <img src="images/cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div class="featuredData">
                    <div class="featuredName">
                        ${product.name}
                    </div>
                    <div class="featuredText">
                        ${product.description}
                    </div>
                    <div class="featuredPrice">
                        $${product.price}
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
        totalSum += basket[productId] * products[productId].price;
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

    increaseProductCount(productId);
    recalculateSumForProduct(productId);
}

// Функция пересчитывает стоимость товара умноженное на количество товара
function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * products[productId].price).toFixed(2);
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
