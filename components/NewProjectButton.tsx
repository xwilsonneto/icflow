'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircledIcon } from '@radix-ui/react-icons';

type FormData = {
  projeto: string;
  proponente: string;
  cnpj: string;
  mecanismo: string;
  login: string;
  senha: string;
  planilhaUrl: string;
  planilhaId: string;
  codigo: string;
};

export default function NewProjectButton() {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projeto: '',
    proponente: '',
    cnpj: '',
    mecanismo: '',
    login: '',
    senha: '',
    planilhaUrl: '',
    planilhaId: '',
    codigo: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Projeto salvo:', data);
      setShowDialog(false);
    } catch (error) {
      console.error('Erro ao salvar o projeto:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-dark-400 border border-gray-700 text-white hover:bg-gray-700"
          onClick={() => setShowDialog(true)}
        >
          <PlusCircledIcon className="mr-2 h-5 w-5" />
          Adicionar projeto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border border-gray-700 rounded-lg max-w-3xl mx-auto my-8 p-6">
        <DialogHeader>
          <DialogTitle>Novo projeto</DialogTitle>
          <DialogDescription>
            Adicione as informações do projeto após o mesmo já ter sido criado no Sheets.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="projeto">Nome</Label>
            <Input
              id="projeto"
              name="projeto"
              placeholder="nome do projeto"
              className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proponente">Proponente</Label>
            <Input
              id="proponente"
              name="proponente"
              placeholder="proponente"
              className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                name="cnpj"
                placeholder="cnpj"
                className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="mecanismo">Mecanismo</Label>
              <Select
                value={formData.mecanismo}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, mecanismo: value }))}
              >
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-white">
                  <SelectValue placeholder="Selecione o mecanismo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                  <SelectItem value="rouanet">Rouanet</SelectItem>
                  <SelectItem value="proac">Proac Icms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                name="login"
                placeholder="login"
                className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                name="senha"
                placeholder="senha"
                className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="planilhaUrl">Link da planilha</Label>
            <Input
              id="planilhaUrl"
              name="planilhaUrl"
              placeholder="link da planilha"
              className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="planilhaId">ID da planilha</Label>
              <Input
                id="planilhaId"
                name="planilhaId"
                placeholder="id da planilha"
                className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                name="codigo"
                placeholder="código do projeto"
                className="bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button variant="outline" type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
