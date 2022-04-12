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