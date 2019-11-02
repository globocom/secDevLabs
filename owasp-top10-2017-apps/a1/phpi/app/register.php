<?php

if (!($_POST["pass"] === $_POST["repeatPass"])) {
  echo "Passwords do not match!";
  exit;
}

$username = $_POST['username'];
$password = $_POST['pass'];
$hash = password_hash($password, PASSWORD_ARGON2I);

$dbHost = getenv('DB_HOST');
$dbUser = getenv('DB_USER');
$dbPassword = getenv('DB_PASSWORD');
$dbName = getenv('DB_DATABASE');

$con1 = mysqli_connect($dbHost,$dbUser,$dbPassword,$dbName);
if (mysqli_connect_errno()) {
  echo "Failed to connect to DB: " . mysqli_connect_error();
  exit;
}

$userQuery = mysqli_query($con1,"SELECT * FROM users WHERE username = '$username'");
if (!$userQuery) {
  echo "DB Error: " . mysqli_error($con);
}

mysqli_close($con1);

if (mysqli_num_rows($userQuery)!=0){
  echo "<script language='javascript' type='text/javascript'>
          alert('Username already taken.');
          window.location.href='register.html';
        </script>";
  exit;
}

$con2 = mysqli_connect($dbHost,$dbUser,$dbPassword,$dbName);
if (mysqli_connect_errno()) {
  echo "Failed to connect to DB: " . mysqli_connect_error();
  exit;
}

$userInsert = mysqli_query($con2,"INSERT INTO users (username,hashedPassword) VALUES ('$username','$hash')");
if (!$userInsert) {
  echo "DB Error: " . mysqli_error($con);
}

mysqli_close($con2);

echo "<script language='javascript' type='text/javascript'>
          alert('Login created!');
          window.location.href='index.html';
        </script>";

?>
