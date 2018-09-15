export class Polls extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: -1 };
    }

    render() {
        const polls = this.props.polls.map(item => {
            return React.createElement(
                'li', 
                {
                    key: item[0],
                    onClick: () => {
                        this.props.setActive(item);
                        this.setState({activeIndex: item[0]});
                    },
                    className: (item[0] === this.state.activeIndex ? 'active' : '')
                },
                `Poll #${item[0]} by ${item[1].user}`
            );
        });

        return React.createElement('ul', { id: 'polls' }, polls);
    }
}