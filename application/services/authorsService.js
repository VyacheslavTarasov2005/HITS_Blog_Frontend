import api from "/data/api.js";

const getAuthors = async () => {
    const response = await api.get("/author/list");

    if (response.status === 200) {
        let topThreeAuthorsScore = response.body.map((author) => author.posts + author.likes);

        topThreeAuthorsScore.sort((a, b) => a > b ? -1 : 1);
        topThreeAuthorsScore = topThreeAuthorsScore.slice(0, 3)

        return {"authors": response.body, "topThreeAuthorsScore": topThreeAuthorsScore};
    }
    else {
        throw new Error("Не удалось загрузить авторов");
    }
}

export default {getAuthors};