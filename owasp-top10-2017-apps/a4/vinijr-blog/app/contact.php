<?php
$xmlfile = file_get_contents('php://input');
$dom = new DOMDocument();
libxml_disable_entity_loader(true);
$dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
$contact = simplexml_import_dom($dom);
$name = $contact->name;
$email = $contact->email;
$subject = $contact->subject;
$message = $contact->message;

echo "Thanks for the message, $name !";
?>
