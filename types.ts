
export interface LearningMechanism {
  Title: string;
  Type: string;
  Description: string;
  Hints: string;
  Reference: string;
}

export interface GeneratedMechanism {
  title: string;
  description: string;
  reference: string;
}

export interface GeneratedContent {
  mechanism: GeneratedMechanism;
  example: string;
  implementationTips: string;
  tradeoffs: string;
}
