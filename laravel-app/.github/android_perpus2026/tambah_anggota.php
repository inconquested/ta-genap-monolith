<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nama = $_POST['nama'];
    $hp = $_POST['hp'];
    $alamat = $_POST['alamat'];

    $sql = "INSERT INTO anggota (nama,hp,alamat) VALUES ('$nama','$hp','$alamat');";

    require_once('koneksi.php');

    if (mysqli_query($con, $sql)) {
        echo "Data berhasil ditambahkan";
    } else {
        echo "Error";
    }
    mysqli_close($con);
}
