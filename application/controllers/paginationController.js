import postsController from "./postsController.js";

const paginationController = async () => {
    const pageSelector = document.querySelector(".pagination .goToPage");
    const quantityDropdownButton = document.querySelector(".pagination .quantity .dropdown-button");

    let pagesQuantity;

    const updatePagination = async () => {
        const pagination = await postsController(document.querySelector(".posts"), true);
        pagesQuantity = pagination.count;

        if (pagination.current !== 1) {
            if (pagination.current !== pagesQuantity) {
                for (let i = 0; i < pageSelector.children.length; i++) {
                    pageSelector.children[i].textContent = (pagination.current - pageSelector.children.length + i + 2)
                        .toString();
                }
            }
            else {
                for (let i = 0; i < pageSelector.children.length; i++) {
                    pageSelector.children[i].textContent = (pagination.current - (pageSelector.children.length - i) + 1)
                        .toString();
                }
            }
        }
        else {
            for (let i = 0; i < pageSelector.children.length; i++) {
                pageSelector.children[i].textContent = (i + 1).toString();
            }
        }

        [...pageSelector.children].forEach((element) => {
            if (element.textContent === pagination.current.toString()) {
                element.style.backgroundColor = "#0D6EFD";
                element.style.color = "white";
            }
            else {
                element.style.background = "none";
                element.style.color = "#0D6EFD";
            }
        })

        quantityDropdownButton.textContent = pagination.size.toString();
    }

    [...pageSelector.children].forEach(element => {
        element.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', element.textContent);
            window.history.pushState({}, "", `?${urlParams.toString()}`);

            updatePagination()
        })
    })

    const goBack = document.querySelector(".pagination .back");
    goBack.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', '1');
        window.history.pushState({}, "", `?${urlParams.toString()}`);

        updatePagination()
    })

    const goForward = document.querySelector(".pagination .forward");
    goForward.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', pagesQuantity.toString());
        window.history.pushState({}, "", `?${urlParams.toString()}`);

        updatePagination()
    })

    const quantityDropdownMenu = document.querySelector(".pagination .quantity .dropdown-menu");

    quantityDropdownMenu.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("size", quantityDropdownButton.textContent);
        window.history.pushState({}, "", `?${urlParams.toString()}`);
        updatePagination()
    })

    await updatePagination();
}

export default paginationController