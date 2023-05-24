export interface LoginInterface {
  Username: string;
  Password: string;
  DeviceId: string;
}

export interface ReponseLoginInterface {
  id: number;
  user_name: string;
  is_barcode_subscription: boolean;
  account: any;
  accounts: any;
  activities: any;
  token: string,
  key: string,
  pix: string
}
