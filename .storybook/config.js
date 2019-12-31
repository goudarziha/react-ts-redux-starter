import { configure } from "@storybook/react";
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

const req = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
