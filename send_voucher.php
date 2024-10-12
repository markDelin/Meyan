<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $voucherCode = "ABC123XYZ"; // Replace this with dynamic voucher generation if needed

    $subject = "Your Voucher Code";
    $message = "Thank you for signing up! Here is your voucher code: " . $voucherCode;
    $headers = "From: reymarkdelin@gmail.com";

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (mail($email, $subject, $message, $headers)) {
            echo "Voucher code has been sent to " . htmlspecialchars($email);
        } else {
            echo "Failed to send email.";
        }
    } else {
        echo "Invalid email format.";
    }
}
?>