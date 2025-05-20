# UAS-HMI React App

A research-focused Human-Machine Interface (HMI) prototype for **monitoring unmanned aircraft systems (UAS)** in simulated environments. This application was developed as part of my **master's thesis** at the **German Aerospace Center (DLR)**.

---

## 📚 About the Thesis

This app was built for my master's thesis titled:

> **"Human Machine Interface for future aircraft guidance systems"**

The focus is on designing a **modular, flexible, and research-friendly HMI** using modern web technologies. The prototype supports **real-time UAS monitoring**, emphasizing:

- Safety risk visibility
- System state awareness
- Map-based interaction
- Fast iteration and usability for non-programmers

---

## 🧰 Tech Stack

| Category     | Technology         |
|--------------|--------------------|
| UI Framework | React              |
| UI Library   | Material UI (MUI)  |
| Map Engine   | Mapbox GL JS       |
| Icons        | Custom PNG Icons   |
| Data Format  | JSON               |
| DOM Engine   | ReactDOM           |

---

## 🗺️ Features

- Interactive map with **Mapbox GL JS**
- Custom drone icons based on **system severity**
- Aircraft list sorted by **risk level**
- Popups showing aircraft status in real time
- MUI components for consistent UI styling
- Modular architecture to enable **fast prototyping**

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 recommended)
- npm or yarn
- Mapbox Access Token (get one from https://account.mapbox.com)

---

### 🔧 Installation

```bash
git clone https://github.com/Anjaly1991997/uas-hmi-project.git
cd uas-hmi-project
npm install

---

### Run the App

```bash
npm start
Visit http://localhost:3000

uas-hmi-project/
├── public/
├── src/
│   ├── assets/              # Drone icons
│   ├── components/          # AircraftList, MapPanel, Sidebar, etc.
│   ├── data/                # aircraftData.json
│   ├── App.js               # Root component
│   └── index.js             # ReactDOM.render
├── .env
├── package.json
└── README.md
