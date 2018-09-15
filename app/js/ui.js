import {PlanningPoker} from './../components/PlanningPoker.js';

onload = (() => {
    console.log("#### Planning poker ####");

    let username = new URL(location.href).searchParams.get('user');
    if (username) {
        const userInput = document.querySelector('#name');
        userInput.value = username;
        userInput.readOnly = true;
        const container = document.querySelector('.container');
        container.classList.add('active');
    }
 
    function saveUser() {
        const userInput = document.querySelector('#name');
        const container = document.querySelector('.container');
        if (userInput.value.length === 0) {
            alert('Must set username!');
        } else {
            userInput.readOnly = true;
            username = userInput.value;
            container.classList.add('active');
            history.replaceState(null, null, '?user=' + username);
        }
    }

    document.querySelector('#saveUser').addEventListener('click', () => {
        saveUser();
    });   

    document.querySelector('#name').onkeyup = (e) => {
        if (e.keyCode === 13) {
            saveUser();
        }
    };

    const domContainer = document.querySelector('.js-poll-container');
    ReactDOM.render(React.createElement(PlanningPoker, {getUser: () => {return username;}}), domContainer);

})(PlanningPoker, React, ReactDOM);
