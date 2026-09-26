// app.js：渲染结果
import { readSpans } from "./read.js";
import { mergeSpans } from "./merge.js";

export function render(spec) {
  const spans = spec.spans || [];
  const read = readSpans(spans);
  const view = mergeSpans(spans);
  const merged = view.merged || [];
  return { merged: merged, count: merged.length, covered: view.covered || 0,
           read_count: read.length, widest: merged.reduce((best, item) => Math.max(best, item[1] - item[0]), 0),
           original: spans.length };
}
