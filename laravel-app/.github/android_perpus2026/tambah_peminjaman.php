<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // 1. Collect data from the POST request
    // These keys MUST match the strings in your Konfigurasi.java
    $id_agt = $_POST['id_anggota'];
    $id_bku = $_POST['id_buku'];
    $tgl    = $_POST['tgl_pinjam'];

    // 2. Import database connection
    require_once('koneksi.php');

    // 3. Prepare the SQL query
    // Ensure your table name is 'peminjaman' and column names match
    $sql = "INSERT INTO peminjaman (id_anggota, id_buku, tgl_pinjam) 
                VALUES ('$id_agt', '$id_bku', '$tgl')";

    // 4. Execute the query
    if (mysqli_query($con, $sql)) {
        echo 'Berhasil Menambahkan Peminjaman';
    } else {
        // Echoing error for easier debugging during development
        echo 'Gagal Menambahkan: ' . mysqli_error($con);
    }

    mysqli_close($con);
}
