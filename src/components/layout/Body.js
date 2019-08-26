import React from 'react';

const Body = (props) => {
	return (
		<div style={{ paddingTop: 15+'px', paddingLeft: 120+'px'}}>
			{props.children}
		</div>
	)
};

export default Body;