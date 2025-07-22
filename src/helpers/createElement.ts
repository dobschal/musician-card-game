export interface HTMLCreateElementOptions {
    tag?: string;
    target?: HTMLElement;
    id?: string;
    className?: string;
    onClick?: (event: MouseEvent) => void;
    text?: string;
    style?: string;
    innerHTML?: string;
}

export default function ({
                             tag = "div",
                             target,
                             id,
                             className,
                             onClick,
                             text,
                             style,
                             innerHTML
                         }: HTMLCreateElementOptions) {
    const el = document.createElement(tag);
    if (target) {
        target.appendChild(el);
    }
    if (id) {
        el.id = id;
    }
    if (className) {
        el.className = className;
    }
    if (onClick) {
        el.addEventListener("click", onClick);
    }
    if (text) {
        el.textContent = text;
    }
    if (style) {
        el.style.cssText = style;
    }
    if (innerHTML) {
        el.innerHTML = innerHTML;
    }
    return el;
}
