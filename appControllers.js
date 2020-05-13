const User = require('./models/user');



exports.post_user=(req,res)=>{
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })
    user.save().then(result=>{
        res.send({success:true,msg:'user saved!'})
     })
     .catch(err=>{
       console.log(err);
       res.send({success:false,msg:'error!'})
     });
};



exports.get_user=(req,res)=>{
    User.find({},(err,found)=>{
        if(err) throw err;
        else{
            console.log(found); 
        } 
    });

};


exports.get_userById=(req,res)=>{
    User.findOne({_id:req.params.id},(err,found)=>{
      if(err) throw err;
      else{
        console.log(found);
      }      
    });
};


exports.update_user=(req,res)=>{
    User.find({},(err,found)=>{
    User.findByIdAndUpdate({_id:found[0]._id},{$set:{name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    }})
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
    });
};


exports.delete_user=(req,res)=>{
    User.find({},(err,found)=>{
    User.deleteOne({_id:found[0]._id})
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
    });
};

