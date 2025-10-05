<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || sizeof($_FILES['image']) == 0) {
    header('Location: index.php');
    die();
}

session_start();

$fileUploadName = $_FILES['image']['name'];
$fileUploadPath = $_FILES['image']['tmp_name'];

$explodedName = explode('.', $fileUploadName);

if (!str_contains($fileUploadName, '.png')) {
    $_SESSION['message'] = [
        'type' => 'error',
        'content' => 'O arquivo não contem a extensão .png',
    ];

    header('Location: index.php');
    die();
}

$uploadFolder = __DIR__ . '/uploads/';

if (!is_dir($uploadFolder)) {
    $_SESSION['message'] = [
        'type' => 'error',
        'content' => 'Não foi possivel salvar o arquivo no disco',
    ];

    header('Location: index.php');
    die();
}

$uploadFileDestination = $uploadFolder . $fileUploadName;


if (!copy($fileUploadPath, $uploadFileDestination)) {
    $_SESSION['message'] = [
        'type' => 'error',
        'content' => 'Não foi possivel salvar o arquivo no disco',
    ];

    header('Location: index.php');
    die();
}

$_SESSION['message'] = [
    'type' => 'success',
    'content' => 'Upload da imagem feito com sucesso!',
];

header('Location: index.php');
die();
