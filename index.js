'use strict';

/**
 * Assignment 4 - Interactive Calculator & Data Analyzer
 */

// 1. Inisialisasi Dependency
// Menjalankan 'npm install'
const prompt = require('prompt-sync')({ sigint: true });

// ==========================================
// 2. FUNGSI-FUNGSI OPERASI MATEMATIKA (MODULAR)
// ==========================================

function tambah(a, b) {
  return a + b;
}

function kurang(a, b) {
  return a - b;
}

function kali(a, b) {
  return a * b;
}

function bagi(a, b) {
  // Edge case: Pembagian dengan nol
  if (b === 0) {
    return 'Error: Pembagian dengan nol tidak diperbolehkan!';
  }
  return a / b;
}

function modulo(a, b) {
  // Edge case: Modulo dengan nol menghasilkan NaN
  if (b === 0) {
    return 'Error: Operasi modulo dengan nol tidak diperbolehkan!';
  }
  return a % b;
}

function pangkat(a, b) {
  // Anda bisa menggunakan Math.pow(a, b) atau operator **
  return a ** b;
}

// ==========================================
// 3. FUNGSI VALIDASI INPUT (VALIDATION LOOP)
// ==========================================

/**
 * Memaksa user memasukkan angka yang valid
 */
function getValidNumber(message) {
  while (true) {
    let input = prompt(message);

    // Menangani jika user langsung menekan enter (input kosong)
    if (input.trim() === '') {
      console.log('❌ Input tidak boleh kosong! Silakan masukkan angka.');
      continue;
    }

    let num = Number(input);

    // Validasi apakah benar-back angka
    if (isNaN(num)) {
      console.log('❌ Input tidak valid! Yang Anda masukkan bukan angka.');
    } else {
      return num; // Keluar dari loop dan kembalikan nilai angka
    }
  }
}

/**
 * Agar user memasukkan operator yang sesuai ketentuan
 */
function getValidOperator(message) {
  // Daftar operator yang diizinkan
  const validOperators = ['+', '-', '*', '/', '%', '^'];

  while (true) {
    let input = prompt(message).trim();

    // Cek apakah operator yang diinput ada di dalam array validOperators
    if (validOperators.includes(input)) {
      return input;
    } else {
      console.log(
        `❌ Operator tidak valid! Pilih salah satu dari: ${validOperators.join(', ')}`
      );
    }
  }
}

// ==========================================
// 4. FUNGSI ANALISIS HASIL (THE CORE LOGIC)
// ==========================================

function analisisHasil(hasil) {
  // Menggunakan Nullish Coalescing (??) untuk mengantisipasi null/undefined
  const validHasil = hasil ?? 'Nilai tidak terdefinisi';

  // Jika hasil ternyata adalah pesan error (String) dari fungsi bagi/modulo
  if (typeof validHasil === 'string') {
    console.log(`\n⚠️ Analisis: ${validHasil}`);
    return;
  }

  console.log(`\n📊 Hasil Perhitungan: ${validHasil}`);
  console.log('====================================');
  console.log('         HASIL ANALISIS DATA        ');
  console.log('====================================');

  // A. Cek Positif, Negatif, atau Nol
  if (validHasil > 0) {
    console.log('• Sifat Angka  : Positif');
  } else if (validHasil < 0) {
    console.log('• Sifat Angka  : Negatif');
  } else {
    console.log('• Sifat Angka  : Nol');
  }

  // B. Cek Integer (Bilangan Bulat) atau Desimal (Pecahan)
  if (Number.isInteger(validHasil)) {
    console.log('• Jenis Angka  : Integer (Bilangan Bulat)');

    // C. Cek Ganjil atau Genap (Menggunakan Ternary Operator)
    // Menjalankan logika modulo 2
    const ganjilGenap = validHasil % 2 === 0 ? 'Genap' : 'Ganjil';
    console.log(`• Karakteristik: Bilangan ${ganjilGenap}`);
  } else {
    console.log('• Jenis Angka  : Desimal (Bilangan Pecahan)');
    console.log(
      '• Karakteristik: Tidak dikategorikan ganjil/genap (bukan bilangan bulat)'
    );
  }
  console.log('====================================');
}

// ==========================================
// 5. LOGIKA UTAMA APLIKASI (MAIN LOOP)
// ==========================================

function main() {
  console.log('=================================================');
  console.log('  Selamat Datang di Interactive Calc & Analyzer  ');
  console.log('=================================================');

  while (true) {
    // Ambil input dengan fungsi validasi
    let angka1 = getValidNumber('Masukkan angka pertama: ');
    let operator = getValidOperator('Masukkan operator (+, -, *, /, %, ^): ');
    let angka2 = getValidNumber('Masukkan angka kedua: ');

    let hasil;

    // Tentukan operasi berdasarkan operator menggunakan Switch Case
    switch (operator) {
      case '+':
        hasil = tambah(angka1, angka2);
        break;
      case '-':
        hasil = kurang(angka1, angka2);
        break;
      case '*':
        hasil = kali(angka1, angka2);
        break;
      case '/':
        hasil = bagi(angka1, angka2);
        break;
      case '%':
        hasil = modulo(angka1, angka2);
        break;
      case '^':
        hasil = pangkat(angka1, angka2);
        break;
      default:
        hasil = null; // Pengaman jika ada kondisi tak terduga
    }

    // Memanggil fungsi untuk menganalisis hasil perhitungan
    analisisHasil(hasil);

    // MEKANISME EXIT
    console.log('\n-------------------------------------------------');
    let konfirmasi = prompt('Apakah Anda ingin menghitung lagi? (yes/no): ');

    // Mengubah input menjadi lowercase agar handle 'No', 'NO', 'nO', 'n'
    if (
      konfirmasi.trim().toLowerCase() === 'no' ||
      konfirmasi.trim().toLowerCase() === 'n'
    ) {
      console.log(
        '\nTerima kasih telah menggunakan aplikasi ini. Sampai jumpa! 👋'
      );
      break; // Menghentikan perulangan while(true) dan keluar dari program
    }
    console.log('--------------------------------------\n');
  }
}

// Menjalankan program utama
main();
