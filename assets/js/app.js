import headerView from "./renderers/components/headerRenderer.js";
import indexView from './renderers/templates/indexRenderer.js';
import notFoundView from './renderers/templates/notFoundRenderer.js';
import loginView from './renderers/templates/loginRenderer.js';

const route = (eventOrPath) => {
    if (typeof eventOrPath === 'string') {
        window.history.pushState({}, "", eventOrPath);
        handleLocation();
    } else {
        eventOrPath.preventDefault();
        window.history.pushState({}, "", eventOrPath.target.href);
        handleLocation();
    }
};

const routes = {
    404: notFoundView,
    "/": indexView,
    "/login": loginView
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    await headerView.render(path);
    await route.render();
    updateLinks();
};

const updateLinks = () => {
    const navLinks = document.querySelectorAll('a');
    navLinks.forEach(link => {
        link.onclick = route;
    });
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();