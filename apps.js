const mode = LAUNCHER_CONFIG.buildMode === "DEV" ? "DEV" : "PROD";
const serverInfo = LAUNCHER_CONFIG.servers[mode];

let activeAddress = `${serverInfo.ip}:${serverInfo.port}`;
let selectedPackKey = "mzansi";

const els = {
  brandBadge: document.getElementById("brandBadge"),
  launcherTitle: document.getElementById("launcherTitle"),
  launcherSubtitle: document.getElementById("launcherSubtitle"),
  serverStatusLabel: document.getElementById("serverStatusLabel"),
  serverAddressDisplay: document.getElementById("serverAddressDisplay"),
  serverEndpointText: document.getElementById("serverEndpointText"),
  chooseMzansi: document.getElementById("chooseMzansi"),
  chooseVanilla: document.getElementById("chooseVanilla"),
  selectedPackDesc: document.getElementById("selectedPackDesc"),
  downloadPackBtn: document.getElementById("downloadPackBtn"),
  copyIpBtn: document.getElementById("copyIpBtn"),
  playBtn: document.getElementById("playBtn"),
  feedbackMsg: document.getElementById("feedbackMsg"),
  discordLink: document.getElementById("discordLink"),
  websiteLink: document.getElementById("websiteLink"),
  staffLink: document.getElementById("staffLink"),
  devOverrideBox: document.getElementById("devOverrideBox"),
  devIpInput: document.getElementById("devIpInput")
};

function initBranding() {
  els.brandBadge.textContent = mode === "DEV" ? "DEV" : "LV";
  els.launcherTitle.textContent = mode === "DEV"
    ? LAUNCHER_CONFIG.brand.devName
    : LAUNCHER_CONFIG.brand.prodName;
  els.launcherSubtitle.textContent = mode === "DEV"
    ? "Developer Test Build • DEV Server Only"
    : "Official Build • Locked to LightVille Server";

  els.discordLink.href = LAUNCHER_CONFIG.links.discord;
  els.websiteLink.href = LAUNCHER_CONFIG.links.website;
  els.staffLink.href = LAUNCHER_CONFIG.links.staffPortal;

  if (mode === "DEV" && serverInfo.allowCustomIp) {
    els.devOverrideBox.classList.remove("hidden");
    els.devIpInput.value = activeAddress;
    els.devIpInput.addEventListener("input", () => {
      const val = els.devIpInput.value.trim();
      if (val) {
        activeAddress = val;
        updateServerUI();
      }
    });
  }

  updateServerUI();
  updatePackUI();
}

function updateServerUI() {
  els.serverStatusLabel.textContent = mode === "DEV" ? "DEV TARGET" : "OFFICIAL SERVER";
  els.serverAddressDisplay.textContent = activeAddress;
  els.serverEndpointText.textContent = `Target Endpoint (${mode}): ${activeAddress}`;
}

function updatePackUI() {
  const pack = LAUNCHER_CONFIG.packs[selectedPackKey];
  els.chooseMzansi.classList.toggle("selected", selectedPackKey === "mzansi");
  els.chooseVanilla.classList.toggle("selected", selectedPackKey === "vanilla");
  els.selectedPackDesc.textContent = `${pack.title} — ${pack.subtitle}`;
  els.downloadPackBtn.href = pack.downloadUrl;
}

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(activeAddress);
    els.feedbackMsg.textContent = `Copied ${activeAddress} to clipboard.`;
  } catch {
    els.feedbackMsg.textContent = `Server: ${activeAddress}`;
  }
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
  });
});

els.chooseMzansi.addEventListener("click", () => {
  selectedPackKey = "mzansi";
  updatePackUI();
});

els.chooseVanilla.addEventListener("click", () => {
  selectedPackKey = "vanilla";
  updatePackUI();
});

els.copyIpBtn.addEventListener("click", copyAddress);

els.playBtn.addEventListener("click", async () => {
  await copyAddress();
  const pack = LAUNCHER_CONFIG.packs[selectedPackKey];
  els.feedbackMsg.textContent = `Ready with ${pack.title} for ${activeAddress}.`;
});

initBranding();