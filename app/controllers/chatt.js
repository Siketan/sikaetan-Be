const { dataPerson, dataPenyuluh, chatDataPerson, chat, message, sequelize } = require('../models');
const ApiError = require('../../utils/ApiError');
const { Op } = require('sequelize');

const getContactPenyuluh = async(req, res)=>{
  const {desa,userId} = req.query
  const t = await sequelize.transaction()
  try {
    const penyuluh = await dataPerson.findOne({
      include: 
            [{
              model: dataPenyuluh,
              where: {
                desaBinaan: {
                  [Op.like]: `%${desa}%`
                }
              }
            }]
    })
    if(!penyuluh) throw new ApiError(400, `penyuluh dengan desa binaan ${desa} tidak ditemukan`)
    const checkAvailChat = await chatDataPerson.findOne({where:{dataPersonId:userId}})
    let chatt 
    if(!checkAvailChat){
      chatt = await chat.create({ type: 'personal' }, { transaction: t })
      await chatDataPerson.bulkCreate([
        {
          chatId: chatt.id,
          dataPersonId: userId,
        },
        {
          chatId: chatt.id,
          dataPersonId: penyuluh.id,
        }
      ], { transaction: t })
      await t.commit()
      return res.status(200).json({
        user:{
          nama:penyuluh.nama,
          foto:penyuluh.foto
        },
        chatId:chatt.id,
        message:[]
      });  
    }
    const messages = await message.findAll({where:{chatId:chatt.id}})
      res.status(200).json({
        user:{
          nama:penyuluh.nama,
          foto:penyuluh.foto
        },
        messages
      });  
  } catch (error) {
    await t.rollback()
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}
const getContactPetani = async(req,res)=>{
  const {id} = req.params
  try {
    const findDesaBinaanPenyuluh = await dataPenyuluh.findOne({where:{dataPersonId:id},attributes:['dataPersonId','desaBinaan']})
    const desaBinaanPenyuluh = findDesaBinaanPenyuluh.desaBinaan.split(",")
    const petani =  await dataPerson.findAll({where:{
      role:'petani',
      desa: {
        [Op.or]: desaBinaanPenyuluh.map(desa => ({ [Op.like]: `%${desa}%` }))
      }
    },
    attributes:['id','nama','foto','desa','role']
  })
    res.status(200).json({
      petani
    });  
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}
const getMessagePetani = async(req,res)=>{
  const {userId, partnerId} = req.query
  const t = await sequelize.transaction()
  try {
    const findIdChatDataPerson = await chatDataPerson.findOne({where:{dataPersonId:partnerId}})
    let chatt
    if(!findIdChatDataPerson){
      chatt = await chat.create({ type: 'personal' }, { transaction: t })
      await chatDataPerson.bulkCreate([
        {
          chatId: chatt.id,
          dataPersonId: userId,
        },
        {
          chatId: chatt.id,
          dataPersonId: partnerId,
        }
      ], { transaction: t })
      await t.commit()
    }
    const petani = await dataPerson.findOne({where:{id:partnerId},attributes:['id','nama','foto','desa','role']})
    const messages = await message.findAll({where:{chatId:chatt.id}})
      res.status(200).json({
        user:{
          nama:petani.nama,
          foto:petani.foto
        },
        messages
      });  
  } catch (error) {
    await t.rollback()
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}
module.exports = {
  getContactPenyuluh,
  getContactPetani,
  getMessagePetani
}