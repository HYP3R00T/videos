import { Circle, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, tween, waitFor, waitUntil } from "@motion-canvas/core";
import { Icon } from "@motion-canvas/2d";
import { Colors } from "@/assets/Colors";
import { Terminal } from "./Terminal";

const text_config = {
  fontFamily: "Fira Code",
  fill: Colors.Catppuccin.Mocha.Blue,
  fontSize: 100,
};

export default makeScene2D(function* (view) {
  const terminal = createRef<Terminal>();
  view.add(
    <Terminal
      ref={terminal}
      defaultTxtProps={{ fontFamily: "Fira Code", fontSize: 30 }}
      padding={20}
      prefix={">> "}
    />
  );

  yield* terminal().typeLine("npm init @motion-canvas@latest", 2);
  yield* waitFor(1);
  terminal().lineAppear("");
  terminal().lineAppear("Need to install the following packages:");
  terminal().lineAppear("  @motion-canvas/create");
  terminal().lineAppear("Ok to proceed? (y)");
  yield* waitFor(1);
  yield* terminal().typeAfterLine(" y", 1);
  terminal().lineAppear([
    { text: "? Project name " },
    { text: "»", fill: Colors.Catppuccin.Mocha.Surface2 },
  ]);
  yield* waitFor(1);
});
