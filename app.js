const DEFAULT_CONFIG = {
  buildMode: "PROD",
  brand: {
    prodName: "LIGHTVILLE RP",
    devName: "LIGHTVILLE DEV KIT"
  },
  servers: {
    PROD: { ip: "127.0.0.1", port: "7777", allowCustomIp: false },
    DEV: { ip: "127.0.0.1", port: "7778", allowCustomIp: true }
  },
  packs: {
    mzansi: {
      title: "GTA Mzansi Modpack",
      subtitle: "Full LightVille vehicles, skins & Mzansi map content",
      downloadUrl: "#"
    },
    vanilla: {
      title: "GTA SA Base Pack",
      subtitle: "Lightweight option for devices with limited storage",
      downloadUrl: "#"
    }
  },
  links: {
    website: "#",
    discord: "#",
    staffPortal: "#"
  }
};

const cfg = typeof LAUNCHER_CONFIG !== "undefined" ? LAUNCHER_CONFIG : DEFAULT_CONFIG;
const mode = cfg.buildMode === "DEV" ? "DEV" : "PROD";
const serverInfo = cfg.servers[mode];

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

function updateServerUI() {
  if (els.serverStatusLabel) {
    els.serverStatusLabel.textContent = mode === "DEV" ? "DEV TARGET" : "OFFICIAL SERVER";
  }
  if (els.serverAddressDisplay) {
    els.serverAddressDisplay.textContent = activeAddress;
  }
  if (els.serverEndpointText) {
    els.serverEndpointText.textContent = `Target Endpoint (${mode}): ${activeAddress}`;
  }
}

function updatePackUI() {
  const pack = cfg.packs[selectedPackKey];
  if (!pack) return;

  if (els.chooseMzansi) {
    els.chooseMzansi.classList.toggle("selected", selectedPackKey === "mzansi");
  }
  if (els.chooseVanilla) {
    els.chooseVanilla.classList.toggle("selected", selectedPackKey === "vanilla");
  }
  if (els.selectedPackDesc) {
    els.selectedPackDesc.textContent = `${pack.title} — ${pack.subtitle}`;
  }
  if (els.downloadPackBtn) {
    els.downloadPackBtn.href = pack.downloadUrl;
  }
}

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(activeAddress);
    if (els.feedbackMsg) {
      els.feedbackMsg.textContent = `Copied ${activeAddress} to clipboard.`;
    }
  } catch {
    if (els.feedbackMsg) {
      els.feedbackMsg.textContent = `Server: ${activeAddress}`;
    }
  }
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    const target = document.getElementById(`tab-${btn.dataset.tab}`);
    if (target) target.classList.add("active");
  });
});

if (els.chooseMzansi) {
  els.chooseMzansi.addEventListener("click", () => {
    selectedPackKey = "mzansi";
    updatePackUI();
  });
}

if (els.chooseVanilla) {
  els.chooseVanilla.addEventListener("click", () => {
    selectedPackKey = "vanilla";
    updatePackUI();
  });
}

if (els.copyIpBtn) {
  els.copyIpBtn.addEventListener("click", copyAddress);
}

if (els.playBtn) {
  els.playBtn.addEventListener("click", async () => {
    await copyAddress();
    const pack = cfg.packs[selectedPackKey];
    if (els.feedbackMsg && pack) {
      els.feedbackMsg.textContent = `Ready with ${pack.title} for ${activeAddress}.`;
    }
  });
}

if (els.brandBadge) {
  els.brandBadge.textContent = mode === "DEV" ? "DEV" : "LV";
}
if (els.launcherTitle) {
  els.launcherTitle.textContent = mode === "DEV" ? cfg.brand.devName : cfg.brand.prodName;
}
if (els.launcherSubtitle) {
  els.launcherSubtitle.textContent = mode === "DEV"
    ? "Developer Test Build • DEV Server Only"
    : "Official Build • Locked to LightVille Server";
}
if (els.discordLink) els.discordLink.href = cfg.links.discord;
if (els.websiteLink) els.websiteLink.href = cfg.links.website;
if (els.staffLink) els.staffLink.href = cfg.links.staffPortal;

if (mode === "DEV" && serverInfo.allowCustomIp && els.devOverrideBox && els.devIpInput) {
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