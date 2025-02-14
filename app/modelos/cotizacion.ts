import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import DataBaseConnection from '../lib/sequelize';

export class Cotizacion extends Model<
  InferAttributes<Cotizacion>,
  InferCreationAttributes<Cotizacion>
> {
  declare id: CreationOptional<number>;
  declare fecha: string;
  declare tipo_grano: string;
  declare tipo_compra: string;
  declare cosecha: string;
  declare total_semanal: number;
  declare total_comprado: number;
  declare total_precio_hecho: number;
  declare total_a_fijar: number;
  declare total_fijado: number;
  declare saldo_a_fijar: number;
  declare DJVE_acumulado: number;
}

export const initCotizacion = async () => {
  const sequelize = await DataBaseConnection.getSequelizeInstance();

  Cotizacion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tipo_grano: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo_compra: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cosecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_semanal: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      total_comprado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_precio_hecho: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total_a_fijar: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total_fijado: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      saldo_a_fijar: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      DJVE_acumulado: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'cotizacion',
      timestamps: false,
    }
  );
};
