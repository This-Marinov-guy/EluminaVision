import { MailtrapClient } from "mailtrap";

const mailTrap = (options) => {
    return new Promise((resolve, reject) => {
        const TOKEN = process.env.MAIL_TRAP_PASS;
        const ENDPOINT = "https://send.api.mailtrap.io/";

        const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

        const sender = {
            email: "noreply@daskichka.bg",
            name: "Екипът на Дъскичка",
        };
        const recipients = [
            {
                email: options.receiver,
            }
        ];

        client.send({
            from: sender,
            to: recipients,
            template_uuid: options.template_uuid,
            template_variables: options.data,
        }).then(() => {
            resolve(true); // Resolve with true if the email is sent successfully

            return true
        }).catch((err) => {
            console.error('Error sending email:', err);
            reject(false); // Reject with false if there's an error sending the email

            return false
        });
    });
}

export default mailTrap;
