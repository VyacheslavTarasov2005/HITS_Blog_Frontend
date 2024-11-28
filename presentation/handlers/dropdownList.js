import dropdown from "./dropdown.js";

const dropdownList = (button, menu) => {
    if (!button.dataset.initialized) {
        dropdown(button, menu);

        const elements = menu.querySelectorAll("li");

        elements.forEach(element => {
            element.addEventListener("click", (event) => {
                button.textContent = element.textContent;
            })
        })
    }

    button.dataset.initialized = "true";
}

export default dropdownList;