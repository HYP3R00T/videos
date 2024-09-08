import { Circle, LezerHighlighter, makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef, waitUntil } from "@motion-canvas/core";
import { parser as pythonParser } from "@lezer/python";
import { parser as markdownParser } from "@lezer/markdown";
import MyStyle from "./Style";

const PythonHightlighter = new LezerHighlighter(pythonParser, MyStyle);
const MarkdownHightlighter = new LezerHighlighter(markdownParser, MyStyle);

export default makeScene2D(function* (view) {
  const hello = createRef<Txt>();

  view.add(
    <Txt ref={hello} fontFamily={"Fira Code"} fill={"#f5a97f"} fontSize={100} />
  );

  yield hello().text("Hey Friends 👋");
  yield* waitUntil("greet");
  yield* hello().text("Exception Handling", 0.5);
  yield* waitUntil("welcome");

  yield* hello().opacity(0, 0.5);
});
