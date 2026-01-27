<?php
require_once('koneksi.php');

$sql = "SELECT * FROM inventaris";
$r = mysqli_query($con, $sql);
$result = array();

while ($row = mysqli_fetch_array($r)) {
    array_push($result, array(
        "id" => $row['id'],
        "nama_barang" => $row['nama_barang'],
        "kode_barang" => $row['kode_barang'],
        'jumlah' => $row['jumlah']
    ));
}

echo json_encode(array('result' => $result));
mysqli_close($con);
