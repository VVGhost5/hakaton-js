'use strict'


const targetBtnRef = document.querySelector('#counter');
const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']"
);
const decrementBtnRef = document.querySelector(
    "button[data-counter='decrement']"
);
const valueRef = document.getElementById('value');

const valueIncrement = () => {
    ++valueRef.textContent;
}

const valueDecrement = () => {
    --valueRef.textContent;
}

incrementBtnRef.addEventListener("click", valueIncrement);

decrementBtnRef.addEventListener("click", valueDecrement);

