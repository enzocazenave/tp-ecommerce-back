const { hashSync, genSaltSync, compareSync } = require("bcryptjs")
const User = require("../models/mongo/User")
const { sign } = require("jsonwebtoken")

const register = async (user) => {
  try {
    let isEmailInUse = await User.findOne({ email: user.email })

    if (isEmailInUse) {
      throw "El correo electrónico ya se encuentra en uso"
    }

    const hashedPassword = hashSync(user.password, genSaltSync())
    const newUser = new User({ ...user, password: hashedPassword })
    await newUser.save()

    const token = sign(
      { userId: newUser._id, role: newUser.role }, 
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: process.env.SECRET_TOKEN_EXPIRATION_TIME }
    )
    
    return {
      userId: newUser._id,
      role: newUser.role,
      token
    }
  } catch(error) {
    throw error
  }
}

const login = async (user) => {
  try {
    let currentUser = await User.findOne({ email: user.email })

    if (!currentUser) {
      throw "Credenciales incorrectas"
    }

    const isPasswordValid = compareSync(user.password, currentUser.password)

    if (!isPasswordValid) {
      throw "Credenciales incorrectas"
    }

    const token = sign(
      { userId: currentUser._id, role: currentUser.role }, 
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: process.env.SECRET_TOKEN_EXPIRATION_TIME }
    )

    return {
      userId: currentUser._id,
      role: currentUser.role,
      token
    }
  } catch(error) {
    throw error
  }
}

module.exports = {
  register,
  login
}