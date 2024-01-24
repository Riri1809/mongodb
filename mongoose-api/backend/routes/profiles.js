import {Router} from 'express';
import Profile from '../models/profiles.js';


const router = new Router();


router.get('/', async(req, res) => {
    const profiles = await Profile.find({}).populate({path: "user_id"});
    res.json(profiles);
});


export default router;