const convertTo = (uiSorting) => {
    switch (uiSorting) {
        case "По дате создания (сначала новые)":
            return "CreateDesc";

        case "По дате создания (сначала старые)":
            return "CreateAsc";

        case "По количеству лайков (по возрастанию)":
            return "LikeAsc";

        case "По количеству лайков (по убыванию)":
            return "LikeDesc";
    }
}

const convertFrom = (rawSorting) => {
    switch (rawSorting) {
        case ("CreateDesc"):
            return "По дате создания (сначала новые)";

        case "CreateAsc":
            return "По дате создания (сначала старые)";

        case "LikeAsc":
            return "По количеству лайков (по возрастанию)";

        case "LikeDesc":
            return "По количеству лайков (по убыванию)";
    }
}

export default {
    convertTo,
    convertFrom
};