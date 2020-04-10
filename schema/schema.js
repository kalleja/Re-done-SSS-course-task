// schema/schema.js
"use strict";

const {
    GraphQLObjectType, GraphQLID,
    GraphQLString, GraphQLList,
    GraphQLSchema, GraphQLNonNull,
    GraphQLBoolean,GraphQLInt,
    GraphQLFloat, GraphQLInputObjectType,
    GraphQLNoNull
} = require("graphql");

const STATION = require("../models/station");
const CONNEC = require("../models/connection");
const CONTYPE = require("../models/connectionType");
const CURTYP = require("../models/currentType");
const LEVELS = require("../models/level");

const gql_CONTYPE = new GraphQLObjectType({
    name: "CONNECTIONTYPE",
    description: "TYPE OF LINK",
    fields: () => ({
        id: { type: GraphQLID },
        FormalName: { type: GraphQLString }, 
        Title: { type: GraphQLString }
    }) });

const gql_CURTYP = new GraphQLObjectType({
    name: "CURRENTTYPE",
    description: "CURRENT YPE",
    fields: () => ({
        id: { type: GraphQLID },
        Description: { type: GraphQLString }, 
        Title: { type: GraphQLString } })
});

const gql_LEVELS = new GraphQLObjectType({
    name: "LEVEL",
    description: "LEVEL",
    fields: () => ({
        id: { type: GraphQLID },
        Comments: { type: GraphQLString },
        IsFastChargeCapable: { type: GraphQLBoolean },
        Title: { type: GraphQLString }  }) });

const gql_CONNEC = new GraphQLObjectType({
    name: "CONNECTION",
    description: "CONNECTION",
    fields: () => ({
        id: { type: GraphQLID },
        ConnectionType: {
            type: gql_CONTYPE,
            resolve: async (parent, args) => {
                try {
                    return await CONTYPE.findById(
                        parent.ConnectionTypeID
                    );
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        LevelType: {
            type: gql_LEVELS,
            resolve: async (parent, args) => {
                try {
                    return await LEVELS.findById(parent.LevelID);
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        CurrentType: {
            type: gql_CURTYP,
            resolve: async (parent, args) => {
                try {
                    return await CURTYP.findById(parent.CurrenTypeID);
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        Quantity: { type: GraphQLInt }
    })
});

const gql_geoJSON = new GraphQLObjectType({
    name: "geoJSON",
    description: "Location type",
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        coordinates: { type: new GraphQLList(GraphQLFloat) }
    })
});

const gql_STATION = new GraphQLObjectType({
    name: "STATION",
    description: "STATION",
    fields: () => ({
        id: { type: GraphQLID },
        Location: { type: gql_geoJSON },
        Connections: {
            type: new GraphQLList(gql_CONNEC),
            resolve: async (parent, args) => {
                try {
                    return await CONNEC.find({ _id: parent.Connections });
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        Title: { type: GraphQLString },
        AddressLine1: { type: GraphQLString },
        Town: { type: GraphQLString },
        StateOrProvince: { type: GraphQLString },
        Postcode: { type: GraphQLString }
    })
});

const gql_coords = new GraphQLInputObjectType({
    name: "coord",
    description: "The Coordinates",
    fields: () => ({
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
    })
});

const gql_bounds = new GraphQLInputObjectType({
    name: "bounds",
    description: "Query bounds for coordinates",
    fields: () => ({
        _southWest: { type: gql_coords },
        _northEast: { type: gql_coords }
    })
});

const gql_bounds = new GraphQLInputObjectType({
    name: "bounds",
    description: "Query bounds for geo spatial query",
    fields: () => ({
        _southWest: { type: gql_coords },
        _northEast: { type: gql_coords }
    })
});

const gql_CONNECinput = new GraphQLInputObjectType({
    name: "connectioninput",
    fields: () => ({
        ConnectionTypeID: { type: GraphQLID },
        CurrentTypeID: { type: GraphQLID },
        LevelID: { type: GraphQLID },
        Quantity: { type: GraphQLInt }
    })
});

const gql_locationinput = new GraphQLInputObjectType({
    name: "locationinput",
    fields: () => ({
        type: { type: GraphQLString, defaultValue: "Point" },
        coordinates: {
            type: new GraphQLList(GraphQLFloat)
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
    stations: {
        type: new GraphQLList(gql_STATION),
        description: "Gets list of stations based on thier parameters",
        args: {
        start: { type: GraphQLInt, defaultValue: 0 },
        limit: { type: GraphQLInt, defaultValue: 10 },
        bounds: { type: gql_bounds, defaultValue: null }
            },
            resolve: async (parent, args) => {
                try {
                    if (args.bounds != null) {
                        const bottomLeft = args.bounds._southWest;
                        const topRight = args.bounds._northEast;
                        const polygon = {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [bottomLeft.lng, topRight.lat],
                                    [topRight.lng, topRight.lat],
                                    [topRight.lng, bottomLeft.lat],
                                    [bottomLeft.lng, bottomLeft.lat],
                                    [bottomLeft.lng, topRight.lat]
                                ]
                            ]
                        };

                        return await STATION
                            .find({
                                Location: {
                                    $geoWithin: {
                                        $geometry: polygon
                                    }
                                }
                            })
                            .skip(args.start)
                            .limit(args.limit);
                    } else {
                        return await STATION
                            .find({})
                            .skip(args.start)
                            .limit(args.limit);
                    }
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        station: {
            type: gql_STATION,
            description: "Get the one single Stations by id",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args) => {
                try {
                    return await STATION.findById(args.id);
                } catch (error) {
                    return new Error(error);
                }
            }
        },

        Stations: {
            type: gql_STATION,
            description: "Get the Stations bounds by id",
            args: { ID: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args) => {
                try {
                    return await STATION.findById(args.id);
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        connectiontypes: {
            type: new GraphQLList(gql_CONTYPE),
            description: "Gets every connectiontypes",
            resolve: async (parent, args) => {
                try {
                    return await CONTYPE.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        currenttypes: {
            type: new GraphQLList(gql_CURTYP),
            description: "Gets every current types",
            resolve: async (parent, args) => {
                try {
                    return await CURTYP.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        leveltypes: {
            type: new GraphQLList(gql_LEVELS),
            description: "Gets all level types",
            resolve: async (parten, args) => {
                try {
                    return await LEVELS.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutations...",
    fields: {
        addStation: {
            type: gql_STATION,
            description: "Add a new station",
            args: {
                Connections: {
                    type: new GraphQLNonNull(new GraphQLList(gql_CONNECinput))},
                Location: { type: new GraphQLNonNull(gql_locationinput) },
                Title: { type: new GraphQLNonNull(GraphQLString) },
                AddressLine1: { type: new GraphQLNonNull(GraphQLString) },
                Town: { type: new GraphQLNonNull(GraphQLString) },
                StateOrProvince: { type: new GraphQLNonNull(GraphQLString) },
                Postcode: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    var connections = [];
                    await args.CONNECs.map(conn => {
                        const newCONNEC = new CONNEC(conn);
                        newCONNEC.save();
                        connections.push(newCONNEC);
                    });
                    args.CONNECs = CONNECs;
                    const newSTATION = new STATION(args);
                    return await newSTATION.save();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        modifyStation: {
            type: gql_STATION,
            description: "Modify an existing station",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                CONNECs: {
                    type: new GraphQLList(gql_CONNECinput)
                },
                Location: {
                    type: gql_locationinput
                },
                Title: { type: GraphQLString },
                AddressLine1: { type: GraphQLString },
                Town: { type: GraphQLString },
                StateOrProvince: { type: GraphQLString },
                Postcode: { type: GraphQLString }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);

                    const oldStation = await STATION.findById(args.id);
                    await oldStation.Connections.map(async connectionID  => {
                        await CONNEC.findByIdAndDelete(connectionID );
                    });

                    var updatedCONNECs = await Promise.all(
                        args.CONNECs.map(async conn => {
                            const c = new CONNEC(conn);
                            await c.save();
                            return c._id;
                        })
                    );
                    args.CONNECs = updatedCONNECs;

                    const updatedSTATION = await STATION.findByIdAndUpdate(
                        { _id: args.id },
                        args,
                        { new: true },
                        (error, doc) => {
                            if (error) {
                                console.log(error);
                                return new Error(error);
                            }
                        }
                    );
                    return updatedSTATION;
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        deleteStation: {
            type: gql_STATION,
            description: "Delete a station",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    const delSTATION = await STATION.findByIdAndDelete(args.id);
                    await delSTATION.CONNECs.map(conn => {
                        CONNEC.findByIdAndDelete(conn);
                    });
                    return delSTATION;
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
