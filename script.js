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

const daftarPersenBar = [
  "30,2%",
  "65,7%",
  "95%",
  "54,2%",
  "12,5%",
  "27%",
  "85%",
]; // Contoh persentase baru untuk bar progres

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

const displayData = (selectorPrefix, dataArray) => {
  const seed = generateSeed();

  const extendedData = [];
  while (extendedData.length < dataArray.length * 10) {
    // Dua kali panjang data asli untuk memastikan cukup data
    extendedData.push(...dataArray);
  }
  const randomizedData = acakArray(seed, extendedData).slice(
    0,
    dataArray.length * 10
  );
  randomizedData.forEach((data, idx) => {
    const element = document.querySelector(`#${selectorPrefix}${idx + 1}`);
    if (element) {
      // Hanya isi jika elemen ada
      element.textContent = data;
    }
  });
};

const setBarColor = (persen) => {
  if (persen < 40) return "#CD1818";
  else if (persen < 70) return "#F6C90E";
  else return "#0B6623";
};

function generateBarProgresSeed(id) {
  // Kita hanya membutuhkan bagian numerik dari ID untuk menghasilkan seed
  const numberPart = parseInt(id.replace("barProgres", ""), 10);
  return numberPart;
}

const displayBarProgres = () => {
  const barProgresElements = document.querySelectorAll(".barProgres"); // Ambil semua elemen barProgres

  barProgresElements.forEach((element) => {
    const seed = generateBarProgresSeed(element.id);
    const randomizedData = acakArray(seed, daftarPersenBar);
    const data = randomizedData[0];

    const dataDecimal = data.replace(",", "."); // Ganti koma dengan titik
    const persenFloat = parseFloat(dataDecimal); // Konversi ke float

    const color = setBarColor(persenFloat);

    // Buat elemen untuk mengisi bar progres
    const fill = document.createElement("div");
    fill.className = "barProgres-fill";
    fill.style.width = `${persenFloat}%`;
    fill.style.backgroundColor = color;
    element.innerHTML = ""; // Bersihkan elemen sebelumnya
    element.appendChild(fill);
    // Buat elemen teks untuk menampilkan persentase
    const textElement = document.createElement("div");
    textElement.textContent = data; // Menggunakan format asli (dengan koma) untuk teks
    textElement.className = "barProgres-text";
    element.appendChild(textElement);
  });
};

// Fungsi utama untuk menampilkan buah, waktu, dan persentase berdasarkan waktu saat ini.
function tampilkanDataBerdasarkanWaktu() {
  displayData("buah", buahBuahan);
  displayData("waktu", updateWaktu);
  displayData("persen", daftarPersen);
  displayBarProgres();

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
tampilkanDataBerdasarkanWaktu();
aturTimerBerdasarkanMode();
