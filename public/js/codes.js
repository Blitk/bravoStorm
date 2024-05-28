function changeDropListHeader(){
    let x = $("#headerNav");
    if(x.css("display") === "none"){
        x.css("display","block");
    }else{
        x.css("display", "none");
    }
}



async function startCarrossel(){
    const carrosselItens = {
        bombeiro: {"titulo":"Bombeiro Civil","path":"images/carrosselBombeiro.jpg", "num":1, "conteudo": "Nossos bombeiros civis são treinados rigorosamente para garantir a qualidade e excelência aos nossos clientes, colaboradores e do patrimônio."},
        enfermeira: {"titulo":"Enfermeiro","path":"images/carrosselEnfermeira.jpg", "num":2, "conteudo": "Nossos enfermeiros possuem capacitação para lidar com situações de risco, de maneira ágil, prática e precisa, com o objetivo de preservar a integridade e o bem-estar dos nossos clientes."},
        tecnico: {"titulo":"Téc. Segurança do Trabalho","path":"images/carrosselTecnico.jpeg", "num":3, "conteudo": "Nossos profissionais de segurança do trabalho são capacitados para oferecer a solução mais adequada e avaliar os riscos, garantindo a integridade de seu patrimônio e a segurança de seus funcionários."}
    };
    
    $("#carrosselImage").attr("src", carrosselItens.bombeiro["path"]);
    $("#carrosselImage").attr("alt", "Imagem de um Bombeiro")
    $("#tituloCarrossel").text(carrosselItens.bombeiro["titulo"]);
    $("#conteudoCarrossel").text(carrosselItens.bombeiro["conteudo"]);
    $("#tipoCotacao").attr("value",carrosselItens.bombeiro["titulo"]);
    while (true) {
        await new Promise(r => setTimeout(r, 6000));
        $("#carrosselImage").attr("src", carrosselItens.enfermeira["path"]);
        $("#carrosselImage").attr("alt", "Imagem de uma Enfermeira")
        $("#tituloCarrossel").text(carrosselItens.enfermeira["titulo"]);
        $("#conteudoCarrossel").text(carrosselItens.enfermeira["conteudo"]);
        $("#tipoCotacao").attr("value", carrosselItens.enfermeira["titulo"]);

        await new Promise(r => setTimeout(r, 6000));
        $("#carrosselImage").attr("src", carrosselItens.tecnico["path"]);
        $("#carrosselImage").attr("alt", "Imagem de um Técnico de segurança do trabalho")
        $("#tituloCarrossel").text(carrosselItens.tecnico["titulo"]);
        $("#conteudoCarrossel").text(carrosselItens.tecnico["conteudo"]);
        $("#tipoCotacao").attr("value",carrosselItens.tecnico["titulo"]);

        await new Promise(r => setTimeout(r, 6000));
        $("#carrosselImage").attr("src", carrosselItens.bombeiro["path"]);
        $("#carrosselImage").attr("alt", "Imagem de um Bombeiro")
        $("#tituloCarrossel").text(carrosselItens.bombeiro["titulo"]);
        $("#conteudoCarrossel").text(carrosselItens.bombeiro["conteudo"]);
        $("#tipoCotacao").attr("value",carrosselItens.bombeiro["titulo"]);
    }

}

function showCotacao(){
    // $("body").css("filter", "blur(10px)");
    $("#cotacaoBox").css("display", "block");

    if($("#tituloCarrossel").text () === "Bombeiro Civil"){
        $("#optBC").attr("selected","");
    }if($("#tituloCarrossel").text () === "Enfermeiro"){
        $("#optEnf").attr("selected","");
    }if($("#tituloCarrossel").text () === "Téc. Segurança do Trabalho"){
        $("#optTST").attr("selected","");
    }


}

function closeCotacao(){
    $("#cotacaoBox").css("display", "none");
}

function goToCotacao(){
    document.getElementById("cotacaoBox").scrollIntoView();
    showCotacao();
}

function showEscola(){
    window.location.href = "https://wa.me/5511991274324?text=Ol%C3%A1+Bravo+Storm%2C+gostaria+de+saber+mais+sobre+o+curso+de+Bombeiro+Civil.";
}

function goToNav(id){
    document.getElementById(id).scrollIntoView();

}


function verificaEmail(email){
    let cont = email;
    if( cont.indexOf("@") != 0 && cont.indexOf("@") != -1 && (cont.substring(cont.length-4) == ".com" || cont.substring(cont.length-3) == ".br" )){
        return true;
    }
    else{
        return false;
    }
}

function verificaCelular (celular) {
    var regex1 = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
    var regex2 = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
    return regex1.test(celular) || regex2.test(celular);
}

function verificaCep(cep){
    cep.replace("-", "");
    return cep.length == 8;
}

function verificaCamposCotacao(){
    
    if(!verificaEmail($(`input[name="emailCotacao"]`).val())){
        alert("Email Inválido!")
        return
    }

    if(!verificaCelular($(`input[name="celularCotacao"]`).val())){
        alert("Celular inválido!");
        return
    }

    else{
       let dados = {
        "tipoFormulario": "Cotação",
        "serviço":  $(`select[name="servicoCotacao"]`).val(),
        "nome": $(`input[name="nomeCotacao"]`).val(),
        "email": $(`input[name="emailCotacao"]`).val(),
        "celular": $(`input[name="celularCotacao"]`).val(),
        "detalhes": $(`textarea[name="detCotacao"]`).val()
       }

       dados = JSON.stringify(dados);
       
       //Requisição para API
       console.log(dados);
       $.ajax({
            url: "http://localhost:3000/enviar",
            method: "POST",        
            data: {json: dados},
            dataType: "json",
            success: alert("Obrigado por nos contatar, entraremos em contato em breve!"),
        });

    }
}

function verificaCamposFaleConosco(){
    
    if(!verificaEmail($(`input[name="emailFaleConosco"]`).val())){
        alert("Email inválido");
        return;
    }

    else{
        let dados = {
            "tipoFormulario": "FaleConosco",
            "assunto":  $(`input[name="assuntoFaleConosco"]`).val(),
            "nome": $(`input[name="nomeFaleConosco"]`).val(),
            "email": $(`input[name="emailFaleConosco"]`).val(),
            "mensagem": $(`textarea[name="mensagemFaleConosco"]`).val()
           }
    
        dados = JSON.stringify(dados);
       
        //Requisição para API
        console.log(dados);
       $.ajax({
            url: "http://localhost:3000/enviar",
            method: "POST",        
            data: {json: dados},
            dataType: "json",
            success: alert("Obrigado por nos contatar, entraremos em contato em breve!"),
        });
    }
}

function verificaCamposTrabalheConosco(){
    //profissao experiencia nome email celular cep mensagem

    if(!verificaEmail($(`input[name="emailTrabalheConosco"]`).val())){
        alert("Email Inválido!")
        return
    }

    if(!verificaCelular($(`input[name="celularTrabalheConosco"]`).val())){
        alert("Celular inválido!");
        return
    }

    if(!verificaCep($(`input[name="CEPTrabalheConosco"]`).val())){
        alert("CEP inválido!");
        return;
    }

    else{
       let dados = {
        "tipoFormulario": "TrabalheConosco",
        "profissão":  $(`select[name="profissaoTrabalheConosco"]`).val(),
        "experiencia":  $(`select[name="experienciaTrabalheConosco"]`).val(),
        "nome": $(`input[name="nomeTrabalheConosco"]`).val(),
        "email": $(`input[name="emailTrabalheConosco"]`).val(),
        "celular": $(`input[name="celularTrabalheConosco"]`).val(),
        "CEP": $(`input[name="CEPTrabalheConosco"]`).val(),
        "mensagem": $(`textarea[name="mensagemTrabalheConosco"]`).val()
       }

       dados = JSON.stringify(dados);
       
       //Requisição para API
       console.log(dados);
       $.ajax({
            url: "http://localhost:3000/enviar",
            method: "POST",        
            data: {json: dados},
            dataType: "json",
            success: alert("Obrigado por nos contatar, entraremos em contato em breve!"),
        });

    }
}

window.onload = () =>{ startCarrossel()};