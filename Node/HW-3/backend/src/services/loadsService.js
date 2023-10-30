// services/loadsService.js
// бібліотека, яка допомагає працювати з MongoDB
  const { default: mongoose } = require('mongoose')
// моделі для взаємодії з базою даних
  const { Load } = require('../models/Load')
  const { Truck } = require('../models/Truck')

// повертає усі вантажі, які створені користувачем із ID
  const getAllLoadsByUserID = async (id) => {
    return await Load.find({ created_by: id }, '-__v')
  }
// додає новий вантаж до бази даних на основі наданих даних
  const addUserLoad = async (data) => {
    const load = new Load(data)
    return await load.save()
  }
// отримуємо вантаж за його ID
  const getUserLoadByID = async (loadID) => {
    return await Load.findById(loadID, '-__v')
  }
// оновлює вантаж за його ID з новими даними
  const updateUserLoadByID = async (loadID, data) => {
    return await Load.findByIdAndUpdate(loadID, data)
  }
// оновлює статус вантажу за його ID
  const updateUserLoadStatus = async (loadID, status) => {
    return await Load.findByIdAndUpdate(loadID, { status: status })
  }
// видаляємо вантаж за його ID
  const deleteUserLoadByID = async (loadID) => {
    return await Load.findByIdAndDelete(loadID)
  }

// призначає вантаж водієві та встановлює його статус
const assignTruckToLoad = async (loadID, truckID, driverID) => {
  // оновлює статус вантажівки на 'OL' ("на лінії")
  await Truck.findByIdAndUpdate(truckID, { status: 'OL' })

  return await Load.findByIdAndUpdate(loadID, {
    assigned_to: truckID, // призначено до
	// "$set" вказує MongoDB на заміну значення певного поля на нове
	// або додавання нового поля, якщо воно раніше не існувало
    $set: { state: 'En route to Pick Up (на шляху до місця забору)' },
	// "$push" вказує MongoDB на додавання нового значення до масиву
	// додає запис до журналу вантажу
    $push: {
      logs: {
        message: `Load assigned to driver with (вантаж призначено до) id ${driverID}`,
        time: new Date()
      }
    }
  })
}

// отримуємо параметри вантажу за його ID
const getLoadParams = async (loadID) => {
  return { payload, dimensions } = await Load.findById(loadID)
}
// отримує інформацію про доставку
const getLoadShippingInfo = async (userID, loadID) => {
  // метод aggregate дозволяє виконувати складні операції обробки даних
  return await Load.aggregate([
    {
	  // виконує фільтрацію документів в колекції
      $match: {
        created_by: new mongoose.mongo.ObjectId(userID),
        status: 'ASSIGNED',
        _id: new mongoose.mongo.ObjectId(loadID)
      }
    },
    {
	  // виконує операцію "злиття" (lookup) з колекцією 
      $lookup: {
        from: 'trucks',
        localField: 'assigned_to',
        foreignField: '_id',
        as: 'truck'
      }
    },
    {
	  // розгортає масив, який був створений під час операції "злиття" 
      $unwind: {
        path: '$truck'
      }
    }
  ])
}

// орівнює параметри вантажу та вантажівки
const compareTruckAndLoadParams = (truckParams, loadParams) => {
  if (loadParams.payload > truckParams.payload) {
    throw Error('Too big load for available trucks')
  }

  if (loadParams.dimensions.width > truckParams.dimensions.width) {
    throw Error('Too big load for available trucks')
  }

  if (loadParams.dimensions.height > truckParams.dimensions.height) {
    throw Error('Too big load for available trucks')
  }

  if (loadParams.dimensions.length > truckParams.dimensions.length) {
    throw Error('Too big load for available trucks')
  }
}

// повертає активний вантаж, який призначено вантажівці за її ID
const getActiveLoadByTruckID = async (truckID) => {
  return await Load.findOne(
    {
      assigned_to: new mongoose.mongo.ObjectId(truckID),
      status: 'ASSIGNED'
    },
    '-__v'
  )
}

// повертає відправлені вантажі для користувача за її ID
const getShippedLoadsByUserID = async (userID) => {
  return await Load.aggregate([
    {
      $match: {
        'logs.0.message': new RegExp(userID),
        status: 'SHIPPED'
      }
    }
  ])
}

module.exports = {
  getAllLoadsByUserID,
  addUserLoad,
  getUserLoadByID,
  updateUserLoadByID,
  deleteUserLoadByID,
  updateUserLoadStatus,
  assignTruckToLoad,
  getLoadParams,
  getLoadShippingInfo,
  compareTruckAndLoadParams,
  getActiveLoadByTruckID,
  getShippedLoadsByUserID
}
