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
  "#D0E9D7", // Warna untuk Apel
  "#FFE135", // Warna untuk Pisang
  "#FFA500", // Warna untuk Jeruk
  "#FFD700", // Warna untuk Mangga
  "#FF3B3F", // Warna untuk Semangka
  "#98E2C6", // Warna untuk Melon
  "#4B0082", // Warna untuk Anggur
  "#FFD700", // Warna untuk Nanas
];

function tampilkanBuah(index) {
  const buahTerpilih = buahBuahan[index];
  const elemenBuah = document.querySelector("#buahTerpilih");
  elemenBuah.innerText = buahTerpilih;

  // Mengatur warna latar belakang sesuai dengan buah yang dipilih
  document.body.style.backgroundColor = warnaBuahan[index];
}

function tampilkanBuahBerdasarkanDetik() {
  const waktuSaatIni = new Date();
  const totalDetik =
    waktuSaatIni.getHours() * 3600 +
    waktuSaatIni.getMinutes() * 60 +
    waktuSaatIni.getSeconds();
  const indexBuah = totalDetik % buahBuahan.length;
  tampilkanBuah(indexBuah);
}

function aturTimerUntukDetikBerikutnya() {
  setTimeout(() => {
    tampilkanBuahBerdasarkanDetik();
    aturTimerUntukDetikBerikutnya();
  }, 1000);
}

// Panggil fungsi berdasarkan detik saat halaman dimuat
tampilkanBuahBerdasarkanDetik();
// Atur timer untuk memperbarui tampilan setiap detik
aturTimerUntukDetikBerikutnya();
