// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "区间 " + (spec.spans || []).length + " 段，点合并看结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.merged.forEach(function (span, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 段";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      const start = span[0];
      const width = span[1] - span[0];
      fill.style.marginLeft = Math.min(100, Math.max(0, start)) + "%";
      fill.style.width = Math.min(100, Math.max(0, width)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = span[0] + " 到 " + span[1];
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "合并后 " + view.count + " 段，覆盖总长 " + view.covered;
    parts.log.textContent = "原段数 " + (spec.spans || []).length;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "合并区间";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一段";
  addButton.addEventListener("click", function () {
    spec.spans = (spec.spans || []).concat([[13, 16]]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一段";
  dropButton.addEventListener("click", function () {
    spec.spans = (spec.spans || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段区间";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "4-7";
  box.addEventListener("input", function () {
    const pieces = box.value.split("-");
    try {
      const view = render(Object.assign({}, spec, { spans: [[Number(pieces[0]), Number(pieces[1])]] }));
      parts.out.textContent = box.value + " 合并后 " + view.count + " 段";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看覆盖总长";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "覆盖总长 " + view.covered + "，合并后 " + view.count + " 段";
  });
  parts.controls.appendChild(readButton);

  draw();
}
