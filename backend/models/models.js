const sequelize = require('../core/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull:false},
    password: { type: DataTypes.STRING, allowNull:false},
    googleid: { type: DataTypes.STRING, defaultValue: 'null' },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Country = sequelize.define('country', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
})

const Class = sequelize.define('class', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
})

const Kind = sequelize.define('kind', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
})

const Animal = sequelize.define('animal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    age: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false  },
    arrival_date: {type: DataTypes.DATE, allowNull: false }
})

Class.hasMany(Kind);
Kind.belongsTo(Class);

Kind.hasMany(Animal);
Animal.belongsTo(Kind);

Country.hasMany(Animal);
Animal.belongsTo(Country);

module.exports = {
    User,
    Country,
    Class,
    Kind,
    Animal
}