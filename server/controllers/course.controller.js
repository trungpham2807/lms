
const sendResponse = require("../helpers/sendResponse.helper");
const AWS = require("aws-sdk");
const {nanoid} = require("nanoid"); 
const Course = require("../models/Course")
const slugify = require("slugify")
const {readFileSync} = require("fs")
require('dotenv').config()

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
}
const S3 = new AWS.S3(awsConfig)

const courseController = {};
courseController.uploadImage = async (req, res) => {
    try{
        const {image} = req.body;
        if(!image) return res.status(400).send("Only image can be uploaded")
        // prepare image
        // const base64Data = new Buffer.from(image.replace(/^data:image\/w+;base64,/, "")
        // ,"base64" );
        // console.log(base64Data, "base64data");
        // // type
        // const type = image.split(";")[0].split('/')[1];
        // image params
        const params = {
            Bucket: "lms-trung-bucket",
            // generate random name and give image type
            Key: `${nanoid()}.${type}`,
            // Body: base64Data,
            Body: image,
            ACL: "public-read",
            ContentEncoding: "base64",
            // ContentType: `image/${type}`
            
        }
        // upload image to S3 bucket
        S3.upload(params, (err,data) => {
            if(err){
                console.log(err)
                return res.sendStatus(400);
            }
            console.log(data)
            res.send(data);
        })
    }catch(err){
        console.log(err)
    }
}

// remove image from AWS
courseController.removeImage = async (req, res) => {
    try{
        const {image} = req.body;
        const params = {
            Bucket: image.Bucket,
            Key: image.Key,
        }
        S3.deleteObject(params, (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(200).send("Successfully delete image")
        })
    }catch(err){
        console.log(err)
    }
}
// create Course 
courseController.createCourse = async (req, res) => {
    // console.log("req", req)
    let course;
    try{
        const alreadyExist = await Course.findOne({
            slug: slugify(req.body.name.toLowerCase()),
        })
        if(alreadyExist) return res.status(400).send("Course title already is taken")

        course = await Course.create({
            slug: slugify(req.body.name),
            instructor: req.userId,
            ...req.body,
        })
        console.log("gfg", course)
        res.json(course);
        // res.status(200).send("Course create successfully")
    }catch(err){
        return res.status(400).send("Course create failed")
    }
    
}
// get course 
courseController.getCourse = async (req, res) => {
    try{
        // console.log("param", req.params)
        const course = await Course.findOne({slug: req.params.slug})
                // console.log("course", course)
            .populate("instructor", "_id name")
            .exec();
        //     // console.log("course getCourse", course)
            res.json(course);
    }catch(err){
        console.log(err)
    }
}
courseController.editCourse = async (req, res) => {
    try{
        const {slug} = req.params;
        const course = await Course.findOne({slug}).exec()
        // console.log("Course found", course)
        if(req.userId != course.instructor){
            return res.status(400).send("Unauthorized")
        }
        const updated = await Course.findOneAndUpdate({slug}, req.body, {new: true}).exec()
        res.json(updated)
    }catch(err){
        console.log(err, "what sup")
        return res.status(400).send(err.message)
    }
}
// Lesson controller
courseController.uploadVideo = async (req, res) => {
    try{
        const {video} = req.files;
        // console.log(video)
        if(!video) return res.status(400).send("No video")

        // video params bucket
        const params = {
            Bucket: "lms-trung-bucket",
            // generate random name and give video type
            Key: `${nanoid()}.${video.type.split('/')[1]}`, //video/mp4
            Body: readFileSync(video.path),
            // ACL: "public-read",
            // ContentType: video.type,
        }
        // upload video to S3 bucket
        S3.upload(params, (err,data) => {
            if(err){
                console.log(err)
                return res.sendStatus(400);
            }
            console.log(data)
            res.send(data);
        })
    }catch(err){
        console.log(err)
    }
}
courseController.removeVideo = async (req, res) => {
    try {

        const { Bucket, Key } = req.body;
        // console.log("VIDEO REMOVE", req.body);
    
        // video params
        const params = {
          Bucket,
          Key,
        };
    
        // upload to s3
        S3.deleteObject(params, (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          }
          console.log(data);
          res.send({ ok: true });
        });
      } catch (err) {
        console.log(err);
      }
}
// lesson
courseController.addLesson = async (req, res) => {
    try {
        const { slug, instructorId } = req.params;
        const { title, content, video } = req.body;
    
        if (req.userId != instructorId) {
          return res.status(400).send("Unauthorized");
        }
    
        const updated = await Course.findOneAndUpdate(
          { slug },
          {
            $push: { lessons: { title, content, video, slug: slugify(title) } },
          },
          { new: true }
        )
          .populate("instructor", "_id name")
          .exec();
        res.json(updated);
      } catch (err) {
        console.log(err);
        return res.status(400).send("Add lesson failed");
      }
    };
    courseController.publishCourse = async (req, res) => {
        try{
            const {courseId} = req.params;
            // console.log("hihi", courseId);
            const course = await Course.findById(courseId).select('instructor').exec()
            console.log("course", course)
            if(course.instructor._id != req.userId){
                return res.status(400).send("Unauthorized")
            }
            const updated = await Course.findByIdAndUpdate(courseId, {published: true}, {new:true})
            res.json(updated)
        }catch(err) {
            return res.status(400).send("publish course failed")
        }
    }
    courseController.unpublishCourse = async (req, res) => {
        try{
            const {courseId} = req.params;
            const course = await Course.findById(courseId).select('instructor').exec()
            if(course.instructor._id != req.userId){
                return res.status(400).send("Unauthorized")
            }
            const updated = await Course.findByIdAndUpdate(courseId, {published: false}, {new:true})
            res.json(updated)
        }catch(err) {
            return res.status(400).send("unpublish course failed")
        }
    }
    courseController.getAllCourses = async (req, res) => {
        try{
            const allCourse = await Course.find({published: true}).populate('instructor', '_id name').exec();
            // console.log(allCourse, "allCourse")
            res.json(allCourse);
        }catch(err){
            console.log(err)
        }
       

    }
module.exports = courseController;