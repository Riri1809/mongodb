import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * POST /
 */
router.post('/', async(req, res) => {
    const collection = await db.collection('grades');
    const newDocument = req.body;
    console.log(newDocument);

    if (newDocument.student_id) {
        newDocument.learner_id = newDocument.student_id;
        delete newDocument.student_id;
    }

    const result = await collection.insertOne(newDocument);
    res.status(204).send(result);
});

/**
 * GET /:id
 */
// Get a single grade entry
router.get("/:id", async(req, res) =>{
    const collection = await db.collection("grades");
    const query = { _id: new ObjectId(req.params.id)};
    const result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

/**
 * GET/student/:id
 */

router.get("/student/:id", async(req, res) => {
    const collection  = await db.collection("grades");
    const query = {student_id: Number(req.params.id)};
    const result = await collection.find(query).toArray();

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});
/**
 * GET/student/:id
 */
router.get("/student/:id", async(req,res) =>{
    res.redirect(`/grades/learner/${req.params.id}`);
})

/**
 * GET /learner/:id
 */
router.get("/learner/id/:id", async(req, res)=> {
    const collection  = await db.collection("grades");
    const query = {learner_id: Number(req.params.id)};
    const result = await collection.find(query).toArray();

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


/**
 * GET/class/:id
 */
router.get("class/id", async(req, res) =>{
    const collection  = await db.collection("grades");
    const query = {student_id: Number(req.params.id)};
    const result = await collection.find(query).toArray();

    if(result.length < 1) res.send(404).send("Not found");
    else res.send(result).status(200);
});

/**
 * Create a single grade entry
 * 
 */

export default router;
