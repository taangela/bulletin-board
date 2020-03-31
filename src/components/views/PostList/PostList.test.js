import React from 'react';
import { shallow } from 'enzyme';
import { PostListComponent } from './PostList';

const mockProps = {
  posts: [
    { id: '1', title: 'test', content: 'test' },
    { id: '2', title: 'test2', content: 'test 2' },
  ],
  user: {
    id: '5',
    logged: false,
  },
};

describe('Component PostList', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostListComponent {...mockProps}  />);
    expect(component).toBeTruthy();
  });
});

