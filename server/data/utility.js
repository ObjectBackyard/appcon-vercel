



import jwt from 'jsonwebtoken';
import User from './user_model.js';



//  NOTE: all functions needed by the modules (but does not completely relate to the main function of the module) should be put here




function createSecretToken(id){
    return jwt.sign({ id }, 'LOGGED_IN_AS_USER', {expiresIn: '1h'});
};

async function verifyToken(req,res){
    const token = req.body.token
    // console.log(req.cookie)
    // console.log(req.headers.cookie)
    if (!req.body.token) {
        return res.json({ status: false, message: "No token provided" });
    }
      // Extract the token from the Authorization header
    // const token = req.headers.cookie.split('=')[1];
    console.log(token)
//   Should be changed to a key
    jwt.verify(token, 'LOGGED_IN_AS_USER', async (err, data) => {
        if (err) {
        return res.json({ status: false });
        } else {
        const user = await User.findById(data.id);
        if (user) return res.json({ status: true, id: user.id});
        else return res.json({ status: false });
        }
    });

}

export{
    createSecretToken,
    verifyToken
}