const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require('../config');
const jwt = require("jsonwebtoken");
const User = require('../Models/user');

const login = async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				fullname: user.fullName,
				role:user.role
			},
			JWT_SECRET
		)

		return res.cookie("access_token", token, {
			httpOnly: true,
			secure: false,
		}).status(200).json({ status: 'ok', userGroup: user.group });
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
}

const logout = (req, res) => {
	return res
	  .clearCookie("access_token")
	  .status(200)
	  .redirect('/login');
}

const register = async (req, res) => {
	const { username, plainPassword,fullName,role,group } = req.body;

	const password = await bcrypt.hash(plainPassword, 10);

	try {
		const response = await User.create({
			username,
			password,
			fullName,
			role,
			group
		})
		console.log('User created successfully: ', response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' });
		}
		throw error
	}

	res.status(200).json({ status: 'ok' })
};

const allUsers = async (req, res) => {
	const users = await User.find({ username: { $ne: req.user.username } }).select('-_id -password -__v').lean();
	console.log(users);
	res.status(200).json({ status: 'ok',data:users });

}

module.exports = {
	login,
	logout,
	register,
	allUsers
};
