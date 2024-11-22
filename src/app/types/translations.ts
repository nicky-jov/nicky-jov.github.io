export interface ProjectTranslation {
  title: string;
  description: string;
  tech: string;
  link: string;
}

export interface TranslationSchema {
  navbar: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  welcome: {
    greeting: string;
    name: string;
    role: string;
    subtitle: string;
    highlight: string;
    cta: string;
  };
  about: {
    title: string;
    intro: string;
    name: string;
    location: string;
    specialization: string;
    experience: string;
  };
  projects: {
    title: string;
    view: string;
    'project 1': ProjectTranslation;
    'project 2': ProjectTranslation;
    'project 3': ProjectTranslation;
  };
  skills: {
    title: string;
    languages: string[];
  };
  contact: {
    title: string;
    subtitle: string;
  };
}