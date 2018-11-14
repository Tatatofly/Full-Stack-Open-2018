const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const users = await User.find({})
    const usernames = users.map(x => x.username)

    if(usernames.includes(body.username)) {
      return response.status(400).json({ error: 'username is not unique' })
    }

    if(body.password.length < 3) {
      return response.status(400).json({ error: 'password is too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
      adult: body.adult === undefined ? true : body.adult
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went bananas :think:' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { likes: 1, author: 1, title: 1, url: 1 })

  response.json(users.map(User.format))
})

module.exports = usersRouter