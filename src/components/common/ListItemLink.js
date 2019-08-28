import React from 'react'; 
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';

const ListItemLink = (props) => {
	return <ListItem button component={NavLink} {...props} />
}

export default ListItemLink;