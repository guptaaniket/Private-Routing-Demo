import React from 'react';
import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h3>Home</h3>
                    <div>
                        <p style={{ marginTop: '10px', marginRight: '5px' }}>(Your role is: <strong>{currentUser.role}</strong>.
                    This page can be accessed by all authenticated users.)</p>
                    </div>
                </div>
                <div style={{ borderTop: 'solid 1px black' }}></div>
                {/* Book Card */}
                <div>
                    <div className='col-md-2' style={{ padding: '1rem', height: '200px', marginTop: '25px', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <h4>Half Girlfriend</h4>
                        <p>This page can be accessed by all authenticated users.</p>
                        <b>500 Rs.</b>
                        <button style={{ float: 'right' }} className="btn btn-dark">Buy</button>
                    </div>

                </div>

            </div>
        );
    }
}

export { HomePage };