import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Função para validar o domínio do email
function isValidEmailDomain(email: string, domain: string): boolean {
  const emailDomain = email.split('@')[1];
  return emailDomain === domain;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, password, phone } = await request.json();

    // Verificar se o email tem o domínio correto
    if (!isValidEmailDomain(email, 'iccultura.com.br')) {
      return NextResponse.json(
        { message: "Endereço de email inválido" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email já cadastrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json(
      {
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    } else {
      console.error("Erro durante o registro:", error);
      return NextResponse.error();
    }
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();

    const { userId, name, email, password, phone, address } = await request.json();

    if (password && password.length < 6) {
      return NextResponse.json(
        { message: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }
    
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    if (name) {
      userToUpdate.name = name;
    }

    if (email) {
      // Adicionar verificação de domínio no PUT se o email for atualizado
      if (!isValidEmailDomain(email, 'iccultura.com.br')) {
        return NextResponse.json(
          { message: "Endereço de email inválido" },
          { status: 400 }
        );
      }
      userToUpdate.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      userToUpdate.password = hashedPassword;
    }

    if (phone) {
      userToUpdate.phone = phone;
    }

    if (address) {
      userToUpdate.address = address;
    }

    await userToUpdate.save();

    console.log(userToUpdate);

    return NextResponse.json(
      {
        message: "Usuário atualizado com sucesso",
        updatedUser: {
          id: userToUpdate._id,
          name: userToUpdate.name,
          email: userToUpdate.email,
          createdAt: userToUpdate.createdAt,
          updatedAt: userToUpdate.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    } else {
      console.error("Erro durante a atualização do usuário:", error);
      return NextResponse.error();
    }
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    
    await user.remove();

    return NextResponse.json(
      { message: "Usuário removido com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro durante a remoção do usuário:", error);
    return NextResponse.error();
  }
}
