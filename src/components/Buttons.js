import _ from 'lodash';
import React, { Component } from 'react';

class Buttons extends Component {
    render() {
        const self = this,
            buttons = this.props.data.map((buttonData, i) => {
                return (
                    <button key={'button-' + i}
                         className={'button'}
                         onClick={_.partial(self.props.onClick, buttonData.query)}>
                        {buttonData.label}
                    </button>
                );
            });

        return (
            <div className="buttons">
                {buttons}
            </div>
        );
    }
}

Buttons.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    onClick: React.PropTypes.func
};

Buttons.defaultProps = {
    data: [],
    onClick: _.noop
};

export default Buttons;
