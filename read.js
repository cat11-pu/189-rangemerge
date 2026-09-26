// read.js：读区间，校验每段起点不大于终点
export function readSpans(list) {
  const spans = list || [];
  return spans.map(function (span) {
    const start = span[0];
    const end = span[1];
    if (start > end) {
      const error = new Error("起点大于终点：[" + start + ", " + end + "]");
      error.code = "E_BAD_SPAN";
      throw error;
    }
    return [start, end];
  });
}
