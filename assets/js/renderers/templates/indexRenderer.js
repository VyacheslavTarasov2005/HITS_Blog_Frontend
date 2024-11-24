let indexView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('assets/views/templates/indexView.html').then((data) => data.text());

        document.title = 'Главная'
    }
}

export default indexView;