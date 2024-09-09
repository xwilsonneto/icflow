import mongoose from "mongoose";
import { Payment } from '@/types/payment';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return Promise.reject(error);
  }
};

// Function to fetch data from MongoDB
export const getData = async (): Promise<Payment[]> => {
  try {
    await connectDB(); // Ensure the DB connection is established

    const db = mongoose.connection.useDb("icflow");

    const results = await db.collection("projects").aggregate([
      {
        $lookup: {
          from: "dataProjects",
          localField: "planilhaId",
          foreignField: "originalSheetId",
          as: "data"
        }
      },
      {
        $project: {
          codigo: 1,
          projeto: 1,
          proponente: 1,
          cnpj: 1,
          login: 1,
          senha: 1,
          pastaUrl: 1,
          homologado: { $ifNull: [{ $arrayElemAt: ["$data.HOMOLOGADO", 0] }, ""] },
          captado: { $ifNull: [{ $arrayElemAt: ["$data.CAPTADO", 0] }, ""] },
          porcento: { $ifNull: [{ $arrayElemAt: ["$data.PORCENTO", 0] }, ""] },
          receitas: { $ifNull: [{ $arrayElemAt: ["$data.RECEITAS", 0] }, ""] },
          lanrp: {
            change: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.RP.change", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            },
            newValue: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.RP.newValue", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            }
          },
          analisar: {
            change: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.ANALISE.change", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            },
            newValue: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.ANALISE.newValue", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            }
          },
          aguarde: {
            change: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.AGUARDA.change", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            },
            newValue: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.AGUARDA.newValue", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            }
          },
          lanselic: {
            change: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.LANCAR.change", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            },
            newValue: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.LANCAR.newValue", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            }
          },
          feito: {
            change: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.OK.change", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            },
            newValue: {
              $ifNull: [
                { $convert: { input: { $arrayElemAt: ["$data.OK.newValue", 0] }, to: "int", onError: 0, onNull: 0 } },
                0
              ]
            }
          },
          total: {
            $ifNull: [
              { $convert: { input: { $arrayElemAt: ["$data.TOTAL", 0] }, to: "int", onError: 0, onNull: 0 } },
              0
            ]
          },
          lastUpdated: { $ifNull: [{ $arrayElemAt: ["$data.lastUpdated", 0] }, ""] },
        }
      },
      {
        $sort: { projeto: 1 }
      }
    ]).toArray();

    // Map results to the Payment interface
    return results.map((item: any) => ({
      codigo: item.codigo as string,
      projeto: item.projeto as string,
      proponente: item.proponente as string,
      cnpj: item.cnpj as string,
      login: item.login as string,
      senha: item.senha as string,
      pastaUrl: item.pastaUrl as string,
      homologado: item.homologado as string,
      captado: item.captado as string,
      porcento: item.porcento as string,
      receitas: item.receitas as string,
      lanrp: {
        change: item.lanrp.change as number,
        newValue: item.lanrp.newValue as number,
      },
      analisar: {
        change: item.analisar.change as number,
        newValue: item.analisar.newValue as number,
      },
      aguarde: {
        change: item.aguarde.change as number,
        newValue: item.aguarde.newValue as number,
      },
      lanselic: {
        change: item.lanselic.change as number,
        newValue: item.lanselic.newValue as number,
      },
      feito: {
        change: item.feito.change as number,
        newValue: item.feito.newValue as number,
      },
      total: item.total as number,
      lastUpdated: item.lastUpdated,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

