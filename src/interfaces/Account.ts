interface IAccountRegister extends IAccount {
  password: string;
}

interface IAccount {
  name: string;
  email: string;
  birthDate: string;
  businessName: string;
  phoneNumber: string;
  // company?: ICompany;
  social?: ISocial;
  document: IAccountDocument;
  address?: IAddress;
  isOnline: boolean;
  // bank?: IBank;
}

interface ISocial {
  instagram?: string;
  facebook?: string;
  website?: string;
}

interface IAccountDocument {
  documentType: boolean;
  generalRegister?: string;
  documentNumber: string;
  issuer: string;
  issueDate: string;
  documentImage?: File;
}

interface IAddress {
  street: string;
  houseNumber: number | undefined;
  complement?: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
}

export type { IAccount, IAccountRegister, IAddress, ISocial, IAccountDocument };
