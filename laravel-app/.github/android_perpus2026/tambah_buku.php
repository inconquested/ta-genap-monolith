<?php
    if($_SERVER['REQUEST_METHOD']=='POST'){
        $judul = $_POST['judul'];
        $pengarang = $_POST['pengarang'];
        $penerbit = $_POST['penerbit'];

        require_once('koneksi.php');

        $sql = "INSERT INTO buku (judul, pengarang, penerbit) VALUES ('$judul', '$pengarang', '$penerbit')";

        if(mysqli_query($con, $sql)){
            echo 'Berhasil Menambahkan Buku';
        } else {
            echo 'Gagal Menambahkan Buku';
        }
        mysqli_close($con);
    }
?>