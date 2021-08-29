const XLSX = require('xlsx');
const path = require('path')

const upload =  function (req, res) {
	let layerExcelFile;
	let uploadPath;

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	layerExcelFile = req.files.layerExcelFile;

	const extensionName = path.extname(layerExcelFile.name); // fetch the file extension

	if (extensionName !== '.xlsx') {
		return res.send({status: 'error',message:"Please upload Xlsx file"});
	}

	uploadPath = path.resolve("./") + '/static/layerFiles/accidents.xlsx';

	// Use the mv() method to place the file somewhere on your server
	layerExcelFile.mv(uploadPath, function (err) {
		if (err)
			return res.status(500).send(err);
		convertFile(uploadPath);
		res.send({status: 'ok'});
	});
}

const getCSVFile = (req, res) => {
	res.download(path.resolve("./") + '/static/layerFiles/csvlayer.csv', 'csvlayer.csv', (err) => {
		if (err) {
		  res.status(500).send({
			message: "Could not download the file. " + err,
		  });
		}
	  });
}

const convertFile = (uploadPath) => {
	const wb = XLSX.readFile(uploadPath);
	XLSX.writeFile(wb, path.resolve("./") + '/static/layerFiles/csvlayer.csv', { bookType: "csv" });
}


module.exports = {
	upload,
	getCSVFile
};
