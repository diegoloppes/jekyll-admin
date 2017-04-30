import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import { DocumentNew } from '../DocumentNew';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';

import { doc } from './fixtures';

const defaultProps = {
  errors: [],
  fieldChanged: false,
  updated: false,
  router: {},
  route: {},
  params: { collection_name: doc.collection }
};

const setup = (props = defaultProps) => {
  const actions = {
    createDocument: jest.fn(),
    updateTitle: jest.fn(),
    updateBody: jest.fn(),
    updatePath: jest.fn(),
    clearErrors: jest.fn()
  };

  const component = shallow(<DocumentNew {...actions} {...props} />);

  return {
    component,
    actions,
    saveButton: component.find(Button),
    errors: component.find(Errors),
    props
  };
};

describe('Containers::DocumentNew', () => {
  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages', () => {
    const { errors } = setup(Object.assign({}, defaultProps, {
      errors: ['The title field is required!']
    }));
    expect(errors.node).toBeTruthy();
  });

  it('should not call createDocument if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.createDocument).not.toHaveBeenCalled();
  });

  it('should call createDocument if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      fieldChanged: true
    }));
    saveButton.simulate('click');
    expect(actions.createDocument).toHaveBeenCalled();
  });
});
