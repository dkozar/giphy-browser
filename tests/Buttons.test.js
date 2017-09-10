import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Buttons from '../src/components/Buttons';

describe('Buttons', () => {
    let component;

    function setupComponent(config) {
        component = ReactTestUtils.renderIntoDocument(<Buttons {...config} />);
    }

    it('renders without crashing', () => {
        expect(setupComponent).not.toThrow();
    });

    it('renders button labels', () => {
        setupComponent({
            data: [{
                label: 'Foo',
                query: 'foo'
            }, {
                label: 'Bar',
                query: 'bar'
            }, {
                label: 'Baz',
                query: 'baz'
            }]
        });

        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button');
        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toBe('Foo');
        expect(buttons[1].textContent).toBe('Bar');
        expect(buttons[2].textContent).toBe('Baz');
    });

    it('triggers callback on button click', () => {
        const spy = jest.fn();

        setupComponent({
            data: [{
                label: 'Foo',
                query: 'foo'
            }, {
                label: 'Bar',
                query: 'bar'
            }, {
                label: 'Baz',
                query: 'baz'
            }],
            onClick: spy
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
