import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Modal } from 'react-bootstrap';

const animationStyles = () => {
  const SkStretchdelay = css.keyframes({
    '0%': { transform: 'scaleY(0.4)' },
    '20%': { transform: 'scaleY(1.0)' },
    '40%': { transform: 'scaleY(0.4)' },
    '100%': { transform: 'scaleY(0.4)' }
  });
  return { animation: `${SkStretchdelay} 1.2s infinite ease-in-out` };
};

const SpinnerRect = glamorous.div({
  width: 'auto',
  height: '50px',
  textAlign: 'center',
  fontSize: '10px',
  '& > div': {
    backgroundColor: '#333',
    height: '100%',
    width: '7px',
    margin: '0 2px',
    display: 'inline-block',
    ...animationStyles(),
  }
});

const animationDelay = time => ({
  animationDelay: `${time}s !important`
});

const Rect2 = glamorous.div({
  ...animationDelay(-1.1)
});

const Rect3 = glamorous.div({
  ...animationDelay(-1.0)
});

const Rect4 = glamorous.div({
  ...animationDelay(-0.9)
});

const Rect5 = glamorous.div({
  ...animationDelay(-0.8)
});

export const Loader = ({ show, type }) => (
  <Modal
    show={show}
    backdrop="static"
    bsSize="small"
  >
    <Modal.Header>
      <Modal.Title>
        Wait a sec...
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {
        type === 'rect' &&
        (
          <SpinnerRect>
            <div />
            <Rect2 />
            <Rect3 />
            <Rect4 />
            <Rect5 />
          </SpinnerRect>
        )
      }
    </Modal.Body>
  </Modal>
);

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

export default Loader;
