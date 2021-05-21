const User = require("../models/user");


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};


exports.updateUser =(req,res)=>{
User.updateOne(
  {_id:req.profile._id},
  {$set:req.body},
  {new:true, useFindAndModify:false},
  (err,user)=>{
    if(err){
      return res.status(400).json({error:" Not autherised"})
    }
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    res.json(user);
  }
)

}

exports.userLikes =(req,res)=>{
  User.findOne({_id:req.profile._id})
    .exec((err,user)=>{
      if(err){
        return res.status(400).json({error : " nouser "})
      }
     // console.log("herers")
      const {wishlist} =user
     // console.log(wishlist)
     
      
      
      return  res.json(wishlist)
    })
}

exports.addLikes =(req,res)=>{
//	console.log("push like")
  const {like} = req.body
  User.updateOne(
    { _id:req.profile._id}, 
    { $push: { wishlist: like }}
    ).exec((err,user)=>{
      if(err){
        console.log(err)
        return res.status(400).json({error : "failed"})
      }
        console.log(like)
       res.json({like})
     
    })

  }

  


exports.getAll=(req,res)=>{
  User.find().exec((err,user)=>{
    if(err||!user){
      return res.status(404).json({error:" no user !!! "});
    }

    res.json(user);
    
  })}

