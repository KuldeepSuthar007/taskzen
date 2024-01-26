const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');
const verifyAuth = require('../middleware/verifyAuth')

//post
router.post('/task-post', verifyAuth, async (req, res) => {

    try {
        let { uniqueId, title, description, status } = req.body;
        if (!uniqueId || !title || !description || !status) {
            return res.status(404).json({
                success: false,
                errormessage: 'All fields are required'
            })
        }
        const newpost = {
            uniqueId,
            title,
            description,
            status
        }
        await Task.create(newpost);
        res.status(200).json({
            success: true,
            message: " Task post created successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error'
        })
    }
})

//patch

router.patch('/edit-post/:taskId', async (req, res) => {

    try {
        const taskId = req.params.taskId;
        if (!taskId) {
            res.status(400).json({
                success: false,
                errormessage: ' Bad request'
            })
        }
        const checktaskid = await Task.find({ _id: taskId })
        if (!checktaskid) {
            res.status(400).json({
                success: false,
                errormessage: 'No Task found for this taskid'
            })
        }

        let { title,
            description,
            status } = req.body;


        await Task.findByIdAndUpdate({ _id: taskId }, {
            title,
            description,
            status
        })
        res.status(200).json({
            success: true,
            message: ' Task edited successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error job edit'
        })
    }

})

//get

router.get('/gettask/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const search = req.query.search || "";

        const tasks = await Task.find({
            uniqueId: _id,
            title: { $regex: search, $options: "i" },
        }).sort({ status: -1 });
        return res.json({
            tasks
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error'
        })
    }

})

//get

router.get('/detail-task/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Task.findById({ _id })
        res.json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error'
        })
    }
})

//delete 

router.delete('/:taskId', async (req, res) => {
    try {

        const taskId = req.params.taskId;
        const result = await Task.deleteOne({ _id: taskId });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;