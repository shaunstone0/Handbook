import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// Bootstrap
import { Alert } from 'react-bootstrap';

const AlertContainer = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div id='alert-container' key={alert.id}>
        <Alert className={`alert alert-${alert.alertType}`}>{alert.msg}</Alert>
      </div>
    ))
  );
};
AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(AlertContainer);
