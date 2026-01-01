const Button = document.getElementById("sub") ;

Button.addEventListener('click' , () => {
    const date = document.getElementById("dat") ;
    const desc = document.getElementById("desc") ;
    const num = document.getElementById("num") ;
    const type = document.getElementById("type") ;

    const date_val = document.getElementById("dat").value ;
    const desc_val = document.getElementById("desc").value ;
    const num_val = document.getElementById("num").value ;
    const type_val = document.getElementById("type").value ;

    fetch("https://script.google.com/macros/s/AKfycbw7KO9tYPzkSgTJue83HxGwajP8evtHHBD_BBrVJisbZzEvzeQ-66mkGtvF3-MiUfKE0w/exec", {
        method: "POST",
        body: JSON.stringify({
            date: date_val , 
            description: desc_val,
            amount: num_val,
            type: type_val,
        })
        });


    console.log(date_val);
    console.log(desc_val);
    console.log(num_val);
    console.log(type_val);

    date.value = ""
    desc.value = ""
    num.value = ""
    type.value = ""


    

} )

const API_URL = "https://script.google.com/macros/s/AKfycbw7KO9tYPzkSgTJue83HxGwajP8evtHHBD_BBrVJisbZzEvzeQ-66mkGtvF3-MiUfKE0w/exec";

let allData = [];
let pieChart;

// Load data
async function loadData() {
  const res = await fetch(API_URL);
  allData = await res.json();
  updateDashboard();
}

// Filter by days
function filterByDays(data, days) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return data.filter(d => new Date(d.Date) >= cutoff);
}

// KPIs
function calculateKPIs(data) {
  let total = 0, leisure = 0, important = 0;

  data.forEach(d => {
    const amt = Number(d.Amount);
    total += amt;
    if (d.Type === "Leisure") leisure += amt;
    if (d.Type === "Important") important += amt;
  });

  return { total, leisure, important };
}

// Pie chart
function renderPie(data) {
  const totals = { Leisure: 0, Important: 0 };

  data.forEach(d => totals[d.Type] += Number(d.Amount));

  pieChart?.destroy();

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Leisure", "Important"],
      datasets: [{
        data: [totals.Leisure, totals.Important]
      }]
    },
    options: { animation: false }
  });
}

// KPIs UI
function renderKPIs(data) {
  const kpi = calculateKPIs(data);
  kpiTotal.textContent = kpi.total;
  kpiLeisure.textContent = kpi.leisure;
  kpiImportant.textContent = kpi.important;
}

// Descriptions
function renderDescriptions(data) {
  descriptionList.innerHTML = "";
  data.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.Description} — ₹${d.Amount}`;
    descriptionList.appendChild(li);
  });
}

// Dashboard controller
function updateDashboard() {
  let filtered = [...allData];

  // Time filter
  filtered = filterByDays(filtered, Number(daysSlider.value));
  daysLabel.textContent = `${daysSlider.value} days`;

  // Type filter
  const type = typeSelect.value;
  if (type !== "All") {
    filtered = filtered.filter(d => d.Type === type);
  }

  renderPie(filtered);
  renderKPIs(filtered);
  renderDescriptions(filtered);
}

// Events
typeSelect.addEventListener("change", updateDashboard);
daysSlider.addEventListener("input", updateDashboard);

// Init
loadData();


