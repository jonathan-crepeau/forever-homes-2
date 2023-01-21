import mongoose from 'mongoose';
const mdb_URI="mongodb+srv://jonathan-crepeau:my-password@forever2cluster.8vrm9tr.mongodb.net/foreverhomes2?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose.connect(mdb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Initial DB connection successful..'))
    .catch((error) => console.log(error));

module.exports = {
    User: require('./User')
}