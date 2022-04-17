'use strict';

class BasketItem {
    id;
    count = 1;

    constructor(id, featuredName, featuredPrice) {
        this.featuredName = featuredName;
        this.featuredPrice = Number.parseFloat(featuredPrice);
        this.id = id;
    }

    increaseCount() {
        this.count++;
    }

    increasePrice() {
        this.featuredPrice += this.featuredPrice;
    }
}

let basketItems = [];
const basketDivEl = document.querySelector(".basketItems");
const featureItemsEl = document.querySelector(".featuredItems");
featureItemsEl.addEventListener("click", addToCardHandler);
const cartIcon = document.querySelector(".cartIcon");
cartIcon.addEventListener("click", () => {
    if (basketDivEl.style.display === "none") {
        showBasket();
    } else {
        basketDivEl.style.display = "none";
    }
});

function checkItemsCount() {
    if (basketItems.length === 0) {
        basketDivEl.innerHTML = '<div class="no-items">No items</div>';
    }
}

function showBasket() {
    checkItemsCount();
    let htmlItems = "";
    if (basketItems.length > 0) {
        basketItems.forEach(el => {
            htmlItems += markUpBasketItem(el);
        });
        basketDivEl.innerHTML = htmlItems;
    }
    basketDivEl.style.display = "flex";

    document.querySelectorAll(".delete-item").forEach(el => {
        el.addEventListener("click", (event) => {
            event.target.closest(".basket-item").remove();
            basketItems.forEach((el, index, array) => {
                if (el.id === Number.parseInt(
                    event.target.closest(".basket-item").dataset.id)
                ) {
                    array.splice(index, 1);
                }
            });
            checkItemsCount();
        });
    });
}

function markUpBasketItem(item) {
    return `<div class='basket-item' data-id="${item.id}">
<div class="basket-item-name">${item.featuredName}</div>
<div>${item.count} шт.</div><div>${item.featuredPrice}$</div>
<div class="delete-item">Х</div></div>`;
}

function addToCardHandler(event) {
    if (event.target.tagName === "BUTTON") {
        const featuredItem = event.target.closest(".featuredItem");
        const itemData = featuredItem.querySelector(".featuredData");

        let oldItem = null;
        basketItems.forEach((el, index) => {
            if (el.id === [...featureItemsEl.children]
                .indexOf(featuredItem)) {
                oldItem = index;
            }
        });

        if (oldItem !== null) {
            basketItems[oldItem].increaseCount();
            basketItems[oldItem].increasePrice();
        } else {
            basketItems.push(
                new BasketItem(
                    [...featureItemsEl.children].indexOf(featuredItem),
                    itemData.querySelector(".featuredName")
                        .textContent.trim(),
                    itemData.querySelector(".featuredPrice")
                        .textContent.replace("$", "")
                        .trim()
                )
            );
        }
        showBasket();
    }

}