const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// API url
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=tr`;

async function lokasyonBilgisi(city) {
  try {
    const resp = await fetch(url(city));
    const respData = await resp.json();

    if (Number(respData.cod) === 404) {
      uyariMesaji("Şehir bulunamadı!");
    } else {
      havaDurumuBilgisi(respData);
    }
  } catch (err) {
    uyariMesaji("Bir hata oluştu: " + err.message);
  }
}

function havaDurumuBilgisi(data) {
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      ${Math.round(data.main.temp)}°C
    </h2>
    <small>${data.weather[0].description}</small><br>
    <small>${data.sys.country}, ${data.name}</small>
  `;

  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();

  if (city) {
    lokasyonBilgisi(city);
  } else {
    uyariMesaji("Lütfen şehir adı girin!");
  }
});

function uyariMesaji(msg) {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = msg;
  container.appendChild(notif);

  setTimeout(() => notif.remove(), 2000);
  main.innerHTML = "";
}
