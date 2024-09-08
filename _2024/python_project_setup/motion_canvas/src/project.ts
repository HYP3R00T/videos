import { makeProject } from "@motion-canvas/core";
import example from "./scenes/example?scene";

import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/python";
import "./global.css";

import python_project_setup_audio from "./audio/python project setup audio.mp3";

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [example],
  audio: python_project_setup_audio,
});
