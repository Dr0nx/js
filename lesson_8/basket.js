'use strict';

let basketId = [1, 2, 3, 4, 5, 6];
let cartIconWrap = document.querySelector('.cartIconWrap');
let cartIconWrapSpan = document.querySelector('.cartIconWrap span');
let rightHeader = document.querySelector('.rightHeader');
let featuredImgWrap = document.querySelectorAll('.featuredImgWrap');
// let basketRow = document.querySelector(`.basketRow`);

function renderInitialBasket() {
    let initialBasket = `
    <div class="basket hidden">
        <div class="basketRow basketHeader">
            <div>Название товара</div>
            <div>Количество</div>
            <div>Цена за шт.</div>
            <div>Итого</div>
        </div>
    </div>
    `;
    rightHeader.insertAdjacentHTML('beforeend', initialBasket);
}
renderInitialBasket();

let basket = document.querySelector('.basket');

function featuredImgClickHandler() {
    // Так, наверное, делать нельзя
    addBasketRow(cartIconWrapSpan.textContent);
    cartIconWrapSpan.textContent++;
}

featuredImgWrap.forEach(function (each) {
    each.addEventListener('click', featuredImgClickHandler);
});

cartIconWrap.addEventListener('click', function () {
    basket.classList.toggle('hidden');
});

function addBasketRow(i) {
    let productRow = `
        <div class='basketRow basketId${basketId[i]}'>
            <div>Product</div>
            <div>
                <span class="" data-productId="">0</span> шт.
            </div>
            <div>$</div>
            <div>
                $<span class="productTotalRow" data-productId=""></span>
            </div>
        </div>
    `;
    basket.insertAdjacentHTML("beforeend", productRow);
}

function renderBasketTotal() {
    let total = `
        <div class="basketTotal">
            Товаров в корзине на сумму:
            <span class="basketTotalValue">???</span>
       </div>
    `;
    basket.insertAdjacentHTML("beforeend", total);
}
// renderBasketTotal();
