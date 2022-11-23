const { Branch, Client, Guards } = require("../models");
const { generateToken } = require("../config/token");
const { validateAuth, validateClient } = require("../middlewares/auth");

class GuardsService {
    static async getAll() {
      try {
        const response = await Guards.findAll({attributes: { exclude: ["password", "salt"]}});
        return { error: false, data: response };
      } catch (error) {
        console.error(error);
        return { error: true, data: error };
      }
    }

    static async getGuardsByClient(clientId) {
        try {
            const response = await Guards.findAll({where: { clientId }, attributes: {exclude: ["password", "salt"]}})
        return {error: false, data: response}
        } catch (error) {
            console.log(error);
            return {error: true, data: error}
        }
    }

    static async getSingle(id) {
        try {
          const response = await Guards.findByPk(id,  {attributes: { exclude: ["password", "salt"]}});
          return { error: false, data: response };
        } catch (error) {
          console.error(error);
          return { error: true, data: error };
        }
      }   

    static async createGuard(body) {
      try {
          const {client,name,lastname,email,cuil,password,street,number, city,province,
            latitude,longitude,entry_time,hours_per_day} = body 
          const resp = await Client.findByPk(client)
          const newGuard= {name,lastname,email,cuil,password,street,number,city,
            province,latitude,longitude,entry_time,hours_per_day}
          const response = await Guards.create(body)
          response.setClient(resp)
          return {error:false , data: {client, name, lastname}}
      } catch (error) {
         console.log(error);
         return {error: true, data: error} 
      } 
    }
    
    static async loginGuard(body) {
      try {
        const {email, password} = body 
        const guard = await Guards.findOne({where: {email}})
        if(!guard) return {error: true, data: error}
        const validate = await guard.validatePassword(password)
        if(!validate) return {error:true, data: error}
        return {error:false, data: guard}
      } catch (error) {
        console.log(error);
        return {error:true, data:error}
      }
    }

    static async updateGuard(id, body) {
      try {
        const resp = await Guards.findByPk(id)
        if(!resp) {
          return {
            error: true,
            data: {
              status: 405,
              message: `No existe el guardia con id ${id}`
            }
          }
        }
        const [affectedRows, updatedPage] = await Guards.update(body, {
          where: {id},
          returning: true
        })
        return {error: false, data: updatedPage[0]}
      } catch (error) {
        console.log(error);
        return {error: true, data: error}
      }
    }

    static async deleteGuard(id) {
      try {
        const resp = await Guards.findByPk(id)
        if(!resp) {
          return {
            error: true,
            data: {
              status: 405,
              message: `No existe el Guardia con el id ${id}`  
            }
          }
        }
        const response = await Guards.destroy({where: {id}})
        return {error: false, data: response}
      } catch (error) {
        console.log(error)
        return {error: true, data: error}
      }
    }

  }


module.exports = GuardsService;