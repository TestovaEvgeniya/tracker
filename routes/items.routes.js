const {Router} = require('express')
const router = Router()
const Data = require('../models/Data')
const auth = require('../middleware/auth.middleware')
const isNumber = require('is-number')


// /api/items/get_list
router.get(
  '/get_list', auth, async (req, res) => {
  try {
    const items = await Data.findOne({userID: req.user.userId})
    res.json(items)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})


// /api/items/add_item
router.post(
  '/add_item', auth, async (req, res) => {
  try {
    const item = req.body
    const existing = await Data.findOne({"userID": req.user.userId, "items.item_name": item.item_name})
    if (existing) {
      return res.status(400).json({ message: 'Такое имя уже существует' })
    }

    await Data.updateOne({ userID: req.user.userId }, { $push: { items: {"item_name": item.item_name, "item_type": item.item_type}}})
    return res.status(201).json({ message: 'Маркер успешно добавлен' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/items/add_data
router.post(
  '/add_data', auth, async (req, res) => {
  try {
    const data = req.body.data
    const date = req.body.date

    if (Object.keys(data).length == 0){
      return res.status(400).json({ message: 'Записи пусты'})
    }

    items = await Data.findOne({"userID": req.user.userId})
    for (key in data) {

      let item = items.items.find( i => i.item_name == key)

      if (item) {
        const item_value = toType(item.item_type, data[key])

        if (item_value == null) {
          return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
        } 
        await Data.updateOne({"userID": req.user.userId},
                              { $push: {"items.$[element].item_data":{"value": data[key], "date": date}}},
                              { "arrayFilters": [{"element.item_name": key}]})
      } else {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
      }
    }

    return res.status(201).json({ message: 'Запись добавлена' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/items/delete_item
router.post(
  '/delete_item', auth, async (req, res) => {
  try {
    const item_name = req.body
    await Data.updateOne({"userID": req.user.userId},
                        { $pull: {"items": {"item_name": item_name.item_name} }})
    return res.status(201).json({ message: 'Маркер удален' })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/items/delete_data
router.post(
  '/delete_data', auth, async (req, res) => {
  try {
    const data = req.body
    await Data.updateOne({"userID": req.user.userId},
                        { $pull: {"items.$[element].item_data": {"date": data.item_data.date, "value": data.item_data.value} }},
                        { "arrayFilters": [{"element.item_name": data.item_name}]})
    return res.status(201).json({ message: 'Данные удалены' })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/items/change_item
router.post(
  '/change_item', auth, async (req, res) => {
  try {
    const item_names = req.body
    await Data.updateOne({"userID": req.user.userId},
                        { $set: {"items.$[element].item_name": item_names.new_name}},
                        { "arrayFilters": [{"element.item_name": item_names.old_name}]})
    return res.status(201).json({ message: 'Имя изменено' })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})


function toType(item_type, item_value) {

    switch (item_type) {
        case 'range':
          const range = Number(item_value)
          return ( isNumber(range) && range >= 0 && range <= 5 ) ? range : null
        case 'number':
          const num = Number(item_value)
          return (isNumber(num)) ? num : null
        case 'boolean':
          return (item_value == "true" || item_value == "false") ? item_value == "true" : null
        case 'string':
          return item_value
    }
}


module.exports = router  