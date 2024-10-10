import { Img, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeInBounce,
  easeInExpo,
  waitUntil,
} from "@motion-canvas/core";
import { Icon } from "@motion-canvas/2d";
import { Colors } from "@/assets/Colors";

import PythonDownload from "@/assets/brave_lvJVznSC7s.png";

const text_config = {
  fontFamily: "Fira Code",
  fill: Colors.Catppuccin.Mocha.Blue,
  fontSize: 100,
};

export default makeScene2D(function* (view) {
  const hello = createRef<Txt>();

  view.add(
    <>
      <Txt ref={hello} {...text_config} fill={Colors.Catppuccin.Mocha.Red} />
    </>
  );

  yield hello().text("Hey Friends 👋");
  yield* waitUntil("greet");

  yield* hello().text("How to setup Python project?", 0.5);
  yield* waitUntil("title");

  yield* hello()
    .fill(Colors.Catppuccin.Mocha.Green)
    .text("Install Python", 0.5);

  const url = createRef<Txt>();
  const lay = createRef<Layout>();
  view.add(
    <Layout
      layout
      ref={lay}
      direction={"column"}
      alignContent={"center"}
      alignItems={"center"}
      y={1080}
      gap={20}
      opacity={0}
    >
      <Txt
        ref={url}
        {...text_config}
        fill={Colors.Catppuccin.Mocha.Red}
        text={"python.org/downloads"}
        fontSize={40}
      />
      <Img src={PythonDownload} height={600} />
    </Layout>
  );

  yield* waitUntil("python");
  yield* hello().y(-360, 0.5);

  yield* lay().opacity(1).y(50, 0.5);
  yield* waitUntil("official python");

  yield lay().remove();

  yield* waitUntil("the end");
});
