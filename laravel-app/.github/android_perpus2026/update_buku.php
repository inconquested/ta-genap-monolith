<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $judul = $_POST['judul'];
    $pengarang = $_POST['pengarang'];
    $penerbit = $_POST['penerbit'];

    require_once('koneksi.php');

    $sql = "UPDATE buku SET judul = '$judul', pengarang = '$pengarang', penerbit = '$penerbit' WHERE id = $id;";

    if (mysqli_query($con, $sql)) {
        echo 'Berhasil Update Data Buku';
    } else {
        echo 'Gagal Update Data Buku';
    }
    mysqli_close($con);
}
