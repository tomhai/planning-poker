import * as API from './api.js';
import {elem} from './utils.js';

onload = (() => {
    console.log("#### Planning poker ####");

    let username = null;

    document.querySelector('#saveUser')
        .addEventListener('click', (e) => {
            const userInput = document.querySelector('#name');
            if (userInput.value.length === 0) {
                alert('Must set username!');
            } else {
                userInput.readOnly = true;
                e.target.disabled = true;
                username = userInput.value;
            }
        });   

    document.querySelector('#createPoll')
        .addEventListener('click', () => {
            if (!username) {
               alert('Must set username!');
            } else {
                API.createPoll(username);
            }
        });

    const onPollUpdate = (pollId, poll) => {
        const container = document.querySelector('#poll');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        elem(container, 'div', `#${pollId}: creator(${poll.user})`);
        poll.cards.map((item, index) => {
            const voteContainer = elem(container, 'div', null, () => {
                if (!username) {
                   alert('Must set username!');
                } else {
                    API.saveVote(pollId, username, index);
                }
            }, 'vote');

            elem(voteContainer, 'div', item);
            elem(voteContainer, 'div', poll.counted[index]);
        });
    }

    API.getPolls((pollsArray) => {
        const polls = document.querySelector('#polls');
        while (polls.firstChild) {
            polls.removeChild(polls.firstChild);
        }
        pollsArray.map((item) => {
            elem(polls, 'li', `#${item[0]}: creator(${item[1].user})`, () => {
                API.joinPoll(item[0], username, onPollUpdate);
            });
        });
    });
})(API, elem)
