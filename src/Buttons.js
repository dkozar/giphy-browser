import _ from 'lodash';
import React, { Component } from 'react';

class Buttons extends Component {
    render() {
        const self = this,
            buttons = this.props.data.map((buttonData, i) => {
                return (
                    <button key={'button-' + i}
                         className={'button'}
                         onClick={_.partial(self.props.onClick, buttonData)}>
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
    onClick: React.PropTypes.func
};

Buttons.defaultProps = {
    onClick: _.noop
};

export default Buttons;
