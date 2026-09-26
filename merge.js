// merge.js：合并区间，一次排序加一次扫描
import { readSpans } from "./read.js";

export function mergeSpans(list) {
  const spans = readSpans(list).slice();
  spans.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });
  const merged = [];
  let covered = 0;
  for (const span of spans) {
    const last = merged[merged.length - 1];
    if (last && span[0] <= last[1]) {
      if (span[1] > last[1]) {
        covered += span[1] - last[1];
        last[1] = span[1];
      }
    } else {
      merged.push([span[0], span[1]]);
      covered += span[1] - span[0];
    }
  }
  return { merged: merged, covered: covered };
}
