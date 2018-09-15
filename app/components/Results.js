export class Results extends React.Component {
    render() {
        const list = [];
        for (let j = 0; j < this.props.poll.cards.length; j++) 
            list.push({'card': this.props.poll.cards[j], 'count': this.props.poll.counted[j]});

        list.sort(function(a, b) {
            return ((a.count < b.count) ? 1 : ((a.count == b.count) ? 0 : -1));
        });

        const results = list.map(item => {
            const cards = [];
            const max = item.count >= 5 ? 5 : item.count;
            for (let i = 0; i < max; i++) {
                let classes = 'result';
                classes += i > 0 ? ` overlapped card-${i}` : ''; 
                cards.push(React.createElement(
                    'div', 
                    {
                        className: classes,
                        key: i
                    },
                    React.createElement('div', {className: 'result-card'}, item.card),
                    i === 0 && React.createElement('div', {className: 'result-count'}, item.count)
                ));
            }
            return item.count > 0 && React.createElement('div', {className: 'result-inner-container', key: item.card}, cards);
        });

        return React.createElement('div', {className: 'results-container'}, results);

    }
}