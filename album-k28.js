(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const viewer = $("albumK28Viewer");
  if (!viewer) return;
  const TOTAL = 44;
  const pathFor = i => "images/anh-k28/" + String(i + 1).padStart(2, "0") + ".jpg";
  const image = $("albumK28Image"), status = $("albumK28Status");
  const empty = $("albumK28Empty"), dialog = $("albumK28Lightbox");
  const dots = $("albumK28Dots");
  let current = 0, touchStart = null, lastFocused = null, token = 0, photoReady = false;
  const showStatus = msg => { status.textContent = msg || ""; status.hidden = !msg; };
  const keepIndex = () => String(current + 1).padStart(2, "0") + " / " + TOTAL;
  function synchronizeLabels() {
    $("albumK28Title").textContent = "Ảnh K28 · Tấm " + String(current + 1).padStart(2, "0");
    $("albumK28Counter").textContent = keepIndex();
    $("albumK28LightboxIndex").textContent = keepIndex();
    $("albumK28LightboxLabel").textContent = "Ảnh K28 · " + String(current + 1).padStart(2, "0");
    for (const [n, dot] of Array.from(dots.children).entries()) {
      dot.classList.toggle("is-active", n === current);
      dot.setAttribute("aria-current", n === current ? "true" : "false");
      if (n === current) dot.scrollIntoView({block:"nearest", inline:"nearest", behavior:"instant"});
    }
  }
  function render(i) {
    current = (i + TOTAL) % TOTAL;
    const thisToken = ++token;
    synchronizeLabels();
    image.style.visibility = "hidden";
    empty.hidden = true;
    photoReady = false;
    const probe = new Image();
    probe.onload = () => {
      if (thisToken !== token) return;
      image.src = probe.src;
      image.alt = "Ảnh K28, tấm " + (current + 1) + " trong 44 ảnh";
      image.style.visibility = "visible";
      photoReady = true;
      empty.hidden = true;
      showStatus("");
      if (dialog.open) $("albumK28LightboxImage").src = probe.src;
      const preload = new Image();
      preload.src = pathFor((current + 1) % TOTAL);
    };
    probe.onerror = () => {
      if (thisToken !== token) return;
      image.removeAttribute("src");
      image.style.visibility = "hidden";
      empty.hidden = false;
      empty.textContent = "Ảnh K28 · tấm " + (current + 1) + " chưa được đồng bộ lên máy chủ.";
      showStatus("Bộ 44 ảnh nguyên bản đang chờ đồng bộ vào images/anh-k28. Mã trình chiếu đã sẵn sàng.");
    };
    probe.src = pathFor(current);
  }
  function move(delta) { render(current + delta); }
  for (let i = 0; i < TOTAL; i++) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "k28-album-dot"; b.textContent = String(i + 1).padStart(2, "0");
    b.setAttribute("aria-label", "Xem ảnh K28 số " + (i + 1));
    b.addEventListener("click", () => render(i));
    dots.appendChild(b);
  }
  viewer.querySelectorAll("[data-k28-prev]").forEach(b => b.addEventListener("click", () => move(-1)));
  viewer.querySelectorAll("[data-k28-next]").forEach(b => b.addEventListener("click", () => move(1)));
  $("albumK28Zoom").addEventListener("click", () => {
    if (!photoReady) return;
    lastFocused = document.activeElement;
    $("albumK28LightboxImage").src = pathFor(current);
    $("albumK28LightboxImage").alt = "Ảnh K28, tấm " + (current + 1);
    dialog.showModal();
  });
  $("albumK28LightboxClose").addEventListener("click", () => dialog.close());
  $("albumK28LightboxPrev").addEventListener("click", () => move(-1));
  $("albumK28LightboxNext").addEventListener("click", () => move(1));
  dialog.addEventListener("close", () => { if (lastFocused && lastFocused.isConnected) lastFocused.focus(); });
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
  const stage = $("albumK28Stage");
  stage.addEventListener("touchstart", e => {
    if (e.touches.length === 1) touchStart = e.touches[0].clientX;
  }, {passive:true});
  stage.addEventListener("touchend", e => {
    if (touchStart === null || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - touchStart; touchStart = null;
    if (Math.abs(dx) > 45) move(dx < 0 ? 1 : -1);
  }, {passive:true});
  document.addEventListener("keydown", e => {
    if (!dialog.open && !viewer.contains(document.activeElement)) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
  });
  render(0);
})();
