<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id   = $_POST['id'];
    $nama = $_POST['nama_barang'];
    $kode = $_POST['kode_barang'];
    $jml  = (int)$_POST['jumlah'];

    require_once('koneksi.php');

    $sql = "UPDATE inventaris SET nama_barang = '$nama', kode_barang = '$kode', jumlah = '$jml' WHERE id = $id;";

    if (mysqli_query($con, $sql)) {
        echo 'Berhasil Update Data Inventaris';
    } else {
        echo 'Gagal Update Data Inventaris';
    }
    mysqli_close($con);
}
