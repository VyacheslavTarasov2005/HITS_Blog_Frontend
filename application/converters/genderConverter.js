const convertTo = (uiGender) => {
    return uiGender === "Мужчина" ? "Male" : "Female";
}

const convertFrom = (rawGender) => {
    return rawGender === "Male" ? "Мужчина" : "Женчина";
}

export default {
    convertTo,
    convertFrom
}