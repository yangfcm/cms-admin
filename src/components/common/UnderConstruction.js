import React from 'react';
import imgUnderConstruction from '../../assets/under-construction.jpg';

class UnderConstruction extends React.Component {
	render() { 
		return (
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center',
				alignItems: 'center'
			}}> 
				<img style={{
					maxWidth: 50+'%',
					height: 'auto'
				}}
					src={imgUnderConstruction} 
					alt="webpage under construction" />	
			</div>
		) ;
	}
}

export default UnderConstruction;