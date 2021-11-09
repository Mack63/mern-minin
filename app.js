const exp = require('express')
const conf = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = exp()
app.use(exp.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redir.routes'))

if (process.env.NODE_ENV === 'development'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (res, req)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', index.html))
  })
}

const PORT = conf.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(conf.get('mongoUri'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    app.listen(PORT, () => console.log(`App has started on port: ${PORT}`))
  } catch (e) {
    console.log('Server ERROR', e.message)
    process.exit(1)
  }
}

start()
