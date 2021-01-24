const tokens = {
	admin: {
		token: 'admin-token'
	},
	member: {
		token: 'member-token'
	},
	visitor: {
		token: 'visitor-token'
	}
}

const users = {
	'admin-token': {
		roles: ['admin'],
		introduction: 'I am a super administrator',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		nickName: 'Super Admin'
	},
	'member-token': {
		roles: ['member'],
		introduction: 'I am a member',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		nickName: 'Member'
	},
	'visitor-token': {
		roles: ['visitor'],
		introduction: 'I am a visitor',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		nickName: 'Visitor'
	}
}

module.exports = [
	//user login
	{
		url: '/react-admin/user/login',
		type: 'post',
		response: config => {
			const { username } = config.body;
			const token = tokens[username];

			if(!token) {
				return {
					code: 1,
					msg: '用户名或密码错误'
				}
			}

			return {
				code: 0,
				msg: 'success',
				data: token
			}
		}
	},
	
	//getUserInfo
	{
		url: '/react-admin/user/info',
		type: 'get',
		response: config => {
			const { token } = config.query;
			if(['admin-token', 'member-token', 'visitor-token'].includes(token)) {
				return {
					code: 0,
					msg: 'success',
					data: users[token]
				}
			} else {
				return {
					code: 401,
					msg: 'unAuth'
				}
			}
			
		}
	}
]