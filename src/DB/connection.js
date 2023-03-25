var mongoose = require('mongoose')

//connect function returns a promise, therefore we need to use promises.
mongoose.connect('mongodb://localhost:27017/Students-RestApi',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{                                   //.then is used when promise is resolved.
    console.log('DB connection is Successful')
}).catch((e)=>{                                  //.catch is used when promise is rejected.
    console.log('DB connection is Unsuccessful')
    console.log(e)
})