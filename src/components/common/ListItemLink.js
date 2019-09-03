import React from 'react'; 
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';

const ListItemLink = (props) => {
	return <ListItem 
						button 
						component={React.forwardRef((props, ref) => (
							<NavLink {...props} ref={ref} />
						))} 
						{...props} />
}

export default ListItemLink;