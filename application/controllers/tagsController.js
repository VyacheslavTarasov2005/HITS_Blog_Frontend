import tagsService from "/domain/services/tagsService.js";

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
        alert("Не удалось получить тэги");
        console.error(error);
    }
}

export default tagsController;