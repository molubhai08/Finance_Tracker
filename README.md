

# Finance Dashboard (HTML + CSS + JavaScript)

A lightweight personal finance dashboard built using **HTML, CSS, and JavaScript**, with **Google Sheets as a backend database** via **Google Apps Script API**.
The app is fully deployable on **GitHub Pages** and requires **no traditional backend server**.

---

## 🚀 Features

* ✅ Add and store financial transactions
* ✅ Persistent data storage using Google Sheets
* ✅ Interactive **Pie Chart** (Leisure vs Important spending)
* ✅ **KPI Cards**:

  * Total amount spent
  * Leisure spending
  * Important spending
* ✅ Filter transactions by:

  * Type (Leisure / Important)
  * Time period (using slider)
* ✅ View transaction descriptions dynamically
* ✅ Mobile & GitHub Pages friendly

---

## 🧠 Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript
* Chart.js (for visualization)

**Backend (Serverless)**

* Google Sheets
* Google Apps Script (REST API)

**Hosting**

* GitHub Pages

---

## 🗂️ Project Structure

```
/project-root
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

---

## 📑 Google Sheet Format

Your Google Sheet **must have these headers (exact order):**

```
Date | Description | Amount | Type
```

Where:

* **Date** → `YYYY-MM-DD`
* **Amount** → Number
* **Type** → `Leisure` or `Important`

---

## 🔌 API Setup (Google Apps Script)

1. Open Google Sheets
2. Go to **Extensions → Apps Script**
3. Paste the provided `doGet` and `doPost` code
4. Deploy as **Web App**

   * Execute as: **Me**
   * Access: **Anyone**
5. Copy the deployment URL
6. Paste it into `app.js` as `API_URL`

```js
const API_URL = "YOUR_APPS_SCRIPT_URL";
```

---

## 📤 Sending Data (POST Format)

Example payload sent from frontend:

```json
{
  "date": "2026-01-01",
  "description": "Movie Ticket",
  "amount": 300,
  "type": "Leisure"
}
```

---

## 📊 Dashboard Logic

* Data is fetched once using `GET`
* All calculations (KPIs, charts, filters) happen **client-side**
* A single controller function keeps:

  * Chart
  * KPIs
  * List
  * Filters
    fully in sync

---



Just tell me 👍
