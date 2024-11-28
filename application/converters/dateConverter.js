const convertTo = (uiDate) => {
    return uiDate.toISOString();
}

const convertFrom = (rawDate) => {
    return rawDate.substring(0, 10);
}

export default {
    convertTo,
    convertFrom
}