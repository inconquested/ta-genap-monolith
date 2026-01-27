<?php
$id = $_GET['id'];
require_once('koneksi.php');

$sql = "DELETE FROM anggota WHERE id = '$id';";

require_once('koneksi.php');

if (mysqli_query($con, $sql)) {
    echo "Data berhasil dihapus";
} else {
    echo "Error";
}
mysqli_close($con);
