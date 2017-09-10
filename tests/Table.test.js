import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Table from '../src/components/Table';

var DUMMY_URL = 'http://dankokozar.com/',
    URL1_1 = DUMMY_URL + 'foo1',
    URL1_2 = DUMMY_URL + 'foo2',
    URL2_1 = DUMMY_URL + 'bar1',
    URL2_2 = DUMMY_URL + 'bar2',
    TABLE_DATA = [{
        slug: 'foo',
        images: {
            downsized_still: {
                width: 100,
                height: 80,
                url: URL1_1
            },
            downsized_large: {
                width: 200,
                height: 150,
                url: URL1_2
            }
        }
    }, {
        slug: 'bar',
        images: {
            downsized_still: {
                width: 120,
                height: 100,
                url: URL2_1
            },
            downsized_large: {
                width: 220,
                height: 180,
                url: URL2_2
            }
        }
    }];

describe('Table', () => {
    let component;

    function setupComponent(config) {
        component = ReactTestUtils.renderIntoDocument(<Table {...config} />);
    }

    it('renders without crashing', () => {
        expect(setupComponent).not.toThrow();
    });

    describe('spinner', () => {

        it('rendered when loading', () => {
            setupComponent({
                loading: true
            });

            const spinner = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'search-results-spinner');
            expect(spinner).not.toBe(null);
        });

        it('not rendered when not loading', () => {
            setupComponent({
                loading: false
            });

            const spinners = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'search-results-spinner');
            expect(spinners.length).toBe(0);
        });
    });

    it('renders loaded data', () => {
        setupComponent({
            data: TABLE_DATA
        });

        const rows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'search-results-list-row');
        expect(rows.length).toBe(2);

        const images = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'img'),
            image1 = images[0],
            image2 = images[1];
        expect(images.length).toBe(2);

        expect(image1.src).toBe(URL1_1);
        expect(image1.width).toBe(100);
        expect(image1.height).toBe(80);
        expect(image1.alt).toBe('foo');
        expect(image1.title).toBe('foo');

        expect(image2.src).toBe(URL2_1);
        expect(image2.width).toBe(96); // downscaled from 120
        expect(image2.height).toBe(80); // downscaled from 100
        expect(image2.alt).toBe('bar');
        expect(image2.title).toBe('bar');
    });

    it('renders selected row', () => {
        setupComponent({
            data: TABLE_DATA,
            selectedRow: 0
        });

        const rows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'search-results-list-row-selected');
        expect(rows.length).toBe(1);
    });

    it('triggers rowClickHandler on row click', () => {
        const spy = jest.fn();

        setupComponent({
            data: TABLE_DATA,
            rowClickHandler: spy
        });

        const rows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'search-results-list-row');
        expect(rows.length).toBe(2);

        ReactTestUtils.Simulate.click(rows[0]);
        expect(spy).toHaveBeenCalledWith({
            thumbnail: {
                width: 100,
                height: 80,
                url: URL1_1
            },
            preview: {
                width: 200,
                height: 150,
                url: URL1_2
            },
            slug: 'foo'
        }, 0, expect.anything());
    });
});
