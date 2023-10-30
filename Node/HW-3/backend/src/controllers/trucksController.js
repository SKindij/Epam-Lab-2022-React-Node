// controllers/trucksController
// підключаємо схему з моделі для валідації даних про вантажівки
const { truckJoiShema } = require('../models/Truck')
// сервіси для роботи із вантажівками
const {
  getAllTrucksByUserID, addUserTruck, getUserTruckByID,
  updateUserTruckByID, deleteUserTruckByID, assignTruckToUserByID, 
  getAssignedTruckByUserID, unassignUserTruckByID
} = require('../services/trucksService')

// отримує всі вантажівки для користувача
const getAllTrucks = async (req, res) => {
  const userID = req.user._id
    const trucks = await getAllTrucksByUserID(userID)
  return res.status(200).json({ trucks })
}

// для створення нової вантажівки та збереження її в базі даних
const saveTruck = async (req, res) => {
  const validatedData = await truckJoiShema.validateAsync({
    created_by: req.user._id,
    status: 'IS',
    ...req.body
  })
  await addUserTruck(validatedData)
  return res.status(200).json({
    message: 'Truck created successfully'
  })
}
// отримує вантажівку користувача
const getTruck = async (req, res) => {
  const userID = req.user._id
  const truckID = req.params.id
  const truck = await getUserTruckByID(userID, truckID)
  if (!truck) { throw Error('Truck not found') }
  return res.status(200).json({ truck })
}
// для оновлення даних про вантажівку
const updateTruck = async (req, res) => {
  const truckID = req.params.id
  const type = req.body.type
  const payload = req.body.payload
  const { width, height, length } = req.body.dimensions
  await truckJoiShema.extract('type').validateAsync(type)
  await updateUserTruckByID(truckID, {
    type,
    payload,
    width,
    height,
    length
  })
  return res.status(200).json({
    message: 'Truck details changed successfully'
  })
}
// для видалення вантажівки користувача
const deleteTruck = async (req, res) => {
  const truckID = req.params.id
  const truck = await deleteUserTruckByID(truckID)
  if (!truck) { throw Error('Truck not found') }
  return res.status(200).json({
    message: 'Truck deleted successfully'
  })
}

// для призначення вантажівки користувачеві
const assignTruck = async (req, res) => {
  // отримуємо ID користувача з об'єкта запиту
  const userID = req.user._id
  // отримуємо ID вантажівки з параметра запиту
  const truckID = req.params.id
  // перевіряємо, чи користувач вже має призначену вантажівку
  const currentAssignedTruck = await getAssignedTruckByUserID(userID)
    // користувач не може мати більше одну активну вантажівку
    if (currentAssignedTruck?.status === 'OL') {
      throw Error('You have already OL (Online) active load.')
    }
    // потрібно зняти призначення поточної вантажівки перед призначенням нової
    if (currentAssignedTruck) {
      throw Error('You have already assigned truck. Please, unassign current truck.')
    }
  // призначаємо вантажівку користувачеві
  await assignTruckToUserByID(userID, truckID)
  return res.status(200).json({
    message: 'Truck assigned successfully'
  })
}

// для зняття призначення вантажівки від користувача
const unassignTruck = async (req, res) => {
  const userID = req.user._id
  const currentAssignedTruck = await getAssignedTruckByUserID(userID)
  if (!currentAssignedTruck) { throw Error('Truck not found') }
  if (currentAssignedTruck.status === 'OL') {
    throw Error("You have already active load. You can't unassing current truck.")
  }
  await unassignUserTruckByID(currentAssignedTruck._id)
    return res.status(200).json({
      message: 'Truck unassigned successfully'
    })
}

module.exports = {
  getAllTrucks,
  saveTruck,
  getTruck,
  updateTruck,
  deleteTruck,
  assignTruck,
  unassignTruck
}
