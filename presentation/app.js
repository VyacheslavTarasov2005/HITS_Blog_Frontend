import indexView from './renderers/templates/indexRenderer.js';
import notFoundView from './renderers/templates/notFoundRenderer.js';
import loginView from './renderers/templates/loginRenderer.js';
import registrationView from './renderers/templates/registrationRenderer.js';
import profileView from './renderers/templates/profileRenderer.js';
import communitiesListView from './renderers/templates/communitiesListRenderer.js';
import authorsView from './renderers/templates/authorsListRenderer.js';
import communityView from "./renderers/templates/communityRenderer.js";
import createPostView from './renderers/templates/createPostRenderer.js';
import postDetailsView from "./renderers/templates/postDetailsRenderer.js";

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
    "/profile": profileView,
    "/communities": communitiesListView,
    "/communities/:id": communityView,
    "/authors": authorsView,
    "/post/create": createPostView,
    "/post/:id": postDetailsView
};

const getParams = (route, path) => {
    const routeParts = route.split('/');
    const pathParts = path.split('/');

    const params = {};

    routeParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1);
            params[paramName] = pathParts[index];
        }
    });

    return params;
}

const handleLocation = async () => {
    const path = window.location.pathname;

    let route = routes[path];
    let matchedRoute = path;
    if (!route) {
        let matchedParams = {};

        Object.keys(routes).forEach(route => {
            const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '[^/]+')}$`);
            if (routeRegex.test(path)) {
                matchedRoute = route;
                matchedParams = getParams(route, path);
            }
        });

        route = routes[matchedRoute] || routes[404];
    }

    await headerView.render(matchedRoute);
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