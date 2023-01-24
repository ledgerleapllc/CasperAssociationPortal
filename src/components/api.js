
const base = import.meta.env.VITE_API_URL;

const gettype = (obj) => {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function fetchWithTimeout(
	url, 
	data, 
	timeout = 7000
) {
	return new Promise((resolve, reject) => {
		let timer = setTimeout(
			() => reject(new Error('Request timed out')),
			timeout
		);

		fetch(url, data).then(
			response => resolve(response),
			err => reject(err)
		).finally(() => clearTimeout(timer));
	})
}

function handleReturn(json) {
	let return_obj = {
		status:  500,
		message: "",
		detail:  {}
	};

	if (json) {
		if (gettype(json.status) == 'number') {
			return_obj.status = json.status;
		} else {
			return_obj.status = 404;
		}

		if (
			gettype(json.detail) == 'object' ||
			gettype(json.detail) == 'array'
		) {
			return_obj.detail = json.detail;
		} else if (gettype(json.detail) == 'string') {
			return_obj.message = json.detail;
		} else {
			return_obj.detail = [];
		}

		if (return_obj.detail.hasOwnProperty("message")) {
			return_obj.message = return_obj.detail.message;
		}
	}

	return return_obj;
}

export async function external_api(
	method  = 'GET',
	url,
	data    = {},
	headers = {}
) {
	let get_body = "";
	method       = method.toUpperCase();

	if (
		method == 'GET' ||
		method == 'HEAD'
	) {
		get_body = "";

		if (Object.keys(data).length > 0) {
			get_body = "?";
		}

		Object.keys(data).forEach(function(key, index) {
			get_body += `${key}=${encodeURIComponent(data[key])}`;

			if (index + 1 != Object.keys(data).length) {
				get_body += "&";
			}
		});

		data = null;
	}

	try {
		const result = await fetchWithTimeout(
			`${url}${get_body}`,
			{
				method:  method,
				headers: headers,
				body:    data && JSON.stringify(data)
			}
		);

		const sig  = await result.headers.get('signature');
		const json = await result.json();

		return {
			signature: sig,
			body:      json
		};

	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function api(
	method, 
	resource, 
	data         = {}, 
	bearer_token = '',
	auth_token   = ''
) {
	method = method.toUpperCase();

	let token_header = `Bearer ${bearer_token}`;
	let get_body     = "";

	if (auth_token) {
		token_header = `Token ${auth_token}`;
	}

	if (
		method == 'GET' ||
		method == 'HEAD'
	) {
		get_body = "";

		if (Object.keys(data).length > 0) {
			get_body = "?";
		}

		Object.keys(data).forEach(function(key, index) {
			get_body += `${key}=${encodeURIComponent(data[key])}`;

			if (index + 1 != Object.keys(data).length) {
				get_body += "&";
			}
		});

		data = null;
	}

	try {
		const result = await fetchWithTimeout(
			`${base}/${resource}${get_body}`,
			{
				method:  method,
				headers: {
					'Content-Type':  'application/json',
					'Authorization': token_header
				},
				body: data && JSON.stringify(data)
			}
		);

		const json = await result.json();

		return handleReturn(json);

	} catch (error) {
		console.log(error);

		let return_obj = {
			status:  500,
			message: "",
			detail:  {}
		};

		return return_obj;
	}
}

export async function upload(
	resource, 
	data, 
	bearer_token = ''
) {
	const formData = new FormData();

	for (var x = 0; x < data.length; x++) {
		formData.append("files[]", data[x]);
	}

	try {
		const result = await fetchWithTimeout(
			`${base}/${resource}`,
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${bearer_token}`
				},
				body: formData
			}
		);

		const json = await result.json();

		return handleReturn(json);

	} catch (error) {
		console.log(error);

		let return_obj = {
			status:  500,
			message: "",
			detail:  {}
		};

		return return_obj;
	}
}