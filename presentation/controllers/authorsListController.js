import authorsService from "/application/services/authorsService.js";
import dateConverter from "/application/converters/dateConverter.js";

const authorsListController = async () => {
    const authorsContainer = document.querySelector(".authors");

    try {
        const authors = await authorsService.getAuthors();

        authors.authors.forEach((author) => {
            const authorTemplate = authorsContainer.children[0].cloneNode(true);

            const authorAvatar = authorTemplate.querySelector(".avatar");

            if (author.gender === "Male") {
                const manAvatar = authorAvatar.querySelector(".man-avatar");
                manAvatar.classList.remove("template");
            }
            else {
                const womanAvatar = authorAvatar.querySelector(".woman-avatar");
                womanAvatar.classList.remove("template");
            }

            const authorScore = author.posts + author.likes;
            for (let i = 0; i < authors.topThreeAuthorsScore.length; i++) {
                if (authorScore === authors.topThreeAuthorsScore[i]) {
                    const crown = authorAvatar.querySelector(".crown");

                    switch (i) {
                        case 0:
                            crown.classList.add("first");
                            break;

                        case 1:
                            crown.classList.add("second");
                            break;

                        default:
                            crown.classList.add("third");
                            break;
                    }

                    crown.classList.remove("template");
                    break;
                }
            }

            const authorInfo = authorTemplate.querySelector('.author-info');

            const authorName = authorInfo.querySelector('.author-credentials .name');
            authorName.textContent = author.fullName;
            authorName.href = `/?author=${author.fullName}`;

            /*authorName.addEventListener("click", async () => {
                const
                await route("/");
            });
*/
            const birthDate = authorInfo.querySelector('.birth-date .date');
            birthDate.textContent = dateConverter.convertFrom(author.birthDate);

            const createDate = authorInfo.querySelector('.create-date .date');
            createDate.textContent = dateConverter.convertFrom(author.created);

            const postsQuantity = authorInfo.querySelector('.author-statistic .posts-statistic .quantity');
            postsQuantity.textContent = author.posts;

            const likesQuantity = authorInfo.querySelector('.author-statistic .likes-statistic .quantity');
            likesQuantity.textContent = author.likes;

            authorTemplate.classList.remove("template");

            authorsContainer.appendChild(authorTemplate);
        });
    }
    catch (error) {
        alert("Не удалось загрузить список авторов");
        console.error(error);
    }
}

export default authorsListController;