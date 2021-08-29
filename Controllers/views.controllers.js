
const login = (req, res) => {
	res.render('login',{layout:'../views/layouts/loginLayout'});
}

const users = (req,res)=>{
	const fullname = req.user.fullname;
	const role = req.user.role;
	res.render('users',{mode:'users',fullname:fullname,role:role});
}

const map = (req,res)=>{
	const fullname = req.user.fullname;
	const role = req.user.role;
	res.render('map',{mode:'map',fullname:fullname,role:role});
}

const layer = (req,res)=>{
	const fullname = req.user.fullname;
	const role = req.user.role;
	res.render('layer',{mode:'layer',fullname:fullname,role:role});
}

module.exports = {
	login,
	users,
	map,
	layer
};
