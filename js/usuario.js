document.addEventListener('DOMContentLoaded', function() {
    // Cambiar entre pestañas
    document.getElementById('go-to-register').addEventListener('click', function(e) {
        e.preventDefault();
        const registerTab = new bootstrap.Tab(document.getElementById('register-tab-btn'));
        registerTab.show();
    });

    document.getElementById('go-to-login').addEventListener('click', function(e) {
        e.preventDefault();
        const loginTab = new bootstrap.Tab(document.getElementById('login-tab-btn'));
        loginTab.show();
    });

    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Validación de contraseñas
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        if (password !== confirmPassword) {
            document.getElementById('register-confirm').setCustomValidity('Las contraseñas no coinciden');
            this.classList.add('was-validated');
            return;
        }

        this.classList.remove('was-validated');
        document.getElementById('register-confirm').setCustomValidity('');

        if (this.checkValidity()) {
            registerUser();
        } else {
            this.classList.add('was-validated');
        }
    });

    // Función para registrar usuario (actualizada para CORS)
    async function registerUser() {
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // IMPORTANTE: Usa la URL correcta para tu entorno
        const apiUrl = 'http://localhost/PAGINAWEB_GAMES/php/registro.php';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });

            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Respuesta inesperada: ${text}`);
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Error en el registro');
            }

            // Mostrar modal de éxito
            const registroExitosoModal = new bootstrap.Modal(document.getElementById('registroExitosoModal'));
            registroExitosoModal.show();

            // Guardar usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));

            // Redirigir después de 3 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);

        } catch (error) {
            console.error('Error en el registro:', error);
            showAlert('Error al registrar: ' + error.message, 'error');
        }
    }
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.checkValidity()) {
            loginUser();
        } else {
            this.classList.add('was-validated');
        }
    });

    // Función para login (también actualizada para CORS)
    async function loginUser() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // URL dinámica para desarrollo/producción
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost/PAGINAWEB_GAMES/php/login.php'
            : 'php/login.php';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Respuesta inesperada: ${text}`);
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            showAlert('Inicio de sesión exitoso. Redirigiendo...', 'success');
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            console.error('Error en el login:', error);
            showAlert('Error: ' + error.message, 'error');
        }
    }

    // Función para mostrar alertas
    function showAlert(message, type) {
        // Eliminar alertas anteriores
        const oldAlert = document.querySelector('.custom-alert');
        if (oldAlert) oldAlert.remove();

        // Crear nueva alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert alert-${type}`;
        alertDiv.textContent = message;

        // Insertar en el formulario activo
        const activeTab = document.querySelector('.tab-pane.active');
        activeTab.insertBefore(alertDiv, activeTab.firstChild);

        // Eliminar después de 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
});