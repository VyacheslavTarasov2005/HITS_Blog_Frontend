const dropdown = (button, menu) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });
};

export default dropdown;