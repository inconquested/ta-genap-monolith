<?php
require_once('koneksi.php');

$id = $_GET['id'];
$sql = "SELECT * FROM anggota WHERE id = '$id'";

require_once('koneksi.php');

$result = [];
$r = mysqli_query($con, $sql);
while ($row = mysqli_fetch_array($r)) {
    array_push($result, [
        "id" => $row['id'],
        "nama" => $row['nama'],
        "hp" => $row['hp'],
        "alamat" => $row['alamat'],
    ]);
}
echo json_encode(array('result' => $result));
mysqli_close($con);
