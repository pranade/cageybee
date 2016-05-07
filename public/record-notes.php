<?php
 
    // tell the caller that they should listen to their howl
    // and play the recording back, using the URL that Twilio posted
    header("content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>
    <Say>Thanks for recording... here's what we heard you say.</Say>
    <Play><?php echo $_REQUEST['RecordingUrl']; ?></Play>
    <Say>Goodbye.</Say>
</Response>