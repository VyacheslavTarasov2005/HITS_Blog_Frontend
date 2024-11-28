import dropdown from './dropdown.js';

const dropdownButtons = (button, menu) => {
    if (!button.dataset.initialized) {
        dropdown(button, menu);
    }

    button.dataset.initialized = "true";
}

export default dropdownButtons;