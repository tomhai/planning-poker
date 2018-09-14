const cards = ['0', '1/2', '1', '2', '3', '5', '8', '13'];
const polls = new Map();
let pollCountId = 1;

function vote(pollId, user, index) {
    let poll = polls.get(pollId);
    poll.votes.set(user, index);
    poll.counted = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let [key, index] of poll.votes) {
        poll.counted[index]++;
    }
}

exports.init = function(bayeux) {
    const subscription = bayeux.getClient().subscribe('/control', (message) => {
        switch(message.type) {
            case 'createPoll':
                polls.set(pollCountId++, {
                    user: message.user,
                    cards: cards,
                    votes: new Map(),
                    counted: [0,0,0,0,0,0,0,0]
                })
                console.log(`${message.user} created a new poll #${pollCountId}`);
                bayeux.getClient().publish('/control', {
                    type: 'polls',
                    polls: [...polls]
                });
                break;
            case 'getPolls':
                bayeux.getClient().publish('/control', {
                    type: 'polls',
                    polls: [...polls]
                });
                break;
            case 'joinPoll':
                console.log(`${message.user} joined poll #${message.pollId}`);
                bayeux.getClient().publish('/poll/' + message.pollId, {
                    type: 'poll',
                    poll: polls.get(message.pollId)
                });
                break;
            default:
                console.err('Unsupported command ' + message.type);
        }
    });

    subscription.then(() => {
        console.log('Listening control channel');
    });

    const pollSubscription = bayeux.getClient().subscribe('/poll/*').withChannel((channel, message) => {
        if (message.type === 'vote') {
            console.log(`${message.user} voted for ${cards[message.index]} on ${channel}`);
            const pollId = parseInt(channel.split('/')[2]);
            vote(pollId, message.user, message.index);
            bayeux.getClient().publish(channel, {
                type: 'poll',
                poll: polls.get(pollId)
            });
        }
    });

    pollSubscription.then(() => {
        console.log('Listening poll channels');
    });
}
