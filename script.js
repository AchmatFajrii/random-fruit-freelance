const buahBuahan = [
  "Apel🍏",
  "Pisang🍌",
  "Jeruk🍊",
  "Mangga🥭",
  "Semangka🍉",
  "Melon🍈",
  "Anggur🍇",
  "Nanas🍍",
];

const warnaBuahan = [
  "#D0E9D7",
  "#FFE135",
  "#FFA500",
  "#FFD700",
  "#FF3B3F",
  "#98E2C6",
  "#4B0082",
  "#FFD700",
];

const modeUpdate = "limaMenit"; // Pilih antara "detik", "limaMenit", atau "satuJam"

function acakArray(seed, array) {
  const result = [...array];
  let m = result.length,
    t,
    i;
  while (m) {
    seed = (seed * 9301 + 49297) % 233280;
    i = Math.floor((seed * m--) / 233280);
    t = result[m];
    result[m] = result[i];
    result[i] = t;
  }
  return result;
}

function tampilkanBuahBerdasarkanWaktu() {
  const waktuSaatIni = new Date();
  let seed;

  switch (modeUpdate) {
    case "detik":
      seed =
        waktuSaatIni.getSeconds() +
        waktuSaatIni.getMinutes() * 60 +
        waktuSaatIni.getHours() * 3600;
      break;
    case "limaMenit":
      seed = Math.floor(waktuSaatIni.getMinutes() / 5);
      break;
    case "satuJam":
      seed = waktuSaatIni.getHours();
      break;
  }

  let buahBesar = [];
  while (buahBesar.length < 50) {
    buahBesar = buahBesar.concat(buahBuahan);
  }

  const urutanAcak = acakArray(seed, buahBesar);
  const seluruhBuah = urutanAcak.slice(0, 50);

  // Loop melalui setiap buah dan perbarui kontennya
  for (let i = 0; i < seluruhBuah.length; i++) {
    const elemenBuah = document.querySelector(`#buah${i + 1}`);
    elemenBuah.textContent = seluruhBuah[i];
  }

  document.body.style.backgroundColor =
    warnaBuahan[buahBuahan.indexOf(seluruhBuah[0])];
}

function aturTimerBerdasarkanMode() {
  let waktu;
  switch (modeUpdate) {
    case "detik":
      waktu = 1000;
      break;
    case "limaMenit":
      waktu = 300000;
      break;
    case "satuJam":
      waktu = 3600000;
      break;
  }

  setTimeout(() => {
    tampilkanBuahBerdasarkanWaktu();
    aturTimerBerdasarkanMode();
  }, waktu);
}

tampilkanBuahBerdasarkanWaktu();
aturTimerBerdasarkanMode();
