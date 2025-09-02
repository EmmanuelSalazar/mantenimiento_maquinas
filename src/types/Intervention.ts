export interface MachineData {
  serial: string;
  type: string;
  brand: string;
  code: string;
}

export interface Intervention {
  id: string;
  date: string;
  maintenanceType: string;
  responsible: string;
  observations: string;
  machineData: MachineData;
}