// services/trucksService.js
// бібліотека, яка допомагає працювати з MongoDB
  const mongoose = require('mongoose')
// модель для взаємодії з базою даних
  const { Truck } = require('../models/Truck')

// повертає усі вантажівки, які створені користувачем
  const getAllTrucksByUserID = async (id) => {
    return await Truck.find({ created_by: id }, '-__v')
  }
// додає нову вантажівку до бази даних
  const addUserTruck = async (data) => {
   const truck = new Truck(data)
    return await truck.save()
  }
// отримує вантажівку за її ID
  const getUserTruckByID = async (truckID) => {
    return await Truck.findById(truckID, '-__v')
  }
// оновлює вантажівку за її ID з новими даними
  const updateUserTruckByID = async (
    truckID,
    { type, payload, width, height, length }
  ) => {
    return await Truck.findByIdAndUpdate(truckID, {
      type,
      payload,
      dimensions: {
        width,
        height,
        length
      }
    })
  }
// видаляє вантажівку за її ID
  const deleteUserTruckByID = async (truckID) => {
    return await Truck.findByIdAndDelete(truckID)
  }

// отримує призначену вантажівку для користувача
const getAssignedTruckByUserID = async (userID) => {
  return await Truck.findOne({
    assigned_to: new mongoose.mongo.ObjectId(userID),
  })
}
// призначає вантажівку користувачу
const assignTruckToUserByID = async (userID, truckID) => {
  return await Truck.findByIdAndUpdate(truckID, {
    assigned_to: new mongoose.mongo.ObjectId(userID)
  })
}
// скасовує призначення вантажівки користувачу
const unassignUserTruckByID = async (truckID) => {
  return await Truck.findByIdAndUpdate(truckID, { assigned_to: null })
}

// отримує усі призначені вантажівки
  const getAssignedTrucks = async () => {
    return await Truck.aggregate([
      {
        $match: {
          status: 'IS',
          assigned_to: {
            $ne: null
          }
        }
      }
    ])
  }

const getTruckParams = async (truckID) => {
  return ({ payload, dimensions } = await Truck.findById(truckID))
}

const updateTruckStatus = async (truckID) => {
  await Truck.findByIdAndUpdate(truckID, {
    status: 'IS'
  })
}

module.exports = {
  getAllTrucksByUserID,
  addUserTruck,
  getUserTruckByID,
  updateUserTruckByID,
  deleteUserTruckByID,
  assignTruckToUserByID,
  unassignUserTruckByID,
  getAssignedTruckByUserID,
  getAssignedTrucks,
  getTruckParams,
  updateTruckStatus
}
