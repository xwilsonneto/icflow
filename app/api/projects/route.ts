// app/api/projects/route.ts

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';

const projectSchema = new mongoose.Schema({
  projeto: String,
  proponente: String,
  cnpj: String,
  mecanismo: String,
  login: String,
  senha: String,
  planilhaUrl: String,
  planilhaId: String,
  codigo: String,
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectDB();

    const project = new Project(data);
    await project.save();

    return NextResponse.json({ message: 'Projeto salvo com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar o projeto:', error);
    return NextResponse.json({ error: 'Erro ao salvar o projeto.' }, { status: 500 });
  }
}
