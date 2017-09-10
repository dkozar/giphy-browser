import React, { Component } from 'react';
import WrappyText from 'react-wrappy-text';

const texts = [
    'Giphy browser.',
    'Click the buttons below to initiate search.',
    'You can define buttons via URL as "?buttons=foo,bar".',
    'Select any of the search results.',
    'Image preview should be displayed on the right.',
    '[ Copyright 2017 by Danko Kozar ]'
];

export default class HeaderTextRotator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            text: texts[0]
        };

        this.start();
    }

    start() {
        this.interval = setInterval(
            () => {
                var index = (this.state.index + 1) % texts.length;

                this.setState({
                    index,
                    text: texts[index]
                });
            },
            5000
        );
    }

    render() {
        return (
            <WrappyText className='wrappy'>{this.state.text}</WrappyText>
        );
    }
}
