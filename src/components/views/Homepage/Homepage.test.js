import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  posts: [
    { id: '1', title: 'test', text: 'test' },
    { id: '2', title :'test2', text: 'test 2' },
  ],
  user: {
    id: '1',
    logged: false,
  },
  fetchPublished: () => console.log('fetch'),
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
