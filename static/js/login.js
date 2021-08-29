(function () {

    const form = document.querySelector('#loginForm');
    form.addEventListener('submit', login);


    async function login(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;

            const result = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }).then((res) => res.json());

            if (result.status === 'ok') {
                localStorage.setItem('userGroup', result.userGroup);
                document.location.href="/map";
            } else {
                alert(result.error);
            }
        }
        form.classList.add('was-validated');
    }
})()
