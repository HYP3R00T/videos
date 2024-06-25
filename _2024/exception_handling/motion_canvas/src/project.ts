import { makeProject } from '@motion-canvas/core';
import example from './scenes/example?scene';

import { Code, LezerHighlighter } from '@motion-canvas/2d';
import { parser } from "@lezer/python";
import './global.css';

import exception_handling from "./audio/exception_handling.mp3"


Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [example],
  audio: exception_handling
});
