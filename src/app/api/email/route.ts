// src/app/api/cron/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Swiss from "@/utils/func/swiss";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const {id_pedido, tipo } = body;
  const swiss = new Swiss();

  const transporter = nodemailer.createTransport({
   service: process.env.EMAIL_SERVER,
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_API_KEY,
   }
 });

 const {msg, email} = await swiss.formatMessage(id_pedido, tipo);

 const mailOptions = {
   from: process.env.EMAIL_FROM,
   to: email,
   subject: (tipo === "agendado" ? "Agendamento de pedido" : tipo === "preparando" ? "Pedido em preparo" : "Pedido a Caminho"),
   // text: "Conteúdo do e-mail em texto",
   html: msg,
 };

 try {
   const info = await transporter.sendMail(mailOptions);
   console.log("E-mail enviado:", info.messageId);
   return NextResponse.json({ message: "Agendamento configurado com sucesso" });
} catch (error) {
   console.error("Erro ao enviar e-mail:", error);
   return NextResponse.json({ message: "Deu ruim", error });
 }

  
}