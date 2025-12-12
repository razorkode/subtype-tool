<?php
/**
 * Amazon SES Email Sender
 *
 * This script sends emails using Amazon SES via the AWS SDK.
 *
 * SETUP INSTRUCTIONS:
 * 1. Install Composer: https://getcomposer.org/download/
 * 2. Run in the api directory: composer require aws/aws-sdk-php
 * 3. Configure your AWS credentials below or via environment variables
 * 4. Verify your sender email in AWS SES console
 */

// CORS headers for frontend requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// ============================================
// AWS SES CONFIGURATION
// ============================================
// Option 1: Set these directly (not recommended for production)
// Option 2: Use environment variables (recommended)
// Option 3: Use AWS credentials file (~/.aws/credentials)

$config = [
    'region' => getenv('AWS_REGION') ?: 'us-east-1',
    'key' => getenv('AWS_ACCESS_KEY_ID') ?: '',
    'secret' => getenv('AWS_SECRET_ACCESS_KEY') ?: '',

    // Email settings
    'sender_email' => getenv('SES_SENDER_EMAIL') ?: 'noreply@yourdomain.com',
    'sender_name' => getenv('SES_SENDER_NAME') ?: 'Subtype Tool',
];

// ============================================
// LOAD AWS SDK
// ============================================
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'AWS SDK not installed. Run: composer require aws/aws-sdk-php',
        'instructions' => [
            '1. Navigate to the api directory: cd public/api',
            '2. Install Composer if not already: https://getcomposer.org/',
            '3. Run: composer require aws/aws-sdk-php',
            '4. Configure AWS credentials in this file or via environment variables'
        ]
    ]);
    exit();
}

require $autoloadPath;

use Aws\Ses\SesClient;
use Aws\Exception\AwsException;

// ============================================
// GET REQUEST DATA
// ============================================
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    exit();
}

$recipientEmail = $input['to'] ?? '';
$subject = $input['subject'] ?? 'Report from Subtype Tool';
$htmlBody = $input['html'] ?? '';
$textBody = $input['text'] ?? strip_tags($htmlBody);

// Validate email
if (!filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit();
}

// ============================================
// SEND EMAIL VIA AWS SES
// ============================================
try {
    $sesClientConfig = [
        'version' => 'latest',
        'region' => $config['region'],
    ];

    // Add credentials if provided (otherwise SDK will use default credential chain)
    if (!empty($config['key']) && !empty($config['secret'])) {
        $sesClientConfig['credentials'] = [
            'key' => $config['key'],
            'secret' => $config['secret'],
        ];
    }

    $sesClient = new SesClient($sesClientConfig);

    $result = $sesClient->sendEmail([
        'Destination' => [
            'ToAddresses' => [$recipientEmail],
        ],
        'Message' => [
            'Body' => [
                'Html' => [
                    'Charset' => 'UTF-8',
                    'Data' => $htmlBody,
                ],
                'Text' => [
                    'Charset' => 'UTF-8',
                    'Data' => $textBody,
                ],
            ],
            'Subject' => [
                'Charset' => 'UTF-8',
                'Data' => $subject,
            ],
        ],
        'Source' => "{$config['sender_name']} <{$config['sender_email']}>",
    ]);

    echo json_encode([
        'success' => true,
        'messageId' => $result->get('MessageId'),
        'message' => 'Email sent successfully'
    ]);

} catch (AwsException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getAwsErrorMessage() ?: $e->getMessage(),
        'code' => $e->getAwsErrorCode()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
