<?php
$id = $_GET['id'];

require_once('koneksi.php');

$sql = "DELETE FROM buku WHERE id=$id;";

if (mysqli_query($con, $sql)) {
    echo 'Berhasil Menghapus Buku';
} else {
    echo 'Gagal Menghapus Buku';
}
mysqli_close($con);
