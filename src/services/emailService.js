import emailjs from '@emailjs/browser'

// EmailJS Configuration
const PUBLIC_KEY = 'YejEOf7o8maKNlcFS'

// Initialize EmailJS
emailjs.init({ publicKey: PUBLIC_KEY })

/**
 * Send a test email via EmailJS
 * @param {string} toEmail - Recipient email address
 * @param {string} serviceId - EmailJS service ID
 * @param {string} templateId - EmailJS template ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendTestEmail(toEmail, serviceId, templateId) {
    try {
        const response = await emailjs.send(serviceId, templateId, {
            to_email: toEmail,
            to_name: 'User',
            from_name: 'Subtype Tool',
            subject: 'Test Email from Subtype Tool',
            message:
                'This is a test email from the Subtype Tool. If you received this, EmailJS is configured correctly!',
            date: new Date().toLocaleString(),
        })

        console.log('EmailJS response:', response)
        return { success: true }
    } catch (error) {
        console.error('EmailJS error:', error)
        return {
            success: false,
            error: error.text || error.message || 'Failed to send email',
        }
    }
}

/**
 * Send a clinical report email via EmailJS
 * @param {Object} options - Email options
 * @param {string} options.toEmail - Recipient email address
 * @param {string} options.serviceId - EmailJS service ID
 * @param {string} options.templateId - EmailJS template ID
 * @param {Object} options.config - Subcategory configuration
 * @param {Object} options.testing - Testing data
 * @param {Array} options.management - Management items
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendReportEmail({
    toEmail,
    serviceId,
    templateId,
    config,
    testing,
    management,
}) {
    const checkedManagement = management.filter((item) => item.checked)

    // Build testing sections text
    let standardTestingText = ''
    if (testing.standard && testing.standard.length > 0) {
        standardTestingText = testing.standard
            .map((item) => `• ${item.name}${item.description ? `: ${item.description}` : ''}`)
            .join('\n')
    }

    let advancedTestingText = ''
    if (testing.advanced && testing.advanced.length > 0) {
        advancedTestingText = testing.advanced
            .map((item) => `• ${item.name}${item.description ? `: ${item.description}` : ''}`)
            .join('\n')
    }

    let managementText = ''
    if (checkedManagement.length > 0) {
        managementText = checkedManagement
            .map((item) => `✓ ${item.label}${item.description ? `: ${item.description}` : ''}`)
            .join('\n')
    }

    try {
        const response = await emailjs.send(serviceId, templateId, {
            to_email: toEmail,
            to_name: 'User',
            from_name: 'Subtype Tool',
            subject: `${config.category} - ${config.title} Report`,
            category: config.category,
            title: config.title,
            standard_testing: standardTestingText || 'None',
            advanced_testing: advancedTestingText || 'None',
            management: managementText || 'None selected',
            date: new Date().toLocaleString(),
        })

        console.log('EmailJS response:', response)
        return { success: true }
    } catch (error) {
        console.error('EmailJS error:', error)
        return {
            success: false,
            error: error.text || error.message || 'Failed to send email',
        }
    }
}

