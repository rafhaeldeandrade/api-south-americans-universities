import { mongooseHelper } from '@/infra/mongo/helpers/mongoose-helper'
import { app } from '@/main/config/express/app'
import env from '@/main/config/env'

const PORT = env.apiPort
const MONGO_URL = env.mongoUrl

mongooseHelper
  .connect(`${MONGO_URL}/universities`)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  )
  .catch(console.error)
