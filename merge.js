// merge.js：先按起点（终点次之）排序，再单次扫描合并；贴边也算连上
import { readSpans } from "./read.js";

export function mergeSpans(list) {
  const spans = readSpans(list);
  const ordered = spans.slice().sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  const merged = [];
  let covered = 0;
  for (const span of ordered) {
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
