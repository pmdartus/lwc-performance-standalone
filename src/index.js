import App from "bench/app";
import { createElement } from "lwc";

const element = createElement("main-element", { is: App });
const container = document.getElementById("app");
container.appendChild(element);