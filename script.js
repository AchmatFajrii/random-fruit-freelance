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

function acakArray(seed, array) {
  const result = [...array];
  let m = result.length,
    t,
    i;

  while (m) {
    seed = (seed * 9301 + 49297) % 233280; // formula pseudo-random
    i = Math.floor((seed * m--) / 233280); // memastikan indeks adalah bilangan bulat
    t = result[m];
    result[m] = result[i];
    result[i] = t;
  }
  return result;
}

function tampilkanBuah(index) {
  const buahTerpilih = buahBuahan[index];
  const elemenBuah = document.querySelector("#buahTerpilih");
  elemenBuah.innerText = buahTerpilih;

  // Mengatur warna latar belakang sesuai dengan buah yang dipilih
  document.body.style.backgroundColor = warnaBuahan[index];
}

function tampilkanBuahBerdasarkanWaktu() {
  const waktuSaatIni = new Date();
  const seed = waktuSaatIni.getSeconds() / 60;

  // Membuat array besar yang berisi buah-buahan berulang-ulang
  let buahBesar = [];
  while (buahBesar.length < 50) {
    buahBesar = buahBesar.concat(buahBuahan);
  }

  // Mengacak array besar tersebut
  const urutanAcak = acakArray(seed, buahBesar);

  // Mengambil 50 buah pertama dari array yang telah diacak
  const buah50 = urutanAcak.slice(0, 50);

  const elemenDaftarBuah = document.querySelector("#daftarBuah");
  elemenDaftarBuah.innerHTML = buah50
    .map((buah) => `<div class="buah">${buah}</div>`)
    .join("");

  // Mengatur warna latar belakang sesuai dengan buah pertama yang dipilih
  document.body.style.backgroundColor =
    warnaBuahan[buahBuahan.indexOf(buah50[0])];
}

function aturTimerUntukDetikBerikutnya() {
  setTimeout(() => {
    tampilkanBuahBerdasarkanWaktu();
    aturTimerUntukDetikBerikutnya();
  }, 1000);
}

// Panggil fungsi berdasarkan detik saat halaman dimuat
tampilkanBuahBerdasarkanWaktu();
// Atur timer untuk memperbarui tampilan setiap detik
aturTimerUntukDetikBerikutnya();

// PERJAM

// const buahBuahan = [
//   "Apel🍏",
//   "Pisang🍌",
//   "Jeruk🍊",
//   "Mangga🥭",
//   "Semangka🍉",
//   "Melon🍈",
//   "Anggur🍇",
//   "Nanas🍍",
// ];

// const warnaBuahan = [
//   "#D0E9D7", // Warna untuk Apel
//   "#FFE135", // Warna untuk Pisang
//   "#FFA500", // Warna untuk Jeruk
//   "#FFD700", // Warna untuk Mangga
//   "#FF3B3F", // Warna untuk Semangka
//   "#98E2C6", // Warna untuk Melon
//   "#4B0082", // Warna untuk Anggur
//   "#FFD700", // Warna untuk Nanas
// ];

// function acakArray(seed, array) {
//   const result = [...array];
//   let m = result.length,
//     t,
//     i;

//   while (m) {
//     seed = (seed * 9301 + 49297) % 233280; // formula pseudo-random
//     i = Math.floor((seed * m--) / 233280); // memastikan indeks adalah bilangan bulat
//     t = result[m];
//     result[m] = result[i];
//     result[i] = t;
//   }
//   return result;
// }

// function tampilkanBuah(index) {
//   const buahTerpilih = buahBuahan[index];
//   const elemenBuah = document.querySelector("#buahTerpilih");
//   elemenBuah.innerText = buahTerpilih;

//   // Mengatur warna latar belakang sesuai dengan buah yang dipilih
//   document.body.style.backgroundColor = warnaBuahan[index];
// }

// function tampilkanBuahBerdasarkanWaktu() {
//   const waktuSaatIni = new Date();
//   const seed = waktuSaatIni.getHours();
//   const urutanAcak = acakArray(
//     seed,
//     Array.from({ length: buahBuahan.length }, (_, i) => i)
//   );
//   const indexBuah = urutanAcak[0];
//   tampilkanBuah(indexBuah);
// }

// function aturTimerUntukJamBerikutnya() {
//   const waktuSaatIni = new Date();
//   const milidetikHinggaJamBerikutnya =
//     (3600 - waktuSaatIni.getMinutes() * 60 - waktuSaatIni.getSeconds()) * 1000;

//   setTimeout(() => {
//     tampilkanBuahBerdasarkanWaktu();
//     aturTimerUntukJamBerikutnya();
//   }, milidetikHinggaJamBerikutnya);
// }

// // Panggil fungsi berdasarkan jam saat halaman dimuat
// tampilkanBuahBerdasarkanWaktu();
// // Atur timer untuk memperbarui tampilan pada awal jam berikutnya
// aturTimerUntukJamBerikutnya();
