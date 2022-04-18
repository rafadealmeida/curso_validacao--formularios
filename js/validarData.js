
export function valida (input){
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
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
        valueMissing:'O campo senha não pode está vazio',
        patternMismatch:'Este campo deve conter de 6 a 12 caracteres e pelo menos 1 letra Maiúscula e minuscula ,1 número e não pode conter símbolos'
    },
    dataNascimento:{
        valueMissing:'O campo data de nascimento não pode está vazio',
        customError: 'Você deve ter mais que 18 anos para se cadastrar'
            },
    cpf:{
        valueMissing:'O campo cpf não pode está vazio',
        customError:'O cpf digitado não é valido!'
    },
    cep:{
        valueMissing:'O campo cep não pode está vazio',
        patternMismatch:'O cep digitado não é válido',
        customError:'Não foi possível buscar o CEP'
    },
    logradouro:{
        valueMissing:'O campo logradouro não pode está vazio'
    },
    cidade:{
        valueMissing:'O campo cidade não pode está vazio'
    },
    estado:{
        valueMissing:'O campo cidade não pode está vazio'
    },
    preco:{
        valueMissing:'O campo de preço não pode está vazio'

    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCep(input)
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
    const cpfFormatado =  input.value.replace(/(?:\D+)/g, '')
    let mensagem = ''

    if(!checarCPFRepetido(cpfFormatado) || !chegaEstruturaCPF(cpfFormatado)){
        mensagem = 'O cpf digitado não é valido!'
    }

    input.setCustomValidity(mensagem)
}

function checarCPFRepetido (cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'

    ]

    let cpfValido = true;

    valoresRepetidos.forEach(valor =>{
        if(valor == cpf){
            cpfValido = false
        }
    })
    return cpfValido;
}

function chegaEstruturaCPF(cpf){
     const multiplicador = 10;

    return checaDigitoVerificador(cpf , multiplicador)

    
}

function checaDigitoVerificador(cpf, multiplicador){

    if (multiplicador>=12){
        return true;
    }

    let multiplicadorInicial= multiplicador;
    let soma = 0;
    const cpfSemdgitos = cpf.substr(0, multiplicador - 1).split('')

    for(let contador = 0;multiplicadorInicial>1;multiplicadorInicial--){
        soma+=cpfSemdgitos[contador] *multiplicadorInicial;
        contador++;
    }

    if(checaDigitoVerificador == confirmaDigito(soma)){
        return checaDigitoVerificador(cpf,multiplicador + 1)
    }

    return false
}

function confirmaDigito(soma){
    return 11 - (soma % 11)
}

function recuperarCep(input){
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing){
        fetch(url, options).then(
            response => response.json()
        ).then(
            data=>{
                if(data.erro){
                    input.setCustomValidity('Não foi possível buscar o CEP')
                    return
                }
                input.setCustomValidity('');
                preencheCamposCep(data)
                return
            }
        )
            
    }
}

function preencheCamposCep(data){
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')


    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}