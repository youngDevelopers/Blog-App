import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch(error) {
        console.log(error)
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" })
    }
    return res.status(200).json({blogs})
};


export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body

    let existingUser;
    try {
        existingUser =await User.findById(user);
    } catch (error) {
        console.log(error)
    }

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable To Find User By This Id" });
    }

    const blog = await new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const  session = await mongoose.startSession();//so that we add added blog to the user
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push();
        await existingUser.save({session});
        await session.commitTransaction();
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog })
};


export const updateBlog = async ( req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog
    try{
        blog =  await Blog.findByIdAndUpdate(blogId, { title, description })
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update The Blog" })
    }
    return res.status(200).json({ blog })
}

export const getById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
    };
    return res.status(200).json({ blog });
}

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(blogId);
    } catch (error) {
        return console.log(error);
    };
    if (!blog){
        return res.status(400).json({ message: "Unabale to delete Blog" });
    };
    return res.status(200).json({ message: "Successfully Deleted" });
};