# Email API - Amazon SES Setup

This API sends emails using Amazon SES (Simple Email Service).

## Prerequisites

1. **PHP 7.4+** installed on your server
2. **Composer** - PHP dependency manager
3. **AWS Account** with SES configured

## Setup Instructions

### 1. Install AWS SDK

Navigate to this directory and run:

```bash
cd public/api
composer install
```

### 2. Configure AWS SES

#### Option A: Environment Variables (Recommended)

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
SES_SENDER_EMAIL=noreply@yourdomain.com
SES_SENDER_NAME=Subtype Tool
```

#### Option B: AWS Credentials File

Create `~/.aws/credentials`:

```ini
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

And `~/.aws/config`:

```ini
[default]
region = us-east-1
```

#### Option C: Edit PHP File Directly

Edit `send-email.php` and set the values in the `$config` array.

### 3. Verify Sender Email in AWS SES

1. Go to AWS Console → SES → Verified Identities
2. Click "Create identity"
3. Choose "Email address"
4. Enter your sender email
5. Click the verification link sent to that email

### 4. Request Production Access (Optional)

By default, SES is in sandbox mode and can only send to verified emails. To send to any email:

1. Go to AWS Console → SES → Account dashboard
2. Click "Request production access"
3. Fill out the form with your use case

## Testing

### Using curl

```bash
curl -X POST http://localhost/api/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello!</h1><p>This is a test.</p>",
    "text": "Hello! This is a test."
  }'
```

### Using the App

1. Click any EMAIL button in the Subtype Tool
2. Enter your email address when prompted
3. Check your inbox for the test email

## Troubleshooting

### "AWS SDK not installed"
Run `composer install` in the `public/api` directory.

### "Email address not verified"
Verify the sender email in AWS SES console.

### "Sending quota exceeded"
Request production access or wait for quota reset.

### CORS Errors
The API includes CORS headers. If issues persist, check your server configuration.

## API Reference

### POST /api/send-email.php

**Request Body:**

```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "html": "<h1>HTML Content</h1>",
  "text": "Plain text content (optional)"
}
```

**Success Response:**

```json
{
  "success": true,
  "messageId": "...",
  "message": "Email sent successfully"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error description",
  "code": "AWS_ERROR_CODE"
}
```
