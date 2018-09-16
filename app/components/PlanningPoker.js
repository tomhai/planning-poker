import * as API from './../js/api.js';
import {Polls} from './Polls.js';
import {Results} from './Results.js';
import {Vote} from './Vote.js';

export class PlanningPoker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { polls: [] };
    }

    componentDidMount() {
        API.getPolls((pollsArray) => {
            this.setState({polls: pollsArray});
        });
    }

    createPoll() {
        if (!this.props.getUser()) {
           alert('Must set username!');
        } else {
            API.createPoll(this.props.getUser());
        }
    }

    onPollUpdate(pollId, poll) {
        this.setState({
            pollId: pollId,
            poll: poll
        });
    }

    onVote(index) {
        if (!this.props.getUser()) {
            alert('Must set username!');
        } else {
            API.saveVote(this.state.pollId, this.props.getUser(), index);
        }
    }

    render() {
        let showResultsTitle = false;
        for (let j = 0; this.state.poll && j <  this.state.poll.cards.length; j++) {
            if (this.state.poll.counted[j] > 0) {
                showResultsTitle = true;
            }
        }

        return React.createElement(
            'div',
            {className: 'poll-container'},
            React.createElement(
                'div',
                null,
                React.createElement('button', { id: 'createPoll', onClick: this.createPoll.bind(this) }, 'Create poll')
            ),
            this.state.polls && React.createElement(Polls, { 
                polls: this.state.polls,
                setActive: (item) => {
                    API.joinPoll(item[0], this.props.getUser(), this.onPollUpdate.bind(this));
                }
            }),
            React.createElement(
                'div', 
                { 
                    id: 'poll', 
                    className: 'vote-container'
                },
                showResultsTitle && React.createElement('span', {className: 'result-title'},
                    React.createElement('span', null, 'Results ', React.createElement('span', {className: 'result-hand'}, '👉'))),
                this.state.poll && React.createElement(Results, {poll: this.state.poll}),
                this.state.poll && !showResultsTitle && React.createElement('div', {className: 'vote-title'},
                    React.createElement('span', null, 'Vote! ', React.createElement('span', {className: 'result-hand'}, '👇'))),
                this.state.poll && React.createElement(Vote, {poll: this.state.poll, pollId: this.state.pollId, vote: this.onVote.bind(this)})
            )
        );
    }
}