// Daftar buah, warna, waktu, dan persentase yang tersedia.
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
const updateWaktu = [
  "22:00 WIB",
  "20:00 WIB",
  "19:30 WIB",
  "19:00 WIB",
  "18:30 WIB",
];
const daftarPersen = ["70%", "80%", "90%", "50%", "35%"];

// Pilihan mode update: detik, limaMenit, atau satuJam.
const modeUpdate = "limaMenit"; // Pilih antara "detik", "limaMenit", atau "satuJam"

// Durasi timeout untuk setiap mode update.
const TIMEOUTS = {
  detik: 1000,
  limaMenit: 300000,
  satuJam: 3600000,
};

// Fungsi untuk mengacak array berdasarkan seed.
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

// Fungsi untuk menghasilkan seed berdasarkan tanggal dan mode update.
function generateSeed() {
  const waktuSaatIni = new Date();
  let seed = parseInt(
    `${waktuSaatIni.getFullYear()}${
      waktuSaatIni.getMonth() + 1
    }${waktuSaatIni.getDate()}`,
    10
  );
  switch (modeUpdate) {
    case "detik":
      seed +=
        waktuSaatIni.getSeconds() +
        waktuSaatIni.getMinutes() * 60 +
        waktuSaatIni.getHours() * 3600;
      break;
    case "limaMenit":
      seed += Math.floor(waktuSaatIni.getMinutes() / 5);
      break;
    case "satuJam":
      seed += waktuSaatIni.getHours();
      break;
  }
  return seed;
}

// Fungsi untuk menampilkan data acak (buah, waktu, atau persentase) di elemen HTML.
function displayData(selectorPrefix, dataArray) {
  const seed = generateSeed();
  const extendedData = [];
  while (extendedData.length < 10) {
    extendedData.push(...dataArray);
  }
  const randomizedData = acakArray(seed, extendedData).slice(0, 10);
  randomizedData.forEach((data, idx) => {
    const element = document.querySelector(`#${selectorPrefix}${idx + 1}`);
    element.textContent = data;
  });
}

// Fungsi utama untuk menampilkan buah, waktu, dan persentase berdasarkan waktu saat ini.
function tampilkanBuahBerdasarkanWaktu() {
  displayData("buah", buahBuahan);
  displayData("waktu", updateWaktu);
  displayData("persen", daftarPersen);

  // Mengubah warna latar belakang berdasarkan buah pertama yang terpilih.
  const seluruhBuah = acakArray(generateSeed(), buahBuahan);
  document.body.style.backgroundColor =
    warnaBuahan[buahBuahan.indexOf(seluruhBuah[0])];
}

// Fungsi untuk menentukan kapan fungsi tampilkanBuahBerdasarkanWaktu() akan dipanggil kembali berdasarkan modeUpdate.
function aturTimerBerdasarkanMode() {
  setTimeout(() => {
    tampilkanBuahBerdasarkanWaktu();
    aturTimerBerdasarkanMode();
  }, TIMEOUTS[modeUpdate]);
}

// Memulai program dengan menampilkan buah, waktu, dan persentase berdasarkan waktu saat ini, dan menentukan timer untuk pembaruan selanjutnya.
tampilkanBuahBerdasarkanWaktu();
aturTimerBerdasarkanMode();
