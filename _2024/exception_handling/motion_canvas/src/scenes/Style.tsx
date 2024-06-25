import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const MyStyle = HighlightStyle.define([
  { tag: tags.comment, color: "#6C7086", fontStyle: "italic" }, // Surface2
  { tag: tags.string, color: "#A6E3A1" }, // Green
  { tag: tags.number, color: "#f5a97f" }, // Peach
  { tag: tags.keyword, color: "#c6a0f6" }, // Mauve
  { tag: tags.operator, color: "#c6a0f6" }, // Mauve
  { tag: tags.punctuation, color: "#cad3f5" }, // Text
  { tag: tags.bracket, color: "#F38BA8" }, // Red
  { tag: tags.paren, color: "#F38BA8" }, // Red
  { tag: tags.brace, color: "#F38BA8" }, // Red
  { tag: tags.variableName, color: "#cad3f5" }, // Text
  { tag: tags.attributeName, color: "#c6a0f6" }, // Mauve
  { tag: tags.className, color: "#F2CDCD" }, // Flamingo
  { tag: tags.function(tags.variableName), color: "#89B4FA" }, // Blue
  { tag: tags.variableName, color: "#F38BA8" }, // Red
  { tag: tags.name, color: "#cad3f5" }, // Text
  { tag: tags.separator, color: "#cad3f5" }, // Text
  { tag: tags.bool, color: "#c6a0f6" }, // Mauve
  { tag: tags.className, color: "#eed49f" }, // Yellow
]);

export default MyStyle;
