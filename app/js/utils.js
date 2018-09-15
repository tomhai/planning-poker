export function elem(parent, type, text, eventHandler, className) {
    const elem = document.createElement(type);
    if (text !== null) {
        const textNode = document.createTextNode(text);
        elem.appendChild(textNode);
    }
    if (eventHandler) {
        elem.addEventListener('click', eventHandler);
    }
    if (className) {
        elem.className = className;
    }
    if (parent) {
        parent.appendChild(elem);
    }
    return elem;
}

export function setActive(element, elements) {
    for (var n = 0; n < elements.length; ++n) {
        if (elements[n] !== this) {
            elements[n].className = '';
        }
    }
    element.classList.add('active'); 
}