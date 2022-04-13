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
    } else{

        input.parentElement.classList.add('input-container--invalido')
    }
}

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
        patternMisMatch:'Este campo deve conter pelo menos 1 letra Maiúscula ,1 número e não pode conter símbolos'
    },
    dataNascimento:{
        valueMissing:'O campo nome não pode está vazio',
        customError: 'Você deve ter mais que 18 anos para se cadastrar'

    }
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