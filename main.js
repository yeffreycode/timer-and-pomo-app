"use strict";
//render helper
import { renderComponent } from "./helpers/render.js";
import { pomodoro } from "./components/Pomodoro.js";

const root = document.getElementById("root");
renderComponent(pomodoro, root);
