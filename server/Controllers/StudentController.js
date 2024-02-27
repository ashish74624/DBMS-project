import Student from "../models/Student.js";

export const addStudent = async(req,res)=>{
    const {Student_ID,Student_Name,Department,Semester,Student_Phone}= req.body;
    try {
        const student = await Student.create({
            Student_ID:Student_ID,
            Student_Name:Student_Name,
            Department:Department,
            Semester:Semester,
            Student_Phone:Student_Phone
        });
        await student.save();
        return res.status(200).json({message:"Student Added",student:student});
    } catch (error) {

        if(error.code ===11000 && error.keyPattern && error.keyPattern.Student_ID ){
            return res.status(403).json({message: "Student_ID already exists."});
        }


        return res.status(403).json({message:"Student Not Added"});
    }
}

export const getAllStudents = async(req,res)=>{
    try{
        const student = await Student.find({});
        return res.status(200).json({student:student,message:"Student Retrieved"});
    }catch{
        return res.status(404).json({message:"Unable to retrieve Student"});
    }
}

export default {addStudent,getAllStudents}