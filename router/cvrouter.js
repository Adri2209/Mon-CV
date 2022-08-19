import { Router } from "express"
import projectModel from "../models/projectsmodel.js"
const cvRouter = Router()
import nodemailer from "nodemailer"
import multer from 'multer'

const storage = multer.diskStorage({
    destination:function(req,file,callback){
      callback(null,'./assets/uploads/images' )
    },
    filename:function (req,file,callback) {
      callback(null,Date.now() + file.originalname)
    },
  })

  const upload = multer({
    storage:storage,
    limits:{
      fieldSize:102410243,
    },
  })

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adrianatint2209@gmail.com',
        pass: 'urdgwbmlrbufbusf'
    }
})



cvRouter.get("/", async (req, res) => {
    let projets = await projectModel.find()
    res.render("./home.twig", {
        projects: projets
    })
})

cvRouter.get("/addProject", async (req, res) => {
    res.render("./addprojectform.twig")
})

// ROUTE SUBMIT
cvRouter.post("/addProject",upload.single('image'), async (req, res) => {
    try {
        req.body.image = req.file.filename
        let projet = new projectModel(req.body)
        projet.save()
        res.redirect("/")
    } catch (error) {
        res.send(error)
    }
})


cvRouter.post("/contact", async (req, res) => {
    let mailOptions = {
        from: req.body.mail,
        to:'adrianasaroux@yahoo.com' ,
        subject: req.body.name + " veut vous contacter",
        text: req.body.message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    res.redirect('/')
})



export default cvRouter