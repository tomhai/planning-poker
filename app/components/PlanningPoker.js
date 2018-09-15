import * as API from './../js/api.js';
import {Polls} from './Polls.js';
import {Results} from './Results.js';
import {Voting} from './Voting.js';

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
                this.state.poll && React.createElement(Results, {poll: this.state.poll}),
                this.state.poll && React.createElement(Voting, {poll: this.state.poll, vote: this.onVote.bind(this)})
            )
        );
    }
}