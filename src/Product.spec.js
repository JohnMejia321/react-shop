import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Product from './Foo';

Enzyme.configure({ adapter: new Adapter() });

describe('Product Component', () => {
    test("renders", () => {
        const wrapper = shallow(<Product />);
        expect(wrapper.exists()).toBe(true);
    });
});
