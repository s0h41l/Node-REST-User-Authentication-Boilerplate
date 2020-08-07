const express = require('express');
const { addSkill, deleteSkill, getSkillById, getAllSkills } = require('../controllers/porfolio');
const router = express.Router();

router.post('/addSkill',addSkill);
router.delete('/deleteSkill/:id',deleteSkill);
router.get('/getSkillById/:id',getSkillById);
router.get('/getAllSkills',getAllSkills);

module.exports = router;