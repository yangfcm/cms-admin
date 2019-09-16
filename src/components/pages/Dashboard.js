import React from 'react'; 
import Greeting from '../modules/Greeting';

class Dashboard extends React.Component {
	render() { 
		return (
			<div>  
				<Greeting />
			</div>
		) ;
	}
}

export default Dashboard;