import _ from 'lodash';
import React, { Component } from 'react';

import Header from './components/Header';
import Logo from './components/Logo';
import Preview from './components/Preview';
import search from './util/search';
import Table from "./components/Table";

import './styles/App.css';
import './styles/Button.css';
import './styles/Logo.css';
import './styles/Pager.css';
import './styles/Table.css';
import './styles/Preview.css';
import './styles/Util.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: [], // loaded images data
            loading: false, // true if loading data
            numberOfPages: 1, // default, will be set after the 1st call
            currentPage: 0, // current page
            selectedRow: -1, // selected row in results table (if any)
            query: '', // search query
            previewImageData: null, // image data for right panel
            searched: false // true if searched at least once (removes the logo)
        };

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.rowClickHandler = this.rowClickHandler.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    search(resetPreview) {
        const self = this,
            nextState = {
                loading: true,
                searched: true,
                selectedRow: -1
        };

        if (resetPreview) {
            nextState.previewImageData = null;
        }

        this.setState(nextState, () => {
            search({
                query: this.state.query,
                currentPage: this.state.currentPage,
                callback: self.displaySearchResults
            })
        });
    }

    displaySearchResults(response) {
        const pagination = response.pagination;

        this.setState({
            loading: false,
            numberOfPages: Math.ceil(pagination.total_count / pagination.count),
            images: response.data
        });
    }

    rowClickHandler(data, index) {
        this.setState({
            previewImageData: data,
            selectedRow: index
        });
    }

    buttonClickHandler(query) {
        this.setState({
            currentPage: 0,
            selectedRow: -1,
            query
        }, _.partial(this.search, true));
    }

    handlePageChanged(newPage) {
        this.setState({
            currentPage: newPage,
            selectedRow: -1,
        }, this.search);
    }

    render() {
        const searched = this.state.searched,
            header = (
                <Header onSearch={this.buttonClickHandler} />
            ),
            preview = this.state.previewImageData && (
                <Preview data={this.state.previewImageData} />
            ),
            logo = !searched && (
                <Logo />
            ),
            content = searched && (
                <div className="app-content">
                    <Table data={this.state.images}
                           loading={this.state.loading}
                           numberOfPages={this.state.numberOfPages}
                           currentPage={this.state.currentPage}
                           handlePageChanged={this.handlePageChanged}
                           rowClickHandler={this.rowClickHandler}
                           selectedRow={this.state.selectedRow}
                    />
                    <div className="app-right">
                        {preview}
                    </div>
                </div>
            );

        return (
            <div className="app">
                {header}
                {logo}
                {content}
            </div>
        );
    }
}

export default App;
