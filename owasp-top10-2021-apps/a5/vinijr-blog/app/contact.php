<?php
$xmlfile = file_get_contents('php://input');
libxml_set_external_entity_loader(
    function ($xmlfile)  {
        $f = fopen("php://temp", "r+");
        fwrite($f, $xmlfile);
        rewind($f);
        return $f;
    }
);
$dom = new DOMDocument();
$dom->loadXML($xmlfile);
$contact = simplexml_import_dom($dom);
$name = $contact->name;
$email = $contact->email;
$subject = $contact->subject;
$message = $contact->message;

echo "Thanks for the message, $name !";
?>
