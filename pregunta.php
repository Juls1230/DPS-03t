<?php

/*** Recibe los valores del formulario ***/

$nombre = $_POST["nombre"];
$email = $_POST["email"];
$preg = $_POST["preg"];
$tel = $_POST["tel"];

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;



$mail = new PHPMailer(true);

$mail -> isSMTP();
$mail -> SMTPAuth = true;

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);


/**** Preparar enlace a Brevo para envío ****/
$mail -> Host = "smtp-relay.sendinblue.com";
$mail -> SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail  ->Port = 587;

$mail ->Username = "infocompralego@gmail.com";
$mail ->Password = "xsmtpsib-02dad90a429581480b9b9d3e65bc13c4864bfc598e657e6617b8a2787ebd73e2-rQw68yZRvszbWBA1";

/***** Correo que envía ******/

$mail ->setFrom("infocompralego@gmail.com", "3DBricks");

/***** Correo que recibe ******/

$mail ->addAddress("miguel_runita@hotmail.com","Miguel");

$mail ->Subject = "Pregunta";
$mail ->Body = "Nombre del cliente: $nombre \n Email: $email \n Telefono: $tel \n Pregunta: \n $preg ";

$mail -> send();

echo "<script>
alert('Formulario enviado con exito! ponto atenderemos tus dudas, ten un buen día!.');
window.location.href='3dbricks.html';
</script>";




