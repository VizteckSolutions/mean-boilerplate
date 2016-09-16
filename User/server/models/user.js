/**
 * User Model
 */
'use strict';
var crypto = require('crypto');

module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('User',
        {
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            firstName: {type: DataTypes.STRING},
            lastName: {type: DataTypes.STRING},
            email: {type: DataTypes.STRING, unique: true},
            hashedPassword: DataTypes.STRING,
            provider: DataTypes.STRING,
            salt: DataTypes.STRING,
            facebookUserId: DataTypes.INTEGER,
            twitterUserId: DataTypes.INTEGER,
            twitterKey: DataTypes.STRING,
            twitterSecret: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            cell: DataTypes.STRING,
            gender: DataTypes.STRING,
            country: DataTypes.STRING,
            date_of_birth: {type: DataTypes.DATE},
            profile_image: DataTypes.STRING,

        },
        {
            instanceMethods: {
                toJSON: function () {
                    var values = this.get();
                    delete values.hashedPassword;
                    delete values.salt;
                    return values;
                },
                makeSalt: function () {
                    return crypto.randomBytes(16).toString('base64');
                },
                authenticate: function (plainText) {
                    return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
                },
                encryptPassword: function (password, salt) {
                    if (!password || !salt) {
                        return '';
                    }
                    salt = new Buffer(salt, 'base64');
                    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
                }
            }
        }
    );

    return User;
};
