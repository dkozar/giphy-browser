import _ from 'lodash';
import Pager from 'react-pager';
import React, { Component } from 'react';

import ImageUtil from "./ImageUtil";
import {PAGER_VISIBLE_PAGES} from './settings';

export default class Table extends Component {
    renderPager() {
        return (
            <Pager
                total={this.props.numberOfPages}
                current={this.props.currentPage}
                visiblePages={PAGER_VISIBLE_PAGES}
                titles={{ first: 'First', last: 'Last' }}
                className="pager"
                onPageChanged={this.props.handlePageChanged}
            />
        );
    }

    renderRows() {
        let count = 0;

        return this.props.data.map((image) => {
            const data = ImageUtil.convertImageData(image),
                thumbnailData = ImageUtil.normalizeImageData(data.thumbnail),
                slug = data.slug;

            let className = 'row';

            if (this.props.selectedRow === count) {
                className += ' selected';
            }

            return (
                <div key={slug}
                     className={className}
                     onClick={_.partial(this.props.rowClickHandler, data, count++)}>
                    <img src={thumbnailData.url}
                         width={thumbnailData.width}
                         height={thumbnailData.height}
                         alt={slug}
                         title={slug} />
                </div>
            );
        });
    }

    renderSpinner() {
        return this.props.loading && (
            <div className="search-results-spinner">
                <div className="search-results-spinner-background" />
                <div className="search-results-spinner-front">
                    <div className="search-results-spinner-front-inner">Loading...</div>
                </div>
            </div>
        );
    }
    
    render() {
        const pager = this.renderPager(),
            results = this.renderRows(),
            spinner = this.renderSpinner();

        return (
            <div className="app-left">
                {pager}
                <div className="search-results">
                    <div className="search-results-list">
                        {results}
                    </div>
                    {spinner}
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    loading: React.PropTypes.bool.isRequired,
    numberOfPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    handlePageChanged: React.PropTypes.func.isRequired,
    rowClickHandler: React.PropTypes.func.isRequired,
    selectedRow: React.PropTypes.number.isRequired
};

Table.defaultProps = {
    data: [],
    loading: false,
    numberOfPages: 1,
    currentPage: 0,
    handlePageChanged: _.noop,
    rowClickHandler: _.noop,
    selectedRow: -1
};
