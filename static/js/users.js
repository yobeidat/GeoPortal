import { addRow, populateTable } from './tableManager.js';

const form = document.querySelector('#createUserForm');
const username = document.querySelector('#username');
const plainPassword = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const fullName = document.querySelector('#fullName');
const role = document.querySelector('#role');
const group = document.querySelector('#group');
const usersTable = document.querySelector('#usersTable');

form.addEventListener('submit', createUser);

(async function () {
    const result = await fetch('/users/allusers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    if (result.status === 'ok') {
        populateTable(usersTable, result.data);
    } else {
        alert(result.error);
    }
})();

async function createUser(event) {
    event.preventDefault();

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {

        const result = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                plainPassword: plainPassword.value,
                fullName: fullName.value,
                role: role.value,
                group: group.value
            })
        }).then((res) => res.json());

        if (result.status === 'ok') {
            $('#AddUserModal').modal('hide');
            addRow(usersTable, {
                username: username.value,
                fullName: fullName.value,
                role: role.value,
                group: group.value
            });
            resetForm();
        } else {
            alert(result.error);
        }
    }
    form.classList.add('was-validated');

}

function validateForm() {

}

function resetForm() {
    username.value = "";
    plainPassword.value = "";
    fullName.value = "";
    role.selectedIndex = 0;
    group.selectedIndex = 0;
}