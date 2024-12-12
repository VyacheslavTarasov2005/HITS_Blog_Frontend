import sortingConverter from "/application/converters/sortingConverter.js";
import postsController from "./postsController.js";

const mainPostsFiltrationController = async (content) => {
    if (!content) {
        return;
    }

    const form = content.querySelector('.posts-filtration form');

    const author = form.querySelector('input[name="authorName"]');
    const sorting = form.querySelector('.dropdown-button');
    const readTimeFrom = form.querySelector('input[name="readTimeFrom"]');
    const tags = form.querySelector('select[name="tags"]');
    const readTimeTo = form.querySelector('input[name="readTimeTo"]');
    const onlyMine = form.querySelector('input[type="checkbox"]');

    const updateUi = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("author")) {
            author.value = urlParams.get("author");
        }

        if (urlParams.has("sorting")) {
            sorting.textContent = sortingConverter.convertFrom(urlParams.get("sorting"));
        }

        if (urlParams.has("min")) {
            readTimeFrom.value = urlParams.get("min");
        }

        if (urlParams.has("max")) {
            readTimeTo.value = urlParams.get("max");
        }

        if (urlParams.has("tags")) {
            const selectedTags = urlParams.getAll("tags");
            for (const option of tags.options) {
                if (selectedTags.includes(option.value)) {
                    option.selected = true;
                }
            }
        }

        if (urlParams.has("onlyMyCommunities")) {
            onlyMine.checked = true;
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

        if (author.value) {
            urlParams.set('author', author.value);
        }
        else {
            urlParams.delete("author");
        }

        if (readTimeFrom.value) {
            urlParams.set('min', readTimeFrom.value);
        }
        else {
            urlParams.delete("min");
        }

        if (readTimeTo.value) {
            urlParams.set('max', readTimeTo.value);
        }
        else {
            urlParams.delete("max");
        }

        urlParams.set('sorting', sortingConverter.convertTo(sorting.textContent));

        if (onlyMine.checked) {
            urlParams.set('onlyMyCommunities', onlyMine.checked);
        }
        else {
            urlParams.delete("onlyMyCommunities");
        }

        urlParams.delete("page");
        window.history.pushState({}, "", `?${urlParams.toString()}`);

        await postsController();

        updateUi();
    });

    updateUi();
}

export default mainPostsFiltrationController;