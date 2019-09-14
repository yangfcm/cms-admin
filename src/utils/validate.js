export const validateLoginInput = (values) => {
	const errors = {};
	const { email, password } = values;

	if(!email || email.trim().length < 1) {
		errors.email = 'Email cannot be blank';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email is invalid';
	}
	
	if(!password || password.trim().length < 1) {
		errors.password = 'Password cannot be blank';
	}

	return errors;
}

export const validatePostInput = (values) => {
	const errors = {};
	const { title, category, content } = values;
	if(!title || title.trim().length < 1) {
		errors.title = 'Title cannot be blank';
	}
	if(!category) {
		errors.category = 'Category cannot be blank';
	}
	if(!content || content.trim().length < 15) {
		errors.content = 'Content must be at least 15 characters';
	}
	return errors;
}