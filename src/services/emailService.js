/**
 * Email Service for sending reports via the PHP API
 */

// API endpoint - adjust this based on your server configuration
const API_URL = import.meta.env.VITE_EMAIL_API_URL || '/api/send-email.php'

/**
 * Send an email via the API
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body content
 * @param {string} [options.text] - Plain text body (optional, will be generated from HTML if not provided)
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendEmail({ to, subject, html, text }) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to,
                subject,
                html,
                text,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to send email')
        }

        return data
    } catch (error) {
        console.error('Email service error:', error)
        return {
            success: false,
            error: error.message || 'Failed to send email',
        }
    }
}

/**
 * Generate HTML email content from clinical data
 * @param {Object} data - Clinical data
 * @param {Object} data.config - Subcategory configuration
 * @param {Object} data.testing - Testing data
 * @param {Array} data.management - Management items
 * @returns {string} HTML email content
 */
export function generateReportHtml({ config, testing, management }) {
    const colorMap = {
        blue: '#3AADE1',
        teal: '#52A5A4',
        purple: '#7B5295',
    }

    const accentColor = colorMap[config.color] || '#3AADE1'

    const checkedManagement = management.filter((item) => item.checked)

    let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.category} - ${config.title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: ${accentColor};
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header .subtitle {
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            color: ${accentColor};
            font-size: 16px;
            font-weight: bold;
            border-bottom: 2px solid ${accentColor};
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        .item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .item:last-child {
            border-bottom: none;
        }
        .item-name {
            font-weight: bold;
        }
        .item-description {
            color: #666;
            font-size: 14px;
        }
        .checked {
            color: ${accentColor};
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="subtitle">${config.category}</div>
        <h1>${config.title}</h1>
    </div>
    <div class="content">`

    // Standard Testing
    if (testing.standard && testing.standard.length > 0) {
        html += `
        <div class="section">
            <div class="section-title">STANDARD TESTING</div>`
        for (const item of testing.standard) {
            html += `
            <div class="item">
                <div class="item-name">${item.name}</div>
                ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
            </div>`
        }
        html += `</div>`
    }

    // Advanced Testing
    if (testing.advanced && testing.advanced.length > 0) {
        html += `
        <div class="section">
            <div class="section-title">ADVANCED TESTING</div>`
        for (const item of testing.advanced) {
            html += `
            <div class="item">
                <div class="item-name">${item.name}</div>
                ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
            </div>`
        }
        html += `</div>`
    }

    // Management (checked items)
    if (checkedManagement.length > 0) {
        html += `
        <div class="section">
            <div class="section-title">SELECTED MANAGEMENT OPTIONS</div>`
        for (const item of checkedManagement) {
            html += `
            <div class="item">
                <div class="item-name checked">✓ ${item.label}</div>
                ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
            </div>`
        }
        html += `</div>`
    }

    html += `
    </div>
    <div class="footer">
        Generated by Subtype Tool<br>
        ${new Date().toLocaleDateString()}
    </div>
</body>
</html>`

    return html
}

/**
 * Send a test email to verify the email service is working
 * @param {string} to - Recipient email address
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendTestEmail(to) {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Email</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #3AADE1; color: white; padding: 20px; text-align: center; border-radius: 8px;">
        <h1 style="margin: 0;">Test Email</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Subtype Tool Email Service</p>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
        <p>This is a test email from the Subtype Tool.</p>
        <p>If you received this email, your Amazon SES configuration is working correctly!</p>
        <p style="color: #666; font-size: 14px;">Sent at: ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>`

    return sendEmail({
        to,
        subject: 'Test Email - Subtype Tool',
        html,
        text: 'This is a test email from the Subtype Tool. If you received this email, your Amazon SES configuration is working correctly!',
    })
}
