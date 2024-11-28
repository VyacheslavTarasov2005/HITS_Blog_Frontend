const dropdownList = (button, menu) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });

    const elements = menu.querySelectorAll("li");

    elements.forEach(element => {
        element.addEventListener("click", (event) => {
            button.textContent = element.textContent;
        })
    })
}

export default dropdownList;