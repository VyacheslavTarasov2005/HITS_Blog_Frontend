let view404 = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('assets/views/templates/notFoundView.html').then((data) => data.text());
        document.title = 'Страница не найдена'
    }
}

export default view404;