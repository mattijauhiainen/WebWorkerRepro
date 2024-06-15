import { invoke } from "@tauri-apps/api/tauri";
// import { resolveResource } from "@tauri-apps/api/path";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});

(async () => {
  console.log("Loading worker");
  // const path = await resolveResource("src/worker.ts");
  // new Worker(path, { type: "module" });
  new Worker("src/worker.js", { type: "module" });
  console.log("Loaded worker");
})();
