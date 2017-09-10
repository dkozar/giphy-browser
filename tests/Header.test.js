import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Header from '../src/components/Header';
import WindowUtil from '../src/util/WindowUtil';

describe('Header', () => {
    let component;

    function setupComponent(config) {
        component = ReactTestUtils.renderIntoDocument(<Header {...config} />);
    }

    it('renders without crashing', () => {
        expect(setupComponent).not.toThrow();
    });

    it('renders default button labels', () => {
        setupComponent();

        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button');
        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toBe('User Interface');
        expect(buttons[1].textContent).toBe('Synthesizer');
        expect(buttons[2].textContent).toBe('Chess');
    });

    it('renders button labels specified via URL', () => {
        WindowUtil.getWindow = () => { // mocking the utility function
            return {
                location: {
                    href: 'http://foo.com?buttons=foo,bar'
                }
            }
        };

        setupComponent();

        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button');
        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent).toBe('Foo');
        expect(buttons[1].textContent).toBe('Bar');
    });

    it('triggers search on button click', () => {
        const spy = jest.fn();

        WindowUtil.getWindow = () => { // mocking the utility function
            return {
                location: {
                    href: 'http://foo.com?buttons=foo,bar,baz'
                }
            }
        };

        setupComponent({
            onSearch: spy
        });

        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button');
        expect(buttons.length).toBe(3);

        ReactTestUtils.Simulate.click(buttons[0]);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith('foo', expect.anything());

        ReactTestUtils.Simulate.click(buttons[1]);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith('bar', expect.anything());

        ReactTestUtils.Simulate.click(buttons[2]);
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenLastCalledWith('baz', expect.anything());
    });
});
