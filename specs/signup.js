export default {
  existingUser,
  noEmailPass,
}

function noEmailPass(spec) {
  return async () => {
    // signUp with no email, pass
    await spec.pause(5000)
    await spec.press('Welcome.skipButton')
    await spec.press('SignupOne.button')
    await spec.notExists('SignupTwo.screen')

    await spec.pause(5000)
  }
}

function existingUser(spec) {
  return async () => {
    // signUp with no email, pass
    await spec.pause(5000)
    await spec.press('Welcome.skipButton')
    await spec.fillIn('SignupOne.email',`filip.jovakaric+wlt@mvpworkshop.co`)
    await spec.fillIn('SignupOne.password','12347654')
    await spec.press('SignupOne.button')
    await spec.notExists('SignupTwo.screen')

    await spec.pause(5000)
  }
}
