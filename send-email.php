<?php

/*** Recibe los valores del formulario ***/

$nombre = $_POST["nombre"];
$email = $_POST["email"];
$direccion = $_POST["direccion"];
$tel = $_POST["tel"];
$pprod = $_POST["pprod"];
$metodopago = $_POST["metodopago"];
$preciototal = $_POST["preciototal"];

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

$mail ->addAddress("katherine.93amaya07@gmail.com","Katherine");

$mail ->Subject = "Compra de articulos";
$mail ->Body = "Nombre del comprador: $nombre \n Email: $email \n Direccion: $direccion \n Telefono: $tel \n Productos a comprar: \n $pprod \n Precio total: $preciototal \n Metodo de pago: $metodopago ";

$mail -> send();

echo "<script>
alert('Formulario enviado con exito! SI tus datos son correctos, recibiras respuesta en un par de días.');
window.location.href='3dbricks.html';
</script>";




