import React from 'react';

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				Dashboard page {process.env.REACT_APP_API_URL}
			</div>
		) ;
	}
}

export default Dashboard;