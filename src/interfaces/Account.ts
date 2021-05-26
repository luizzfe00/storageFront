interface IAccountRegister extends IAccount {
  password: string;
}

interface IAccount {
  firstName: string;
  lastName: string;
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
  documentType: string;
  documentNumber: string;
  issuer: string;
  issueDate: string;
  documentImage?: File;
}

interface IAddress {
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
}

export type { IAccount, IAccountRegister, IAddress, ISocial, IAccountDocument };
