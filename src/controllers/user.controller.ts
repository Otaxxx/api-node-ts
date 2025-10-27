// Importation des types Request et Response depuis Express
import { Request, Response } from 'express';

/**
 * Interface définissant la structure d'un utilisateur
 * Permet un typage strict pour garantir la cohérence des données
 */
interface User {
  name: string;   // Nom de l'utilisateur (obligatoire)
  email: string;  // Email de l'utilisateur (obligatoire)
}

/**
 * Tableau de stockage des utilisateurs en mémoire
 * En production, cela serait remplacé par une base de données (MongoDB, PostgreSQL, etc.)
 */
const users: User[] = [];

/**
 * Contrôleur pour récupérer la liste de tous les utilisateurs
 * 
 * @param {Request} req - Objet de requête Express (non utilisé ici)
 * @param {Response} res - Objet de réponse Express
 * @returns {Response} Réponse JSON contenant la liste des utilisateurs
 * 
 * @example
 * // Requête:
 * // GET http://localhost:4000/users
 * // Réponse:
 * // { "users": [{ "name": "Alice", "email": "alice@example.com" }] }
 */
export const getUsers = (req: Request, res: Response): Response => {
  // Retourne la liste complète des utilisateurs au format JSON
  return res.json({ users });
};

/**
 * Contrôleur pour ajouter un nouvel utilisateur
 * 
 * @param {Request} req - Objet de requête Express contenant les données (name, email) dans req.body
 * @param {Response} res - Objet de réponse Express
 * @returns {Response} Réponse JSON confirmant l'ajout ou indiquant une erreur
 * 
 * @example
 * // Requête:
 * // POST http://localhost:4000/users
 * // Body: { "name": "Alice", "email": "alice@example.com" }
 * // Réponse (succès):
 * // { "message": "Utilisateur Alice ajouté avec succès !", "email": "alice@example.com" }
 * // Réponse (erreur):
 * // { "message": "Nom et email requis" }
 */
export const addUser = (req: Request, res: Response): Response => {
  // Extraction des données du corps de la requête
  const { name, email } = req.body;

  // Validation : vérifier que les champs obligatoires sont présents
  if (!name || !email) {
    // Retourne une erreur 400 (Bad Request) si les données sont incomplètes
    return res.status(400).json({ message: "Nom et email requis" });
  }

  // Création d'un nouvel utilisateur avec un typage explicite
  const newUser: User = { name, email };

  // Ajout de l'utilisateur dans le tableau en mémoire
  users.push(newUser);

  // Log dans la console pour le suivi (utile en développement)
  console.log("🛠 Utilisateur ajouté :", { name, email });

  // Retourne une réponse de succès avec les détails de l'utilisateur ajouté
  return res.json({ 
    message: `Utilisateur ${name} ajouté avec succès !`, 
    email 
  });
};