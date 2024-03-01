const router = require("express").Router();
// const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model')

router.get("/user", async (req, res, next) => {

    const { _id } = req.payload;

    // console.log('username , from req.payload ==>', req.payload )

    try{
      console.log('message from the try')
      const findUser = await User.findById({ _id });
      console.log('message after the findOne ==> ', findUser)
      if(!findUser){
          return res.json({ message: 'User not found'});
      } else {
        // console.log('message from the else  ==> ')
          const foundUser = { _id: findUser._id, username: findUser.username, campus: findUser.campus, course: findUser.course, image: findUser.image }
          console.log('message after the foundUser  ==> ', foundUser )
          return res.json(foundUser);
      }

    }catch(err) {
      console.log(err)
      return res.json({ message: 'Internal Server Error here' });
    }

});

router.put('/user', async (req, res, next) => {
    const { _id } = req.payload
    const { campus, course, image } = req.body

    try{
      const findUser = await User.findOneAndUpdate({ _id }, { campus, course, image }, { new: true });
      const foundUser = { _id: findUser._id, username: findUser.username, campus: findUser.campus, course: findUser.course, image: findUser.image }
      return res.json(foundUser)
    } catch (err) {
      console.log(err)
    }
})

router.post('/upload', async (req, res, next) => {
  

})

module.exports = router;
