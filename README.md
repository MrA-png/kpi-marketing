# 📊 Svelte KPI Dashboard

**Svelte KPI Dashboard** is a modern and responsive dashboard application built with [SvelteKit](https://kit.svelte.dev/). It provides a clean interface to display marketing KPI (Key Performance Indicator) data through interactive tables and donut charts.

---

## 🚀 Features

- 📈 **Donut Chart Visualization**  
  Displays task performance categorized as `On Time` and `Late` using Chart.js.

- 📋 **KPI Data Table**  
  Tabular view of task details such as employee name, KPI category, deadlines, and actual dates.

- 🔍 **Live Search**  
  Instantly filter records by employee name.

- 🎨 **Modern UI**  
  Clean, minimalist interface with Lucide icons and Tailwind styling (if used).

- 🛡️ **Offline-Ready Fallback**  
  If the data fetch from the backend fails, the app gracefully loads predefined internal fallback data.

---

##⚙️ Requirements

Node.js v18 or higher


## 📁 Project Structure
  ```plainteks
src/
├── components/
│   ├── chart/
│   └── table/
├── lib/
│   └── data/
├── pages/                  
├── routes/
│   └── +page.svelte         
static/                     
```

---

## ⚙️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/svelte-kpi-dashboard.git
   cd svelte-kpi-dashboard
   npm install
   npm run dev
