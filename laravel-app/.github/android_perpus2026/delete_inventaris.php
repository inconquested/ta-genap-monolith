<?php
$id = $_GET['id'];

require_once('koneksi.php');

$sql = "DELETE FROM inventaris WHERE id=$id;";

if (mysqli_query($con, $sql)) {
    echo 'Berhasil Menghapus Inventaris';
} else {
    echo 'Gagal Menghapus Inventaris';
}
mysqli_close($con);
