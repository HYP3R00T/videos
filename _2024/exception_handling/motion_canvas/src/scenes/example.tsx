import {
  makeScene2D,
  Code,
  LezerHighlighter,
  lines,
  Txt,
} from "@motion-canvas/2d";
import {
  DEFAULT,
  all,
  createRef,
  map,
  tween,
  useDuration,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { parser as pythonParser } from "@lezer/python";
import { parser as markdownParser } from "@lezer/markdown";
import MyStyle from "./Style";

const PythonHightlighter = new LezerHighlighter(pythonParser, MyStyle);
const MarkdownHightlighter = new LezerHighlighter(markdownParser, MyStyle);

function* transitionFromCodeToOutput(
  code: () => { opacity: (value: number) => void },
  output: () => { opacity: (value: number) => void }
) {
  yield* tween(0.4, (value) => {
    code().opacity(map(1, 0, value));
  });
  yield* tween(0.4, (value) => {
    output().opacity(map(0, 1, value));
  });
}

function* transitionFromOutputToCode(
  output: () => { opacity: (value: number) => void },
  code: () => { opacity: (value: number) => void }
) {
  yield* tween(0.4, (value) => {
    output().opacity(map(1, 0, value));
  });
  yield* tween(0.4, (value) => {
    code().opacity(map(0, 1, value));
  });
}

export default makeScene2D(function* (view) {
  const code = createRef<Code>();
  const output = createRef<Code>();
  const hello = createRef<Txt>();
  const text = createRef<Txt>();
  const quote = createRef<Txt>();
  const quotation_mark = createRef<Txt>();
  const thanks = createRef<Txt>();

  view.add(
    <Txt ref={hello} fontFamily={"Fira Code"} fill={"#f5a97f"} fontSize={100} />
  );
  view.add(<Txt ref={text} fontFamily={"Fira Code"} />);
  view.add(<Txt ref={quote} fontFamily={"Fira Code"} />);
  view.add(
    <Txt
      ref={quotation_mark}
      fontFamily={"Fira Code"}
      fontSize={500}
      text={"❝"}
      fill={"#cad3f5"}
      opacity={0}
    />
  );
  view.add(<Txt ref={thanks} fontFamily={"Fira Code"} />);

  view.add(
    <Code
      ref={code}
      highlighter={PythonHightlighter}
      fontSize={36}
      fontFamily={"Fira Code"}
      // offsetX={-1}
      // x={-400}
    />
  );

  view.add(
    <Code
      ref={output}
      highlighter={MarkdownHightlighter}
      fontSize={36}
      // offsetX={-1}
      // x={-400}
    />
  );

  yield* hello().text("Hey Friends 👋");
  yield* waitUntil("event");
  yield* hello().text("Exception Handling", 0.5);
  yield* waitUntil("event0.1");

  yield* hello().opacity(0, 0.5);

  // Code
  yield* code().code(
    `\
def calculate_average(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return average

    
numbers = [10, 20]

average = calculate_average(numbers)
print(f"The average is {average}")`,
    0
  );
  yield* waitUntil("event1");

  // Modify code
  yield* code().selection(lines(6), 0.5);
  yield* waitUntil("event2");
  yield* code().selection(lines(0, 4), 0.5);
  yield* waitUntil("event3");
  yield* code().selection(DEFAULT, 0.5);

  // Output
  yield* output()
    .opacity(0)
    .code(
      `\
The average is 15.0`,
      0
    );

  // Transition from code to output
  yield* transitionFromCodeToOutput(code, output);

  yield* waitUntil("event4");

  // Transition from output to code
  yield* transitionFromOutputToCode(output, code);
  yield* waitUntil("event5");

  // Code
  yield* code().code(
    `\
def calculate_average(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return average


numbers = []

average = calculate_average(numbers)
print(f"The average is {average}")`,
    0.5
  );

  // Modify code
  yield* code().selection(lines(6), 0.5);
  yield* waitUntil("event6");
  yield* code().selection(DEFAULT, 0.5);

  // Output
  yield* output().code(
    `\
Traceback (most recent call last):
File "sample.py", line 9, in <module>
average = calculate_average(numbers)
^^^^^^^^^^^^^^^^^^^^^^^^^^
File "sample.py", line 3, in calculate_average
average = total / len(numbers)
~~~~~~^~~~~~~~~~~~~~
ZeroDivisionError: division by zero`,
    0
  );

  // Transition from code to output
  yield* transitionFromCodeToOutput(code, output);

  yield* waitUntil("event7");

  // Transition from output to code
  yield* transitionFromOutputToCode(output, code);

  // Code
  yield* code().code(
    `\
def calculate_average(numbers):
    total = sum(numbers)
    if len(numbers) == 0:
        raise ValueError("Cannot calculate average of an empty list")
    average = total / len(numbers)
    return average


numbers = []

average = calculate_average(numbers)
print(f"The average is {average}")`,
    0.5
  );

  yield* waitUntil("event8");
  // Modify code
  yield* code().selection(lines(2), 0.5);
  yield* waitUntil("event9");
  yield* code().selection(lines(2, 3), 0.5);
  yield* waitUntil("event10");
  yield* code().selection(DEFAULT, 0.5);

  // Output
  yield* output().code(
    `\
Traceback (most recent call last):
File "sample.py", line 11, in <module>
average = calculate_average(numbers)
^^^^^^^^^^^^^^^^^^^^^^^^^^
File "sample.py", line 4, in calculate_average
raise ValueError("Cannot calculate average of an empty list")
ValueError: Cannot calculate average of an empty list`,
    0
  );

  // Transition from code to output
  yield* transitionFromCodeToOutput(code, output);

  yield* waitUntil("event11");

  // Modify output
  yield* output().selection(lines(6), 0.5);
  yield* waitUntil("event12");
  yield* output().selection(DEFAULT, 0.5);

  // Transition from output to code
  yield* transitionFromOutputToCode(output, code);

  // Modify code
  yield* code().selection(lines(11), 0.5);
  yield* waitUntil("event13");
  yield* code().selection(DEFAULT, 0.5);

  // Transition from code to output
  yield* transitionFromCodeToOutput(code, output);
  yield* waitUntil("event14");

  // Modify output
  yield* output().selection(lines(1), 0.5);
  yield* waitUntil("event15");
  yield* output().selection(DEFAULT, 0.5);

  // Transition from output to code
  yield* transitionFromOutputToCode(output, code);

  // // Modify code
  // yield* code().selection(lines(10), 0.5);
  // yield* code().selection(DEFAULT, 0.5);

  // Code
  yield* code().code(
    `\
def calculate_average(numbers):
    total = sum(numbers)
    if len(numbers) == 0:
        raise ValueError("Cannot calculate average of an empty list")
    average = total / len(numbers)
    return average


numbers = []

try:
    average = calculate_average(numbers)
    print(f"The average is: {average}")
except ValueError as e:
    print(f"Error: {e}")`,
    0.5
  );

  // Modify code
  yield* code().selection(lines(10, 12), 0.5);
  yield* waitUntil("event16");
  yield* code().selection(lines(13, 14), 0.5);
  yield* waitUntil("event17");
  yield* code().selection(DEFAULT, 0.5);
  yield* waitUntil("event18");

  // Output
  yield* output().code(
    `\
    Error: Cannot calculate average of an empty list`,
    0
  );

  // Transition from code to output
  yield* transitionFromCodeToOutput(code, output);
  yield* waitUntil("event19");

  yield* transitionFromOutputToCode(output, code);
  yield* waitUntil("event20");

  // Code
  yield* code().code(
    `\
class EmptyListError(Exception):

    def __init__(self):
        message = f"Cannot calculate average of an empty list (size: 0)"
        super().__init__(message)


def calculate_average(numbers):
    total = sum(numbers)
    if len(numbers) == 0:
        raise EmptyListError(len(numbers))
    average = total / len(numbers)
    return average


numbers = []

try:
    average = calculate_average(numbers)
    print(f"The average is: {average}")
except EmptyListError as e:
    print(f"Error: {e}")`,
    0.5
  );

  yield* waitUntil("event21");
  yield* code().selection(lines(0), 0.5);
  yield* waitUntil("event22");
  yield* code().selection(lines(2, 5), 0.5);

  yield* waitUntil("event23");

  // Code
  yield* code().code(
    `\
class EmptyListError(Exception):

    def __init__(self, list_size=0):
        self.list_size = list_size
        message = f"Cannot calculate average of an empty list (size: {list_size})"
        super().__init__(message)


def calculate_average(numbers):
    total = sum(numbers)
    if len(numbers) == 0:
        raise EmptyListError(len(numbers))
    average = total / len(numbers)
    return average


numbers = []

try:
    average = calculate_average(numbers)
    print(f"The average is: {average}")
except EmptyListError as e:
    print(f"Error: {e}")`,
    0.5
  );

  yield* waitUntil("event24");
  yield* code().selection(DEFAULT, 0.5);
  yield* code().selection(lines(11), 0.5);
  yield* waitUntil("event25");
  yield* code().selection(DEFAULT, 0.5);
  yield* waitUntil("event26");

  // Output
  yield* output().code(
    `\
Error: Cannot calculate average of an empty list (size: 0)`,
    0
  );

  // Transition from code to output
  yield* transitionFromCodeToOutput(code, output);
  yield* waitUntil("event27");

  yield* transitionFromOutputToCode(output, code);
  yield* waitUntil("event28");

  // yield* code().selection(lines(99), 0.5);
  yield* code().opacity(0.05, 0.5);

  yield text()
    .text("Multiple Exception Handling")
    .fill("#c6a0f6")
    .x(0)
    .y(-300)
    .textAlign("center")
    .fontSize(64, 0.5);

  yield* waitUntil("event29");

  yield* text()
    .text(
      "Multiple Exception Handling\n\nException Chaining\n\nTracebacks\n\nException Hooks"
    )
    .fill("#c6a0f6")
    .x(0)
    .y(0)
    .fontSize(64, 0.5);

  yield* waitUntil("event30");

  yield code().remove();
  yield output().remove();
  yield text().remove();

  yield* all(
    quotation_mark().opacity(0.1, 0.5),
    quote()
      .text("Just because something works, doesn't mean it cannot be improved.")
      .fill("#ed8796")
      .opacity(1, 0.5)
  );

  yield* waitUntil("event31");

  yield* all(
    quotation_mark().opacity(0, 0),
    quote()
      .text("Just because something works, doesn't mean it cannot be improved.")
      .fill("#ed8796")
      .opacity(0, 0)
  );

  yield* thanks().text("Thank You!").fill("#c6a0f6").fontSize(100, 0.5);

  yield* waitUntil("event32");
});
