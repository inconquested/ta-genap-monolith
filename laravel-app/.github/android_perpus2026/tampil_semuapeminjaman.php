<?php
require_once('koneksi.php');

// Joining peminjaman with anggota and buku tables
$sql = "SELECT p.id, a.nama, b.judul, p.tgl_pinjam 
            FROM peminjaman p
            JOIN anggota a ON p.id_anggota = a.id
            JOIN buku b ON p.id_buku = b.id
            ORDER BY p.id DESC";

$r = mysqli_query($con, $sql);
$result = array();

while ($row = mysqli_fetch_array($r)) {
    array_push($result, array(
        "id" => $row['id'],
        "nama" => $row['nama'],   // From anggota table
        "judul" => $row['judul'], // From buku table
        "tgl_pinjam" => $row['tgl_pinjam']
    ));
}

echo json_encode(array('result' => $result));
mysqli_close($con);
