<?php
libxml_disable_entity_loader(true);

$xmlfile = file_get_contents('php://input');

$dom = new DOMDocument();

$dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD | LIBXML_NOERROR | LIBXML_NOWARNING);

$contact = simplexml_import_dom($dom);

if (isset($contact->name) && isset($contact->email) && isset($contact->subject) && isset($contact->message)) {
    $name    = htmlspecialchars($contact->name, ENT_QUOTES, 'UTF-8');
    $email   = filter_var($contact->email, FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars($contact->subject, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($contact->message, ENT_QUOTES, 'UTF-8');

    if ($email !== false) {
        echo "Thanks for the message, $name!";
    } else {
        echo "Invalid email address!";
    }
} else {
    echo "Invalid XML format!";
}

