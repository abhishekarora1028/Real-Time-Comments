import React from 'react';
import ReactDOM from 'react-dom';
import { render, getByText } from 'react-testing-library'
import App from './App';
import { Api } from './api';

describe('App', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('when comments do not exist', () => {
    it('does not display the delete comments button', () => {
      const wrapper = render(<App />);
      expect(wrapper.container.querySelector('button')).toBeNull();
    });
  });

  describe('when comments do exist', () => {
    it('displays the delete comments button for one comment', async () => {
      const apiSpy = jest.spyOn(Api, 'get').mockImplementation(() => {
        return Promise.resolve([1]);
      });
      const wrapper = render(<App />);
      await apiSpy();
      const deleteCommentsButton = getByText(wrapper.container, 'Delete 1 Comment');
      expect(deleteCommentsButton).toBeDefined();
    });

    it('displays the delete comments button for more than one comment', async () => {
      const apiSpy = jest.spyOn(Api, 'get').mockImplementation(() => {
        return Promise.resolve([1, 2]);
      });
      const wrapper = render(<App />);
      await apiSpy();
      const deleteCommentsButton = getByText(wrapper.container, 'Delete 2 Comments');
      expect(deleteCommentsButton).toBeDefined();
    });
  });
});
