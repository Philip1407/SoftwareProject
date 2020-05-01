let db = require('../utils/db')

module.exports = {
    find:  condition => db.find('user', condition),
    findAll: _=> db.findAll('user'),
    create: entity=>db.create(entity,'user'),
    update: (entity,id)=>{db.update(entity,'user','id',id)},
    delete: id=>{'user','id',id}
};
