document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const signUpButton = document.getElementById('sign-up-button');
    const container = document.querySelector('.container');

    loginButton.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
    });

    signUpButton.addEventListener('click', () => {
        container.classList.add('sign-up-mode');
    });

    // Optional: You can add form submission logic here if needed
    const loginForm = document.getElementById('login-form');
    const signUpForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Add your login logic here
        console.log('Login form submitted');
    });

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Add your sign-up logic here
        const usernameInput = document.getElementById('signup-username').value;
        const emailInput = document.getElementById('signup-email').value;
        const passwordInput = document.getElementById('signup-password').value;

        // Create user in Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
            .then((userCredential) => {
                // User signed up successfully
                const user = userCredential.user;
                console.log('User signed up:', user);

                // Add user information to Firebase Firestore
                const db = firebase.firestore();
                db.collection('users').doc(user.uid).set({
                    email: emailInput,
                    username: usernameInput,
                    // Add any other user information you want to store
                })
                .then(() => {
                    console.log('User data added to Firestore');
                })
                .catch((error) => {
                    console.error('Error adding user data to Firestore:', error);
                });
            })
            .catch((error) => {
                // Handle errors
                console.error('Sign-up error:', error.message);
            });
    });
});
