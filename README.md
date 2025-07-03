# 🌿 Floral IA – Reconnaissance de Fleurs par IA

## Objectif 🧠

**Floral IA** est un site web permettant d’identifier des fleurs à partir d’une simple photo. Ce projet a été réalisé dans le cadre d’un **projet scolaire** afin de mettre en pratique des compétences en intelligence artificielle et développement web.

## L'IA 💻​

L'IA reconnaît seulement 3 fleurs : la **rose**, le **tournesol** et la **tulipe**.

Pour lui en faire reconnaître plus, il vous faudra :
- Télécharger et ajouter d'autres fleurs dans le dossier `/images` via [Kaggle](https://www.kaggle.com/datasets/l3llff/flowers)
- Supprimer `flower_classifier.onnx` et regénérer le fichier en runnant la dernière commande dans `torch.ipynb`
- Modifier la constante `labels` dans `app.js` en y ajoutant tous les noms de fleurs 

Dans le ficher `torch.ipynb`, l'IA est entrainé dans 