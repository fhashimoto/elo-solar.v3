export interface ClientInterface {
  email?: string,
  id?: string,
  name: string,
  phone?: {
    areaCode?: string,
    phoneNumber?: string
  },
  tags?: Array<string>,
  fullPhone?: string
}