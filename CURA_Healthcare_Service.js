describe('Tugas: Pengujian Login Negatif dan Logout', () => {

  // beforeEach akan dijalankan SEBELUM setiap test case (it) dimulai
  beforeEach(() => {
    // Langsung buka halaman login agar lebih efisien
    cy.visit('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    cy.wait(2000);
  });

  // --- KASUS 1: Username Benar, Password Salah ---
  it('1. Gagal Login: Username Benar, Password Salah', () => {
    // Username Benar
    cy.get('#txt-username').type('John Doe');
    cy.wait(2000);

    // Password Salah
    cy.get('#txt-password').type('EmangSalah');
    cy.wait(2000);

    // Klik Login
    cy.get('#btn-login').click();
    cy.wait(2000);

    // Verifikasi: Harus muncul pesan error
    cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.');
  });

  // --- KASUS 2: Username Salah, Password Benar ---
  it('2. Gagal Login: Username Salah, Password Benar', () => {
    // Username Salah
    cy.get('#txt-username').type('Acumalaka');
    cy.wait(2000);

    // Password Benar
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.wait(2000);

    cy.get('#btn-login').click();
    cy.wait(2000);

    // Verifikasi pesan error
    cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.');
  });

  // --- KASUS 3: Username Salah, Password Salah ---
  it('3. Gagal Login: Username Salah, Password Salah', () => {
    // Username Salah
    cy.get('#txt-username').type('UserNgawur');
    cy.wait(2000);

    // Password Salah
    cy.get('#txt-password').type('PassNgawur');
    cy.wait(2000);

    cy.get('#btn-login').click();
    cy.wait(2000);

    // Verifikasi pesan error
    cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.');
  });

  // --- KASUS 4: Logout ---
  it('4. Berhasil Logout', () => {
    // STEP 1: Kita harus LOGIN SUKSES dulu agar bisa logout
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();
    cy.wait(2000);

    // Pastikan login berhasil (cek URL atau elemen di halaman appointment)
    cy.url().should('include', '#appointment');

    // STEP 2: Proses LOGOUT
    // Klik tombol menu (garis tiga / hamburger button) di pojok kanan atas
    cy.get('#menu-toggle').click(); 
    cy.wait(2000);

    // Pastikan sidebar menu muncul, lalu klik tombol "Logout"
    // Kita cari elemen yang berisi tulisan 'Logout'
    cy.contains('Logout').click();
    cy.wait(2000);

    // STEP 3: Verifikasi berhasil Logout
    // Cek apakah kita kembali ke halaman utama dan tombol Make Appointment muncul
    cy.url().should('eq', 'https://katalon-demo-cura.herokuapp.com/');
    cy.get('#btn-make-appointment').should('be.visible');
  });

});
