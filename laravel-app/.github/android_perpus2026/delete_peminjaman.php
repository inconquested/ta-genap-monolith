<?php
require_once('koneksi.php');
$id = $_GET['id'];

$sql = "DELETE FROM peminjaman WHERE id=$id;";

if (mysqli_query($con, $sql)) {
    echo 'Berhasil Menghapus Peminjaman';
} else {
    echo 'Gagal Menghapus Peminjaman';
}
mysqli_close($con);
