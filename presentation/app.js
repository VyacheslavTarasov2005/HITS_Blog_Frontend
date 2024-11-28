import indexView from './renderers/templates/indexRenderer.js';
import notFoundView from './renderers/templates/notFoundRenderer.js';
import loginView from './renderers/templates/loginRenderer.js';
import registrationView from './renderers/templates/registrationRenderer.js';
import profileView from './renderers/templates/profileRenderer.js';

import headerView from "./renderers/components/headerRenderer.js";

const route = async (eventOrPath) => {
    if (typeof eventOrPath === 'string') {
        window.history.pushState({}, "", eventOrPath);
        await handleLocation();
    } else {
        eventOrPath.preventDefault();
        window.history.pushState({}, "", eventOrPath.target.href);
        await handleLocation();
    }
};

const routes = {
    404: notFoundView,
    "/": indexView,
    "/login": loginView,
    "/registration": registrationView,
    "/profile": profileView
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    await headerView.render();
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

await handleLocation();