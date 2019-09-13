import React from 'react'; 
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const ButtonLink = (props) => {
	return <Button 
						button 
						component={React.forwardRef((props, ref) => (
							<Link {...props} ref={ref} />
						))} 
						{...props} />
}

export default ButtonLink;