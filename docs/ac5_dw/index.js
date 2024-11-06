const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const submitButton = document.getElementById('submitButton');
const resultDiv = document.getElementById('result');
const spinner = document.getElementById('spinner');
const fileInput = document.getElementById('file');
const imagePreview = document.getElementById('imagePreview');
const removeImageButton = document.getElementById('removeImageButton');

contactForm.addEventListener('input', function () {
    const allFilled = [...document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select')]
        .every(input => input.value.trim());
    submitButton.disabled = !allFilled;
});

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput.value;

    let hasErrors = false;

    if (!name) {
        alert('Nome é obrigatório.');
        nameInput.style.borderColor = 'red';
        hasErrors = true;
    } else {
        nameInput.style.borderColor = '';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Formato de email inválido.');
        emailInput.style.borderColor = 'red';
        hasErrors = true;
    } else {
        emailInput.style.borderColor = '';
    }

    if (message.length < 100) {
        alert('A mensagem deve ter pelo menos 100 caracteres.');
        messageInput.style.borderColor = 'red';
        hasErrors = true;
    } else {
        messageInput.style.borderColor = '';
    }

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
        alert('O telefone deve estar no formato (XX) XXXXX-XXXX.');
        phoneInput.style.borderColor = 'red';
        hasErrors = true;
    } else {
        phoneInput.style.borderColor = '';
    }

    if (!subject) {
        alert('Por favor, selecione um assunto.');
        subjectInput.style.borderColor = 'red';
        hasErrors = true;
    } else {
        subjectInput.style.borderColor = '';
    }

    if (hasErrors) return;

    spinner.style.display = 'block';
    submitButton.disabled = true;

    setTimeout(() => {
        spinner.style.display = 'none';
        resultDiv.textContent = 'Formulário enviado com sucesso!';
        resultDiv.classList.add('Show');

        setTimeout(() => window.location.href = 'outra_pagina.html', 2000);

        contactForm.reset();
        submitButton.disabled = true;
    }, 2000);
});

fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview.innerHTML = `<img src="${event.target.result}" alt="Pré-visualização da imagem">`;
            removeImageButton.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
});

removeImageButton.addEventListener('click', function () {
    imagePreview.innerHTML = '';
    fileInput.value = '';
    removeImageButton.style.display = 'none';
});
