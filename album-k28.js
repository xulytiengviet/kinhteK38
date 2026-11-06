(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const viewer = $("albumK28Viewer");
  if (!viewer) return;

  // The current archive always comes from K28(1).zip. Legacy photos provide
  // a temporary, real-image fallback only while the 44 originals are missing.
  const TOTAL = 44;
  const archive = Array.from({length: TOTAL}, (_, i) =>
    "images/anh-k28/" + String(i + 1).padStart(2, "0") + ".jpg");
  const legacy = Array.from({length: 10}, (_, i) =>
    "images/ky-niem-k28-goc/" + String(i + 1).padStart(2, "0") + ".webp");

  const image = $("albumK28Image"), status = $("albumK28Status");
  const empty = $("albumK28Empty"), dialog = $("albumK28Lightbox");
  const dots = $("albumK28Dots");
  const zoom = $("albumK28Zoom");
  let photos = [], current = 0, token = 0, touchStart = null;
  let lastFocused = null, displayReady = false, source = "loading";
  const label = () => String(current + 1).padStart(2, "0") + " / " + String(photos.length).padStart(2, "0");
  const showStatus = message => {
    status.textContent = message || "";
    status.hidden = !message;
  };
  const imageExists = url => new Promise(resolve => {
    const check = new Image();
    check.onload = () => resolve(true);
    check.onerror = () => resolve(false);
    check.src = url;
  });

  function updateLabels() {
    const suffix = String(current + 1).padStart(2, "0");
    $("albumK28Title").textContent = "Ảnh K28 · Tấm " + suffix;
    $("albumK28Counter").textContent = label();
    $("albumK28LightboxIndex").textContent = label();
    $("albumK28LightboxLabel").textContent = "Ảnh K28 · " + suffix;
    for (const [i, dot] of Array.from(dots.children).entries()) {
      const active = i === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    }
    const selected = dots.children[current];
    if (selected && typeof selected.scrollIntoView === "function") {
      const left = selected.offsetLeft - dots.offsetLeft - (dots.clientWidth - selected.offsetWidth) / 2;
      if (typeof dots.scrollTo === "function") dots.scrollTo({left: Math.max(0, left), behavior: "auto"});
    }
  }

  function createDots() {
    dots.replaceChildren();
    for (let i = 0; i < photos.length; i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "k28-album-dot";
      button.textContent = String(i + 1).padStart(2, "0");
      button.setAttribute("aria-label", "Xem ảnh K28 số " + (i + 1));
      button.addEventListener("click", () => render(i));
      dots.append(button);
    }
    dots.setAttribute("aria-label", "Chọn một trong " + photos.length + " ảnh K28");
  }

  function render(nextIndex) {
    if (!photos.length) return;
    current = (nextIndex + photos.length) % photos.length;
    const thisToken = ++token;
    updateLabels();
    displayReady = false;
    empty.hidden = true;
    // Retain the current photograph while the next one loads: no blank flash.
    image.classList.add("is-changing");
    const probe = new Image();
    probe.onload = () => {
      if (thisToken !== token) return;
      image.src = probe.src;
      image.alt = "Ảnh K28, tấm " + (current + 1) + " trên " + photos.length;
      image.classList.remove("is-changing");
      displayReady = true;
      empty.hidden = true;
      if (dialog.open) {
        $("albumK28LightboxImage").src = probe.src;
        $("albumK28LightboxImage").alt = image.alt;
      }
      // Download only the next image, not the entire archive.
      if (photos.length > 1) {
        const nextPhoto = new Image();
        nextPhoto.src = photos[(current + 1) % photos.length];
      }
    };
    probe.onerror = () => {
      if (thisToken !== token) return;
      image.classList.remove("is-changing");
      // No white placeholder: switch to the next usable image.
      const failed = photos.splice(current, 1);
      if (photos.length) {
        createDots();
        showStatus("Đang bỏ qua một ảnh không thể tải: " + failed[0].split("/").pop() + ".");
        render(Math.min(current, photos.length - 1));
        return;
      }
      image.removeAttribute("src");
      displayReady = false;
      empty.hidden = false;
      empty.textContent = "Không thể tải ảnh K28. Vui lòng kiểm tra đường dẫn ảnh.";
      showStatus("Ảnh đang thiếu trên máy chủ. Vui lòng đồng bộ ảnh vào repository.");
    };
    probe.src = photos[current];
  }

  function step(delta) {
    if (photos.length) render(current + delta);
  }

  viewer.querySelectorAll("[data-k28-prev]").forEach(button =>
    button.addEventListener("click", () => step(-1)));
  viewer.querySelectorAll("[data-k28-next]").forEach(button =>
    button.addEventListener("click", () => step(1)));
  zoom.addEventListener("click", () => {
    if (!displayReady || !photos.length) return;
    lastFocused = document.activeElement;
    $("albumK28LightboxImage").src = photos[current];
    $("albumK28LightboxImage").alt = image.alt;
    dialog.showModal();
  });
  $("albumK28LightboxClose").addEventListener("click", () => dialog.close());
  $("albumK28LightboxPrev").addEventListener("click", () => step(-1));
  $("albumK28LightboxNext").addEventListener("click", () => step(1));
  dialog.addEventListener("close", () => {
    if (lastFocused && lastFocused.isConnected) lastFocused.focus();
  });
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  const stage = $("albumK28Stage");
  stage.addEventListener("touchstart", event => {
    if (event.touches.length === 1) touchStart = event.touches[0].clientX;
  }, {passive: true});
  stage.addEventListener("touchend", event => {
    if (touchStart === null || !event.changedTouches.length) return;
    const difference = event.changedTouches[0].clientX - touchStart;
    touchStart = null;
    if (Math.abs(difference) > 45) step(difference < 0 ? 1 : -1);
  }, {passive: true});
  document.addEventListener("keydown", event => {
    if (!dialog.open && !viewer.contains(document.activeElement)) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
  });

  async function initialize() {
    // New archive is selected only when the first and last items are present.
    // This avoids the all-white failure while a GitHub upload is incomplete.
    const [firstNew, lastNew] = await Promise.all([
      imageExists(archive[0]), imageExists(archive[TOTAL - 1])
    ]);
    if (firstNew && lastNew) {
      photos = archive.slice();
      source = "archive";
      viewer.classList.remove("is-fallback");
      showStatus("");
    } else if (await imageExists(legacy[0])) {
      photos = legacy.slice();
      source = "legacy";
      viewer.classList.add("is-fallback");
      showStatus("Đang hiển thị 10 ảnh K28 hiện có. Bộ 44 ảnh mới sẽ tự xuất hiện sau khi được đồng bộ lên website.");
    } else {
      // Some deployments contain only the processed WebP directory.
      const alternative = legacy.map(path => path.replace("ky-niem-k28-goc", "ky-niem-k28"));
      if (await imageExists(alternative[0])) {
        photos = alternative;
        source = "legacy";
        showStatus("Đang hiển thị ảnh K28 hiện có. Bộ 44 ảnh mới chưa được đồng bộ lên website.");
      }
    }
    if (!photos.length) {
      empty.hidden = false;
      empty.textContent = "Chưa có ảnh K28 trên máy chủ.";
      showStatus("Cần tải bộ ảnh K28 vào GitHub trước khi hiển thị.");
      $("albumK28Counter").textContent = "00 / 00";
      return;
    }
    createDots();
    render(0);
  }
  initialize().catch(() => {
    empty.hidden = false;
    empty.textContent = "Không thể tải album K28.";
    showStatus("Đường dẫn ảnh hoặc kết nối máy chủ gặp sự cố.");
  });
})();
