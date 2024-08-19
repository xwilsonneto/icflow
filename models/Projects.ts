import { Schema, model, models } from "mongoose";

export interface ProjectsDocument {
  projeto: string;
  codigo: string;
  proponente: string;
  cnpj: string;
  login: string;
  senha: string;
  aguarde: string;
  analisar: string;
  feito: string;
  lanrp: string;
  lanselic: string;
  total: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectsSchema = new Schema<ProjectsDocument>({
      projeto: {
        type: String,
        default: ""
      },
      codigo: {
        type: String,
        default: ""
      },
      proponente: {
        type: String,
        default: ""
      },
      cnpj: {
        type: String,
        default: ""
      },
      login: {
        type: String,
        default: ""
      },
      senha: {
        type: String,
        default: ""
      },
      aguarde: {
        type: String,
        default: ""
      },
      analisar: {
        type: String,
        default: ""
      },
      feito: {
        type: String,
        default: ""
      },
      lanrp: {
        type: String,
        default: ""
      },
      lanselic: {
        type: String,
        default: ""
      },
      total: {
        type: String,
        default: ""
      },
  },
  {
    timestamps: true,
  }
);

const Projects = models.Projects || model<ProjectsDocument>('Projects', ProjectsSchema);


export default Projects;