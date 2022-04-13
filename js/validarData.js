const dataNascimento = document.querySelector('#nascimento');

dataNascimento.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target)
})


export function valida (input){
    const tipoDeInput = input.dataset.tipo

    if (validaDataNascimento[tipoDeInput]) {
        validaDataNascimento[tipoDeInput](input)
    }

    if (input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else{
        
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagem(tipoDeInput,input)
    }
}

const tipoDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagemDeErro = {
    nome:{
        valueMissing:'O campo nome não pode está vazio'

    },
    email:{
        valueMissing:'O campo email não pode está vazio',
        typeMismatch:'O email digitado não é valido'
    },
    senha:{
        valueMissing:'O campo nome não pode está vazio',
        patternMismatch:'Este campo deve conter pelo menos 1 letra Maiúscula ,1 número e não pode conter símbolos'
    },
    dataNascimento:{
        valueMissing:'O campo nome não pode está vazio',
        customError: 'Você deve ter mais que 18 anos para se cadastrar'

    }
}


function mostraMensagem(tipoDeInput,input) {
    let mensagem ='';

    tipoDeErro.forEach(erro =>{
        if(input.validity[erro]){
            mensagem = mensagemDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}


const validadores = {
    dataNascimento:input => validaDataNascimento(input)
}


function validaDataNascimento(input){
   const dataRecebida = new Date(input.value);
   let mensagem = ''

   if(!maiorQue18(dataRecebida)){
       mensagem = "Você deve ter mais que 18 anos para se cadastrar"
   }

   input.setCustomValidity(mensagem)
}

function maiorQue18(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getFullYear() + 18, data.getMonth(), data.getDate())

    return dataMais18 <= dataAtual
}


function validaCPF(input){
    const cpfFormatado =  input.value.replace(/\D/g,"")
    let mensagemCpf = ''

    input.setCustomValidity(mensagemCpf);
}

function checarCPFRepetido (cpf){
    const valoresRepetidos = [
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"

    ];

    let cpfValido = true;

    valoresRepetidos.forEach(valor =>{
        if(valor == cpf){
            cpfValido=false
        }
    })
    return cepfValido;
}