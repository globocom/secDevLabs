<?php

session_start();

$uploadFolder = __DIR__ . '/uploads/';
$files = is_dir($uploadFolder) ? scandir($uploadFolder) : [];

$uploadedFiles = [];

foreach ($files as $file) {
    if ($file == '.' || $file == '..')
        continue;

    $fileSize = filesize($uploadFolder . $file) / 1024; // KB

    $uploadedFiles[] = [
        'size' => number_format($fileSize, 2) . ' KB',
        'name' => $file,
        'link' => '/uploads/' . $file,
    ];

}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec Dev Labs - 2025</title>

    <link rel="stylesheet" href="/css/main.css" />
</head>

<body>

    <div class="app">
        <main class="container-uploads">

            <?php if (isset($_SESSION['message'])): ?>
                <div class="alert <?php echo $_SESSION['message']['type'] ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>

                    <?php echo $_SESSION['message']['content'] ?>
                </div>
            <?php endif ?>

            <div class="sections-container">
                <div class="upload-section">
                    <form action="/upload.php" method="POST" enctype="multipart/form-data">
                        <input type="file" accept="image/png" name="image" class="hidden" id="file-input" />

                        <label for="file-input">
                            <div class="upload-area">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                                    <path d="m14 19.5 3-3 3 3" />
                                    <path d="M17 22v-5.5" />
                                    <circle cx="9" cy="9" r="2" />
                                </svg>

                                <p>Selecione uma imagem com extensão .png</p>
                            </div>
                        </label>

                        <div class="button-container">
                            <button class="button-submit">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>

                <div class="upload-section">
                    <h2 class="title-form">Arquivos Processados:</h2>

                    <ul class="files-uploaded">
                        <?php if (!isset($uploadedFiles) || sizeof($uploadedFiles) == 0): ?>
                            <li class="empty-uploads">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" x2="12" y1="8" y2="12" />
                                    <line x1="12" x2="12.01" y1="16" y2="16" />
                                </svg>

                                <p>Nanhum arquivo encontrado</p>
                            </li>
                        <?php else: ?>

                            <?php foreach ($uploadedFiles as $key => $file): ?>
                                <li class="file-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                        <circle cx="10" cy="12" r="2" />
                                        <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
                                    </svg>

                                    <div>
                                        <div class="file-header">
                                            <p class="file-title"><?php echo $file['name'] ?></p>

                                            <a href="<?php echo $file['link'] ?>" class="view-image">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                                </svg>
                                            </a>
                                        </div>

                                        <p class="file-size"><?php echo $file['size'] ?></p>
                                    </div>
                                </li>
                            <?php endforeach ?>

                        <?php endif ?>

                    </ul>
                </div>
            </div>
        </main>
    </div>

</body>

</html>