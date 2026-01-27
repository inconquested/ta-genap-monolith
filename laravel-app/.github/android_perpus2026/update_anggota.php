<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $hp = $_POST['hp'];
    $alamat = $_POST['alamat'];

    $sql = "UPDATE anggota SET nama = '$nama', hp = '$hp', alamat = '$alamat' WHERE id = '$id';";

    require_once('koneksi.php');

    if (mysqli_query($con, $sql)) {
        echo "Data berhasil diperbarui";
    } else {
        echo "Error";
    }
    mysqli_close($con);
}
