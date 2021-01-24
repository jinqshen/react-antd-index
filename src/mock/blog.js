const data = require('./md/ReactLearn.md').default;

module.exports = [
	//article
	{
		url: '/react-admin/blog/article/',
		type: 'get',
		response: config => {

            console.log(config)

			return {
				code: 0,
				msg: 'success',
				data: data
			}
		}
	}
]