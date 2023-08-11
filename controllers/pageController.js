import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const getIndexPage = (req, res) => {
    res.status(200).render('index', {
        pageName: 'index',
    });
};


const sendEmail = async (req, res) => {
    try {
        const outputMessage = `
    
        <h1>Gönderen Bilgileri</h1>
        <ul>
            <li>İsim: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Telefon: ${req.body.tel}</li>
            <li>Konu: ${req.body.subject}</li>
        </ul>

        <h1>Mesaj</h1>
        <p>${req.body.message}</p>
        `;

        let mail = process.env.EMAIL;
        let passw = process.env.PASS;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: mail, // gmail account
                pass: passw, // gmail password
            },
        });

        let info = await transporter.sendMail({
            from: '"Smart EDU Contact Form" ', // sender address
            to: mail, // list of receivers
            subject: 'Smart EDU Contact Form New Message',
            html: outputMessage,
        });

        req.flash('success', 'Mesajınız Tarafıma İletilmiştir');

        res.status(200).redirect('/#form');
    } catch (err) {
        req.flash('error', `Mesajınız Gönderilemedi! ${err}`);
        res.status(200).redirect('/#form');
    }
};

export {
    getIndexPage,
    sendEmail,
};
