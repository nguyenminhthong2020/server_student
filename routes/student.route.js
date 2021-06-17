const express = require("express");
const moment = require("moment");
const ajvMdw = require('../middlewares/ajv.mdw');
const Student = require("../models/student.model");

const router = express.Router();

/*
GET    / 
    Xem danh sách tất cả student
*/
router.get("/", async (req, res) => {
    try {
        const arrayStudent = await Student.find();
        res.status(200).send(arrayStudent);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

/* 
GET    /:id
    Xem ds sinh viên có id
*/
router.get("/:id", (req, res) => {
    const id = +res.params.id ?? 0;
    try {
        const student = Student.findOne({ student_id: req.params.id });
        return res.status(200).send(student);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

/*
POST  
    Tạo mới 1 sinh vien
    {
        name: ,
        gpa: 
    }
*/
// shift + alt + F
// Ctrl + shift + P
router.post("/", ajvMdw(require('../schemas/student.schemas.json')), async (req, res) => {
    try {
        const { name, gpa } = req.body;
        console.log(name + "\n");
        const newStudent = new Student({
            name,
            gpa,
            created_at: moment().valueOf(),
            modified_at: moment().valueOf()
        });
        
        console.log(newStudent + "\n");
        
        const result = await newStudent.save();
        console.log("đã save");
        return res.status(201).send(result);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

/*
PUT   /:id
    chỉnh sửa gpa 1 sv
    {
        gpa: 
    }
*/
router.put("/:id", ajvMdw(require('../schemas/student_gpa.schemas.json')) ,async (req, res) => {
    try {
        const { gpa } = req.body;
        const id = +req.params.id ?? 0;
        const result = await Student.findOneAndUpdate(
            {
                student_id: id
            },
            {
                gpa,
                modified_at: moment().valueOf()
            }
        );
        return res.status(201).send(result);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

/*
DELETE    /:id
    Xóa 1 sinh viên
*/
router.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id ?? 0;
        const result = await Student.findOneAndDelete(
            {
                student_id: id
            }
        );
        return res.status(201).send(result);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
