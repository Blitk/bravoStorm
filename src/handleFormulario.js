const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

module.exports = function handleFormulario(dados){
    dados = JSON.parse(dados.json);
    let config = {
        service: 'hotmail',
        host: 'smtp-mail.outlook.com',
        secure: false,
        port: 587, 
        auth: {
            user: "handler.bravostorm@hotmail.com",
            pass: "BravoStorm2024@"
        }
    }
    let transporter = nodemailer.createTransport(config);

    var dt = new Date(Date.now());
    var data = dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    var htmlForMail ='';
    for (var prop in dados) {
        
        if( prop == "email"){
            htmlForMail += `<p><b>${prop.replace(/[^\w\s]/gi, '')}</b> - ${dados[prop]} </p><br>`;
        }else{
            htmlForMail += `<p><b>${prop.replace(/[^\w\s]/gi, '')}</b> - ${dados[prop].replace(/[^\w\s]/gi, '')} </p><br>`;
        }
      }
      


    let message = {
        from: 'handler.bravostorm@hotmail.com',
        to: 'naoresponda.bravostorm@gmail.com', 
        subject:  `[${data}]` + " - " + dados.tipoFormulario ,
        html: htmlForMail, 
        
    };

    transporter.sendMail(message).then((info) => {
        console.log("deu certo");
    }).catch((err) => {
        console.log("deu ruim");
    }
    );
}
