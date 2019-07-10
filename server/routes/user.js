const express = require('express');

const ctrl = require('./user.ctrl');
const router = express.Router();

router.get('/', ctrl.index);

router.get('/:id', ctrl.selectOne)

router.delete('/:id', ctrl.deleteOne)

router.post('/', ctrl.updateOne)

router.put('/:id', ctrl.createOne)

module.exports = router;