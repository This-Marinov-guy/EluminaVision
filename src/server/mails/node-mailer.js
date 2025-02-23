import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path'
import { EMAIL } from '../../utils/defines';

const nodeMailer = async (options) => {
    // Define a promise-based function to read the HTML file
    const readHTMLFile = (filePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
    };

    // Create a transporter
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: process.env.GMAIL_PASS
        },
        secure: true
    });

    try {
        // Read the HTML file asynchronously
        const html = await readHTMLFile(path.join(process.cwd(), 'src/server/templates', options.template));

        // Compile the template
        const template = handlebars.compile(html);

        // Generate HTML content from the template and data
        const htmlToSend = template(options.data);

        // Create mail options
        const mailOptions = {
            from: options.sender ?? 'notification-center@example.com',
            to: options.receiver ?? EMAIL,
            subject: options.subject,
            html: htmlToSend,
        };

        // Send the email
        const response = await transporter.sendMail(mailOptions);

        // Return true if email is sent successfully
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        // Return false if there's an error sending the email
        return false;
    }
};

export default nodeMailer;

