<?php
/* ==========================================================================
   ST-SCHON USA LLC - HOSTINGER PHP APPOINTMENT EMAIL HANDLER
   Dispatches booking details directly to contact@st-schon.com
   ========================================================================== */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid payload']);
        exit;
    }

    $ticketId = isset($input['id']) ? htmlspecialchars($input['id']) : 'ST-' . rand(100000, 999999);
    $topic = isset($input['topic']) ? htmlspecialchars($input['topic']) : 'Consultation';
    $date = isset($input['date']) ? htmlspecialchars($input['date']) : date('Y-m-d');
    $time = isset($input['time']) ? htmlspecialchars($input['time']) : '10:00 AM (EST)';
    $name = isset($input['user']['name']) ? htmlspecialchars($input['user']['name']) : 'Valued Client';
    $email = isset($input['user']['email']) ? filter_var($input['user']['email'], FILTER_SANITIZE_EMAIL) : 'contact@st-schon.com';
    $notes = isset($input['user']['notes']) ? htmlspecialchars($input['user']['notes']) : 'None';

    $to = "contact@st-schon.com";
    $subject = "New Appointment Booking [#$ticketId] - ST-SCHON LLC";

    $body = "New Appointment Reservation Received on ST-SCHON LLC Website:\n\n";
    $body .= "--------------------------------------------------\n";
    $body .= "TICKET REFERENCE: #$ticketId\n";
    $body .= "CONSULTATION TOPIC: $topic\n";
    $body .= "SCHEDULED DATE: $date\n";
    $body .= "SCHEDULED TIME: $time\n";
    $body .= "--------------------------------------------------\n";
    $body .= "ATTENDEE NAME: $name\n";
    $body .= "ATTENDEE EMAIL: $email\n";
    $body .= "SPECIAL NOTES: $notes\n";
    $body .= "--------------------------------------------------\n";
    $body .= "Booked on: " . date('Y-m-d H:i:s T') . "\n";

    $headers = "From: ST-SCHON Website <noreply@st-schon.com>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $mailSent = @mail($to, $subject, $body, $headers);

    echo json_encode([
        'status' => 'success',
        'ticketId' => $ticketId,
        'emailSent' => $mailSent,
        'recipient' => $to,
        'message' => 'Appointment reservation successfully dispatched to contact@st-schon.com'
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Only POST requests allowed']);
}
