import React, { Component } from 'react';

export default class Logo extends Component {

    render() {
        return (
            <div className='flex-parent-centered transparent-for-clicks'>
                <div className='logo'>
                    <div className='logo-title'>Giphy browser</div>
                    <div className='logo-subtitle'>[ click search button above ]</div>
                </div>
            </div>
        );
    }
}