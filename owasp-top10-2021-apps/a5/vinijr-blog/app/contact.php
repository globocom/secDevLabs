<?php
$xmlfile = file_get_contents('php://input');
$dom = new DOMDocument();
$dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
// Removendo a resolução de entidades externas 

$dom->resolveExternals = false;
$dom->substituteEntities = false;
// Verificando se o XML é válido antes de prosseguir
if ($dom->validate()) {
    $contact = simplexml_import_dom($dom);
    $name = $contact->name;
    $email = $contact->email;
    $subject = $contact->subject;
    $message = $contact->message;

    echo "Thanks for the message, $name !";
} else {
    echo "Invalid XML input!";
}
?>
