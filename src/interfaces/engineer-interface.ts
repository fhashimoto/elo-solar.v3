export interface SolarPanelInterface {
  name?: string,
  brand?: string,
  status?: string
  cellType?: string,
  nominalPower?: number,
  id?: string,
}

export interface GeneratorKitInterface {
  price?: string,
  supplier?: string,
  productCode?: string
  inverterId?: string,
  solarPanelId?: string,
  inverterQuantity?: number,
  solarPanelQuantity?: number,
  id?: string,
}

export interface InversorInterface {
  type?: string,
  name?: string,
  brand?: string,
  category?: string,
  numberOfMPPTs?: number,
  outputPower?: [{
    outputVoltage?: number,
    nominalPower?: number
  }],
  id?: string
}