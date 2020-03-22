import React from 'react';
import { shallow } from 'enzyme';
import { PostListComponent } from './PostList';

const mockProps = [
  { id: 1, title: 'Test title', content: 'test content' },
];

describe('Component PostList', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostListComponent posts={mockProps}  />);
    expect(component).toBeTruthy();
  });
});
