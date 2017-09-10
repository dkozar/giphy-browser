import _ from 'lodash';
import React, { Component } from 'react';
import ClipboardButton from 'react-clipboard.js';

class Preview extends Component {

    render() {
        const data = this.props.data,
            slug = data.slug,
            previewImage = _.get(data, 'preview');

        return previewImage && (
            <div className='preview'>
                <img src={previewImage.url}
                     width={previewImage.width}
                     height={previewImage.height}
                     alt={slug}
                     title={slug} />
                <div className='preview-details'>
                    <div>Width: {previewImage.width}</div>
                    <div>Height: {previewImage.height}</div>
                    <div>Size: {previewImage.size}</div>
                    <ClipboardButton
                        data-clipboard-text={previewImage.url}
                        className='button clipboard-button'
                        button-title='Click to copy URL'>
                        Copy URL
                    </ClipboardButton>
                    <a target='_blank'
                       href={previewImage.url}>
                        <button className='button'>Open in new tab</button>
                    </a>
                </div>
            </div>
        )
    }
}

Preview.propTypes = {
    data: React.PropTypes.object
};

export default Preview;
