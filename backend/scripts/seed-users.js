import mongoose from "mongoose"
import dotenv from "dotenv"
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"

dotenv.config()

const usersToSeed = [
  { name: "Ahmed Hassan", email: "ahmed.hassan@example.com" },
  { name: "Bashiir Abdi", email: "bashiir.abdi@example.com" },
  { name: "Najmo Ahmed", email: "najmo.ahmed@example.com" },
  { name: "Aisha Ali", email: "aisha.ali@example.com" },
  { name: "Mohamed Ali", email: "mohamed.ali@example.com" },
]

async function seedUsers() {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    console.error("MONGO_URI not found in environment variables")
    process.exit(1)
  }

  await mongoose.connect(mongoUri)

  try {
    const hashed = bcryptjs.hashSync("123", 10)

    for (const user of usersToSeed) {
      const existing = await User.findOne({ email: user.email })

      if (existing) {
        existing.name = user.name
        existing.password = hashed
        await existing.save()
        console.log(`Updated: ${user.email}`)
      } else {
        await User.create({
          name: user.name,
          email: user.email,
          password: hashed,
          role: "user",
        })
        console.log(`Created: ${user.email}`)
      }
    }

    console.log("Seeding complete")
  } catch (err) {
    console.error("Error seeding users:", err)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seedUsers()


