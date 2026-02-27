const Contact = require("../models/Contact");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
exports.submitContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        // Save contact message to database
        const contact = await Contact.create({ name, email, message });

        // Send notification email to admin
        const html = `
      <h2>New Contact Form Submission — LABAS</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr>
          <td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td>
          <td style="padding:8px;">${message}</td>
        </tr>
      </table>
    `;

        try {
            await sendEmail({
                to: process.env.SMTP_USER, // Send to admin email
                subject: `LABAS Contact Form — ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                html,
            });
        } catch (emailErr) {
            // Log email error but don't fail the request — message is already saved
            console.error("Contact notification email failed:", emailErr.message);
        }

        res.status(201).json({
            success: true,
            message: "Your message has been sent successfully",
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};
