const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const { findById } = require("../models/User");

//image Upload
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const result = new User(user);
    await result.save();
    res.redirect("/");
   
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
//   const user2 = JSON.parse(users);
 
  if (users) {
    res.render("index", {
      title: "Home Page",
      users:users,
    });
   
  } else {
    console.log("No User found");
  }
});

router.get("/add", (req, res) => {
  res.render("addUser", {
    title: "Add User",
  });
});
router.get('/edit/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(user)
        {
            res.render('edit_user',{
                title:"EDIT USER PAGE",
                user:user
            })
        }
        else{
            res.render({
                title:"User Edit Page"
            })
        }

    }catch(e)
    {
        res.status(404).send(e)
    }
})

router.get('/del/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        const users=await User.find()

        if (users) {
    res.render("index", {
      title: "Home Page",
      users:users,
    });

    }
}
    catch(e)
    {
        res.status(404).send(e)
    }
})


router.post("/update/:id",async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById(id)
    console.log("---------------------------------------")
    console.log(user)
    try{
        await User.findByIdAndUpdate(id,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        })

        res.redirect("/")

    //     if (users) {
    // res.render("index", {
    //   title: "Home Page",
    //   users:users,
    // });

    // }

    }
    catch(e){
        res.status(400).send(e)
    }
})
module.exports = router;
