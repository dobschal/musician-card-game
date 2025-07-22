import createElement from "./createElement.ts";

const messageWrapper = createElement({target: document.body, className: "message-wrapper"});

export default function (message: string, type: "info" | "warning" | "error" = "info"): void {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messageWrapper.appendChild(messageElement);
    setTimeout(() => {
        messageElement.remove();
    }, 7000);
}
