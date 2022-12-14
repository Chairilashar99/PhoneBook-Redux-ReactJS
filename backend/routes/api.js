// var express = require('express');
// var router = express.Router();
// const { Response } = require('../helpers/util');
// const { Sequelize } = require('../models/index');
// var models = require('../models/index')

// /* GET users listing. */
// router.get('/', async function (req, res, next) {
//   const { name, phone, sortName, sortPhone, limit, offset } = req.query
//   let wheres = {}
//   let search = {}
//   let order = []

//   if (req.query) {
//     if (name) {
//       search['name'] = { [Sequelize.Op.iLike]: '%' + name + '%' }
//     }
//     if (phone) {
//       search['phone'] = { [Sequelize.Op.iLike]: '%' + phone + '%' }
//     }
//     if (sortName) {
//       order.push('name', sortName)
//     }
//     if (sortPhone) {
//       order.push('phone', sortPhone)
//     }
//     wheres['where'] = search
//   }

//   if (order.length > 0) {
//     wheres['order'] = [order]
//   }

//   if (limit) {
//     wheres['limit'] = limit
//   }

//   if (offset) {
//     wheres['offset'] = offset
//   }

//   console.log(wheres)
//   try {
//     const data = await models.Phonebook.findAll({})
//     const amount = await models.Phonebook.count({})
//     res.json(new Response(data))
//   } catch (e) {
//     res.status(500).json(new Response(e, "UNSUCCESFUL"))
//     console.log(e)
//   }


// });

// router.post('/', async function (req, res, next) {
//   try {
//     const { name, phone } = req.body
//     const data = await models.Phonebook.create({ name, phone })
//     res.json(new Response(data))
//   } catch (e) {
//     res.status(500).json(new Response(e, "UNSUCCESFUL"))
//   }
// });

// router.put('/:id', async function (req, res, next) {
//   try {
//     const { name, phone } = req.body
//     const data = await models.Phonebook.update({
//       name,
//       phone
//     }, { 
//       where: {
//         id: req.params.id
//       },
//       returning: true,
//       plain: true
//     })
//     res.json(new Response(data[1]))
//   } catch (e) {
//     res.status(500).json(new Response(e, "UNSUCCESFUL"))
//   }
// });
// router.delete('/:id', async function (req, res, next) {
//   try {
//     const deletedRows = await models.Phonebook.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     const data = await models.Phonebook.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(new Response(deletedRows))
//   } catch (e) {
//     res.status(500).json(new Response(e, "UNSUCCESFUL"))
//     console.log(e)
//   }


// });
// module.exports = router;



var express = require('express');
var router = express.Router();
const { Response } = require('../helpers/util');
const { Sequelize } = require('../models/index');
var models = require('../models/index')

/* GET users listing. */
router.get('/phonebooks/', async function (req, res, next) {
  const { name, phone, sortName, sortPhone, limit, offset } = req.query
  let wheres = {}
  let search = {}
  let order = []

  if (req.query) {
    if (name) {
      search['name'] = { [Sequelize.Op.iLike]: '%' + name + '%' }
    }
    if (phone) {
      search['phone'] = { [Sequelize.Op.iLike]: '%' + phone + '%' }
    }
    if (sortName) {
      order.push('name', sortName)
    }
    if (sortPhone) {
      order.push('phone', sortPhone)
    }
    wheres['where'] = search
  }

  if (order.length > 0) {
    wheres['order'] = [order]
  }

  if (limit) {
    wheres['limit'] = limit
  }

  if (offset) {
    wheres['offset'] = offset
  }

  console.log(wheres)
  try {
    const data = await models.Phonebook.findAll(wheres)
    const amount = await models.Phonebook.count(wheres)
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, "UNSUCCESFUL"))
    console.log(e)
  }


});

router.post('/phonebooks/', async function (req, res, next) {
  try {
    const { name, phone } = req.body
    const data = await models.Phonebook.create({ name, phone })
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, "UNSUCCESFUL"))
  }
});

router.put('/phonebooks/:id', async function (req, res, next) {
  try {
    const { name, phone } = req.body
    const data = await models.Phonebook.update({
      name,
      phone
    }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(data[1]))
  } catch (e) {
    res.status(500).json(new Response(e, "UNSUCCESFUL"))
  }
});
router.delete('/phonebooks/:id', async function (req, res, next) {
  try {
    const deletedRows = await models.Phonebook.findOne({
      where: {
        id: req.params.id
      }
    })
    const data = await models.Phonebook.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(deletedRows))
  } catch (e) {
    res.status(500).json(new Response(e, "UNSUCCESFUL"))
    console.log(e)
  }


});
module.exports = router;