'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {}

  Route.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    routeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'route_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    distance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'medium'
    },
    startLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'start_location'
    },
    endLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'end_location'
    },
    waypoints: {
      type: DataTypes.JSON,
      allowNull: true
    },
    polyline: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Route',
    tableName: 'routes',
    timestamps: true,
    underscored: true
  });

  return Route;
}