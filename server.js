const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();



app.set('view engine', 'ejs');
app.use(express.static("public"));
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//  mongoose.connect('mongodb+srv://Nitin:nitin@cluster0-x2gkl.mongodb.net/SimpleApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect('mongodb://localhost:27017/SimpleApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


// mongoose.connect('mongodb://localhost:27017/Dosdollar', {useNewUrlParser: true});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
const user_schema = new Schema({
    name:{type:String},  
    email:{type:String,required:true,unique:true},
    phone: { type: Number, required: true, unique: true }
  });
  
  const User = mongoose.model("User", user_schema);

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/api/users',(req,res)=>{
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.phone);
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })
    user.save().then(result=>{
        res.redirect('/get_operations')
     })
     .catch(err=>{
       res.redirect('/')
     });
});


app.get('/get_operations',(req,res)=>{
 res.render('operations');
});



app.get('/api/users',(req,res)=>{
    User.find({},(err,found)=>{
        if(err) throw err;
        else{
            res.render('all_users',{
                users:found
            });
        } 
    });
});


app.put("/api/users/1",(req,res)=>{
    User.find({},(err,found)=>{
        User.findByIdAndUpdate({_id:found[0]._id},{$set:{name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        }})
        .then(result => {
            res.send(result);
          })
          .catch(err => {
            res.redirect('/get_operations')
          });
        });
});


app.delete("/api/users/1",(req,res)=>{
    User.find({},(err,found)=>{
        User.deleteOne({_id:found[0]._id})
        .then(result => {
            res.send('Deleted Successfully!');
          })
          .catch(err => {
            res.redirect('/get_operations')
          });
        });
});


app.get('/api/users/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,found)=>{
        if(err) throw err;
        else{
          console.log(found);
        }      
      });
});















































let port = process.env.PORT || 3000;
app.listen(port,  ()=> {
    console.log("Running simpleApp on port " + port);
});

