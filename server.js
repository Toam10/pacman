const express = require('express');
const router = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Response } = require('./responses');
const { User } = require('./schemas/users');
const PORT = 5050;
const URI = 'mongodb+srv://maornetzer9:Maor013254777@maor.quyl8kx.mongodb.net/PACMAN';


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(express.static(__dirname));

mongoose.connect(URI).then(() => {
    console.log('database is OPEN');
})


router.post('/public/sign', async (req, res) => {
    try
    {
        const values = {};
        const response = Response.success;

        const { username, password } = req.body;

        const isUserExists = await User.find({ username, password });

        if(isUserExists.length > 0)
        {
            values.user = isUserExists

            res.status(200).send({ ...response, ...values });
        }
        else
        {
            const new_user = new User({username, password, score: 0});
            const user = await new_user.save();

            values.user = user;

            res.status(200).send({ ...response, ...values });
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send(Response.server_error);
    }
})


router.get('/pacman', async (req, res) => {

    res.sendFile(__dirname + '/public/pacman.html');
})


router.get('/', async (req, res) => {

    res.sendFile(__dirname + '/public/sign.html');
})
 
router.listen(PORT, () => {
    console.log(`server is open on PORT: ${PORT}`);
})