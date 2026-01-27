<?php
require_once('koneksi.php');
$id = $_GET['id'];

$sql = "SELECT * FROM peminjaman WHERE id=$id";
$r = mysqli_query($con, $sql);
$result = array();
$row = mysqli_fetch_array($r);

if ($row) {
    array_push($result, array(
        "id" => $row['id'],
        "id_anggota" => $row['id_anggota'],
        "id_buku" => $row['id_buku'],
        "tgl_pinjam" => $row['tgl_pinjam']
    ));
}

echo json_encode(array('result' => $result));
mysqli_close($con);
