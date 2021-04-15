import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

/** This collection contains the user's saved trips (miles) */
class SavedTrip {
    constructor() {
        // The name of this collection.
        this.name = 'SavedTrip';
        // Define the Mongo collection.
        this.collection = new Mongo.Collection(this.name);
        // Define the structure of each document in the collection.
        this.schema = new SimpleSchema({
            userID: String,
            mile: { type: Number, optional: false },
            name: String,
        }, { tracker: Tracker });
        // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
        this.collection.attachSchema(this.schema);
        // Define names for publications and subscriptions
        this.userPublicationName = `${this.name}.publication.user`;
        this.adminPublicationName = `${this.name}.publication.admin`;
        this.communityPublicationName = `${this.name}.publication.community`;
    }

    /**
     * Return array of currently active user IDs.
     * Server-side only.
     */
    getActive(max) {
        if (!Meteor.isServer) {
            console.log('getActive() is not running on the server');
            return undefined;
        }
        return this.collection.find()
            .fetch().map(user => {
                return {
                    userID: user._id,
                    name: user.name,
                    email: user.email,
                };
            }).slice(0, max);
    }

    /**
     * A stricter form of findOne, in that it throws an exception if the entity isn't found in the collection.
     * @param email UserInfo's email
     * @returns String The user's Meteor id
     * @throws { Meteor.Error } If the document cannot be found.
     */
    findMeteorID(email) {
        // For this project, the username is the email
        const doc = Meteor.users.findOne({ username: email })._id;
        if (!doc) {
            if (typeof email !== 'string') {
                throw new Meteor.Error(`${JSON.stringify(email)} is not a defined ${this._type}`, '', Error().stack);
            } else {
                throw new Meteor.Error(`${email} is not a defined ${this._type}`, '', Error().stack);
            }
        }
        return doc;
    }
}

export const UserInfo = new SavedTrip();
