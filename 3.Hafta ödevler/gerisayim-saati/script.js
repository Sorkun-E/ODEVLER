function guncelTarih(currentDate) {
  var time = (currentDate - new Date()) / 1000;
  return {
    gun: Math.floor(time / 3600 / 24),
    saat: Math.floor((time / 3600) % 24),
    dakika: Math.floor((time / 60) % 60),
    saniye: Math.floor(time % 60),
    total: time,
  };
}

function animasyon(span) {
  span.className = "flip";
  setTimeout(function () {
    span.className = "";
  }, 700);
}

function baslat(id, newYear) {
  var timerInterval = setInterval(function () {
    var zaman = document.getElementById(id);
    var zamanlayıcı = guncelTarih(newYear);

    zaman.innerHTML =
      "<span>" +
      zamanlayıcı.gun +
      "</span>" +
      "<span>" +
      zamanlayıcı.saat +
      "</span>" +
      "<span>" +
      zamanlayıcı.dakika +
      "</span>" +
      "<span>" +
      zamanlayıcı.saniye +
      "</span>";

    //animation
    var spans = zaman.getElementsByTagName("span");
    animasyon(spans[3]); // her saniye değişiyor
    if (zamanlayıcı.saniye == 59) animasyon(spans[2]); // dakika
    if (zamanlayıcı.dakika == 59 && zamanlayıcı.saniye == 59)
      animasyon(spans[1]); // saat
    if (
      zamanlayıcı.saat == 23 &&
      zamanlayıcı.dakika == 59 &&
      zamanlayıcı.saniye == 59
    )
      animasyon(spans[0]); // gün

    //Tarih kontrolü zaman bitti mi?
    if (zamanlayıcı.total < 1) {
      clearInterval(timerInterval);
      zaman.innerHTML =
        "<span>0</span><span>0</span><span>0</span><span>0</span>";
    }
  }, 1000);
}

window.onload = function () {
  // Yeni yıl tarihi (güncel yılı otomatik almak için):
  var yil = new Date().getFullYear() + 1;
  var newYear = new Date("1 Jan " + yil); // 1 Ocak gelecek yıl
  baslat("clock", newYear);
};