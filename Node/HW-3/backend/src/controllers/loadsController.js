// controllers/loadsController
const { default: mongoose } = require('mongoose')
const { loadJoiShema, Load } = require('../models/Load')
const { Truck } = require('../models/Truck')

const {
  getAllLoadsByUserID, addUserLoad, getUserLoadByID,
  updateUserLoadByID, deleteUserLoadByID, updateUserLoadStatus,
  assignTruckToLoad, getLoadParams, getLoadShippingInfo,
  compareTruckAndLoadParams, getActiveLoadByTruckID, getShippedLoadsByUserID
} = require('../services/loadsService')
const {
  getAssignedTrucks, getTruckParams,
  getAssignedTruckByUserID, updateTruckStatus
} = require('../services/trucksService')

// для отримання всіх вантажів користувача
  const getAllLoads = async (req, res) => {
	// отримуємо ID користувача з об'єкта запиту
    const userID = req.user._id
    // отримуємо всі вантажі, що належать користувачеві
    const loads = await getAllLoadsByUserID(userID)
    return res.status(200).json({ loads })
  }
// додає новий вантаж до системи
const addLoad = async (req, res) => {
  // валідуємо та підготовлюємо дані
  const validatedData = await loadJoiShema.validateAsync({
    created_by: req.user._id,
    ...req.body
  })
  // додаємо новий вантаж до системи
  await addUserLoad(validatedData)
  return res.status(200).json({ message: 'Load created successfully' })
}

// отримує активний вантаж, який призначено користувачу
const getActiveLoad = async (req, res) => {
  // отримуємо ID користувача з об'єкта запиту
  const userID = req.user._id
  // отримуємо призначену користувачу вантажівку, якщо вона є
  const assignedTruck = await getAssignedTruckByUserID(userID)
    if (!assignedTruck) { throw Error('No assigned truck') }
  // отримуємо ID призначеної вантажівки
  const assignedTruckID = assignedTruck._id
  // отримуємо активний вантаж, якщо він є
  const activeLoad = await getActiveLoadByTruckID(assignedTruckID)
    if (!activeLoad) { throw Error('No active load') }
    return res.status(200).json({ load: activeLoad })
}
// отримує всі відправлені (завершені) вантажі користувача
const getShippedLoads = async (req, res) => {
  const userID = req.user._id
    const shippedLoads = await getShippedLoadsByUserID(userID)
      console.log(shippedLoads)
  res.status(200).json({ loads: shippedLoads })
}

// для зміни стану активного вантажу
const IterateNextLoadState = async (req, res) => {
  // стани вантажу, які можливо встановити
  const states = [
    'En route to Pick Up',
    'Arrived to Pick Up',
    'En route to delivery',
    'Arrived to delivery'
  ]
  // отримуємо ID користувача з об'єкта запиту
  const userID = req.user._id
  // отримуємо призначену користувачу вантажівку, якщо вона є
  const assignedTruck = await getAssignedTruckByUserID(userID)
    if (!assignedTruck) { throw Error('No assigned truck') }
    // отримуємо ID призначеної вантажівки
      const assignedTruckID = assignedTruck._id

  // отримуємо активний вантаж, якщо він є
  const activeLoad = await getActiveLoadByTruckID(assignedTruckID)
    if (!activeLoad) { throw Error('No active load') }
    // отримуємо ID активного вантажу
      const activeLoadID = activeLoad._id

  // знаходимо індекс поточного стану вантажівки в масиві
  const currentStateIndex = states.findIndex(
    (state) => state === activeLoad.state
  )
    if (currentStateIndex === 3) { throw Error('Load has already delivered') }
  // визначаємо наступний стан вантажу
  const nextState = states[currentStateIndex + 1]
    if (nextState === 'Arrived to delivery') {
      await updateUserLoadByID(activeLoadID, {
        state: nextState,
        status: 'SHIPPED',
        $push: {
          logs: {
            message: `Load state changed to '${nextState}'`,
            time: new Date()
          }
        }
      })
      await updateTruckStatus(assignedTruckID, { status: 'IS' })
    }
  // оновлюємо стан вантажу
  await updateUserLoadByID(activeLoadID, {
    state: nextState,
    $push: {
      logs: {
        message: `Load state changed to '${nextState}'`,
        time: new Date()
      }
    }
  })
  return res.status(200).json({
    message: `Load state changed to '${nextState}'`
  })
}

// отримує вантаж за його ID
const getLoad = async (req, res) => {
  const loadID = req.params.id
    const load = await getUserLoadByID(loadID)
    if (!load) { throw Error('Load not found') }
  return res.status(200).json({ load })
}
// оновлює деталі вантажіву за його ID
const updateLoad = async (req, res) => {
  const loadID = req.params.id
    await loadJoiShema.validateAsync(req.body)
      await updateUserLoadByID(loadID, req.body)
  return res.status(200).json({ message: 'Load details changed successfully' })
}
// видаляє вантажівку за його ID
const deleteLoad = async (req, res) => {
  const loadID = req.params.id
    const load = await deleteUserLoadByID(loadID)
      if (!load) { throw Error('Load not found') }
  res.status(200).json({ message: 'Load deleted successfully' })
}

// для відправлення вантажу, а також призначення його водієві та вантажівці
const postLoad = async (req, res) => {
  // отримуємо ID вантажу з параметра запиту
  const loadID = req.params.id
  // змінюємо статус вантажу на 'POSTED' (опубліковано)
  const load = await updateUserLoadStatus(loadID, 'POSTED')
    console.log(`Load ${loadID} POSTED`)
    if (!load) { throw Error('Load not found') }
  // отримуємо всі призначені вантажівки та вибираємо першу доступну та її водія
  const assignedTrucks = await getAssignedTrucks()
    if (!assignedTrucks.length) {
		await updateUserLoadStatus(loadID, 'NEW')
        throw Error('No available trucks found')
    }
  // отримуємо ID вантажівки та її водія
  const truckID = assignedTrucks[0]._id
  const driverID = assignedTrucks[0].assigned_to
    // призначаємо вантажівку до вантажу
    await assignTruckToLoad(loadID, truckID, driverID)
      await updateUserLoadStatus(loadID, 'ASSIGNED')

  const loadParams = await getLoadParams(loadID)
  const truckParams = await getTruckParams(truckID)
    compareTruckAndLoadParams(truckParams, loadParams)
  return res.status(200).json({
    message: 'Load posted successfully',
    driver_found: true
  })
}

// отримує інформацію про вантаж
const getLoadInfo = async (req, res) => {
  const userID = req.user._id
  const loadID = req.params.id
    const [load] = await getLoadShippingInfo(userID, loadID)
      if (!load) { throw Error('Load not found') }
  return res.status(200).json({ load })
}

module.exports = {
  getAllLoads,
  addLoad,
  getActiveLoad,
  IterateNextLoadState,
  getLoad,
  updateLoad,
  deleteLoad,
  postLoad,
  getLoadInfo,
  getShippedLoads
}
