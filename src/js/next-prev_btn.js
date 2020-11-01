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

    if (valueRef.textContent > 1) {
        decrementBtnRef.classList.remove('not-visible');
    }
}

const valueDecrement = () => {
    --valueRef.textContent;

    if(valueRef.textContent < 2) {
        decrementBtnRef.classList.add('not-visible');
    };
}

incrementBtnRef.addEventListener("click", valueIncrement);

decrementBtnRef.addEventListener("click", valueDecrement);

