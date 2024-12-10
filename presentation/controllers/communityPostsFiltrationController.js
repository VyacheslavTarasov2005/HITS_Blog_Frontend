import sortingConverter from "/application/converters/sortingConverter.js";
import postsController from "./postsController.js";

const communityPostsFiltrationController = async () => {
    const form = document.querySelector('.posts-filtration form');

    const sorting = form.querySelector('.dropdown-button');
    const tags = form.querySelector('select[name="tags"]');

    const updateUi = () => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has("sorting")) {
            sorting.textContent = sortingConverter.convertFrom(urlParams.get("sorting"));
        }

        if (urlParams.has("tags")) {
            const selectedTags = urlParams.getAll("tags");
            for (const option of tags.options) {
                if (selectedTags.includes(option.value)) {
                    option.selected = true;
                }
            }
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);

        if (tags.selectedOptions) {
            if (urlParams.has("tags")) {
                urlParams.delete("tags");
            }

            [...tags.selectedOptions].forEach(tag => {
                urlParams.append('tags', tag.value);
            });
        }
        else {
            urlParams.delete("tags");
        }

        urlParams.set('sorting', sortingConverter.convertTo(sorting.textContent));

        urlParams.delete("page");
        window.history.pushState({}, "", `?${urlParams.toString()}`);

        await postsController();

        updateUi();
    });

    updateUi();
}

export default communityPostsFiltrationController;