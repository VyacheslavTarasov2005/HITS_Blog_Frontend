const phoneNumberInputHandler = (input) => {
    input.addEventListener('input', () => {
        let phone = input.value.replace(/\D/g, '');

        if (phone.length > 11) {
            phone = phone.substring(0, 11);
        }

        let formatted = '+7';
        if (phone.length > 1) {
            formatted += ' (' + phone.substring(1, 4);
        }
        if (phone.length >= 5) {
            formatted += ') ' + phone.substring(4, 7);
        }
        if (phone.length >= 8) {
            formatted += '-' + phone.substring(7, 9);
        }
        if (phone.length >= 10) {
            formatted += '-' + phone.substring(9, 11);
        }

        input.value = formatted;
    });
}

export default phoneNumberInputHandler;