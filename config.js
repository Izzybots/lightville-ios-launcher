// config.js
const LAUNCHER_CONFIG = {
  // Change mode to "DEV" only for your developer testing build
  buildMode: "PROD", // "PROD" | "DEV"

  brand: {
    prodName: "LIGHTVILLE RP",
    devName: "LIGHTVILLE DEV KIT",
    tagline: "GTA MZANSI & SA"
  },

  servers: {
    PROD: {
      ip: "127.0.0.1",      // Replace with LightVille PROD IP
      port: "7777",           // Replace with LightVille PROD Port
      label: "LightVille Official Server",
      allowCustomIp: false
    },
    DEV: {
      ip: "127.0.0.1",      // Replace with LightVille DEV IP
      port: "7778",           // Replace with LightVille DEV Port
      label: "LightVille DEV Test Server",
      allowCustomIp: true
    }
  },

  packs: {
    mzansi: {
      id: "mzansi",
      title: "GTA Mzansi Modpack",
      subtitle: "Full LightVille vehicles, skins & Mzansi map content",
      downloadUrl: "https://example.com/lightville-mzansi-pack.zip"
    },
    vanilla: {
      id: "vanilla",
      title: "GTA SA Base Pack",
      subtitle: "Lightweight option for devices with limited storage",
      downloadUrl: "https://example.com/lightville-gtasa-base.zip"
    }
  },

  links: {
    website: "https://example.com",
    discord: "https://discord.gg/example",
    staffPortal: "https://example.com/staff"
  }
};