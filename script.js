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
  "#FFD700", // Warna untuk Nanas (sama dengan Mangga untuk contoh ini)
];

function tampilkanBuah(index) {
  const buahTerpilih = buahBuahan[index];
  const elemenBuah = document.querySelector("#buahTerpilih");
  elemenBuah.innerText = buahTerpilih;

  // Mengatur warna latar belakang sesuai dengan buah yang dipilih
  document.body.style.backgroundColor = warnaBuahan[index];
}

function tampilkanBuahBerdasarkanMenit() {
  const waktuSaatIni = new Date();
  const totalMenit = waktuSaatIni.getHours() * 60 + waktuSaatIni.getMinutes();
  const indexBuah = totalMenit % buahBuahan.length;
  tampilkanBuah(indexBuah);
}

function aturTimerUntukMenitBerikutnya() {
  const waktuSaatIni = new Date();
  const milidetikHinggaMenitBerikutnya =
    (60 - waktuSaatIni.getSeconds()) * 1000;

  setTimeout(() => {
    tampilkanBuahBerdasarkanMenit();
    aturTimerUntukMenitBerikutnya();
  }, milidetikHinggaMenitBerikutnya);
}

// Panggil fungsi berdasarkan menit saat halaman dimuat
tampilkanBuahBerdasarkanMenit();
// Atur timer untuk memperbarui tampilan pada awal menit berikutnya
aturTimerUntukMenitBerikutnya();
