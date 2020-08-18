import React from 'react';

// User Logout
import { logoutUser } from '../../actions/';

// Redux
import { connect } from 'react-redux';

// Bootstrap
import { Navbar, Nav } from 'react-bootstrap';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const handBook = <FontAwesomeIcon icon='book' className='icon mr-2' />;

const NavbarTop = ({ logoutUser, currentUser }) => {
  return (
    <>
      <Navbar
        bg='dark'
        variant='dark'
        className='d-flex justify-content-between'>
        <div>
          <Navbar.Brand href='#home'>{handBook} SIGA Handbook</Navbar.Brand>
        </div>
        <div>
          <Nav className='mr-auto'>
            {currentUser !== null && (
              <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
            )}
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { logoutUser })(NavbarTop);
