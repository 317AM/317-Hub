# Hub 317

A personal home-server dashboard. Dark, smooth, Hyprland-inspired.
Runs on ASP.NET Core 9 and serves a vanilla HTML/CSS/JS frontend.

```
sidebar  ·  AI Chat  ·  Moodle  ·  Calendar  ·  Catgirl DL
         ·  Recipes  ·  Media   ·  GitHub
```

---

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| [.NET SDK](https://dotnet.microsoft.com/download) | 9.0+ | `dotnet --version` |
| Git | any | `git --version` |

---

## Run locally

```bash
# from the Hub317/ folder
dotnet run
```

Then open **http://localhost:317** in your browser.

The port `317` is set in `Properties/launchSettings.json`.
You can change it there or override at runtime:

```bash
dotnet run --urls "http://localhost:317"
```

> **Can you customise the URL?**
> Yes — `localhost:317` works out of the box via `launchSettings.json`.
> For a hostname like `hub.local` instead of `localhost`, add an entry to
> your hosts file:
>
> ```
> # Windows: C:\Windows\System32\drivers\etc\hosts
> # Linux/macOS: /etc/hosts
> 127.0.0.1   hub.local
> ```
>
> Then set `applicationUrl` to `http://hub.local:317` in `launchSettings.json`.
> From other devices on the same network, use your machine's LAN IP
> (e.g. `http://192.168.1.x:317`) — no hosts-file trick needed there.

---

## Set up Git and push to GitHub

```bash
# 1. Initialise a local repo (run once, inside Hub317/)
git init
git add .
git commit -m "chore: initial Hub 317 scaffold"

# 2. Create a repo on GitHub (via gh CLI or the website), then:
git remote add origin https://github.com/YOUR_USERNAME/hub317.git
git branch -M main
git push -u origin main
```

> If you use the **GitHub CLI**:
> ```bash
> gh repo create hub317 --private --source=. --push
> ```
> One command — creates the remote and pushes everything.

---

## Run from a server (browser-accessible)

```bash
# Build a self-contained release binary
dotnet publish -c Release -o ./publish

# Run the published binary
./publish/Hub317          # Linux / macOS
publish\Hub317.exe        # Windows
```

For permanent hosting behind nginx or Caddy, point a reverse-proxy to
`http://localhost:317` and handle TLS there.

Example minimal **Caddyfile**:
```
hub.yourdomain.com {
    reverse_proxy localhost:317
}
```

---

## Project layout

```
Hub317/
├── Program.cs                  ← ASP.NET Core entry point
├── Hub317.csproj               ← Project file (targets net9.0)
├── Hub317.slnx                 ← Solution file (VS 2022 XML format)
├── appsettings.json            ← App config
├── Properties/
│   └── launchSettings.json     ← Port 317 lives here
├── Controllers/
│   └── StatusController.cs     ← GET /api/status · template for new APIs
└── wwwroot/                    ← Everything served to the browser
    ├── index.html              ← App shell
    ├── css/
    │   └── style.css           ← Full dark/light theme
    └── js/
        └── app.js              ← SPA router, clock, theme switcher
```

---

## Adding a new section

1. Add an entry to `NAV_ITEMS` in `wwwroot/js/app.js`.
2. When ready to wire it up, create a controller in `Controllers/` and a
   page renderer in `app.js`.

---

## API check

```bash
curl http://localhost:317/api/status
```

Returns:
```json
{
  "hub": "Hub 317",
  "version": "0.1.0",
  "status": "online",
  "timestamp": "...",
  "endpoints": ["GET /api/status"]
}
```

---

