import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export default ({ loginUser }) => {
	const avatarSrc = loginUser.avatar;
	return avatarSrc ? 
		<Avatar src={loginUser.avatarSrc} /> : 
		<Avatar>{loginUser.firstname[0].toUpperCase()}{loginUser.lastname[0].toUpperCase()}</Avatar>;
}
 