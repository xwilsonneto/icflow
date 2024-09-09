import { Payment } from "@/types/payment";

export function filterProjects(projects: Payment[], searchTerm: string): Payment[] {
  if (!searchTerm) return projects;

  const lowercasedSearchTerm = searchTerm.toLowerCase();
  return projects.filter(project =>
    project.projeto.toLowerCase().includes(lowercasedSearchTerm) ||
    project.proponente.toLowerCase().includes(lowercasedSearchTerm) ||
    project.cnpj.toLowerCase().includes(lowercasedSearchTerm) ||
    project.pastaUrl.toLowerCase().includes(lowercasedSearchTerm)
  );
}
