export interface Client {
  email?: string,
  id?: string,
  nome: string,
  phone?: {
    areaCode?: string,
    phoneNumber?: string
  },
  tags: Array<string>
}