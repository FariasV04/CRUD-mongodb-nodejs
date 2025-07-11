import mongoose from "mongoose";

//Schema Das Vendas

const VendaMensalSchema = new mongoose.Schema({
    mes: Number,
    ValorVenda: Number,
});

export default mongoose.model("VendaMensal", VendaMensalSchema);