import throttle from 'lodash.throttle';

const KeyName = 'feedback-form-state';
let formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onSubmit);



function onInput(e) {
    formData = {
        email: refs.input.value.trim(),
        message: refs.textarea.value.trim(),
    };
    localStorage.setItem(KeyName, JSON.stringify(formData));
}

function onSubmit(e) {
    e.preventDefault();

    const { email, message } = e.currentTarget.elements;
    console.log({ email: email.value.trim(), message: message.value.trim() });

    if (localStorage.getItem(KeyName)) {
        localStorage.removeItem(KeyName);
    }
    e.currentTarget.reset();
    formData = {};
}

function saveFeedbackForm() {
    let data = localStorage.getItem(KeyName);
    if (!data) return;
    formData = JSON.parse(data);
    refs.input.value = formData.email ?? '';
    refs.textarea.value = formData.message ?? '';
}
saveFeedbackForm();