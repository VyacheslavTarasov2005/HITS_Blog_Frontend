const convertTo = (uiDate) => {
    return uiDate.toISOString();
}

const convertFrom = (rawDate, normal = false) => {
    if (!normal) {
        return rawDate.substring(0, 10);
    }

    const date = new Date(rawDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export default {
    convertTo,
    convertFrom
}