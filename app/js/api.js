const client = new Faye.Client('http://localhost:8000/faye');
let channel = null;

export function getPolls(callback) {
    const subscribe = client.subscribe('/control', function(message) {
        console.log(message);
        if (message.type === 'polls') {
            callback(message.polls);
        }
    });

    subscribe.then(() => {
        client.publish('/control', {type: 'getPolls'});
    })
}

export function createPoll(username) {
    client.publish('/control', {type: 'createPoll', user: username});
}

export function joinPoll(pollId, username, callback) {
    const subscribe = client.subscribe('/poll/' + pollId, function(message) {
        console.log(message);
        if (message.type === 'poll') {
            callback(pollId, message.poll);
        }
    });

    subscribe.then(() => {
        client.publish('/control', {type: 'joinPoll', pollId: pollId, user: username});
    });
}

export function saveVote(pollId, user, index) {
    client.publish('/poll/' + pollId, {type: 'vote', user: user, index: index});
}
