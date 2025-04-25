<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Access-Control-Allow-Origin: *');

$time = date('H:i:s');
echo "data: Az idő: {$time}\n\n";
flush();
?>
