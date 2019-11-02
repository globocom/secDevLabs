<?php

$username = $_POST['username'];
$password = $_POST['pass'];
$hash = password_hash($password, PASSWORD_ARGON2I);

$dbHost = getenv('DB_HOST');
$dbUser = getenv('DB_USER');
$dbPassword = getenv('DB_PASSWORD');
$dbName = getenv('DB_DATABASE');

$con = mysqli_connect($dbHost,$dbUser,$dbPassword,$dbName);

if (mysqli_connect_errno()) {
  echo "Failed to connect to DB: " . mysqli_connect_error();
  exit;
}

$loginResult = mysqli_query($con,"SELECT * FROM users WHERE username = '$username' AND hashedPassword = '$hash'");

if (!$loginResult) {
  echo "DB Error: " . mysqli_error($con);
}

mysqli_close($con);

if (mysqli_num_rows($loginResult)!=0){
  echo "<script language='javascript' type='text/javascript'>
          alert('Wrong Username/Password');
          window.location.href='index.html';
        </script>";
} else {
  header("Location:portfolio.html");
}

?>
