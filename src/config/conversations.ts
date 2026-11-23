export type ConversationKind = 'conversation' | 'draft';

export type ConversationMessage = {
  sender: string;
  text: string;
  direction: 'incoming' | 'outgoing';
};

export type Conversation = {
  id: string;
  title: string;
  person: string;
  kind: ConversationKind;
  preview: string;
  messages: ConversationMessage[];
};

export const conversations: Conversation[] = [
  {
    id: 'thomas',
    title: 'Priorités de demain',
    person: 'Thomas · Responsable',
    kind: 'conversation',
    preview: 'Les dossiers peuvent attendre jeudi.',
    messages: [
      { sender: 'Mélissa', text: 'Pour demain, tu attends les trois dossiers finalisés ?', direction: 'outgoing' },
      { sender: 'Thomas', text: 'Non, seulement le dossier client. Les deux autres peuvent attendre jeudi.', direction: 'incoming' },
      { sender: 'Thomas', text: 'Si une autre urgence arrive, préviens-moi qu’on revoie les priorités.', direction: 'incoming' },
    ],
  },
  {
    id: 'samira',
    title: 'Dossier client',
    person: 'Samira · Collègue',
    kind: 'conversation',
    preview: 'Je peux vérifier les chiffres demain matin.',
    messages: [
      { sender: 'Samira', text: 'Tu en es où sur le dossier client ?', direction: 'incoming' },
      { sender: 'Mélissa', text: 'Il me reste les chiffres à vérifier et la synthèse à terminer.', direction: 'outgoing' },
      { sender: 'Samira', text: 'Je peux vérifier les chiffres demain matin. Envoie-moi le fichier si ça t’arrange.', direction: 'incoming' },
    ],
  },
  {
    id: 'alex',
    title: 'Le nouvel outil',
    person: 'Alex · Collègue',
    kind: 'conversation',
    preview: 'On peut regarder ensemble demain.',
    messages: [
      { sender: 'Mélissa', text: 'Je bloque sur le nouvel outil, j’y passe un temps fou.', direction: 'outgoing' },
      { sender: 'Alex', text: 'J’ai eu le même problème la semaine dernière. On peut regarder ensemble dix minutes demain.', direction: 'incoming' },
    ],
  },
  {
    id: 'draft',
    title: 'Brouillon non envoyé',
    person: 'Mélissa · Brouillon',
    kind: 'draft',
    preview: 'Je préfère me débrouiller…',
    messages: [
      { sender: 'Mélissa', text: 'Je vais finir ce soir. Je préfère me débrouiller, j’ai peur qu’ils pensent que je ne suis pas à la hauteur.', direction: 'outgoing' },
    ],
  },
];

export const puzzleQuestion = 'Mélissa cherche une solution seule. Quelle ressource commune à ces trois échanges pourrait-elle mobiliser pour faire face à cette situation stressante ?';
export const synthesisHint = 'Comparez les propositions de Thomas, Samira et Alex. Qu’ont-elles en commun ?';
export const returnInstruction = 'Lorsque vous avez trouvé, revenez dans le jeu principal pour saisir votre réponse.';
