import dropdownList from "/presentation/handlers/dropdownList.js";
import paginationController from "/application/controllers/paginationController.js";

let paginationView = {
    render: async (content) => {
        content.innerHTML +=
            await fetch('/presentation/views/components/paginationView.html')
                .then((data) => data.text());

        await paginationController();

        const quantityDropdownButton = document.querySelector(".pagination .quantity .dropdown-button");

        const quantityDropdownMenu = document.querySelector(".pagination .quantity .dropdown-menu");

        dropdownList(quantityDropdownButton, quantityDropdownMenu);
    }
}

export default paginationView;