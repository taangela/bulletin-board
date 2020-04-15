import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './PostAdd';

const mockProps = {
  posts: [
    { id: '1', title: 'test', text: 'test' },
    { id: '2', title: 'test2', text: 'test 2' },
  ],
  user: {
    id: '5',
    logged: true,
  },
};

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
