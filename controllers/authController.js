const bcrypt = require('bcrypt')
const User = require('../models/User')
const Training = require('../models/Training')
const { validationResult } = require('express-validator')

