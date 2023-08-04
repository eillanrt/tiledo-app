import { NextResponse } from 'next/server'
import { getUserIdFromToken } from '@/getUserIdFromToken'
import { User } from '@/models/User'
import { Todo } from '@/models/Todo'
import bcrypt from 'bcryptjs'

export async function DELETE(request, { params }) {
  try {
    const userId = params.id
    const password = params.password
    const userIdofLoggedIn = getUserIdFromToken(request)

    const user = await User.findById(userId)
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if (userId !== userIdofLoggedIn) {
      throw new Error('Error 400', { cause: 'Not authorized' })
    }

    if (!passwordIsCorrect) {
      throw new Error('Error 400', { cause: 'Wrong password' })
    }

    const deletedUser = await User.findByIdAndDelete(userId)
    const deletedTodos = await Todo.deleteMany({
      _id: { $in: deletedUser.todos },
    })
    const response = NextResponse.json({
      message: 'Account deleted successfully',
      deletedUser,
      deletedTodos,
    })

    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })
    return response
  } catch (error) {
    // If error is from the user side
    const userErrorPattern = /^Error (4\d{2})/

    if (userErrorPattern.test(error.message)) {
      const errStatus = Number(error.message.match(userErrorPattern)[1])

      return NextResponse.json({ error: error.cause }, { status: errStatus })
    }

    return Response.json({ error: error.message }, { status: 500 })
  }
}