const readFullHandler = (content, fullText) => {
    const textBlock = content.querySelector('p');
    const readFullButton = content.querySelector('.read-full');

    const maxTextSize = 500

    if (fullText.length > maxTextSize) {
        textBlock.textContent = fullText.substr(0, maxTextSize) + '...';
        readFullButton.style.display = '';

        readFullButton.addEventListener('click', (e) => {
            e.preventDefault();

            textBlock.textContent = fullText;
            readFullButton.style.display = "none";
        })
    }
}

export default readFullHandler;