import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Preview from '../src/components/Preview';

var DUMMY_URL = 'http://dankokozar.com/',
    URL1_1 = DUMMY_URL + 'foo1',
    URL1_2 = DUMMY_URL + 'foo2',
    DATA = {
        thumbnail: {
            url: URL1_1,
            width: 100,
            height: 80,
            size: 145943,
            slug: 'foo'
        },
        preview: {
            url: URL1_2,
            width: 500,
            height: 281,
            size: 145943,
            slug: 'foo'
        }
    };

describe('Preview', () => {
    let component;

    function setupComponent(config) {
        component = ReactTestUtils.renderIntoDocument(<Preview {...config} />);
    }

    it('renders without crashing if data provided', () => {
        expect(() => {
            setupComponent({
                data: DATA
            });
        }).not.toThrow();
    });

    it('renders loaded data', () => {
        setupComponent({
            data: DATA
        });

        const image = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'img');
        expect(image).not.toBe(null);
        expect(image.src).toBe(URL1_2);

        const details = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'preview-details');
        expect(details).not.toBe(null);

        const detailsWidth = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'preview-details-width'),
            detailsHeight = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'preview-details-height'),
            detailsSize = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'preview-details-size'),
            clipboardButton = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'preview-details-clipboard-button'),
            openInNewTabLink = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'preview-details-open-in-new-tab-link');

        expect(detailsWidth.textContent).toBe('Width: 500');
        expect(detailsHeight.textContent).toBe('Height: 281');
        expect(detailsSize.textContent).toBe('Size: 145943');
        expect(clipboardButton.attributes['data-clipboard-text'].value).toBe(URL1_2);
        expect(openInNewTabLink.href).toBe(URL1_2);
    });
});
