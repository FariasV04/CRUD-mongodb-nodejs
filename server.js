// das Bibliotecas essenciais 
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VendaMensal from "./VendaMensal.js";

//configuração da variavel de ambiente 
dotenv.config();

//configuração do Servidor
const app = express();
const port = 3000;

//conexão com Banco de Dados
const ConectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.log("Deu Erro ao conectar com o MongoDB", error);
    }
};

ConectDB();

// Midleware
app.use(express.json());

// Rotas/CREATE
app.post("/vendas", async (req,res) => {
    try {
        const NovaVendaMensal = await VendaMensal.create(req.body);
        res.json(NovaVendaMensal);
    } catch (error) {
        res.json({error: error});
    }
});
// Rotas/READ
app.get("/vendas", async (req, res) => {
    try {
        const VendaMensais = await VendaMensal.find();
        res.json(VendaMensais);
    } catch (error) {
        res.json({error: error});
    }
});

// Rotas/UPDATE

app.put("/vendas/:id", async (req, res) => {
    try {
        const novaVendaMensais = await VendaMensal.findByIdAndUpdate(
            req.params.id,
             req.body,
             { new: true }
            );
        res.json(novaVendaMensais);
    } catch (error) {
        res.json({error: error});
    }
});

// Rotas/DELETE

app.delete("/vendas/:id", async (req, res) => {
    try {
        const VendaMensaisExcluida = await VendaMensal.findByIdAndDelete(
            req.params.id
            );
        res.json(VendaMensaisExcluida);
    } catch (error) {
        res.json({error: error});
    }
});

app.listen(port, () => console.log(`O Servidor está rodando a porta ${port}`));