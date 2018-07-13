const Product = require('../models/product');

exports.list = (req, res, next) => {
	Product.find().exec().then(result=>{
		console.log(result);
		res.status(200).json(result);
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
}

exports.create = (req, res, next) => {
	const product = new Product({
		title: req.body.title,
		price: req.body.price
	});
	
	product.save()
	.then(result => {
		console.log(result);
	})
	.catch(err => console.log(err));

	res.status(200).json({
		message: 'success',
		createProduct: product
	});
}

exports.show = (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id).exec().then(result=>{
		if(result){
			console.log(result);
			res.status(200).json(result);
		}else{
			res.status(404).json({message:'Product not found'})
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
}

exports.update = (req, res, next) => {
	const id = req.params.productId;
	
	Product.update({_id: id}, {$set: {title: req.body.title, price: req.body.price}})
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
}

exports.delete = (req, res, next) => {
	const id = req.params.productId;
	Product.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})
}
