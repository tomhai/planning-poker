export class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: -1 };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pollId !== this.props.pollId) {
            this.setState({activeIndex: -1});
        }
    }

    render() {
        const cards = this.props.poll.cards.map((item, index) => {
            return React.createElement(
                'div', 
                {
                    key: item,
                    onClick: () => {
                        this.props.vote(index);
                        this.setState({activeIndex: index});
                    },
                    className: (index === this.state.activeIndex ? 'vote active' : 'vote')
                },
                React.createElement('div', {className: 'card'}, item)
            );
        });

        return React.createElement('div', null,cards);
    }
}