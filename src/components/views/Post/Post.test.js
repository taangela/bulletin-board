import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

const mockProps = {
  match: { params: { id: '1' } },
  posts: [
    { id: '1', title: 'Test title', content: 'Test content' },
  ],
};

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});