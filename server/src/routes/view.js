const express = require('express');
const View = require('../app/model/View');
const router = express.Router();

//add view
router.post('/add',async(req,res)=>{
    const {CountView,product} = req.body;
    const view  = new View({CountView,product});
    if(view){
        const newView = await view.save();
        res.status(201).json(newView);
    }else{
        res.status(400).json("Invalid view data")
    }
}

)
// Increase View
router.post('/increaseView/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await View.findOne({product : id})
    if(product){
        const Views = await View.findOneAndUpdate({product :id},{CountView: product.CountView+1});
       res.status(200).json(Views);

    }
    else{
        const product  = new View({CountView : 1,product : id});
      const newView =  await product.save();
        res.status(201).json(newView);
    }

}

)


module.exports = router;