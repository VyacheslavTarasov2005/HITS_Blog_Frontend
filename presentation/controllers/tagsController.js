import tagsService from "/application/services/tagsService.js";

const tagsController = async (tagsSelector) => {
    try {
        const tags = await tagsService.getTags();

        tags.forEach((tag) => {
            const tagTemplate = tagsSelector.children[0].cloneNode(true);
            tagTemplate.textContent = tag.name;
            tagTemplate.value = tag.id;
            tagTemplate.style.display = "";
            tagsSelector.appendChild(tagTemplate);
        })
    }
    catch (error) {
        alert(error.message);
    }
}

export default tagsController;