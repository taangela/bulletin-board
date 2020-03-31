import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './Header';

const mockProps = {
  user: {
    id: '5',
    logged: true,
  },
};

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<HeaderComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
