const form = document.querySelector("#event-form");
const posterInput = document.querySelector("#poster-input");
const posterPreview = document.querySelector(".poster-preview");
const socialImages = document.querySelectorAll(".social-image");
const previewTitle = document.querySelector(".preview-copy h3");
const previewPlace = document.querySelector(".preview-copy p");
let posterData = "";

const readEvents = () => {
  try { return JSON.parse(localStorage.getItem("ifcmAdminEvents") || "[]"); }
  catch { return []; }
};
const writeEvents = (events) => localStorage.setItem("ifcmAdminEvents", JSON.stringify(events));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[character]));
}

function formatDates(start, end) {
  const a = new Date(`${start}T12:00:00`);
  const b = new Date(`${end}T12:00:00`);
  const options = { day:"numeric", month:"long", year:"numeric" };
  return `${a.toLocaleDateString("en-GB", options)} – ${b.toLocaleDateString("en-GB", options)}`;
}

function generateCaption(event) {
  return `🎶 ${event.title}\n📍 ${event.city}, ${event.country}\n📅 ${formatDates(event.startDate, event.endDate)}\n\n${event.description}\n\nDiscover more through IFCM. #IFCM #ChoralMusic #CreatorsTransformingTheWorld`;
}

function updatePreview() {
  const data = new FormData(form);
  previewTitle.textContent = data.get("title") || "Your event title";
  previewPlace.textContent = [data.get("city"), data.get("country")].filter(Boolean).join(" · ") || "City · Country";
}
form.addEventListener("input", updatePreview);

posterInput.addEventListener("change", () => {
  const file = posterInput.files[0];
  if (!file) return;
  if (file.size > 1.5 * 1024 * 1024) {
    document.querySelector(".form-status").textContent = "For this browser demonstration, please use a poster smaller than 1.5 MB. Production will use secure media storage.";
    posterInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    posterData = reader.result;
    posterPreview.style.backgroundImage = `url("${posterData}")`;
    posterPreview.classList.add("has-image");
    socialImages.forEach((image) => image.style.backgroundImage = `url("${posterData}")`);
  };
  reader.readAsDataURL(file);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const newEvent = {
    id: Date.now(),
    ...data,
    poster: posterData,
    caption: data.caption || generateCaption(data),
    status: "pending",
    submittedAt: new Date().toISOString()
  };
  const events = readEvents();
  events.unshift(newEvent);
  writeEvents(events);
  form.reset();
  posterData = "";
  posterPreview.style.backgroundImage = "";
  posterPreview.classList.remove("has-image");
  socialImages.forEach((image) => image.style.backgroundImage = "");
  document.querySelector(".form-status").textContent = "Event submitted. It is now waiting for IFCM editorial approval.";
  updatePreview();
  renderQueue();
});

function approveEvent(id) {
  const events = readEvents();
  const event = events.find((item) => item.id === id);
  if (!event) return;
  event.status = "approved";
  event.approvedAt = new Date().toISOString();
  event.channels = { website:"published", facebook:"simulated", instagram:"simulated" };
  writeEvents(events);
  const start = new Date(`${event.startDate}T12:00:00`);
  const approved = JSON.parse(localStorage.getItem("ifcmApprovedEvents") || "[]").filter((item) => item.adminId !== id);
  approved.unshift({
    adminId:id, title:event.title, place:`${event.city}, ${event.country}`,
    start:String(start.getDate()).padStart(2,"0"),
    month:start.toLocaleDateString("en-GB",{month:"short"}).toUpperCase(),
    year:String(start.getFullYear()), range:formatDates(event.startDate,event.endDate),
    type:event.type, url:event.url || "admin.html"
  });
  localStorage.setItem("ifcmApprovedEvents", JSON.stringify(approved));
  updateSocialPreview(event);
  renderQueue();
}

function rejectEvent(id) {
  const events = readEvents().map((event) => event.id === id ? {...event,status:"rejected"} : event);
  writeEvents(events);
  renderQueue();
}

function updateSocialPreview(event) {
  document.querySelectorAll(".social-caption").forEach((node) => node.textContent = event.caption);
  socialImages.forEach((image) => image.style.backgroundImage = event.poster ? `url("${event.poster}")` : "");
}

function renderQueue() {
  const events = readEvents();
  document.querySelector(".pending-count").textContent = events.filter((event) => event.status === "pending").length;
  document.querySelector(".approved-count").textContent = events.filter((event) => event.status === "approved").length;
  const queue = document.querySelector(".queue-list");
  if (!events.length) {
    queue.innerHTML = `<p class="queue-empty">No event submissions yet. Complete the form above to test the workflow.</p>`;
    return;
  }
  queue.innerHTML = events.map((event) => `
    <article class="queue-item">
      <div class="queue-thumb"${event.poster ? ` style="background-image:url('${event.poster}')"` : ""}></div>
      <div class="queue-info"><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.city)}, ${escapeHtml(event.country)} · ${formatDates(event.startDate,event.endDate)}</small><span class="status-pill ${event.status}">${event.status}</span></div>
      <div class="queue-actions">
        ${event.status === "pending" ? `<button class="approve" data-approve="${event.id}">Approve & publish</button><button data-reject="${event.id}">Reject</button>` : `<button data-preview="${event.id}">Preview channels</button>`}
      </div>
    </article>`).join("");
  queue.querySelectorAll("[data-approve]").forEach((button) => button.addEventListener("click", () => approveEvent(Number(button.dataset.approve))));
  queue.querySelectorAll("[data-reject]").forEach((button) => button.addEventListener("click", () => rejectEvent(Number(button.dataset.reject))));
  queue.querySelectorAll("[data-preview]").forEach((button) => button.addEventListener("click", () => {
    const event = readEvents().find((item) => item.id === Number(button.dataset.preview));
    if (event) updateSocialPreview(event);
    document.querySelector(".social-preview").scrollIntoView({behavior:"smooth"});
  }));
}

renderQueue();

const shareLauncher = document.querySelector(".share-launcher");
const sharePanel = document.querySelector(".share-panel");
const shareUrl = encodeURIComponent(window.location.href);
const shareTitle = encodeURIComponent(document.title);
document.querySelector('[data-share-link="facebook"]').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
document.querySelector('[data-share-link="linkedin"]').href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
document.querySelector('[data-share-link="whatsapp"]').href = `https://wa.me/?text=${shareTitle}%20${shareUrl}`;
document.querySelector('[data-share-link="x"]').href = `https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}`;
document.querySelector('[data-share-link="email"]').href = `mailto:?subject=${shareTitle}&body=${shareUrl}`;
shareLauncher.addEventListener("click", () => {
  const open = sharePanel.classList.toggle("open");
  sharePanel.setAttribute("aria-hidden", String(!open));
  shareLauncher.setAttribute("aria-expanded", String(open));
});
document.querySelector('[data-share="native"]').addEventListener("click", async () => {
  if (navigator.share) {
    try { await navigator.share({title:document.title,url:window.location.href}); } catch (error) {}
  } else document.querySelector(".share-status").textContent = "Use one of the options below.";
});
document.querySelector('[data-share="copy"]').addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    document.querySelector(".share-status").textContent = "Link copied.";
  } catch (error) {
    document.querySelector(".share-status").textContent = "Copy the address from your browser.";
  }
});
