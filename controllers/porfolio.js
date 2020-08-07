const Skill = require('../models/portfolio');

exports.addSkill = async (req,res,next)=>{
    try{
        const title = req.body.title;
        const level = req.body.level;
        const skill = {
            title:title,
            level:level
        }
        const result = await Skill.create(skill);
        res.status(200).json({message:"Skill added!",data: result});
    }catch(error){
        res.status(500).json({message:"Error Occured"});
    }
}

exports.deleteSkill = async (req,res,next)=>{
    try{
        const id = req.params.id;
        result = await Skill.findByIdAndDelete(id);
        res.status(200).json({message:"Skill deleted!",data: result});
    }catch(error){
        res.status(500).json({message:"Error Occured"});
    }
}

exports.getSkillById = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const skill = await Skill.findById(id);
        res.status(200).json({message:"Skill fetched",data: skill});
    }catch(error){
        res.status(500).json({message:"Error Occured"});
    }
}

exports.getAllSkills = async (req,res,next)=>{
    try{
        const skills = await Skill.find();
        res.status(200).json({message:"All skills fetched", data:skills})
    }catch(error){
        res.status(500).json({message:"Error Occured"});
    }
}