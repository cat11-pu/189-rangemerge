// read.js：读区间，每段为 [起点, 终点] 两个整数，起点不得大于终点
export function readSpans(list) {
  const spans = [];
  for (const item of list || []) {
    const start = item[0];
    const end = item[1];
    if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
      const error = new Error("区间起点不得大于终点：" + JSON.stringify(item));
      error.code = "E_BAD_SPAN";
      throw error;
    }
    spans.push([start, end]);
  }
  return spans;
}
