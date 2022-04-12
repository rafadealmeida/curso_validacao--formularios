import {valida} from './validarData.js';

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur',(evento)=>{
        valida(evento.target)
    })
})