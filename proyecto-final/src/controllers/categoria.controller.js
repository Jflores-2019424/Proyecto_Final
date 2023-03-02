'use strict'

const Categoria = require("../models/categorias.model");
const {model} = require("mongoose")

const createCategory = async(req,res) =>{
    const {nombreCategoria} = req.body;
    try{
        let category = await Categoria.findOne({nombreCategoria: nombreCategoria})
        if(category){
            return res.status(400).send({
                ok: false,
                message:"Categoria ya existente",
                category: category})
        }
        category = new Categoria(req.body);

        category = await Categoria.save();

        res.status(200).send({
            message: `Categoria ${nombreCategoria} creado correctamente`,
            ok: true,
        })
    }catch(err){
        throw new Error(err);
    }
};

const updateCategory = async(req,res) =>{
    try{
        const id = req.params.id;
        const categoryEdit = {...req.body};

        const categoryComplete = await Categoria.findByIdAndUpdate(id, categoryEdit, {new: true,});
        if(categoryEdit){
            return res.status(200).send({message:"Categoria actualizada", categoryComplete})
        }else{
            res.status(400).send({message:"Error al actulizar"})
        }
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {createCategory};