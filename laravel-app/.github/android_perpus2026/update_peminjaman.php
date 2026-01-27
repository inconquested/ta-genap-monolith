<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $id_agt = $_POST['id_anggota'];
    $id_bku = $_POST['id_buku'];
    $tgl    = $_POST['tgl_pinjam'];

    require_once('koneksi.php');

    $sql = "UPDATE peminjaman SET 
                id_anggota = '$id_agt', 
                id_buku = '$id_bku', 
                tgl_pinjam = '$tgl' 
                WHERE id = $id;";

    if (mysqli_query($con, $sql)) {
        echo 'Berhasil Update Data Peminjaman';
    } else {
        echo 'Gagal Update Data Peminjaman: ' . mysqli_error($con);
    }
    mysqli_close($con);
}
