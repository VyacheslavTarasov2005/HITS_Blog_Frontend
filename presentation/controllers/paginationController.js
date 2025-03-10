import postsController from "./postsController.js";

const paginationController = async (pagination) => {
    const buttonQuantity = 3;

    const pageSelector = document.querySelector(".pagination .goToPage");
    const quantityDropdownButton = document.querySelector(".pagination .quantity .dropdown-button");
    const goForward = document.querySelector(".pagination .forward");

    while (pageSelector.children.length > 1) {
        pageSelector.removeChild(pageSelector.lastChild);
    }

    const updateButtons = () => {
        if (pagination.count <= buttonQuantity) {
            for (let i = 1; i <= pagination.count; i++) {
                const buttonTemplate = pageSelector.children[0].cloneNode(true);

                buttonTemplate.textContent = i.toString();

                if (i === pagination.current) {
                    buttonTemplate.classList.add("selected");
                }

                buttonTemplate.classList.remove("template");
                pageSelector.appendChild(buttonTemplate);
            }
        }
        else {
            const start = Math.max(1, pagination.current - Math.floor(buttonQuantity / 2));
            const end = Math.min(pagination.count, start + buttonQuantity - 1);

            for (let i = start; i <= end; i++) {
                const buttonTemplate = pageSelector.children[0].cloneNode(true);

                buttonTemplate.textContent = i.toString();

                if (i === pagination.current) {
                    buttonTemplate.classList.add("selected");
                }

                buttonTemplate.classList.remove("template");
                pageSelector.appendChild(buttonTemplate);
            }
        }

        quantityDropdownButton.textContent = pagination.size;
        goForward.querySelector("span").textContent = pagination.count;

        [...pageSelector.children].forEach(element => {
            element.addEventListener('click', async () => {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('page', element.textContent);
                window.history.pushState({}, "", `?${urlParams.toString()}`);

                await postsController();
            })
        });
    }

    const goBack = document.querySelector(".pagination .back");
    if (!goBack.dataset.initialized) {
        goBack.addEventListener("click", async () => {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', '1');
            window.history.pushState({}, "", `?${urlParams.toString()}`);

            goBack.dataset.initialized = "true";

            await postsController();
        });
    }

    if (!goForward.dataset.initialized) {
        goForward.addEventListener("click", async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const lastPage = goForward.querySelector("span").textContent;
            urlParams.set('page', lastPage);
            window.history.pushState({}, "", `?${urlParams.toString()}`);

            goForward.dataset.initialized = "true";

            await postsController();
        });
    }

    const quantityDropdownMenu = document.querySelector(".pagination .quantity .dropdown-menu");
    if (!quantityDropdownMenu.dataset.initialized) {
        quantityDropdownMenu.addEventListener("click", async () => {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("page", "1");
            urlParams.set("size", quantityDropdownButton.textContent);
            window.history.pushState({}, "", `?${urlParams.toString()}`);

            quantityDropdownMenu.dataset.initialized = "true";

            await postsController();
        });
    }

    await updateButtons();
}

export default paginationController