<?php
    if($_SERVER['REQUEST_METHOD']=='POST'){
        $nama = $_POST['nama_barang'];
        $kode = $_POST['kode_barang'];
        $jml  = (int) $_POST['jumlah'];

        require_once('koneksi.php');

        $sql = "INSERT INTO inventaris (nama_barang, kode_barang, jumlah) VALUES ('$nama', '$kode', '$jml')";

        if(mysqli_query($con, $sql)){
            echo 'Berhasil Menambahkan Inventaris';
        } else {
            echo 'Gagal Menambahkan Inventaris';
        }
        mysqli_close($con);
    }
?>